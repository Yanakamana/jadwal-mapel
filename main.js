import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBm9HdJ92vSLrKRclI6Z2J4bmvlFgR4AuU",
  authDomain: "mang-yana.firebaseapp.com",
  projectId: "mang-yana",
  storageBucket: "mang-yana.appspot.com",
  messagingSenderId: "1094982396668",
  appId: "1:1094982396668:web:2d103526ab40a59efc0579",
  measurementId: "G-MF48P7VG5P"
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarmapel() {
  const refDokumen = collection(db, "jadwal-mapel");
  const kueri = query(refDokumen, orderBy("mapel"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      hari: dok.data().hari,
      waktu: dok.data().waktu,
      kelas: dok.data().kelas,
      mapel: dok.data().mapel,
      gurumapel:dok.data().gurumapel
    });
  });


  return hasil
}

//export function formatAngka(x) {
//return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".");
  
  export async function tambahjadwalmapel(hari, waktu, kelas, mapel, gurumapel) {
  try {
    const dokRef = await addDoc(collection(db, 'jadwal-mapel'), {
      hari: hari,
      waktu: waktu,
      kelas: kelas,
      mapel: mapel,
     gurumapel:gurumapel
    });
    console.log('berhasil menembah jadwal ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah jadwal' + e);
  }
}

//fungsi untuk hapus data
export async function hapusmapel(docId) {
  await deleteDoc(doc(db, "jadwal-mapel", docId));
}
//fungsi untuk ubah data
export async function ubahdaftarmapel(docId, hari, waktu, kelas, mapel, gurumapel) {
  await updateDoc(doc(db, "jadwal-mapel", docId), {
    hari: hari,
    waktu: waktu,
    kelas: kelas,
    mapel: mapel,
    gurumapel: gurumapel
  });
}
//fungsi untuk ambil data dan untuk diubah
export async function ambildaftarmapel(docId) {
  const docRef = await doc(db, "jadwal-mapel", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}