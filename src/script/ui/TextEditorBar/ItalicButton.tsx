import MaterialSymbol from "../MaterialSymbol";
import SimpleMarkToggleButton from "./SimpleMarkToggleButton";

export default function ItalicButton() {
    return (
        <SimpleMarkToggleButton markToggleProperty="italic" className="flashcard-button">
            <MaterialSymbol>format_italic</MaterialSymbol>
        </SimpleMarkToggleButton>
    )
}