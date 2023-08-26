/**
 * Type representing the type of data that is contained in a {@linkcode Box}
 * object depending on the {@linkcode CardContentType} contained in its 
 * {@linkcode Box.type type} field. The possibilities are detailed below:
 * - `CardContentDataType<CardContentType.TEXT> = { text: string }`
 * - `CardContentDataType<CardContentType.IMAGE> = { imageBase64: string } `
 * - `CardContentDataType<CardContentType.VIDEO_LINK> = { link: string }`
 */
/**
 * Type representing the type of data that is contained in a {@linkcode Box}
 * object depending on the {@linkcode CardContentType} contained in its 
 * {@linkcode Box.type type} field. The possibilities are detailed below:
 * - `CardContentDataType<CardContentType.TEXT> = { text: string }`
 * - `CardContentDataType<CardContentType.IMAGE> = { imageBase64: string } `
 * - `CardContentDataType<CardContentType.VIDEO_LINK> = { link: string }`
 */
export type CardContentDataType<T extends CardContentData.Type> = 
    T extends CardContentData.Type.TEXT ? { text: string } :
    T extends CardContentData.Type.IMAGE ? { imageBase64: string } :
    T extends CardContentData.Type.VIDEO_LINK ? { link: string } : never

export function getCardContentDataType(object: CardContentDataType<any>): 
CardContentData.Type {
    if ("text" in object) return CardContentData.Type.TEXT
    if ("imageBase64" in object) return CardContentData.Type.IMAGE
    if ("link" in object) return CardContentData.Type.VIDEO_LINK
    throw new Error(`Invalid data type ${object}`)
}

export namespace CardContentData {
    export enum Type {
        TEXT,
        IMAGE,
        VIDEO_LINK,
    }
}

