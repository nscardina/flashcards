import { Dropdown } from "react-bootstrap";

const WEB_SAFE_FONTS: string[] = [
    "Arial",
    "Courier New",
    "Georgia",
    "Helvetica",
    "Times New Roman",
    "Verdana",
]

const OTHER_FONTS: string[] = [
    "Roboto",
]

export default function FontSelectButton({currentFont}: { currentFont: string }) {

    return (
        <Dropdown className="fc-text-editor-bar-min-content">
            <Dropdown.Toggle className="flashcard-button">
                {currentFont}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Header>Web Safe Fonts</Dropdown.Header>
                {WEB_SAFE_FONTS.map(font => <Dropdown.Item key={font}>{font}</Dropdown.Item>)}

                <Dropdown.Header>Other Fonts</Dropdown.Header>
                {OTHER_FONTS.map(font => <Dropdown.Item key={font}>{font}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    )
}