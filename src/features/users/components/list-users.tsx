import React, { useContext, useEffect, useState } from "react";
import { Drawer, Input, Space, Spin, Table } from "antd";
import appContext from "../../../context/app-context";
import getListUser from "../graphql/queries/get-list-users";
import { columns } from "./constant";
import AddButton from "../../../components/button/addButton";
import { PlusOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router";
import { getUser } from "../graphql/queries/get-user";
import ViewUser from "./view-user";
import FormUser from "./form-post";

const { Search } = Input;

interface Props {
    id: string;
}

const ListUsers: React.FC = () => {
    const {
        state: { users },
        dispatch,
    } = useContext(appContext);
    const params = useParams<Props>();
    const history = useHistory();
    const [modalContent, setModalContetnt] = useState("view");
    const [sliderVisible, setSliderVisible] = useState(false);
    const [totalItem, setTotalItem] = useState(0);
    const [pagination, setPagination] = useState(1);
    const [search, setSearch] = useState("");
    const { loading: _userLoading, data: _userInfo, refetch: refetchGetuser } = getUser(params.id);
    const { loading, data, refetch, error } = getListUser({
        search: search,
        pagination: pagination,
    });

    useEffect(() => {
        if (params.id != undefined) {
            if (history.location.pathname.includes("update")) {
                setModalContetnt("edit");
            } else {
                setModalContetnt("view");
            }
            setSliderVisible(true);
        }
    }, []);

    useEffect(() => {
        if (_userInfo != undefined) {
            dispatch({
                type: "GET_USER",
                payload: _userInfo.user,
            });
        }
    }, [_userInfo]);

    useEffect(() => {
        if (data != undefined) {
            // store in state management
            dispatch({
                type: "STORE_USER",
                payload: data.users.data,
            });
            setTotalItem(data.users.meta.totalCount);
        }
        if (error != undefined) {
            console.log(error);
        }
    }, [data, error]);

    const handleOnSearch = (value: string) => {
        setPagination(1);
        setSearch(value);
        refetch();
    };

    const handlePagination = (value: number) => {
        setPagination(value);
        refetch();
    };

    const handleCloseModal = () => {
        history.push("/user");
        setSliderVisible(false);
        refetch();
    };

    const renderModalContent = () => {
        switch (modalContent) {
            case "view":
                return <ViewUser id={params.id} />;
            case "edit":
            case "add":
                return <FormUser id={params.id} onClose={() => handleCloseModal()} />;
            default:
                return <div></div>;
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
                        setModalContetnt("add");
                        setSliderVisible(true);
                    }}
                >
                    ADD USER
                </AddButton>
            </div>

            <Table
                loading={loading}
                dataSource={users.map((item, index) => ({
                    key: index,
                    id: item.id,
                    name: item.name,
                    username: item.username,
                    email: item.email,
                    action: (
                        <Space size="middle">
                            <a
                                onClick={() => {
                                    history.push(`/user/${item.id}`);
                                    refetchGetuser();
                                    setModalContetnt("view");
                                    setSliderVisible(true);
                                }}
                            >
                                view
                            </a>
                            <a
                                onClick={() => {
                                    history.push(`/user/update/${item.id}`);
                                    refetchGetuser();
                                    setModalContetnt("edit");
                                    setSliderVisible(true);
                                }}
                            >
                                edit
                            </a>
                            <a>delete</a>
                        </Space>
                    ),
                }))}
                pagination={{
                    current: pagination,
                    total: totalItem,
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
                {loading || _userLoading ? <Spin size={"large"} /> : renderModalContent()}
            </Drawer>
        </div>
    );
};

export default ListUsers;
