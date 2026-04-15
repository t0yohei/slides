---
theme: seriph
title: OpenClaw と始める AI 生活
info: |
  OpenClaw は何が偉大だったのか
class: text-center
drawings:
  persist: false
transition: slide-left
duration: 10min
mdc: true
routerMode: hash
seoMeta:
  ogTitle: OpenClaw と始める AI 生活
  ogDescription: OpenClaw は何が偉大だったのか
  twitterCard: summary_large_image
  twitterTitle: OpenClaw と始める AI 生活
  twitterDescription: OpenClaw は何が偉大だったのか
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

# Re: OpenClaw と始める AI 生活

<div class="mt-8 text-2xl opacity-80">~ OpenClaw は何が偉大だったのか ~</div>
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

---
layout: center
class: text-center
---

# OpenClaw は何が偉大だったのか

---
layout: center
class: text-center
---

<div class="mt-10 text-2xl leading-12 font-semibold opacity-90">
OpenClaw が与えたのは、単なる便利ツールではなく、<br>
「自分専用の相棒を持てるかもしれない」という感覚
</div>

---
layout: center
class: text-center
---

# OpenClaw とは

<img src="../../public/decks/openclaw-what-made-it-great/what-is-openclaw.png" class="mt-6 rounded-2xl shadow-lg border border-gray-200 max-h-[18rem] w-full object-contain mx-auto" />

<div class="mt-8 text-left text-lg leading-8">
<div class="font-bold text-xl">OpenClaw は、自分のデバイス上で実行できるパーソナルAIアシスタントです。</div>
<div class="mt-4">Slack、Discord、Line など普段使っているチャネルを通してあなたに応答します。</div>
<div class="mt-2">ローカルで動作し、高速で、常に利用可能なあなただけのパーソナルアシスタント。</div>
</div>

---
layout: two-cols
layoutClass: gap-10
---

# 要はパーソナルAIアシスタント

<div class="mt-6 text-left text-xl leading-10">
<div>- 自分専用</div>
<div>- 自分の環境で動く</div>
<div>- 自分の日常に入り込める</div>
</div>

---
layout: two-cols
layoutClass: gap-10
---

# 他の AI Agent とはどう違うか

### Claude Code などの AI Agent

- 動く場所: 基本的に個人の PC 上
- 利用者: 個人
- 役割: 個人に依存する coding や日々のタスクの支援・遂行
- ex) Codex, Claude Code, Claude Cowork

<img src="../../public/decks/openclaw-what-made-it-great/claude-code-agent.png" class="mt-4 rounded-xl shadow border border-gray-200 max-h-[11rem] w-full object-contain mx-auto" />

::right::

### Claude Agent SDK などで作る AI Agent

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

<div class="mt-10 text-left inline-block text-2xl leading-12">
<div>- 動く場所: Mac mini やクラウド上のサーバーなど</div>
<div>- 利用者: 基本的には個人</div>
<div>- 役割: 個人の日々の営みを支援する</div>
</div>

<img src="../../public/decks/openclaw-what-made-it-great/positioning.png" class="mt-8 rounded-2xl shadow-lg border border-gray-200 max-h-[14rem] w-full object-contain mx-auto" />

---
layout: center
class: text-center
---

# OpenClaw じゃなくて Claude Code で良くね？

<div class="mt-10 text-3xl font-bold text-orange-700">半分 Yes</div>
<div class="mt-8 text-xl leading-10 opacity-85">
Claude Agent SDK を Mac mini などに入れて、<br>
個人用にカスタムしまくれば OpenClaw みたいになる
</div>

---
layout: default
---

# OpenClaw は何が特別だったのか

---
layout: default
---

<div class="mt-8 text-xl leading-10">
<div class="font-bold">OpenClaw がやったこと</div>
<div class="mt-4">「わたし専用の AI Agent」という概念と体験を人々に与えた</div>
<div class="mt-4">その上で「あなたはこれを使って何をしますか？」という問いを人々に与えた</div>
<div class="mt-4 text-2xl font-bold text-orange-700">だから、想像力が爆発した</div>
</div>

---
layout: center
class: text-center
---

# どういうことか

<div class="mt-10 text-2xl opacity-85">体験の設計を分解してみる</div>

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

<div class="mt-10 text-left inline-block text-2xl leading-12">
<div>- Slack、Discord、Line などへの接続</div>
<div>- より馴染み深い存在へ</div>
</div>

<div class="mt-8 flex justify-center gap-6">
  <img src="../../public/decks/openclaw-what-made-it-great/slack.png" class="w-20 h-20 object-contain" />
  <img src="../../public/decks/openclaw-what-made-it-great/discord.png" class="w-20 h-20 object-contain" />
  <img src="../../public/decks/openclaw-what-made-it-great/line.png" class="w-20 h-20 object-contain" />
</div>

---
layout: default
---

# 豊富な integration, plugin, skill, heartbeat

- Brave, Ollama, 1password, github, notion, openhue, peekaboo, etc...
- より有能なアシスタントへ

---
layout: default
---

# 記憶システム

- 短期記憶としての session
- 中期記憶としての daily memory
- 長期記憶としての MEMORY.md
- built in の記憶検索システム

---
layout: default
---

