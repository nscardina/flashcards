import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap'
import CardDisplay from './card/card_display';
import { Card, EMPTY_CARD } from './card/card';
import DisplayFrontProvider, { DisplayFrontProviderFunction } from './DisplayFrontProvider';
import FileMenu from './FileMenu';
import { useDispatch, useSelector } from 'react-redux';
import { selectDeck } from './deck';



function App() {

  // const [cards, setCards] = useState<Card[]>([
  //   {
  //     frontFace: {
  //       layout: CardLayout.ONE_BOX_BH_TWO_BOXES_TH,
  //       box1: {
  //         type: CardContentType.TEXT,
  //         content: {
  //           text: "Test 1f"
  //         }
  //       },
  //       box2: {
  //         type: CardContentType.TEXT,
  //         content: {
  //           text: "Test 2f"
  //         }
  //       },
  //       box3: {
  //         type: CardContentType.TEXT,
  //         content: {
  //           text: "Test 3f"
  //         }
  //       },
  //       box4: {
  //         type: CardContentType.TEXT,
  //         content: {
  //           text: "Test 4f"
  //         }
  //       }
  //     },
  //     backFace: {
  //       layout: CardLayout.ONE_BOX,
  //       box1: {
  //         type: CardContentType.TEXT,
  //         content: {
  //           text: "Test 1b"
  //         }
  //       },
  //       box2: {
  //         type: CardContentType.TEXT,
  //         content: {
  //           text: "Test 2b"
  //         }
  //       },
  //       box3: {
  //         type: CardContentType.TEXT,
  //         content: {
  //           text: "Test 3b"
  //         }
  //       },
  //       box4: {
  //         type: CardContentType.TEXT,
  //         content: {
  //           text: "Test 4b"
  //         }
  //       }
  //     }
  //   }])

  const deck = useSelector(selectDeck)
    const dispatch = useDispatch()
  

  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0)
  const [displayFrontProvider, setDisplayFrontProvider] = useState<DisplayFrontProviderFunction>(() => DisplayFrontProvider.RANDOM)

  return (
    <>
      <Container>
        <Row>
          <Col xs={{ span: 4, order: 1 }} md={{ span: 2, order: 1 }}>
            <FileMenu />
          </Col>
          <Col className="d-flex align-items-center justify-content-center" xs={{ span: 12, order: 4 }} md={{ span: 3, order: 2 }}>
            <span className="material-symbols-outlined" aria-hidden="true">add</span>
            <span className="material-symbols-outlined" aria-hidden="true">edit</span>
            <span className="material-symbols-outlined" aria-hidden="true">close</span>
          </Col>

          <Col xs={{ span: 12, order: 3 }} md={{ span: 2, order: 3 }} className="d-flex justify-content-center align-items-center">
            Deck Name
          </Col>

          <Col xs={{ span: 8, order: 2 }} md={{ span: 5, order: 4 }} className="d-flex justify-content-end">
            <Dropdown align="end">
              <style>{`
                #settingsToggle::after {
                  display: none;
                }

                @media screen and (max-width: 576px) {
                  .xs-full-width-dropdown {
                    width: 100vw !important;
                  }
                }

                @media screen and (min-width: 576px) {
                  .xs-full-width-dropdown {
                    min-width: max-content;
                  }
                }

                
              `}</style>
              <Dropdown.Toggle id="settingsToggle" className="d-flex align-items-center flashcard-button border-0">
                <span className="material-symbols-outlined" aria-hidden="true" aria-label="Settings">settings</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="xs-full-width-dropdown">
                <Dropdown.ItemText className="d-flex align-items-center">
                  Deck Review Settings
                </Dropdown.ItemText>
                <Dropdown.Divider />

                <Dropdown.ItemText className="d-flex align-items-center">
                  Review order:
                  <Dropdown>
                    <Dropdown.Toggle className="flashcard-button border-0">
                      In order
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>In order</Dropdown.Item>
                      <Dropdown.Item>Reverse order</Dropdown.Item>
                      <Dropdown.Item>Random</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Dropdown.ItemText>

                <Dropdown.ItemText className="d-flex align-items-center">
                  Show side of card:
                  <Dropdown>
                    <Dropdown.Toggle className="flashcard-button border-0">
                      Front
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>Front</Dropdown.Item>
                      <Dropdown.Item>Back</Dropdown.Item>
                      <Dropdown.Item>Random</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Dropdown.ItemText>
              </Dropdown.Menu>
            </Dropdown>
            <Button>
              Review
            </Button>
          </Col>
        </Row>
        <Row className="mt-3 d-flex">
          <Col xs={{ span: 6, order: 2 }} md={{ span: 1, order: 1 }} className="d-flex align-items-center">
            <Button className="d-flex align-items-center flashcard-button flashcard-round-button">
              <span className="material-symbols-outlined">
                arrow_back
              </span>
            </Button>
          </Col>
          <Col xs={{ span: 12, order: 1 }} md={{ span: 10, order: 2 }}>
            {currentCardIndex >= 0 ? <CardDisplay card={deck && deck.currentVersion >= 0 && deck.versions[deck.currentVersion].cards.length > 0 ? 
            deck.versions[deck.currentVersion].cards[currentCardIndex] : EMPTY_CARD} 
            displayFront={displayFrontProvider} /> : ""}
          </Col>
          <Col xs={{ span: 6, order: 3 }} md={{ span: 1, order: 3 }} className="d-flex align-items-center">
            <Button className="d-flex align-items-center flashcard-button flashcard-round-button">
              <span className="material-symbols-outlined">
                arrow_forward
              </span>
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
