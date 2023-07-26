import { useState } from "react"
import CardLayout from "./cardlayout"
import CardContentType, { CardContentTypeImage, CardContentTypeText, CardContentTypeVideoLink } from "./cardcontent"

export type Box = {
    type: CardContentType,
    content: CardContentTypeText | CardContentTypeImage | CardContentTypeVideoLink | null
}

export type CardFace = {
    layout: CardLayout,
    box1: Box,
    box2: Box,
    box3: Box,
    box4: Box
}