# カスタマイズ性と危険なローカル実行

- skill, plugin, cron, hook, tool, ACP
- 「自分専用」に育てる余地が大きい
- でも、ローカル実行で動かしたらなんでもできちゃう

<div class="mt-6 text-xl font-semibold">大いなる力には、大いなる責任が伴う</div>
<img src="../../public/decks/openclaw-what-made-it-great/dangerous-local-execution.png" class="mt-6 rounded-xl shadow border border-gray-200 max-h-[11rem] object-contain mx-auto" />

---
layout: center
class: text-center
---

# それで何をやるのかは、わたしの・あなたの想像力次第

<div class="mt-8 text-2xl leading-12 opacity-90">
OpenClaw をローカル実行で動かしたら、なんでもできちゃう。
</div>
<div class="mt-8 text-2xl leading-12 font-semibold">
なんでもできるってことは、なんでもできちゃう。
</div>
<div class="mt-8 text-xl opacity-80">大いなる力には、大いなる責任が伴う</div>
<img src="../../public/decks/openclaw-what-made-it-great/dangerous-local-execution.png" class="mt-6 rounded-xl shadow border border-gray-200 max-h-[12rem] object-contain mx-auto" />

---
layout: center
class: text-center
---

# それで何をやるのかは、わたしの・あなたの想像力次第

---
layout: section
---

# 私は何をやってるのか

---
layout: center
class: text-center
---

# 私の OpenClaw

<div class="mt-6 text-2xl opacity-85">赤髪の女の子</div>
<img src="../../public/decks/openclaw-what-made-it-great/my-openclaw.png" class="mt-8 rounded-2xl shadow-lg border border-gray-200 max-h-[18rem] w-full object-contain mx-auto" />

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
- Home IoT との接続
- 常時起動な雑談相手
- 外に持ち歩いたり？

<div class="mt-6 flex justify-center">
  <img src="../../public/decks/openclaw-what-made-it-great/personal-dev-coding.png" class="rounded-xl shadow border border-gray-200 max-h-[8rem] w-full max-w-[24rem] object-contain mx-auto" />
</div>

<div class="mt-8 text-2xl font-bold text-orange-700">
「わたし専用の AI Agent」でやりたいと思ったことを片っ端からやりたい
</div>

---
layout: two-cols
layoutClass: gap-10
---

# 具体例

<div class="space-y-6 text-left text-xl leading-9">
  <div>
    <div class="font-bold">「おはよう」から「おやすみ」まで</div>
    <div class="opacity-80">Home IoT と接続して生活に入り込ませる</div>
  </div>
  <div>
    <div class="font-bold">個人開発のコーディング</div>
    <div class="opacity-80">日々の開発を一緒に進める</div>
  </div>
  <div>
    <div class="font-bold">経費精算関連のタスク</div>
    <div class="opacity-80">請求書や経費申請も任せたい</div>
  </div>
</div>

::right::

<div class="space-y-6 text-left text-xl leading-9">
  <div>
    <div class="font-bold">PNG Tuber</div>
    <div class="opacity-80">常時起動な雑談相手</div>
  </div>
  <div>
    <div class="font-bold">外に持ち歩く</div>
    <div class="opacity-80">家の外でも相棒として連れ出す</div>
  </div>
  <div>
    <div class="font-bold">他の人の使い方を見る</div>
    <div class="opacity-80">ロボット、仕事、コミュニティ活用まで幅広い</div>
  </div>
</div>

---
layout: center
class: text-center
---

# 他の人はどう使ってる？

<div class="mt-6 grid grid-cols-1 gap-4">
  <img src="../../public/decks/openclaw-what-made-it-great/community-uses.png" class="rounded-2xl shadow-lg border border-gray-200 max-h-[10rem] w-full object-contain mx-auto" />
  <div class="grid grid-cols-2 gap-4">
    <img src="../../public/decks/openclaw-what-made-it-great/honda.png" class="rounded-xl shadow border border-gray-200 max-h-[8rem] w-full object-contain mx-auto" />
    <img src="../../public/decks/openclaw-what-made-it-great/robot.png" class="rounded-xl shadow border border-gray-200 max-h-[8rem] w-full object-contain mx-auto" />
  </div>
</div>

<div class="mt-6 text-xl leading-10 opacity-85">
正解は1つじゃない。
それぞれが自分の相棒の育て方を試している。
</div>

---
layout: section
---

# まとめ

---
layout: center
class: text-center
---

# OpenClaw は何が偉大だったのか

<div class="mt-10 text-2xl leading-12 opacity-90">
「わたし専用の AI Agent」という概念と体験を人々に与えた。<br>
その上で「あなたはこれを使って何をしますか？」という問いを人々に与えた。<br>
だから想像力を爆発させた。
</div>

---
layout: center
class: text-center
---

# あなたも OpenClaw 使って遊んでみませんか？ 🦞

<div class="mt-10 text-xl opacity-80">ご感想や、速度改善のアイデアもお待ちしています</div>
<div class="mt-8 text-lg opacity-65">https://x.com/t0yohei</div>
<img src="../../public/decks/openclaw-what-made-it-great/qr.png" class="mt-8 rounded-2xl shadow-lg border border-gray-200 max-h-[12rem] object-contain mx-auto" />
