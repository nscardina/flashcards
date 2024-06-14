import { useContext, useRef } from "react";
import { NavDropdown, Overlay, OverlayTrigger, Tooltip, TooltipProps } from "react-bootstrap";
import { AppState } from "../../../App";
import { MSIcon } from "../../Icons";
import OpenFileByHandleWorker from "./OpenFileByHandleWorker?worker"
import { Err, isOk } from "../../../misc/Result";
import { AppStateType } from "../../../state/AppState";


function isFileSystemAPISupported(): boolean {
  return "showOpenFilePicker" in window
}

function isString(arg: unknown): arg is string {
  return typeof (arg) === "string"
}

export async function loadDeckFileFromLocalFile(state: AppStateType) {


  const oldRecentFiles = (state.recentFiles.length > 9)
    ? state.recentFiles.slice(state.recentFiles.length - 9)
    : state.recentFiles

  if (isFileSystemAPISupported() && window.Worker) {
    const [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: "Deck Files",
          accept: {
            "text/flashcards": [".deck"]
          }
        }
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    })

    if (fileHandle !== undefined &&
      state.recentFiles.every(value => !value.isSameEntry(fileHandle))) {
        state.setRecentFiles([
          ...oldRecentFiles,
          fileHandle
        ])
    }

    

    const fileWorker = new OpenFileByHandleWorker()
    await new Promise<string>((resolve, reject) => {
      fileWorker.onmessage = (event: MessageEvent) => {
        if (isOk<string, string>(event.data, isString)) {
          resolve(event.data.value)
        } else {
          reject(event.data as Err<string>)
        }
      }
      fileWorker.postMessage(fileHandle)
    }).then(message => {
      const deck = JSON.parse(message)
      state.setDeck(deck)
      state.setVisibleCardIndex(0)
    }).catch(message => console.log(message))

  } else {
    return "Unimplemented"
  }

  

}




export function OpenDeckLocallyButton() {

  const appState = useContext(AppState)
  const dropdownItemRef = useRef(null)

  if (!isFileSystemAPISupported()) {
    const tooltip = (props: TooltipProps) => (
      <Tooltip {...props}>
        Your browser doesn't have this capability.
      </Tooltip>
    )

    return (
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 400 }}
        overlay={tooltip}
      >
        {({ ref, ...triggerHandler }) => (
          <NavDropdown.Item
            
            as="div"
            {...triggerHandler}
            className="d-flex align-items-center"
            onClick={() => loadDeckFileFromLocalFile(appState)}
            disabled={!isFileSystemAPISupported()}
            style={{
              cursor: "pointer",
              pointerEvents: "all"
            }}
          >
            <MSIcon name="file_open" />&nbsp;<span ref={ref}>Open Local Deck File...</span>
          </NavDropdown.Item>
        )}

      </OverlayTrigger>
    )
  } else {
    return (
      <NavDropdown.Item
        ref={dropdownItemRef}
        as="div"
        className="d-flex align-items-center"
        onClick={() => loadDeckFileFromLocalFile(appState)}
        disabled={!isFileSystemAPISupported()}
        style={{
          cursor: "pointer",
          pointerEvents: "all"
        }}
      >
        <MSIcon name="file_open" />&nbsp;Open Local Deck File...
      </NavDropdown.Item>
    )
  }
}

