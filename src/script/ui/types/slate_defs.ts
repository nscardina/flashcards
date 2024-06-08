import { BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";
import { ParagraphElement } from "./ParagraphElement";
import { UnorderedListElement, UnorderedListMember } from "./UnorderedListElement";
import { OrderedListElement, OrderedListMember } from "./OrderedListElement";
import { LaTeXElement } from "./LaTeXElement";

export type HorizontalAlignment = "left" | "center" | "right" | "justified"



export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

export type CustomElement = ParagraphElement 
| UnorderedListElement | UnorderedListMember
| OrderedListElement | OrderedListMember
| LaTeXElement



export type FormattedText = {
  text: string,
  bold?: true,
  italic?: true,
  underlined?: true,
  strikethrough?: true,
  superscript?: true,
  subscript?: true,
}

export type CustomText = FormattedText

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}