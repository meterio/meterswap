import React, { useState } from 'react';
import Aside from './Aside';


function Layout({ setLocale, collapsed,handleToggleCollapse,chainId}) {
  const [rtl, setRtl] = useState(false);
 
  const [image, setImage] = useState(true);
  const [toggled, setToggled] = useState(false);

 

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  

  return (
    <div className={`app ${rtl ? 'rtl' : ''} ${toggled ? 'toggled' : ''}`}>
      <Aside
        image={image}
        collapsed={collapsed}
        rtl={rtl}
        toggled={toggled}
        chainId={chainId}
        handleToggleCollapse = {handleToggleCollapse}
        handleToggleSidebar={handleToggleSidebar}
      />
     
    </div>
  );
}

export default Layout;
