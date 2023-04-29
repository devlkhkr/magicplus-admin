import React from "react";
import { Layout } from "antd";
import SiderMenu from "./components/SideMenu";
import HeaderMenu from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import RouterComponent from "./router";
import HistoryTab from "./components/HistoryTab";
import { RecoilRoot } from "recoil";
import { Content } from "antd/es/layout/layout";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Layout style={{ minHeight: "100vh" }}>
          <HeaderMenu />
          <Layout>
            <SiderMenu />
            <Layout>
              <HistoryTab />
              <Content style={{ padding: "20px" }}>
                <RouterComponent />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
