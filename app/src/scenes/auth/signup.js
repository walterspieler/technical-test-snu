import React from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";

import { setUser } from "../../redux/auth/actions";

import LoadingButton from "../../components/loadingButton";
import api from "../../services/api";
import InputErrorMessage from "../../components/inputErrorMassage";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  organisation: Yup.string().required("Required"),
  password: Yup.string().min(6, "Password too short").max(100, "Password too long").required("Required"),
});

const SignupPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);

  return (
    // Auth Wrapper
    <div className="authWrapper font-myfont">
      <div className="font-[Helvetica] text-center text-[32px] font-semibold mb-[15px]">Account team</div>

      {user && <Redirect to="/" />}
      <Formik
        initialValues={{ name: "", organisation: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={async (values, actions) => {
          try {
            const { user, token } = await api.post(`/user/signup`, values);
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
                <div className="flex flex-col">
                  <label className="peer-focus:text-[#116eee]" htmlFor="name">
                    Username
                  </label>
                  <Field className="peer signInInputs " name="name" type="text" id="name" />
                </div>
                {/* Error */}
                <ErrorMessage component={InputErrorMessage} name="name" />
              </div>
              <div className="mb-[25px]">
                <div className="flex flex-col">
                  <label className="peer-focus:text-[#116eee]" htmlFor="organisation">
                    Organisation name
                  </label>
                  <Field className="peer signInInputs" name="organisation" type="text" id="organisation" />
                </div>
                {/* Error */}
                <ErrorMessage component={InputErrorMessage} name="organisation" />
              </div>
              <div className="mb-[25px]">
                <div className="flex flex-col">
                  <label className="peer-focus:text-[#116eee]" htmlFor="password">
                    Password
                  </label>
                  <Field className="peer signInInputs" name="password" type="password" id="password" />
                </div>
                {/* Error */}
                <ErrorMessage component={InputErrorMessage} name="password" />
              </div>
              {/* SignIn Button */}
              <LoadingButton
                className="font-[Helvetica] w-[220px] bg-[#007bff] hover:bg-[#0069d9] text-[#fff] rounded-[30px] m-auto block text-[16px] p-[8px] min-h-[42px] "
                loading={isSubmitting}
                type="submit"
                color="primary">
                Signup
              </LoadingButton>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SignupPage;
