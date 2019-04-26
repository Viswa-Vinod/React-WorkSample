import firebase from "./firebase";

const auth = (function () {
    let auth = null;

    function useApp(appName = 'default') {
        auth = firebase.getApp(appName).auth();
        return this;
    }

    async function signInWithEmail(email, password) {
        try {
            console.log(
                'In the sign in with email/password auth service'
            );
            const { user } =
                await auth.signInWithEmailAndPassword(email, password);
            console.log('Successfully signed up user');
            console.log('Firebase user details are ', user);
            return user;
        } catch (Exception) {
            console.log('An error occurred during Sign Up');
            console.log('Error is ', Exception);
            throw new Error(
                _signInWithEmailErrorHandler(Exception)
            );
        }
    }

    function _signInWithEmailErrorHandler(Exception) {
        let errorMessage = '';
        switch(Exception.code) {
            case 'auth/network-request-failed':
                errorMessage =
                    'The network appears to be slow. Please try again later';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Please check your email or password';
                break;
            case 'auth/user-not-found':
                errorMessage = 'Please check your email address and try again';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Please check your email or password';
                break;
            default:
                errorMessage =
                    'Something went wrong while processing your login. Please try again';
                break;
        }
        return errorMessage;
    }

    async function signInWithPhone(phoneNumber) {
        try {
            console.log('In the sign in with phone auth service');
            const confirmationResult = await auth.signInWithPhoneNumber(phoneNumber);
            console.log('Requested for OTP');
            return confirmationResult;
        } catch (Exception) {
            console.log('An error occurred while Signing In with Phone');
            console.log('Error is ', Exception);
            throw new Error(
                _signInWithPhoneErrorHandler(Exception)
            );
        }
    }

    function _signInWithPhoneErrorHandler(Exception) {
        let errorMessage = '';
        switch (Exception.code) {
            case 'auth/network-request-failed':
                errorMessage = 'The network appears to be slow. Please try again later';
                break;
            case 'auth/invalid-phone-number':
                errorMessage = 'Please check your phone number and try again';
                break;
            default:
                errorMessage =
                    'Something went wrong while processing your login. Please try again';
                break;
        }
        return errorMessage;
    }

    async function signUp(email, password) {
        try {
            console.log('In the sign up auth service');
            const { user } =
                await auth.createUserWithEmailAndPassword(email, password);
            console.log('Successfully signed up user');
            console.log('Firebase user details are ', user);
            return user;
        } catch (Exception) {
            console.log('An error occurred during Sign Up');
            console.log('Error is ', Exception);
            throw new Error(
                _signUpErrorHandler(Exception)
            );
        }
    }

    function _signUpErrorHandler(Exception) {
        let errorMessage = '';
        switch (Exception.code) {
            case 'auth/email-already-in-use':
                errorMessage =
                    'An account with this email id already exists. Please login';
                break;
            default:
                errorMessage =
                    'Something went wrong while processing your sign up. Please try again';
                break;
        }
        return errorMessage;
    }

    async function forgotPassword(email) {
        try {
            console.log('In the forgot password auth service');
            return await auth.sendPasswordResetEmail(email);
        } catch (Exception) {
            console.log('An error occurred while sending password reset email');
            console.log('Error is ', Exception);
            throw new Error(
                _forgotPasswordErrorHandler(Exception)
            );
        }
    }

    function _forgotPasswordErrorHandler(Exception) {
        let errorMessage = '';
        switch (Exception.code) {
            case 'auth/invalid-email':
                errorMessage = 'Invalid email address provided';
                break;
            default:
                errorMessage =
                    'An error occurred while sending password reset email';
                break;
        }
        return errorMessage;
    }

    function onAuthStateChanged(handler) {
        return auth.onAuthStateChanged(handler);
    }

    return {
        onAuthStateChanged,
        useApp,
        forgotPassword,
        signInWithEmail,
        signInWithPhone,
        signUp
    };
}) ();

export default auth;