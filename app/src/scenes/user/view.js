import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory, useParams } from "react-router-dom";

import Loader from "../../components/loader";
import LoadingButton from "../../components/loadingButton";
import api from "../../services/api";
import * as Yup from "yup";
import InputErrorMessage from "../../components/inputErrorMassage";

const UpdateUserSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  job_title: Yup.string().optional(),
  days_worked: Yup.string().optional(),
  cost_per_day: Yup.string().optional(),
  sell_per_day: Yup.string().optional(),
  description: Yup.string().optional(),
});

const ViewPage = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const response = await api.get(`/user/${id}`);
      setUser(response.data);
    })();
  }, []);

  if (!user) return <Loader />;

  return (
    <div>
      <div className="appContainer pt-24">
        <Detail user={user} />
      </div>
    </div>
  );
};

const Detail = ({ user }) => {
  const history = useHistory();

  async function deleteData() {
    const confirm = window.confirm("Are you sure ?");
    if (!confirm) return;
    await api.remove(`/user/${user._id}`);
    toast.success("successfully removed!");
    history.push(`/user`);
  }

  return (
    <Formik
      initialValues={user}
      validationSchema={UpdateUserSchema}
      onSubmit={async (values) => {
        try {
          await api.put(`/user/${user._id}`, values);
          toast.success("Updated!");
        } catch (e) {
          console.log(e);
          toast.error(`Error: ${e.code}`);
        }
      }}>
      {({ isSubmitting }) => {
        return (
          <Form>
            <div className="flex justify-start mb-3">
              <div className="w-full mx-2">
                <div className="flex flex-col">
                  <label className="peer-focus:text-[#116eee]" htmlFor="name">
                    Name
                  </label>
                  <Field className="peer signInInputs" name="name" type="text" id="name" />
                </div>
                {/* Error */}
                <ErrorMessage component={InputErrorMessage} name="name" />
              </div>
              <div className="w-full mx-2">
                <div className="flex flex-col">
                  <label className="peer-focus:text-[#116eee]" htmlFor="email">
                    Email
                  </label>
                  <Field className="peer signInInputs" name="email" type="text" id="email" />
                </div>
                {/* Error */}
                <ErrorMessage component={InputErrorMessage} name="email" />
              </div>
            </div>
            <div className="flex justify-start mb-3">
              <div className="w-full mx-2">
                <div className="flex flex-col">
                  <label className="peer-focus:text-[#116eee]" htmlFor="status">
                    Status
                  </label>
                  <Field as="select" className="peer signInInputs" name="status" id="status">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Field>
                </div>
                {/* Error */}
                <ErrorMessage component={InputErrorMessage} name="status" />
              </div>
              <div className="w-full mx-2">
                <div className="flex flex-col">
                  <label className="peer-focus:text-[#116eee]" htmlFor="availability">
                    Availability
                  </label>
                  <Field as="select" className="peer signInInputs" name="availability" id="availability">
                    <option value="available">Available</option>
                    <option value="not available">Not available</option>
                  </Field>
                </div>
                {/* Error */}
                <ErrorMessage component={InputErrorMessage} name="availability" />
              </div>
            </div>
            <div className="flex flex-wrap justify-between mt-4">
              <div className="w-full mx-2">
                <div className="flex flex-col">
                  <label className="peer-focus:text-[#116eee]" htmlFor="job_title">
                    Job Title
                  </label>
                  <Field className="peer signInInputs" name="job_title" type="text" id="job_title" />
                </div>
                {/* Error */}
                <ErrorMessage component={InputErrorMessage} name="job_title" />
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <div className="w-full mx-2">
                <div className="flex flex-col">
                  <label className="peer-focus:text-[#116eee]" htmlFor="days_worked">
                    Days worked
                  </label>
                  <Field className="peer signInInputs" name="days_worked" type="number" id="days_worked" />
                </div>
                {/* Error */}
                <ErrorMessage component={InputErrorMessage} name="days_worked" />
              </div>
              <div className="w-full mx-2">
                <div className="flex flex-col">
                  <label className="peer-focus:text-[#116eee]" htmlFor="costPerDay">
                    Cost per day
                  </label>
                  <Field className="peer signInInputs" name="costPerDay" type="number" id="costPerDay" />
                </div>
                {/* Error */}
                <ErrorMessage component={InputErrorMessage} name="costPerDay" />
              </div>
              <div className="w-full mx-2">
                <div className="flex flex-col">
                  <label className="peer-focus:text-[#116eee]" htmlFor="sellPerDay">
                    Sell per day
                  </label>
                  <Field className="peer signInInputs" name="sellPerDay" type="number" id="sellPerDay" />
                </div>
                {/* Error */}
                <ErrorMessage component={InputErrorMessage} name="sellPerDay" />
              </div>
            </div>
            <div className="w-full mt-3">
              <div className="w-full mx-2">
                <div className="flex flex-col">
                  <label className="peer-focus:text-[#116eee]" htmlFor="description">
                    Description
                  </label>
                  <Field as="textarea" className="peer signInInputs" name="description" id="description" rows={10} />
                </div>
                {/* Error */}
                <ErrorMessage component={InputErrorMessage} name="description" />
              </div>
            </div>

            <div className="flex  mt-2">
              <LoadingButton className="bg-[#0560FD] text-[16px] font-medium text-[#FFFFFF] py-[12px] px-[22px] rounded-[10px]" loading={isSubmitting} type="submit">
                Update
              </LoadingButton>
              <button className="ml-[10px] bg-[#F43F5E] text-[16px] font-medium text-[#FFFFFF] py-[12px] px-[22px] rounded-[10px]" onClick={deleteData}>
                Delete
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ViewPage;
