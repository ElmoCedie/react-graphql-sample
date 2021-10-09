import React, { useContext, useEffect, useState } from "react";
import getListPost from "../graphql/queries/get-list-posts";
import { Input, Modal, Pagination, Spin } from "antd";
import CardItem from "./card-item";
import { useHistory, useParams } from "react-router-dom";
import { PostItem } from "../../../entities";
import ViewPost from "./view-post";
import appContext from "../../../contenxt/app-context";

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
    const [search, setSearch] = useState("");
    const { loading, data, refetch, error } = getListPost({
        search: search,
        pagination: pagination,
    });

    useEffect(() => {
        if (params.id != undefined) {
            setModalVisible(true);
        }
    }, [params]);

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

    const handleCloseModal = (value: boolean) => {
        if (!value) {
            history.push("/post");
        }
        setModalVisible(value);
    };

    return (
        <div style={{ paddingTop: 50 }}>
            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={handleOnSearch}
            />
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
                                onClick={(value: string) => {
                                    if (value == "view") {
                                        history.push(`/post/${item.id}`);
                                        handleCloseModal(true);
                                    }
                                }}
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
                onCancel={() => handleCloseModal(false)}
            >
                <ViewPost id={params.id} />
            </Modal>
        </div>
    );
};

export default ListPost;
