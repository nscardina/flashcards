import BoldButton from "./BoldButton";
import FontSelectButton from "./FontSelectButton";
import FontSizeSelectButton from "./FontSizeSelectButton";
import ItalicButton from "./ItalicButton";
import ListButton from "./ListButton";
import MoveCardBackwardsButton from "./MoveCardBackwardsButton";
import MoveCardForwardsButton from "./MoveCardForwardsButton";
import StrikethroughButton from "./StrikethroughButton";
import SubscriptButton from "./SubscriptButton";
import SuperscriptButton from "./SuperscriptButton";
import TextAlignmentButton from "./TextAlignmentButton";
import UnderlineButton from "./UnderlineButton";

export default function TextEditorBar() {

    return (
        <div className="d-flex flex-row text-editor-bar">
            <FontSelectButton />
            <FontSizeSelectButton />
            <BoldButton />
            <ItalicButton />
            <UnderlineButton />
            <StrikethroughButton />
            <SuperscriptButton />
            <SubscriptButton />
            <TextAlignmentButton />
            <ListButton />
            <MoveCardBackwardsButton />
            <MoveCardForwardsButton />
        </div>
    )
}