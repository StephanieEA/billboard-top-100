import { SongRow } from './songRow';
import { Loader } from './Loader';
import { NoData } from './noData';

export const SongsTable = ({songs, isFavoritesView, userFavorites, toggleFavorite}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Album</th>
                    <th>Artist Type</th>
                    <th>Favorites</th>
                </tr>
            </thead>
            <tbody>
                {songs ?
                    songs.length !== 0 ? 
                        songs.map(song => {
                            const isUserFavorite = userFavorites.find(fave => fave.id === song.id);
                            return (
                                <SongRow
                                    show={!isFavoritesView ? true : isUserFavorite}
                                    song={song}
                                    key={song.id}
                                    toggleFavorite={() => toggleFavorite(song.id)}
                                    isFavorite={isUserFavorite}
                                />
                            )
                        }) : 
                        <NoData /> :
                    <Loader />}
            </tbody>
        </table>
    )
}