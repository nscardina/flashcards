/**
 * Enum containing the different editors that can be shown in the app, and 
 * which one is currently visible.
 */
export enum Editor {
    /**
     * Value indicating that no editor is currently visible.
     */
    NONE,

    /**
     * Value indicating that the text editor is currently visible.
     */
    TEXT,

    /**
     * Value indicating that the image editor is currently visible.
     */
    IMAGE,

    /**
     * Value indicating that the video link editor is currently visible.
     */
    VIDEO_LINK
}