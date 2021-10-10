import React, { useContext, useEffect, useState } from "react";
import { Drawer, message, Modal, Space, Table, Input } from "antd";
import { PostItem } from "../../../entities";
import ViewPost from "./view-post";
import appContext from "../../../context/app-context";
import FormPost from "./form-post";
import AddButton from "../../../components/button/addButton";
import { PlusOutlined } from "@ant-design/icons";
import { columns } from "./constant";
import getListPost from "../graphql/queries/get-list-posts";
import getListPostMeta from "../graphql/queries/list-post-meta";
import deletePost from "../graphql/mutations/delete-post";

const { Search } = Input;

const ListPost: React.FC = () => {
    const {
        state: { posts },
        dispatch,
    } = useContext(appContext);
    const [pagination, setPagination] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [sliderVisible, setSliderVisible] = useState(false);
    const [search, setSearch] = useState("");
    const [_deletePost, { loading: deleteLoading }] = deletePost();
    const {
        data: listPost,
        loading: listLoading,
        refetch: listPostRefetch,
        error,
    } = getListPost({
        search: search,
        pagination: pagination,
    });
    const {
        data: listPostMeta,
        loading: listLoadingMeta,
        refetch: listPostMetaRefetch,
    } = getListPostMeta({
        search: search,
        pagination: pagination,
    });

    useEffect(() => {
        if (listPost != undefined) {
            dispatch({
                type: "STORE_POST",
                payload: listPost.allPosts,
            });
        }
        if (error != undefined) {
            message.error("Somehthing went wrong! try again later");
        }
    }, [listPost, error]);

    const refetchList = () => {
        listPostRefetch();
        listPostMetaRefetch();
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
        setModalVisible(false);
        refetchList();
    };

    const handleViewPost = (value: PostItem) => {
        dispatch({
            type: "GET_POST",
            payload: value,
        });
        setModalVisible(true);
    };

    const handleUpdatePost = (value: PostItem) => {
        dispatch({
            type: "GET_POST",
            payload: value,
        });
        setSliderVisible(true);
    };

    const handleDeletePost = async (id: string) => {
        if (!deleteLoading) {
            try {
                await _deletePost({
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
        <div style={{ paddingTop: 20 }}>
            <div style={{ display: "flex", marginBottom: 15 }}>
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={handleOnSearch}
                />
                <AddButton icon={<PlusOutlined />} onClick={() => setSliderVisible(true)}>
                    ADD POST
                </AddButton>
            </div>

            <Table
                loading={listLoading || listLoadingMeta}
                dataSource={posts.map((item, index) => ({
                    key: index,
                    title: item.title,
                    author: item.author,
                    action: (
                        <Space size="middle">
                            <a onClick={() => handleViewPost(item)}>view</a>
                            <a onClick={() => handleUpdatePost(item)}>edit</a>
                            <a onClick={() => handleDeletePost(item.id)}>delete</a>
                        </Space>
                    ),
                }))}
                pagination={{
                    current: pagination,
                    total: listPostMeta != undefined ? listPostMeta._allPostsMeta.count : 0,
                    pageSize: 5,
                    onChange: handlePagination,
                    hideOnSinglePage: true,
                    showSizeChanger: false,
                }}
                columns={columns}
            />

            <Modal
                visible={modalVisible}
                title=""
                footer={null}
                centered
                destroyOnClose
                onCancel={handleCloseModal}
            >
                <ViewPost />
            </Modal>

            <Drawer
                title=""
                placement="right"
                width={350}
                destroyOnClose
                onClose={handleCloseModal}
                visible={sliderVisible}
            >
                <FormPost onClose={handleCloseModal} />
            </Drawer>
        </div>
    );
};

export default ListPost;
