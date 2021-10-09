import React, { useContext, useEffect } from "react";
import { Typography, Space } from "antd";
import appContext from "../../../contenxt/app-context";

const { Title, Text } = Typography;

interface Props {
    id: string;
}

const ViewUser: React.FC<Props> = () => {
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
