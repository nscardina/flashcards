import { HorizontalAlignment } from "./slate_defs";

export type LaTeXElement = {
    type: "LaTeX",
    children: string,
    alignment: HorizontalAlignment,
}