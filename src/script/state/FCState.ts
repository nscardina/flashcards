import { create } from "zustand";
import { AppState, createAppState } from "./AppState";
import { devtools, persist } from "zustand/middleware";
import { createEditorState, EditorState } from "./EditorState";
import { createDeckState, DeckState } from "./DeckState";

export type FCState = AppState & DeckState & EditorState

export const useFCState = create<FCState>()(
    devtools(
        persist(
            (...params) => ({
                ...createAppState(...params),
                ...createDeckState(...params),
                ...createEditorState(...params),
            }),
            {
                name: "flashcard-app-state",
            }
        )
    )
)