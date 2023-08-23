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
import { Spinner } from "flowbite-react";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Button } from "@mui/material";
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';

export default function ChangePassword() {
  const [password, setPassword] = useState({});

  const [passwordEye, setPasswordEye] = useState(false);
  const [passwordEye1, setPasswordEye1] = useState(false);
  const [passwordEye2, setPasswordEye2] = useState(false);

  const Loading = useSelector((state) => state.loading.value);
  const dispatch = useDispatch();

  const onChangePassword = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const onSubmitPassword = () => {
    if (password.newPassword == password.confirmPassword) {
      dispatch(setLoading(true));
      resetPassword({ ...password }).then((e) => {
        console.log("mydata", e);
        dispatch(setPopup(""));
        if (e.data?.status == true) {
          notifySuccess("Changed Successfully.")
          dispatch(setLoading(false));
        } else {
          notifyError("Invalid password.")
          dispatch(setLoading(false));
        }
        handleClear()
      });
    } else {
      notifyError("Password not match.")
      handleClear()
    }
  };

  const handleClear = () => {
    setPassword({})
  }

  // formik for change password
  const SignUpSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Password can't empty"),
    newPassword: Yup.string().required("Password can't empty"),
    confirmPassword: Yup.string().required("Password can't empty"),
  });

  return (
    <div className="lg:px-32 md:px-24 px-4">
      <div className="h-fit bg-white rounded-xl mt-20 py-6 lg:px-20 md:px-14 px-4 shadow-shadow_custom">
        <div className="w-full h-16 bg-green_custom rounded-xl flex items-center">
          <p className="capitalize text-xl font-bold text-black">
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
          onSubmit={(values) => { }}
        >
          {({ errors, touched }) => (
            <Form
              onChange={onChangePassword}
              className=""
            >

              <div className="mb-4">
                <span className="label-text text-base font-sans">
                  Your Current Password
                </span>
                <div className="flex items-center bg-white-smoke rounded py-1 px-3">
                  <LockOutlinedIcon className="text-gray-500" />
                  <Field
                    type={passwordEye ? "text" : "password"}
                    placeholder="*********"
                    name="currentPassword"
                    id="currentPassword"
                    value={password.currentPassword || ''}
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
                {errors.currentPassword && touched.currentPassword ? (
                  <div className="text-red-500 text-sm">
                    {errors.currentPassword}
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <span className="label-text text-base font-sans">
                  New Password
                </span>
                <div className="flex items-center bg-white-smoke rounded py-1 px-3">
                  <LockOutlinedIcon className="text-gray-500" />
                  <Field
                    type={passwordEye2 ? "text" : "password"}
                    placeholder="*********"
                    name="newPassword"
                    id="newPassword"
                    value={password.newPassword || ''}
                    className="bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2l focus:ring-0"
                  />
                  <span
                    className="label-text mb-1 text-base cursor-pointer"
                    onClick={() => {
                      setPasswordEye2(!passwordEye2);
                    }}
                  >
                    <FontAwesomeIcon className="text-gray-500"
                      icon={passwordEye2 ? faEye : faEyeSlash}
                    />
                  </span>
                </div>
                {errors.newPassword && touched.newPassword ? (
                  <div className="text-red-500 text-sm">{errors.newPassword}</div>
                ) : null}
              </div>


              <div className="mb-4">
                <span className="label-text text-base font-sans">
                  Confirm New Password
                </span>
                <div className="flex items-center bg-white-smoke rounded py-1 px-3">
                  <LockOutlinedIcon className="text-gray-500" />
                  <Field
                    type={passwordEye1 ? "text" : "password"}
                    placeholder="*********"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={password.confirmPassword || ''}
                    className="bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2l focus:ring-0"
                  />
                  <span
                    className="label-text mb-1 text-base cursor-pointer"
                    onClick={() => {
                      setPasswordEye1(!passwordEye1);
                    }}
                  >
                    <FontAwesomeIcon className="text-gray-500"
                      icon={passwordEye1 ? faEye : faEyeSlash}
                    />
                  </span>
                </div>
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </div>
                ) : null}
              </div>

              <div className="flex justify-end mt-10">
                {/* <button
                type="button"
                onClick={onSubmitPassword}
                className="btn"
              >
                {Loading ? <Spinner /> : "Save"}
              </button> */}
                <Button
                  type="button"
                  onClick={onSubmitPassword} variant="contained" endIcon={<SaveAsOutlinedIcon />}>
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <AlertMesages />
      </div>
    </div>
  );
}
