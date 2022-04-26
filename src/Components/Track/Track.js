import React from "react";
import './Track.css';




export class Track extends React.Component {
    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        
    }
    
    renderAction(){
        if(this.props.isRemoval){
            return <button className="Track-action" onClick={this.removeTrack}>-</button>
        } else {
            return <button className="Track-action" onClick={this.addTrack}>+</button>
        }
    }

    addTrack(){
        this.props.onAdd(this.props.track);
    }

    removeTrack(){
        this.props.onRemove(this.props.track);
    }

    renderAudio(){
        
        if(this.props.preview){
            return( 
                <audio controls="controls" className="audioPreview">
                    <source src={this.props.preview} type="audio/mp4"/>
               </audio>
            )
        } else {
            return <h5 style={{"margin-top": "5px",
                                color: "red",
                               
                              }}
                    >No audio preview available</h5>
        }   
    }

    render(){
        

        return (
            <div className='Track'>
                <div className='Track-information'>
                    <h3>{this.props.track.name} | {this.props.track.artist}</h3>
                    {this.renderAudio()}
                </div>    
                {this.renderAction()}
            </div>
        )
    }
  
    
}