import { Dropdown, NavDropdown } from "react-bootstrap"
import { useContext } from "react"
import { AppState } from "../../../App"
import { NewDeckButton } from "./NewDeckButton"
import { OpenDeckLocallyButton } from "./OpenDeckLocallyButton"
import UploadDeckFileButton from "./UploadDeckFileButton"

export default function FileMenu() {

  const appState = useContext(AppState)

  return (
    <NavDropdown title="File" className="navbar-menu-item" style={{ cursor: "pointer" }}>

      <NewDeckButton />
      <OpenDeckLocallyButton />
      <UploadDeckFileButton />

    </NavDropdown>
  )
}

// function FileMenu() {

//   const appState = useContext(AppState)

//   return (
//     <Dropdown>
//       <MenuDropdownToggle className="flashcard-button border-0">
//         File
//       </MenuDropdownToggle>

//       <Dropdown.Menu>

//         <NewDeckButton />
//         <OpenDeckButton />

//         <Dropdown className={`${appState.recentFiles.length !== 0 ? "dropdown-item" : ""}`}>

//           <style>
//             {`
//             #open-recent-toggle-id:disabled {
//               background-color: inherit;
//             }

//             .dropdown-item:has(> #open-recent-toggle-id):active {
//               background-color: rgba(0, 0, 0, 0);
//             }
//             `}
//           </style>

//           <Dropdown.Toggle
//             style={{ border: "0px black" }}
//             className="d-flex align-items-center flashcard-button w-100 btn-block"
//             disabled={appState.recentFiles.length === 0}
//             id="open-recent-toggle-id"
//           >
//             <span className="w-100 d-block align-items-center d-flex">
//               <MSIcon name="menu_open" />
//               &nbsp;Open Recent...
//             </span>
//           </Dropdown.Toggle>
//           <Dropdown.Menu>
//             {
//               appState.recentFiles.map(file => (
//                 <Dropdown.Item
//                   key={`loadFile${file.name}`}
//                   onClick={async () => {
//                     const text = await file.getFile().then(file =>
//                       file.text()
//                     )
//                     loadDeckFile(appState, text, file)
//                   }}
//                 >
//                   {file.name}
//                 </Dropdown.Item>
//               ))
//             }
//           </Dropdown.Menu>
//         </Dropdown>

//         <Dropdown.Divider />

//         <Dropdown.Item
//           as="button"
//           className="d-flex align-items-center"
//           onClick={
//             () => {
//               appState.setVisibleDialog(Dialog.DELETE_DECK_CONFIRMATION_MESSAGE)
//             }
//           }
//           disabled={appState.deck === null}
//         >
//           <span className="material-symbols-outlined" aria-hidden="true">close</span> &nbsp;Close Deck
//         </Dropdown.Item>
//         <Dropdown.Item
//           as="button"
//           onClick={appState.deck !== null ?
//             () => downloadDeck(appState.deck!) : () => { }
//           }
//           disabled={appState.deck === null}
//           className="d-flex align-items-center">
//           <span className="material-symbols-outlined" aria-hidden="true">download</span> &nbsp;Download .deck file...
//         </Dropdown.Item>
//         <Dropdown.Item
//           as="button"
//           className="d-flex align-items-center"
//           disabled={appState.deck === null}
//           onClick={
//             () => {
//               appState.setVisibleEditor(Editor.DECK_NAME)
//             }
//           }
//         >
//           <span className="material-symbols-outlined" aria-hidden="true">title</span> &nbsp;Rename Deck...
//         </Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown>
//   )

// }

// export default FileMenu