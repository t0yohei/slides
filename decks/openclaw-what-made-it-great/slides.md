---
theme: seriph
title: OpenClaw は何が偉大だったのか
info: |
  人々の想像力を爆発させた、パーソナルAIアシスタント
class: text-center
drawings:
  persist: false
transition: slide-left
duration: 10min
mdc: true
routerMode: hash
seoMeta:
  ogTitle: OpenClaw は何が偉大だったのか
  ogDescription: 人々の想像力を爆発させた、パーソナルAIアシスタント
  ogImage: https://t0yohei.github.io/slides/decks/openclaw-what-made-it-great/ogp.png
  twitterCard: summary_large_image
  twitterTitle: OpenClaw は何が偉大だったのか
  twitterDescription: 人々の想像力を爆発させた、パーソナルAIアシスタント
  twitterImage: https://t0yohei.github.io/slides/decks/openclaw-what-made-it-great/ogp.png
---

<style>
:root {
  color-scheme: light;
}

html,
body,
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
.slidev-layout span,
.slidev-layout blockquote {
  color: #111827 !important;
}

.slidev-layout h1 {
  font-size: 2.5rem !important;
  line-height: 1.2 !important;
}

.title-only {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
}

.title-only h1 {
  margin: 0;
}

.slidev-layout strong {
  color: #0f172a !important;
}

.slidev-layout code {
  color: #b45309 !important;
}

.slidev-layout a {
  color: #c2410c !important;
  text-decoration-color: rgba(194, 65, 12, 0.35) !important;
}
</style>

# OpenClaw は何が偉大だったのか

<div class="mt-8 text-2xl opacity-80">~ Re: OpenClaw と始める AI 生活 ~</div>
<div class="mt-14 text-lg opacity-60">t0yohei @ 五反田AI vol.2</div>

---
layout: center
class: text-center
---

# t0yohei について

<div class="mt-8 grid grid-cols-[180px_1fr] gap-8 items-center text-left">
  <div>
    <img src="../../public/decks/openclaw-what-made-it-great/profile.png" class="rounded-2xl shadow-lg border border-gray-200 w-40 h-40 object-cover mx-auto" />
  </div>
  <div class="text-xl leading-10">
    <div>- Web アプリ開発のフリーランスエンジニア</div>
    <div>- 最近は OpenClaw と遊ぶのが趣味</div>
  </div>
</div>

---
layout: center
class: text-center
---

<img src="../../public/decks/openclaw-what-made-it-great/openclaw-logo.png" class="mt-8 w-full max-h-[16rem] object-contain mx-auto" />

---
layout: center
class: text-center
---

# Star 数がついに linux, React を超えた

<img src="../../public/decks/openclaw-what-made-it-great/stars.png" class="mt-6 rounded-2xl shadow-lg border border-gray-200 max-h-[24rem] w-full object-contain mx-auto" />

<div class="mt-4 w-full text-right text-sm opacity-55">
  Source: https://x.com/openclaw/status/2028347703621464481?s=20
</div>

---
layout: center
class: text-center
---

<div class="title-only">
  <h1>OpenClaw は何が偉大だったのか</h1>
</div>

---
layout: center
class: text-center
---

<div class="title-only">
  <h1>人々の想像力を爆発させた</h1>
</div>

---
layout: center
class: text-center
---

<div class="title-only">
  <h1>🤯</h1>
</div>

---
layout: center
class: text-center
---

# OpenClaw とは

<img src="../../public/decks/openclaw-what-made-it-great/what-is-openclaw.png" class="mt-6 rounded-2xl shadow-lg border border-gray-200 max-h-[18rem] w-full object-contain mx-auto" />

<div class="mt-8 text-left text-lg leading-8">
<div class="font-bold text-xl">OpenClaw は、普段使いのチャネルにやってくる、自分専用のパーソナルAIアシスタントです。</div>
<div class="mt-4">Slack、Discord、Line など、いつもの場所を通してあなたに応答します。</div>
</div>

---
layout: center
layoutClass: gap-10
---

# パーソナルAIアシスタント

<ul class="mt-10 mx-auto max-w-2xl text-left text-2xl leading-[3.2rem] list-disc pl-8">
  <li>自分専用</li>
  <li>自分の環境で動く</li>
  <li>自分の日常に入り込める</li>
</ul>

---
layout: two-cols-header
---

# 他の AI Agent とはどう違うか

::left::

### Claude Code などの AI Agent

<br>

- 動く場所: 基本的に個人の PC 上
- 利用者: 個人
- 役割: 個人に依存する日々のタスク支援
- ex) Codex, Claude Code, Claude Cowork

