
import { RenderLeafProps } from "slate-react"
import { Property } from "csstype"
import { FormattedText } from "../types/leaf/FormattedText"

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

function getFontSize({superscript, subscript, fontSize}: FormattedText):
Property.FontSize | undefined {
    let multiplier = 1.0;
    if (superscript || subscript) {
        multiplier *= 0.8;
    }
    switch (fontSize) {
        case "xx-small": multiplier *= 0.4; break;
        case "x-small": multiplier *= 0.6; break;
        case "small": multiplier *= 0.75; break;
        case "medium": break;
        case "large": multiplier *= 1.25; break;
        case "x-large": multiplier *= 1.6; break;
        case "xx-large": multiplier *= 1.8; break;
        case "xxx-large": multiplier *= 2.0; break;
    }
    return `${multiplier * 100}%`
}

export default function renderLeaf(props: RenderLeafProps) {

    if (FormattedText.isFormattedText(props.leaf)) {
        const style: React.CSSProperties = {
            fontWeight: props.leaf.bold ? "bold" : "normal",
            fontStyle: props.leaf.italic ? "italic" : "normal",
            textDecorationLine: getTextDecoration(props.leaf),
            verticalAlign: getVerticalAlign(props.leaf),
            fontSize: getFontSize(props.leaf),
            fontFamily: props.leaf.fontFamily ?? "Roboto",
        }
        return (
            <span style={style} {...props.attributes}>
                {props.children}
            </span>
        )
    }
    else {
        return (
            <span {...props.attributes}>
                {props.children}
            </span>
        )
    }
}
