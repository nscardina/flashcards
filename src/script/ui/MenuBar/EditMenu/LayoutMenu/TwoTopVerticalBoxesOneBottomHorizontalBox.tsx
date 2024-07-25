import { HTMLAttributes } from "react";
import { CommonRectElement } from "./CommonRectElement";
import { CommonSVGElement } from "./CommonSVGElement";

export const TwoTopVerticalBoxesOneBottomHorizontalBox = (props: HTMLAttributes<SVGElement> & { strokecolor: string; }) => (
    <CommonSVGElement {...props}>
        <CommonRectElement x="10" y="55" width="80" height="35" stroke={props.strokecolor} />
        <CommonRectElement x="10" y="10" width="35" height="35" stroke={props.strokecolor} />
        <CommonRectElement x="55" y="10" width="35" height="35" stroke={props.strokecolor} />
    </CommonSVGElement>
);
