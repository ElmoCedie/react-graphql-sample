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

const FormPost: React.FC<Props> = ({ onClose }) => {
    const {
        state: { post },
        dispatch,
    } = useContext(appContext);

    useEffect(() => {
        return () => {
            dispatch({
                type: "GET_POST",
                payload: null,
            });
        };
    }, []);

    const handleAddPost = (value: any) => {
        dispatch({
            type: "ADD_POST",
            payload: {
                id: uuidv4(),
                ...value,
                user: {
                    username: "new.user",
                },
            },
        });
    };

    const handleUpdatePost = (value: any) => {
        dispatch({
            type: "UPDATE_POST",
            payload: {
                ...post,
                ...value,
                id: post?.id,
            },
        });
    };

    return (
        <div>
            <h1>{post != null ? "Update" : "Create"} a post </h1>

            <Formik
                initialValues={{
                    title: post != null ? post?.title : "",
                    body: post != null ? post?.body : "",
                }}
                enableReinitialize={post != null ? true : false}
                validationSchema={yup.object().shape({
                    title: yup.string().required(),
                    body: yup.string().required(),
                })}
                onSubmit={async (values) => {
                    if (post) {
                        handleUpdatePost(values);
                        message.success("Successfully updated a post");
                    } else {
                        handleAddPost(values);
                        message.success("Successfully created a post");
                    }
                    onClose();
                }}
            >
                {({ submitForm }) => (
                    <Form>
                        <FormItem
                            label={<h3>Title:</h3>}
                            name={"title"}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <Input name="title" placeholder="Enter title" />
                        </FormItem>
                        <FormItem
                            label={<h3>Body:</h3>}
                            name={"body"}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <Input.TextArea name="body" placeholder="Enter Body" />
                        </FormItem>
                        <Button onClick={submitForm}>Submit</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FormPost;
