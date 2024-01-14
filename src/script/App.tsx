import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useState } from 'react';
import AppMode from './app/AppMode';
import { AppStateType, NO_CARD_FOCUSED } from './state/AppState';
import { ReviewOrder } from './ReviewOrder';
import { ShowSideProviderName } from './ShowSideProvider';
import Dialog from './app/Dialog';
import { Editor } from './app/Editor';
import { Side } from './card/side';
import MenuBar from './ui/MenuBar';
import DeckInteractionArea from './ui/DeckDisplay/DeckInteractionArea';
import TextEditor from './ui/TextEditor';
import DeckNameEditor from './ui/DeckNameEditor';
import NewDeckConfirmationMessage from './ui/NewDeckConfirmationMessage';
import { Deck } from './card/deck';
import { BoxNumber } from './card/Box';
import { ImageEditor } from './ui/ImageEditor';

import "../style/App.scss"
import LaTeXTextEditor from './ui/LaTeXTextEditor';
import DeleteDeckConfirmationMessage from './ui/DeleteDeckConfirmationMessage';

export const AppState = createContext<AppStateType>(undefined!)

function App() {

    const [appMode, setAppMode] = useState<AppMode>(AppMode.MANAGING_FILES)
    const [boxBeingEdited, setBoxBeingEdited] = useState<BoxNumber | null>(null)
    const [deck, setDeck] = useState<Deck | null>(null)
    const [recentFiles, setRecentFiles] = useState<FileSystemFileHandle[]>([])
    const [reviewOrder, setReviewOrder] =
        useState<ReviewOrder>(ReviewOrder.IN_ORDER)
    const [showSideProviderName, setShowSideProviderName] =
        useState<ShowSideProviderName>("FRONT")
    const [visibleDialog, setVisibleDialog] = useState<Dialog>(Dialog.NONE)
    const [visibleEditor, setVisibleEditor] = useState<Editor>(Editor.NONE)
    const [visibleCardIndex, setVisibleCardIndex] =
        useState<number>(NO_CARD_FOCUSED)
    const [visibleSide, setVisibleSide] = useState<Side>(Side.FRONT)

    return (
        <>
            <AppState.Provider value={{
                appMode: appMode,
                setAppMode: setAppMode,
                boxBeingEdited: boxBeingEdited,
                setBoxBeingEdited: setBoxBeingEdited,
                deck: deck,
                setDeck: setDeck,
                recentFiles: recentFiles,
                setRecentFiles: setRecentFiles,
                reviewOrder: reviewOrder,
                setReviewOrder: setReviewOrder,
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
                <MenuBar />
                <DeckInteractionArea />
                {visibleEditor === Editor.PLAIN_TEXT && <TextEditor />}
                {visibleEditor === Editor.IMAGE && <ImageEditor />}
                {visibleEditor === Editor.LATEX_TEST && <LaTeXTextEditor />}
                {visibleEditor === Editor.DECK_NAME && <DeckNameEditor />}

                {visibleDialog === Dialog.NEW_DECK_CONFIRMATION_MESSAGE &&
                    <NewDeckConfirmationMessage />
                }
                {
                    visibleDialog === Dialog.DELETE_DECK_CONFIRMATION_MESSAGE &&
                    <DeleteDeckConfirmationMessage />
                }

            </AppState.Provider>
        </>
    )
}

export default App
