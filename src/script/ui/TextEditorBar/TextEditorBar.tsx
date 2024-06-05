import BoldButton from "./BoldButton";
import FontSelectButton from "./FontSelectButton";
import FontSizeSelectButton from "./FontSizeSelectButton";
import ItalicButton from "./ItalicButton";
import LaTeXButton from "./LaTeXButton";
import ListButton from "./ListButton";
import StrikethroughButton from "./StrikethroughButton";
import SubscriptButton from "./SubscriptButton";
import SuperscriptButton from "./SuperscriptButton";
import TextAlignmentButton from "./TextAlignmentButton";
import UnderlineButton from "./UnderlineButton";

export default function TextEditorBar() {


    return (
        <div className="d-flex flex-row">
            <FontSelectButton currentFont={"Roboto"}/>
            <FontSizeSelectButton />
            <BoldButton />
            <ItalicButton />
            <UnderlineButton />
            <StrikethroughButton />
            <SuperscriptButton />
            <SubscriptButton />
            <TextAlignmentButton />
            <ListButton />
            <LaTeXButton />
        </div>
    )
}