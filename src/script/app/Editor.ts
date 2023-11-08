/**
 * Enum containing the different editors that can be shown in the app, and 
 * which one is currently visible.
 */
export enum Editor {
    /**
     * Value indicating that no editor is currently visible.
     */
    NONE = "None",

    /**
     * Value indicating that the text editor is currently visible.
     */
    PLAIN_TEXT = "Plain Text",

    /**
     * Value indicating that the image editor is currently visible.
     */
    IMAGE = "Image",

    /**
     * Value indicating that the video link editor is currently visible.
     */
    LATEX_TEST = "$\\LaTeX$",

    /**
     * Value indicating that the deck name editor is currently visible.
     */
    DECK_NAME = "Deck Name",
}