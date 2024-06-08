import { CustomElement, HorizontalAlignment } from "./slate_defs";

export type OrderedListElement = {
    type: "ordered_list_element",
    children: OrderedListMember[],
    alignment: HorizontalAlignment,
}

export type OrderedListMember = {
    type: "ordered_list_member",
    children: CustomElement
  }