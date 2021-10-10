import React, { useContext, useEffect } from "react";
import { Typography, Space } from "antd";
import appContext from "../../../context/app-context";

const { Title, Text } = Typography;

const ViewUser: React.FC = () => {
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
        <Typography>
            <Space direction="vertical">
                <Title level={5}>User Details</Title>
                <Text>User ID: {user?.id}</Text>
                <Text>Name: {user?.name}</Text>
                <Text>Username: {user?.username}</Text>
                <Text>Email: {user?.email}</Text>
            </Space>
        </Typography>
    );
};

export default ViewUser;
