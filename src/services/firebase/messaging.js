// import { AsyncStorage } from "react-native";
// import firebase from "./firebase";

// const messaging  = function() {
//     let app = null;

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

//     async function getToken() {
//         try {
//             // TODO: add param to track last date time token was updated
//             let fcmToken = await AsyncStorage.getItem('fcmToken');
//             if (!fcmToken) {
//                 fcmToken = await app.messaging().getToken();
//                 fcmToken && await AsyncStorage.setItem('fcmToken', fcmToken);
//             }
//             return fcmToken;
//         } catch (Exception) {
//             console.log('An error occurred while getting a FCM token');
//             console.log('Exception is ', Exception);
//         }
//     }

//     async function checkPermission() {
//         try {
//             if (await app.messaging().hasPermission() ) {
//                 return getToken();
//             }
//             return await requestPermission();
//         } catch (Exception) {
//             console.log(
//                 'An error occurred while checking for FCM token permission'
//             );
//         }
//     }

//     async function requestPermission() {
//         try {
//             await app.messaging().requestPermission();
//             return getToken();
//         } catch (error) {
//             console.log('Token permission denied');
//             throw new Error('Permission denied');
//         }
//     }

//     return {
//         useApp,
//         getToken,
//         checkPermission,
//         requestPermission
//     }
// }();

// export default messaging;