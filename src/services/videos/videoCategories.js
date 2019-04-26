import { firestore } from "../firebase/";

const APP_NAME = 'default';
const DB = '';

export async function getVideoCategories() {
    try {
        const categories = await firestore.useApp(APP_NAME)
            .useDb(DB)
            .getOne('layouts', 'home');
        return categories;
    } catch (Exception) {
        console.log('An error occurred while getting video categories');
        console.log('Exception is ', Exception);
        throw new Error(
            'An error occurred while getting video categories'
        );
    }
}