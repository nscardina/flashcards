/**
 * Enum containing the different dialog messages that can be shown in the app, 
 * and which one is currently visible.
 */
enum Dialog {
    /**
     * Value indicating that no dialog is currently visible.
     */
    NONE,

    /**
     * Value indicating that the "new deck confirmation message" is visible, 
     * which is a message that is triggered by creating a new deck while 
     * a deck is already open.
     */
    NEW_DECK_CONFIRMATION_MESSAGE,
}

export default Dialog