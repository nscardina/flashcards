import { Button, Modal } from "react-bootstrap"
import "./ReviewCardPopover.scss"
import thirdPartyLicenses from "../../third-party-licenses.txt?raw";
import { useContext } from "react";
import { AppState } from "../App";
import Dialog from "../app/Dialog";
import "./CreditsPopover.scss";

function CreditsPopover() {

  const appState = useContext(AppState);

  return (
    <Modal show={true} dialogClassName="credits-popover">
      <Modal.Header>
        <Modal.Title>Review Cards</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Button style={{
          display: "",
          position: "sticky"
        }} 
        className="mb-3"
        onClick={() => {
          appState.setVisibleDialog(Dialog.NONE);
        }}>Dismiss</Button>
        <pre>{thirdPartyLicenses}</pre>
        
      </Modal.Body>
    </Modal>
  )
}

export default CreditsPopover