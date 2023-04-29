import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import SearchForm from "../../../components/SearchForm";
import { DownloadOutlined } from "@ant-design/icons";
import { saveAs } from "file-saver";
import { utils, write } from "xlsx";
import RadioTabGroup from "../../../components/RadioTabGroup";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";

interface orderDataType {
  key: string;
  ordNo: number;
  ordState: string;
  ordType: string;
  ordDate: string;
  ordProduct: string;
  ordUsr: string;
}

const OrdChk: React.FC = () => {
  const [data, setData] = useState<orderDataType[]>([]);
  const [orderType, setOrderType] = useState("0");
  const { RangePicker } = DatePicker;
  const CheckboxGroup = Checkbox.Group;

  const getData = () => {
    axios
      .post("/api/order/list", {})
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          setData(response.data.orderList);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const ordSubsTypeOptions = [
    "구독으로 발생한 주문",
    "약정으로 발생한 주문",
    "일반주문",
  ];

  // S : 주문속성 체크박스 관련 상수 선언
  const [checkAllForOrdType, setCheckAllForOrdType] = useState(true);
  // E : 주문속성 체크박스 관련 상수 선언

  // S : 진행상태 체크박스 관련 상수 선언
  const [checkAllForOrdState, setCheckAllForOrdState] = useState(true);
  const ordStateOptions = [
    "주문접수",
    "상품준비중",
    "배송시작",
    "배송중",
    "배송완료",
    "구매확정",
    "주문취소",
    "주문거절",
    "배송보류",
  ];
  // E : 진행상태 체크박스 관련 상수 선언

  // S : react hook form 관련 상수 선언
  const { handleSubmit, control, reset, getValues, setValue } = useForm({
    defaultValues: {
      srchType: "0",
      srchKeyword: "",
      ordFromTo: null,
      ordRange: "0",
      ordSubType: [...ordSubsTypeOptions],
      ordState: [...ordStateOptions],
    },
  });
  const onSubmit = (data: any) => console.log(data);
  // E : react hook form 관련 상수 선언

  const onCheckAllChange = (
    e: any,
    key: any,
    options: any,
    checkAllFunc: any
  ) => {
    const { checked } = e.target;
    console.log(key);
    console.log(options);
    if (checked) {
      // 전체 선택 시
      setValue(
        key,
        options.map((option: any) => option)
      ); // ordSubType 필드에 모든 옵션 값 추가
    } else {
      // 전체 해제 시
      setValue(key, []); // ordSubType 필드의 값 비우기
    }
    checkAllFunc(checked); // checkAllForOrdType 상태 업데이트
  };

  const handleDownload = () => {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const wbout = write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "table.xlsx"
    );
  };

  const orderTabOptions = [
    { label: "전체", value: "0" },
    { label: "주문접수", value: "1" },
    { label: "상품준비중", value: "2" },
    { label: "배송시작", value: "3" },
    { label: "배송중", value: "4" },
    { label: "배송완료", value: "5" },
    { label: "구매확정", value: "6" },
  ];

  const rangeOptions = [
    { label: "오늘", value: "0" },
    { label: "1주일", value: "1" },
    { label: "2주일", value: "2" },
    { label: "1개월", value: "3" },
    { label: "3개월", value: "4" },
  ];

  interface DataType {
    key: React.Key;
    ordNo: number;
    ordState: string;
    ordType: string;
    ordDate: string;
    ordProduct: string;
    ordUsr: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "주문번호",
      dataIndex: "ordNo",
      key: "ordNo",
      width: 150,
      render: (text: string) => (
        <span className="underline cursor-pointer hover:text-[#1677ff] duration-300">
          {text}
        </span>
      ),
    },
    {
      title: "상태",
      dataIndex: "ordState",
      key: "ordState",
      width: 80,
      align: "center",
    },
    {
      title: "주문속성",
      dataIndex: "ordType",
      render: (text: string) => <Tag color={getTagColor(text)}>{text}</Tag>,
      key: "ordType",
      width: 100,
      align: "center",
    },
    {
      title: "주문일시",
      dataIndex: "ordDate",
      key: "ordDate",
      sorter: (a, b) =>
        new Date(a.ordDate).getTime() - new Date(b.ordDate).getTime(),
    },
    {
      title: "상품",
      dataIndex: "ordProduct",
      key: "ordProduct",
      ellipsis: true,
      render: (text: string) => (
        <a
          href="https://magicplus.skmagic.com/product/FSH-BSCC10PWH"
          rel="noreferrer"
          target="_blank"
          className="underline"
        >
          {text}
        </a>
      ),
    },
    {
      title: "주문자",
      dataIndex: "ordUsr",
      key: "ordUsr",
      ellipsis: true,
      render: (text: string) => (
        <span className="underline cursor-pointer hover:text-[#1677ff] duration-300">
          {text}
        </span>
      ),
    },
    orderType === "5" || orderType === "6"
      ? {
          title: "관리",
          dataIndex: "ordCtrl",
          key: "ordCtrl",
          align: "center",
          render: () => (
            <>
              <Button className="text-xs">교환</Button>
              <Button className="text-xs ml-2">반품</Button>
            </>
          ),
        }
      : {},
  ];

  const getTagColor = (ordType: string) => {
    //magenta, red, volcano, orange, gold, lime, green, cyan, blue, geekblue, purple
    switch (ordType) {
      case "약정":
        return "green";
      case "일반":
        return "gold";
      default:
        return "volcano";
    }
  };

  const options = [
    {
      value: "0",
      label: "주문번호",
    },
    {
      value: "1",
      label: "상품",
    },
    {
      value: "2",
      label: "주문자",
    },
  ];

  return (
    <div>
      <Title level={3}>주문조회</Title>
      <Divider />
      <RadioTabGroup>
        <Radio.Group
          options={orderTabOptions}
          onChange={(e) => {
            setOrderType(e.target.value);
          }}
          value={orderType}
          optionType="button"
        />
      </RadioTabGroup>
      <SearchForm onSubmit={handleSubmit(onSubmit)}>
        <table>
          <colgroup>
            <col width="15%" />
            <col width="*" />
          </colgroup>
          <tbody>
            <tr>
              <th>주문검색</th>
              <td>
                <Space.Compact>
                  <Controller
                    control={control}
                    name="srchType"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        options={options}
                        value={value || "0"}
                        onChange={(value) => {
                          onChange(value);
                        }}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="srchKeyword"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        placeholder="검색어를 입력하세요."
                        value={value}
                        onChange={(value) => {
                          onChange(value);
                        }}
                      />
                    )}
                  />
                </Space.Compact>
              </td>
            </tr>
            <tr>
              <th>주문일자</th>
              <td>
                <Controller
                  control={control}
                  name="ordFromTo"
                  render={({ field: { onChange, value } }) => (
                    <RangePicker
                      value={value}
                      onChange={(value) => {
                        onChange(value);
                      }}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="ordRange"
                  render={({ field: { onChange, value } }) => (
                    <Radio.Group
                      options={rangeOptions}
                      onChange={(value) => {
                        onChange(value);
                      }}
                      value={value}
                      optionType="button"
                      className="ml-2"
                    />
                  )}
                />
              </td>
            </tr>
            <tr>
              <th>주문속성</th>
              <td>
                <Checkbox
                  onChange={(e) => {
                    onCheckAllChange(
                      e,
                      "ordSubType",
                      ordSubsTypeOptions,
                      setCheckAllForOrdType
                    );
                  }}
                  checked={checkAllForOrdType}
                >
                  전체
                </Checkbox>
                <Controller
                  control={control}
                  name="ordSubType"
                  render={({ field: { onChange, value } }) => (
                    <CheckboxGroup
                      options={ordSubsTypeOptions}
                      onChange={(value) => {
                        setCheckAllForOrdType(
                          value.length === ordSubsTypeOptions.length
                        );
                        onChange(value);
                      }}
                      value={value}
                    />
                  )}
                />
              </td>
            </tr>
            {orderType === "0" ? (
              <tr>
                <th>진행상태</th>
                <td>
                  <Checkbox
                    onChange={(e) => {
                      onCheckAllChange(
                        e,
                        "ordState",
                        ordStateOptions,
                        setCheckAllForOrdState
                      );
                    }}
                    checked={checkAllForOrdState}
                  >
                    전체
                  </Checkbox>
                  <Controller
                    control={control}
                    name="ordState"
                    render={({ field: { onChange, value } }) => (
                      <CheckboxGroup
                        options={ordStateOptions}
                        onChange={(value) => {
                          setCheckAllForOrdState(
                            value.length === ordStateOptions.length
                          );
                          onChange(value);
                        }}
                        value={value}
                      />
                    )}
                  />
                </td>
              </tr>
            ) : (
              <></>
            )}
          </tbody>
        </table>
        {/* S : searchForm 검색 및 초기화 버튼 */}
        <div className="flex justify-center mt-5">
          <Button
            type="primary"
            className="w-32"
            onClick={() => {
              console.log(getValues());
              getData();
            }}
          >
            검색
          </Button>
          <Button
            className="ml-2 w-24"
            onClick={() => {
              reset({});
            }}
          >
            초기화
          </Button>
        </div>
        {/* E : searchForm 검색 및 초기화 버튼 */}
      </SearchForm>

      <Divider />

      {/* S : 테이블 상단 컨트롤 바 */}
      <Row className="mb-2">
        <Col span={12} className="flex justify-start items-center">
          <p>
            모두 <span className="font-bold">{data.length}</span>건의 주문
          </p>
        </Col>
        <Col span={12} className="flex justify-end items-center">
          <Button icon={<DownloadOutlined />} onClick={handleDownload}>
            엑셀 다운로드
          </Button>
        </Col>
      </Row>
      {/* E : 테이블 상단 컨트롤 바 */}

      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          defaultPageSize: 20,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
      />
    </div>
  );
};

export default OrdChk;
