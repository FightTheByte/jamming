import React from 'react';
import { TrackList } from '../Tracklist/Tracklist';
import './Playlist.css';

export class Playlist extends React.Component {
    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    
    render() { 
        return (
            <div className='Playlist'>
                <input 
                    defaultValue={'New'} 
                    onChange={this.handleNameChange}
                />
                <TrackList 
                    tracks={this.props.playlistTracks} 
                    isRemoval={true} onRemove={this.props.onRemove}
                />
                <button 
                    className='Playlist-save' 
                    onClick={this.props.onSave}
                >
                    SAVE TO SPOTIFY
                </button>
            </div>
        );
    }

    handleNameChange(e){
        this.props.onNameChange(e.target.value);
    }
}
 
