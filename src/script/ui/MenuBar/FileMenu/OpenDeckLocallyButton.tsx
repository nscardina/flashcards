import { useContext, useRef } from "react";
import { OverlayTrigger, Tooltip, TooltipProps } from "react-bootstrap";
import { AppState } from "../../../App";
import OpenFileByHandleWorker from "./OpenFileByHandleWorker?worker"
import { Err, isOk } from "../../../misc/Result";
import { AppStateType } from "../../../state/AppState";
import { Deck } from "../../../card/deck";
import { UnableToOpenFileErrorDialog } from "./UnableToOpenFileErrorDialog";
import CustomMenuItem from "../CustomMenuItem";
import { KeyboardShortcuts } from "../../KeyboardShortcuts";


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
    })
      .then(message => {
        const deck = JSON.parse(message)
        if (Deck.isDeck(deck)) {
          state.setDeck(deck)
          state.setVisibleCardIndex(0)
        } else {
          state.setCurrentDialog(
            <UnableToOpenFileErrorDialog errMessage="Selected file is not a valid deck file." />
          )
        }
      })
      .catch(message => {
        state.setCurrentDialog(
          <UnableToOpenFileErrorDialog errMessage="Selected file is not a valid deck file." />
        )
        console.log(message)
      })

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
          <CustomMenuItem

            as="div"
            {...triggerHandler}
            className="d-flex align-items-center"
            onClick={() => loadDeckFileFromLocalFile(appState)}
            disabled={!isFileSystemAPISupported()}
            style={{
              cursor: "pointer",
              pointerEvents: "all"
            }}

            icon="file_open"
            body={<span ref={ref}>Open Local Deck File...</span>}
          />
        )}

      </OverlayTrigger>
    )
  } else {
    return (
      <CustomMenuItem
        ref={dropdownItemRef}
        as="div"
        className="d-flex align-items-center"
        onClick={() => loadDeckFileFromLocalFile(appState)}
        disabled={!isFileSystemAPISupported()}
        style={{
          cursor: "pointer",
          pointerEvents: "all"
        }}

        icon="file_open"
        body={<span>Open Local Deck File...</span>}
        keyboardShortcut={KeyboardShortcuts.openDeckLocally()}
      >
      </CustomMenuItem>
    )
  }
}

