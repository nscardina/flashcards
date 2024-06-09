import MaterialSymbol from "../MaterialSymbol";
import SimpleMarkToggleButton from "./SimpleMarkToggleButton";

export default function StrikethroughButton() {
    return (
        <SimpleMarkToggleButton markToggleProperty="strikethrough" className="flashcard-button">
            <MaterialSymbol>format_strikethrough</MaterialSymbol>
        </SimpleMarkToggleButton>
    )
}