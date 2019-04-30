import { Firestore } from "./firebase";

const SCHOOLS_COLLECTION = 'schools';

const firestore = new Firestore();

export async function getSchools(filters) {
    try {
        const schoolEntries = await firestore
            .getMany( SCHOOLS_COLLECTION );
        return schoolEntries;
    } catch (Exception) {
        console.log('An error occurred while getting schools');
        console.log('Exception is ', Exception);
        throw new Error('An error occurred while getting schools');
    }
}

export async function updateSchool (schoolObj, _themes) {
    console.log({schoolObj});
    if ((Object.entries(schoolObj).length === 0 && schoolObj.constructor === Object) ||
    (Object.entries(_themes).length === 0 && _themes.constructor === Object)) return;
    try {
    const data = { 
                    ...schoolObj, 
                    themes: schoolObj.themes
                                .map(theme => Object.entries(_themes)
                                            .reduce((acc, _themeEntry) => {
                                                if (_themeEntry[1].name === theme) {
                                                    acc = _themeEntry[0];
                                                } 
                                                return acc;
                                            }, {}))}
    delete data.id
    console.log({data});
    
        const isSchoolUpdated = await firestore.setOne('schools', schoolObj.id, data );
        console.log({ isSchoolUpdated })
    } catch (Exception) {
        console.log({Exception});
    }
}
