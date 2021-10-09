import React, { useContext, useEffect, useState } from "react";
import getListPost from "../graphql/queries/get-list-posts";
import { Button, Drawer, Input, message, Modal, Pagination, Spin } from "antd";
import CardItem from "./card-item";
import { useHistory, useParams } from "react-router-dom";
import { PostItem } from "../../../entities";
import ViewPost from "./view-post";
import appContext from "../../../contenxt/app-context";
import FormPost from "./form-post";
import deletePost from "../graphql/mutations/delete-post";
import { lazyGetPost } from "../graphql/queries/get-post";

const { Search } = Input;

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
    const [totalItem, setTotalItem] = useState(0);
    const [pagination, setPagination] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [sliderVisible, setSliderVisible] = useState(false);
    const [search, setSearch] = useState("");
    const [_deletePost] = deletePost();
    const [getPostData, { loading: getloader, data: getData }] = lazyGetPost(params.id);
    const { loading, data, refetch, error } = getListPost({
        search: search,
        pagination: pagination,
    });

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

    useEffect(() => {
        if (data != undefined) {
            // store in state management
            dispatch({
                type: "STORE_POST",
                payload: data.posts.data,
            });
            setTotalItem(data.posts.meta.totalCount);
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
        refetch();
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
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={handleOnSearch}
                />
                <Button onClick={() => setSliderVisible(true)}>Create Post</Button>
            </div>

            <div style={{ height: 500 }}>
                {loading ? (
                    <Spin size="large" style={{ marginTop: 15 }} />
                ) : (
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                        }}
                    >
                        {posts.map((item: PostItem, index: number) => (
                            <CardItem
                                key={index}
                                title={item.title}
                                body={item.body}
                                onClick={(value: string) => handleCardEllipsis(value, item.id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <Pagination current={pagination} total={totalItem} onChange={handlePagination} />

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
