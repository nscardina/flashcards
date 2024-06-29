import { useContext } from "react";
import { AppState } from "../../App";
import NonUserSelectableButton from "./NonUserSelectableButton";
import { Editor } from "slate";
import { FormattedText } from "../types/slate_defs";

export type SimpleMarkToggleButtonProps = {
    markToggleProperty: keyof Omit<FormattedText, "text">,
    className?: string,
    children?: JSX.Element
}

export default function SimpleMarkToggleButton(
    props: SimpleMarkToggleButtonProps
) {
    const textEditor = useContext(AppState).textEditor

    return (
        <NonUserSelectableButton className={props.className} onClick={() => {
            const marks = Editor.marks(textEditor)
            if (marks !== null) {
                if (marks[props.markToggleProperty]) {
                    Editor.removeMark(textEditor, props.markToggleProperty)
                } else {
                    Editor.addMark(textEditor, props.markToggleProperty, true)
                }
            }  
        }}>
            {props.children}
        </NonUserSelectableButton>
    )
}