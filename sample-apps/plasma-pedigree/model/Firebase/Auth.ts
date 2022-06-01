import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
type UserCredential = firebase.auth.UserCredential;
import * as Firebase from "../Firebase";

//
// Firebase User Auth API
//

// Returns true if the current user is the test/admin user...
export function isTestAdminUser(): boolean {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) { return false; }
    return (currentUser.uid === "M2RpZFsJ7AaWwKM4DLapMKRJlh13");
}

/** Signs current user out */
export function signOut(): Promise<void> {
    return firebase.auth().signOut();
}

/** Signs user in with email and password */
export function signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
}

/** Signs user in with anonymous credentials (aka as a Guest) */
export function signInAnonymously(): Promise<UserCredential> {
    return firebase.auth().signInAnonymously();
}

/** Sends a password reset email */
export function sendPasswordResetEmail(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
}

/** Creates a user with the given email/password. If sendEmailVerification = true, will send an email verification email */
export function createUserWithEmailAndPassword(email: string, password: string, sendEmailVerification: boolean, usersData: any, userDemographics: any): Promise<void> {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((userCred: UserCredential) => {
        const user: firebase.User | null = userCred.user;
        if (!user) { return; }

        // Update other user data...
        const p = Firebase.Write.updateUserData(user.uid, usersData, userDemographics);
        if (!sendEmailVerification) { return p; }

        // Send the email verification...
        return p.then(() => { return user.sendEmailVerification(); });
    });
}

/** Creates a user with the given email/password. Converts their account if they logged in as a guest  */
export function createUserFromAnonymousAccount(email: string, password: string, sendEmailVerification: boolean): Promise<void> {
    const currentUser = firebase.auth().currentUser;
    const isAnonymous = (currentUser && currentUser.isAnonymous);

    // If not anonymous or no current user, just create an account the normal way...
    if (!isAnonymous || !currentUser) { return createUserWithEmailAndPassword(email, password, sendEmailVerification, {}, {}); }

    // Otherwise, convert the data...
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return currentUser.linkWithCredential(credential).then((userData: firebase.auth.UserCredential) => {
        const user: firebase.User | null = userData.user;
        if (!user) { return; }

        var p = Firebase.Write.updateUserData(user.uid, {}, { email: email });     // ERM: TODO:
        if (!sendEmailVerification) { return p; }

        // Send the email verification...
        return p.then(() => { return user.sendEmailVerification(); });
    });      
}

/** Deletes the currently logged in user (if there is one) */
export function deleteCurrentUser(): Promise<void> {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) { return Promise.reject("There is no current user"); }

    return currentUser.delete().then(function() {
        return Firebase.Write.clearUserData(currentUser.uid);
    });
}

/** Changes the current user's email address */
export function changeCurrentUserEmail(currentPassword: string, newEmail: string): Promise<void> {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) { return Promise.resolve(); }

    return reauthenticateCurrentUser(currentPassword).then(function() {
        return currentUser.updateEmail(newEmail).then(function() {
            return Firebase.Write.updateUserData(currentUser.uid, {}, { email: newEmail });
        });
    });
}

/** Changes the current user's password */
export function changeCurrentUserPassword(currentPassword: string, newPassword: string): Promise<void> {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) { return Promise.resolve(); }

    return reauthenticateCurrentUser(currentPassword).then(() => {
        return currentUser.updatePassword(newPassword).then(() => {
            return firebase.database().ref()
                .child("users")
                .child(currentUser.uid)
                .update({ "pw": newPassword });
        });
    });
}

/** Returns true if a user is logged in */
export function isUserLoggedIn(): boolean {
    return !!(firebase.auth().currentUser);
}

/** Returns the currentUser */
export function getCurrentUser(): firebase.User | null {
    return firebase.auth().currentUser;
}

/** Returns the current user's UID (or null if there isn't one) */
export function getCurrentUserID(): string | null {
    const currentUser = firebase.auth().currentUser;
    return (currentUser) ? currentUser.uid : null;
}

    // Returns true if the current user is authenticated via email/password...
    export function isCurrentUserPasswordAuthenticated(): boolean {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) { return false; }

    const providerData = currentUser.providerData;
    if (!providerData) { return false; }

    for (let i = 0; i < providerData.length; i++) {
        const userInfo = providerData[i];
        if (userInfo && userInfo.providerId === "password") {
            return true;
        }
    }

    return false;
}

/** Returns true if current user is authenticated anonymously (aka a Guest) */
export function isCurrentUserAnonymouslyAuthenticated(): boolean {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) { return false; }
    
    return currentUser.isAnonymous;
}

/** Reauthenticates current user (only works if password-authenticated) */
function reauthenticateCurrentUser(password: string): Promise<firebase.auth.UserCredential> {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) { return Promise.reject("No current user"); }
    if (!currentUser.email) { return Promise.reject("Current user does not have an email"); }

    const credential = firebase.auth.EmailAuthProvider.credential(currentUser.email, password);
    return currentUser.reauthenticateWithCredential(credential);
}