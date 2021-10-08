import React from "react";
import { Header } from "antd/lib/layout/layout";
import { Link } from "react-router-dom";
import styled from "styled-components";
import icon from "../../assets/icon.png";

const NavText = styled.div`
    margin: 0 10px 0 10px;
    color: #fff;
    font-size: 24px;

    &:hover {
        color: #ddd;
    }
`;

const NavWrapper = styled.div`
    display: flex;
`;

const CompanyIcon = styled.img`
    height: 50px;
    width: 50px;
`;

const HeaderStyled = styled(Header)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 30px;
    height: auto;
`;

const LayoutHeader: React.FC = () => {
    return (
        <HeaderStyled>
            <CompanyIcon src={icon} alt="" />

            <NavWrapper>
                <Link to={"/user"}>
                    <NavText>Users</NavText>
                </Link>
                <Link to={"/post"}>
                    <NavText>Post</NavText>
                </Link>
            </NavWrapper>
        </HeaderStyled>
    );
};

export default LayoutHeader;
