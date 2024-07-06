import { FormattedText } from "../leaf/FormattedText"
import { FCSlateInlineType, FCSlateType } from "../MiscTypeInfo"

export type FormattedTextSpan = FCSlateInlineType<"formatted_text_span"> & {
    children: FormattedText[]
};

const DEFAULT_FORMATTED_TEXT_SPAN: FormattedTextSpan = {
    ...FCSlateInlineType.makeDefault("formatted_text_span"),
    children: [FormattedText.makeDefault()]
};

export namespace FormattedTextSpan {
    export const isFormattedTextSpan = (variable: unknown): variable is FormattedTextSpan => (
        FCSlateType.isFCSlateInlineType(variable, "formatted_text_span")
        
        && "children" in variable
        && Array.isArray(variable.children)
        && variable.children.every(child => FormattedText.isFormattedText(child))
    );

    export const makeDefault = () => structuredClone(DEFAULT_FORMATTED_TEXT_SPAN);
}