export const SongRow = (props) => {
    const {rank, title, artist, album, artistType} = props.song;
    if (!props.show) {
        return null;
    }
    return (
        <tr>
            <td>{rank}</td>
            <td>{title}</td>
            <td>{artist}</td>
            <td>{album}</td>
            <td>{artistType}</td>
            <td>
                <button onClick={props.toggleFavorite}>{props.isFavorite ? 'Unfavorite' : 'Favorite'}</button>
            </td>
        </tr>
    )
}