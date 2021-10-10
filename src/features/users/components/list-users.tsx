import React, { useContext, useEffect, useState } from "react";
import { Drawer, Input, message, Space, Table } from "antd";
import appContext from "../../../context/app-context";
import { columns } from "./constant";
import AddButton from "../../../components/button/addButton";
import { PlusOutlined } from "@ant-design/icons";
import ViewUser from "./view-user";
import FormUser from "./form-post";
import { User } from "../../../entities";
import getListUser from "../graphql/queries/get-list-users";
import getListUserMeta from "../graphql/queries/list-post-meta";
import deleteUser from "../graphql/mutation/delete-post";

const { Search } = Input;

const ListUsers: React.FC = () => {
    const {
        state: { users },
        dispatch,
    } = useContext(appContext);
    const [modalContent, setModalContent] = useState("view");
    const [sliderVisible, setSliderVisible] = useState(false);
    const [pagination, setPagination] = useState(1);
    const [search, setSearch] = useState("");
    const [_deleteUser, { loading: deleteLoading }] = deleteUser();
    const {
        data: listUser,
        loading: listLoading,
        refetch: listUserRefetch,
        error,
    } = getListUser({
        search: search,
        pagination: pagination,
    });
    const {
        data: listUserMeta,
        loading: listLoadingMeta,
        refetch: listUserMetaRefetch,
    } = getListUserMeta({
        search: search,
        pagination: pagination,
    });

    useEffect(() => {
        if (listUser != undefined) {
            dispatch({
                type: "STORE_USER",
                payload: listUser.allUsers,
            });
        }
        if (error != undefined) {
            message.error("Somehthing went wrong! try again later");
        }
    }, [listUser, error]);

    const refetchList = () => {
        listUserRefetch();
        listUserMetaRefetch();
    };
    const handleOnSearch = (value: string) => {
        setPagination(1);
        setSearch(value);
        refetchList();
    };

    const handlePagination = (value: number) => {
        setPagination(value);
    };

    const handleCloseModal = () => {
        setSliderVisible(false);
    };

    const renderModalContent = () => {
        switch (modalContent) {
            case "view":
                return <ViewUser />;
            case "edit":
            case "add":
                return (
                    <FormUser
                        onClose={() => {
                            setSliderVisible(false);
                            refetchList();
                        }}
                    />
                );
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

    const handleDeleteUser = async (id: string) => {
        if (!deleteLoading) {
            try {
                await _deleteUser({
                    variables: {
                        id: id,
                    },
                });
                message.success("Successfully deleted a post");
                refetchList();
            } catch (error) {
                message.error("Somehthing went wrong! try again later");
            }
        }
    };

    return (
        <div style={{ paddingTop: 50 }}>
            <div style={{ display: "flex", marginBottom: 15 }}>
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={handleOnSearch}
                />
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
                loading={listLoading || listLoadingMeta}
                dataSource={users.map((item, index) => ({
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
                }))}
                pagination={{
                    current: pagination,
                    total: listUserMeta != null ? listUserMeta._allUsersMeta.count : 0,
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
