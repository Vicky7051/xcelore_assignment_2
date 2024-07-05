import userModel from "../Model/Usermodel.js";
import bcryptjs from 'bcryptjs';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const JWT_SEC_KEY = process.env.JWT_SECRITE

export const registerUser = async(req, res) => {
    try {
        const { email, firstName, password, lastName, isAdmin = false } = req.body;
        const salt = await bcryptjs.genSalt(10);
        const secPass = await bcryptjs.hash(password, salt);
        const emailExist = await userModel.find({ email });
        if (emailExist.length === 0) {
          const data = await userModel.create({
            firstName,
            email,
            lastName,
            isAdmin,
            password: secPass,
          });
          return res.status(201).json({ status: true, data, message : "Registration Successfully." });
        } else {
          return res
            .status(401)
            .json({ status: false, message: "email already registered" });
        }
    } 
    catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}

export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const emailExist = await userModel.findOne({ email });
        if (emailExist != null) {
          const comPass = await bcryptjs.compare(password, emailExist.password);
          if (comPass) {
            const payload = {
              userId: emailExist._id,
              isAdmin: emailExist.isAdmin ?? false,
            };
            const token = JWT.sign(payload, JWT_SEC_KEY);
            const profile = await userModel.findOne({email}, {password : 0})
            return res.status(200).json({ status: true, token, isAdmin: emailExist.isAdmin, profile });
          } else {
            return res
              .status(409)
              .json({ status: false, message: "Invalid Credentials" });
          }
        } else {
          return res.status(404).json({ status: false, message: "User not found..." });
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}

export const autoLogin = async(req, res) => {
  try{
    const authHeader = req.headers.authorization
    const authToken = authHeader.split(" ")[1];
    const decoded = JWT.verify(authToken, JWT_SEC_KEY);
    const id = decoded.userId
    const profile = await userModel.findOne({_id : id}, {password : 0})
    if(!profile) res.status(401).json({status : false, message : "Unauthorized."})
   
    return res.status(200).json({ status: true, profile });
  }
  catch(error){
    return res.status(500).json({status : false, message : error.message})
  }
}

export const getUserList = async(req, res) => {
    try{
        const users = await userModel.find({},{password : 0})
        if(!users) return res.status(404).json({status : true, message : "User empty."})
        return res.status(200).json({status : true, message : "User fetched.", users})
    }
    catch (error) {
        return res.status(500).json({status : false, message : error.message})
    }
}

export const updateUser = async(req, res) => {
    try{
        const user = req.body
        const updatedUser = await userModel.findByIdAndUpdate(user._id, user, {new : true, runValidators: true}) 
        if(!updateUser) return res.status(404).json({status : false, message : "User not found."})
        return res.status(200).json({status : true, message : "User updated successfully.", updatedUser})
    }
    catch(error) {
        return res.status(500).json({status : false, message : error.message})
    }
}

export const deleteUser = async(req, res) => {
    try{
        const id = req.params.id
        if(!id) return res.status(401).json({status : false, message : "Unauthorized: User not authenticated"})
        const isUser = await userModel.findOne({_id : id})
        if(!isUser) return res.status(404).json({status : false, message : "User not found."})
        const isDelete = await userModel.findByIdAndDelete(id)
        if(!isDelete) return res.json(409).json({status : false, message : "User not deleted."})
        return res.status(200).json({status : true, message : "User deleted successfully."})
    }
    catch(error){
        return res.status(500).json({status : false, message : error.message})
    }
}