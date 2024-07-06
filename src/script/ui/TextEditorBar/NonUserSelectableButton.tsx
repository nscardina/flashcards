import { Button } from "react-bootstrap";

function NonUserSelectableButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <Button 
            as="button" 
            className="user-select-none" 
            onMouseDown={event => event.preventDefault()}
            {...props} 
        />
    )
}



export default NonUserSelectableButton