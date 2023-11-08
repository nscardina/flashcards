/**
 * Type representing the type of data that is contained in a {@linkcode Box}
 * object depending on the {@linkcode CardContentType} contained in its 
 * {@linkcode Box.type type} field. The possibilities are detailed below:
 * - `CardContentDataType<CardContentType.PLAIN_TEXT> = { text: string }`
 * - `CardContentDataType<CardContentType.IMAGE> = { imageBase64: string } `
 * - `CardContentDataType<CardContentType.LATEX> = { link: string }`
 */
export type CardContentDataType<T extends CardContentData.Type> = 
    T extends CardContentData.Type.PLAIN_TEXT ? { text: string } :
    T extends CardContentData.Type.IMAGE ? { imageBase64: string } :
    T extends CardContentData.Type.LATEX ? { latex_text: string } : never

/**
 * Function which returns the corresponding {@linkcode CardContentData.Type} 
 * object to a {@linkcode CardContentDataType} object.
 * @param object `CardContentDataType` object.
 * @returns corresponding `CardContentData.Type` object.
 */
export function getCardContentDataType(object: CardContentDataType<any>): 
CardContentData.Type {
    if ("text" in object) return CardContentData.Type.PLAIN_TEXT
    if ("imageBase64" in object) return CardContentData.Type.IMAGE
    if ("latex_text" in object) return CardContentData.Type.LATEX
    throw new Error(`Invalid data type ${object}`)
}


/**
 * Namespace holding the {@linkcode CardContentData.Type} enum.
 */
export namespace CardContentData {
    /**
     * Enum holding the different types of data that can be put onto a 
     * flashcard.
     */
    export enum Type {
        PLAIN_TEXT = "PLAIN_TEXT",
        IMAGE = "IMAGE",
        LATEX = "LATEX",
    }
}

