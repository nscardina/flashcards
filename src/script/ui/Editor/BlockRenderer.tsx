import { RenderElementProps } from "slate-react";
import { Property } from "csstype"
import { CustomElement } from "../types/slate_defs";
import { HTMLProps } from "react";
import 'katex/dist/katex.min.css';
import Latex from "react-latex-next";
import { LaTeXText } from "../types/leaf/LaTeXText";
import { Range } from "slate";
import { useFCState } from "../../state/FCState";


//@ts-ignore
function getTextAlign({ alignment }: CustomElement):
    Property.TextAlign | undefined {
    switch (alignment) {
        case "left": return "left"
        case "center": return "center"
        case "right": return "right"
        case "justified": return "justify"
    }
}

const commonStyles = {
    margin: "0px"
}

function Paragraph(props: RenderElementProps & HTMLProps<HTMLParagraphElement>) {
    return <p style={{
        ...commonStyles,
        width: "max-content",
        maxWidth: "100%",
        textAlign: getTextAlign(props.element)
    }} {...props} />
}

function UnorderedListElement(props: RenderElementProps & HTMLProps<HTMLUListElement>) {
    return <ul style={{
        ...commonStyles,
        width: "max-content",
        maxWidth: "100%",
    }} {...props} />
}

function UnorderedListMember(props: RenderElementProps & HTMLProps<HTMLLIElement>) {
    return <li style={{
        ...commonStyles,
        display: "list-item",
        width: "100%",
    }} className="flashcard-ul-elem" {...props} />
}

function OrderedListElement(props: RenderElementProps) {
    return <ol style={{ ...commonStyles }} {...props} />
}

function OrderedListMember(props: RenderElementProps) {
    return <li style={{ ...commonStyles, display: "list-item" }} className="flashcard-ul-elem" {...props} />
}

function FormattedTextSpan(props: RenderElementProps) {
    return <span {...props} />
}

function LaTeXTextSpan(props: RenderElementProps) {

    const editor = useFCState(state => state.currentEditor)();
    const lastEditedNodePath = useFCState(state => state.lastEditedNodePath);
    const setLastEditedNodePath = useFCState(state => state.setLastEditedNodePath);
    const setShouldLaTeXEditorReplace = useFCState(state => state.setShouldLaTeXEditorReplace);
    const setShowLaTeXEditor = useFCState(state => state.setShowLaTeXEditor);

    const latexContents =
        (props.element.children as LaTeXText[])
            .map(child => child.text)
            .reduceRight((prev, curr) => {
                if (typeof (prev) === "string") {
                    return `${prev}\n${curr}`
                } else {
                    return curr
                }
            });

    return (
        <span {...props.attributes} contentEditable={false} onClick={
            () => {
                
                if (editor.selection !== null 
                    && Range.isCollapsed(editor.selection)
                ) {
                    setShouldLaTeXEditorReplace(true);
                    setShowLaTeXEditor(true);
                    const path = editor.selection.anchor.path
                    if (lastEditedNodePath.length <= path.length) {
                        setLastEditedNodePath(path)
                    } else {
                        setLastEditedNodePath([...path, 0])
                    }
                    
                }
            }
        }>
            {props.children}
            <Latex>{latexContents}</Latex>
        </span>
    )
}

export default function blockRenderer(
    props: RenderElementProps
): JSX.Element {

    switch (props.element.type) {
        case "paragraph": return <Paragraph {...props} />
        case "unordered_list_element": return <UnorderedListElement {...props} />
        case "unordered_list_member": return <UnorderedListMember {...props} />
        case "ordered_list_element": return <OrderedListElement {...props} />
        case "ordered_list_member": return <OrderedListMember {...props} />
        case "formatted_text_span": return <FormattedTextSpan {...props} />
        case "latex_text_span": return <LaTeXTextSpan {...props} />
    }
}