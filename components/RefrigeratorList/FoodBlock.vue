<template>
  <div>
    <div class="food-title" v-b-toggle="title" :style="{ 'background-color': titleBackground }" @click="collapsed =!collapsed">
      <div class="food-title-text">{{ title }}</div>
      <img v-if="collapsed" src="arrow-down.png" class="food-title-icon"/>
      <img v-else src="arrow-up.png" class="food-title-icon"/>
    </div>
    <b-collapse :visible="collapseVisible" :id="title">
      <div class="food-item" v-for="(food, idx) in foods" :key="idx">
        <div class="food-item-text1">{{ food.nameZh }}</div>
        <div class="food-item-text2" :style="{ 'color': titleBackground }">{{ food.expirationDateString }}</div>
        <img src="del.png" class="food-item-del" @click="delFood(arguments, food)"/>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import axios from "~/plugins/axios";

export default {
  props: {
    title: String,
    titleBackground: String,
    collapseVisible: Boolean,
    foods: Array
  },
  data() {
    return {
      collapsed: false
    };
  },
  methods: {
    async delFood(event, food) {
      const res = await axios.post(
        "/cabinet/userId/delete_item_from_shoppingist",
        {
          id: food.id,
          nameZh: food.addFoodName,
          type: food.type
        }
      );
      if (res.status === 200) this.$emit("delFood");
    }
  }
};
</script>
