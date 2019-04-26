import { Firestore } from "./firebase";

const THEMES_COLLECTION = 'themes';

const firestore = new Firestore();

export async function getThemes(filters) {
    try {
        console.log('In the get themes service');
        const themeEntries = await firestore
            .getMany( THEMES_COLLECTION );
        console.log('Successfully got themes');
        return themeEntries;
    } catch (Exception) {
        console.log('An error occurred while getting themes');
        console.log('Exception is ', Exception);
        throw new Error('An error occurred while getting themes');
    }
}
