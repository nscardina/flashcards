import { Box, BoxNumber } from "./Box"
import CardLayout from "./cardlayout"

export type CardFace = {
    readonly layout: CardLayout
    readonly box: {
        [key in BoxNumber]: Box | null
    }
}

export namespace CardFace {
    export function isCardFace(variable: unknown): variable is CardFace {
        return (
            typeof (variable) === "object" &&
            variable !== null &&
            "layout" in variable &&
            Object.values(CardLayout).includes(variable.layout as any) &&
            "box" in variable &&
            typeof (variable.box) === "object" && variable.box !== null &&
            "1" in variable.box &&
            (Box.isBox(variable.box[1]) || variable.box[1] === null) &&
            "2" in variable.box &&
            (Box.isBox(variable.box[2]) || variable.box[2] === null) &&
            "3" in variable.box &&
            (Box.isBox(variable.box[3]) || variable.box[3] === null) &&
            "4" in variable.box &&
            (Box.isBox(variable.box[4]) || variable.box[4] === null)
        )
    }
}
