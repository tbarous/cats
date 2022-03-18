import Breed from "./Breed";
import Category from "./Category";

interface Image {
    id: string,
    url: string,
    sub_id: string,
    created_at:string,
    original_filename: string,
    categories: Category[]
    breeds: Breed[]
}

export default Image;