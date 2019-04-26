import { Firestore } from "./firebase";

const THEMES_COLLECTION = 'themes';

const firestore = new Firestore();

export async function getThemes(filters) {
    try {
        const themeEntries = await firestore
            .getMany( THEMES_COLLECTION );
        return themeEntries;
    } catch (Exception) {
        console.log('An error occurred while getting themes');
        console.log('Exception is ', Exception);
        throw new Error('An error occurred while getting themes');
    }
}
