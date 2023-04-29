import React from "react";
import { Layout } from "antd";
import styled from "styled-components";

const { Header } = Layout;

const Logo = styled.div`
  float: left;
  color: #fff;
  padding-right: 24px;
  font-weight: var(--weight-bold);
`;

const HeaderMenu: React.FC = () => {
  return (
    <Header className="header">
      <Logo>SK Magic Plus Admin</Logo>
    </Header>
  );
};

export default HeaderMenu;
