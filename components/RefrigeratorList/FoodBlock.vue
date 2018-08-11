<template>
  <div>
    <div class="food-title" v-b-toggle="title" :style="{ 'background-color': titleBackground }" @click="collapsed =!collapsed">
      <div class="food-title-text">{{ title }}</div>
      <img v-if="collapsed" src="arrow-down.png" class="food-title-icon"/>
      <img v-else src="arrow-up.png" class="food-title-icon"/>
    </div>
    <b-collapse :visible="collapseVisible" :id="title">
      <div class="food-item" v-for="food in foodData" :key="food.id">
        <div class="food-item-text1">{{ food.name }}</div>
        <div class="food-item-text2" :style="{ 'color': titleBackground }">{{ food.period }}</div>
        <img src="del.png" class="food-item-del"/>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    titleBackground: String,
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
