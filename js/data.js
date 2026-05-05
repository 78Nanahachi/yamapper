// ==============================
// Firebase 設定
// ==============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, doc, getDocs, getDoc, setDoc, addDoc, deleteDoc, updateDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCuueu93euKYpnZoCo32XOu_edQ3iq6MbY",
  authDomain: "yamapper-b134c.firebaseapp.com",
  projectId: "yamapper-b134c",
  storageBucket: "yamapper-b134c.firebasestorage.app",
  messagingSenderId: "780260434474",
  appId: "1:780260434474:web:f549f600db59ffa0b61953"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// アルバム一覧を取得
async function getAlbums() {
  const snap = await getDocs(query(collection(db, 'albums'), orderBy('createdAt', 'desc')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// アルバムを保存（新規）
async function saveAlbum(album) {
  return await addDoc(collection(db, 'albums'), { ...album, createdAt: Date.now() });
}

// アルバムを削除
async function deleteAlbumById(id) {
  await deleteDoc(doc(db, 'albums', id));
}

// アルバム1件を取得
async function getAlbum(id) {
  const snap = await getDoc(doc(db, 'albums', id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

// アルバムの写真リストを更新
async function savePhotos(albumId, photos) {
  await updateDoc(doc(db, 'albums', albumId), { photos });
}

// アルバム一覧をリアルタイム監視（山行日付の新しい順）
function onAlbumsChanged(callback) {
  return onSnapshot(collection(db, 'albums'), snap => {
    const albums = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    albums.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    callback(albums);
  });
}

// コメント一覧をリアルタイム監視
function onCommentsChanged(callback) {
  return onSnapshot(query(collection(db, 'comments'), orderBy('createdAt', 'asc')), snap => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}

// コメントを追加
async function addComment(name, text) {
  await addDoc(collection(db, 'comments'), {
    name, text,
    createdAt: Date.now(),
    date: new Date().toLocaleDateString('ja-JP', { year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit' })
  });
}

// コメントを削除
async function removeComment(id) {
  await deleteDoc(doc(db, 'comments', id));
}

// 写真コメントをリアルタイム監視
function onPhotoCommentsChanged(albumId, photoIndex, callback) {
  return onSnapshot(
    query(collection(db, 'albums', albumId, 'photoComments'), orderBy('createdAt', 'asc')),
    snap => {
      const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      callback(all.filter(c => c.photoIndex === photoIndex));
    }
  );
}

// 写真コメントを追加
async function addPhotoComment(albumId, photoIndex, name, text) {
  await addDoc(collection(db, 'albums', albumId, 'photoComments'), {
    photoIndex, name, text,
    createdAt: Date.now(),
    date: new Date().toLocaleDateString('ja-JP', { year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit' })
  });
}

// 写真コメントを削除
async function removePhotoComment(albumId, commentId) {
  await deleteDoc(doc(db, 'albums', albumId, 'photoComments', commentId));
}

// アルバムを更新
async function updateAlbum(id, data) {
  await updateDoc(doc(db, 'albums', id), data);
}

// 全アルバムの写真・動画コメント数を集計
async function countAllPhotoComments(albums) {
  let total = 0;
  for (const album of albums) {
    const snap = await getDocs(collection(db, 'albums', album.id, 'photoComments'));
    total += snap.size;
  }
  return total;
}

export {
  db, getAlbums, saveAlbum, deleteAlbumById, getAlbum, savePhotos, onAlbumsChanged, updateAlbum,
  onCommentsChanged, addComment, removeComment,
  onPhotoCommentsChanged, addPhotoComment, removePhotoComment,
  countAllPhotoComments
};
