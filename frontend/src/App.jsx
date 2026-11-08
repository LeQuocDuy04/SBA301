/**
 * Author: Lê Quốc Duy
 * Route configuration for Customer and Staff workflows
 */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MyBookings from './pages/MyBookings';
import Admin from './pages/Admin';
import AdminCustomers from './pages/AdminCustomers';
import AdminRooms from './pages/AdminRooms';
import AdminRoomTypes from './pages/AdminRoomTypes';
import AdminBookings from './pages/AdminBookings';
import NotFound from './pages/NotFound';

export default function App(){
 return <Routes><Route element={<Layout/>}>
  <Route index element={<Home/>}/><Route path="rooms" element={<Rooms/>}/>
  <Route path="login" element={<Login/>}/><Route path="register" element={<Register/>}/>
  <Route path="profile" element={<RequireAuth role="CUSTOMER"><Profile/></RequireAuth>}/>
  <Route path="my-bookings" element={<RequireAuth role="CUSTOMER"><MyBookings/></RequireAuth>}/>
  <Route path="admin" element={<RequireAuth role="STAFF"><Admin/></RequireAuth>}/>
  <Route path="admin/customers" element={<RequireAuth role="STAFF"><AdminCustomers/></RequireAuth>}/>
  <Route path="admin/rooms" element={<RequireAuth role="STAFF"><AdminRooms/></RequireAuth>}/>
  <Route path="admin/room-types" element={<RequireAuth role="STAFF"><AdminRoomTypes/></RequireAuth>}/>
  <Route path="admin/bookings" element={<RequireAuth role="STAFF"><AdminBookings/></RequireAuth>}/>
  <Route path="*" element={<NotFound/>}/>
 </Route></Routes>;
}
