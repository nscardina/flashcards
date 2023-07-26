const DisplayFrontProvider = Object.freeze({
    FRONT: Object.freeze(() => true),
    BACK: Object.freeze(() => false),
    RANDOM: Object.freeze(() => (Math.random() * 10) > 0.5)
})

export type DisplayFrontProviderFunction = () => boolean

export default DisplayFrontProvider