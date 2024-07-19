import { Button } from "react-bootstrap";
import { useFCState } from "../../state/FCState";
import { useShallow } from "zustand/react/shallow";

function NonUserSelectableButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {

    const deck = useFCState(useShallow(state => state.deck));

    return (
        <Button 
            disabled={deck === null}
            as="button" 
            className="user-select-none" 
            onMouseDown={event => event.preventDefault()}
            {...props} 
        />
    )
}



export default NonUserSelectableButton