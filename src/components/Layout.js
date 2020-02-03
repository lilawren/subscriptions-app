import React from 'react';
import './Layout.scss';

const Layout = ({ children }) => {
  return (
    <div className='layout-container'>
      <div className='layout-content'>{children}</div>
    </div>
  );
};

export default Layout;
