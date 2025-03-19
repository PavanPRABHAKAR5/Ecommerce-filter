
"use client";

import React , {useState }from "react";
import '../app/styles/LoginForm.css'
import Link from "next/link";
import { useRouter} from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faMobile,  faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// Validation Schema using Yup
const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must include one special character")
    .matches(/\d/, "Must include one number")
    .required("Password is required"),
  mobile: yup
    .string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  rememberMe: yup.boolean().oneOf([true], "You must accept Remember Me"),
});

const LoginForm = () => {
    const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
  setShowPassword((prev) => !prev);
};

//   console.log(errors);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://coding-assignment-server.vercel.app/login",
        data
      );
      console.log("Login Successful:", response.data);

      if(response.data.message === 'login successful'){
        // localStorage.setItem({token: response.data.token, userName: response.data.userName});
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userName", response.data.userName);
      }
    //   alert("Login Successful!");
    router.push("/productlist");
    } catch (error) {
    //     if(error.message === 'Request failed with status code 400')
      // console.error("Login Failed:", error);
      alert("Login failed. Please check your credentials.");
      reset({
        email: "",
        password: "",
        mobile: "",
        rememberMe: false,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          <span className="bg-gradient-to-r text-transparent from-blue-500 to-purple-500 bg-clip-text">
            LogIn
          </span>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2 inline-block w-3.5" />
              Email
            </label>
            <input
              id="email"
              {...register("email")}
              defaultValue=""
              type="email"
              className="shadow appearance-none border-none rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          {/* <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              <FontAwesomeIcon icon={faLock} className="mr-2 inline-block w-3.5" />
              Password
            </label>
            <input
              id="password"
              {...register("password")}
              type="password"
              className="shadow appearance-none border-none rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div> */}


<div className="mb-6 relative">
  <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
    <FontAwesomeIcon icon={faLock} className="mr-2 inline-block w-3.5" />
    Password
  </label>
  
  <div className="relative">
    <input
      id="password"
      {...register("password")}
      type={showPassword ? "text" : "password"}
      className="shadow appearance-none border-none rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none pr-10"
      placeholder="Enter your password"
    />
    
    {/* Toggle Eye Icon */}
    <button
      type="button"
      onClick={togglePasswordVisibility}
      className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
    >
      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
    </button>
  </div>
  
  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
</div>

          {/* Mobile Number Field */}
          <div className="mb-6">
            <label htmlFor="mobile" className="block text-gray-700 text-sm font-bold mb-2">
              <FontAwesomeIcon icon={faMobile} className="mr-2 inline-block w-3.5" />
              Mobile Number
            </label>
            <input
              id="mobile"
              {...register("mobile")}
              type="text"
              className="shadow appearance-none border-none rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none"
              placeholder="Enter your mobile number"
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="mb-6 flex justify-between items-center text-sm">
            <label className="flex items-center">
              <input type="checkbox" {...register("rememberMe")} className="mr-2" />
              Remember me
            </label>
            
            <Link href="/" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <div>
           {errors.rememberMe && <p className="mb-6 text-red-500 text-sm ml-2">{errors.rememberMe.message}</p>}
           </div>
          
          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "LogIn"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
