import * as Yup from "yup"

export const signupSchema=Yup.object({
    name:Yup.string().min(3).max(20).required("Please Enter Your Name"),
    email:Yup.string().email().required("Please Enter Your Email"),
    password:Yup.string().min(6).required("please Enter your Password"),
    confirmPassword:Yup.string().required().oneOf([Yup.ref('password'),null],"Password Must Be Same")
})


export const loginSchema=Yup.object({
    email:Yup.string().email().required("Please Enter Your Email"),
    password:Yup.string().required("Please Enter Password")
})