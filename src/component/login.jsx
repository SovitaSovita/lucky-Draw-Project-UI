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
import { Spinner } from "flowbite-react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { loginAuth } from "../redux/slice/AuthSlice";




const loginSchema = Yup.object().shape({
  username: Yup.string().required("username can't empty"),
  password: Yup.string().required("Password can't empty"),
});
export default function Login() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Loading = useSelector((state) => state.loading.value);
  const [passwordEye, setPasswordEye] = useState(false);


  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = (values, { setFieldError }) => {
    dispatch(setLoading(true));
    loginService(user).then((r) => {
      console.log("DATA", r);
      localStorage.setItem("token", r.data?.payload?.token);
      if (r.status === 200) {
        dispatch(setLoading(false));
        dispatch(loginAuth(true))
        navigate("/");
      } else {
        dispatch(setLoading(false));
        setFieldError("username", "username not exist");
        setFieldError("password", "Password incorrect");

      }
    });
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white shadow border rounded-lg lg:max-w-xl">
        <img src={logo} className="m-auto" />

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
                  <div className="mt-6 mb-3">
                    <span className="label-text text-base font-sans">
                      Username
                    </span>
                    <div className="flex items-center bg-white-smoke rounded py-1 px-3">
                      <EmailOutlinedIcon className="text-gray-500"/>
                      <Field
                        placeholder="Admin"
                        name="username"
                        id="username"
                        className="bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 focus:outline-none focus:ring-0"
                      />
                    </div>
                    {errors.username && touched.username ? (
                      <div className="text-red-500 ml-3 text-sm mt-2">
                        {errors.username}
                      </div>
                    ) : null}
                  </div>

                  {/* Field Password */}
                  <div className="mb-4">
                    <span className="label-text text-base font-sans">
                      Password
                    </span>
                    <div className="flex items-center bg-white-smoke rounded py-1 px-3">
                      <LockOutlinedIcon className="text-gray-500"/>
                      <Field
                        type={passwordEye ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        id="password"
                        className="bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2l focus:ring-0"
                      />
                      <span
                        className="label-text mb-1 text-base cursor-pointer"
                        onClick={() => {
                          setPasswordEye(!passwordEye);
                        }}
                      >
                        <FontAwesomeIcon className="text-gray-500"
                          icon={passwordEye ? faEye : faEyeSlash}
                        />
                      </span>
                    </div>
                    {errors.password && touched.password ? (
                      <div className="text-red-500 ml-3 text-sm">
                        {errors.password}
                      </div>
                    ) : null}
                  </div>

                  <a
                    className=" text-green_custom font-medium text-left ml-2"
                  >
                    {/* Forgot password? */}
                  </a>

                  <button
                    type="submit"
                    className="w-full font-roboto px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-black focus:outline-none focus:bg-black"
                  >
                    {Loading ? <Spinner /> : "Sign in"}
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
