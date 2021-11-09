import { useEffect, useState, useCallback  } from 'react';
import { fetchSongs } from '../api/songsAPI';
import { addFavorite, fetchFavorites, removeFavorite } from '../api/userAPI';
import { Search } from './search';
import { SongsTable } from './songsTable';

export const Chart = (props) => {
    const [songs, setSongs] = useState();
    const [search, setSearch] = useState('');
    const [isFavoritesView, setIsFavoritesView] = useState(false);

    const handleClick = (e) => {
        setIsFavoritesView(!isFavoritesView);
    }

    const handleSearch = (e, search) => {
        e.preventDefault();
        setSearch(search);
    }

    const toggleFavorite = async (songId) => {
        if (props.user.favorites.find(fave => fave.id === songId)) {
            const {songs} = await removeFavorite(props.user.id, songId);
            const user = { ...props.user, favorites: songs };
            props.updateUser(user);
        } else {
            const {songs} = await addFavorite(props.user.id, songId);
            const user = {...props.user, favorites: songs};
            props.updateUser(user);
        }
    }

    const getFavorites = useCallback(async () => {
        const data = await fetchFavorites(props.user.id, search);
        return data.songs || data;
    }, [props.user.id, search]);

    const getBillboardSongs = useCallback(async () => {
        const { songs } = await fetchSongs(search);
        return songs;
    }, [search]);

    useEffect(() => {
        const getSongs = async () => {
            const songs = isFavoritesView ? await getFavorites() : await getBillboardSongs();
            setSongs(songs);
        }

        getSongs();
    }, [isFavoritesView, search, getBillboardSongs, getFavorites ]);

    return (
        <main>
            <header className='table_header'>
                <Search handleSearch={handleSearch}/>
                <button className='btn--end' onClick={handleClick}>{isFavoritesView ? 'Show All' : 'Show Favorites'}</button>
            </header>
            <SongsTable songs={songs} isFavoritesView={isFavoritesView} userFavorites={props.user.favorites} toggleFavorite={toggleFavorite}/>
        </main>
    );
}
