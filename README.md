# slides

Slidev ベースのスライド置き場。
1つのリポジトリで複数の発表資料を管理し、一覧ページと deck ごとの build を回せるようにしてある。

## 構成

- `decks/<slug>/slides.md` - 各発表の本体
- `decks/index/slides.md` - deck 一覧ページ（自動生成）
- `decks/test-slide/slides.md` - 動作確認用のサンプル deck
- `public/decks/<slug>/...` - その発表専用の画像や素材
- `public/_redirects` - ローカル確認や一部静的ホスティング向けの deck 別ルーティング（自動生成）
- `components/` - 複数 deck で使い回す Vue コンポーネント
- `snippets/` - 共通で参照したいコード断片
- `scripts/slides.mjs` - deck の一覧生成・追加・起動・build をまとめるラッパー

## 使い方

### deck 一覧

```bash
npm run deck:list
```

### deck 一覧ページを再生成

```bash
npm run deck:index
```

`decks/index/slides.md` と `public/_redirects` を作り直す。
GitHub Pages 用の base prefix が必要な場合は `SLIDEV_BASE_PREFIX=<repo-name>` を付けて実行する。

### 既定 deck を起動

```bash
npm run dev
```

既定では `index` をローカル静的 preview として立ち上げる。
このとき全 deck をまとめて build して配信するので、一覧ページから各 deck へそのまま遷移できる。

- 既定ポート: `3030`
- 変更したい場合: `npm run dev -- --port 4173`

個別 deck を Slidev の開発モードで触りたい場合は、次の deck 指定起動を使う。

### deck を指定して起動

```bash
node scripts/slides.mjs dev rails-omae-datta-no-ka
```

### 既定 deck を build

```bash
npm run build
```

`index` deck を `dist/` に出す。
`SLIDEV_BASE_PREFIX=slides npm run build` のようにすると、GitHub Pages のサブパス配信でも壊れない base を付けられる。

### deck を指定して build

```bash
node scripts/slides.mjs build rails-omae-datta-no-ka
```

単体 build は `dist/<slug>/` に出る。
単体でも `SLIDEV_BASE_PREFIX=slides node scripts/slides.mjs build rails-omae-datta-no-ka` のように repo 名付き base を渡せる。

### 全 deck をまとめて build

```bash
npm run build:all
```

- `index` deck は `dist/`
- それ以外の deck は `dist/<slug>/`

に出る。公開用 build では各 deck に `/<slug>/` の base も自動で付く。

GitHub Pages 用なら次でまとめて build できる。

```bash
npm run build:pages
```

デフォルトでは `slides` を repo 名として扱う。別名 repo なら `SLIDEV_BASE_PREFIX=<repo-name> npm run build:pages` を使う。

### 新しい発表を追加

```bash
npm run deck:new -- --slug ai-agent-night --title "AI Agent Night"
```

これで以下をまとめて作る。

- `decks/<slug>/slides.md`
- `public/decks/<slug>/`
- `decks/index/slides.md` の更新

## 運用ルール

1. 発表本体は `decks/<slug>/slides.md`
2. 発表専用画像は `public/decks/<slug>/`
3. 共通化したいものだけ `components/` や `snippets/` に上げる
4. deck 追加後は `npm run deck:index` か `npm run build:all` で一覧と routing を更新する

## GitHub Pages への deploy

このリポジトリには `.github/workflows/deploy.yml` を置いてある。

1. GitHub の `Settings > Pages` で **Build and deployment** を **GitHub Actions** にする
2. `main` に push する
3. Actions が `dist/` をそのまま Pages に publish する

公開 URL は次になる。

- 一覧: `https://t0yohei.github.io/slides/`
- 例: `https://t0yohei.github.io/slides/rails-omae-datta-no-ka/`

## 現在の deck

- `index` - deck 一覧ページ
- `rails-omae-datta-no-ka` - Rails、お前だったのか。
- `test-slide` - 複数 deck 運用確認用のサンプル
