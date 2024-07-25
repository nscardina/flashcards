import { SVGAttributes } from "react";

export const CommonRectElement = (props: SVGAttributes<SVGRectElement>) => (
    <rect
        rx="5"
        ry="5"
        fillOpacity="0"
        strokeWidth="0.25rem"
        {...props} />
);
