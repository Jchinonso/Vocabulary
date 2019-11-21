import React from "react";
import { Card, Form, Col, Row } from "react-bootstrap";
import "./FormComponent.css";

function FormComponent(props) {
  return (
    <Card className="Card-Container">
      <Form className=".Form">
        <Row>
          <Col>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>English</Form.Label>
              <Form.Control
                type="text"
                required
                value={props.englishWord}
                onChange={props.handleEnglishWordChange}
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
                value={props.germanWord}
                onChange={props.handleGermanWordChange}
                placeholder="Enter a German interpretation"
              />
            </Form.Group>
          </Col>
          <Col className="Btn-Column">
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="submit"
                onClick={props.handleSubmitWord}
                placeholder="Enter a German interpretation"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default FormComponent;
