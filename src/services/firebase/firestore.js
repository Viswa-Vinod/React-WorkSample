import firebase from "./firebase";
// import 'firebase/firestore';

// import { firebase }  from 'services/firebase';
// import { firebaseConfiguration } from 'app/config';

// firebase.initializeApp(firebaseConfiguration);

class Firestore {
    // static firestoreInstance = null;
    // static getInstance() {
    //     if (Firestore.firestoreInstance) return Firestore.firestoreInstance;
    //     return new Firestore();
    // }
    constructor(appName = 'default', database = '') {
        try {          
                this.app = firebase.getApp(appName);
                this.db = this.app.firestore(database);
           
        } catch (Exception) {
            console.log('firebase app not found', {Exception});
        }
        this.operations = {
                    'eq': '==',
                    'gt': '>',
                    'gte': '>=',
                    'lt': '<',
                    'lte': '<=',
                    'contains': 'array-contains'
                };
    }

    async getOne(collection, key) {
        try {
            if (this.db) {
                const collectionRef = this.db.collection(collection);
                const snapshot = await collectionRef.doc(key).get();
                return snapshot.exists && snapshot.data()
                    ? snapshot.data()
                    : null;
            }
        } catch (Exception) {
            console.log('An error occurred while getting document');
            console.log('Exception is ', Exception);
            throw new Error(
                'An error occurred while getting the document'
            );
        }
    }

    async  getMany(collection, filters) {
        try {
            let collectionRef = this.db.collection(collection);
            collectionRef = this._prepareFilters(collectionRef, filters);
            const querySnapshot = await collectionRef.get();
            const data = {};
            querySnapshot.forEach( current => {
                data[current.id] = current.data();
            });
            return data;
        } catch (Error) {
            console.log(Error);
        }
    }

    _prepareFilters(collectionRef, filters) {
        for (const key in filters) {
            if (filters.hasOwnProperty(key)) {
                const { value, op = 'eq' } = filters[key];
                if (value && value !== 'any' && this.operations[op])
                    collectionRef = collectionRef.where(
                        key, this.operations[op], value
                    );
            }
        }
        return collectionRef;
    }

    async setOne(collection, key, data) {
        try {
            const collectionRef = this.db
                .collection(collection).doc(key);
            await collectionRef.set(data);
            return true;
        } catch (Exception) {
            console.log({Exception})
        }
    }
}
// const firestore = function () {
//     let app = null;
//     let db = null;

//     

//     function useApp(appName = 'default') {
//         try {
//             app = firebase.getApp(appName);
//             return this;
//         } catch (Exception) {
//             console.log('An error occurred while getting app');
//             console.log('Exception is ', Exception);
//             throw new Error('Oops! An internal error occurred');
//         }
//     }

//     function useDb(database = '') {
//         try {
//             db = app.firestore(database);
//             return this;
//         } catch (Exception) {
//             console.log('An error occurred while connecting to Firestore');
//             console.log('Exception is ', Exception);
//             throw new Error('Oops! An internal error occurred');
//         }
//     }



//     // TODO: Firestore setMany
//     async function setMany() {}

//     // TODO: Firestore updateOne
//     async function updateOne() {}

//     // TODO: Firestore updateMany
//     async function updateMany() {}

//     return {
//         useApp,
//         useDb,
//         getOne,
//         getMany,
//         setOne
//     }
// }();

// const firestore = Firestore.getInstance();
export default Firestore;