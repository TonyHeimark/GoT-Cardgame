import React, { useEffect, useState } from 'react';

import music from '../assets/music/game.mp3';

const Layout = props => {
  const [isMusicActive, setIsMusicActive] = useState(true);

  const audio = new Audio(music);
  audio.loop = true;
  audio.volume = 0.15;

  const play = () => {
    setIsMusicActive(true);
  };

  const pause = () => {
    setIsMusicActive(false);
  };

  if (isMusicActive) {
    audio.play();
  } else {
    audio.pause();
  }

  return (
    <div>
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
