// import { HorizontalAlignment } from "../slate_defs";
// import { UnorderedListMember } from "./UnorderedListMember";

// export type UnorderedListElement = {
//   type: "unordered_list_element",
//   children: UnorderedListMember[],
//   alignment: HorizontalAlignment,
// };

// const DEFAULT_UNORDERED_LIST_ELEMENT: UnorderedListElement = {
//   type: "unordered_list_element",
//   children: [UnorderedListMember.makeDefault()],
//   alignment: "left"
// }

// export namespace UnorderedListElement {
//   export function isUnorderedListElement(variable: unknown): variable is UnorderedListElement {
//     return (
//       typeof (variable) === "object"
//       && variable !== null

//       && "type" in variable
//       && variable.type === "unordered_list_element"

//       && "children" in variable
//       && Array.isArray(variable.children)
//       && variable.children.every(child => UnorderedListMember.isUnorderedListMember(child))

//       && "alignment" in variable
//       && HorizontalAlignment.isHorizontalAlignment(variable.alignment)
//     )
//   }

//   export function makeDefault(): UnorderedListElement {
//     return structuredClone(DEFAULT_UNORDERED_LIST_ELEMENT);
//   }
// }

