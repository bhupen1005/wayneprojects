import React from 'react';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Footer from './components/Footer';

const App = () => (
  <div>
    <Header />
    <NavBar />
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Content />
    </div>
    <Footer />
  </div>
);

export default App;
