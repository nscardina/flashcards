import { Deck } from "../card/deck"
import filenamify from "filenamify/browser"

export function downloadDeck(deck: Deck) {

    const linkElem = document.createElement("a")
    linkElem.download = filenamify((
        deck.name.at(-1) == "\n")
        ? `${deck.name.substring(0, deck.name.length - 2)}.deck`
        : `${deck.name}.deck`,
        {
            replacement: "_"
        }
    )
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


