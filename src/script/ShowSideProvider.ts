const ShowSideProviderFront = Object.freeze(() => true)
const ShowSideProviderBack = Object.freeze(() => false)
const ShowSideProviderRandom = Object.freeze(() => (Math.random() * 10) > 0.5)

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