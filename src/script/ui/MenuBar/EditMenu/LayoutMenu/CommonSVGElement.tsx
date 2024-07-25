import { HTMLAttributes } from "react";

export const CommonSVGElement = (props: HTMLAttributes<SVGElement>) => (
    <svg
        viewBox="0 0 100 100"
        width="1.5rem"
        height="1.5rem"
        style={{ display: "inline-block" }}
        {...props} />
);
