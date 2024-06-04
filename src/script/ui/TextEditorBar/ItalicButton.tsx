import { Button } from "react-bootstrap";
import MaterialSymbol from "../MaterialSymbol";

export default function ItalicButton() {
    return (
        <Button className="flashcard-button">
            <MaterialSymbol>format_italic</MaterialSymbol>
        </Button>
    )
}