<img src="../../public/decks/openclaw-what-made-it-great/claude-code-agent.png" class="mt-4 rounded-xl shadow border border-gray-200 max-h-[11rem] w-full object-contain mx-auto" />

::right::

### Agent SDK などで作る AI Agent

<br>

- 動く場所: クラウドや物理のサーバー上
- 利用者: 複数人
- 役割: 個人に依存しない汎用タスクを支援
- ex) ChatGPT, Grok, Devin

<img src="../../public/decks/openclaw-what-made-it-great/agent-sdk.png" class="mt-4 rounded-xl shadow border border-gray-200 max-h-[11rem] w-full object-contain mx-auto" />

---
layout: center
class: text-center
---

# OpenClaw の立ち位置は？

<div class="mt-10 grid grid-cols-[1.2fr_0.8fr] gap-10 items-center text-left">
  <ul class="text-2xl leading-[3.2rem] list-disc pl-8">
    <li>動く場所: Mac mini や VPS など</li>
    <li>利用者: 基本的には個人</li>
    <li>役割: 個人の日々の営みを支援する</li>
  </ul>
  <img src="../../public/decks/openclaw-what-made-it-great/positioning.png" class="rounded-2xl shadow-lg border border-gray-200 max-h-[17rem] w-full object-contain mx-auto" />
</div>

---
layout: default
---

<div class="title-only">
  <h1>OpenClaw は何が特別だったのか</h1>
</div>

---
layout: default
class: text-center
---

# OpenClaw がやったこと

<div class="mt-12 max-w-4xl mx-auto text-center text-2xl leading-[3rem]">

  <div class="mt-10">
    <div><b>「わたし専用の AI Agent」</b> という概念と体験を与えた</div>
    <div class="mt-6"><b>「あなたはこれを使って何をしますか？」</b> という問いを与えた</div>
  </div>
</div>

<div class="mt-16 text-4xl font-bold leading-[3.6rem] text-center text-orange-700">
  そして、人々の想像力が爆発した
</div>

---
layout: center
class: text-center
---

# どういうことか

<div class="mt-16 text-3xl opacity-85">体験の設計を分解してみる</div>

---
layout: center
class: text-center
---

# 名前を与えることから始まる Onboarding

<div class="mt-10 text-2xl leading-12 opacity-90">
Onboarding の瞬間から、<br>
あなたの相棒・パートナー・アシスタントという体験が始まる
</div>

---
layout: center
class: text-center
---

# 普段使いのチャネルへの接続

<ul class="mt-10 inline-block text-left text-2xl leading-12 list-disc pl-6">
  <li>Slack、Discord、Line などへの接続</li>
  <li>より馴染み深い存在へ</li>
</ul>

<div class="mt-8 flex justify-center gap-6">
  <img src="../../public/decks/openclaw-what-made-it-great/slack.png" class="w-20 h-20 object-contain" />
  <img src="../../public/decks/openclaw-what-made-it-great/discord.png" class="w-20 h-20 object-contain" />
  <img src="../../public/decks/openclaw-what-made-it-great/line.png" class="w-20 h-20 object-contain" />
</div>

---
layout: center
class: text-center
---

# 豊富な公式 integration, plugin, skill

<ul class="mt-10 inline-block text-left text-2xl leading-12 list-disc pl-6">
  <li>Brave, Ollama, 1Password, GitHub, Notion, Peekaboo, etc...</li>
  <li>より有能なアシスタントへ</li>
</ul>


---
layout: two-cols-header
---

# 記憶システムと人格維持

::left::

### 記憶システム

<br>

- 短期記憶としての session
- 中期記憶としての daily memory
- 長期記憶としての MEMORY.md
- built in の記憶検索システム

::right::

### 人格維持

<br>

- 毎回の応答時に、必要なコンテキストをプロンプトへ組み込んでいる
- OpenClaw 固有のルールや情報は system prompt 側へ載せる
- User 固有の記憶や設定は user prompt や memory 側へ載せる

---
layout: center
class: text-center
---

# カスタマイズ性と危険なホスト実行

<div class="max-w-4xl mx-auto mt-10 text-center">
  <div class="text-2xl leading-12 opacity-90">OpenClaw をホスト実行で動かしたら、なんでもできちゃう。</div>
  <div class="mt-8 text-3xl leading-12 font-semibold">なんでもできちゃうってことは、なんでもできる。</div>
  <div class="mt-10 text-xl opacity-80">大いなる力には、大いなる責任が伴う</div>
</div>

