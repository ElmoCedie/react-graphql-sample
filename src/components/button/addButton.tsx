import React from "react";
import { Button } from "antd";
import styled from "styled-components";

const ButtonStyled = styled(Button)`
    height: 41px;
    margin-left: 25px;
`;

const AddButton: React.FC<any> = (props) => {
    return <ButtonStyled {...props}> {props.children}</ButtonStyled>;
};

export default AddButton;
