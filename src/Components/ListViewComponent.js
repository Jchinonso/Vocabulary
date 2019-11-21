import React from "react";
import { Card, Button, Row } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import './ListViewComponent.css';

function ListViewComponent(props) {
  return (
    <div>
      <Row
       className="Row-List"
      >
        <Card
         className="Card-Container-List"
        >
          <Card.Body>
            {props.wordTranslated.map((item, index) => (
              <Card
                key={index}
                className="Card-List"
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
                      onClick={e => props.handleRemoveItem(e, item.word)}
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
        className="Btn-row"
      >
        <Card
          variant="light"
          style={{
            width: "30vw"
          }}
        >
          <Button
            variant="secondary"
            disabled={props.wordTranslated.length < 20}
            onClick={props.handleStartTestClick}
          >
            Start Test
          </Button>
        </Card>
      </Row>
    </div>
  );
}

export default ListViewComponent;
