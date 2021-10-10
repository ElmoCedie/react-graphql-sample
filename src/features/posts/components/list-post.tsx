import React, { useContext, useEffect, useState } from "react";
import { Drawer, message, Modal, Pagination, Spin } from "antd";
import CardItem from "./card-item";
import { useHistory, useParams } from "react-router-dom";
import { PostItem } from "../../../entities";
import ViewPost from "./view-post";
import appContext from "../../../context/app-context";
import FormPost from "./form-post";
import deletePost from "../graphql/mutations/delete-post";
import { lazyGetPost } from "../graphql/queries/get-post";
import AddButton from "../../../components/button/addButton";
import { PlusOutlined } from "@ant-design/icons";

interface Props {
    id: string;
}

const ListPost: React.FC = () => {
    const {
        state: { posts },
        dispatch,
    } = useContext(appContext);
    const params = useParams<Props>();
    const history = useHistory();
    const [pagination, setPagination] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [sliderVisible, setSliderVisible] = useState(false);
    const [_deletePost] = deletePost();
    const [getPostData, { loading: getloader, data: getData }] = lazyGetPost(params.id);

    useEffect(() => {
        if (params.id != undefined) {
            getPostData();
            if (history.location.pathname.includes("update")) {
                setSliderVisible(true);
            } else {
                setModalVisible(true);
            }
        }
    }, [params]);

    useEffect(() => {
        if (getData != undefined) {
            dispatch({
                type: "GET_POST",
                payload: getData.post,
            });
        }
    }, [getData]);

    const handlePagination = (value: number) => {
        setPagination(value);
    };

    const handleCloseModal = () => {
        history.push("/post");
        setSliderVisible(false);
        setModalVisible(false);
    };

    const handleCardEllipsis = async (value: string, id: string) => {
        switch (value) {
            case "view":
                getPostData();
                history.push(`/post/${id}`);
                setModalVisible(true);
                break;
            case "edit":
                getPostData();
                history.push(`/post/update/${id}`);
                setSliderVisible(true);
                break;
            case "delete":
                await _deletePost({
                    variables: {
                        id: id,
                    },
                });
                message.success("Successfully deleted a post");
                break;
            default:
                break;
        }
    };

    return (
        <div style={{ paddingTop: 50 }}>
            <div style={{ display: "flex" }}>
                <AddButton icon={<PlusOutlined />} onClick={() => setSliderVisible(true)}>
                    ADD POST
                </AddButton>
            </div>

            <div style={{ height: 500 }}>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    {posts
                        .slice(pagination == 1 ? 0 : (pagination - 1) * 9, pagination * 9)
                        .map((item: PostItem, index: number) => (
                            <CardItem
                                key={index}
                                title={item.title}
                                body={item.body}
                                onClick={(value: string) => handleCardEllipsis(value, item.id)}
                            />
                        ))}
                </div>
            </div>

            <Pagination
                current={pagination}
                total={posts.length}
                onChange={handlePagination}
                // hideOnSinglePage
                showSizeChanger={false}
            />

            <Modal
                visible={modalVisible}
                title=""
                footer={null}
                centered
                destroyOnClose
                onCancel={handleCloseModal}
            >
                {getloader ? <Spin size={"large"} /> : <ViewPost id={params.id} />}
            </Modal>

            <Drawer
                title=""
                placement="right"
                width={350}
                destroyOnClose
                onClose={handleCloseModal}
                visible={sliderVisible}
            >
                {getloader ? (
                    <Spin size={"large"} />
                ) : (
                    <FormPost id={params.id} onClose={handleCloseModal} />
                )}
            </Drawer>
        </div>
    );
};

export default ListPost;
