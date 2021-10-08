import React, { useEffect, useState } from "react";
import getListPost from "../graphql/queries/get-list-posts";
import { Input, Modal, Pagination, Spin } from "antd";
import CardItem from "./card-item";
import { useHistory, useParams } from "react-router-dom";
import { PostItem } from "../../../entities";
import ViewPost from "./view-post";

const { Search } = Input;

interface Props {
    id: string;
}

const ListPost: React.FC = () => {
    const params = useParams<Props>();
    const history = useHistory();
    const [list, setList] = useState<PostItem[]>([]);
    const [totalItem, setTotalItem] = useState(0);
    const [pagination, setPagination] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState("");
    const { loading, data, refetch } = getListPost({
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
            setList(data.posts.data);
            setTotalItem(data.posts.meta.totalCount);
        }
    }, [data]);

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
                        {list.map((item: PostItem, index: number) => (
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
