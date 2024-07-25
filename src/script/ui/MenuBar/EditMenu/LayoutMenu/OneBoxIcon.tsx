import { HTMLAttributes } from "react";
import { CommonRectElement } from "./CommonRectElement";
import { CommonSVGElement } from "./CommonSVGElement";

export const OneBoxIcon = (props: HTMLAttributes<SVGElement> & { strokecolor: string; }) => (
    <CommonSVGElement {...props}>
        <CommonRectElement
            x="10"
            y="10"
            width="80"
            height="80"
            stroke={props.strokecolor} />
    </CommonSVGElement>
);
