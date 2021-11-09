export const fetchUser = async (userId) => {
    try {
        const response = await fetch(`/api/users/${userId}`);
        const json = await response.json();
        return json;
    } catch (e) {
        console.log(e);
        return e;
    }
}

export const fetchFavorites = async (userId, search) => {
    console.log('id', userId)
        try {
        const response = await fetch(`/api/users/${userId}/favorites?search=${search}`);
        const json = await response.json();
        return json;
    } catch (e) {
        console.log(e);
        return e;
    }
}

export const addUser = async (userId) => {
    try {
        const response = await fetch(`/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId}),
        });
        const json = await response.json();
        return json;
    } catch (e) {
        console.log(e);
        return e;
    }
}

export const addFavorite = async (userId, songId) => {
    try {
        const response = await fetch(`/api/users/${userId}/favorites`, {
            method: 'PATCH',
            body: JSON.stringify({ songId }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    const json = await response.json();
    console.log(json.message)
    return json;

    } catch (e) {
        console.log(e);
        return e;
    }
}

export const removeFavorite = async (userId, songId) => {
    try {
        const response = await fetch(`/api/users/${userId}/favorites/destroy`, {
            method: 'PATCH',
            body: JSON.stringify({ songId }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
    });
    const json = await response.json();
    return json;

    } catch (e) {
        console.log(e);
        return e;
    }
}