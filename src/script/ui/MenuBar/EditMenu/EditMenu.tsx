import LayoutToggleButton from "./LayoutMenu/LayoutToggleButton"
import { NavDropdownMenu } from "react-bootstrap-submenu"

export default function EditMenu({disabled}: {disabled: boolean}) {
  return (
    <NavDropdownMenu title="Edit" className="navbar-menu-item fc-navbar-dropdown-trigger" disabled={disabled}> 
      <LayoutToggleButton />
    </NavDropdownMenu>
  )
}
