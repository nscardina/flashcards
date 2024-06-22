import { DropdownItemProps, NavDropdown } from "react-bootstrap";
import MaterialSymbol from "../MaterialSymbol";
import { LegacyRef, forwardRef } from "react";

const CustomMenuItem = forwardRef((props: DropdownItemProps & {
    icon: string | JSX.Element,
    body: JSX.Element,
    keyboardShortcut?: string,
}, ref: LegacyRef<null>,) => {

    const dropdownItemPropsOnly: DropdownItemProps = Object.fromEntries(
        (Object.entries(props))
        .filter(entry => !(["icon", "body", "keyboardShortcut"].includes(entry[0])))
    )

    return (
        <NavDropdown.Item as={props.as} {...dropdownItemPropsOnly} ref={ref} >
            {(typeof(props.icon) === "string") ? 
            (<MaterialSymbol className="me-2">{props.icon}</MaterialSymbol>)
            : props.icon
            }
                
                
            {props.body}

            <span className="ms-auto ps-4 text-muted">{props.keyboardShortcut}</span>
        </NavDropdown.Item>
    )
})

export default CustomMenuItem