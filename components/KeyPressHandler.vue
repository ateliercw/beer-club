<template>
  <div class="hidden" />
</template>

<script setup lang="ts">
const props = defineProps<{
  onPress: (event: Event) => {};
}>();

const handleEvent = (event: Event) => {
  props.onPress(event);
};

onMounted(() => {
  document.addEventListener("keyup", handleEvent);
});
onUnmounted(() => {
  document.removeEventListener("keyup", handleEvent);
});
</script>
