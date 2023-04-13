import { createCart } from "./cart"
import { createRating } from "./rating";
import { v4 as uuidv4 } from 'uuid';

export const auth = async () => {
    const userId = localStorage.getItem('hiragana');
    if (!userId) {
        const uuid = uuidv4()
        localStorage.setItem('hiragana', uuid);
        await createRating();
        await createCart(uuid);
    }
}