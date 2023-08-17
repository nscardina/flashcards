import { Deck } from "../card/deck";

export function downloadDeck(deck: Deck) {

    const linkElem = document.createElement("a")
    linkElem.download = `${deck.name}.deck`
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