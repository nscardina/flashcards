import { BaseEditor, Text } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";
import { ParagraphElement } from "./block/ParagraphElement";

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

export type CustomElement = ParagraphElement

export namespace CustomElement {
  export function isCustomElement(object: unknown): object is CustomElement {
    return (
      ParagraphElement.isParagraphElement(object)
    )
  }
}

export type CustomText = { text: string }

export namespace CustomText {
  export function isCustomText(variable: unknown): variable is CustomText {
    return (
      typeof (variable) === "object"
      && variable !== null
      && "text" in variable
      && typeof (variable.text) === "string"
    )
  }
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}