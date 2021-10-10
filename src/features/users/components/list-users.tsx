import React, { useContext, useState } from "react";
import { Drawer, Space, Table } from "antd";
import appContext from "../../../context/app-context";
import { columns } from "./constant";
import AddButton from "../../../components/button/addButton";
import { PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import ViewUser from "./view-user";
import FormUser from "./form-post";
import { User } from "../../../entities";

const ListUsers: React.FC = () => {
    const {
        state: { users },
        dispatch,
    } = useContext(appContext);
    const history = useHistory();
    const [modalContent, setModalContent] = useState("view");
    const [sliderVisible, setSliderVisible] = useState(false);
    const [pagination, setPagination] = useState(1);

    const handlePagination = (value: number) => {
        setPagination(value);
    };

    const handleCloseModal = () => {
        history.push("/user");
        setSliderVisible(false);
    };

    const renderModalContent = () => {
        switch (modalContent) {
            case "view":
                return <ViewUser />;
            case "edit":
            case "add":
                return <FormUser onClose={() => handleCloseModal()} />;
            default:
                return <div></div>;
        }
    };

    const handleView = (value: User) => {
        dispatch({
            type: "GET_USER",
            payload: value,
        });
        setModalContent("view");
        setSliderVisible(true);
    };

    const handleUpdateUser = (value: User) => {
        dispatch({
            type: "GET_USER",
            payload: value,
        });
        setModalContent("edit");
        setSliderVisible(true);
    };

    const handleDeleteUser = (id: string) => {
        dispatch({
            type: "DELETE_USER",
            payload: id,
        });
    };

    return (
        <div style={{ paddingTop: 50 }}>
            <div style={{ display: "flex", marginBottom: 15 }}>
                <AddButton
                    icon={<PlusOutlined />}
                    onClick={() => {
                        setModalContent("add");
                        setSliderVisible(true);
                    }}
                >
                    ADD USER
                </AddButton>
            </div>

            <Table
                dataSource={users
                    .map((item, index) => ({
                        key: index,
                        name: item.name,
                        username: item.username,
                        email: item.email,
                        action: (
                            <Space size="middle">
                                <a onClick={() => handleView(item)}>view</a>
                                <a onClick={() => handleUpdateUser(item)}>edit</a>
                                <a onClick={() => handleDeleteUser(item.id)}>delete</a>
                            </Space>
                        ),
                    }))
                    .reverse()}
                pagination={{
                    current: pagination,
                    total: users.length,
                    pageSize: 5,
                    onChange: handlePagination,
                    hideOnSinglePage: true,
                }}
                columns={columns}
            />

            <Drawer
                title=""
                placement="right"
                width={350}
                destroyOnClose
                onClose={handleCloseModal}
                visible={sliderVisible}
            >
                {renderModalContent()}
            </Drawer>
        </div>
    );
};

export default ListUsers;
