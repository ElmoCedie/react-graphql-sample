import { Button, message } from "antd";
import { Form, Formik } from "formik";
import { FormItem, Input } from "formik-antd";
import React, { useContext, useEffect } from "react";
import * as yup from "yup";
import appContext from "../../../context/app-context";
import createPost from "../graphql/mutations/create-post";
import updatePost from "../graphql/mutations/update-post";

interface Props {
    id?: string;
    onClose: () => void;
}

const FormPost: React.FC<Props> = ({ id, onClose }) => {
    const {
        state: { post },
        dispatch,
    } = useContext(appContext);
    const [_createPost, { loading }] = createPost();
    const [_updatePost, { loading: updateLoading }] = updatePost();

    useEffect(() => {
        return () => {
            dispatch({
                type: "GET_POST",
                payload: null,
            });
        };
    }, []);

    return (
        <div>
            <h1>{id != null ? "Update" : "Create"} a post </h1>

            <Formik
                initialValues={{
                    title: id != null ? post?.title : "",
                    body: id != null ? post?.body : "",
                }}
                enableReinitialize={post != null ? true : false}
                validationSchema={yup.object().shape({
                    title: yup.string().required(),
                    body: yup.string().required(),
                })}
                onSubmit={async (values) => {
                    if (id) {
                        await _updatePost({
                            variables: {
                                formData: values,
                                id,
                            },
                        });
                        message.success("Successfully updated a post");
                    } else {
                        await _createPost({
                            variables: {
                                formData: values,
                            },
                        });
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
                        <Button onClick={submitForm} disabled={loading || updateLoading}>
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FormPost;
