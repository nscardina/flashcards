import { useCallback, useState } from "react";
import { createEditor, Descendant } from "slate";
import { Editable, RenderElementProps, Slate, withReact } from "slate-react";

const initialValue: Descendant[] = [
    {
        type: "paragraph",
        children: [{ text: "" }]
    }
]

export default function TextEditor() {

    const [editor] = useState(() => withReact(createEditor()));

    const renderElement = useCallback((props: RenderElementProps) => {
        switch (props.element.type) {
            default:
                return <p style={{margin: "0px",}} {...props} />
        }
    }, [])

    return (
        <Slate editor={editor} initialValue={initialValue}>
            <Editable 
            renderElement={renderElement}
            style={{
                width: "100%",
                height: "100%",
                borderRadius: "1rem",
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
            }} />
        </Slate>
    )
}