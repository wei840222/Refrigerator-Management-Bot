<template>
  <b-container>
    <title-bar/>
    <food-block :type="data.type" :foods="data.foodArray" />
  </b-container>
</template>

<script>
import TitleBar from "~/components/ShoppingList/TitleBar.vue";
import FoodBlock from "~/components/ShoppingList/FoodBlock.vue";

export default {
  async asyncData() {
    return {
      data: {
        type: "菜",
        foodArray: [{ id: 1, name: "高麗菜" }, { id: 2, name: "花菜" }]
      }
    };
  },
  head() {
    return {
      title: "Shopping List"
    };
  },
  components: {
    TitleBar,
    FoodBlock
  }
};
</script>
