import React, { useEffect } from 'react';

import music from '../assets/music/game.mp3';

const Layout = props => {
  return (
    <>
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
