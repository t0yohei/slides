---
theme: seriph
title: 「おはよう」から「おやすみ」まで
info: |
  OpenClaw の家電操作で始める AI 生活
class: text-center
drawings:
  persist: false
transition: slide-left
duration: 7min
mdc: true
routerMode: hash
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

# <span class="text-5xl">「おはよう」から「おやすみ」まで</span>

<div class="mt-8 text-2xl opacity-85">OpenClaw の家電操作から始める AI 生活</div>

<div class="mt-14 text-lg opacity-60">t0yohei @ 🦞ClawCon Tokyo</div>

---
layout: center
class: text-center
---

# t0yohei について

<div class="mt-8 grid grid-cols-[180px_1fr] gap-8 items-center text-left">
  <div>
    <img src="../../public/decks/profile.jpg" class="rounded-2xl shadow-lg border border-gray-200 w-40 h-40 object-cover mx-auto" />
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

# やりたいこと

<div class="mt-12 text-2xl leading-12 font-semibold opacity-85">
「おはよう」で電気をつけて、<br>
「おやすみ」で電気を消す。
</div>

<img src="../../public/decks/ohayou-kara-oyasumi-made/intent-example.png" class="mt-10 rounded-2xl shadow-lg border border-gray-200 max-h-[14rem] w-full object-contain mx-auto" />

---
layout: center
class: text-center
---

# Demo

<div class="mt-10 text-3xl leading-14 font-semibold">
おはよう<br>
暖房つけて<br>
おやすみ
</div>

<div class="mt-12 text-lg opacity-70">
Google Meet で部屋を映しながら、Discord から実際に送る
</div>

---
layout: center
class: text-center
---

# How it works

<img src="../../public/decks/ohayou-kara-oyasumi-made/how-it-works.svg" class="mt-6 w-full max-h-[34rem] object-contain mx-auto" />

---
layout: default
---

# 3秒以内に操作を終わらせたかった

<div class="mt-6 space-y-6 text-left max-w-4xl mx-auto">
  <div>
    <div class="text-xl font-bold">やったこと 1: STT を local / 高速化</div>
    <div class="mt-2 text-lg opacity-80">標準の重い経路ではなく、高速な STT を local で利用</div>
  </div>

  <div>
    <div class="text-xl font-bold">やったこと 2: local LLM (Ollama) で意図判定</div>
    <div class="mt-2 text-lg opacity-80">通信 overhead を減らし、STT の揺らぎ補正と intent 判定をまとめて処理</div>
  </div>

  <div>
    <div class="text-xl font-bold">やったこと 3: hook で fastpath 実行</div>
    <div class="mt-2 text-lg opacity-80">main agent の返答を待たずに家電操作だけ先に処理</div>
  </div>
</div>

<div class="mt-10 text-2xl font-bold text-orange-600 text-center">
遅い部分をできるだけ main agent の外に逃がした
</div>

---
layout: center
class: text-center
---

# Next

<div class="mt-8 text-left inline-block text-xl leading-10">
- Discord を使わずに、OpenClaw に話しかけるだけで操作できるようにしたい
- 家電以外のことも、会話で OpenClaw に頼めるようにしたい
</div>

<div class="mt-12 text-lg opacity-75">
Google Home のように自然に呼び出せるようにして、<br>
家電操作だけでなく、日常の頼み事にも広げたい
</div>
