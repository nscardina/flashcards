export enum ReviewOrder {
    IN_ORDER = "In order",
    REVERSE_ORDER = "Reverse order",
    RANDOM = "Random"
}

export type ReviewOrderProvider = Iterator<number, void> & {
    peek: () => IteratorResult<number, void>,
}


export const makeInOrderProvider = (numCards: number): ReviewOrderProvider => {
    let index = 0;
    
    const iterator: ReviewOrderProvider = {
        next() {
            if (index < numCards) {
                return {
                    value: index++,
                    done: false,
                }
            } else {
                return {
                    value: undefined,
                    done: true,
                }
            }
        },
        peek() {
            if (index < numCards) {
                return {
                    value: index,
                    done: false,
                }
            } else {
                return {
                    value: undefined,
                    done: true,
                }
            }
        }
    };

    return iterator;
};

export const makeReverseOrderProvider = (numCards: number) => {
    let index = numCards - 1;
    
    const iterator: ReviewOrderProvider = {
        next() {
            if (index >= 0) {
                return {
                    value: index--,
                    done: false,
                }
            } else {
                return {
                    value: undefined,
                    done: true,
                }
            }
        },
        peek() {
            if (index >= 0) {
                return {
                    value: index,
                    done: false,
                }
            } else {
                return {
                    value: undefined,
                    done: true,
                }
            }
        }
    };

    return iterator;
}

export const makeRandomOrderProvider = (numCards: number) => {
    let used: boolean[] = Array(numCards).fill(false);
    let numbers: number[] = Array(numCards);

    for (let i = 0; i < numCards; i++) {
        let index;
        do { index = Math.floor(Math.random() * numCards); } while (!used[index]);
        
        i++;
        used[index] = true;
        numbers[i] = index;
    }

    let i = 0;

    const iterator: ReviewOrderProvider = {
        next() {
            if (i < numbers.length) {
                return {
                    value: numbers[i++],
                    done: false,
                }
            } else {
                return {
                    value: undefined,
                    done: true,
                }
            }
        },
        peek() {
            if (i < numbers.length) {
                return {
                    value: numbers[i],
                    done: false,
                }
            } else {
                return {
                    value: undefined,
                    done: true,
                }
            }
        }
    }

    return iterator;
}

export const makeReviewOrderProvider = (reviewOrder: ReviewOrder): (numCards: number) => ReviewOrderProvider => {
    switch (reviewOrder) {
        case ReviewOrder.IN_ORDER:
            return makeInOrderProvider;
        case ReviewOrder.REVERSE_ORDER:
            return makeReverseOrderProvider;
        case ReviewOrder.RANDOM:
            return makeRandomOrderProvider;
    }
}