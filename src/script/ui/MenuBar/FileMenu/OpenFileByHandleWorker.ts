import { Err, Ok, Result } from "../../../misc/Result"

export type MessageToHandleWorker = FileSystemFileHandle
export type MessageFromHandleWorker = Result<string, string>

onmessage = async(event: MessageEvent) => {
    const handle: FileSystemFileHandle = event.data

    const permission = await handle.queryPermission()

    if (permission === "granted") {
        const fileHandle = await handle.getFile()
        
        const fileReader = new FileReader()
        fileReader.onload = e => {
            postMessage(Ok(e.target!.result))
        }
        fileReader.readAsText(fileHandle)
    } else {
        postMessage(Err(`Unable to open file`))
    }
}