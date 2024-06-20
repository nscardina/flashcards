import { HTMLAttributes, HTMLProps, PropsWithChildren } from "react"
import styled from "styled-components"

// const MaterialSymbolStyle = styled("span").attrs({
//     className: "material-symbols-outlined",
// })`
// width: max-content;
// display: block;
// `

function MaterialSymbol(props: HTMLAttributes<HTMLSpanElement>) {
    const modifiedProps = {
        ...props,
        className: `material-symbols-outlined ${props.className}`,
        style: {
            width: "max-content",
            display: "block"
        }
    }

    return <span {...modifiedProps}/>
}

// const MaterialSymbol = (props: HTMLAttributes<typeof MaterialSymbolStyle>) => <MaterialSymbolStyle {...props} />

export default MaterialSymbol