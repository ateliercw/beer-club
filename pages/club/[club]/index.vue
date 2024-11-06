<template>
  <div>
    <main class="group-[.is-fullscreen]:w-screen group-[.is-fullscreen]:h-screen flex flex-col gap-6 items-center justify-center">
      <KeyPressHandler :onPress="onKeyUp" />
      <div class="flex flex-row justify-between w-full">
        <NuxtLink class="group-[.is-fullscreen]:hidden standard-button" to="/">
          <p><Icon name="lucide:corner-left-up" />Home</p>
        </NuxtLink>
        <FullScreenButton />
      </div>
      <ScalingTitle>
        <h1>Beer Club: <br class="group-[.is-fullscreen]:block hidden" />{{ club.name }}</h1>
      </ScalingTitle>
      <p class="group-[.is-fullscreen]:text-[5vh] group-[.is-fullscreen]:leading-[5vh] text-amber-500 text-transparent bg-clip-text bg-gradient-to-b from-amber-600 to-amber-400">
        {{ new Date(club.date).toLocaleString("en-DK", dateOptions) }}
      </p>
      <ul class="group-[.is-fullscreen]:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <li v-for="beer in club.beers" class="">
          <NuxtLink class="flex flex-col gap-2 items-center text-center text-amber-600 hover:text-amber-700 duration-100 ease-in" :to="beer.link">
            <NuxtPicture :src="beer.image" :imgAttrs="{ class: 'object-contain h-40 w-40' }" />
            {{ beer.name }}
          </NuxtLink>
        </li>
      </ul>
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const dateOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

let { data: club } = await useFetch(`/api${route.fullPath}`);

const onKeyUp = (event) => {
  if (event.key == "ArrowRight") {
    navigateTo(club.value.beers[0].link);
  }
  if (event.key == "ArrowLeft") {
    navigateTo(club.value.beers[club.value.beers.length - 1].link);
  }
};
</script>
<style scoped>
h1 {
  view-transition-name: header;
}
</style>
