import React from "react";
import { Routes, Route } from 'react-router-dom';

// Component
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Account from "./components/Account/Account";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <div >
      <h1 className="text-center text-3xl font-bold">
        Loggin in
      </h1>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </AuthContextProvider>

    </div>
  );
}

export default App;
