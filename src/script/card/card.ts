import { useState } from "react"
import type { CardFace } from "./cardface"

export type Card = {
    frontFace: CardFace,
    backFace: CardFace
}