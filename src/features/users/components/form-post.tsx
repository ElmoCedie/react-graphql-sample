import { Button, message } from "antd";
import { Form, Formik } from "formik";
import { FormItem, Input } from "formik-antd";
import React, { useContext, useEffect } from "react";
import * as yup from "yup";
import appContext from "../../../context/app-context";
import createUser from "../graphql/mutation/create-post";
import updateUser from "../graphql/mutation/update-post";

interface Props {
    onClose: () => void;
}

const FormUser: React.FC<Props> = ({ onClose }) => {
    const {
        state: { user },
        dispatch,
    } = useContext(appContext);
    const [_createPost, { loading: createLoading }] = createUser();
    const [_updatePost, { loading: updateLoading }] = updateUser();

    useEffect(() => {
        return () => {
            if (user != null) {
                dispatch({
                    type: "GET_USER",
                    payload: null,
                });
            }
        };
    }, []);

    return (
        <div>
            <h1>{user != null ? "Update" : "Add"} a user </h1>

            <Formik
                initialValues={{
                    name: user != null ? user?.name : "",
                    username: user != null ? user?.username : "",
                    email: user != null ? user?.email : "",
                    phone: user != null ? user?.phone : "",
                }}
                enableReinitialize={user != null ? true : false}
                validationSchema={yup.object().shape({
                    name: yup.string().required(),
                    username: yup.string().required(),
                    email: yup.string().required(),
                    phone: yup.string().required(),
                })}
                onSubmit={async (values) => {
                    try {
                        if (user) {
                            _updatePost({
                                variables: {
                                    id: user.id,
                                    ...values,
                                },
                            });
                            message.success("Sucessfully updated a user");
                        } else {
                            _createPost({
                                variables: values,
                            });
                            message.success("Sucessfully added a user");
                        }
                    } catch (error) {
                        message.success("Something went wrong! try again later.");
                    }

                    onClose();
                }}
            >
                {({ submitForm }) => (
                    <Form>
                        <FormItem
                            label={<h3>Name:</h3>}
                            name={"name"}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <Input name="name" placeholder="Enter name" />
                        </FormItem>

                        <FormItem
                            label={<h3>Username:</h3>}
                            name={"username"}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <Input name="username" placeholder="Enter username" />
                        </FormItem>

                        <FormItem
                            label={<h3>Email:</h3>}
                            name={"email"}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <Input name="email" placeholder="Enter email" />
                        </FormItem>

                        <FormItem
                            label={<h3>Phone:</h3>}
                            name={"phone"}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <Input name="phone" placeholder="Enter phone number" />
                        </FormItem>

                        <Button onClick={submitForm} disabled={createLoading || updateLoading}>
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FormUser;
