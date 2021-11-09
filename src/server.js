import {
    belongsTo,
    createServer,
    hasMany,
    Model,
    Factory
} from "miragejs"
import faker from 'faker';

export function makeServer({
    environment = "test"
} = {}) {
    let server = createServer({
        environment,
        models: {
            user: Model.extend({
                favorites: hasMany()
            }),
            favorite: Model.extend({
                user: belongsTo()
            }),
            song: Model
        },
        factories: {
            song:  Factory.extend({
                id() {
                    return faker.datatype.uuid();
                },
                rank(i) {
                    return i + 1;
                },
                title() {
                    return `${faker.commerce.color()} ${faker.animal.dog()}`
                },
                artist() {
                    return `${faker.name.firstName()} ${faker.name.lastName()}`
                }, 
                album() {
                    return faker.lorem.word()
                },
                artistType() {
                    return faker.music.genre()
                }
            })
        },

        seeds(server) {
            server.createList('song', 100)
            server.create("user", {
                id: 0,
                name: "Bob",
                favorites: []
            })
            server.create("user", {
                id: 1,
                name: "Alice",
                favorites: []
            })
        },

        routes() {
            this.namespace = "api"

            this.get("users", (schema) => {
                return schema.users.all()
            })

            this.get("users/:id", (schema, request) => {
                let id = request.params.id;
                return schema.users.find(id);
            })

            this.post("/users", (schema, request) => {
                const attrs = JSON.parse(request.requestBody)
                return schema.users.create(attrs);
            })

            this.get("/users/:id/favorites", (schema, request) => {
                const userId = request.params.id;
                const search = request.queryParams.search;
                let user = schema.users.find(userId);

                if (!user) {
                    schema.users.create({
                        id: userId,
                        name: '',
                        email: '',
                        favorites: []
                    });
                    user = schema.users.find(userId);
                }

                let userFavorites = schema.songs.where(song => {
                    return user.favorites.models.find(fave => {
                        return fave.songId === song.id
                    })
                });
                if (search) {
                    const searchText = search.toLowerCase();
                    return userFavorites.models.filter(song => {
                        return song.title.toLowerCase().includes(searchText) ||
                                song.artist.toLowerCase().includes(searchText) ||
                                song.artistType.toLowerCase().includes(searchText) ||
                                song.album.toLowerCase().includes(searchText);
                        });
                }
                return userFavorites
            });

            this.patch("/users/:id/favorites", (schema, request) => {
                const userId = request.params.id;
                let user = schema.users.find(userId);
                const songId = JSON.parse(request.requestBody).songId;
                if (!user) {
                    schema.users.create({
                        id: userId,
                        name: '',
                        email: '',
                        favorites: [
                            server.create('favorite', {songId})
                        ]
                    });
                    user = schema.users.find(userId);
                } else {
                    user.favorites.add(server.create('favorite', {userId, songId}));
                }
                return schema.songs.where(song => {
                    return user.favorites.models.find(fave => {
                        return fave.songId === song.id
                    })
                })
            })

            this.patch("/users/:id/favorites/destroy", (schema, request) => {
                const userId = request.params.id;
                const { songId } = JSON.parse(request.requestBody);
                const user = schema.users.find(userId);
                const song = user.favorites.models.find(fave => fave.songId === songId);
                user.favorites.remove(song);
                user.save();
                return schema.songs.where(song => {
                    return user.favorites.models.find(fave => {
                        return fave.songId === song.id
                    })
                })
            })

            this.get("/songs", (schema, request) => {
                const search = request.queryParams.search;
                if (search) {
                    const searchText = search.toLowerCase()
                    return schema.songs.where(song =>  {
                        return song.title.toLowerCase().includes(searchText) ||
                            song.artist.toLowerCase().includes(searchText) ||
                            song.artistType.toLowerCase().includes(searchText) ||
                            song.album.toLowerCase().includes(searchText);
                    });
                }
                return schema.songs.all();
            })
        },
    })

    return server
}