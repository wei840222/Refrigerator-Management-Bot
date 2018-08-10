<template>
  <div>
    <div class="food-title" v-b-toggle="title" style="background-color: #eae8e8" @click="collapsed =!collapsed">
      <div class="food-title-text" style="color: #b7b7b8">{{ title }}</div>
      <img v-if="collapsed" src="arrow-down.png" class="food-title-icon"/>
      <img v-else src="arrow-up.png" class="food-title-icon"/>
    </div>
    <b-collapse :visible="collapseVisible" :id="title">
      <div class="food-item" v-for="food in foodData" :key="food.id">
        <img v-if="food.type === '魚'" src="type-fish.png" class="food-item-type"/>
        <img v-if="food.type === '肉'" src="type-meat.png" class="food-item-type"/>
        <img v-if="food.type === '點心'" src="type-snack.png" class="food-item-type"/>
        <div class="food-item-text1">{{ food.name }}</div>
        <div class="food-item-text3">{{ food.period }}</div>
        <img src="edit.png" class="food-item-del"/>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    collapseVisible: Boolean,
    foodData: Array
  },
  data() {
    return {
      collapsed: false
    };
  }
};
</script>
