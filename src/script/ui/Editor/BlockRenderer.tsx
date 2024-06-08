import { RenderElementProps } from "slate-react";
import { Property } from "csstype"
import { CustomElement } from "../types/slate_defs";
import Latex from "react-latex-next";

//@ts-expect-error
function getTextAlign({alignment}: CustomElement):
Property.TextAlign | undefined {
    switch (alignment) {
        case "left": return "left"
        case "center": return "center"
        case "right": return "right"
        case "justified": return "justify"
    }
}
    
export default function blockRenderer(
    props: RenderElementProps
): JSX.Element {

    const style: React.CSSProperties = {
        display: "block",
        textAlign: getTextAlign(props.element)
    }

    switch (props.element.type) {
        case "paragraph":
            return <p style={style} {...props} />
        case "unordered_list_element":
            return <ul style={style} {...props} />
        case "unordered_list_member":
            return <li style={{...style, display: "list-item"}} className="flashcard-ul-elem" {...props} />
        case "ordered_list_element":
            return <ol style={style} {...props} />
        case "ordered_list_member":
            return <li style={{...style, display: "list-item"}} className="flashcard-ul-elem" {...props} />
        case "LaTeX":
            return <Latex {...props} />
    }
}