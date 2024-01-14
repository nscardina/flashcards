import { Editor } from "../app/Editor"
import { ImageBox } from "./ImageBox"
import { TextBox } from "./TextBox"
import { LaTeXTextBox } from "./LaTeXTextBox"

/**
 * Interface representing a box, which is a field on a flashcard which can 
 * contain one of several types of data.
 */
export type Box = TextBox | ImageBox | LaTeXTextBox

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
        LaTeXTextBox.isLaTeXTextBox(variable)
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
            return Editor.PLAIN_TEXT
        } else if (ImageBox.isImageBox(box)) {
            return Editor.IMAGE
        } else if (LaTeXTextBox.isLaTeXTextBox(box)) {
            return Editor.LATEX_TEST
        }
    }
    return Editor.NONE
}


/**
 * Type holding the different boxes that can appear on a flashcard.
 */
export type BoxNumber = "1" | "2" | "3" | "4"