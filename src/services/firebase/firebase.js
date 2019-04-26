import firebase from "firebase";
import { firebaseConfiguration } from 'app/config';


class FirebaseManager {
    static Instance = null;

    constructor() {
        this.apps = {};
    }

    static getInstance() {
        if (!FirebaseManager.Instance)
            FirebaseManager.Instance = new FirebaseManager();

        return FirebaseManager.Instance;
    }

    initializeApp(configurations) {
        console.log('initializing app',configurations);
        try {
            configurations.forEach(({appName, configuration}) => {
                if (!this.apps[ appName ]) {
                    this.apps[ appName ] =
                        firebase.initializeApp(configuration, appName);
                }
            })
            
        } catch (Exception) {
            throw new Error('Server error' );
        }
    }

    getApp(appName = 'default') {
        
            if (this.apps[ appName ])
                return this.apps[ appName ];
                throw new Error('Firebase app not found!');
        

    }
}

const FirebaseInstance = FirebaseManager.getInstance();
FirebaseInstance.initializeApp(firebaseConfiguration);
export default FirebaseInstance;