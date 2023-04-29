import React from "react";
import Dashboard from "../pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import OrdChk from "../pages/Order/Check";
import ExcRtn from "../pages/Order/Return";
import SubsChk from "../pages/Order/Subs";
import CtrtChk from "../pages/Order/Contract";
import PrdList from "../pages/Product/List";
import PrdReg from "../pages/Product/Regist";
import ClsMng from "../pages/Product/Class";
import StckMng from "../pages/Product/Stock";
import DspList from "../pages/Display/List";
import DspReg from "../pages/Display/Regist";
import DspSrt from "../pages/Display/Sort";
import Story from "../pages/Contents/Story";
import Notice from "../pages/Contents/Notice";
import FAQ from "../pages/Contents/FAQ";
import Review from "../pages/Contents/Review";
import QNA from "../pages/Contents/QNA";
import UsrAll from "../pages/User/All";
import UsrLog from "../pages/User/Log";
import UsrInactive from "../pages/User/Inactive";
import UsrAdmin from "../pages/User/Admin";

const RouterComponent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route path="order/check" element={<OrdChk />} />
      <Route path="order/return" element={<ExcRtn />} />
      <Route path="order/subs" element={<SubsChk />} />
      <Route path="order/contract" element={<CtrtChk />} />

      <Route path="product/list" element={<PrdList />} />
      <Route path="product/regist" element={<PrdReg />} />
      <Route path="product/class" element={<ClsMng />} />
      <Route path="product/stock" element={<StckMng />} />

      <Route path="display/sort" element={<DspSrt />} />
      <Route path="display/list" element={<DspList />} />
      <Route path="display/regist" element={<DspReg />} />

      <Route path="coupon/list" element={<DspList />} />
      <Route path="coupon/regist" element={<DspReg />} />

      <Route path="contents/story" element={<Story />} />
      <Route path="contents/notice" element={<Notice />} />
      <Route path="contents/faq" element={<FAQ />} />
      <Route path="contents/review" element={<Review />} />
      <Route path="contents/qna" element={<QNA />} />

      <Route path="user/all" element={<UsrAll />} />
      <Route path="user/log" element={<UsrLog />} />
      <Route path="user/inactive" element={<UsrInactive />} />
      <Route path="user/admin" element={<UsrAdmin />} />
    </Routes>
  );
};

export default RouterComponent;
