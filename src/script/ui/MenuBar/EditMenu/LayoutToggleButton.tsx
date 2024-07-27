import { HTMLAttributes, SVGAttributes, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { DropdownSubmenu } from "react-bootstrap-submenu";
import "react-bootstrap-submenu/dist/index.css";
import CustomMenuItem from "../CustomMenuItem";
import CardLayout from "../../../card/cardlayout";
import { Side } from "../../../card/side";
import { useFCState } from "../../../state/FCState";
import { useShallow } from "zustand/react/shallow";

function changeCardLayout(layout: CardLayout): void {

    const deck = useFCState(state => state.deck);
    const setCards = useFCState(state => state.setCards);
    const visibleSide = useFCState(state => state.visibleSide);
    const visibleCardIndex = useFCState(state => state.visibleCardIndex);

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
}

const CommonSVGElement = (props: HTMLAttributes<SVGElement>) => (
    <svg
        viewBox="0 0 100 100"
        width="1.5rem"
        height="1.5rem"
        style={{ display: "inline-block" }}
        {...props}
    />
)

const CommonRectElement = (props: SVGAttributes<SVGRectElement>) => (
    <rect
        rx="5"
        ry="5"
        fillOpacity="0"
        strokeWidth="0.25rem"
        {...props}
    />
)

const OneBoxIcon = (props: HTMLAttributes<SVGElement> & { strokecolor: string }) => (
    <CommonSVGElement {...props}>
        <CommonRectElement
            x="10"
            y="10"
            width="80"
            height="80"
            stroke={props.strokecolor}
        />
    </CommonSVGElement>
)

const TwoVerticalBoxesIcon = (props: HTMLAttributes<SVGElement> & { strokecolor: string }) => (
    <CommonSVGElement {...props}>
        <CommonRectElement x="10" y="10" width="35" height="80" stroke={props.strokecolor} />
        <CommonRectElement x="55" y="10" width="35" height="80" stroke={props.strokecolor} />
    </CommonSVGElement>
)

const TwoHorizontalBoxesIcon = (props: HTMLAttributes<SVGElement> & { strokecolor: string }) => (
    <CommonSVGElement {...props}>
        <CommonRectElement x="10" y="10" width="80" height="35" stroke={props.strokecolor} />
        <CommonRectElement x="10" y="55" width="80" height="35" stroke={props.strokecolor} />
    </CommonSVGElement>
)

const FourBoxesIcon = (props: HTMLAttributes<SVGElement> & { strokecolor: string }) => (
    <CommonSVGElement {...props}>
        <CommonRectElement x="10" y="10" width="35" height="35" stroke={props.strokecolor} />
        <CommonRectElement x="10" y="55" width="35" height="35" stroke={props.strokecolor} />
        <CommonRectElement x="55" y="10" width="35" height="35" stroke={props.strokecolor} />
        <CommonRectElement x="55" y="55" width="35" height="35" stroke={props.strokecolor} />
    </CommonSVGElement>
)

const OneLeftVerticalBoxTwoRightHorizontalBoxes = (props: HTMLAttributes<SVGElement> & { strokecolor: string }) => (
    <CommonSVGElement {...props}>
        <CommonRectElement x="10" y="10" width="35" height="80" stroke={props.strokecolor} />
        <CommonRectElement x="55" y="10" width="35" height="35" stroke={props.strokecolor} />
        <CommonRectElement x="55" y="55" width="35" height="35" stroke={props.strokecolor} />
    </CommonSVGElement>
)

const OneRightVerticalBoxTwoLeftHorizontalBoxes = (props: HTMLAttributes<SVGElement> & { strokecolor: string }) => (
    <CommonSVGElement {...props}>
        <CommonRectElement x="55" y="10" width="35" height="80" stroke={props.strokecolor} />
        <CommonRectElement x="10" y="10" width="35" height="35" stroke={props.strokecolor} />
        <CommonRectElement x="10" y="55" width="35" height="35" stroke={props.strokecolor} />
    </CommonSVGElement>
)

const OneTopHorizontalBoxTwoBottomVerticalBoxes = (props: HTMLAttributes<SVGElement> & { strokecolor: string }) => (
    <CommonSVGElement {...props}>
        <CommonRectElement x="10" y="10" width="80" height="35" stroke={props.strokecolor} />
        <CommonRectElement x="10" y="55" width="35" height="35" stroke={props.strokecolor} />
        <CommonRectElement x="55" y="55" width="35" height="35" stroke={props.strokecolor} />
    </CommonSVGElement>
)

const TwoTopVerticalBoxesOneBottomHorizontalBox = (props: HTMLAttributes<SVGElement> & { strokecolor: string }) => (
    <CommonSVGElement {...props}>
        <CommonRectElement x="10" y="55" width="80" height="35" stroke={props.strokecolor} />
        <CommonRectElement x="10" y="10" width="35" height="35" stroke={props.strokecolor} />
        <CommonRectElement x="55" y="10" width="35" height="35" stroke={props.strokecolor} />
    </CommonSVGElement>
)

export default function LayoutToggleButton() {

    const deck = useFCState(useShallow(state => state.deck));
    const visibleSide = useFCState(state => state.visibleSide);
    const visibleCardIndex = useFCState(state => state.visibleCardIndex);

    const oneBoxIcon = <OneBoxIcon strokecolor="black" className="ms-2 mt-1" />
    const twoVerticalBoxesIcon = <TwoVerticalBoxesIcon strokecolor="black" className="ms-2 mt-1" />
    const twoHorizontalBoxesIcon = <TwoHorizontalBoxesIcon strokecolor="black" className="ms-2 mt-1" />
    const fourBoxesIcon = <FourBoxesIcon strokecolor="black" className="ms-2 mt-1" />
    const oneLeftVTwoRightHIcon = <OneLeftVerticalBoxTwoRightHorizontalBoxes strokecolor="black" className="ms-2 mt-1" />
    const oneRightVTwoLeftHIcon = <OneRightVerticalBoxTwoLeftHorizontalBoxes strokecolor="black" className="ms-2 mt-1" />
    const oneTopHTwoBottomVIcon = <OneTopHorizontalBoxTwoBottomVerticalBoxes strokecolor="black" className="ms-2 mt-1" />
    const twoTopVOneBottomHIcon = <TwoTopVerticalBoxesOneBottomHorizontalBox strokecolor="black" className="ms-2 mt-1" />

    function mapLayout(layout: CardLayout | undefined) {
        switch (layout) {
            case CardLayout.ONE_BOX:
                return oneBoxIcon
            case CardLayout.TWO_BOXES_V:
                return twoVerticalBoxesIcon
            case CardLayout.TWO_BOXES_H:
                return twoHorizontalBoxesIcon
            case CardLayout.FOUR_BOXES:
                return fourBoxesIcon
            case CardLayout.ONE_BOX_LV_TWO_BOXES_RV:
                return oneLeftVTwoRightHIcon
            case CardLayout.ONE_BOX_RV_TWO_BOXES_LV:
                return oneRightVTwoLeftHIcon
            case CardLayout.ONE_BOX_TH_TWO_BOXES_BH:
                return oneTopHTwoBottomVIcon
            case CardLayout.ONE_BOX_BH_TWO_BOXES_TH:
                return twoTopVOneBottomHIcon
            default:
                return <></>
        }
    }

    const [currentIcon, setCurrentIcon] = useState<JSX.Element>(mapLayout(deck?.cards[visibleCardIndex][visibleSide]?.layout))

    if (deck === null) {
        return (
            <Dropdown.Item as="button" style={{ display: "flex", flexDirection: "row", }} disabled={deck === null}>
                {currentIcon}
                Card Layout
            </Dropdown.Item>
        )
    } else {

        return (
            <>
                <Dropdown.Item as="button" style={{ margin: "0px", padding: "0px", display: "flex", flexDirection: "row", }} >
                    {currentIcon}
                    <DropdownSubmenu as="button" id={`layout-toggle-button${(deck === null) ? "-disabled" : ""}`} title="Card Layout">
                        <CustomMenuItem
                            style={{ display: "flex", flexDirection: "row" }}
                            icon={<OneBoxIcon strokecolor="black" className="me-2" />}
                            body={<>One Box</>}
                            onClick={() => {
                                changeCardLayout(CardLayout.ONE_BOX)
                                setCurrentIcon(oneBoxIcon)
                            }}
                        />
                        <CustomMenuItem
                            icon={<TwoVerticalBoxesIcon strokecolor="black" className="me-2" />}
                            body={<>Two Vertical Boxes</>}
                            onClick={() => {
                                changeCardLayout(CardLayout.TWO_BOXES_V)
                                setCurrentIcon(twoVerticalBoxesIcon)
                            }}
                        />
                        <CustomMenuItem
                            icon={<TwoHorizontalBoxesIcon strokecolor="black" className="me-2" />}
                            body={<>Two Horizontal Boxes</>}
                            onClick={() => {
                                changeCardLayout(CardLayout.TWO_BOXES_H)
                                setCurrentIcon(twoHorizontalBoxesIcon)
                            }}
                        />
                        <CustomMenuItem
                            icon={<FourBoxesIcon strokecolor="black" className="me-2" />}
                            body={<>Four Boxes</>}
                            onClick={() => {
                                changeCardLayout(CardLayout.FOUR_BOXES)
                                setCurrentIcon(fourBoxesIcon)
                            }}
                        />
                        <CustomMenuItem
                            icon={<OneLeftVerticalBoxTwoRightHorizontalBoxes strokecolor="black" className="me-2" />}
                            body={<>One vertical box on left, two horizontal boxes on right</>}
                            onClick={() => {
                                changeCardLayout(CardLayout.ONE_BOX_LV_TWO_BOXES_RV)
                                setCurrentIcon(oneLeftVTwoRightHIcon)
                            }}
                        />
                        <CustomMenuItem
                            icon={<OneRightVerticalBoxTwoLeftHorizontalBoxes strokecolor="black" className="me-2" />}
                            body={<>One vertical box on right, two horizontal boxes on left</>}
                            onClick={() => {
                                changeCardLayout(CardLayout.ONE_BOX_RV_TWO_BOXES_LV)
                                setCurrentIcon(oneRightVTwoLeftHIcon)
                            }}
                        />
                        <CustomMenuItem
                            icon={<OneTopHorizontalBoxTwoBottomVerticalBoxes strokecolor="black" className="me-2" />}
                            body={<>One horizontal box on top, two vertical boxes on bottom</>}
                            onClick={() => {
                                changeCardLayout(CardLayout.ONE_BOX_TH_TWO_BOXES_BH)
                                setCurrentIcon(oneTopHTwoBottomVIcon)
                            }}
                        />
                        <CustomMenuItem
                            icon={<TwoTopVerticalBoxesOneBottomHorizontalBox strokecolor="black" className="me-2" />}
                            body={<>Two vertical boxes on top, one horizontal box on bottom</>}
                            onClick={() => {
                                changeCardLayout(CardLayout.ONE_BOX_BH_TWO_BOXES_TH)
                                setCurrentIcon(twoTopVOneBottomHIcon)
                            }}
                        />
                    </DropdownSubmenu>
                </Dropdown.Item>
            </>
        )
    }
}