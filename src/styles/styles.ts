import styled from "styled-components"


export const Main = styled.main`
    background-color: green;
    width: 100%;
    display: flex;
    flex-direction: column;

    h1 {
    margin-top: 20px;
    border-bottom: 2px solid yellow;
    color: #ffffff;
    text-align: center;
    padding-block: 10px;
    }
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    gap: 6px;
    max-width: 100%;

    h2 {
    color: #ffffff;
    font-size: 15px;
    font-weight: 300;
    }
`
export const Input = styled.input`
    width: 230px;
    height: 20px;
`

export const Button = styled.button`
    width: 55px;
    height: 25px;
    cursor: pointer;
`

export const Label = styled.label`
    max-width: 200px;
    color: #ffffff;
    align-self: self-start;
`