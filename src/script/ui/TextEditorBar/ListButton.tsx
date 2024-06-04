import { Dropdown } from "react-bootstrap";
import MaterialSymbol from "../MaterialSymbol";

export default function ListButton() {
    return (
        <Dropdown>
            <Dropdown.Toggle className="flashcard-button d-flex flex-row" style={{alignItems: "center"}}> 
                <MaterialSymbol>format_list_bulleted</MaterialSymbol>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item className="d-flex flex-row">
                    <MaterialSymbol>format_list_bulleted</MaterialSymbol>&nbsp;&nbsp;Left
                </Dropdown.Item>
                <Dropdown.Item className="d-flex flex-row">
                    <MaterialSymbol>format_list_numbered</MaterialSymbol>&nbsp;&nbsp;Center
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}