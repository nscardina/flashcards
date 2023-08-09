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
    TEXT = "Text",

    /**
     * Value indicating that the image editor is currently visible.
     */
    IMAGE = "Image",

    /**
     * Value indicating that the video link editor is currently visible.
     */
    VIDEO_LINK = "Video Link"
}