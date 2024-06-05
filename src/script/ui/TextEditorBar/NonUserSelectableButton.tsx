import { Button } from "react-bootstrap";
import styled from "styled-components";

const NonUserSelectableButton = styled(Button)`
    user-select: none;
`

export default NonUserSelectableButton