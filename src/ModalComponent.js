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

function ModalComponent(props) {
  const [singleEnglishWord, setSingleEnglishWord] = useState("");
  const [counter, setCounter] = useState(1);
  const [progress, setProgress] = useState(0);
  const [translationText, setTranslationText] = useState("");
  const [result, setResult] = useState(0);
  const [preview, setPreview] = useState([]);
  const [previewScreen, setPreviewScreen] = useState(false);
  useEffect(() => {
    setSingleEnglishWord(props.alltwentywords[0]);
    setCounter(1);
    setProgress(5);
  }, [props.alltwentywords]);
  function handleOnChange(e) {
    e.preventDefault();
    setTranslationText(e.target.value);
  }
  function handleButtonClick(e) {
    e.preventDefault();
    if (counter === 20) {
      setPreviewScreen(true);
    }
    if (counter < 20) {
      if (translationText.trim().length > 0) {
        const singleText = props.alltwentywordobject.filter(
          item => item.word === singleEnglishWord
        )[0];
        const status = singleText.interpretation === translationText ? 5 : 0;
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
        setTranslationText('');
        setCounter(counter + 1);
        setSingleEnglishWord(props.alltwentywords[counter]);
        setProgress(progress + 5);
      }
    }
  }

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header> */}
        <Modal.Body
          style={{
            height: "70vh",
            overflow: "auto"
          }}
        >
          {previewScreen ? (
            <div style={{ marginLeft: "20px", marginRight: "20px" }}>
              <Row
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "20vh"
                }}
              >
                <span style={{fontSize: '25px'}}>Total Score</span>
                <span style={{fontSize: '50px', fontWeight: 'weight'}}>{`${result}%`}</span>
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
              <Row style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "25px", marginLeft: "20px" }}>
                  Word/Translation
                </span>
                <span style={{ fontSize: "25px", marginRight: "20px" }}>
                  {counter + "/" + props.alltwentywords.length}
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
                  margin: "20px"
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
                    marginTop: "50px",
                    marginLeft: "20px",
                    marginRight: "20px",
                    width: "50vw"
                  }}
                />
              </div>
            </div>
          )}
        </Modal.Body>
        {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
      </Modal>
    </div>
  );
}

export default ModalComponent;

