import { CustomElement, HorizontalAlignment } from "./slate_defs";

export type UnorderedListElement = {
  type: "unordered_list_element",
  children: UnorderedListMember[],
  alignment: HorizontalAlignment,
};

export type UnorderedListMember = {
  type: "unordered_list_member",
  children: CustomElement
}