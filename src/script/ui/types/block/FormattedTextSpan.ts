import { FormattedText } from "../leaf/FormattedText"
import { FCSlateType } from "../MiscTypeInfo"

export type FormattedTextSpan = FCSlateType<"formatted_text_span"> & {
    children: FormattedText[]
};

const DEFAULT_FORMATTED_TEXT_SPAN: FormattedTextSpan = {
    type: "formatted_text_span",
    children: [FormattedText.makeDefault()]
};

export namespace FormattedTextSpan {
    export const isFormattedTextSpan = (variable: unknown): variable is FormattedTextSpan => (
        FCSlateType.isFCSlateType(variable, "formatted_text_span")
        
        && "children" in variable
        && Array.isArray(variable.children)
        && variable.children.every(child => FormattedText.isFormattedText(child))
    );

    export const makeDefault = () => structuredClone(DEFAULT_FORMATTED_TEXT_SPAN);
}