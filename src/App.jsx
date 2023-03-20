import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Draft from "./Pages/Draft/Draft";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import Home from "./Pages/Home/Home";
import NewPost from "./Pages/NewPost/NewPost";
import Search from "./Pages/Search/Search";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <AnimatePresence mode="wait">
          <Routes key={location.pathname} location={location}>
            <Route index element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/addblog" element={<NewPost />} />
            <Route path="/drafts" element={<Draft />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
