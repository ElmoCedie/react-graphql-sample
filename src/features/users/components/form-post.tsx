import { Button, message } from "antd";
import { Form, Formik } from "formik";
import { FormItem, Input } from "formik-antd";
import React, { useContext, useEffect } from "react";
import * as yup from "yup";
import appContext from "../../../context/app-context";

interface Props {
    id?: string;
    onClose: () => void;
}

const FormUser: React.FC<Props> = ({ id, onClose }) => {
    const {
        state: { user },
        dispatch,
    } = useContext(appContext);

    useEffect(() => {
        return () => {
            dispatch({
                type: "GET_USER",
                payload: null,
            });
        };
    }, []);

    return (
        <div>
            <h1>{id != null ? "Update" : "Add"} a user </h1>

            <Formik
                initialValues={{
                    name: id != null ? user?.name : "",
                    username: id != null ? user?.username : "",
                    email: id != null ? user?.email : "",
                }}
                enableReinitialize={user != null ? true : false}
                validationSchema={yup.object().shape({
                    name: yup.string().required(),
                    username: yup.string().required(),
                    email: yup.string().required(),
                })}
                onSubmit={async (values) => {
                    console.log(values);
                    if (id) {
                        message.success("Sucessfully updated a user");
                    } else {
                        message.success("Sucessfully added a user");
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

                        <Button onClick={submitForm} disabled={false}>
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FormUser;
