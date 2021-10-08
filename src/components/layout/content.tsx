import React, { ReactNode } from "react";
import { Content } from "antd/lib/layout/layout";
import styled from "styled-components";

const ContentStyled = styled(Content)`
    height: calc(100vh - 88px);
    width: 100%;
    overflow: scroll;
    padding: 0 200px;
`;

interface Props {
    children: ReactNode;
}

const LayoutContent: React.FC<Props> = ({ children }) => {
    return <ContentStyled>{children}</ContentStyled>;
};

export default LayoutContent;
