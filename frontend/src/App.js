import Footer from './components/Footer/Footer.js';
import Header from './components/Header/Header.js';
import LandingPage from './pages/LandingPage.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyUser from "./MyNotes/MyUser.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import CreateNote from './pages/CreateUser.js';
import SingleUser from './pages/SingleUser.js';
import { useState } from 'react';
import UserProfile from './pages/UserProfile.js';

export default function App() {

  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mynotes" element={<MyUser search={search} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/createusers' element={<CreateNote />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user2/:id" element={<SingleUser />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}