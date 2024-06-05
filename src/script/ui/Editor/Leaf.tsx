
import { RenderLeafProps } from "slate-react"

export default function renderLeaf(props: RenderLeafProps) {
    return (
        <span style={{
            //@ts-expect-error
            fontWeight: props.leaf.bold ? "bold" : "normal",
            //@ts-expect-error
            fontStyle: props.leaf.italic ? "italic" : "normal",
        
            textDecoration: `${
                //@ts-expect-error
                props.leaf.underlined ? "underline" : ""
            } ${
                //@ts-expect-error
                props.leaf.strikethrough ? "line-through" : ""
            } ${
                //@ts-expect-error
                (!(props.leaf.underlined || props.leaf.strikethrough)) ? "none" : ""
            }`,
        }} {...props.attributes}>
            {props.children}
        </span>
    )
}
