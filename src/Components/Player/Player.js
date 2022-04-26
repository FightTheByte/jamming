import React from 'react';
import './Player.css';

export class Player extends React.Component{
   
    render(){
        return(
            <div className='audio'>
                
                <audio controls>
                    <source src={this.props.source}/>
                </audio>

            </div>
        )
    }
}