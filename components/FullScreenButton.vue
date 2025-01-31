<template>
  <button v-if="supported" class="standard-button group-[.is-fullscreen]:hidden flex flex-row gap-1 items-center" type="button" @click="requestFullScreen">
    <Icon name="lucide:presentation" />
    Present
  </button>
</template>

<script setup lang="ts">
import NoSleep from "nosleep.js";
const supported = useFullscreen();

const requestFullScreen = async () => {
  const element = document.getElementsByTagName("div")[0];
  // Supports most browsers and their versions.
  const requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

  if (requestMethod) {
    requestMethod.call(element);
  }

  const noSleep = new NoSleep();
  noSleep.enable();
};
</script>
