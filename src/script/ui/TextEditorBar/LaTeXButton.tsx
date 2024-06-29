import { Button } from "react-bootstrap";
import Latex from "react-latex-next";

export default function LaTeXButton() {
    return (
        <Button className="flashcard-button">
            <Latex>
                $\LaTeX$
            </Latex>
        </Button>

    )
}