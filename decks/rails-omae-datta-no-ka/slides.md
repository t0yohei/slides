---
theme: seriph
title: Rails、お前だったのか。
info: |
  Cloudflare + Hono で新規開発して、Rails のレールの価値を痛感した話
class: text-center
drawings:
  persist: false
transition: slide-left
duration: 10min
mdc: true
---

<style>
:root {
  color-scheme: light;
}

#slide-content,
.slidev-layout {
  background: #fffaf5 !important;
  color: #111827 !important;
}

.slidev-layout h1,
.slidev-layout h2,
.slidev-layout h3,
.slidev-layout h4,
.slidev-layout h5,
.slidev-layout h6,
.slidev-layout p,
.slidev-layout li,
.slidev-layout div,
.slidev-layout span {
  color: #111827 !important;
}

.slidev-layout strong {
  color: #0f172a !important;
}

.slidev-layout code {
  color: #b45309 !important;
}
</style>

# Rails、お前だったのか。

いつもレールの上を走らせてくれてたのは。

<div class="text-xl opacity-80 mt-8">
Cloudflare + Hono で新規開発して、Rails のレールの価値を痛感した話
</div>

<div class="mt-14 text-lg opacity-60">
t0yohei @Gotanda.rb#66
</div>

---
layout: center
class: text-center
---

# t0yohei について

<div class="mt-8 grid grid-cols-[180px_1fr] gap-8 items-center text-left">
  <div>
    <img src="../../public/decks/rails-omae-datta-no-ka/profile.jpg" class="rounded-2xl shadow-lg border border-gray-200 w-40 h-40 object-cover mx-auto" />
  </div>
  <div class="text-xl leading-10">
    <div>- Ruby / Rails を使ったプロダクト開発が好き</div>
    <div>- 普段は Web アプリケーション開発をしている</div>
    <div>- 最近は OpenClaw にかなりハマっている</div>
    <div>- 今回は Cloudflare + Hono で新規開発してみた</div>
  </div>
</div>

<div class="mt-10 text-lg opacity-80">
Rails を外してみたからこそ、Rails のレールの価値がよく見えた
</div>

---
layout: section
---

# 今日の結論

---

# Rails のレールはとてもいい

- 軽さを求めて Rails を外した
- すると、Rails が吸収していた設計・運用コストが見えた
- 自由は増える
- でも、そのぶん自分で決めることも増える

<div class="mt-10 text-2xl font-bold text-orange-600">
結論: Rails の default は、ただのおせっかいじゃない
</div>

---

# サービス構成図

<img src="../../public/decks/rails-omae-datta-no-ka/kodatelog-architecture.svg" class="mt-6 rounded-2xl shadow-lg border border-gray-200 max-h-[32rem] w-full object-contain mx-auto" />

<div class="mt-4 text-sm opacity-75">
Pages + Workers + D1 + R2 を基本に、AI機能と監視を後ろに載せている
</div>


---
layout: two-cols
layoutClass: gap-12
---

# なぜ Hono を選んだのか

新規サービスのバックエンドを Hono で作ってみた

- Cloudflare に全部載せて「うまい・早い・安い」を味わいたかった
- 開発者は自分ひとり
- できるだけ軽い構成にしたかった
- Nest.js ほど重いものは避けたかった

<div class="mt-8 text-xl font-semibold">
なので Hono を選択
</div>

::right::

<img src="../../public/decks/rails-omae-datta-no-ka/hono_logo.png" class="mt-6 rounded-xl shadow border border-gray-200 max-h-[18rem] w-full object-contain mx-auto" />


---
layout: two-cols
layoutClass: gap-12
---

# 使ってみて気づいたこと

- Rails では自然にできていたことが、自然には起きない
- 仕組みは用意されていても、設計は自分でやる必要がある
- その差が、少人数開発ではじわじわ効いてくる

::right::

<div class="mt-18 rounded-2xl bg-orange-50 border border-orange-200 p-6 text-lg leading-8">
<div class="font-bold text-orange-700 mb-3">困ったのは Hono ではなく、Rails の標準装備がなくなったことだった</div>

<div class="mt-6 text-2xl font-bold">
Rails のレール = 運用知見のプリセット
</div>
</div>

---

# 具体例① log / masking

- Hono には logging middleware の仕組みはある
- でも、何をどう出すかは自分で決めて実装する必要がある
- Rails は default でログが出る
- `config/initializers/filter_parameter_logging.rb` で `password`, `email`, `secret` などをマスクできる
- Hono ではそこも自前実装になった

<img src="../../public/decks/rails-omae-datta-no-ka/log-masking-example.png" class="mt-6 rounded-xl shadow border border-gray-200 max-h-[18rem] w-full object-contain mx-auto" />

---

# 具体例② rollback

- Rails は rollback が便利
- ローカルでテーブル定義を試して戻すのがかなり楽
- Hono + Drizzle ORM では rollback を運用で補う必要があった
- 例: migration と一緒に rollback 用 migration も作る仕組みを用意した

<div class="mt-4 text-xl font-semibold text-orange-700">
Rails の rollback は、開発速度にかなり効果的
</div>

<img src="../../public/decks/rails-omae-datta-no-ka/rollback-example.png" class="mt-6 rounded-xl shadow border border-gray-200 max-h-[16rem] w-full object-contain mx-auto" />

---
layout: two-cols
layoutClass: gap-8
---

# 具体例③ ID 設計

- Hono では特に縛りがなかった
- なんとなく UUID を採用した
- でも、関連データを目視で追いづらくて後悔した

<div class="mt-6 text-lg font-semibold text-orange-700">
個人的には default が auto increment の方がありがたかった
</div>

::right::

<div class="pt-0 space-y-2">
  <img src="../../public/decks/rails-omae-datta-no-ka/uuid-example-2.png" class="rounded-xl shadow-lg border border-gray-200 max-h-72 w-full object-contain mx-auto" />
  <img src="../../public/decks/rails-omae-datta-no-ka/uuid-example.png" class="rounded-xl shadow-lg border border-gray-200 max-h-72 w-full object-contain mx-auto" />
  <div class="text-sm opacity-70">UUID は一意性には強いけど、目視追跡はかなりつらい</div>
</div>

---

# 具体例④ timestamp

- D1(SQLite) だったこともあり、あまり深く考えず unixtime(integer) を保存した
- でも、人間が読むにはかなりつらい
- 調査・分析・運用で日時が直感的にわからない
- integer にも利点はあるけど、個人的には datetime の default がありがたい

<div class="mt-6">
  <img src="../../public/decks/rails-omae-datta-no-ka/uuid-unixtime-example.png" class="rounded-xl shadow-lg border border-gray-200 max-h-[22rem] w-full object-contain mx-auto" />
  <div class="text-sm opacity-70 mt-2">数字としては扱いやすくても、人間には読みにくい</div>
</div>

---
layout: center
class: text-center
---

# まとめ

<div class="mt-8 text-left inline-block text-xl leading-10">
- log
- masking
- rollback
- auto increment
- datetime
</div>

<div class="mt-10 text-2xl">
こういう default が、少人数開発と運用の負担を減らしてくれていた
</div>

<div class="mt-8 text-lg opacity-80">
自由な軽量フレームワークは気持ちいい。<br>
でもその自由は、設計責任と運用責任を引き受けることでもある。
</div>

<div class="mt-10 text-3xl font-bold text-orange-600">
結論: Rails のレールはとてもいい
</div>
