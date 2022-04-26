import React from 'react';
import './Searchresults.css'
import { TrackList } from '../Tracklist/Tracklist';


export class SearchResults extends React.Component {
    render() { 
        return (
          <div className='SearchResults'>
                <h2>Results</h2>
                
                    <TrackList tracks={this.props.searchresults} onAdd={this.props.onAdd} isRemoval={false}/> 
                
          </div>    
        )
    }
}
 
