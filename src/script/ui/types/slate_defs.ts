import { BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";
import { ParagraphElement } from "./block/ParagraphElement";
import { OrderedListElement } from "./block/OrderedListElement";
import { OrderedListMember } from "./block/OrderedListMember";
import { UnorderedListElement } from "./block/UnorderedListElement";
import { UnorderedListMember } from "./block/UnorderedListMember";
import { LaTeXText } from "./leaf/LaTeXText";
import { FormattedTextSpan } from "./block/FormattedTextSpan";
import { LaTeXTextSpan } from "./block/LaTeXTextSpan";
import { FormattedText } from "./leaf/FormattedText";

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
| FormattedTextSpan | LaTeXTextSpan
| UnorderedListElement | UnorderedListMember
| OrderedListElement | OrderedListMember

export namespace CustomElement {
  export function isCustomElement(object: unknown): object is CustomElement {
      return (
        ParagraphElement.isParagraphElement(object)
        || FormattedTextSpan.isFormattedTextSpan(object)
        || LaTeXTextSpan.isLaTeXTextSpan(object)
        || UnorderedListElement.isUnorderedListElement(object)
        || UnorderedListMember.isUnorderedListMember(object)
        || OrderedListElement.isOrderedListElement(object)
        || OrderedListMember.isOrderedListMember(object)
      )
  }
}


export type CustomText = FormattedText | LaTeXText

export namespace CustomText {
  export function isCustomText(variable: unknown): variable is CustomText {
    return (
      FormattedText.isFormattedText(variable)
      || LaTeXText.isLaTeXText(variable)
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