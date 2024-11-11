export default defineNuxtRouteMiddleware((to, from) => {
  const header = useResponseHeader("Permissions-Policy");
  header.value = "screen-wake-lock=self";
});
