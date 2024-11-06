<template>
  <main class="flex flex-col gap-2 items-start group-[.is-fullscreen]:w-full group-[.is-fullscreen]:h-full">
    <KeyPressHandler :onPress="onKeyUp" />
    <div class="flex flex-col gap-4 h-full w-full">
      <div class="flex flex-row gap-4 justify-between">
        <NuxtLink class="group-[.is-fullscreen]:hidden standard-button" :to="beer.club">
          <p><Icon name="lucide:corner-left-up" />Back to club</p>
        </NuxtLink>
        <FullScreenButton />
      </div>
      <div class="flex gap-4 group-[.is-fullscreen]:h-full w-full" :class="isEven ? 'flex-row' : 'flex-row-reverse'">
        <Transition :name="isEven ? 'slide-right' : 'slide-left'">
          <div v-if="appeared == true" class="flex flex-col w-3/5 gap-4 items-start group-[.is-fullscreen]:items-center">
            <h1 class="w-full text-5xl leading-tight font-black font-serif text-transparent bg-clip-text bg-gradient-to-b to-amber-900 from-amber-600" :class="beer.name.length < 20 ? 'group-[.is-fullscreen]:text-[20vh] group-[.is-fullscreen]:leading-[22vh]' : 'group-[.is-fullscreen]:text-[10vh] group-[.is-fullscreen]:leading-[11vh]'">{{ beer.name }}</h1>
            <div id="stats" class="grid grid-cols-[max-content_max-content] place-content-start group-[.is-fullscreen]:place-content-center group-[.is-fullscreen]:grow group-[.is-fullscreen]:text-[2vw] group-[.is-fullscreen]:leading-[2.2vw] text-amber-900 odd:*:text-amber-700 odd:*:text-right even:*:pl-[1vw] odd:*:pr-[1vw] odd:*:border-r-2 *:border-amber-300 max-w-fit">
              <p>Brewery</p>
              <p>{{ beer.brewery }}</p>
              <p>ABV</p>
              <p>{{ beer.abv }}% ABV</p>
              <p>Country</p>
              <p>{{ beer.country }}</p>
              <p>Type</p>
              <p>{{ beer.type }}</p>
              <p>Volume</p>
              <p>{{ beer.volume }}</p>
            </div>
            <p id="info" class="group-[.is-fullscreen]:hidden">{{ beer.summary }}</p>
          </div>
        </Transition>
        <Transition :name="isEven ? 'slide-left' : 'slide-right'">
          <NuxtPicture v-if="appeared == true" :src="beer.image" class="w-2/5 h-full flex flex-col items-center justify-center" :imgAttrs="{ class: 'object-contain h-[600px] group-[.is-fullscreen]:h-full' }" />
        </Transition>
      </div>
      <ul class="flex flex-row gap-2 w-full justify-between group-[.is-fullscreen]:hidden">
        <li class="grow flex justify-start">
          <NuxtLink class="standard-button flex items-center gap-1" v-if="beer.previous" :to="beer.previous"><Icon name="lucide:chevrons-left" />Previous</NuxtLink>
        </li>
        <li class="grow flex justify-end">
          <NuxtLink class="standard-button flex items-center gap-1" v-if="beer.next" :to="beer.next">Next <Icon name="lucide:chevrons-right" /></NuxtLink>
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute();
const appeared = ref(false);

const isEven = parseInt(route.params.beer) % 2 == 0;

const { data: beer } = await useFetch(`/api${route.fullPath}`);

useHead({
  title: beer.value.name,
});

const onKeyUp = (event) => {
  if (event.key == "ArrowRight") {
    navigateTo(beer.value.next || beer.value.club);
  } else if (event.key == "ArrowLeft") {
    navigateTo(beer.value.previous || beer.value.club);
  } else if (event.key == "ArrowUp") {
    navigateTo(beer.value.club);
  }
};

onMounted(() => {
  appeared.value = true;
});

onBeforeRouteUpdate((to, from, next) => {
  appeared.value = false;
  setTimeout(next, 350);
});
</script>

<style scoped>
h1 {
  view-transition-name: header;
}
#stats {
  view-transition-name: stats;
}
#info {
  view-transition-name: info;
}

.slide-left-leave-active,
.slide-left-enter-active {
  transition: 400ms ease-in-out;
}
.slide-left-enter {
  transform: translate(-100%, 0);
  opacity: 0;
}
.slide-left-enter-from,
.slide-left-leave-to {
  transform: translate(100%, 0);
  opacity: 0;
}

.slide-right-leave-active,
.slide-right-enter-active {
  transition: 400ms ease-in-out;
}
.slide-right-enter {
  transform: translate(125%, 0);
  opacity: 0;
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translate(-100%, 0);
  opacity: 0;
}
</style>
