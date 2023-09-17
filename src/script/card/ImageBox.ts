import { CardContentData } from "./CardContentData";


export type ImageBox = {
    readonly type: CardContentData.Type.IMAGE
    readonly base64ImageData: string
}

export namespace ImageBox {
    export function isImageBox(variable: unknown): variable is ImageBox {
        return (
            typeof (variable) === "object" &&
            variable !== null &&
            "type" in variable && variable.type === CardContentData.Type.IMAGE &&
            "base64ImageData" in variable &&
            typeof (variable.base64ImageData) === "string"
        )
    }

    export function of(base64ImageData: string): ImageBox {
        return Object.freeze({
            type: CardContentData.Type.IMAGE,
            base64ImageData: base64ImageData
        })
    }
}
