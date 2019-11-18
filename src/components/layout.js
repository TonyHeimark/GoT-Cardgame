import React, { useEffect } from 'react';

import music from '../assets/music/game.mp3';

const Layout = props => {
  useEffect(() => {
    const audio = new Audio(music);
    audio.loop = true;
    audio.play();
    audio.volume = 0.2;
  }, []);

  return (
    <>
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
