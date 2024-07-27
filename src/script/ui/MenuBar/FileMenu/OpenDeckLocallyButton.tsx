import { useRef } from "react";
import { OverlayTrigger, Tooltip, TooltipProps } from "react-bootstrap";
import OpenFileByHandleWorker from "./OpenFileByHandleWorker?worker"
import { Err, isOk } from "../../../misc/Result";
import { Deck } from "../../../card/deck";
import { UnableToOpenFileErrorDialog } from "./UnableToOpenFileErrorDialog";
import CustomMenuItem from "../CustomMenuItem";
import { KeyboardShortcuts } from "../../KeyboardShortcuts";
import { useFCState } from "../../../state/FCState";


function isFileSystemAPISupported(): boolean {
  return "showOpenFilePicker" in window
}

function isString(arg: unknown): arg is string {
  return typeof (arg) === "string"
}

export async function loadDeckFileFromLocalFile() {

  const recentFiles = useFCState(state => state.recentFiles);
  const addRecentFile = useFCState(state => state.addRecentFile);
  const setDeck = useFCState(state => state.setDeck);
  const setVisibleCardIndex = useFCState(state => state.setVisibleCardIndex);
  const setCurrentDialog = useFCState(state => state.setCurrentDialog);

  // const oldRecentFiles = (recentFiles.length > 9)
  //   ? recentFiles.slice(recentFiles.length - 9)
  //   : recentFiles

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
      recentFiles.every(value => !value.isSameEntry(fileHandle))) {
      addRecentFile(fileHandle);
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
          setDeck(deck)
          setVisibleCardIndex(0)
        } else {
          setCurrentDialog(
            <UnableToOpenFileErrorDialog errMessage="Selected file is not a valid deck file." />
          )
        }
      })
      .catch(message => {
        setCurrentDialog(
          <UnableToOpenFileErrorDialog errMessage="Selected file is not a valid deck file." />
        )
        console.log(message)
      })

    }
}

export function OpenDeckLocallyButton() {

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
            onClick={() => loadDeckFileFromLocalFile()}
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
        onClick={() => loadDeckFileFromLocalFile()}
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

