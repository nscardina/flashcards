import { CustomText, HorizontalAlignment } from "./slate_defs";

export type ParagraphElement = {
    type: "paragraph",
    children: CustomText[],
    alignment: HorizontalAlignment,
}