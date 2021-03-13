<template>
  <div :class="$style.container"><HelloWorld /></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import HelloWorld from "./HelloWorld.vue";

export default defineComponent({
  name: "App",
  components: { HelloWorld },
});
</script>

<style lang="less" scoped module>
.container {
  display: flex;
  flex-direction: column;
  font-size: 30px;
  color: coral;
}
</style>
