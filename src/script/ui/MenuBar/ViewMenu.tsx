import { Dropdown } from "react-bootstrap";
import { MenuDropdownToggle } from "./MenuBar";

export default function ViewMenu() {


    return (
        <Dropdown>
            <MenuDropdownToggle className="flashcard-button border-0">
                View
            </MenuDropdownToggle>
            <Dropdown.Menu>
                <Dropdown.Item>
                    Edit
                </Dropdown.Item>
                <Dropdown.Item>
                    View
                </Dropdown.Item>
                <Dropdown.Item>
                    Review
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                    Fullscreen
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}