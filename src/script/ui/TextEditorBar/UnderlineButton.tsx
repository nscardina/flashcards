import MaterialSymbol from "../MaterialSymbol";
import SimpleMarkToggleButton from "./SimpleMarkToggleButton";

export default function UnderlineButton() {
    return (
        <SimpleMarkToggleButton markToggleProperty="underlined" className="flashcard-button">
            <MaterialSymbol>format_underlined</MaterialSymbol>
        </SimpleMarkToggleButton>
    )
}