interface Favorite {
    id: string,
    image_id: string,
    sub_id: string,
    created_at: string,
    image: {
        id: string,
        url: string
    },
    user_id: string
}

export default Favorite;