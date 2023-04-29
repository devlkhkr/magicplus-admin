import React from "react";
import {
  ReconciliationOutlined,
  HomeOutlined,
  GiftOutlined,
  AppstoreAddOutlined,
  BarcodeOutlined,
  UserOutlined,
  BarChartOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

interface menuListType {
  key: string
  label: string;
  icon?: any;
  children?: menuListType[];
}

export const menuList:menuListType[] = [
  {
    key: "/",
    icon: React.createElement(HomeOutlined),
    label: "대시보드",
  },
  {
    key: "order",
    icon: React.createElement(ReconciliationOutlined),
    label: "주문관리",
    children: [
      {
        key: "/order/check",
        label: "주문조회",
      },
      {
        key: "/order/return",
        label: "교환/반품",
      },
      {
        key: "/order/subs",
        label: "구독조회",
      },
      {
        key: "/order/contract",
        label: "약정조회",
      },
    ],
  },
  {
    key: "product",
    icon: React.createElement(GiftOutlined),
    label: "상품관리",
    children: [
      {
        key: "/product/list",
        label: "상품목록",
      },
      {
        key: "/product/regist",
        label: "상품등록",
      },
      {
        key: "/product/class",
        label: "분류관리",
      },
      {
        key: "/product/stock",
        label: "재고관리",
      },
    ],
  },
  {
    key: "display",
    icon: React.createElement(DesktopOutlined),
    label: "전시관리",
    children: [
      {
        key: "/display/sort",
        label: "진열순서관리",
      },
      {
        key: "/display/list",
        label: "전시목록관리",
      },
      {
        key: "/display/regist",
        label: "전시목록등록",
      },
    ],
  },
  {
    key: "coupon",
    icon: React.createElement(BarcodeOutlined),
    label: "프로모션관리",
    children: [
      {
        key: "/coupon/list",
        label: "쿠폰목록",
      },
      {
        key: "/coupon/regist",
        label: "쿠폰등록",
      },
    ],
  },
  {
    key: "contents",
    icon: React.createElement(AppstoreAddOutlined),
    label: "컨텐츠관리",
    children: [
      {
        key: "/contents/story",
        label: "STORY",
      },
      {
        key: "/contents/notice",
        label: "공지사항",
      },
      {
        key: "/contents/faq",
        label: "FAQ",
      },
      {
        key: "/contents/review",
        label: "리뷰",
      },
      {
        key: "/contents/qna",
        label: "고객문의",
      },
    ],
  },
  {
    key: "user",
    icon: React.createElement(UserOutlined),
    label: "회원/관리자",
    children: [
      {
        key: "/user/all",
        label: "회원조회",
      },
      {
        key: "/user/log",
        label: "접속관리",
      },
      {
        key: "/user/inactive",
        label: "비활동회원조회",
      },
      {
        key: "/user/admin",
        label: "관리자관리",
      },
    ],
  },
  {
    key: "stat",
    icon: React.createElement(BarChartOutlined),
    label: "통계",
    children: [
      {
        key: "stat_0",
        label: "미정",
      },
      {
        key: "stat_1",
        label: "미정",
      },
      {
        key: "stat_2",
        label: "미정",
      },
      {
        key: "stat_3",
        label: "미정",
      },
    ],
  },
]

export const antMenuList: MenuProps["items"] = menuList.map((menu, index) => {
  return {
    key: menu.key,
    icon: menu.icon,
    label: menu.label,
    children: menu.children
  }
})