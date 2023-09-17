import { CardContentData } from "./CardContentData";


export type VideoLinkBox = {
    readonly type: CardContentData.Type.VIDEO_LINK
    readonly link: string
}

export namespace VideoLinkBox {
    export function isVideoLinkBox(variable: unknown) {
        return (
            typeof (variable) === "object" &&
            variable !== null &&
            "type" in variable &&
            variable.type === CardContentData.Type.VIDEO_LINK &&
            "link" in variable &&
            typeof (variable.link) === "string"
        )
    }

    export function of(link: string): VideoLinkBox {
        return Object.freeze({
            type: CardContentData.Type.VIDEO_LINK,
            link: link
        })
    }
}
