import { Side } from "./card/side"

const ShowSideProviderFront = Object.freeze(() => Side.FRONT)
const ShowSideProviderBack = Object.freeze(() => Side.BACK)
const ShowSideProviderRandom = Object.freeze(() => (Math.random() * 10) > 5 ? Side.FRONT : Side.BACK)

type ShowSideProviderName = "FRONT" | "BACK" | "RANDOM"

const ShowSideProviderNames: ShowSideProviderName[] = ["FRONT", "BACK", "RANDOM"]

const ShowSideProvider = {
    get(name: ShowSideProviderName) {
        switch (name) {
            case "FRONT": return ShowSideProviderFront
            case "BACK": return ShowSideProviderBack
            case "RANDOM": return ShowSideProviderRandom
            default: throw new TypeError(`Invalid ShowSideProviderName ${name}`)
        }
    },

}

export default ShowSideProvider

export {
    ShowSideProviderNames
}

export type {
    ShowSideProviderName
}