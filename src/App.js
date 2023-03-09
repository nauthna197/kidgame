import "./App.scss";
import "antd/dist/reset.css";
import { Button, Col, Modal, Row } from "antd";
import React, { useRef, useState } from "react";
import {
  FormatPainterOutlined,
  CloseCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import CanvasDraw from "react-canvas-draw";
import CameraButton from "./components/CameraButton";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { CirclePicker } from "react-color";
import CircleImage from "./components/CircleImage";
import ButtonGroup from "./components/ButtonGroup";
import ImageWrapper from "./components/ImageWrapper";

function App() {
  const [listDataDraw, setListDataDraw] = useState([]);
  const [listDataImage, setListDataImage] = useState([]);
  const [openDraw, setOpenDraw] = useState(false);
  const [brushColor, setBrushColor] = useState("#444");
  const [brushRadius, setBrushRadius] = useState("3");
  const [chooseGroup, setChooseGroup] = useState();
  const [audioDataList, setAudioDataList] = useState([]);
  const canvasRef = useRef(null);

  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const newData = [...audioDataList];
    newData.push(url);
    setAudioDataList(newData);
    // const audio = document.createElement("audio");
    // audio.src = url;
    // audio.controls = true;
    // const audioWrapper = document.getElementById("audio-wrapper");
    // audioWrapper.insertBefore(audio, audioWrapper.firstChild);
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
  };

  const onResetDraw = () => {
    canvasRef.current.eraseAll();
  };

  const onTakeCamera = (dataUri) => {
    setListDataImage([...listDataImage, dataUri]);
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${
          process.env.PUBLIC_URL + "/images/background.png"
        })`,
        backgroundSize: "cover",
      }}
    >
      <div className="body-wrapper">
        <div className="logo-wrapper">
          <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="" />
        </div>

        <div className="biggest-title">Bảng khảo sát nhóm</div>
        <div className="group-choose">
          <ButtonGroup
            onClick={() => setChooseGroup(1)}
            name="NHÓM 1"
            isActive={chooseGroup === 1}
          />
          <ButtonGroup
            onClick={() => setChooseGroup(2)}
            name="NHÓM 2"
            isActive={chooseGroup === 2}
          />
          <ButtonGroup
            onClick={() => setChooseGroup(3)}
            name="NHÓM 3"
            isActive={chooseGroup === 3}
          />
        </div>
        <div className="bigger-wrapper">
          <div className="wrapper">
            <Row className="simple-row">
              <Col span={4} className="column-title">
                <img
                  className="image flip"
                  src={process.env.PUBLIC_URL + "/images/girl-kinh-lup.png"}
                  alt="image"
                />
                <div className="title left-title text-beauty">Tôi thấy</div>
              </Col>
              <Col span={19} className="flex-center">
                <div className="title right-div">
                  {listDataDraw.map((data, index) => (
                    <ImageWrapper
                      onHandleRemove={() => {
                        const newList = [...listDataDraw];
                        newList.splice(index, 1);
                        setListDataDraw(newList);
                      }}
                      key={index}
                      src={data}
                    />
                  ))}
                  <Button
                    style={{ maxWidth: "200px" }}
                    onClick={showModal}
                    type="primary"
                    icon={<FormatPainterOutlined color={"52c41a"} />}
                  >
                    Vẽ mới
                  </Button>
                </div>
              </Col>
            </Row>
            <Row className="simple-row">
              <Col span={4} className="column-title">
                <img
                  className="image"
                  src={process.env.PUBLIC_URL + "/images/cau-be-bong-den.png"}
                  alt="image"
                />
                <div className="title left-title text-beauty">Tôi nghĩ</div>
              </Col>
              <Col span={19} className="flex-center">
                <div className="title right-div">
                  {listDataImage.map((data, index) => (
                    <ImageWrapper
                      onHandleRemove={() => {
                        const newList = [...listDataDraw];
                        newList.splice(index, 1);
                        setListDataImage(newList);
                      }}
                      key={index}
                      width={100}
                      src={data}
                    />
                  ))}
                  <CameraButton onSaveData={onTakeCamera} />
                </div>
              </Col>
            </Row>
            <Row className="simple-row">
              <Col span={4} className="column-title">
                <img
                  className="image"
                  src={process.env.PUBLIC_URL + "/images/question-mark.png"}
                  alt="image"
                />
                <div className="title left-title text-beauty">
                  Tôi băn khoăn
                </div>
              </Col>
              <Col span={19} className="flex-center">
                <div id="audio-wrapper" className="title right-div">
                  {audioDataList.map((data, index) => (
                    <div key={index} className="audio-wrapper">
                      <audio controls>
                        <source src={data} />
                      </audio>
                      <CloseCircleOutlined
                        onClick={() => {
                          const newData = [...audioDataList];
                          newData.splice(index, 1);
                          setAudioDataList(newData);
                        }}
                        className="icon-close"
                        style={{
                          fontSize: "25px",
                          color: "#DF2E38",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  ))}
                  <AudioRecorder
                    onRecordingComplete={(blob) => addAudioElement(blob)}
                    recorderControls={recorderControls}
                    classes="audioClass"
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
              <SaveOutlined />
              Lưu lại
            </Button>,
            <Button key="Reset" type="primary" danger onClick={onResetDraw}>
              <CloseCircleOutlined color="red" />
              Xóa tất cả
            </Button>,
          ]}
        >
          <div className="canvas-draw-wrapper">
            <CanvasDraw
              ref={canvasRef}
              brushColor={brushColor}
              brushRadius={brushRadius}
              style={{
                boxShadow:
                  "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)",
                width: "90%",
                marginBottom: "50px",
              }}
            />
            <div className="button-wrapper">
              <CircleImage
                className={brushRadius === "3" ? "active-brush" : ""}
                onClick={() => setBrushRadius("3")}
                imageUrl={process.env.PUBLIC_URL + "/medium-paint-brush.png"}
              />
              <CircleImage
                className={brushRadius === "6" ? "active-brush mt-20" : "mt-20"}
                onClick={() => setBrushRadius("6")}
                imageUrl={process.env.PUBLIC_URL + "/paint-brush.png"}
              />
              <CircleImage
                className={brushRadius === "9" ? "active-brush mt-20" : "mt-20"}
                onClick={() => setBrushRadius("9")}
                imageUrl={process.env.PUBLIC_URL + "/big-paint-brush.png"}
              />
            </div>
          </div>
          <CirclePicker
            onChange={(color, event) => setBrushColor(color.hex)}
            width="100%"
          />
        </Modal>
      </div>
      <img
        style={{
          position: "absolute",
          right: "0px",
          top: "10px",
          width: "100px",
        }}
        src={process.env.PUBLIC_URL + "/images/boy-lay.png"}
        alt=""
      />
      <img
        className="flip"
        style={{
          position: "absolute",
          width: "80px",
          bottom: "10px",
        }}
        src={process.env.PUBLIC_URL + "/images/penguin.gif"}
        alt=""
      />
      <img
        className="flip"
        style={{
          position: "absolute",
          width: "80px",
          marginLeft: "auto",
          right: "5px",
          bottom: "0",
        }}
        src={process.env.PUBLIC_URL + "/images/book-girl.gif"}
        alt=""
      />
    </div>
  );
}

export default App;
