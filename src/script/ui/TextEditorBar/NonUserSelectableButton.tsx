import { useContext } from "react";
import { Button } from "react-bootstrap";
import { AppState } from "../../App";

function NonUserSelectableButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {

    const appState = useContext(AppState);

    return (
        <Button 
            disabled={appState.deck === null}
            as="button" 
            className="user-select-none" 
            onMouseDown={event => event.preventDefault()}
            {...props} 
        />
    )
}



export default NonUserSelectableButton