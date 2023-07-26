import { Col, Container, Row } from "react-bootstrap"
import { DisplayFrontProviderFunction } from "../DisplayFrontProvider"
import { Card } from "./card"
import CardLayout from "./cardlayout"
import CardContentType, { CardContentTypeImage, CardContentTypeText, CardContentTypeVideoLink } from "./cardcontent"

function CardDisplay({card, displayFront}: {card: Card, displayFront: DisplayFrontProviderFunction}) {

    const face = displayFront() ? card.frontFace : card.backFace

    const boxes = [face.box1, face.box2, face.box3, face.box4].map(box => {
        if (box.type === CardContentType.TEXT && box.content && (box.content as CardContentTypeText).text ) {
            return <>{(box.content as CardContentTypeText).text}</>
        } else if (box.type === CardContentType.IMAGE && box.content && (box.content as CardContentTypeImage).image) {
            return <>{(box.content as CardContentTypeImage).image}</>
        } else if (box.type === CardContentType.VIDEO_LINK && box.content && (box.content as CardContentTypeVideoLink).link) {
            return <>{(box.content as CardContentTypeVideoLink).link}</>
        } else {
            return <></>
        }
    })
    
    let jsx = <></>
    switch (face.layout) {
        case CardLayout.ONE_BOX:
            jsx = (<>{boxes[0]}</>)
            break
        case CardLayout.TWO_BOXES_V:
            jsx = (<Row>
                <Col>{boxes[0]}</Col>
                <Col>{boxes[1]}</Col>
            </Row>)
            break
        case CardLayout.TWO_BOXES_H:
            jsx = (<Container className="h-100">
                <Row className="h-50">{boxes[0]}</Row>
                <Row className="h-50">{boxes[1]}</Row>
            </Container>)
            break
        case CardLayout.ONE_BOX_LV_TWO_BOXES_RV:
            jsx = (<Row className="h-100">
                <Col className="h-100">
                    {boxes[0]}
                </Col>
                <Col className="h-100 align-items-center">
                    <Container className="h-100">
                        <Row className="h-50">{boxes[1]}</Row>
                        <Row className="h-50">{boxes[2]}</Row>
                    </Container>
                </Col>
            </Row>)
            break
        case CardLayout.ONE_BOX_RV_TWO_BOXES_LV:
            jsx = (<Row className="h-100">
                <Col className="h-100 align-items-center">
                    <Container className="h-100">
                        <Row className="h-50">{boxes[0]}</Row>
                        <Row className="h-50">{boxes[1]}</Row>
                    </Container>
                </Col>
                <Col className="h-100">
                    {boxes[2]}
                </Col>
            </Row>)
            break
        case CardLayout.ONE_BOX_TH_TWO_BOXES_BH:
            jsx = (<Container className="h-100">
                <Row className="h-50">
                    {boxes[0]}
                </Row>
                <Row className="h-50">
                    <Col className="ps-0">{boxes[1]}</Col>
                    <Col className="pe-0">{boxes[2]}</Col>
                </Row>
            </Container>)
            break
        case CardLayout.ONE_BOX_BH_TWO_BOXES_TH:
            jsx = (<Container className="h-100">
                <Row className="h-50">
                    <Col className="ps-0">{boxes[0]}</Col>
                    <Col className="pe-0">{boxes[1]}</Col>
                </Row>
                <Row className="h-50">
                    {boxes[2]}
                </Row>
            </Container>)
            break
        case CardLayout.FOUR_BOXES:
            jsx = (<div className="h-100">
                <Row className="h-50">
                    <Col>{boxes[0]}</Col>
                    <Col>{boxes[1]}</Col>
                </Row>
                <Row className="h-50">
                    <Col>{boxes[2]}</Col>
                    <Col>{boxes[3]}</Col>
                </Row>
            </div>)
            break
    }

    return (
        <div className="flashcard-display">
            {jsx}
        </div>
    )

}

export default CardDisplay