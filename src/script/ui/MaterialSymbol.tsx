import styled from "styled-components"

const MaterialSymbolStyle = styled("span").attrs({
    className: "material-symbols-outlined"
})`
width: max-content;
display: flex;
flex-direction: row;
`

const MaterialSymbol = ({ children }: { children: string}) => <MaterialSymbolStyle>{children}</MaterialSymbolStyle>

export default MaterialSymbol