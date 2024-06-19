// uploadList.js
import { firestore } from '../firebase';
import { collection, addDoc, writeBatch, doc, getDocs } from "firebase/firestore"; 

async function uploadList(data) {
  const db = firestore;
  const batch = writeBatch(db);

  data.forEach((item) => {
    const docRef = doc(collection(db, "attendeesList"));
    batch.set(docRef, item);
  });

  await batch.commit();
}

async function fetchAllRows() {
    const db = firestore;
    const querySnapshot = await getDocs(collection(db, "attendeesList"));
  
    const rows = querySnapshot.docs.map(doc => doc.data());

    console.log(rows);
  
    return rows;
  }

  async function updateRow(tracking_no, newData) {
    const db = firestore;
    const docRef = doc(db, "attendeesList", tracking_no);
    await updateDoc(docRef, newData);
  }
  
  export { uploadList, fetchAllRows, updateRow };