import React, { useState } from "react";

import { Layout, Menu, theme } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { antMenuList } from "./menuList";
import { useRecoilState } from "recoil";
import { routeState } from "../../recoil/atom";

const { Sider } = Layout;

const SiderMenu: React.FC = () => {
  const location = useLocation();
  const [routeHistory, setRouteHistory] = useRecoilState(routeState);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const getParentPath = (path: string) => {
    return path.split("/")[1];
  };

  const beforeSetRouteHistory = (path: string) => {
    if (routeHistory.length >= 20) {
      alert("탭은 20개까지만 열 수 있습니다. 기존 탭을 닫아주세요.");
    } else if (routeHistory.includes(path)) {
      console.log("이미 탭에 추가된 메뉴");
    } else {
      setRouteHistory([...routeHistory, path]);
    }
  };

  return (
    <Sider
      collapsible
      width={200}
      style={{ background: colorBgContainer }}
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
        defaultOpenKeys={[getParentPath(location.pathname)]}
        style={{ height: "100%", borderRight: 0 }}
        items={antMenuList}
        onClick={(e) => {
          console.log(e);
          navigate(e.key);
          beforeSetRouteHistory(e.key);
        }}
      />
    </Sider>
  );
};

export default SiderMenu;
