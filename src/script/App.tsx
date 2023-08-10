import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import MenuBar from './ui/MenuBar';
import DeckInteractionArea from './ui/DeckInteractionArea';
import { useSelector } from 'react-redux';
import { selectVisibleDialog, selectVisibleEditor } from './state/Store';
import { Editor } from './app/Editor';
import TextEditor from './ui/TextEditor';
import Dialog from './app/Dialog';
import NewDeckConfirmationMessage from './ui/NewDeckConfirmationMessage';

function App() {

    const visibleEditor = useSelector(selectVisibleEditor)
    const visibleDialog = useSelector(selectVisibleDialog)

    return (
        <>
            <MenuBar/>
            <DeckInteractionArea />
            {visibleEditor === Editor.TEXT && <TextEditor />}
            
            {visibleDialog === Dialog.NEW_DECK_CONFIRMATION_MESSAGE && 
            <NewDeckConfirmationMessage />
            }
        </>
    )
}

export default App

// function App() {

//   const deck = useSelector(selectDeck)
//   const editingState = useSelector(selectEditingState)
//   const dispatch = useDispatch()

//   const [currentMode, setCurrentMode] = useState<AppMode>(AppMode.GENERAL)
//   const [currentCardIndex, setCurrentCardIndex] = useState<number>(0)

//   const [displayFrontProvider, setDisplayFrontProvider] = useState<DisplayFrontProviderFunction>(() => DisplayFrontProvider.FRONT)
//   const displayFront = displayFrontProvider()

//   const inputEditorContainerRef = useRef(null)

//   const textInputEditorRef = useRef(null)
//   const [showTextInputEditor, setShowTextInputEditor] = useState<boolean>(false)

//   return (
//     <>
//       <Container ref={inputEditorContainerRef}>
//         <Row>
//           <Col xs={{ span: 8, order: 1 }} md={{ span: 'auto', order: 1 }}>
//             <Container>
//               <Row>
//                 <Col className="ps-0 pe-0 col-auto"><FileMenu /></Col>
//                 {currentMode === AppMode.EDIT &&
//                   <>
//                     <Col className="ps-0 pe-0 col-auto"><EditMenu /></Col>
//                     <Col className="ps-0 pe-0"><DeckMenu /></Col>
//                   </>
//                 }
//                 {currentMode === AppMode.EDIT &&
//                   <Col className="ps-0 pe-0">
//                     <Button className="d-flex align-items-center flashcard-button"
//                       style={{ borderWidth: '0px' }}>
//                       <span className="material-symbols-outlined" aria-hidden="true">flip</span>
//                     </Button>
//                   </Col>
//                 }
//               </Row>
//             </Container>


//           </Col>
//           <Col className="d-flex align-items-center justify-content-center" xs={{ span: 12, order: 4 }} md={{ span: 'auto', order: 2 }}>
//             {currentMode === AppMode.GENERAL &&
//               <>
//                 <Button onClick={() => {
//                   setCurrentMode(AppMode.EDIT)
//                   dispatch(newCard())
//                 }}
//                   className="d-flex align-items-center flashcard-button border-0">
//                   <span className="material-symbols-outlined" aria-hidden="true">add</span>
//                 </Button>
//                 <Button onClick={() => setCurrentMode(AppMode.EDIT)}
//                   className="d-flex align-items-center flashcard-button border-0">
//                   <span className="material-symbols-outlined" aria-hidden="true">edit</span>
//                 </Button>
//                 <Button onClick={() => setCurrentMode(AppMode.EDIT)}
//                   className="d-flex align-items-center flashcard-button border-0 z-1">
//                   <span className="material-symbols-outlined" aria-hidden="true">close</span>
//                 </Button>
//               </>
//             }

//           </Col>

//           <Col xs={{ span: 12, order: 3 }} md={{ span: 2, order: 3 }} className="ms-auto d-flex justify-content-center align-items-center">
//             {deck && deck.versions && deck.versions.length >= 0 && deck.currentVersion >= 0 ? deck.versions[deck.currentVersion].name : ''}
//           </Col>

