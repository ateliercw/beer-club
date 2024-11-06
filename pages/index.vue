<template>
  <main class="flex flex-col items-center gap-4">
    <ScalingTitle>
      <h1>Beer Club</h1>
    </ScalingTitle>
    <ul class="flex flex-col gap-2">
      <li v-for="club in clubs">
        <NuxtLink class="flex flex-col items-center standard-button group/club" :to="club.link">
          <p class="">{{ club.name }}</p>
          <p class="text-amber-500 group-hover/club:text-amber-600 duration-100 ease-in">{{ new Date(club.date).toLocaleString("en-DK", dateOptions) }}</p>
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
const route = useRoute();

const dateOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

let { data: clubs } = await useFetch(`/api/club/`);
</script>
