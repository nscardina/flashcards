export default function GeneratorToArray<T>(generator: Generator<T>): T[] {
    const arr: T[] = []
    for (const value of generator) {
        arr.push(value)
    }
    return arr
}