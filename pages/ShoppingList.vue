<template>
  <div>
    <title-bar class="title-bar"/>
    <food-block class="food-block" v-for="foodData in data" :key="foodData.type" :foodData="foodData"/>
    <recommend-block class="recommend-block" :foodData="recommend"/>
  </div>
</template>

<style>
.title-bar {
  padding-left: 40px;
  padding-right: 20px;
  height: 40px;
  width: 100%;
  display: flex;
  position: fixed;
  z-index: 1;
  background-color: #ffffff;
  box-shadow: 0px 1px 2px rgba(20%, 20%, 40%, 0.5);
}
.food-block {
  position: relative;
  top: 40px;
  width: 100%;
}
.recommend-block {
  position: relative;
  margin-top: 40px;
  width: 100%;
}
</style>

<script>
import TitleBar from "~/components/ShoppingList/TitleBar.vue";
import FoodBlock from "~/components/ShoppingList/FoodBlock.vue";
import RecommendBlock from "~/components/ShoppingList/RecommendBlock.vue";

export default {
  head() {
    return {
      title: "購買清單"
    };
  },
  async asyncData() {
    return {
      data: [
        {
          type: "菜",
          foodArray: [{ id: "1", name: "高麗菜" }, { id: "2", name: "花菜" }]
        },
        {
          type: "肉",
          foodArray: [
            { id: "3", name: "牛五花" },
            { id: "4", name: "梅花豬" },
            { id: "5", name: "小羔羊" }
          ]
        },
        {
          type: "魚",
          foodArray: [
            { id: "6", name: "鱈魚" },
            { id: "7", name: "虱目魚" },
            { id: "8", name: "鯊魚" },
            { id: "9", name: "鮭魚" }
          ]
        }
      ],
      recommend: [
        { id: "1", name: "巧克力" },
        { id: "2", name: "棉花糖" },
        { id: "3", name: "奶油餅" }
      ]
    };
  },
  components: {
    TitleBar,
    FoodBlock,
    RecommendBlock
  }
};
</script>
