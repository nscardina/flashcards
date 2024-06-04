import { Dropdown } from "react-bootstrap";

const FONT_SIZES = [
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    18,
    20,
    22,
    24,
    28,
    32,
    36,
    48,
    54,
    60,
    66,
    72,
    80,
    88,
    96
]

export default function FontSizeSelectButton() {
    return (
        <Dropdown>
            <Dropdown.Toggle className="flashcard-button">
                12 pt
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {FONT_SIZES.map(size => <Dropdown.Item>{size} pt</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    )
}