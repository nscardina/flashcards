export type FCSlateType<Id extends string> = {
    type: Id
}

export namespace FCSlateType {
    export function isFCSlateType<Id extends string>(
        variable: unknown,
        id: Id
    ): variable is FCSlateType<Id> {
        return (
            typeof(variable) === "object"
            && variable !== null
            && "type" in variable
            && variable.type === id
        )
    }
}