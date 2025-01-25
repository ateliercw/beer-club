<template>
  <div class="lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl group-[.is-fullscreen]:w-full group-[.is-fullscreen]:h-full mx-auto p-2 p-4 lg-p-6 group-[:not(.is-fullscreen)]:container group-[.is-fullscreen]:p-0">
    <NuxtPage />
  </div>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>

<script setup lang="ts">
useHead({
  title: "Beer Club",
  bodyAttrs: {
    class: "group bg-amber-100 text-amber-800",
  },
})

const { isSupported, isActive, forceRequest, request, release } = useWakeLock()

const onFullScreen = (event: Event) => {
  if (document.fullscreenElement) {
    document.documentElement.getElementsByTagName("body")[0].classList.add("is-fullscreen")
    request("screen").then((result) => {
      console.log(result)
    })
  } else {
    document.documentElement.getElementsByTagName("body")[0].classList.remove("is-fullscreen")
    release()
  }
}

onMounted(() => {
  document.addEventListener("fullscreenchange", onFullScreen)
})

onUnmounted(() => {
  document.removeEventListener("fullscreenchange", onFullScreen)
})
</script>
