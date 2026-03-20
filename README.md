# slides

Slidev ベースのスライド置き場。
1つのリポジトリで複数の発表資料を管理し、一覧ページと deck ごとの build を回せるようにしてある。

## 構成

- `decks/<slug>/slides.md` - 各発表の本体
- `decks/index/slides.md` - deck 一覧ページ（自動生成）
- `public/decks/<slug>/...` - その発表専用の画像や素材
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

`decks/index/slides.md` を作り直す。

### 既定 deck を起動

```bash
npm run dev
```

既定では `index` deck を開く。

### deck を指定して起動

```bash
node scripts/slides.mjs dev rails-omae-datta-no-ka
```

### 既定 deck を build

```bash
npm run build
```

`index` deck を `dist/` に出す。

### deck を指定して build

```bash
node scripts/slides.mjs build rails-omae-datta-no-ka
```

単体 build は `dist/` に出る。

### 全 deck をまとめて build

```bash
npm run build:all
```

- `index` deck は `dist/`
- それ以外の deck は `dist/<slug>/`

に出る。

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
4. deck 追加後は `npm run deck:index` か `npm run build:all` で一覧を更新する

## 現在の deck

- `index` - deck 一覧ページ
- `rails-omae-datta-no-ka` - Rails、お前だったのか。
