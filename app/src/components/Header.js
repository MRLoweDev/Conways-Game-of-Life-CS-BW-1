import React from 'react'
import styled from 'styled-components'

export default function Header() {
    return (
        <HeaderWrapper>
            <h1> Conway Game of Life</h1>
            <a href="#">About</a>

        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.div`
    background-color: green;
    display: flex;
    align-items: center;
    height: 50px;
    text-align: center;
    text-size: 40px;
    justify-content: center;
    margin-bottom:1rem;
    padding:0.2rem;
    opacity:0.8
` 