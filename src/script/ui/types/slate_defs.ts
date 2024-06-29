import { BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";
import { ParagraphElement } from "./ParagraphElement";
import { UnorderedListElement, UnorderedListMember } from "./UnorderedListElement";
import { OrderedListElement, OrderedListMember } from "./OrderedListElement";

export type HorizontalAlignment = "left" | "center" | "right" | "justified"
export namespace HorizontalAlignment {
  export function isHorizontalAlignment(variable: unknown): variable is HorizontalAlignment {
    return (
      variable === "left"
      || variable === "center" 
      || variable === "right"
      || variable === "justified"
    )
  }
}



export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

export type CustomElement = ParagraphElement 
| UnorderedListElement | UnorderedListMember
| OrderedListElement | OrderedListMember

export namespace CustomElement {
  export function isCustomElement(object: unknown): object is CustomElement {
      return (
        ParagraphElement.isParagraphElement(object)
        || UnorderedListElement.isUnorderedListElement(object)
        || UnorderedListMember.isUnorderedListMember(object)
        || OrderedListElement.isOrderedListElement(object)
        || OrderedListMember.isOrderedListMember(object)
      )
  }
}


export type FormattedText = {
  text: string,
  bold?: true,
  italic?: true,
  underlined?: true,
  strikethrough?: true,
  superscript?: true,
  subscript?: true,
}

export namespace FormattedText {

  export function isFormattedText(variable: unknown): variable is FormattedText {
    return (
      typeof(variable) === "object"
      && variable !== null
  
      && "text" in variable
      && typeof(variable.text) === "string"
  
      && ("bold" in variable ? variable.bold === true : true)
      && ("italic" in variable ? variable.italic === true : true)
      && ("underlined" in variable ? variable.underlined === true : true)
      && ("strikethrough" in variable ? variable.strikethrough === true : true)
      && ("superscript" in variable ? variable.superscript === true : true)
      && ("subscript" in variable ? variable.subscript === true : true)
    )
  }
  
}

export type CustomText = FormattedText

export namespace CustomText {
  export function isCustomText(variable: unknown): variable is CustomText {
    return (
      FormattedText.isFormattedText(variable)
    )
  }
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}