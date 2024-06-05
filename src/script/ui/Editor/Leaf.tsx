
import { RenderLeafProps } from "slate-react"

export default function renderLeaf(props: RenderLeafProps) {

    const style = {
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
    }

    //@ts-expect-error
    if (props.leaf.superscript) {
        return (
            <sup style={style} {...props.attributes}>
                {props.children}
            </sup>
        )
    }
    //@ts-expect-error
    else if (props.leaf.subscript) {
        return (
            <sub style={style} {...props.attributes}>
                {props.children}
            </sub>
        )
    } else {
        return (
            <span style={style} {...props.attributes}>
                {props.children}
            </span>
        )
    }


}
