import { HTMLAttributes } from "react"

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

export default MaterialSymbol