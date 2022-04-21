
const redirectUri = 'http://localhost:3000';

let accessToken = '';

const Spotify = {
    getAccessToken(){
        if(accessToken !== ''){
            return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    
        if(accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessURL;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json()
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },

    savePlaylist(playlistName, trackURIs) {
            
        if(!playlistName || !trackURIs.length){
            return;
        }

        
        const accessToken =Spotify.getAccessToken();
        
        
        let userID;

        return fetch('https://api.spotify.com/v1/me', {
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        
        }).then(response => response.json()
        ).then(jsonResponse => {
            userID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                headers:{
                    Authorization: `Bearer ${accessToken}`
                },
                method: 'POST',
                body: JSON.stringify({name: playlistName})
            })
        }).then(response => response.json()
        ).then(jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistId}/tracks`, {
                headers:{
                    Authorization: `Bearer ${accessToken}`
                },
                method: 'POST',
                body: JSON.stringify({uris: trackURIs})
            })
        })
    }
       
    
}



export default Spotify
