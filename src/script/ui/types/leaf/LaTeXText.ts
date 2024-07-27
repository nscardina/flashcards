export type LaTeXText = {
    type: "latex_text"
    text: string
}

export type LaTeXTextMarks = Omit<LaTeXText, "text">

const DEFAULT_LATEX_TEXT: LaTeXText = {
    type: "latex_text",
    text: ""
}

export namespace LaTeXText {

    export function isLaTeXText(variable: unknown): variable is LaTeXText {
        return (
            typeof(variable) === "object"
            && variable !== null

            && "type" in variable 
            && variable.type === "latex_text"

            && "text" in variable
            && typeof(variable.text) === "string"
        )
    }

    export function isLaTeXTextMarks(variable: unknown): variable is LaTeXTextMarks {
        return (
            typeof(variable) === "object"
            && variable !== null

            && "type" in variable
            && variable.type === "latex_text"
        )
    }
    
    export function makeDefault(): LaTeXText {
        return DEFAULT_LATEX_TEXT;
    }
}