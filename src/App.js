import React from "react";
import { Routes, Route } from 'react-router-dom';

// Component
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import CrudService from "./components/CrudService/CrudService";
import Billing from "./pages/Billing/Billing";
import ListBilling from "./components/ListBilling/ListBilling";
import DashBoardBilling from "./pages/DashBoardBilling/DashBoardBilling";
import CreateBilling from "./components/CreateBilling/CreateBilling";
import CaseManager from "./pages/Cms/CaseManager";
import { AuthContextProvider } from "./context/AuthContext";
import ProtecRoute from "./components/ProtectRoute/ProtecRoute";

import 'antd/dist/antd.css';

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtecRoute />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/billing" element={<Billing />} >
              <Route path="dashboard" element={<DashBoardBilling />} />
              <Route path="listbilling" element={<ListBilling />} />
              <Route path="createbilling" element={<CreateBilling />} />
              <Route path="crudservice" element={<CrudService />} />
            </Route>
            <Route path="casemanager" element={<CaseManager />} />
          </Route>
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
