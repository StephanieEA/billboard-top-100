import { useState } from 'react';

export const Search = ({handleSearch}) => {
    const [search, setSearch] = useState('');

    const handleChange = e => setSearch(e.target.value);

    const handleClear = (e) => {
        setSearch('');
        handleSearch(e, '')
    };

    return (
        <form onSubmit={e => handleSearch(e, search)}>
            <input type='text' placeholder='Artist, song, or type' value={search} onChange={handleChange} />
            {search && <button className='btn--clear' onClick={handleClear}>x</button>}
            <button>Search</button>
        </form>
    )
}