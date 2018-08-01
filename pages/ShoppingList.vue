<template>
  <b-container>
    <br/>
    <title-bar/>
    <br/>
    <food-block v-for="foodData in data" :key="foodData.type" :type="foodData.type" :foods="foodData.foodArray"/>
    <recommend-block type="建議購買" :foods="recommend"/>
  </b-container>
</template>

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
        }
      ],
      recommend: [
        { id: "7", name: "巧克力" },
        { id: "8", name: "棉花糖" },
        { id: "9", name: "奶油餅" }
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
