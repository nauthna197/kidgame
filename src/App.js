import './App.scss';
import 'antd/dist/reset.css';
import {Button, Col, Modal, Row} from 'antd';
import React, {useRef, useState} from "react";
import {FormatPainterOutlined, CloseCircleOutlined, SaveOutlined} from '@ant-design/icons';
import CanvasDraw from "react-canvas-draw";
import {Image} from 'antd';
import CameraButton from "./components/CameraButton";
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

function App() {
  const [listDataDraw, setListDataDraw] = useState([]);
  const [listDataImage, setListDataImage] = useState([]);
  const [openDraw, setOpenDraw] = useState(false);
  const canvasRef = useRef(null)

  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement('audio');
    audio.src = url;
    audio.controls = true;
    const audioWrapper = document.getElementById("audio-wrapper");
    audioWrapper.insertBefore(audio, audioWrapper.firstChild);
  };


  const handleCancel = () => {
    setOpenDraw(false);
  };

  const showModal = () => {
    setOpenDraw(true);
  };

  const onSaveDraw = () => {
    setListDataDraw([...listDataDraw, canvasRef.current.getDataURL()]);
    setOpenDraw(false);
  }

  const onResetDraw = () => {
    canvasRef.current.eraseAll();
  }

  const onTakeCamera = (dataUri) => {
    setListDataImage([...listDataImage, dataUri]);
  }

  return (<div className="App">
    <div className="bigger-wrapper">
      <div className="wrapper">
        <Row className="simple-row">
          <Col span={4}>
            <div className="title left-title">What do you see</div>
          </Col>
          <div className="border-left"/>
          <Col span={19}>
            <div className="title right-div">
              {listDataDraw.map((data, index) => <Image
                key={index}
                width={200}
                src={data}
              />)}
              <Button style={{maxWidth: "200px"}} onClick={showModal} type="primary"
                      icon={<FormatPainterOutlined color={"52c41a"}/>} >
                Vẽ mới
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="simple-row">
          <Col span={4}>
            <div className="title left-title">Chụp mới</div>
          </Col>
          <div className="border-left"/>
          <Col span={19}>
            <div className="title right-div">
              {listDataImage.map((data, index) => <Image
                key={index}
                width={200}
                src={data}
              />)}
              <CameraButton onSaveData={onTakeCamera}/>
            </div>
          </Col>
        </Row>
        <Row className="simple-row">
          <Col span={4}>
            <div className="title left-title">What do you see</div>
          </Col>
          <div className="border-left"/>
          <Col span={19}>
            <div id="audio-wrapper" className="title right-div">
              <AudioRecorder
                onRecordingComplete={(blob) => addAudioElement(blob)}
                recorderControls={recorderControls}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
    <Modal
      open={openDraw}
      title="Hãy vẽ gì đó"
      width="auto"
      destroyOnClose={true}
      onCancel={handleCancel}
      footer={[
        <Button type="primary" key="back" onClick={onSaveDraw}>
          <SaveOutlined/>
          Lưu lại
        </Button>,
        <Button key="Reset" type="primary" danger onClick={onResetDraw}>
          <CloseCircleOutlined color="red"/>
          Xóa tất cả
        </Button>,
      ]}
    >
      <CanvasDraw
        ref={canvasRef}
        style={{
          boxShadow:
            "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)",
          width: "90%",
          height: "600px",
          marginBottom: "50px"
        }}
        disabled={false}
      />
    </Modal>
  </div>)
    ;
}

export default App;
