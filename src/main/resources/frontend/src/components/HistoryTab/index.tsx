import React from "react";
import { useRecoilState } from "recoil";
import { routeState } from "../../recoil/atom";
import styled from "styled-components";
import { menuList } from "../SideMenu/menuList";
import { useLocation, useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";

const RouteHistoryWrap = styled.div`
  display: flex;
  width: 100%;
  height: 42px;
  border-bottom: 1px solid #ddd;
  align-items: center;
  overflow-x: auto;
  white-space: nowrap;
  background-color: #fff;
  padding: 0 20px;
`;

const HistoryTabStyled = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  background-color: #e6f4ff;
  padding: 6px 12px;
  border-radius: 4px;
  &:hover {
    span {
      color: #1677ff;
    }
  }
  input {
    display: none;
    &:checked ~ span {
      color: #1677ff;
      font-weight: var(--weight-bold);
    }
  }
  span {
    transition-duration: 0.2s;
    color: #222;
  }
  & + & {
    margin-left: 16px;
  }
`;

const HistoryTab: React.FC = () => {
  const [routeHistory, setRouteHistory] = useRecoilState(routeState);
  const navigate = useNavigate();
  const location = useLocation();
  const reverseHistory = [...routeHistory].reverse();

  const getTabName = (path: string) => {
    let tabName = "";
    for (const menu of menuList) {
      if (menu.key === path) {
        tabName = menu.label;
        break;
      } else if (menu.children) {
        for (const child of menu.children) {
          if (child.key === path) {
            tabName = child.label;
            break;
          }
        }
      }
    }
    return tabName;
  };

  return (
    <RouteHistoryWrap>
      {reverseHistory.map((history: string, index: number) => {
        return (
          <HistoryTabStyled key={index} htmlFor={`history_${index}`}>
            <input
              type="radio"
              name="historyTab"
              id={`history_${index}`}
              checked={location.pathname === history}
              onChange={(e) => {
                if (e.target.checked === true) {
                  navigate(history);
                }
              }}
            />
            <span className="text-xs">{getTabName(history)}</span>
            <CloseOutlined
              onClick={() => {
                let delRouteHistory = routeHistory.filter(
                  (target: string) => target !== history
                );
                setRouteHistory(delRouteHistory);
              }}
              className="ml-1 opacity-50 text-[10px]"
            />
          </HistoryTabStyled>
        );
      })}
    </RouteHistoryWrap>
  );
};

export default HistoryTab;
