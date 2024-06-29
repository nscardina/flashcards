import { HTMLAttributes, SVGAttributes, useContext, useMemo, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { DropdownSubmenu } from "react-bootstrap-submenu";
import "react-bootstrap-submenu/dist/index.css";
import CustomMenuItem from "../CustomMenuItem";
import { AppState } from "../../../App";
import CardLayout from "../../../card/cardlayout";
import { AppStateType } from "../../../state/AppState";
import { Side } from "../../../card/side";

function changeCardLayout(state: AppStateType, layout: CardLayout): void {
    if (state.deck !== null && state.deck.cards.length > 0) {
        const updatedCard = (state.visibleSide === Side.FRONT) ? {
            front: {
                ...state.deck.cards[state.visibleCardIndex].front,
                layout: layout
            },
            back: state.deck.cards[state.visibleCardIndex].back,
        } : {
            front: state.deck.cards[state.visibleCardIndex].front,
            back: {
                ...state.deck.cards[state.visibleCardIndex].back,
                layout: layout
            }
        }

        state.setDeck({
            name: state.deck.name,
            cards: [
                ...state.deck.cards.slice(0, state.visibleCardIndex),
                updatedCard,
                ...state.deck.cards.slice(state.visibleCardIndex + 1)
            ]
        })

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

const OneBoxIcon = (props: HTMLAttributes<SVGElement> & { strokeColor: string }) => (
    <CommonSVGElement {...props}>
        <CommonRectElement
            x="10"
            y="10"
            width="80"
            height="80"
            stroke={props.strokeColor}
        />
    </CommonSVGElement>
)

const TwoVerticalBoxesIcon = (props: HTMLAttributes<SVGElement> & { strokeColor: string }) => (
    <CommonSVGElement {...props}>
        <CommonRectElement x="10" y="10" width="35" height="80" stroke={props.strokeColor} />
        <CommonRectElement x="55" y="10" width="35" height="80" stroke={props.strokeColor} />
    </CommonSVGElement>
)

const TwoHorizontalBoxesIcon = (props: HTMLAttributes<SVGElement> & { strokeColor: string }) => (
    <CommonSVGElement {...props}>
        <CommonRectElement x="10" y="10" width="80" height="35" stroke={props.strokeColor} />
        <CommonRectElement x="10" y="55" width="80" height="35" stroke={props.strokeColor} />
    </CommonSVGElement>
)

const FourBoxesIcon = (props: HTMLAttributes<SVGElement> & { strokeColor: string }) => (
    <CommonSVGElement {...props}>
        <CommonRectElement x="10" y="10" width="35" height="35" stroke={props.strokeColor} />
        <CommonRectElement x="10" y="55" width="35" height="35" stroke={props.strokeColor} />
        <CommonRectElement x="55" y="10" width="35" height="35" stroke={props.strokeColor} />
        <CommonRectElement x="55" y="55" width="35" height="35" stroke={props.strokeColor} />
    </CommonSVGElement>
)

const OneLeftVerticalBoxTwoRightHorizontalBoxes = (props: HTMLAttributes<SVGElement> & { strokeColor: string }) => (
    <CommonSVGElement {...props}>
        <CommonRectElement x="10" y="10" width="35" height="80" stroke={props.strokeColor} />
        <CommonRectElement x="55" y="10" width="35" height="35" stroke={props.strokeColor} />
        <CommonRectElement x="55" y="55" width="35" height="35" stroke={props.strokeColor} />
    </CommonSVGElement>
)

const OneRightVerticalBoxTwoLeftHorizontalBoxes = (props: HTMLAttributes<SVGElement> & { strokeColor: string }) => (
    <CommonSVGElement {...props}>
        <CommonRectElement x="55" y="10" width="35" height="80" stroke={props.strokeColor} />
        <CommonRectElement x="10" y="10" width="35" height="35" stroke={props.strokeColor} />
        <CommonRectElement x="10" y="55" width="35" height="35" stroke={props.strokeColor} />
    </CommonSVGElement>
)

const OneTopHorizontalBoxTwoBottomVerticalBoxes = (props: HTMLAttributes<SVGElement> & { strokeColor: string }) => (
    <CommonSVGElement {...props}>
        <CommonRectElement x="10" y="10" width="80" height="35" stroke={props.strokeColor} />
        <CommonRectElement x="10" y="55" width="35" height="35" stroke={props.strokeColor} />
        <CommonRectElement x="55" y="55" width="35" height="35" stroke={props.strokeColor} />
    </CommonSVGElement>
)

const TwoTopVerticalBoxesOneBottomHorizontalBox = (props: HTMLAttributes<SVGElement> & { strokeColor: string }) => (
    <CommonSVGElement {...props}>
        <CommonRectElement x="10" y="55" width="80" height="35" stroke={props.strokeColor} />
        <CommonRectElement x="10" y="10" width="35" height="35" stroke={props.strokeColor} />
        <CommonRectElement x="55" y="10" width="35" height="35" stroke={props.strokeColor} />
    </CommonSVGElement>
)

export default function LayoutToggleButton() {

    const oneBoxIcon = <OneBoxIcon strokeColor="black" className="ms-2 mt-1" />
    const twoVerticalBoxesIcon = <TwoVerticalBoxesIcon strokeColor="black" className="ms-2 mt-1" />
    const twoHorizontalBoxesIcon = <TwoHorizontalBoxesIcon strokeColor="black" className="ms-2 mt-1" />
    const fourBoxesIcon = <FourBoxesIcon strokeColor="black" className="ms-2 mt-1" />
    const oneLeftVTwoRightHIcon = <OneLeftVerticalBoxTwoRightHorizontalBoxes strokeColor="black" className="ms-2 mt-1" />
    const oneRightVTwoLeftHIcon = <OneRightVerticalBoxTwoLeftHorizontalBoxes strokeColor="black" className="ms-2 mt-1" />
    const oneTopHTwoBottomVIcon = <OneTopHorizontalBoxTwoBottomVerticalBoxes strokeColor="black" className="ms-2 mt-1" />
    const twoTopVOneBottomHIcon = <TwoTopVerticalBoxesOneBottomHorizontalBox strokeColor="black" className="ms-2 mt-1" />

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

    const appState = useContext(AppState)
    const [currentIcon, setCurrentIcon] = useState<JSX.Element>(mapLayout(appState?.deck?.cards[appState?.visibleCardIndex][appState?.visibleSide]?.layout))

    return (
        <>
            <Dropdown.Item as="button" style={{ margin: "0px", padding: "0px", display: "flex", flexDirection: "row", }}>
                {currentIcon}
                <DropdownSubmenu as="button" title="Card Layout">
                    <CustomMenuItem
                        style={{ display: "flex", flexDirection: "row" }}
                        icon={<OneBoxIcon strokeColor="black" className="me-2" />}
                        body={<>One Box</>}
                        onClick={() => {
                            changeCardLayout(appState, CardLayout.ONE_BOX)
                            setCurrentIcon(oneBoxIcon)
                        }}
                    />
                    <CustomMenuItem
                        icon={<TwoVerticalBoxesIcon strokeColor="black" className="me-2" />}
                        body={<>Two Vertical Boxes</>}
                        onClick={() => {
                            changeCardLayout(appState, CardLayout.TWO_BOXES_V)
                            setCurrentIcon(twoVerticalBoxesIcon)
                        }}
                    />
                    <CustomMenuItem
                        icon={<TwoHorizontalBoxesIcon strokeColor="black" className="me-2" />}
                        body={<>Two Horizontal Boxes</>}
                        onClick={() => {
                            changeCardLayout(appState, CardLayout.TWO_BOXES_H)
                            setCurrentIcon(twoHorizontalBoxesIcon)
                        }}
                    />
                    <CustomMenuItem
                        icon={<FourBoxesIcon strokeColor="black" className="me-2" />}
                        body={<>Four Boxes</>}
                        onClick={() => {
                            changeCardLayout(appState, CardLayout.FOUR_BOXES)
                            setCurrentIcon(fourBoxesIcon)
                        }}
                    />
                    <CustomMenuItem
                        icon={<OneLeftVerticalBoxTwoRightHorizontalBoxes strokeColor="black" className="me-2" />}
                        body={<>One vertical box on left, two horizontal boxes on right</>}
                        onClick={() => {
                            changeCardLayout(appState, CardLayout.ONE_BOX_LV_TWO_BOXES_RV)
                            setCurrentIcon(oneLeftVTwoRightHIcon)
                        }}
                    />
                    <CustomMenuItem
                        icon={<OneRightVerticalBoxTwoLeftHorizontalBoxes strokeColor="black" className="me-2" />}
                        body={<>One vertical box on right, two horizontal boxes on left</>}
                        onClick={() => {
                            changeCardLayout(appState, CardLayout.ONE_BOX_RV_TWO_BOXES_LV)
                            setCurrentIcon(oneRightVTwoLeftHIcon)
                        }}
                    />
                    <CustomMenuItem
                        icon={<OneTopHorizontalBoxTwoBottomVerticalBoxes strokeColor="black" className="me-2" />}
                        body={<>One horizontal box on top, two vertical boxes on bottom</>}
                        onClick={() => {
                            changeCardLayout(appState, CardLayout.ONE_BOX_TH_TWO_BOXES_BH)
                            setCurrentIcon(oneTopHTwoBottomVIcon)
                        }}
                    />
                    <CustomMenuItem
                        icon={<TwoTopVerticalBoxesOneBottomHorizontalBox strokeColor="black" className="me-2" />}
                        body={<>Two vertical boxes on top, one horizontal box on bottom</>}
                        onClick={() => {
                            changeCardLayout(appState, CardLayout.ONE_BOX_BH_TWO_BOXES_TH)
                            setCurrentIcon(twoTopVOneBottomHIcon)
                        }}
                    />
                </DropdownSubmenu>
            </Dropdown.Item>
        </>
    )
}