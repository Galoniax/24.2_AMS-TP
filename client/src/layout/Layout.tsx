import React from 'react';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
import Sidebar from './sidebar/Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <Navbar />
      <Sidebar />
      {children}
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
