<template>
  <b-container>
    <title-bar/>
    <food-block  v-for="foodData in data" :key="foodData.type" :type="foodData.type" :foods="foodData.foodArray" />
  </b-container>
</template>

<script>
import TitleBar from "~/components/ShoppingList/TitleBar.vue";
import FoodBlock from "~/components/ShoppingList/FoodBlock.vue";

export default {
  head() {
    return {
      title: "Shopping List"
    };
  },
  async asyncData() {
    return {
      data: [
        {
          type: "菜",
          foodArray: [{ id: 1, name: "高麗菜" }, { id: 2, name: "花菜" }]
        },
        {
          type: "肉",
          foodArray: [
            { id: 3, name: "牛五花" },
            { id: 4, name: "梅花豬" },
            { id: 5, name: "小羔羊" }
          ]
        }
      ]
    };
  },
  components: {
    TitleBar,
    FoodBlock
  }
};
</script>
