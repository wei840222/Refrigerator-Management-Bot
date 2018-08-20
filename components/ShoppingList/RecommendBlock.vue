<template>
  <div>
    <div class="recommend-title">
      <div class="recommend-title-text">建議清單</div>
    </div>
    <div class="recommend-item" v-for="(food, idx) in foods" :key="idx" @click="food.selected = !food.selected; $emit('addRecommendFood', idx);">
      <img v-if="food.selected" src="img/ShoppingList/check-box-act.png" class="food-item-check-box"/>
      <img v-else src="img/ShoppingList/check-box.png" class="food-item-check-box"/>
      <div :style="{ 'flex-grow': 1, 'text-decoration': food.selected ? 'line-through black' : '' }">{{ food.nameZh }}</div>
    </div>
    <div class="recommend-footer"/>
  </div>
</template>

<style>
.recommend-title {
  width: 100%;
  display: flex;
  flex-direction: row;
  border-radius: 15px 15px 0 0;
  background-color: #ffffff;
  box-shadow: 1px 2px 1px #8a8a8a;
}

.recommend-title-text {
  margin-left: 40px;
  margin-top: 21.6px;
  margin-bottom: 21.6px;
  flex-grow: 1;
  color: #6d6d6d;
  font-size: 19.6px;
}

.recommend-item {
  width: 100%;
  height: 38px;
  padding-left: 40px;
  padding-top: 9px;
  color: #8a8a8a;
  background-color: #ffffff;
  border-top: 1px #e8e8e8 solid;
  box-shadow: 1px 2px 1px #8a8a8a;
  display: flex;
}

.food-item-check-box {
  height: 14px;
  width: 14px;
  margin-top: 4px;
  margin-right: 10px;
}

.recommend-footer {
  height: 15px;
  width: 100%;
  border-radius: 0 0 15px 15px;
  background-color: #ffffff;
  box-shadow: 1px 2px 1px #8a8a8a;
}
</style>

<script>
export default {
  props: {
    foods: Array
  }
};
</script>
