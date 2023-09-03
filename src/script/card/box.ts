import { Editor } from "../app/Editor"
import { CardContentData } from "./CardContentData"

export type TextBox = {
    readonly type: CardContentData.Type.TEXT,
    readonly text: string,
}

export namespace TextBox {
    export function isTextBox(variable: unknown): variable is TextBox {
        return (
            typeof (variable) === "object" &&
            variable !== null && 
            "type" in variable && 
            variable.type === CardContentData.Type.TEXT && 
            "text" in variable && 
            typeof(variable.text) === "string"
        )
    }
    
    export function of(text: string): TextBox {
        return Object.freeze({
            type: CardContentData.Type.TEXT,
            text: text
        })
    }
}

export type ImageBox = {
    readonly type: CardContentData.Type.IMAGE,
    readonly base64ImageData: string,
}

export namespace ImageBox {
    export function isImageBox(variable: unknown): variable is ImageBox {
        return (
            typeof (variable) === "object" &&
            variable !== null &&
            "type" in variable && variable.type === CardContentData.Type.IMAGE &&
            "base64ImageData" in variable &&
            typeof (variable.base64ImageData) === "string"
        )
    }

    export function of(base64ImageData: string): ImageBox {
        return Object.freeze({
            type: CardContentData.Type.IMAGE,
            base64ImageData: base64ImageData
        })
    }
}

export type VideoLinkBox = {
    readonly type: CardContentData.Type.VIDEO_LINK,
    readonly link: string,
}

export namespace VideoLinkBox {
    export function isVideoLinkBox(variable: unknown) {
        return (
            typeof (variable) === "object" &&
            variable !== null &&
            "type" in variable &&
            variable.type === CardContentData.Type.VIDEO_LINK &&
            "link" in variable &&
            typeof (variable.link) === "string"
        )
    }
    
    export function of(link: string): VideoLinkBox {
        return Object.freeze({
            type: CardContentData.Type.VIDEO_LINK,
            link: link
        })
    }
}


/**
 * Interface representing a box, which is a field on a flashcard which can 
 * contain one of several types of data.
 */
export type Box = TextBox | ImageBox | VideoLinkBox

export namespace Box {
    /**
     * Function which determines whether an object is a {@linkcode Box} object; 
     * that is, whether it is either a {@linkcode TextBox}, {@linkcode ImageBox}, 
     * or {@linkcode VideoBox}.
     * @param object object to check.
     * @returns whether the object is a valid `Box`.
     */
    export const isBox = (variable: unknown) =>
        TextBox.isTextBox(variable) ||
        ImageBox.isImageBox(variable) ||
        VideoLinkBox.isVideoLinkBox(variable)
}

/**
 * Returns the corresponding {@linkcode Editor} used to edit {@linkcode Box}es 
 * which contain a specific type of data.
 * @param box `Box` to process.
 * @returns `Editor` used to edit the type of data contained in the `box`.
 */
export function getEditorTypeFromBoxType(box: Box | null): Editor {
    if (box) {
        if (TextBox.isTextBox(box)) {
            return Editor.TEXT
        } else if (ImageBox.isImageBox(box)) {
            return Editor.IMAGE
        } else if (VideoLinkBox.isVideoLinkBox(box)) {
            return Editor.VIDEO_LINK
        }
    }
    return Editor.NONE
}


/**
 * Type holding the different boxes that can appear on a flashcard.
 */
export type BoxNumber = 1 | "1" | 2 | "2" | 3 | "3" | 4 | "4"