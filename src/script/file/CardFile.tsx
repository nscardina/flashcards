import { Deck } from "../card/deck"
import filenamify, { Options } from "filenamify/browser"

export function downloadDeck(deck: Deck) {

    const linkElem = document.createElement("a");

    const nameEndsInNewline = (deck.name.at(-1) == "\n");

    const options: Options = {
        replacement: "_"
    }

    const name = nameEndsInNewline
    ? `${deck.name.substring(0, deck.name.length - 2)}.deck`
    : `${deck.name}.deck`;

    linkElem.download = filenamify(
        name,
        options
    )
    linkElem.href = `data:text/plain,${encodeURIComponent(JSON.stringify(deck))}`

    document.body.appendChild(linkElem)
    linkElem.click()
    document.body.removeChild(linkElem)

}

export async function uploadDeck(files: FileList): Promise<Deck> {

    const file = files.item(0)
    if (file !== null) {
        const parsedJSON: unknown = JSON.parse(await file.text());
        if (Deck.isDeck(parsedJSON)) {
            return parsedJSON;
        }
    }

    throw new Error("Unable to load deck")
}


