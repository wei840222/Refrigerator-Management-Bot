<template>
  <div>
    <div class="title-bar">
      <div class="title-item">全選</div>
      <div class="title-item" @click="edit = !edit">編輯</div>
      <div class="sort-option">
        <div class="option-text">品項</div>
      </div>
    </div>
    <food-block class="food-block" v-for="foodData in data" :key="foodData.type" :edit="edit" :foodData="foodData"/>
    <recommend-block class="recommend-block" :recommend="recommend"/>
  </div>
</template>

<script>
import FoodBlock from "~/components/ShoppingList/FoodBlock.vue";
import RecommendBlock from "~/components/ShoppingList/RecommendBlock.vue";

export default {
  head() {
    return {
      title: "購買清單"
    };
  },
  data() {
    return {
      edit: false,
      data: [
        {
          type: "菜",
          foodArray: [
            { id: "1", name: "高麗菜", select: false },
            { id: "2", name: "花菜", select: false }
          ]
        },
        {
          type: "肉",
          foodArray: [
            { id: "3", name: "牛五花", select: false },
            { id: "4", name: "梅花豬", select: false },
            { id: "5", name: "小羔羊", select: false }
          ]
        },
        {
          type: "魚",
          foodArray: [
            { id: "6", name: "鱈魚", select: false },
            { id: "7", name: "虱目魚", select: false },
            { id: "8", name: "鯊魚", select: false },
            { id: "9", name: "鮭魚", select: false }
          ]
        }
      ],
      recommend: [
        { id: "10", name: "巧克力", select: false },
        { id: "11", name: "棉花糖", select: false },
        { id: "12", name: "奶油餅", select: false }
      ]
    };
  },
  components: {
    FoodBlock,
    RecommendBlock
  }
};
</script>
