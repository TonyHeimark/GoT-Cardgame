import React, { useState, useRef, useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, extend, useThree, useRender } from 'react-three-fiber';
import { FadeLoader } from 'react-spinners';

extend({ OrbitControls });
let loading = null;

const ThroneModel = () => {
  const [model, setModel] = useState();
  useEffect(() => {
    new GLTFLoader().load(
      '/throne/scene.gltf',
      gltf => {
        setModel(gltf);
        loading = false;
      },
      xhr => {
        loading = true;
      }
    );
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
      enablePan={false}
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
      {checkBrowser && !loading ? (
        <Canvas camera={{ position: [1, 1, 3] }}>
          <ambientLight intensity={3.5} />
          <Controls />
          <ThroneModel />
        </Canvas>
      ) : (
        <div className="victory__loader">
          <FadeLoader sizeUnit={'px'} size={100} color={'#fff'} />
        </div>
      )}
    </>
  );
};

export default IronThrone;
