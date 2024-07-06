import { CustomElement } from "../slate_defs";
import { ParagraphElement } from "./ParagraphElement";



export type UnorderedListMember = {
  type: "unordered_list_member";
  children: CustomElement[];
};
const DEFAULT_UNORDERED_LIST_MEMBER: UnorderedListMember = {
  type: "unordered_list_member",
  children: [ParagraphElement.makeDefault()]
}


export namespace UnorderedListMember {
  export function isUnorderedListMember(variable: unknown): variable is UnorderedListMember {
    return (
      typeof (variable) === "object"
      && variable !== null

      && "type" in variable
      && variable.type === "unordered_list_member"

      && "children" in variable
      && Array.isArray(variable.children)
      && variable.children.every(child => CustomElement.isCustomElement(child))
    );
  }

  export function makeDefault(): UnorderedListMember {
    return structuredClone(DEFAULT_UNORDERED_LIST_MEMBER);
  }
}

