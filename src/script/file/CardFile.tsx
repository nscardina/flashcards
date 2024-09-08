import { Deck } from "../card/deck"
import filenamify, { Options } from "filenamify/browser"

export function downloadDeck(deck: Deck) {

    const linkElem = document.createElement("a");

    const nameEndsInNewline = (deck.name.at(-1) == "\n");
    const trimmedName = `${deck.name.substring(0, deck.name.length - 2)}.deck`
    const untrimmedName = `${deck.name}.deck`

    const options: Options = {
        replacement: "_"
    }

    const name = nameEndsInNewline
    ? trimmedName
    : untrimmedName;

    filenamify(
        "test"
    )

    console.log(test);

    linkElem.download = 
    linkElem.href = `data:text/plain,${encodeURIComponent(JSON.stringify(deck))}`

    document.body.appendChild(linkElem)
    linkElem.click()
    document.body.removeChild(linkElem)

}

export async function uploadDeck(files: FileList): Promise<Deck> {

    const file = files.item(0)
    if (file !== null) {
        return JSON.parse(await file.text())
    }

    throw new Error("Unable to load deck")
}


