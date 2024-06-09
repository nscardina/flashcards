import MaterialSymbol from "../MaterialSymbol";
import SimpleMarkToggleButton from "./SimpleMarkToggleButton";

export default function BoldButton() {
    return (
        <SimpleMarkToggleButton markToggleProperty="bold" className="flashcard-button">
            <MaterialSymbol>format_bold</MaterialSymbol>
        </SimpleMarkToggleButton>
    )
}