<img src="../../public/decks/openclaw-what-made-it-great/dangerous-local-execution.png" class="mt-8 rounded-xl shadow border border-gray-200 max-h-[11rem] object-contain mx-auto" />


---
layout: center
class: text-center
---

# 私の OpenClaw

<div class="mt-6 text-2xl opacity-85">赤髪の女の子</div>
<img src="../../public/decks/openclaw-what-made-it-great/my-openclaw.png" class="mt-8 rounded-xl shadow-lg border border-gray-200 max-h-[11rem] w-full object-contain mx-auto" />

---
layout: default
---

# 与えているもの

- Mac mini (メモリ 24GB, SSD 512GB)
- ChatGPT Pro のサブスク
- Google Account, GitHub Account, etc...

<div class="mt-6 flex justify-center">
  <img src="../../public/decks/openclaw-what-made-it-great/chatgpt-pro.png" class="rounded-xl shadow border border-gray-200 max-h-[8rem] w-full max-w-[24rem] object-contain mx-auto" />
</div>

---
layout: default
---

# 私の使い方

- 個人開発のコーディング
- 経費精算関連のタスク
- ブログ・登壇資料作成
- etc...

<div class="mt-6 flex justify-center">
  <img src="../../public/decks/openclaw-what-made-it-great/personal-dev-coding.png" class="rounded-xl shadow border border-gray-200 max-h-[8rem] w-full max-w-[24rem] object-contain mx-auto" />
</div>

<div class="mt-8 text-2xl font-bold text-orange-700">
「わたし専用の AI Agent」でやりたいと思ったことを片っ端からやりたい
</div>

---
layout: two-cols-header
layoutClass: gap-10
---

# 具体例

::left::

<div class="space-y-6 text-left text-xl leading-9">
  <div>
    <div class="font-bold">「おはよう」から「おやすみ」まで</div>
    <div class="opacity-80">Home IoT と接続して生活に入り込ませる</div>
  </div>

  <img src="../../public/decks/ohayou-kara-oyasumi-made/ogp.png" class="mt-8 rounded-2xl shadow-lg border border-gray-200 max-h-[18rem] w-full object-contain mx-auto" />

</div>

::right::

<div class="space-y-6 text-left text-xl leading-9">
  <div>
    <div class="font-bold">PNG Tuber</div>
    <div class="opacity-80">常時起動な雑談相手</div>
  </div>

<img src="../../public/decks/openclaw-what-made-it-great/png_tuber.jpg" class="mt-8 rounded-2xl shadow-lg border border-gray-200 max-h-[18rem] w-full object-contain mx-auto" />

</div>

---
layout: center
class: text-center
---

# 他の人はどう使ってる？

<div class="mt-6 grid grid-cols-1 gap-4">
  <img src="../../public/decks/openclaw-what-made-it-great/community-uses.png" class="rounded-2xl shadow-lg border border-gray-200 max-h-[10rem] w-full object-contain mx-auto" />
  <div class="grid grid-cols-2 gap-4">
    <img src="../../public/decks/openclaw-what-made-it-great/aicu-note.png" class="rounded-xl shadow border border-gray-200 max-h-[8rem] w-full object-contain mx-auto" />
    <img src="../../public/decks/openclaw-what-made-it-great/robot.png" class="rounded-xl shadow border border-gray-200 max-h-[8rem] w-full object-contain mx-auto" />
  </div>
</div>

<div class="mt-6 text-xl leading-10 opacity-85">
正解は1つじゃない。
それぞれが自分の相棒の育て方を試している。
</div>

<div class="mt-4 w-full text-right text-sm opacity-55">
  Source: https://note.com/aicu/n/ncc85d368f574
</div>

---
layout: section
---

<div class="title-only">
  <h1>まとめ</h1>
</div>

---
layout: center
class: text-center
---

# OpenClaw は何が偉大だったのか

<div class="mt-10 text-2xl leading-12 opacity-90">
「わたし専用の AI Agent」という概念と体験を人々に与えた。<br>
その上で「あなたはこれを使って何をしますか？」という問いを人々に与えた。<br>
そして想像力を爆発させた。
</div>

---
layout: center
class: text-center
---

# あなたも OpenClaw 使って遊んでみませんか？ 🦞

<div class="mt-10 text-xl opacity-80">ご感想や、速度改善のアイデアもお待ちしています</div>
<div class="mt-8 text-lg opacity-65">https://x.com/t0yohei</div>
<img src="../../public/decks/openclaw-what-made-it-great/qr.png" class="mt-8 rounded-2xl shadow-lg border border-gray-200 max-h-[12rem] object-contain mx-auto" />
