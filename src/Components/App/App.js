import React from 'react';
import './App.css';
import {Searchbar} from '../Searchbar/Searchbar.js';
import {Playlist} from '../Playlist/Playlist.js';
import {SearchResults} from '../Searchresults/Searchresults.js';
import Spotify from '../../util/Spotify.js';



export class App extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            searchResults: [],
            playlistName: '',
            playlistTracks: []
        };
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }
    
    addTrack(track){ 
        if(this.state.playlistTracks.find(searchTrack => searchTrack.id === track.id)){
            return;
        }
        let playlist = this.state.playlistTracks;
        playlist.push(track);
        this.setState({playlistTracks: playlist});
    }

    removeTrack(track){
       let tracks = this.state.playlistTracks;
       tracks = tracks.filter(song => song.id !== track.id);
       this.setState({playlistTracks: tracks});
    }

    updatePlaylistName(name){
        this.setState({playlistName: name});
    }

    savePlaylist(){
        const trackURIs = this.state.playlistTracks.map(track => track.uri);
        Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
            this.setState({
            playlistName: 'New playlist',
            playlistTracks: []
        })})
    }

    search(term){
        Spotify.search(term).then(searchResults => {
            this.setState({searchResults: searchResults})
        })
    }
    
    render(){
       Spotify.getAccessToken()
       return (
           
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                <Searchbar 
                    onSearch={this.search}
                />
                    <div className="App-playlist">
                    <SearchResults 
                        searchresults={this.state.searchResults} 
                        onAdd={this.addTrack}
                    />
                    <Playlist 
                        playlistName={this.state.playlistName} 
                        onNameChange={this.updatePlaylistName} 
                        playlistTracks={this.state.playlistTracks} 
                        onRemove={this.removeTrack} 
                        onSave={this.savePlaylist}
                    />
                    </div>
                </div>
                
            </div>
        )
    }

    



}