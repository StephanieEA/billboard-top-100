export const fetchSongs = async (search) => {
    try {
        let url = `/api/songs`;
        if (search) {
            url = `${url}?search=${search}`;
        }
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (e) {
        console.log(e);
        return e;
    }
}