<script setup>
import profileUrl from '../public/decks/profile.jpg'
</script>

<template>
  <div class="mt-8 grid grid-cols-[180px_1fr] gap-8 items-center text-left">
    <div>
      <img :src="profileUrl" class="rounded-2xl shadow-lg border border-gray-200 w-40 h-40 object-cover mx-auto" />
    </div>
    <div class="text-xl leading-10">
      <div>- Web アプリ開発のフリーランスエンジニア</div>
      <div>- 最近は OpenClaw と遊ぶのが趣味</div>
    </div>
  </div>
</template>
