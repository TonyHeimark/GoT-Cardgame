import React, { useState, useRef, useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, extend, useThree, useRender } from 'react-three-fiber';

extend({ OrbitControls });

const CharModel = () => {
  const [model, setModel] = useState();

  useEffect(() => {
    new GLTFLoader().load('/character/scene.gltf', setModel);
  }, []);

  return model ? <primitive object={model.scene} /> : null;
};

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useRender(() => {
    orbitRef.current.update();
  });

  return (
    <orbitControls
      enableZoom={false}
      autoRotate
      maxPolarAngle={Math.PI / 3}
      minPolarAngle={Math.PI / 3}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  );
};

const Char3d = () => {
  const checkBrowser = typeof window !== 'undefined';

  return (
    <>
      {checkBrowser && (
        <Canvas camera={{ position: [1, 1, 2.4] }}>
          <ambientLight intensity={4} />
          <Controls />
          <CharModel />
        </Canvas>
      )}
    </>
  );
};

export default Char3d;
