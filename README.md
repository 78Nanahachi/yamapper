# ⛰️ やまっぺ - 山登りホームページ

山行の記録・写真アルバム・コメントが楽しめるプライベートホームページです。

## 📁 ファイル構成

```
yamapper/
├── index.html          # ログインページ（トップ）
├── home.html           # ホーム（ダッシュボード）
├── albums.html         # アルバム一覧
├── album-detail.html   # アルバム詳細（写真表示）
├── comments.html       # コメントページ
├── css/
│   └── style.css       # スタイルシート
└── js/
    ├── auth.js          # 認証チェック
    └── data.js          # データ管理（localStorage）
```

## 🚀 GitHub Pages への公開手順

### 1. GitHubリポジトリを作成

1. [GitHub](https://github.com) にログイン
2. 右上の「+」→「New repository」
3. Repository name: `yamapper`（または好きな名前）
4. **Public** を選択（GitHub Pages の無料利用のため）
5. 「Create repository」をクリック

### 2. ファイルをアップロード

**方法A：ブラウザからアップロード（簡単）**
1. 作成したリポジトリページで「uploading an existing file」をクリック
2. すべてのファイル・フォルダをドラッグ＆ドロップ
3. 「Commit changes」をクリック

**方法B：Git コマンドで（推奨）**
```bash
cd yamapper
git init
git add .
git commit -m "初回コミット：やまっぺ"
git remote add origin https://github.com/あなたのユーザー名/yamapper.git
git push -u origin main
```

### 3. GitHub Pages を有効にする

1. リポジトリの「Settings」タブをクリック
2. 左メニューの「Pages」をクリック
3. Source: **Deploy from a branch**
4. Branch: **main** / **/ (root)** を選択
5. 「Save」をクリック

### 4. サイト公開！

数分後に以下のURLでアクセス可能になります：
```
https://あなたのユーザー名.github.io/yamapper/
```

## 🔑 パスワードの変更

`index.html` の以下の行を編集してください：

```javascript
const SITE_PASSWORD = "yamapper123";
// ↑ ここを好きなパスワードに変更
```

## 💡 使い方

| 機能 | 説明 |
|------|------|
| **ログイン** | パスワードを入力してサイトにアクセス |
| **アルバム追加** | 「＋ 新しいアルバムを追加」から山行情報を入力 |
| **写真追加** | アルバム詳細ページで「📷 写真を追加」から画像ファイルを選択 |
| **コメント投稿** | コメントページから名前とメッセージを入力して投稿 |

## ⚠️ 注意

- データ（アルバム・写真・コメント）はブラウザの **localStorage** に保存されます
- ブラウザのデータを削除するとデータも消えます
- 写真はBase64形式で保存されるため、大量の写真はlocalStorageの容量制限（約5MB）に注意
- パスワードはソースコードに平文で記載されています。個人利用のサイトとして使用してください
