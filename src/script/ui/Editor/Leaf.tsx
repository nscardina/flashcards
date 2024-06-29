
import { RenderLeafProps } from "slate-react"
import { FormattedText } from "../types/slate_defs"
import { Property } from "csstype"

function getTextDecoration({underlined, strikethrough}: FormattedText):
Property.TextDecorationLine {
    const underlineStr = underlined ? "underline" : ""
    const strikethroughStr = strikethrough ? "line-through" : ""
    const noneStr = (!underlined && !strikethrough) ? "none" : ""
    return `${underlineStr} ${strikethroughStr} ${noneStr}`
}

function getVerticalAlign({superscript, subscript}: FormattedText):
Property.VerticalAlign | undefined {
    if (superscript) {
        return "super"
    } else if (subscript) {
        return "sub"
    }
}

function getFontSize({superscript, subscript}: FormattedText):
Property.FontSize | undefined {
    if (superscript || subscript) {
        return "smaller"
    }
}

export default function renderLeaf(props: RenderLeafProps) {

    const style: React.CSSProperties = {
        fontWeight: props.leaf.bold ? "bold" : "normal",
        fontStyle: props.leaf.italic ? "italic" : "normal",
        textDecorationLine: getTextDecoration(props.leaf),
        verticalAlign: getVerticalAlign(props.leaf),
        fontSize: getFontSize(props.leaf)
    }
    return (
        <span style={style} {...props.attributes}>
            {props.children}
        </span>
    )
}
