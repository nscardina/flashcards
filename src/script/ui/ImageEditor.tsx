// import { Button, Col, Container, Modal, Row } from "react-bootstrap"
// import { changeEditor, editCard } from "../state/AppState"
// import { useContext, useState } from "react"
// import { AppState } from "../App"
// import { Editor } from "../app/Editor"
// import { FileUploader } from "react-drag-drop-files"

// export function ImageEditor() {

//   const appState = useContext(AppState)
//   const [imageFile, setImageFile] = useState<File | null>(null)

//   return (
//     <Modal show={true}>
//       <Modal.Header>
//         <Modal.Title>Image Upload</Modal.Title>
//       </Modal.Header>
//       <Modal.Body >
//         <Container>
//           <Row>
//             <FileUploader style={{aspectRatio: "2 / 1"}} handleChange={(file: File) => {
//               setImageFile(file)
//             }} name="file" type={["PNG", "JPG", "GIF", "SVG"]} />
//           </Row>
//           <Row>
//             <Col className="d-flex justify-content-end">
//             <Button className="ms-auto mt-3" onClick={
//               () => changeEditor(
//                 appState, Editor.NONE, "1")}
//               >
//                 Cancel
//               </Button>
//               <Button className="ms-3 mt-3" onClick={() => {

//                 if (imageFile !== null) {
//                   const reader = new FileReader()
//                   reader.onloadend = () => {
//                     editCard(appState, appState.visibleSide,
//                       appState.boxBeingEdited!,
//                       { imageBase64: reader.result as string },
//                     )
//                   }
//                   reader.readAsDataURL(imageFile)
                  
//                 }
                

//               }}>
//                 Submit
//               </Button>
              
//             </Col>
//           </Row>
//         </Container>
//       </Modal.Body>
//     </Modal>
//   )
// }