import { useCallback, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { DropdownSubmenu } from "react-bootstrap-submenu";
import "react-bootstrap-submenu/dist/index.css";
import CustomMenuItem from "../../CustomMenuItem";
import CardLayout from "../../../../card/cardlayout";
import { Side } from "../../../../card/side";
import { useFCState } from "../../../../state/FCState";
import { OneBoxIcon } from "./OneBoxIcon";
import { TwoVerticalBoxesIcon } from "./TwoVerticalBoxesIcon";
import { TwoHorizontalBoxesIcon } from "./TwoHorizontalBoxesIcon";
import { FourBoxesIcon } from "./FourBoxesIcon";
import { OneLeftVerticalBoxTwoRightHorizontalBoxes } from "./OneLeftVerticalBoxTwoRightHorizontalBoxes";
import { OneRightVerticalBoxTwoLeftHorizontalBoxes } from "./OneRightVerticalBoxTwoLeftHorizontalBoxes";
import { OneTopHorizontalBoxTwoBottomVerticalBoxes } from "./OneTopHorizontalBoxTwoBottomVerticalBoxes";
import { TwoTopVerticalBoxesOneBottomHorizontalBox } from "./TwoTopVerticalBoxesOneBottomHorizontalBox";

const mapCardLayout = (classNames: string) => (layout: CardLayout | undefined) => {
    switch (layout) {
        case CardLayout.ONE_BOX:
            return <OneBoxIcon strokecolor="black" className={classNames} />;
        case CardLayout.TWO_BOXES_V:
            return <TwoVerticalBoxesIcon strokecolor="black" className={classNames} />;
        case CardLayout.TWO_BOXES_H:
            return <TwoHorizontalBoxesIcon strokecolor="black" className={classNames} />;
        case CardLayout.FOUR_BOXES:
            return <FourBoxesIcon strokecolor="black" className={classNames} />;
        case CardLayout.ONE_BOX_LV_TWO_BOXES_RV:
            return <OneLeftVerticalBoxTwoRightHorizontalBoxes strokecolor="black" className={classNames} />;
        case CardLayout.ONE_BOX_RV_TWO_BOXES_LV:
            return <OneRightVerticalBoxTwoLeftHorizontalBoxes strokecolor="black" className={classNames} />;
        case CardLayout.ONE_BOX_TH_TWO_BOXES_BH:
            return <OneTopHorizontalBoxTwoBottomVerticalBoxes strokecolor="black" className={classNames} />;
        case CardLayout.ONE_BOX_BH_TWO_BOXES_TH:
            return <TwoTopVerticalBoxesOneBottomHorizontalBox strokecolor="black" className={classNames} />;
        default:
            return <></>;
}
}

export default function LayoutToggleButton() {
    const deck = useFCState(state => state.deck);
    const visibleSide = useFCState(state => state.visibleSide);
    const visibleCardIndex = useFCState(state => state.visibleCardIndex);
    const setCards = useFCState(state => state.setCards);

    const mapLayout = useCallback(mapCardLayout("ms-2 mt-1"), []);
    const mapIconLayout = useCallback(mapCardLayout("me-2"), []);
    const editMenuMapIconLayout = useCallback(mapCardLayout("ms-3 mt-1"), []);

    const changeCardLayout = useCallback((layout: CardLayout): void => {
        if (deck !== null && deck.cards.length > 0) {
            const updatedCard = (visibleSide === Side.FRONT) ? {
                front: {
                    ...deck.cards[visibleCardIndex].front,
                    layout: layout
                },
                back: deck.cards[visibleCardIndex].back,
            } : {
                front: deck.cards[visibleCardIndex].front,
                back: {
                    ...deck.cards[visibleCardIndex].back,
                    layout: layout
                }
            }

            setCards([
                ...deck.cards.slice(0, visibleCardIndex),
                updatedCard,
                ...deck.cards.slice(visibleCardIndex + 1)
            ])
        }
    }, [deck, visibleSide, visibleCardIndex, setCards]);

    const [currentIcon, setCurrentIcon] = useState<JSX.Element>(
        mapLayout(deck?.cards[visibleCardIndex][visibleSide]?.layout)
    )

    const boxOnClick = useCallback((cardLayout: CardLayout) => () => {
        changeCardLayout(cardLayout);
        setCurrentIcon(editMenuMapIconLayout(cardLayout));
    }, [changeCardLayout, setCurrentIcon, editMenuMapIconLayout])

    const makeMenuItem = useCallback((text: string, layout: CardLayout) => (
        <CustomMenuItem
            style={{ display: "flex", flexDirection: "row" }}
            icon={mapIconLayout(layout)}
            body={<>{text}</>}
            onClick={boxOnClick(layout)}
        />
    ), [boxOnClick]);

    if (deck === null) {
        return (
            <Dropdown.Item as="button" style={{ display: "flex", flexDirection: "row", }} disabled={deck === null}>
                {currentIcon}
                Card Layout
            </Dropdown.Item>
        )
    } else {

        return (
            <Dropdown.Item as="button" style={{ margin: "0px", padding: "0px", display: "flex", flexDirection: "row", }} >
                {currentIcon}
                <DropdownSubmenu as="button" id={`layout-toggle-button${(deck === null) ? "-disabled" : ""}`} title="Card Layout">
                    {makeMenuItem("One Box", CardLayout.ONE_BOX)}
                    {makeMenuItem("Two Vertical Boxes", CardLayout.TWO_BOXES_V)}
                    {makeMenuItem("Two Horizontal Boxes", CardLayout.TWO_BOXES_H)}
                    {makeMenuItem("Four Boxes", CardLayout.FOUR_BOXES)}
                    {makeMenuItem("One vertical box on left, two horizontal boxes on right", CardLayout.ONE_BOX_LV_TWO_BOXES_RV)}
                    {makeMenuItem("One vertical box on right, two horizontal boxes on left", CardLayout.ONE_BOX_RV_TWO_BOXES_LV)}
                    {makeMenuItem("One horizontal box on top, two vertical boxes on bottom", CardLayout.ONE_BOX_TH_TWO_BOXES_BH)}
                    {makeMenuItem("Two vertical boxes on top, one horizontal box on bottom", CardLayout.ONE_BOX_BH_TWO_BOXES_TH)}
                </DropdownSubmenu>
            </Dropdown.Item>
        )
    }
}