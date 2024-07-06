export type FCSlateType<Id extends string, Inline extends true | false> = {
    type: Id,
    isInline: Inline
}

export namespace FCSlateType {
    export function isFCSlateInlineType<Id extends string>(
        variable: unknown,
        id: Id
    ): variable is FCSlateInlineType<Id> {
        return (
            typeof(variable) === "object"
            && variable !== null
            && "id" in variable
            && variable.id === id
            && "isInline" in variable
            && variable.isInline === true
        )
    }

    export function isFCSlateBlockType<Id extends string>(
        variable: unknown,
        id: Id
    ): variable is FCSlateBlockType<Id> {
        return (
            typeof(variable) === "object"
            && variable !== null
            && "id" in variable
            && variable.id === id
            && "isInline" in variable
            && variable.isInline === false
        )
    }
}

export type FCSlateInlineType<Id extends string> = FCSlateType<Id, true>

export namespace FCSlateInlineType {
    export function makeDefault<Id extends string> (id: Id): FCSlateInlineType<Id> {
        return {
            type: id,
            isInline: true
        }
    }
}

export type FCSlateBlockType<Id extends string> = FCSlateType<Id, false>

export namespace FCSlateBlockType {
    export function makeDefault<Id extends string>(id: Id): FCSlateBlockType<Id> {
        return {
            type: id,
            isInline: false
        }
    }
}