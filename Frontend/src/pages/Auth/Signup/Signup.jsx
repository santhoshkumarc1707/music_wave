import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { months, signupSchema } from "./utils";
import { assets } from "../../../assets/admin-assets/assets";
import { toast } from "react-toastify";

const initialValues = {
  name: "",
  email: "",
  password: "",
  gender: "",
  date: "",
  month: "",
  year: "",
 
};

const Signup = () => {
  const [formLoading, setFormLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (values, { setSubmitting }) => {
    setFormLoading(true);
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => formData.append(key, values[key]));
      const { data, message } = (await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users`, formData)).data;
      if (data) {
        toast.success(message);
        navigate("/");
      } else {
        toast.error("Signup failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setFormLoading(false);
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: signupSchema,
    onSubmit: handleSignup,
  });

  const renderInputField = (id, type = "text", placeholder, className = "") => (
    <div>
      <input
        type={type}
        id={id}
        name={id}
        value={formik.values[id]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={placeholder}
        className={`block w-full rounded-md border-gray-300 focus:ring-green-500 focus:border-green-500 shadow-sm p-2 ${formik.touched[id] && formik.errors[id] ? "border-red-500" : ""} ${className}`}
      />
      {formik.touched[id] && formik.errors[id] && (
        <p className="text-red-500 text-sm mt-1">{formik.errors[id]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 shadow-lg rounded-md w-full max-w-lg">
        <div className="text-center mb-6">
          <Link to="/">
            <img src={assets.img_logo} className="mx-auto" width={140} alt="Logo" />
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-center mb-4">Sign up for free to start listening.</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {renderInputField("email", "email", "Enter your email")}
          {renderInputField("password", "password", "Create a password")}
          {renderInputField("name", "text", "Choose a username")}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <div className="flex space-x-2">
              {["date", "month", "year"].map((field, idx) => (
                <div key={idx} className="w-1/3">
                  {field === "month" ? (
                    <select
                      id={field}
                      name={field}
                      value={formik.values[field]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`block w-full rounded-md border-gray-300 focus:ring-green-500 focus:border-green-500 shadow-sm p-2 ${formik.touched[field] && formik.errors[field] ? "border-red-500" : ""}`}
                    >
                      <option value="">Month</option>
                      {months?.map((month, idx) => (
                        <option key={idx} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      id={field}
                      name={field}
                      value={formik.values[field]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder={field === "date" ? "DD" : field === "year" ? "YYYY" : ""}
                      className={`block w-full rounded-md border-gray-300 focus:ring-green-500 focus:border-green-500 shadow-sm p-2 ${formik.touched[field] && formik.errors[field] ? "border-red-500" : ""}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <div className="flex space-x-4">
              {["male", "female", "non-binary"].map((gender, idx) => (
                <label key={idx}>
                  <input
                    type="radio"
                    id={gender}
                    name="gender"
                    value={gender}
                    checked={formik.values.gender === gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span className="ml-2">{gender.charAt(0).toUpperCase() + gender.slice(1)}</span>
                </label>
              ))}
            </div>
            {formik.touched.gender && formik.errors.gender && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.gender}</p>
            )}
          </div>
          <input
            type="submit"
            value={formLoading ? "Signing Up..." : "Sign Up"}
            disabled={formLoading}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          />
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-green-500 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
