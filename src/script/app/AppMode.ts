/**
 * Enum containing the modes that the app can be in.
 */
enum AppMode {

    /**
     * Mode representing the initial state of the app, where the user can open 
     * a deck and enter one of the two other modes.
     */
    MANAGING_FILES,

    /**
     * Mode representing the state of the app in which the user can edit the 
     * cards in the currently open deck.
     */
    EDITING_DECK,

    /**
     * Mode representing the state of the app in which the user can review the 
     * cards.
     */
    REVIEWING_DECK
}

export default AppMode