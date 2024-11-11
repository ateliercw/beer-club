<template>
  <button class="standard-button group-[.is-fullscreen]:hidden flex flex-row gap-1 items-center" type="button" @click="requestFullScreen">
    <Icon name="lucide:presentation" />
    Present
  </button>
</template>

<script setup lang="ts">
function requestFullScreen() {
  const element = document.getElementsByTagName("div")[0];
  // Supports most browsers and their versions.
  const requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

  if (requestMethod) {
    requestMethod.call(element);
  }

  acquireLock();
}

let wakeLock = null;

const onFullScreen = async (event: Event) => {
  if (document.fullscreenElement == null) {
    if (wakeLock != null) {
      wakeLock.release().then(() => {
        wakeLock = null;
        consoel.log(wakeLock);
      });
    }
  }
};

const onVisibilityChanged = async (event: Event) => {
  if (wakeLock !== null && document.visibilityState === "visible" && document.fullscreenElement != null) {
    wakeLock = await navigator.wakeLock.request();
  }
};

onMounted(() => {
  document.addEventListener("fullscreenchange", onFullScreen);
  document.addEventListener("visibilitychange", onVisibilityChanged);
});
onUnmounted(() => {
  document.removeEventListener("fullscreenchange", onFullScreen);
  document.addEventListener("visibilitychange", onVisibilityChanged);
});

async function acquireLock() {
  try {
    wakeLock = await navigator.wakeLock.request();
    console.log(wakeLock);
  } catch (err) {
    console.log(err.message);
  }
}
</script>
