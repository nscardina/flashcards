import { Button } from "react-bootstrap";

function NonUserSelectableButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <Button as="button" className="user-select-none" {...props} />
    )
}



export default NonUserSelectableButton