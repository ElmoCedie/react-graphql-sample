import { Button, message } from "antd";
import { Form, Formik } from "formik";
import { FormItem, Input } from "formik-antd";
import React, { useContext, useEffect } from "react";
import * as yup from "yup";
import appContext from "../../../context/app-context";
import { v4 as uuidv4 } from "uuid";

interface Props {
    onClose: () => void;
}

const FormUser: React.FC<Props> = ({ onClose }) => {
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

    const handleAddUser = (value: any) => {
        dispatch({
            type: "ADD_USER",
            payload: {
                id: uuidv4(),
                ...value,
            },
        });
    };

    const handleUpdateUser = (value: any) => {
        dispatch({
            type: "UPDATE_USER",
            payload: {
                id: user?.id,
                ...value,
            },
        });
    };

    return (
        <div>
            <h1>{user != null ? "Update" : "Add"} a user </h1>

            <Formik
                initialValues={{
                    name: user != null ? user?.name : "",
                    username: user != null ? user?.username : "",
                    email: user != null ? user?.email : "",
                }}
                enableReinitialize={user != null ? true : false}
                validationSchema={yup.object().shape({
                    name: yup.string().required(),
                    username: yup.string().required(),
                    email: yup.string().required(),
                })}
                onSubmit={async (values) => {
                    console.log(values);
                    if (user) {
                        handleUpdateUser(values);
                        message.success("Sucessfully updated a user");
                    } else {
                        handleAddUser(values);
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
