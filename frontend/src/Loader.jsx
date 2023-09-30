import React from 'react';
import { RingLoader } from 'react-spinners';
import "./css/style.css"

const Loader = () => {
  return (
    <div className="loader-container d-flex justify-content-center align-items-center">
      <RingLoader color={'#123abc'} loading={true} />
    </div>
  );
};

export default Loader;
