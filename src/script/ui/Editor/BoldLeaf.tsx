
import { RenderLeafProps } from "slate-react"

export default function renderBoldLeaf(props: RenderLeafProps) {

    //@ts-expect-error
    if (props.leaf.bold) {
        return <b {...props.attributes}>{props.children}</b>
    } else {
        return <span {...props.attributes}>{props.children}</span>
    }
}
