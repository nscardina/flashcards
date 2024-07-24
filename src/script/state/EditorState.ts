import { Path } from "slate";
import { Side } from "../card/side";
import { CustomText } from "../ui/types/slate_defs";
import { StateCreator } from "zustand";

export type EditorState = {
    visibleCardIndex: number,
    setVisibleCardIndex: (newVisibleCardIndex: number) => void,
    visibleSide: Side,
    setVisibleSide: (newVisibleSide: Side) => void,
    // currentEditor: () => (BaseEditor & ReactEditor & HistoryEditor) | null,
    // textEditors: (BaseEditor & ReactEditor & HistoryEditor)[],
    // lastEditedTextEditorIndex: number,
    // setLastEditedTextEditorIndex: (newLastEditedTextEditorIndex: number) => void,
    lastEditedNodePath: Path,
    setLastEditedNodePath: (newLastEditedNodePath: Path) => void,
    currentMarks: (Omit<CustomText, "text"> | null),
    setCurrentMarks: (newCurrentMarks: Omit<CustomText, "text"> | null) => void,
    showLaTeXEditor: boolean,
    setShowLaTeXEditor: (shouldShowLaTeXEditor: boolean) => void,
    shouldLaTeXEditorReplace: boolean,
    setShouldLaTeXEditorReplace: (shouldLaTeXEditorReplace: boolean) => void,
}



export const createEditorState: StateCreator<EditorState> = (set) => ({
        visibleCardIndex: -1,
        setVisibleCardIndex: newVisibleCardIndex => set(_state => ({ visibleCardIndex: newVisibleCardIndex })),
        visibleSide: Side.FRONT,
        setVisibleSide: newVisibleSide => set(_state => ({ visibleSide: newVisibleSide })),
        lastEditedNodePath: [],
        setLastEditedNodePath: newLastEditedNodePath => set(_state => ({ lastEditedNodePath: newLastEditedNodePath })),
        currentMarks: { type: "formatted_text" },
        setCurrentMarks: newCurrentMarks => set(_state => ({ currentMarks: newCurrentMarks })),
        showLaTeXEditor: false,
        setShowLaTeXEditor: shouldShowLaTeXEditor => set(_state => ({ showLaTeXEditor: shouldShowLaTeXEditor })),
        shouldLaTeXEditorReplace: false,
        setShouldLaTeXEditorReplace: shouldLaTeXEditorReplace => set(_state => ({ shouldLaTeXEditorReplace: shouldLaTeXEditorReplace })),

    })