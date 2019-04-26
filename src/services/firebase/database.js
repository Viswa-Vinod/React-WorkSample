import firebase from "./firebase";

const database = function () {
    let app = null;
    let db = null;

    function useApp(appName = 'default') {
        try {
            app = firebase.getApp(appName);
            return this;
        } catch (Exception) {
            console.log('An error occurred while getting app');
            console.log('Exception is ', Exception);
            throw new Error('Oops! An internal error occurred');
        }
    }

    function useDb(database = '') {
        try {
            db = app.database(database);
            return this;
        } catch (Exception) {
            console.log('An error occurred while connecting to Realtime DB');
            console.log('Exception is ', Exception);
            throw new Error('Oops! An internal error occurred');
        }
    }

    async function get(ref) {
        try {
            console.log('Getting data from ', ref);
            const snapshot = await db.ref(ref)
                .once('value');
            return snapshot.exists() ? snapshot.val() : null;
        } catch (Exception) {
            console.log('An error occurred while getting data');
            console.log('Exception is ', Exception);
            throw new Error('An error while getting data');
        }
    }

    async function push(ref, data) {
        try {
            console.log(`Pushing ${data} to ${ref}`);
            await db.ref(ref)
                .push(data);
            console.log('Successfully pushed data');
        } catch (Exception) {
            console.log('An error occurred while pushing data');
            console.log('Exception is ', Exception);
            throw new Error(
                'An error occurred while saving the data'
            );
        }
    }

    async function set(ref, data) {
        try {
            console.log(`Setting ${ data } at ${ ref }`);
            await db.ref(ref)
                .set(data);
        } catch (Exception) {
            console.log('An error occurred while saving the data');
            console.log('Exception is ', Exception);
            throw new Error(
                'An error occurred while saving the data'
            );
        }
    }

    async function update(ref, data) {
        try {
            console.log(`Updating ${ data } at ${ ref }`);
            await db.ref(ref)
                .update(data);
        } catch (Exception) {
            console.log('An error occurred while updating the data');
            console.log('Exception is ', Exception);
            throw new Error(
                'An error occurred while saving the data'
            );
        }
    }

    async function search(ref, filter) {
        try {
            console.log('Searching the db ', ref);
            console.log('Search term is ', filter.searchTerm);
            const snapshot = await db.ref(ref)
                .orderByChild(filter.orderBy)
                .equalTo(filter.searchTerm)
                .once('value');
            return (
                snapshot.exists()
                    ? snapshot.val()
                    : null
            );
        } catch (Exception) {
            console.log('An error occurred while searching the database');
            console.log('Exception is ', Exception);
            throw new Error('An error occurred while searching the database');
        }
    }

    async function reset(ref, filter, currentData, newData) {
        try {
            console.log('Resetting data at ', ref);
            console.log();
            return await db.ref(ref)
                .orderByChild(filter.orderBy)
                .equalTo(filter.searchTerm)
                .on('value', (snapshot) => {
                    snapshot.forEach(async (childSnapshot) => {
                        await childSnapshot.ref.set({
                            ...currentData, newData
                        });
                    });
                });
        } catch (Exception) {
            console.log('An error occurred while resetting');
            console.log('Exception is ', Exception);
            throw new Error('An error occurred while resetting');
        }
    }

    return {
        useApp,
        useDb,
        get,
        push,
        set,
        update,
        search,
        reset
    }
}();

export default database;