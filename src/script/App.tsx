import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Button, Col, Row } from 'react-bootstrap'

function App() {

  return (
    <>
      <Row className="mb-3">
        <Col className="d-flex">
        <Button className="d-flex align-middle align-items-center flashcard-button">
          <span className="material-symbols-outlined">download</span>&nbsp;Save
        </Button>
        <Button className="d-flex align-middle align-items-center flashcard-button ms-1">
          <span className="material-symbols-outlined">file_open</span>&nbsp;Open 
            flashcards file...
        </Button>
        </Col>
        <Col className="d-flex">
        <Button className="d-flex align-middle align-items-center ms-auto flashcard-button">
          <span className="material-symbols-outlined">settings</span>&nbsp;Settings
        </Button>
        </Col>
      </Row>
      
      <Row>
        <Col className="col-sm-auto d-flex align-items-center">
          <Button className="material-symbols-outlined flashcard-round-button flashcard-button">
            arrow_back
          </Button>
        </Col>
        <Col className="col-sm-auto flashcard-display">
          <div>
            Flashcard Content
          </div>
        </Col>
        <Col className="col-sm-auto d-flex align-items-center">
          <Button className="material-symbols-outlined flashcard-round-button flashcard-button">
            arrow_forward
          </Button>
        </Col>
        <Col className="col-sm-auto ms-auto">
            <Button className={"d-flex align-middle flashcard-button flashcard-menu-button mb-1"}>
              <span className="material-symbols-outlined">add</span>&nbsp;Add...
            </Button>
            <Button className="d-flex align-middle flashcard-button flashcard-menu-button mb-1">
              <span className="material-symbols-outlined">edit</span>&nbsp;Edit...
            </Button>
            <Button className="d-flex align-middle flashcard-button flashcard-menu-button mb-1">
              <span className="material-symbols-outlined">delete</span>&nbsp;Delete...
            </Button>
            <Button className="d-flex align-middle flashcard-button flashcard-menu-button mb-1">
              <span className="material-symbols-outlined">view_carousel</span>&nbsp;Review...
            </Button>
        </Col>
      </Row>
    </>
  )
}

export default App
