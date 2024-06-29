/**
 * React component holding a message to display in the place where flashcards
 * are normally displayed, which tells the user that no deck is opened and that
 * they can click in that area to open a deck file.
 * @returns React component containing the message.
 */
export function NoDeckOpenedMessage() {
  return (
    <div className=
      "flashcard-display p-0 d-flex align-items-center justify-content-center">
      <label className="position-absolute" htmlFor="deck_display">
        No deck opened. Click here to open a deck file...
      </label>
      <input type="file" id="deck_display"
        className="w-100 h-100 d-flex opacity-0" />
    </div>
  )
}
