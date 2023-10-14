import { PropsWithChildren, useRef } from "react";
import "./Dropdown.scss"

export function Dropdown({children}: PropsWithChildren) {

    const dropdownContainer = useRef<HTMLDivElement | null>(null);

    return ( 
        <>
        <button onClick={() => {
            if (dropdownContainer.current?.style.display === "none") {
                dropdownContainer.current.style.display = "block";
            } else if (dropdownContainer.current?.style.display === "block") {
                dropdownContainer.current.style.display = "none";
            }
        }}>
test
        </button>
        <div ref={dropdownContainer} style={{display: "none"}}>
            test
        </div>
        </>
    )

}

export function DropdownToggle({style, children}: PropsWithChildren<React.HTMLAttributes<HTMLButtonElement>>) {

    return (
        <button style={style} className="ns-dropdown-toggle">
            {children}
        </button>
    )
}

export function DropdownMenu({style, children}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {

    return (
        <div style={style} className="ns-dropdown-menu-container">
            {children}
        </div>
    )
}