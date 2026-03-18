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

# Rails、お前だったのか。

いつもレールの上を走らせてくれてたのは。

<div class="text-xl opacity-80 mt-8">
Cloudflare + Hono で新規開発して、Rails のレールの価値を痛感した話
</div>

<div class="mt-14 text-lg opacity-60">
@t0yohei
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

# なぜ Hono を選んだのか

新規サービスのバックエンドを Hono で作ってみた

- Cloudflare に全部載せて「うまい・早い・安い」を味わいたかった
- 開発者は自分ひとり
- できるだけ軽い構成にしたかった
- Nest.js ほど重いものは避けたかった

<div class="mt-8 text-xl font-semibold">
なので Hono を選択
</div>

---
layout: two-cols
layoutClass: gap-12
---

# 使ってみて気づいたこと

- Rails では自然にできていたことが、自然には起きない
- 仕組みは用意されていても、設計は自分でやる必要がある
- その差が、少人数開発ではじわじわ効く

::right::

<div class="mt-18 rounded-2xl bg-orange-50 border border-orange-200 p-6 text-lg leading-8">
<div class="font-bold text-orange-700 mb-3">困ったのは Hono ではなく、Rails の標準装備がなくなったことだった</div>

<div class="mt-6 text-2xl font-bold">
Rails のレール = 運用知見のプリセット
</div>
</div>

---
layout: two-cols
layoutClass: gap-10
---

# 具体例① log / masking

- Hono には logging middleware の仕組みはある
- でも、何をどう出すかは自分で決めて実装する必要がある
- Rails は default でログが出る
- log level の制御もしやすい

::right::

<div class="rounded-2xl bg-slate-50 p-5 border border-slate-200">
<div class="font-bold mb-3">Rails にはマスキングまである</div>

- `config/initializers/filter_parameter_logging.rb`
- `password`, `email`, `secret` などをマスクできる
- Hono ではそこも自前実装になった
</div>

---

# 具体例② DB運用

- Rails は rollback が便利で、ローカル検証がかなり楽
- Hono + Drizzle ORM では rollback を運用で補う必要があった
- 例: rollback 用 migration も一緒に作る仕組みを用意した
- UUID を採用して、目視で追いづらくて後悔
- default auto increment のありがたさを感じた
- integer の unixtime も人間が読みづらく、datetime のありがたさを感じた

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
