import React, { useState, useRef, useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, extend, useThree, useRender } from 'react-three-fiber';

extend({ OrbitControls });

const ThroneModel = () => {
  const [model, setModel] = useState();

  useEffect(() => {
    new GLTFLoader().load('/throne/scene.gltf', setModel, xhr => {
      console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
    });
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

const IronThrone = () => {
  const checkBrowser = typeof window !== 'undefined';

  return (
    <>
      {checkBrowser && (
        <Canvas camera={{ position: [1, 1, 3] }}>
          <ambientLight intensity={4} />
          <Controls />
          <ThroneModel />
        </Canvas>
      )}
    </>
  );
};

export default IronThrone;
