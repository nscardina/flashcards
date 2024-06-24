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

    /**
     * Returns a new `CardFace` object that is identical 
     * to the one passed in aside from the `layout` field,
     * specified in the `layout` parameter.
     * @param cardFace existing `CardFace` object.
     * @param layout new layout.
     * @returns new `CardFace` object.
     */
    export function setLayout(
        cardFace: CardFace,
        newLayout: CardLayout
    ): CardFace {
        return {
            ...cardFace,
            layout: newLayout
        }
    }

    /**
     * Returns a new `CardFace` object that is identical
     * to the one passed in aside from the `box[1]` field,
     * specified in the `newBox1` parameter.
     * @param cardFace existing `CardFace` object.
     * @param newBox1 new Box 1 value.
     * @returns new `CardFace` object.
     */
    export function setBox1(
        cardFace: CardFace,
        newBox1: Box
    ): CardFace {
        return {
            ...cardFace,
            box: {
                ...cardFace.box,
                "1": newBox1
            }
        }
    }

    /**
     * Returns a new `CardFace` object that is identical
     * to the one passed in aside from the `box[2]` field,
     * specified in the `newBox2` parameter.
     * @param cardFace existing `CardFace` object.
     * @param newBox1 new Box 2 value.
     * @returns new `CardFace` object.
     */
    export function setBox2(
        cardFace: CardFace,
        newBox2: Box
    ): CardFace {
        return {
            ...cardFace,
            box: {
                ...cardFace.box,
                "2": newBox2
            }
        }
    }

    /**
     * Returns a new `CardFace` object that is identical
     * to the one passed in aside from the `box[3]` field,
     * specified in the `newBox3` parameter.
     * @param cardFace existing `CardFace` object.
     * @param newBox1 new Box 3 value.
     * @returns new `CardFace` object.
     */
    export function setBox3(
        cardFace: CardFace,
        newBox3: Box
    ): CardFace {
        return {
            ...cardFace,
            box: {
                ...cardFace.box,
                "3": newBox3
            }
        }
    }

    /**
     * Returns a new `CardFace` object that is identical
     * to the one passed in aside from the `box[4]` field,
     * specified in the `newBox4` parameter.
     * @param cardFace existing `CardFace` object.
     * @param newBox1 new Box 4 value.
     * @returns new `CardFace` object.
     */
    export function setBox4(
        cardFace: CardFace,
        newBox4: Box
    ): CardFace {
        return {
            ...cardFace,
            box: {
                ...cardFace.box,
                "4": newBox4
            }
        }
    }
}
