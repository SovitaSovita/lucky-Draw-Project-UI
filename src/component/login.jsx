import React, { useState } from "react";
import logo from "../assets/img/Artboard_3_2_213b1bea-2b74-4aab-86a5-1bfb64acc4a5_100x@2x.avif";
import { loginService } from "../redux/service/AuthService";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import LoadingComponentBtn from "./LoadingComponent";
import { setLoading } from "../redux/slice/LoadingSlice";




const loginSchema = Yup.object().shape({
  username: Yup.string().required("username can't empty"),
  password: Yup.string().required("Password can't empty"),
});
export default function Login() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Loading = useSelector((state) => state.loading.value);


  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = (values, { setFieldError}) => {
    dispatch(setLoading(true));
    loginService(user).then((r) => {
      console.log("DATA", r);
      if(r.status === 200){
        dispatch(setLoading(false));
        navigate("/");
      }else{
        dispatch(setLoading(false));
        setFieldError("username", "username not exist");
        setFieldError("password", "Password incorrect");

      }
    });
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-slate-200 rounded-md shadow-md lg:max-w-xl">
        <img src={logo} className="" />
        <div className="text-center font-semibold uppercase text-3xl mt-6 font-poppin">
          welcome back 
        </div>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched }) => (
            <div className="flex flex-1 flex-col items-center justify-center relative mt-5">
              {/* <!-- Login box --> */}
              <div className="flex flex-1 flex-col  justify-center space-y-5 w-full">
                <Form
                  className="flex flex-col space-y-2 font-SecondaryFont"
                  onChange={handleInput}
                >
                  {/* Email and Phone */}
                  <label
                    htmlFor="email"
                    className="font-medium text-base text-left text-text_normal"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Field
                      type="text"
                      style={{
                        ':focus': {
                          border:'2',
                          borderColor: 'green',
                        }
                      }}
                      placeholder="Admin"
                      name="username"
                      id="username"
                      className={`input-field w-full focus:rounded-[20px] rounded-[20px] focus:outline-b-green_custom focus:border-2 focus:drop-shadow-md  focus:border-b-green_custom   focus:ring-0 focus:border-transparent  ${
                        touched.username && errors.username ? "input-error rounded-[20px] focus:border-b-0" : ""
                      }  
                      }`}
                    />
                    <div
                      className="text-gray-500 absolute right-3 top-5 transform -translate-y-1/2"
                      size={20}
                    />
                    {errors.username && touched.username ? (
                      <div className="text-red-500 ml-3 text-sm mt-2">
                        {errors.username}
                      </div>
                    ) : null}
                  </div>
                  {/* Password */}
                  <label
                    htmlFor="password"
                    className="font-medium text-base text-left text-text_normal"
                  >
                    Password
                  </label>
                  <div className="relative inline-flex items-center w-full">
                    <Field
                      type="password"
                      placeholder="Password"
                      name="password"
                      id="password"
                      className={`input-field border-2 w-full focus:rounded-[20px] rounded-[20px]   focus:outline-b-green_custom focus:border-2 focus:drop-shadow-md focus:border-b-green_custom   focus:ring-0 focus:border-transparent  ${
                        touched.password && errors.password
                          ? "input-error  rounded-[20px] focus:border-b-0"
                          : ""
                      }`}
                    />
                  </div>
                  {errors.password && touched.password ? (
                    <div className="text-red-500 ml-3 text-sm">
                      {errors.password}
                    </div>
                  ) : null}
                  <a
                    className=" text-green_custom font-medium text-left ml-2"
                  >
                    {/* Forgot password? */}
                  </a>

                  <button
                    type="submit"
                    className="w-full font-roboto px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-black focus:outline-none focus:bg-black"
                  >
                    {Loading ? <LoadingComponentBtn /> : "Sign in"}
                  </button>
                </Form>

                <div className="flex justify-center items-center">
                  <span className="w-full border border-gray-200"></span>
                  <span className="w-full border border-gray-200"></span>
                </div>

                {/* Google login session */}
                {/*  Register session  */}

              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}
