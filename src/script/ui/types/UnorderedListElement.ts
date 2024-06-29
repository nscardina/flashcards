import { CustomElement, HorizontalAlignment } from "./slate_defs";

export type UnorderedListElement = {
  type: "unordered_list_element",
  children: UnorderedListMember[],
  alignment: HorizontalAlignment,
};

export namespace UnorderedListElement {
  export function isUnorderedListElement(variable: unknown): variable is UnorderedListElement {
    return (
      typeof(variable) === "object"
      && variable !== null

      && "type" in variable
      && variable.type === "unordered_list_element"

      && "children" in variable
      && Array.isArray(variable.children)
      && variable.children.every(child => UnorderedListMember.isUnorderedListMember(child))

      && "alignment" in variable
      && HorizontalAlignment.isHorizontalAlignment(variable.alignment)
    )
  }
}

export type UnorderedListMember = {
  type: "unordered_list_member",
  children: CustomElement[]
}

export namespace UnorderedListMember {
  export function isUnorderedListMember(variable: unknown): variable is UnorderedListMember {
    return (
      typeof(variable) === "object"
      && variable !== null

      && "type" in variable
      && variable.type === "unordered_list_member"

      && "children" in variable
      && Array.isArray(variable.children)
      && variable.children.every(child => CustomElement.isCustomElement(child))
    )
  }
}