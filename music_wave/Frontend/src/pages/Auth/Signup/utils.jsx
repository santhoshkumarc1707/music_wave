import * as Yup from "yup";

  export const signupSchema = Yup.object().shape({
    name: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    gender: Yup.string().required("Gender is required"),
    date: Yup.number()
      .min(1, "Invalid date")
      .max(31, "Invalid date")
      .required("Date is required"),
    month: Yup.string().required("Month is required"),
    year: Yup.number()
      .min(1900, "Invalid year")
      .max(new Date().getFullYear(), "Invalid year")
      .required("Year is required"),
  });
  

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export 
const initialValues = {
  name: "",
  email: "",
  password: "",
  gender: "",
  date: "",
  month: "",
  year: "",
  
};