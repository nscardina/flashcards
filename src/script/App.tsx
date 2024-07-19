import 'bootstrap/dist/css/bootstrap.min.css';
import Dialog from './app/Dialog';
import MenuBar from './ui/MenuBar/MenuBar';
import DeckInteractionArea from './ui/DeckDisplay/DeckInteractionArea';
import NewDeckConfirmationMessage from './ui/NewDeckConfirmationMessage';

import "../style/App.scss"
import DeleteDeckConfirmationMessage from './ui/DeleteDeckConfirmationMessage';
import TextEditorBar from './ui/TextEditorBar/TextEditorBar';
import LaTeXEditor from './ui/LaTeXEditor';
import { useFCState } from './state/FCState';

function App() {

    const showLaTeXEditor = useFCState(state => state.showLaTeXEditor)
    const visibleDialog = useFCState(state => state.visibleDialog)

    return (
        <>
            <MenuBar />
            <TextEditorBar />
            <DeckInteractionArea />

            {showLaTeXEditor && <LaTeXEditor />}

            {/* {currentDialog} */}

            {visibleDialog === Dialog.NEW_DECK_CONFIRMATION_MESSAGE &&
                <NewDeckConfirmationMessage />
            }
            {
                visibleDialog === Dialog.DELETE_DECK_CONFIRMATION_MESSAGE &&
                <DeleteDeckConfirmationMessage />
            }
        </>
    )
}

namespace App {
    export const LATEX_EDITOR_INDEX = 8;
}

export default App