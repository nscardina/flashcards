import { Box } from "./box"

/**
 * Enumeration of the eight possible layouts of {@linkcode Box} objects on a 
 * flashcard.
 */
enum CardLayout {
    /**
     * Layout where one box takes up the whole flashcard.
     */
    ONE_BOX,
    /**
     * Layout where two vertical boxes next to each other take up the whole 
     * flashcard.
     */
    TWO_BOXES_V,
    /**
     * Layout where two horizontal boxes, one above the other, take up the 
     * whole flashcard.
     */
    TWO_BOXES_H,
    /**
     * Layout where one vertical box on the left side of the card is next to 
     * two boxes, one on top of the other, on the right side of the card.
     */
    ONE_BOX_LV_TWO_BOXES_RV,
    /**
     * Layout where one vertical box on the right side of the card is next to 
     * two boxes, one on top of the other, on the left side of the card.
     */
    ONE_BOX_RV_TWO_BOXES_LV,
    /**
     * Layout where one horizontal box on the top of the card is above two 
     * boxes, one next to the other, on the bottom of the card.
     */
    ONE_BOX_TH_TWO_BOXES_BH,
    /**
     * Layout where one horizontal box on the bottom of the card is below two 
     * boxes, one next to the other, on the top of the card.
     */
    ONE_BOX_BH_TWO_BOXES_TH,
    /**
     * Layout where there are four equally-sized boxes, one in each corner of 
     * the box.
     */
    FOUR_BOXES
}

export default CardLayout