import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { setLoading } from "../redux/slice/LoadingSlice";
import LoadingComponentBtn from "./LoadingComponent";
import { resetPassword } from "../redux/service/AuthService";
import { setPopup } from "../redux/slice/PopupSlice";
import AlertMesages from "./AlertMesages";
import { notifyError, notifySuccess } from "../redux/Constants";

export default function ChangePassword() {
  const [password, setPassword] = useState({});
  const Loading = useSelector((state) => state.loading.value);
  const dispatch = useDispatch();

  const onChangePassword = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const onSubmitPassword = () => {
    dispatch(setLoading(true));
    resetPassword({ ...password }).then((e) => {
      console.log("mydata", e);
      dispatch(setPopup(""));
      if (e.data?.status == true) {
        notifySuccess("Changed Successfully.")
        dispatch(setLoading(false));
      } else {
        notifyError("Current password is incorrect.")
        dispatch(setLoading(false));
      }
    });
  };

  // formik for change password
  const SignUpSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Password can't empty"),
    newPassword: Yup.string().required("Password can't empty"),
    confirmPassword: Yup.string().required("Password can't empty"),
  });

  return (
    <div className="w-[80%] h-fit bg-white rounded-xl pb-10 mt-20 shadow-shadow_custom lg:ml-10">
      <div className="w-full h-16 bg-green_custom rounded-xl flex items-center pl-20 xs:pl-8 md:pl-20 md:h-14 xs:h-20">
        {/* <Link to="/home/setting">
          <svg
            width="20"
            height="20"
            viewBox="0 0 33 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.323 31.0155L0.572949 17.2655C0.364616 17.0572 0.216699 16.8315 0.129199 16.5885C0.0416988 16.3454 -0.00135634 16.085 3.25524e-05 15.8072C3.25524e-05 15.5294 0.043783 15.269 0.131283 15.026C0.218783 14.7829 0.366005 14.5572 0.572949 14.3489L14.323 0.598881C14.7049 0.216936 15.1827 0.0176313 15.7563 0.000964633C16.3299 -0.015702 16.8243 0.183603 17.2396 0.598881C17.6563 0.980825 17.8736 1.4586 17.8917 2.03221C17.9098 2.60583 17.7098 3.10027 17.2917 3.51555L7.08337 13.7239H30.3646C30.9549 13.7239 31.45 13.9239 31.85 14.3239C32.25 14.7239 32.4493 15.2183 32.448 15.8072C32.448 16.3975 32.2486 16.8926 31.85 17.2926C31.4514 17.6926 30.9563 17.8919 30.3646 17.8905H7.08337L17.2917 28.0989C17.6736 28.4808 17.8736 28.9669 17.8917 29.5572C17.9098 30.1475 17.7098 30.6336 17.2917 31.0155C16.9098 31.4322 16.4236 31.6405 15.8334 31.6405C15.2431 31.6405 14.7396 31.4322 14.323 31.0155Z"
              fill="white"
            />
          </svg>
        </Link> */}
        <p className="capitalize text-xl font-bold text-black ml-5 xs:ml-7 md:ml-10">
          change password
        </p>
      </div>

      {/* formik for change password */}
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values) => {}}
      >
        {({ errors, touched }) => (
          <Form
            onChange={onChangePassword}
            className="mx-28 mt-16 md:mx-20 xs:mx-7"
          >
            <label class="block mb-2 mt-7 text-md font-normal text-gray-900 capitalize">
              current password
            </label>
            <Field
              name="currentPassword"
              type="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-green_custom focus:border-green_custom block w-full px-5 h-10 md:h-10 xs:h-9"
            />
            {errors.currentPassword && touched.currentPassword ? (
              <div className="text-red-500 text-sm">
                {errors.currentPassword}
              </div>
            ) : null}
            <label class="block mb-2 mt-7 text-md font-normal text-gray-900 capitalize">
              new password
            </label>
            <Field
              name="newPassword"
              type="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-green_custom focus:border-green_custom block w-full px-5 h-10 md:h-10 xs:h-9"
            />
            {errors.newPassword && touched.newPassword ? (
              <div className="text-red-500 text-sm">{errors.newPassword}</div>
            ) : null}
            <label class="block mb-2 mt-7 text-md font-normal text-gray-900 capitalize">
              confirm new password
            </label>
            <Field
              name="confirmPassword"
              type="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-green_custom focus:border-green_custom block w-full px-5 h-10 md:h-10 xs:h-9"
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div className="text-red-500 text-sm">
                {errors.confirmPassword}
              </div>
            ) : null}
            <div className="flex justify-center mt-10">
              <button
                type="button"
                onClick={onSubmitPassword}
                class="text-white bg-black focus:outline-none focus:ring-4 font-normal rounded-xl text-xl px-5 text-center h-10 w-44 md:text-2xl md:px-5 md:h-10 md:w-44 xs:px-4 xs:h-9 xs:w-32"
              >
                {Loading ? <LoadingComponentBtn /> : "Save"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {/* <AlertMesages /> */}
    </div>
  );
}
