import LayoutToggleButton from "./LayoutToggleButton"
import { NavDropdownMenu } from "react-bootstrap-submenu"



export default function EditMenu({disabled}: {disabled: boolean}) {
  return (
    <NavDropdownMenu title="Edit" className="navbar-menu-item" style={{cursor: "pointer"}}> 
      <LayoutToggleButton />
    </NavDropdownMenu>
  )
}
