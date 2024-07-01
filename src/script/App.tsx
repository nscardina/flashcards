import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useState } from 'react';
import AppMode from './app/AppMode';
import { AppStateType, NO_CARD_FOCUSED } from './state/AppState';
import { ReviewOrder } from './ReviewOrder';
import { ShowSideProviderName } from './ShowSideProvider';
import Dialog from './app/Dialog';
import { Side } from './card/side';
import MenuBar from './ui/MenuBar/MenuBar';
import DeckInteractionArea from './ui/DeckDisplay/DeckInteractionArea';
import NewDeckConfirmationMessage from './ui/NewDeckConfirmationMessage';
import { Deck } from './card/deck';

import "../style/App.scss"
import DeleteDeckConfirmationMessage from './ui/DeleteDeckConfirmationMessage';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { createEditor } from 'slate';
import TextEditorBar from './ui/TextEditorBar/TextEditorBar';

export const AppState = createContext<AppStateType>(undefined!)

function App() {

    const [appMode, setAppMode] = useState<AppMode>(AppMode.MANAGING_FILES)
    const [deck, setDeck] = useState<Deck | null>(null)
    const [recentFiles, setRecentFiles] = useState<FileSystemFileHandle[]>([])
    const [reviewOrder, setReviewOrder] =
        useState<ReviewOrder>(ReviewOrder.IN_ORDER)
    const [showSideProviderName, setShowSideProviderName] =
        useState<ShowSideProviderName>("FRONT")
    const [visibleDialog, setVisibleDialog] = useState<Dialog>(Dialog.NONE)
    const [visibleCardIndex, setVisibleCardIndex] =
        useState<number>(NO_CARD_FOCUSED)
    const [visibleSide, setVisibleSide] = useState<Side>(Side.FRONT)
    const [ textEditors ] = useState(
        () => [
            withReact(withHistory(createEditor())),
            withReact(withHistory(createEditor())),
            withReact(withHistory(createEditor())),
            withReact(withHistory(createEditor())),
            withReact(withHistory(createEditor())),
            withReact(withHistory(createEditor())),
            withReact(withHistory(createEditor())),
            withReact(withHistory(createEditor())),
        ]
    )
    const [ lastEditedTextEditorIndex, setLastEditedTextEditorIndex ] = useState<number>(0)    

    const [currentDialog, setCurrentDialog] = useState<JSX.Element>(<></>)



    return (
        <>
            <AppState.Provider value={{
                appMode: appMode,
                setAppMode: setAppMode,
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
                visibleCardIndex: visibleCardIndex,
                setVisibleCardIndex: setVisibleCardIndex,
                visibleSide: visibleSide,
                setVisibleSide: setVisibleSide,
                
                textEditors: textEditors,
                lastEditedTextEditorIndex: lastEditedTextEditorIndex,
                setLastEditedTextEditorIndex: setLastEditedTextEditorIndex,

                currentDialog: currentDialog,
                setCurrentDialog: setCurrentDialog,
            }}>
                <MenuBar />
                <TextEditorBar />
                <DeckInteractionArea />

                {/* <Slate editor={textEditor} initialValue={[{
                    type: 'paragraph',
                    children: [
                        {
                            text: 'A line of text!',
                            
                        },
                    ],
                    alignment: "left",
                }]}>
                    <Editable
                    renderLeaf={BoldLeaf}
                    renderElement={blockRenderer}
                    />
                </Slate> */}

                {currentDialog}

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
