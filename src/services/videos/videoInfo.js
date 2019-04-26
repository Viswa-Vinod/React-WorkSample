import { Firestore } from "../firebase/";

const VIDEOS_COLLECTION = 'videos';

const firestore = new Firestore();

export async function getVideos(filters) {
    try {
        const videoEntries = await firestore
            .getMany(
                VIDEOS_COLLECTION,
                {
                    metadata: {
                        op: 'contains', value: filters ? _prepareFilters(filters) : ''
                    }
                }
            );
        return videoEntries;
    } catch (Exception) {
        console.log('An error occurred while getting videos');
        console.log('Exception is ', Exception);
        throw new Error('An error occurred while getting videos');
    }
}

/**
 * Method to setup the filters required for getting videos for a category.
 * The filters are stored in the below format in Firestore.
 *
 * {language}_{type}_{categories}
 *
 * @param category
 * @param language
 * @param type
 * @returns {string}
 * @private
 */
function _prepareFilters({ category, language, type}) {
    const metadataFilter = [];
    // NOTE - do not change the ordering of the below if conditions
    // avoiding language = any, as it's the same as not applying a filter
    if (language && language !== 'any') {
        metadataFilter.push(language.toLowerCase());
    }
    // avoiding type = any, as it's the same as not applying a filter
    if (type && type !== 'any') {
        metadataFilter.push(type.toLowerCase());
    }
    // avoiding category = any, as it's the same as not applying a filter
    if (category && category !== 'any') {
        /**
         * Categories are stored as a comma separated string, hence
         * we will split it on the comma, convert each to lower case
         * and then push to the metadataFilter array.
         */
        const categories = category
            .split(',')
            .map((value) => value.toLowerCase());
        metadataFilter.push(...categories);
    }
    // join the filters by underscore and return
    return metadataFilter.join('_');
}