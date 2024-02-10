import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../../components/loader";
import LoadingButton from "../../components/loadingButton";
import api from "../../services/api";

import toast from "react-hot-toast";
import InputErrorMessage from "../../components/inputErrorMassage";

export default function EditProject() {
  const [project, setProject] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const { data: u } = await api.get(`/project/${id}`);
      setProject(u);
    })();
  }, []);

  const history = useHistory();

  async function deleteData() {
    const confirm = window.confirm("Are you sure ?");
    if (!confirm) return;
    await api.remove(`/project/${id}`);
    toast.success("successfully removed!");
    history.push("/projects");
  }

  if (!project) return <Loader />;
  return (
    <div>
      <div className="appContainer pt-24">
        <div className="bg-[#FFFFFF] pb-4 border border-[#E5EAEF] rounded-[16px]">
          <div className="flex justify-between p-3 border-b border-[#E5EAEF]">
            <div>
              <span className="text-[18px] text-[#212325] font-semibold">Project details</span>
            </div>
            <button onClick={() => history.goBack()} className="border !border-[#0560FD] text-[#0560FD] py-[7px] px-[20px] bg-[#FFFFFF] rounded-[16px]">
              View project
            </button>
          </div>
          <Formik
            initialValues={project}
            onSubmit={async (values) => {
              try {
                await api.put(`/project/${project._id}`, values);
                toast.success(`${project.name} updated!`);
                history.push(`/project/${project._id}`);
              } catch (e) {
                console.log(e);
                toast.error("Some Error!");
              }
            }}>
            {({ values, handleSubmit, isSubmitting }) => (
              <Form>
                <div className="flex gap-4 pl-4 pt-4">
                  {project.logo && <img className="w-[85px] h-[85px] border border-[#E5EAEF] rounded-[8px]" src={project.logo} alt="ProjectImage.png" />}
                </div>

                <div className="py-3 px-4">
                  <div className="flex gap-4 mt-3">
                    <div className="w-full mx-2">
                      <div className="flex flex-col">
                        <label className="peer-focus:text-[#116eee]" htmlFor="name">
                          Name of the project
                        </label>
                        <Field className="peer signInInputs" name="name" type="text" id="name" />
                      </div>
                      {/* Error */}
                      <InputErrorMessage component={InputErrorMessage} name="name" />
                    </div>
                    <div className="w-full mx-2">
                      <div className="flex flex-col">
                        <label className="peer-focus:text-[#116eee]" htmlFor="lead">
                          Lead by name
                        </label>
                        <Field className="peer signInInputs" name="lead" type="text" id="lead" />
                      </div>
                      {/* Error */}
                      <ErrorMessage component={InputErrorMessage} name="lead" />
                    </div>
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
                  </div>
                  <div className="flex gap-4 mt-3">
                    <div className="w-full mx-2">
                      <div className="flex flex-col">
                        <label className="peer-focus:text-[#116eee]" htmlFor="budget_max_monthly">
                          Budget max / month
                        </label>
                        <Field className="peer signInInputs" name="budget_max_monthly" type="text" id="budget_max_monthly" />
                      </div>
                      {/* Error */}
                      <InputErrorMessage component={InputErrorMessage} name="budget_max_monthly" />
                    </div>
                    <div className="w-full mx-2">
                      <div className="flex flex-col">
                        <label className="peer-focus:text-[#116eee]" htmlFor="payment_cycle">
                          Status
                        </label>
                        <Field as="select" className="peer signInInputs" name="payment_cycle" id="status">
                          <option value="MONTHLY">Monthly</option>
                          <option value="ONE_TIME">One time</option>
                        </Field>
                      </div>
                      {/* Error */}
                      <ErrorMessage component={InputErrorMessage} name="payment_cycle" />
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
                  <div className="w-full mt-3">
                    <div className="w-full mx-2">
                      <div className="flex flex-col">
                        <label className="peer-focus:text-[#116eee]" htmlFor="objective">
                          Objective
                        </label>
                        <Field as="textarea" className="peer signInInputs" name="objective" id="objective" rows={10} />
                      </div>
                      {/* Error */}
                      <ErrorMessage component={InputErrorMessage} name="objective" />
                    </div>
                  </div>

                  <div className="text-xl mt-8">Links</div>
                  <div className="w-full mt-3">
                    <div className="w-full mx-2">
                      <div className="flex flex-col">
                        <label className="peer-focus:text-[#116eee]" htmlFor="website">
                          Website
                        </label>
                        <Field className="peer signInInputs" name="website" id="website" />
                      </div>
                      {/* Error */}
                      <ErrorMessage component={InputErrorMessage} name="website" />
                    </div>
                  </div>
                  <FieldArray
                    name="links"
                    render={(arrayHelpers) => (
                      <div>
                        {values.links && values.links.length > 0 ? (
                          values.links.map((link, index) => (
                            <div key={index} className="flex justify-center items-end gap-x-5">
                              <div className="w-full mt-3">
                                <div className="w-full mx-2">
                                  <div className="flex flex-col">
                                    <label className="peer-focus:text-[#116eee]" htmlFor={`links.${index}.label`}>
                                      Label
                                    </label>
                                    <Field className="peer signInInputs" name={`links.${index}.label`} id={`links.${index}.label`} />
                                  </div>
                                  {/* Error */}
                                  <ErrorMessage component={InputErrorMessage} name={`links.${index}.label`} />
                                </div>
                              </div>
                              <div className="w-full mt-3">
                                <div className="w-full mx-2">
                                  <div className="flex flex-col">
                                    <label className="peer-focus:text-[#116eee]" htmlFor={`links.${index}.url`}>
                                      URL
                                    </label>
                                    <Field className="peer signInInputs" name={`links.${index}.url`} id={`links.${index}.url`} />
                                  </div>
                                  {/* Error */}
                                  <ErrorMessage component={InputErrorMessage} name={`links.${index}.url`} />
                                </div>
                              </div>
                              <div>
                                <LoadingButton
                                  className="ml-[10px] bg-[#0560FD] text-[16px] font-medium text-[#fff] py-[9px] px-[22px] mb-2 rounded-[10px]"
                                  loading={isSubmitting}
                                  onClick={() => arrayHelpers.remove(index)}>
                                  Delete
                                </LoadingButton>
                              </div>
                            </div>
                          ))
                        ) : (
                          <LoadingButton
                            className="ml-[10px] bg-[#0560FD] text-[16px] font-medium text-[#fff] py-[12px] px-[22px] rounded-[10px]"
                            loading={isSubmitting}
                            onClick={() => arrayHelpers.push({ label: "", url: "" })}>
                            Add link
                          </LoadingButton>
                        )}
                      </div>
                    )}
                  />
                </div>
                <div className="flex ml-3 mt-2">
                  <LoadingButton
                    className="ml-[10px] bg-[#0560FD] text-[16px] font-medium text-[#fff] py-[12px] px-[22px] rounded-[10px]"
                    loading={isSubmitting}
                    onClick={handleSubmit}>
                    Update
                  </LoadingButton>
                  <button className="ml-[10px] bg-[#F43F5E] text-[16px] font-medium text-[#fff] py-[12px] px-[22px] rounded-[10px]" onClick={deleteData}>
                    Delete
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