//           <Col xs={{ span: 4, order: 2 }} md={{ span: 5, order: 4 }} className="d-flex justify-content-end">
//             <Dropdown align="end">
//               <style>{`
//                 #settingsToggle::after {
//                   display: none;
//                 }

//                 @media screen and (max-width: 576px) {
//                   .xs-full-width-dropdown {
//                     width: 100vw !important;
//                   }
//                 }

//                 @media screen and (min-width: 576px) {
//                   .xs-full-width-dropdown {
//                     min-width: max-content;
//                   }
//                 }

                
//               `}</style>
//               <Dropdown.Toggle id="settingsToggle" className="d-flex align-items-center flashcard-button border-0">
//                 <span className="material-symbols-outlined" aria-hidden="true" aria-label="Settings">settings</span>
//               </Dropdown.Toggle>
//               <Dropdown.Menu className="xs-full-width-dropdown">
//                 <Dropdown.ItemText className="d-flex align-items-center">
//                   Deck Review Settings
//                 </Dropdown.ItemText>
//                 <Dropdown.Divider />

//                 <Dropdown.ItemText className="d-flex align-items-center">
//                   Review order:
//                   <Dropdown>
//                     <Dropdown.Toggle className="flashcard-button border-0">
//                       In order
//                     </Dropdown.Toggle>
//                     <Dropdown.Menu>
//                       <Dropdown.Item>In order</Dropdown.Item>
//                       <Dropdown.Item>Reverse order</Dropdown.Item>
//                       <Dropdown.Item>Random</Dropdown.Item>
//                     </Dropdown.Menu>
//                   </Dropdown>
//                 </Dropdown.ItemText>

//                 <Dropdown.ItemText className="d-flex align-items-center">
//                   Show side of card:
//                   <Dropdown>
//                     <Dropdown.Toggle className="flashcard-button border-0">
//                       Front
//                     </Dropdown.Toggle>
//                     <Dropdown.Menu>
//                       <Dropdown.Item>Front</Dropdown.Item>
//                       <Dropdown.Item>Back</Dropdown.Item>
//                       <Dropdown.Item>Random</Dropdown.Item>
//                     </Dropdown.Menu>
//                   </Dropdown>
//                 </Dropdown.ItemText>
//               </Dropdown.Menu>
//             </Dropdown>
//             {currentMode === AppMode.GENERAL &&
//               <Button>
//                 Review
//               </Button>
//             }
//             {currentMode === AppMode.EDIT &&
//               <Button onClick={() => setCurrentMode(AppMode.GENERAL)}>
//                 Done
//               </Button>
//             }
//           </Col>
//         </Row>
//         <Row className="mt-3 d-flex">



//           <Col xs={{ span: 6, order: 2 }} md={{ span: 1, order: 1 }} className="d-flex align-items-center justify-content-center">
//             <Button className="d-flex align-items-center flashcard-button flashcard-round-button">
//               <span className="material-symbols-outlined">
//                 arrow_back
//               </span>
//             </Button>
//           </Col>
//           <Col xs={{ span: 12, order: 1 }} md={{ span: 10, order: 2 }}>
//             {currentCardIndex >= 0 ? <CardDisplay mode={currentMode} card={deck && deck.currentVersion >= 0 && deck.versions[deck.currentVersion].cards.length > 0 ?
//               deck.versions[deck.currentVersion].cards[currentCardIndex] : EMPTY_CARD}
//               displayFront={displayFront} setShowTextInputEditor={setShowTextInputEditor} /> : ""}
//           </Col>
//           <Col xs={{ span: 6, order: 3 }} md={{ span: 1, order: 3 }} className="d-flex align-items-center justify-content-center">
//             <Button className="d-flex align-items-center flashcard-button flashcard-round-button">
//               <span className="material-symbols-outlined">
//                 arrow_forward
//               </span>
//             </Button>
//           </Col>
//         </Row>

//         <TextEditor show={showTextInputEditor} currentSide={displayFront ? CardFaces.FRONT : CardFaces.BACK}
//           currentBox={ editingState ? editingState.box : Boxes.BOX_1 }
//           currentCardIndex={currentCardIndex} setTextEditorVisibleFunc={setShowTextInputEditor} />

//       </Container>
//     </>
//   )
// }

// export default App
