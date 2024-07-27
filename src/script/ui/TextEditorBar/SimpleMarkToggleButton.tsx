import NonUserSelectableButton from "./NonUserSelectableButton";
import { Editor } from "slate";
import React, { useCallback, useContext } from "react";
import { FormattedText, isFormattedTextMarks } from "../types/leaf/FormattedText";
import { useFCState } from "../../state/FCState";
import { useShallow } from "zustand/react/shallow";
import { getEditorByIndex, ReactEditorContext } from "../../App";

export type SimpleMarkToggleButtonProps = {
    markToggleProperty: keyof Omit<FormattedText, "text">,
    className?: string,
    children?: JSX.Element
}

export default function SimpleMarkToggleButton(
    props: SimpleMarkToggleButtonProps
) {
    // const selectedEditor = useFCState(state => state.currentEditor)();
    const state = useContext(ReactEditorContext);
    const selectedEditor = getEditorByIndex(state, state.lastEditedTextEditorIndex);
    const deck = useFCState(useShallow(state => state.deck));

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
        <NonUserSelectableButton disabled={deck === null} className={props.className} onClick={onClick}
        style={{color: (deck === null) ? "var(--bs-secondary)" : "inherit"}}
        >
            {props.children}
        </NonUserSelectableButton>

    )
}