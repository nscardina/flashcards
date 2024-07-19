import { StateCreator } from "zustand";
import AppMode from "../app/AppMode";
import Dialog from "../app/Dialog";
import { ReviewOrder } from "../ReviewOrder";
import { ShowSideProviderName } from "../ShowSideProvider";

export type AppState = {
    appMode: AppMode,
    setAppMode: (newAppMode: AppMode) => void,
    recentFiles: FileSystemFileHandle[],
    addRecentFile: (newRecentFile: FileSystemFileHandle) => void,
    clearRecentFiles: () => void,
    reviewOrder: ReviewOrder,
    setReviewOrder: (newReviewOrder: ReviewOrder) => void,
    showSideProviderName: ShowSideProviderName,
    setShowSideProviderName: (newShowSideProviderName: ShowSideProviderName) => void,
    visibleDialog: Dialog,
    setVisibleDialog: (newVisibleDialog: Dialog) => void,
    currentDialog: JSX.Element,
    setCurrentDialog: (newCurrentDialog: JSX.Element) => void,
}

export const createAppState: StateCreator<AppState> = set => ({
    appMode: AppMode.MANAGING_FILES,
    setAppMode: newAppMode => set(_state => ({appMode: newAppMode})),
    recentFiles: [],
    addRecentFile: newRecentFile => set(state => ({recentFiles: [...state.recentFiles, newRecentFile]})),
    clearRecentFiles: () => set(_state => ({recentFiles: []})),
    reviewOrder: ReviewOrder.IN_ORDER,
    setReviewOrder: newReviewOrder => set(_state => ({reviewOrder: newReviewOrder})),
    showSideProviderName: "FRONT" as ShowSideProviderName,
    setShowSideProviderName: newShowSideProviderName => set(_state => ({showSideProviderName: newShowSideProviderName})),
    visibleDialog: Dialog.NONE,
    setVisibleDialog: newVisibleDialog => set(_state => ({visibleDialog: newVisibleDialog})),
    currentDialog: <></>,
    setCurrentDialog: newCurrentDialog => set(_state => ({currentDialog: newCurrentDialog})),
})