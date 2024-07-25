import { HTMLAttributes } from "react";
import { CommonRectElement } from "./CommonRectElement";
import { CommonSVGElement } from "./CommonSVGElement";

export const TwoVerticalBoxesIcon = (props: HTMLAttributes<SVGElement> & { strokecolor: string; }) => (
    <CommonSVGElement {...props}>
        <CommonRectElement x="10" y="10" width="35" height="80" stroke={props.strokecolor} />
        <CommonRectElement x="55" y="10" width="35" height="80" stroke={props.strokecolor} />
    </CommonSVGElement>
);
