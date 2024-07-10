import { LaTeXText } from "../leaf/LaTeXText";
import { FCSlateType } from "../MiscTypeInfo";

export type LaTeXTextSpan = FCSlateType<"latex_text_span"> & {
    children: LaTeXText[]
};

const DEFAULT_LATEX_TEXT_SPAN: LaTeXTextSpan = {
    type: "latex_text_span",
    children: [LaTeXText.makeDefault()]
};

export namespace LaTeXTextSpan {
    export const isLaTeXTextSpan = (variable: unknown): variable is LaTeXTextSpan => (
        FCSlateType.isFCSlateType(variable, "latex_text_span")

        && "children" in variable
        && Array.isArray(variable.children)
        && variable.children.every(child => LaTeXText.isLaTeXText(child))
    );

    export const makeDefault = () => structuredClone(DEFAULT_LATEX_TEXT_SPAN);
}