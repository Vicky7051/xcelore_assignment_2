import * as Yup from 'yup'

export const registrationSchema = Yup.object({
    firstName : Yup.string().min(2, "first name too sort.").max(20, "first name too long.").required("Please enter first name."),
    lastName : Yup.string().min(2, "last name too sort.").max(20, "last name too long.").required("Please enter last name."),
    email : Yup.string().email().required("Please enter email."),
    password : Yup.string()
                    .min(6, "Password must be at least 6 characters long")
                    .required("Please enter password")
                    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
                    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
                    .matches(/[0-9]/, "Password must contain at least one number")
                    .matches(/[@$!%*?&]/, "Password must contain at least one special character"),
    confirm_password : Yup.string().min(6).oneOf([Yup.ref('password')], "Password must match.")
})