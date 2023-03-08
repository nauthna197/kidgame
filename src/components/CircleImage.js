import React from "react";

// eslint-disable-next-line react/prop-types
const CircleImage = ({ imageUrl, className, onClick }) => {
  return (
    <div onClick={onClick} className={"circle-image-wrapper " + className}>
      <img alt="" src={imageUrl} style={{width: "20px"}} />
    </div>
  );
};

export default CircleImage;
