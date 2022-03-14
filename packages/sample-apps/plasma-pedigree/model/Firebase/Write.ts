import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import 'firebase/compat/firestore';
type DocumentData = firebase.firestore.DocumentData;

//
// Firebase WRITE API
//

/** Clears out all user data from the database (but only the /users node, not any references to that user) */
export async function clearUserData(userID: string): Promise<any> {
    var paths: { [key: string]: any } = {};
    paths["users/" + userID] = null;
    return firebase.database().ref().update(paths);
}

/** 
 * TODO: Param documentation
 * Updates the given user with the given data. If you want to delete a property, add it to data with a value of null. 
 * This should be used if you only want to update certain properties and leave everything else the same.
*/
export async function updateUserData(userID: string, userData: any, demographics: any): Promise<any> {  
    // Add each property individually so we don't overwrite any data...
    const paths: { [key: string]: any } = {};
    
    // users/{userID}/[...]...
    Object.keys(userData).forEach(function(dataKey: string) {
        paths["users/" + userID + "/" + dataKey] = userData[dataKey];
    });
    
    // users/{userID}/demographics/[...]...
    Object.keys(demographics).forEach(function(dataKey: string) {
      paths["users/" + userID + "/demographics/" + dataKey] = demographics[dataKey];
    });

    // Perform the update...
    return firebase.database().ref().update(paths);
}

/**
 * Submits the given feedback for the current user
 * @param feedback Feedback from user
 */
export async function submitFeedback(feedback: string): Promise<firebase.firestore.DocumentReference<DocumentData>> {
    const today = new Date();
    const currentDate = today.getTime();
    const sCurrentDate = today.toLocaleDateString() + " " + today.toLocaleTimeString();
    const currentUser = firebase.auth().currentUser;
    const currentUID = (currentUser) ? currentUser.uid : "";
    const email = (currentUser) ? currentUser.email : "";

    return firebase.firestore().collection("feedback").add({
        date: currentDate,
        sDate: sCurrentDate,
        user: currentUID,
        email: email,
        feedback: feedback
    });
}