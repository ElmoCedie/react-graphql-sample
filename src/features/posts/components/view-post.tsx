import React from "react";
import getPost from "../graphql/queries/get-post";
import { Spin, Typography } from "antd";

const { Title, Paragraph } = Typography;

interface Props {
    id: string;
}

const ViewPost: React.FC<Props> = ({ id }) => {
    const { loading, data } = getPost(id);

    return loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Spin size="large" style={{ marginTop: 15 }} />
        </div>
    ) : (
        <Typography>
            <Title level={4}>{data?.post.title}</Title>
            <Title level={5}>{`Created By ${data?.post.user.username}`}</Title>
            <Paragraph>{data?.post.body}</Paragraph>
        </Typography>
    );
};

export default ViewPost;
