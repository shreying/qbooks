import React from 'react';
import Home from './pages/home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllBooks from './pages/AllBooks';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails';


const App = () => {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/all-books" element={<AllBooks/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="view-book-details/:id" element={<ViewBookDetails/>} />
        </Routes>
        <Footer/>
      </Router>      
    </div>
  );
};

export default App;

