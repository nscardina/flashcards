import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useContext, useEffect, useState } from 'react';
import AppMode from './app/AppMode';
import { AppStateType } from './state/AppState';
import { ReviewOrder, ReviewOrderProvider } from './ReviewOrder';
import { ShowSideProviderName } from './ShowSideProvider';
import Dialog from './app/Dialog';
import { Editor } from './app/Editor';
import { Side } from './card/side';
import MenuBar from './ui/MenuBar';
import DeckInteractionArea from './ui/DeckDisplay/DeckInteractionArea';
import TextEditor from './ui/TextEditor';
import DeckNameEditor from './ui/DeckNameEditor';
import NewDeckConfirmationMessage from './ui/NewDeckConfirmationMessage';
import { Deck, SAMPLE_DECK } from './card/deck';
import { BoxNumber } from './card/Box';
import { ImageEditor } from './ui/ImageEditor';

import "../style/App.scss"
import LaTeXTextEditor from './ui/LaTeXTextEditor';
import DeleteDeckConfirmationMessage from './ui/DeleteDeckConfirmationMessage';
import CreditsPopover from './ui/CreditsPopover';
import DeleteCardConfirmationMessage from './ui/DeleteCardConfirmationMessage';

export const AppState = createContext<AppStateType>(undefined!)

function App() {

    useEffect(() => {
        window.onbeforeunload = event => {
            if (changesMade) {
                event.preventDefault()
                return "Closing this tab will lose any changes you have made. Do you want to close the tab?"
            }
        }
    })

    const [appMode, setAppMode] = useState<AppMode>(AppMode.EDITING_DECK)
    const [boxBeingEdited, setBoxBeingEdited] = useState<BoxNumber | null>(null)
    const [deck, setDeck] = useState<Deck | null>(SAMPLE_DECK)
    const [changesMade, setChangesMade] = useState<boolean>(false)
    const [recentFiles, setRecentFiles] = useState<FileSystemFileHandle[]>([])
    const [reviewOrder, setReviewOrder] =
        useState<ReviewOrder>(ReviewOrder.IN_ORDER)
    const [reviewOrderProvider, setReviewOrderProvider] = useState<ReviewOrderProvider>(
        null as any
    );
    const [reviewOrderProviderNextValue, setReviewOrderProviderNextValue] = useState<IteratorResult<number, void>>({ value: -1 });
    const [showSideProviderName, setShowSideProviderName] =
        useState<ShowSideProviderName>("FRONT")
    const [visibleDialog, setVisibleDialog] = useState<Dialog>(Dialog.NONE)
    const [visibleEditor, setVisibleEditor] = useState<Editor>(Editor.NONE)
    const [visibleCardIndex, setVisibleCardIndex] =
        useState<number>(0)
    const [visibleSide, setVisibleSide] = useState<Side>(Side.FRONT)

    return (
        <>
            <AppState.Provider value={{
                appMode: appMode,
                setAppMode: setAppMode,
                boxBeingEdited: boxBeingEdited,
                setBoxBeingEdited: setBoxBeingEdited,
                changesMade: changesMade,
                setChangesMade: setChangesMade,
                deck: deck,
                setDeck: setDeck,
                recentFiles: recentFiles,
                setRecentFiles: setRecentFiles,
                reviewOrder: reviewOrder,
                setReviewOrder: setReviewOrder,
                reviewOrderProvider: reviewOrderProvider,
                setReviewOrderProvider: setReviewOrderProvider,
                reviewOrderProviderNextValue: reviewOrderProviderNextValue,
                setReviewOrderProviderNextValue: setReviewOrderProviderNextValue,
                showSideProviderName: showSideProviderName,
                setShowSideProviderName: setShowSideProviderName,
                visibleDialog: visibleDialog,
                setVisibleDialog: setVisibleDialog,
                visibleEditor: visibleEditor,
                setVisibleEditor: setVisibleEditor,
                visibleCardIndex: visibleCardIndex,
                setVisibleCardIndex: setVisibleCardIndex,
                visibleSide: visibleSide,
                setVisibleSide: setVisibleSide,
            }}>

                <AppInternal />
            </AppState.Provider>
        </>
    )
}

function AppInternal() {

    const appState = useContext(AppState);

    return (
        <>
            <MenuBar />
            <DeckInteractionArea />
            {appState.visibleEditor === Editor.PLAIN_TEXT && <TextEditor />}
            {appState.visibleEditor === Editor.IMAGE && <ImageEditor />}
            {appState.visibleEditor === Editor.LATEX_TEST && <LaTeXTextEditor />}
            {appState.visibleEditor === Editor.DECK_NAME && <DeckNameEditor />}

            {appState.visibleDialog === Dialog.NEW_DECK_CONFIRMATION_MESSAGE &&
                <NewDeckConfirmationMessage />
            }
            {
                appState.visibleDialog === Dialog.DELETE_DECK_CONFIRMATION_MESSAGE &&
                <DeleteDeckConfirmationMessage />
            }
            {
                appState.visibleDialog === Dialog.DELETE_CARD_CONFIRMTION_MESSAGE && 
                <DeleteCardConfirmationMessage />
            }

            {appState.visibleDialog === Dialog.CREDITS && <CreditsPopover />}
        </>
    )

}

export default App
