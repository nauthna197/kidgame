
import { CloseCircleOutlined } from "@ant-design/icons";
import React from "react";
import { Image } from "antd";

// eslint-disable-next-line react/prop-types
const ImageWrapper = ({ onHandleRemove, ...rest }) => {
  return (
    <div className="preview-image-wrapper">
      <Image {...rest} />
      <CloseCircleOutlined onClick={onHandleRemove} className="icon-close" style={{fontSize: '20px', color: '#DF2E38', cursor: 'pointer'}} />
    </div>
  );
};

export default ImageWrapper;
