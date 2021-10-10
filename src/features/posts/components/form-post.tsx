import { Button, message } from "antd";
import { Form, Formik } from "formik";
import { FormItem, Input } from "formik-antd";
import React, { useContext, useEffect } from "react";
import * as yup from "yup";
import appContext from "../../../context/app-context";
import updatePost from "../graphql/mutations/update-post";
import createPost from "../graphql/mutations/create-post";

interface Props {
    onClose: () => void;
}

const FormPost: React.FC<Props> = ({ onClose }) => {
    const {
        state: { post },
        dispatch,
    } = useContext(appContext);
    const [_createPost, { loading: createLoading }] = createPost();
    const [_updatePost, { loading: updateLoading }] = updatePost();

    useEffect(() => {
        return () => {
            if (post != null) {
                dispatch({
                    type: "GET_POST",
                    payload: null,
                });
            }
        };
    }, []);

    return (
        <div>
            <h1>{post != null ? "Update" : "Create"} a post </h1>

            <Formik
                initialValues={{
                    author: post != null ? post?.author : "",
                    title: post != null ? post?.title : "",
                    body: post != null ? post?.body : "",
                }}
                enableReinitialize={post != null ? true : false}
                validationSchema={yup.object().shape({
                    author: yup.string().required(),
                    title: yup.string().required(),
                    body: yup.string().required(),
                })}
                onSubmit={async (values) => {
                    try {
                        if (post) {
                            await _updatePost({
                                variables: {
                                    id: post.id,
                                    ...values,
                                },
                            });
                            message.success("Successfully updated a post");
                        } else {
                            await _createPost({
                                variables: {
                                    ...values,
                                },
                            });
                            message.success("Successfully created a post");
                        }
                    } catch (error) {
                        message.error("Something went wrong! try again later.");
                    }
                    onClose();
                }}
            >
                {({ submitForm, dirty }) => (
                    <Form>
                        <FormItem
                            label={<h3>Author:</h3>}
                            name={"author"}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <Input name="author" placeholder="Enter author name" />
                        </FormItem>
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
                            <Input.TextArea name="body" placeholder="Enter Body" rows={15} />
                        </FormItem>
                        <Button
                            onClick={submitForm}
                            disabled={updateLoading || createLoading || !dirty}
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FormPost;
