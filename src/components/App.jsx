import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import NavBar from './NavBar';
import OneCard from './OneCard';
import Registration from './Registration';
import ToDoList from './ToDoList';

export default function App({ user, allPosts, Onetodo }) {
  return (
    <>
      <div className="container" style={{ marginTop: 15 }}>
        <NavBar user={user} />
      </div>
      <Routes>
        <Route path="/" element={<ToDoList user={user} allPosts={allPosts} />} />
        <Route path="/reg" element={<Registration />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/oneCard/:id" element={<OneCard Onetodo={Onetodo} />} />
      </Routes>
    </>
  );
}
