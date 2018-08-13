<template>
  <div>
    <div class="title-bar">
      <div class="title-item" @click="selectedAll = !selectedAll; selectAll()" :style="{ 'color': selectedAll ? '#000000' : '#aaaaaa' }">全選</div>
      <div class="title-item" @click="edit = !edit" :style="{ 'color': edit ? '#000000' : '#aaaaaa' }">編輯</div>
      <div class="sort-option" @click="groupByType = !groupByType">
        <div class="option-text">{{ groupByType ? '品項' : '全部'}}</div>
        <img src="option.png" class="option-icon"/>
      </div>
    </div>
    <div v-if="groupByType">
      <food-block class="food-block" v-for="(type, idx) in types" :key="idx" :edit="edit" :type="type" :foods="foods(type)" @addFood="addFood"/>
    </div>
    <div v-else>
      <food-block class="food-block" :edit="false" :type="'全部'" :foods="foods('all')" @addFood="addFood"/>
    </div>
    <recommend-block class="recommend-block" :foods="recommendationList"/>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
import FoodBlock from "~/components/ShoppingList/FoodBlock.vue";
import RecommendBlock from "~/components/ShoppingList/RecommendBlock.vue";

export default {
  async asyncData() {
    const shoppingItems = await axios.get("/cabinet/userId/shopping_list");
    const recommendationList = await axios.get("/cabinet/userId/recommendation_list");
    return {
      shoppingItems: shoppingItems.data.shoppingItems,
      recommendationList: recommendationList.data.recommendationList
    };
  },
  created() {
    this.shoppingItems.forEach(element => {
      element.selected = false;
    });
    this.recommendationList.forEach(element => {
      element.selected = false;
    });
  },
  head() {
    return {
      title: "購買清單"
    };
  },
  data() {
    return {
      edit: false,
      groupByType: true,
      selectedAll: false
    };
  },
  computed: {
    types() {
      let types = [];
      this.shoppingItems.forEach(element => {
        if (!types.includes(element.type)) types.push(element.type);
      });
      return types;
    }
  },
  methods: {
    foods(type) {
      if (type === "all") return this.shoppingItems;
      else return this.shoppingItems.filter(item => item.type === type);
    },
    selectAll() {
      this.shoppingItems.forEach(element => {
        element.selected = this.selectedAll;
      });
    },
    addFood(event) {
      this.shoppingItems.push({
        nameZh: event.addFoodName,
        type: event.type,
        selected: false
      });
    }
  },
  components: {
    FoodBlock,
    RecommendBlock
  }
};
</script>
