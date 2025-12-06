import { useState } from "react";
import Brand from "./pages/Brand";
import Item from "./pages/Item";
import Model from "./pages/Model";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/items" />} />
          <Route path="/brands" element={<Brand />} />
          <Route path="/items" element={<Item />} />
          <Route path="/models" element={<Model />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
