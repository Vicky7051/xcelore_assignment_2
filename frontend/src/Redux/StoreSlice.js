import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    profile : {
        data : {}
    },
    users : {
        data : []
    },
    selectedUser : {
        data : {}
    },
    dailog : {
        delete : false,
        add : false,
        edit : false
    },
    showAdmin : {
        data : false
    }
}

export const storeSlice = createSlice({
    name : "store",
    initialState,
    reducers : {
        setProfile : (state, action) => {
            state.profile.data = action.payload
        },
        setUser : (state, action) => {
            state.users.data = action.payload
        },
        selectUser : (state, action) => {
            state.selectedUser.data = state.users.data.filter((item) => item._id === action.payload)[0]
        },
        deleteUser : (state, action) => {
            state.users.data = state.users.data.filter((item) => item._id !== action.payload)
            state.selectedUser.data = {}
        },
        toggleDeleteDailog : (state, action) => {
            for(const key in state.dailog){
                if(key !== "delete") state.dailog[key] = false
            }
            state.dailog.delete = action.payload
        },
        toggleAddDailog : (state, action) => {
            for(const key in state.dailog){
                if(key !== "add") state.dailog[key] = false
            }
            state.dailog.add = action.payload
        },
        toggleEditDailog : (state, action) => {
            for(const key in state.dailog){
                if(key !== "edit") state.dailog[key] = false
            }
            state.dailog.edit = action.payload
        },
        addUser : (state, action) => {
            state.users.data.push(action.payload)
        },
        updateUser : (state, action) => {
            state.users.data = state.users.data.map((item) => item._id === action.payload._id ? action.payload : item)
        },
        toggleShowAdmin : (state, action) => {
            state.showAdmin.data = action.payload
        }
    }
})

export const {setProfile, setUser, selectUser, deleteUser, toggleDeleteDailog, toggleAddDailog, toggleEditDailog, addUser, updateUser, toggleShowAdmin} = storeSlice.actions

export default storeSlice.reducer