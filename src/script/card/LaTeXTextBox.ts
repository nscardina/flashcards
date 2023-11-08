import { CardContentData } from "./CardContentData";


export type LaTeXTextBox = {
    readonly type: CardContentData.Type.LATEX
    readonly latex_text: string
}

export namespace LaTeXTextBox {
    export function isLaTeXTextBox(variable: unknown) {
        return (
            typeof (variable) === "object" &&
            variable !== null &&
            "type" in variable &&
            variable.type === CardContentData.Type.LATEX &&
            "latex_text" in variable &&
            typeof (variable.latex_text) === "string"
        )
    }

    export function of(latex_text: string): LaTeXTextBox {
        return Object.freeze({
            type: CardContentData.Type.LATEX,
            latex_text: latex_text
        })
    }
}
