import React, { useState } from "react";
import {
  Container,
  Row,
  Card,
  Form,
  Col,
  Navbar,
  Button
} from "react-bootstrap";
import MOdalComponent from "./ModalComponent";
import FontAwesome from "react-fontawesome";
import "./App.css";
const translated = [
  {
    word: "week",
    interpretation: "woche",
    original: "eng",
    inter: "de"
  },
  {
    word: "year",
    interpretation: "jahr",
    original: "eng",
    inter: "de"
  },
  {
    word: "today",
    interpretation: "heute",
    original: "eng",
    inter: "de"
  },
  {
    word: "tomorrow",
    interpretation: "morgen",
    original: "eng",
    inter: "de"
  },
  {
    word: "calender",
    interpretation: "kalender",
    original: "eng",
    inter: "de"
  },
  {
    word: "second",
    interpretation: "sekunde",
    original: "eng",
    inter: "de"
  },
  {
    word: "clock",
    interpretation: "uhr",
    original: "eng",
    inter: "de"
  },
  {
    word: "can",
    interpretation: "können",
    original: "eng",
    inter: "de"
  },
  {
    word: "use",
    interpretation: "benutzen",
    original: "eng",
    inter: "de"
  },
  {
    word: "do",
    interpretation: "machen",
    original: "eng",
    inter: "de"
  },
  {
    word: "go",
    interpretation: "gehen",
    original: "eng",
    inter: "de"
  },
  {
    word: "come",
    interpretation: "kommen",
    original: "eng",
    inter: "de"
  },
  {
    word: "laugh",
    interpretation: "lachen",
    original: "eng",
    inter: "de"
  },
  {
    word: "make",
    interpretation: "machen",
    original: "eng",
    inter: "de"
  },
  {
    word: "far",
    interpretation: "weit",
    original: "eng",
    inter: "de"
  },
  {
    word: "good",
    interpretation: "gut",
    original: "eng",
    inter: "de"
  },
  {
    word: "beautiful",
    interpretation: "schön",
    original: "eng",
    inter: "de"
  },
  {
    word: "ugly",
    interpretation: "hässlich",
    original: "eng",
    inter: "de"
  },
  {
    word: "difficult",
    interpretation: "schwierig",
    original: "eng",
    inter: "de"
  },
  {
    word: "easy",
    interpretation: "einfach",
    original: "eng",
    inter: "de"
  },
  {
    word: "bad",
    interpretation: "schlecht",
    original: "eng",
    inter: "de"
  },
  {
    word: "near",
    interpretation: "nahe",
    original: "eng",
    inter: "de"
  },
  {
    word: "Hello",
    interpretation: "Hallo",
    original: "eng",
    inter: "de"
  }
];
function App() {
  const [englishWord, setEnglishWord] = useState("");
  const [germanWord, setGermanWord] = useState("");
  const [wordTranslated, setWordTranslated] = useState(translated);
  const [modalShow, setModalShow] = useState(false);
  const [allTwentywords, setAllTwentyWords] = useState([]);
  const [allTwentyWordObject, setAllTwentyWordObject] = useState([]);
  function handleEnglishWordChange(e) {
    e.preventDefault();
    setEnglishWord(e.target.value);
  }
  function handleStartTestClick(e) {
    e.preventDefault();
    let allTwentyObject = [];
    allTwentyObject = wordTranslated.sort(() => Math.random() - Math.random()).slice(0, 20)
    setAllTwentyWords([...allTwentyObject.map(item => item.word)]);
    setAllTwentyWordObject([...allTwentyObject]);
    setModalShow(true);
  }
  function handleGermanWordChange(e) {
    e.preventDefault();
    setGermanWord(e.target.value);
  }
  function handleRemoveItem(e, itemcopy) {
    e.preventDefault();
    const filteredWordTranslated = wordTranslated.filter(item => item.word !== itemcopy);
    setWordTranslated([...filteredWordTranslated])
  }
  function handleSubmitWord(e) {
    e.preventDefault();
    if (englishWord.length > 0 && germanWord.length > 0) {
      const filtered = wordTranslated.filter(item => item.word !== englishWord);
      setWordTranslated([
        ...filtered,
        {
          word: englishWord,
          interpretation: germanWord,
          original: "eng",
          inter: "de"
        }
      ]);
      setGermanWord("");
      setEnglishWord("");
    }
  }
  return (
    <div>
      <Navbar bg="light" expand="lg"></Navbar>
      <Container>
        <Row
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Card
            style={{
              width: "50vw",
              height: "200px",
              boxShadow: "0 0 14px 0 rgba(0,0,0,.19)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              borderRadius: "50px"
            }}
          >
            <Form style={{ marginLeft: "20px" }}>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>English</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={englishWord}
                      onChange={handleEnglishWordChange}
                      placeholder="Enter an English word"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>German</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={germanWord}
                      onChange={handleGermanWordChange}
                      placeholder="Enter a German interpretation"
                    />
                  </Form.Group>
                </Col>
                <Col style={{ display: "flex", alignItems: "flex-end" }}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="submit"
                      onClick={handleSubmitWord}
                      placeholder="Enter a German interpretation"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Card>
        </Row>

        {wordTranslated.length > 0 ? (
          <div>
            <Row
              style={{
                marginTop: "50px",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <Card
                style={{
                  width: "50vw",
                  height: "300px",
                  display: "flex",
                  borderRadius: "20px",
                  overflow: "auto"
                }}
              >
                <Card.Body>
                  {wordTranslated.map((item, index) => (
                    <Card
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: "10px",
                        height: "50px",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "#fafafa"
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span
                          style={{
                            marginLeft: "10px",
                            fontSize: "18px",
                            fontWeight: "bold"
                          }}
                        >
                          {item.word}
                        </span>
                        <span style={{ marginLeft: "10px", fontSize: "12px" }}>
                          {item.interpretation}
                        </span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ marginRight: "10px" }}>
                          <FontAwesome
                            className="super-crazy-colors"
                            name="remove"
                            size="1x"
                            onClick={(e) => handleRemoveItem(e, item.word)}
                            style={{
                              textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
                              cursor: "pointer"
                            }}
                          />
                        </span>
                      </div>
                    </Card>
                  ))}
                </Card.Body>
              </Card>
            </Row>
            <Row
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
                alignItems: "center"
              }}
            >
              <Card
                variant="light"
                style={{
                  width: "50vw"
                }}
              >
                <Button
                  variant="primary"
                  disabled={wordTranslated.length < 20}
                  onClick={handleStartTestClick}
                >
                  Start Test
                </Button>
              </Card>
            </Row>
          </div>
        ) : null}
      </Container>
      <MOdalComponent
        alltwentywords={allTwentywords}
        alltwentywordobject={allTwentyWordObject}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default App;
