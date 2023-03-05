import 'react-html5-camera-photo/build/css/index.css';
import {CameraOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {Button, Modal} from "antd";
import React, {useState} from "react";
import Camera, {FACING_MODES} from 'react-html5-camera-photo';

// eslint-disable-next-line react/prop-types
const CameraButton = ({onSaveData}) => {
  const [openCamera, setOpenCamera] = useState(false);

  const showModal = () => {
    setOpenCamera(true);
  };

  const handleCancel = () => {
    setOpenCamera(false)
  }

  const onTakePhoto = (dataUri) => {
    onSaveData(dataUri)
  }

  return <>
    <Button style={{maxWidth: "200px"}} onClick={showModal} type="primary"
            icon={<CameraOutlined/>} size={20}>
      Chụp mới
    </Button>
    <Modal
      open={openCamera}
      title="Hãy vẽ gì đó"
      width="auto"
      destroyOnClose={true}
      onCancel={handleCancel}
      footer={[<Button key="Reset" type="primary" danger onClick={handleCancel}>
        <CloseCircleOutlined color="red"/>
        Xóa
      </Button>,]}
    >
      <Camera
        idealFacingMode={FACING_MODES.ENVIRONMENT}
        onTakePhoto={(dataUri) => {
          onTakePhoto(dataUri);
        }}
      />
    </Modal>
  </>
}

export default CameraButton;