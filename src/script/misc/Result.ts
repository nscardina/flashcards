// Replicates the functionality of https://doc.rust-lang.org/std/result/
// (Rust's result type), inspired by various existing libraries. However,
// this is designed to be plain objects, so that they can be run through
// structuredClone properly.

export type Result<T, E> = Ok<T> | Err<E>

export type Ok<T> = {
    value: T
}

export function Ok<T>(value: T): Ok<T> {
    return {
        value: value
    }
}

export type Err<E> = {
    err: E
}

export function Err<E>(err: E): Err<E> {
    return {
        err: err
    }
}

export function isOk<T, E>(
    result: Result<T, E>,
    isCorrectTypeTest?: (value: T) => value is T
): result is Ok<T> {
    return (
        "value" in result && 
        (isCorrectTypeTest) ? isCorrectTypeTest(result.value) : true
    )
}

export function isErr<T, E>(
    result: Result<T, E>,
    isCorrectTypeTest?: (value: E) => value is E
): result is Err<E> {
    return (
        "err" in result && 
        (isCorrectTypeTest) ? isCorrectTypeTest(result.err) : true
    )
}

export type unwrappedType<T, E, R extends Result<T, E>> = 
    R extends Ok<T> ? T : E

export function unwrap<T, E>(
    result: Result<T, E>
): unwrappedType<T, E, Result<T, E>> {
    if (isOk(result)) {
        return result.value
    } else {
        return result.err
    }
}