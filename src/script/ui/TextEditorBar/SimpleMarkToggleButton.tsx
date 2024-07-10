import NonUserSelectableButton from "./NonUserSelectableButton";
import { Editor } from "slate";
import React, { useCallback, useContext } from "react";
import { AppState } from "../../App";
import { FormattedText, isFormattedTextMarks } from "../types/leaf/FormattedText";

export type SimpleMarkToggleButtonProps = {
    markToggleProperty: keyof Omit<FormattedText, "text">,
    className?: string,
    children?: JSX.Element
}

export default function SimpleMarkToggleButton(
    props: SimpleMarkToggleButtonProps
) {
    const appState = useContext(AppState)

    const selectedEditor = appState.textEditors[
        appState.lastEditedTextEditorIndex
    ]

    const onClick = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (selectedEditor !== null) {
            const marks = Editor.marks(selectedEditor)
            if (marks !== null && isFormattedTextMarks(marks)) {
                if (marks[props.markToggleProperty]) {
                    Editor.removeMark(selectedEditor, props.markToggleProperty)
                } else {
                    Editor.addMark(selectedEditor, props.markToggleProperty, true)
                }
            }
        }
        e.preventDefault()
    }, [selectedEditor, props.markToggleProperty])

    return (
        <NonUserSelectableButton className={props.className} onClick={onClick}>
            {props.children}
        </NonUserSelectableButton>

    )
}