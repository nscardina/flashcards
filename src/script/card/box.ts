import { CardContentData, CardContentDataType } from "./CardContentData"



export interface Box<T extends CardContentData.Type> {
    type: T,
    data: CardContentDataType<T> | null
}

export class TextBox implements Box<CardContentData.Type.TEXT> {

    readonly type = CardContentData.Type.TEXT
    data: CardContentDataType<CardContentData.Type.TEXT> | null

    constructor(data?: CardContentDataType<CardContentData.Type.TEXT> | null) {
        this.data = data ?? null
    }

}

export class ImageBox implements Box<CardContentData.Type.IMAGE> {

    readonly type = CardContentData.Type.IMAGE
    data: CardContentDataType<CardContentData.Type.IMAGE> | null

    constructor(data?: CardContentDataType<CardContentData.Type.IMAGE> | null) {
        this.data = data ?? null
    }

}

export class VideoLinkBox implements Box<CardContentData.Type.VIDEO_LINK> {

    readonly type = CardContentData.Type.VIDEO_LINK
    data: CardContentDataType<CardContentData.Type.VIDEO_LINK> | null

    constructor(
        data?: CardContentDataType<CardContentData.Type.VIDEO_LINK> | null
    ) {
        this.data = data ?? null
    }

}

/**
 * Function which determines whether an object is a {@linkcode Box} object; 
 * that is, whether it is either a {@linkcode TextBox}, {@linkcode ImageBox}, 
 * or {@linkcode VideoBox}.
 * @param object object to check.
 * @returns whether the object is a valid `Box`.
 */
export function isBox(object: unknown): object is Box<any> {
    return object instanceof TextBox ||
        object instanceof ImageBox ||
        object instanceof VideoLinkBox
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