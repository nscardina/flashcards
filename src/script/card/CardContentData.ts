import { CustomElement } from "../ui/types/slate_defs"

/**
 * Type representing the type of data that is contained in a {@linkcode Box}
 * object depending on the {@linkcode CardContentType} contained in its 
 * {@linkcode Box.type type} field.
 */
export type CardContentDataType<T extends CardContentData.Type> = {
    type: T,
    data: T extends CardContentData.Type.PLAIN_TEXT | CardContentData.Type.RICH_TEXT ? CustomElement[] : string
}

/**
 * Function which returns the corresponding {@linkcode CardContentData.Type} 
 * object to a {@linkcode CardContentDataType} object.
 * @param object `CardContentDataType` object.
 * @returns corresponding `CardContentData.Type` object.
 */
// export function getCardContentDataType(object: CardContentDataType<any>): 
// CardContentData.Type {
//     if ("text" in object) return CardContentData.Type.PLAIN_TEXT
//     if ("imageBase64" in object) return CardContentData.Type.IMAGE
//     if ("latex_text" in object) return CardContentData.Type.LATEX
//     throw new Error(`Invalid data type ${object}`)
// }


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
        RICH_TEXT = "RICH_TEXT",
        IMAGE = "IMAGE",
    }
}

