import React, { useContext, useState } from "react";
import { Drawer, message, Modal, Space, Table } from "antd";
import { PostItem } from "../../../entities";
import ViewPost from "./view-post";
import appContext from "../../../context/app-context";
import FormPost from "./form-post";
import AddButton from "../../../components/button/addButton";
import { PlusOutlined } from "@ant-design/icons";
import { columns } from "./constant";

const ListPost: React.FC = () => {
    const {
        state: { posts },
        dispatch,
    } = useContext(appContext);
    const [pagination, setPagination] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [sliderVisible, setSliderVisible] = useState(false);

    const handlePagination = (value: number) => {
        setPagination(value);
    };

    const handleCloseModal = () => {
        setSliderVisible(false);
        setModalVisible(false);
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

    const handleDeletePost = (id: string) => {
        dispatch({
            type: "DELETE_POST",
            payload: id,
        });
        message.success("Successfully deleted a post");
    };

    return (
        <div style={{ paddingTop: 20 }}>
            <div style={{ display: "flex", marginBottom: 15 }}>
                <AddButton icon={<PlusOutlined />} onClick={() => setSliderVisible(true)}>
                    ADD POST
                </AddButton>
            </div>

            <Table
                dataSource={posts
                    .map((item, index) => ({
                        key: index,
                        title: item.title,
                        author: item.user.username,
                        action: (
                            <Space size="middle">
                                <a onClick={() => handleViewPost(item)}>view</a>
                                <a onClick={() => handleUpdatePost(item)}>edit</a>
                                <a onClick={() => handleDeletePost(item.id)}>delete</a>
                            </Space>
                        ),
                    }))
                    .reverse()}
                pagination={{
                    current: pagination,
                    total: posts.length,
                    pageSize: 9,
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
