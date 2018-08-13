<template>
  <div>
    <div class="recommend-title">
      <div class="recommend-title-text">建議清單</div>
    </div>
    <div class="recommend-item" v-for="(food, idx) in foods" :key="idx" @click="food.select = !food.selected">
      <img v-if="food.selected" src="ckeck-box-act.png" class="food-item-check-box"/>
      <img v-else src="check-box.png" class="food-item-check-box"/>
      <div :style="{ 'flex-grow': 1, 'text-decoration': food.selected ? 'line-through black' : '' }">{{ food.nameZh }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    foods: Array
  }
};
</script>
