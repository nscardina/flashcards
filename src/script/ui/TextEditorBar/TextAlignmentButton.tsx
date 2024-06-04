import { Dropdown } from "react-bootstrap";
import MaterialSymbol from "../MaterialSymbol";

export default function TextAlignmentButton() {
    return (
        <Dropdown>
            <Dropdown.Toggle className="flashcard-button d-flex flex-row" style={{alignItems: "center"}}> 
                <MaterialSymbol>format_align_left</MaterialSymbol>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item className="d-flex flex-row">
                    <MaterialSymbol>format_align_left</MaterialSymbol>&nbsp;&nbsp;Left
                </Dropdown.Item>
                <Dropdown.Item className="d-flex flex-row">
                    <MaterialSymbol>format_align_center</MaterialSymbol>&nbsp;&nbsp;Center
                </Dropdown.Item>
                <Dropdown.Item className="d-flex flex-row">
                    <MaterialSymbol>format_align_right</MaterialSymbol>&nbsp;&nbsp;Right
                </Dropdown.Item>
                <Dropdown.Item className="d-flex flex-row">
                    <MaterialSymbol>format_align_justify</MaterialSymbol>&nbsp;&nbsp;Justified
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}