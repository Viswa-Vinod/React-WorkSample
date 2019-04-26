import { firestore } from "../firebase/";

const APP_NAME = 'default';
const DB = '';

export async function getVideoCategories() {
    try {
        console.log('In the get categories service');
        const categories = await firestore.useApp(APP_NAME)
            .useDb(DB)
            .getOne('layouts', 'home');
        console.log('Successfully got categories', categories);
        return categories;
    } catch (Exception) {
        console.log('An error occurred while getting video categories');
        console.log('Exception is ', Exception);
        throw new Error(
            'An error occurred while getting video categories'
        );
    }
}