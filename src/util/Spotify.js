<<<<<<< HEAD
const clientId = '012f2dbae619428c88ca6c065e34ce1d';
const redirectURI = 'http://localhost:3000';
=======
const clientId = //enter your own id.
const redirectUri = 'http://localhost:3000';
>>>>>>> 7fb11f7b583fc66e231042e77e08e33e04859e29

let accessToken;
let expiresIn;

const Spotify = {
    getAccessToken() {
		if(accessToken) {
			return accessToken;
		} else if (window.location.href.match(/access_token=([^&]*)/) != null){
			accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
			expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
		} else {
			window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
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
                uri: track.uri,
                preview: track.preview_url
            }));
        });
    },

    savePlaylist(playlistName, trackURIs) {
        
         if(!playlistName || !trackURIs.length){
            return;
        }

        const accessToken = Spotify.getAccessToken();
        console.log(`playlistName: ${playlistName}`, `track URI's: ${trackURIs}`, `access Token: ${accessToken}`) 
        
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
