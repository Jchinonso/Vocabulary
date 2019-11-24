import React, { useState, useEffect } from "react";
import {
  Modal,
  Row,
  InputGroup,
  FormControl,
  Button,
  ProgressBar,
  Table
} from "react-bootstrap";

import FontAwesome from "react-fontawesome";

function ModalComponent(props) {
  const [singleEnglishWord, setSingleEnglishWord] = useState("");
  const [counter, setCounter] = useState(1);
  const [progress, setProgress] = useState(0);
  const [translationText, setTranslationText] = useState("");
  const [result, setResult] = useState(0);
  const [preview, setPreview] = useState([]);
  const [previewScreen, setPreviewScreen] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setSingleEnglishWord(props.alltwentywords[0]);
    setCounter(1);
    setProgress(0);
    setResult(0);
    setPreview([]);
    setTranslationText('');
    setShow(props.show);
  }, [props.alltwentywords, props.show]);
  function handleOnChange(e) {
    e.preventDefault();
    setTranslationText(e.target.value.trim());
  }

  function handlePreviewBack(e) {
    e.preventDefault()
    setPreviewScreen(false)
    setResult(0);
    setPreview([]);
    setCounter(1);
    setProgress(0);
  }
  function handleButtonClick(e) {
    e.preventDefault();
    let singleText = props.alltwentywordobject.filter(
      item => item.word === singleEnglishWord
    )[0];
    let status = singleText.interpretation === translationText ? 5 : 0;
    if (counter === 20) {
      setPreviewScreen(true);
      setResult(result + status);
        setPreview([
          ...preview,
          {
            word: singleText.word,
            interpretation: singleText.interpretation,
            inputText: translationText,
            status: status === 5 ? "hit" : "miss"
          }
        ]);
      setTranslationText('')
    }
    if (counter < 20) {
      if (translationText.length > 0) {
        setResult(result + status);
        setPreview([
          ...preview,
          {
            word: singleText.word,
            interpretation: singleText.interpretation,
            inputText: translationText,
            status: status === 5 ? "hit" : "miss"
          }
        ]);
        setTranslationText("");
        setCounter(counter + 1);
        setSingleEnglishWord(props.alltwentywords[counter]);
        setProgress(progress + 5);
      }
    }
  }

  return (
    <div>
      <Modal
        size="lg"
        animation
        show={show}
        backdrop="static"
        style={{
          borderRadius: "50px",
        }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
       
        <Modal.Body
          style={{
            height: "80vh",
            overflow: "auto"
          }}
        >
          {previewScreen ? (
            <div style={{ marginLeft: "20px", marginRight: "20px" }}>
              <Row>
                <span>
                  <FontAwesome
                    className="super-crazy-colors"
                    name="backward"
                    size="1.5x"
                    onClick={handlePreviewBack}
                    style={{
                      textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
                      cursor: "pointer"
                    }}
                  />
                </span>
              </Row>
              <Row
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "20vh"
                }}
              >
                <span style={{ fontSize: "25px" }}>Total Score</span>
                <span
                  style={{ fontSize: "50px", fontWeight: "weight" }}
                >{`${result}%`}</span>
              </Row>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Word</th>
                    <th>Interpretation</th>
                    <th>Input Text</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.map((item, index) => (
                    <tr key={index}>
                      <td>{item.word}</td>
                      <td>{item.interpretation}</td>
                      <td>{item.inputText}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <div>
              <Row
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "20px"
                }}
              >
                <span>
                  <FontAwesome
                    className="super-crazy-colors"
                    name="backward"
                    size="1.5x"
                    onClick={() => setShow(false)}
                    style={{
                      textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
                      cursor: "pointer"
                    }}
                  />
                </span>
                <span style={{ fontSize: "20px", marginLeft: "20px" }}>
                  Word/Translation
                </span>
              </Row>
              <Row style={{ display: "flex", justifyContent: "center" }}>
                <span
                  style={{
                    display: "flex",
                    fontSize: "70px",
                    fontWeight: "bold"
                  }}
                >
                  {singleEnglishWord}
                </span>
              </Row>

              <Row
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "20px",
                  marginTop: '60px'
                }}
              >
                <InputGroup className="mb-3" size="md">
                  <FormControl
                    placeholder="Enter Translation"
                    aria-label="Recipient's username"
                    value={translationText}
                    onChange={handleOnChange}
                    aria-describedby="basic-addon2"
                  />
                  <InputGroup.Append>
                    <Button
                      variant="outline-secondary"
                      onClick={handleButtonClick}
                    >
                      Submit
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Row>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <ProgressBar
                  now={progress}
                  label={`${progress}%`}
                  style={{
                    marginTop: "80px",
                    marginLeft: "20px",
                    marginRight: "20px",
                    width: "30vw"
                  }}
                />
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalComponent;
