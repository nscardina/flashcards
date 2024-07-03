import { KeyboardEvent } from "react";
import { Editor, Element, Path } from "slate";

export namespace KeyboardInteraction {
    export function shiftEnterKeyEventHandler(
        event: KeyboardEvent,
        editor: Editor
    ) {
        if (event.key === "Enter" && event.shiftKey) {
            event.preventDefault();
            editor.insertText("\n");
        }
    }
}

export namespace SlateNodeTree {
    export function isParentElement(
        editor: Editor,
        childPath: Path,
        condition: (parent: Element) => boolean
    ) {
        if (childPath.length > 0) {
            const parentPath = Path.parent(childPath)
            const parentElem = editor.children[parentPath[0]]
            return (
                Element.isElement(parentElem)
                && condition(parentElem)
            )
        }
    }
}