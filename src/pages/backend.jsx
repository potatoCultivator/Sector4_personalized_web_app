// uploadList.js
import { firestore } from '../firebase';
import { collection, addDoc, writeBatch, doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore"; 

async function uploadList(data, docName) {
  const db = firestore;
  const batch = writeBatch(db);

  data.forEach((item) => {
    const docRef = doc(collection(db, docName));
    batch.set(docRef, item);
  });

  await batch.commit();
}

async function fetchAllRows(docName) {
  const db = firestore;
  const querySnapshot = await getDocs(collection(db, docName));
  
  const rows = querySnapshot.docs.map(doc => ({
    id: doc.id, // Include the document ID
    ...doc.data() // Spread the document data
  }));

  // console.log(rows);

  return rows;
}

async function updateRow(tracking_no, newData, docName) {
  const db = firestore;
  const docRef = doc(db, docName, tracking_no);

  await updateDoc(docRef, newData);
}

async function deleteRow(tracking_no, docName) {
  const db = firestore;
  const docRef = doc(db, docName, tracking_no);
  await deleteDoc(docRef);
}

async function uploadRow(data, docName) {
  const db = firestore;
  // Check if docName is 'membersList', exclude 'id' from data if true
  const { id, ...dataWithoutId } = data;
  const payload = docName === 'attendeesList' ? dataWithoutId : data;
  
  await addDoc(collection(db, docName), payload);
}

async function countRows() {
  const db = firestore;
  const querySnapshot = await getDocs(collection(db, "attendeesList"));
  return querySnapshot.docs.length; // Returns the count of documents in the collection
}

async function registerUser(data) {
  const db = firestore;
  await addDoc(collection(db, "usersList"), data);
}

async function fertchAllAccounts() {
  const db = firestore;
  const querySnapshot = await getDocs(collection(db, "usersList"));

  const users = querySnapshot.docs.map(doc => ({
    id: doc.id, // Include the document ID
    ...doc.data() // Spread the document data
  }));

  return users;
}

async function saveAccountLoggingIn(data, docName) {
  const db = firestore;
  await addDoc(collection(db, docName), data);
}



async function deleteAccountLoggingIn(data, docName) {
  const db = firestore;
  await deleteDoc(doc(db, docName, data.id));
}

export { 
  uploadList, 
  fetchAllRows, 
  updateRow, 
  deleteRow, 
  uploadRow, 
  countRows,
  registerUser,
  fertchAllAccounts
};
  