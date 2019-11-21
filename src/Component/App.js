import React, { useState } from "react";
import {
  Container,
  Row,
  Navbar,
  Popover,
  OverlayTrigger
} from "react-bootstrap";

import MOdalComponent from "./ModalComponent";
import FormComponent from "./FormComponent";
import ListViewComponent from "./ListViewComponent";
import { translated } from "../utils/dummyObject";
import "./App.css";

const popover = (
  <Popover id="popover-contained">
    <Popover.Title as="h3">About Vocabulary</Popover.Title>
    <Popover.Content>
      This Application lets you manage vocabulary for a foreign language to be
      learned. It consists of a Form where you can insert two words, one for the
      native language (let's say English) and one for the foreign language
      (let's say German). The vocabulary pairs are appended to a List and can be
      deleted.<br></br>
      At any time you can start a Test mode which randomly chooses 20 words from
      the List in a random order. The Test mode then only shows one word at a
      time together with an input field where you insert the translated word.
      Submitting the translated word then shows the next word. The progress in
      the Test is indicated through a progress bar on bottom of the Test view.
      If no word is left, the Application will go to the Result view.
    </Popover.Content>
  </Popover>
);

function App() {
  const [englishWord, setEnglishWord] = useState("");
  const [germanWord, setGermanWord] = useState("");
  const [wordTranslated, setWordTranslated] = useState(translated);
  const [modalShow, setModalShow] = useState(false);
  const [allTwentywords, setAllTwentyWords] = useState([]);
  const [allTwentyWordObject, setAllTwentyWordObject] = useState([]);
  function handleEnglishWordChange(e) {
    e.preventDefault();
    setEnglishWord(e.target.value.trim());
  }
  function handleStartTestClick(e) {
    e.preventDefault();
    let allTwentyObject = [];
    allTwentyObject = wordTranslated
      .sort(() => Math.random() - Math.random())
      .slice(0, 20);
    setAllTwentyWords([...allTwentyObject.map(item => item.word)]);
    setAllTwentyWordObject([...allTwentyObject]);
    setModalShow(true);
  }
  function handleGermanWordChange(e) {
    e.preventDefault();
    setGermanWord(e.target.value.trim());
  }
  function handleRemoveItem(e, itemcopy) {
    e.preventDefault();
    const filteredWordTranslated = wordTranslated.filter(
      item => item.word !== itemcopy
    );
    setWordTranslated([...filteredWordTranslated]);
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
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Vocabulary App</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={popover}
            >
              <Navbar.Text style={{ cursor: "pointer" }}>About</Navbar.Text>
            </OverlayTrigger>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row
          className="Form-Container"
        >
          <FormComponent
            englishWord={englishWord}
            handleEnglishWordChange={handleEnglishWordChange}
            germanWord={germanWord}
            handleGermanWordChange={handleGermanWordChange}
            handleSubmitWord={handleSubmitWord}
          />
        </Row>

        {wordTranslated.length > 0 ? (
          <ListViewComponent
            wordTranslated={wordTranslated}
            handleRemoveItem={handleRemoveItem}
            handleStartTestClick={handleStartTestClick}
          />
        ) : null}
      </Container>
      <MOdalComponent
        alltwentywords={allTwentywords}
        alltwentywordobject={allTwentyWordObject}
        show={modalShow}
      />
    </div>
  );
}

export default App;
