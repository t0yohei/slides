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
一覧から複数 deck を行き来するローカル確認は `npm run dev`、1つの deck を編集しながら詰めるときは `npm run dev -- <slug>` が向いている。

### deck を指定して起動（HMRあり）

```bash
npm run dev -- rails-omae-datta-no-ka
```

内部では `node scripts/slides.mjs dev <slug>` を呼んでいて、`index` 以外は Slidev の開発モードで起動する。
なので、**個別 deck の編集時はこちらを使えば HMR が効く**。

```bash
# 例
npm run dev -- ohayou-kara-oyasumi-made
npm run dev -- rails-omae-datta-no-ka
```

### 一覧 preview と deck HMR を同時に起動

```bash
npm run dev:pair -- ohayou-kara-oyasumi-made
```

これで次の 2 本が同時に立ち上がる。

- 一覧 preview: `http://127.0.0.1:3030`
- 指定 deck の HMR: `http://127.0.0.1:3031`

ポートを変えたい場合は次のように渡せる。

```bash
npm run dev:pair -- ohayou-kara-oyasumi-made --index-port 4173 --deck-port 4174
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

Blog No Name にも掲載する場合は、続けて次の手順で公開する。`deck:new` は公開日を自動設定しない。

1. `decks/<slug>/slides.md` の先頭の frontmatter に公開日を追加する。

   ```yaml
   published: 2026-10-16
   ```

   実際の公開日を `YYYY-MM-DD` 形式で記録し、編集時には変更しない。未設定の deck はブログに掲載されない。

2. RSS のテストと公開用ビルドを実行する。

   ```bash
   npm test
   npm run build:pages
   ```

3. 変更を `main` に push するか、PR をマージする。GitHub Actions のデプロイが成功すると、RSS が更新され、ブログにも自動で掲載される。

ブログ側の変更は不要。ブログのキャッシュには24時間の有効期間と、古い内容を返しながら再取得する最大24時間の期間があるため、公開直後には反映されない場合がある。タイトル・説明の設定や掲載対象の詳細は「[ブログ掲載用 RSS](#ブログ掲載用-rss)」を参照する。

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

## ブログ掲載用 RSS

ビルド時に `dist/feed.xml` を生成する。GitHub Pages へのデプロイ後は `https://t0yohei.github.io/slides/feed.xml` で公開され、Blog No Name のトップページに記事と並べて表示される。クリックすると公開スライドを開く。

掲載する deck の先頭の frontmatter に公開日を設定する。

```yaml
title: 発表タイトル
published: 2026-04-15
info: |
  発表の説明
```

`published` は `YYYY-MM-DD` 形式で記録し、編集時には変更しない。未設定の deck と `index`、`test-slide` は RSS に含めない。説明には `seoMeta.ogDescription`、`info`、タイトルの順で、最初に設定されている値を使う。

既存の3本には、Git 履歴で各 deck のファイルが最初に追加された日を公開日として設定した。発表日を確認できた場合は修正する。

`npm test` で RSS の掲載対象、日付順、公開 URL、XML のエスケープを検証する。

## 現在の deck

- `index` - deck 一覧ページ
- `ohayou-kara-oyasumi-made` - 「おはよう」から「おやすみ」まで
- `rails-omae-datta-no-ka` - Rails、お前だったのか。
- `test-slide` - 複数 deck 運用確認用のサンプル
