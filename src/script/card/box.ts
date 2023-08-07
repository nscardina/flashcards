/**
 * Different types of content that can appear on a flashcard.
 */
export enum CardContentType {

    /**
     * Enum value representing the "text" type of content that can appear on a 
     * flashcard.
     */
    TEXT,

    /**
     * Enum value representing the "image" type of content that can appear on a 
     * flashcard.
     */
    IMAGE,

    /**
     * Enum value representing the "video link" type of content that can appear 
     * on a flashcard.
     */
    VIDEO_LINK,

}

/**
 * Type representing the type of data that is contained in a {@linkcode Box}
 * object depending on the {@linkcode CardContentType} contained in its 
 * {@linkcode Box.type type} field. The possibilities are detailed below:
 * - `CardContentDataType<CardContentType.TEXT> = { text: string }`
 * - `CardContentDataType<CardContentType.IMAGE> = { imageBase64: string } `
 * - `CardContentDataType<CardContentType.VIDEO_LINK> = { link: string }`
 */
export type CardContentDataType<T extends CardContentType> = 
    T extends CardContentType.TEXT ? { text: string } :
    T extends CardContentType.IMAGE ? { imageBase64: string } :
    T extends CardContentType.VIDEO_LINK ? { link: string } : never

/**
 * Type representing a `Box` object, which is a field on a flashcard which can 
 * contain either text, image, or video content.
 */
export type Box<T extends CardContentType> = {
    type: T,
    data: CardContentDataType<T>
}

/**
 * Type representing a field on a flashcard which holds text content.
 */
export type TextBox = Box<CardContentType.TEXT>

/**
 * Determines if an object is of type {@linkcode TextBox}.
 * @param object object to check.
 * @returns whether the object is a valid `TextBox` object.
 */
export function isTextBox(object: unknown): object is TextBox {
    return typeof(object) === "object" && !!object &&
        "type" in object && object.type === CardContentType.TEXT &&
        "data" in object && typeof(object.data) === "object" && !!object.data &&
        "text" in object.data && typeof(object.data.text) === "string"
}

/**
 * Type representing a field on a flashcard which holds image content.
 */
export type ImageBox = Box<CardContentType.IMAGE>

/**
 * Determines if an object is of type {@linkcode ImageBox}.
 * @param object object to check.
 * @returns whether the object is a valid `ImageBox` object.
 */
export function isImageBox(object: unknown): object is ImageBox {
    return typeof(object) === "object" && !!object &&
        "type" in object && object.type === CardContentType.IMAGE &&
        "data" in object && typeof(object.data) === "object" && !!object.data &&
        "imageBase64" in object.data && 
        typeof(object.data.imageBase64) === "string"
}

/**
 * Type representing a field on a flashcard which holds video content.
 */
export type VideoBox = Box<CardContentType.VIDEO_LINK>

/**
 * Determines if an object is of type {@linkcode VideoBox}.
 * @param object object to check.
 * @returns whether the object is a valid `VideoBox`.
 */
export function isVideoBox(object: unknown): object is VideoBox {
    return typeof(object) === "object" && !!object &&
        "type" in object && object.type === CardContentType.VIDEO_LINK && 
        "data" in object && typeof(object.data) === "object" && !!object.data &&
        "link" in object.data && typeof(object.data.link) === "string"
}

/**
 * Function which determines whether an object is a {@linkcode Box} object; 
 * that is, whether it is either a {@linkcode TextBox}, {@linkcode ImageBox}, 
 * or {@linkcode VideoBox}.
 * @param object object to check.
 * @returns whether the object is a valid `Box`.
 */
export function isBox(object: unknown): object is Box<any> {
    return isTextBox(object) || isImageBox(object) || isVideoBox(object)
}

/**
 * Enum holding the different boxes that can appear on a flashcard.
 */
export enum Boxes {
    BOX_1 = "box1",
    BOX_2 = "box2",
    BOX_3 = "box3",
    BOX_4 = "box4"
}