import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import validator from "validator";
import * as Yup from "yup";

import { setUser } from "../../redux/auth/actions";

import LoadingButton from "../../components/loadingButton";
import api from "../../services/api";
import InputErrorMessage from "../../components/inputErrorMassage";

const SigninSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const SignInPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);

  return (
    // Auth Wrapper
    <div className="authWrapper font-myfont">
      <div className="font-[Helvetica] text-center text-[32px] font-semibold	mb-[15px]">Account team</div>

      {user && <Redirect to="/" />}
      <Formik
        initialValues={{ name: "", password: "" }}
        validationSchema={SigninSchema}
        onSubmit={async (values, actions) => {
          try {
            const { user, token } = await api.post(`/user/signin`, values);
            if (token) api.setToken(token);
            actions.setSubmitting(false);
            if (user) dispatch(setUser(user));
          } catch (e) {
            toast.error(`Wrong login: ${e.code}`);
            actions.setSubmitting(false);
          }
        }}>
        {({ isSubmitting }) => {
          return (
            <Form>
              <div className="mb-[25px]">
                <div className="flex flex-col-reverse">
                  <Field className="peer signInInputs " validate={(v) => validator.isEmpty(v) && "This field is Required"} name="name" type="text" id="username" />
                  <label className="peer-focus:text-[#116eee]" htmlFor="username">
                    Username
                  </label>
                </div>
                {/* Error */}
                <ErrorMessage component={InputErrorMessage} name="name" />
              </div>
              <div className="mb-[25px]">
                <div className="flex flex-col-reverse">
                  <Field className="peer signInInputs" validate={(v) => validator.isEmpty(v) && "This field is Required"} name="password" type="password" id="password" />
                  <label className="peer-focus:text-[#116eee]" htmlFor="password">
                    Password
                  </label>
                </div>
                {/* Error */}
                <ErrorMessage component={InputErrorMessage} name="password" />
              </div>
              {/* SignIn Button */}
              <div className="flex gap-3">
                <LoadingButton
                  className="font-[Helvetica] w-[220px] bg-[#007bff] hover:bg-[#0069d9] text-[#fff] rounded-[30px] m-auto block text-[16px] p-[8px] min-h-[42px] "
                  loading={isSubmitting}
                  type="submit"
                  color="primary">
                  Signin
                </LoadingButton>
                <LoadingButton
                  className="font-[Helvetica] w-[220px] bg-[#009dff] hover:bg-[#0069d9] text-[#fff] rounded-[30px] m-auto block text-[16px] p-[8px] min-h-[42px] "
                  onClick={() => (window.location.href = "/auth/signup")}
                  color="primary">
                  Signup
                </LoadingButton>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SignInPage;
