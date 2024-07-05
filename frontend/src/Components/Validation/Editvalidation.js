import * as Yup from 'yup'

export const EditRegistrationSchema = Yup.object({
    firstName : Yup.string().min(2, "first name too sort.").max(20, "first name too long.").required("Please enter first name."),
    lastName : Yup.string().min(2, "last name too sort.").max(20, "last name too long.").required("Please enter last name."),
    email : Yup.string().email().required("Please enter email."),
    isAdmin: Yup.boolean().required("Please specify if the user is an admin.")
})