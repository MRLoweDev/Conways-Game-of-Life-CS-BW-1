import React from 'react'


export default function TopBar(props){
    return(
        <div>
            <p>
                Generation: {props.currentGeneration}
            </p>
        </div>
    )
}

// const TopBar = styled.div`
// font-color: white;

// `