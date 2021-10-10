import React, { useContext, useEffect } from "react";
import { Typography } from "antd";
import appContext from "../../../context/app-context";

const { Title, Paragraph } = Typography;

const ViewPost: React.FC = () => {
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

    return (
        <Typography>
            <Title level={4}>{post?.title}</Title>
            <Title level={5}>{`Created: ${post?.author}`}</Title>
            <Paragraph>{post?.body}</Paragraph>
        </Typography>
    );
};

export default ViewPost;
