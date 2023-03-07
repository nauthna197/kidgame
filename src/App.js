import './App.scss';
import 'antd/dist/reset.css';
import {Button, Col, Modal, Row} from 'antd';
import React, {useRef, useState} from "react";
import {FormatPainterOutlined, CloseCircleOutlined, SaveOutlined} from '@ant-design/icons';
import CanvasDraw from "react-canvas-draw";
import {Image} from 'antd';
import CameraButton from "./components/CameraButton";
import {AudioRecorder, useAudioRecorder} from 'react-audio-voice-recorder';
import {CirclePicker} from 'react-color';

function App() {
  const [listDataDraw, setListDataDraw] = useState([]);
  const [listDataImage, setListDataImage] = useState([]);
  const [openDraw, setOpenDraw] = useState(false);
  const [brushColor, setBrushColor] = useState("#444");
  const canvasRef = useRef(null);

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

  return (<div className="App" style={{
    backgroundImage: `url(${process.env.PUBLIC_URL + "/images/background.png"})`,
    backgroundSize: "cover",
  }}>
    <div className="logo-wrapper">
      <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt=""/>
    </div>
    <img style={{position: "absolute", right: "0px", top: "10px", width: "100px"}}
         src={process.env.PUBLIC_URL + "/images/boy-lay.png"} alt=""/>
    <img className="flip" style={{position: "absolute", right: "0px", top: "70%", width: "100px"}}
         src={process.env.PUBLIC_URL + "/images/book-girl.gif"} alt=""/>
    <img className="flip" style={{position: "absolute", left: "0px", top: "80%", width: "100px"}}
         src={process.env.PUBLIC_URL + "/images/penguin.gif"} alt=""/>
    <div className="biggest-title">
      Bảng khảo sát nhóm
    </div>
    <div className="bigger-wrapper">
      <div className="wrapper">
        <Row className="simple-row">
          <Col span={4} className="column-title">
            <img className="image flip" src={process.env.PUBLIC_URL + "/images/girl-kinh-lup.png"} alt="image"/>
            <div className="title left-title text-beauty">Tôi thấy</div>
          </Col>
          <Col span={19} className="flex-center">
            <div className="title right-div">
              {listDataDraw.map((data, index) => <Image
                key={index}
                width={100}
                src={data}
              />)}
              <Button style={{maxWidth: "200px"}} onClick={showModal} type="primary"
                      icon={<FormatPainterOutlined color={"52c41a"}/>}>
                Vẽ mới
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="simple-row">
          <Col span={4} className="column-title">
            <img className="image" src={process.env.PUBLIC_URL + "/images/cau-be-bong-den.png"} alt="image"/>
            <div className="title left-title text-beauty">Tôi nghĩ</div>
          </Col>
          <Col span={19} className="flex-center">
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
          <Col span={4} className="column-title">
            <img className="image" src={process.env.PUBLIC_URL + "/images/question-mark.png"} alt="image"/>
            <div className="title left-title text-beauty">Tôi băn khoăn</div>
          </Col>
          <Col span={19} className="flex-center">
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
        brushColor={brushColor}
        style={{
          boxShadow:
            "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)",
          width: "90%",
          marginBottom: "50px"
        }}
      />
      <CirclePicker onChange={(color, event) => setBrushColor(color.hex)} width="100%"/>
    </Modal>
  </div>)
    ;
}

export default App;
