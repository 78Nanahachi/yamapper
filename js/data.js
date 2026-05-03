// データ管理 - localStorage使用

const ALBUMS_KEY = 'yamapper_albums';
const COMMENTS_KEY = 'yamapper_comments';

function getAlbums() {
  try {
    return JSON.parse(localStorage.getItem(ALBUMS_KEY)) || [];
  } catch { return []; }
}

function saveAlbums(albums) {
  localStorage.setItem(ALBUMS_KEY, JSON.stringify(albums));
}

function getComments() {
  try {
    return JSON.parse(localStorage.getItem(COMMENTS_KEY)) || [];
  } catch { return []; }
}

function saveComments(comments) {
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
}
