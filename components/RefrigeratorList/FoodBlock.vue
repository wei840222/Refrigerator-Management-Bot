<template>
  <div>
    <div class="food-title" v-b-toggle="title" :style="{ 'background-color': titleBackground }" @click="collapsed =!collapsed">
      <div class="food-title-text">{{ title }}</div>
      <div v-if="foods.length > 0">
        <img v-if="collapsed" src="arrow-down.png" class="food-title-icon"/>
        <img v-else src="arrow-up.png" class="food-title-icon"/>
      </div>
    </div>
    <b-collapse :visible="collapseVisible" :id="title">
      <div class="food-item" v-for="(food, idx) in foods" :key="idx">
        <div class="food-item-text1">{{ food.nameZh }}</div>
        <div class="food-item-text2" :style="{ 'color': foodColor }">{{ food.expirationDateString }}</div>
        <img src="del.png" class="food-item-del" @click="delFood(arguments, food)"/>
      </div>
    </b-collapse>
    <div class="food-footer" :style="{ 'background-color': titleBackground }"/>
  </div>
</template>

<style>
.food-title {
  height: 40px;
  width: 100%;
  display: flex;
}

.food-title-text {
  padding-left: 40px;
  padding-top: 10px;
  color: #ffffff;
  flex-grow: 1;
}

.food-title-icon {
  height: 12px;
  width: 21px;
  margin-top: 14px;
  margin-right: 20px;
}

.food-item {
  width: 100%;
  height: 38px;
  padding-left: 40px;
  padding-top: 9px;
  margin-right: 0px;
  background-color: #ffffff;
  display: flex;
}

.food-item-text1 {
  margin-top: -1px;
  flex-grow: 1;
  color: #8a8a8a;
}

.food-item-text2 {
  padding-top: 1px;
  min-width: 80px;
  font-size: 14px;
  margin-right: 10px;
  text-align: left;
}

.food-item-del {
  height: 15px;
  width: 15px;
  margin-top: 3px;
  margin-right: 23px;
  z-index: 1;
}

.food-footer {
  height: 15px;
  width: 100%;
  border-radius: 0 0 15px 15px;
  background-color: #ffffff;
  box-shadow: 1px 2px 1px #8a8a8a;
}
</style>

<script>
import axios from "~/plugins/axios";

export default {
  props: {
    title: String,
    titleBackground: String,
    foodColor: String,
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
