enum CardContentType {
    TEXT,
    IMAGE,
    VIDEO_LINK,
}

export type CardContentTypeText = { text: string }
export type CardContentTypeImage = { image: HTMLImageElement }
export type CardContentTypeVideoLink = { link: string }

export default CardContentType