// 認証チェック
function checkAuth() {
  if (sessionStorage.getItem('yamapper_auth') !== 'true') {
    window.location.href = 'index.html';
  }
}
