import { Card, Cascader } from "antd";
import React from "react";
import styled from "styled-components";

import { EllipsisOutlined } from "@ant-design/icons";
import { CascaderValueType } from "antd/lib/cascader";

const CardStyled = styled(Card)`
    height: 150px;
    width: 300px;
    margin: 5px;

    .ant-card-body {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

interface Props {
    title: string;
    body: string;
    onClick: (value: string) => void;
}

const CardItem: React.FC<Props> = ({ title, body, onClick }): JSX.Element => {
    const renderMenu = (value: CascaderValueType) => {
        onClick(`${value[0]}`);
    };

    return (
        <CardStyled
            title={title}
            bordered={false}
            extra={
                <Cascader
                    options={[
                        { value: "view", label: "view" },
                        { value: "edit", label: "edit" },
                        { value: "delete", label: "delete" },
                    ]}
                    onChange={renderMenu}
                >
                    <EllipsisOutlined size={30} style={{ fontSize: 25 }} />
                </Cascader>
            }
        >
            {body}
        </CardStyled>
    );
};

export default CardItem;
