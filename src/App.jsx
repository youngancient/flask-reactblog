import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import BlogDetail from "./Pages/BlogDetail/BlogDetail";
import DraftList from "./Pages/Draft/DraftList";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import Home from "./Pages/Home/Home";
import NewPost from "./Pages/NewPost/NewPost";
import Search from "./Pages/Search/Search";
import DraftDetail from "./Pages/Draft/DraftDetail";
import EditDraft from "./Pages/Draft/EditDraft";

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
            <Route path="/post/:id" element={<BlogDetail />} />
            <Route path="/drafts" element={<DraftList />} />
            <Route path="/drafts/:id" element={<DraftDetail />} />
            <Route path="/drafts/edit/:id" element={<EditDraft/>} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </AnimatePresence>
      </div>
      <footer>
        <p>
          @young<strong>ancient2023</strong>
        </p>
      </footer>
    </div>
  );
}

export default App;
