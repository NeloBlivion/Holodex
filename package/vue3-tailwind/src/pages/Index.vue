<template>
  <div class="relative py-8">
    <div
      class="absolute inset-0 bg-[url(/img/grid.svg)] bg-top [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
    <div class="container relative max-w-2xl mx-auto bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5">
      <header class="px-4 pt-6 prose-sm md:px-6 md:prose">
        <h1>Holodex Test Kitchensink</h1>
        <p class="pb-4 text-xl leading-relaxed tracking-wide text-gray-700">
          Built with <b>Vite + Vue 3 + TypeScript + Tailwind + Cypress Starter Template</b>: Opinionated, production ready template for Vite and Vue 3. MIT licensed,
          <a href="https://github.com/Uninen/vite-ts-tailwind-starter">Docs on GitHub</a>.
        </p>
        <p>
          The current build contains DAISY UI & HeadlessUI. The plan is to migrate in vuetify and start component level migration using this file as the Kitchensink.
        </p>
      </header>
      <main>
        <div class="p-4 mx-auto prose md:px-6 prose-indigo sm:rounded-md">
          <HelloWorld msg="Hello World Component" />
        </div>
        <div class="p-4 mx-auto prose md:px-6 prose-indigo sm:rounded-md">
          Channel image: 
          <ChannelImg :channel="channel"/>
        </div>
      </main>
      <footer class="py-6 text-sm text-center text-gray-700">
        <p>
          Holodex Test Kitchensink.
          <template v-if="BUILD_DATE"> Site built {{ BUILD_DATE.toLocaleDateString() }}. </template>
          <template v-else> Development mode. </template>
        </p>
      </footer>
    </div>
  </div>
</template>
<script setup lang="ts">
// useRoute, useHead, and HelloWorld are automatically imported. See vite.config.ts for details.
const route = useRoute()

useHead({
  bodyAttrs: {
    title: route.meta.title,
  },
  meta: [
    {
      property: 'og:title',
      content: route.meta.title,
    },
    {
      name: 'twitter:title',
      content: route.meta.title,
    },
  ],
})

const VERSION = import.meta.env.VITE_APP_VERSION
const BUILD_DATE = import.meta.env.VITE_APP_BUILD_EPOCH
  ? new Date(Number(import.meta.env.VITE_APP_BUILD_EPOCH))
  : undefined
// const thisYear = new Date().getFullYear()
const channel = {"id":"UCENwRMx5Yh42zWpzURebzTw","name":"Laplus ch. ラプラス・ダークネス - holoX -","english_name":"La+ Darknesss","description":"吾輩だぞ\n\n﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏\n\nエデンの星に住む人間達諸君！🌎✨\n吾輩は holoX 総帥 ラプラス・ダークネスだ！֊  ̫ ֊\n貴様らの住む星は吾輩が手に入れるぞ！吾輩を敬うのだ～～～！！！！！！💜\n\nThe one who established Secret Society holoX.\nShe was originally known for her vast power and intelligence, but most of it is now sealed away. She is vaguely aware of the debilitating nature of her shackles but does not remember when or how they got there.\nThe crow by her side is a long-time companion.✨\n\n﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏\n\nラプラス・ダークネス🛸💜\n\n🛸Twitter\n→https://twitter.com/LaplusDarknesss\n💜youtube\n→https://www.youtube.com/channel/UCENwRMx5Yh42zWpzURebzTw\n\n🔔どちらも通知をONにして吾輩のありがたいお言葉をいち早くチェックするんだぞ！֊  ̫ ֊\n\n\nTAG #laplus_great\nFATAG #Laplus_Artdesu\n\n\n推しマーク「🛸💜」\nファンネーム ぷらすめいと\n﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏\n\nBGM：Osanzi\nhttps://twitter.com/3_o_clocker\n\n配信画面・ロゴ：ゆうたONE \nhttps://twitter.com/yuta_ptv\n\n待機画面・OP動画：テジン\nhttps://twitter.com/lilTegin\n\n待機画面・OPイラスト：朱宮あずず\nhttps://twitter.com/b_sus4\n\n﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏\n\n","photo":"https://yt3.ggpht.com/roGS60A8a_lDbVakIg1JU3u3hbtjHSTilMGHMizuPKh7tuoY2nl46raxuW2f_83IKFGMjL6Z=s800-c-k-c0x00ffffff-no-rj","thumbnail":null,"banner":"https://yt3.ggpht.com/kGwJ8lMwI5UDB1jjn9DRyXzBe2mAvjLpjyhBVybnzbOk37ykWJUUuYO-i05MMWlvqNwtu6JeEw","org":"Hololive","suborg":"g 6th Generation (HoloX)","lang":null,"published_at":"2021-09-10T19:24:36.158Z","view_count":"60661809","video_count":"154","subscriber_count":"782000","comments_crawled_at":"2022-05-25T03:17:45.465Z","updated_at":"2022-05-25T06:00:08.230Z","yt_uploads_id":"UUENwRMx5Yh42zWpzURebzTw","crawled_at":"2022-05-25T05:39:10.006Z","type":"vtuber","clip_count":2880,"twitter":"LaplusDarknesss","inactive":false,"created_at":"2021-11-26T03:53:51.106Z","top_topics":["talk","membersonly","valorant"]}
</script>
