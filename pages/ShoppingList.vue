<template>
  <div>
    <div class="green-bar"/>
    <div class="title-bar">
      <div class="title-item" @click="selectedAll = !selectedAll; selectAll()" :style="{ 'color': selectedAll ? '#000000' : '#aaaaaa' }">全選</div>
      <div class="title-item" @click="edit = !edit" :style="{ 'color': edit ? '#000000' : '#aaaaaa' }">編輯</div>
      <div class="sort-option" @click="groupByType = !groupByType">
        <div class="option-text">{{ groupByType ? '品項' : '全部'}}</div>
        <img class="option-icon" src="option.png"/>
      </div>
    </div>
    <div v-if="groupByType">
      <food-block class="food-block" v-for="(type, idx) in types" :key="idx" :edit="edit" :type="type" :foods="foods(type)" @addFood="addFood" @delFood="delFood"/>
    </div>
    <div v-else>
      <food-block class="food-block" :edit="false" :type="'all'" :foods="foods('all')" @addFood="addFood"/>
    </div>
    <recommend-block class="recommend-block" :foods="recommendationList.slice(0, 5)" @addRecommendFood="addRecommendFood"/>
    <div class="footer"><img src="addToRefrigerator.png" class="footer-bar" @click="addToRefrigerator"/></div>
  </div>
</template>

<style>
.green-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 83.5px;
  background-color: #27ab38;
}

.title-bar {
  top: 0px;
  padding-left: 40px;
  padding-right: 20px;
  height: 40px;
  width: 100%;
  display: flex;
  position: fixed;
  z-index: 4;
  background-color: #ffffff;
  box-shadow: 0px 1px 2px rgba(20%, 20%, 40%, 0.5);
}

.title-item {
  width: 60px;
  height: 20px;
  margin-top: 10px;
}

.sort-option {
  margin-top: 11px;
  height: 22px;
  width: 60px;
  border: #b7b7b8;
  border-style: solid;
  border-width: 1px;
  border-radius: 11px;
  margin-left: auto;
  display: flex;
}

.option-text {
  font-size: 12px;
  margin-left: 12px;
  margin-top: 2px;
  color: #cecfcf;
}

.option-icon {
  height: 5px;
  width: 9px;
  margin-top: 8px;
  margin-left: 4px;
}

.food-block {
  position: relative;
  top: 40px;
  width: 100%;
  margin-top: 21px;
  padding-right: 16.8px;
  padding-left: 54.3px;
}

.recommend-block {
  position: relative;
  top: 40px;
  width: 100%;
  margin-top: 21px;
  padding-right: 16.8px;
  padding-left: 54.3px;
  padding-bottom: 85px;
}

.footer {
  bottom: 0px;
  height: 64px;
  width: 100%;
  display: flex;
  position: fixed;
  z-index: 9;
  background-color: #ffffff;
  justify-content: center;
  box-shadow: 0 0 5px rgba(20%, 20%, 40%, 0.5);
}

.footer-bar {
  bottom: 0px;
  margin-top: 12px;
  margin-bottom: 12px;
  height: 40px;
  z-index: 10;
}
</style>

<script>
import axios from "~/plugins/axios";
import FoodBlock from "~/components/ShoppingList/FoodBlock.vue";
import RecommendBlock from "~/components/ShoppingList/RecommendBlock.vue";

export default {
  async asyncData() {
    const shoppingItems = await axios.get("/cabinet/userId/shopping_list");
    const recommendationList = await axios.get(
      "/cabinet/userId/recommendation_list"
    );
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
    this.recommendationList.sort((a, b) => b.quantity - a.quantity);
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
      selectedAll: false,
      types: [
        "肉",
        "青菜",
        "水果",
        "海鮮",
        "點心",
        "飲料",
        "冷凍",
        "其他"
      ]
    };
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
    async addFood(food) {
      const res = await axios.post("/cabinet/userId/add_item_to_shoppingist", {
        nameZh: food.addFoodName,
        type: food.type
      });
      if (res.status === 200)
        this.shoppingItems.push({
          id: res.data,
          nameZh: food.addFoodName,
          type: food.type,
          selected: false
        });
    },
    async delFood() {
      const res = await axios.get("/cabinet/userId/shopping_list");
      res.data.shoppingItems.forEach(element => {
        element.selected = this.shoppingItems.filter(
          item => item.id === element.id
        ).selected;
      });
      this.shoppingItems = res.data.shoppingItems;
    },
    addRecommendFood(idx) {
      setTimeout(() => {
        this.addFood({
          addFoodName: this.recommendationList[idx].nameZh,
          type: this.recommendationList[idx].type
        });
        this.recommendationList = this.recommendationList
          .slice(0, idx)
          .concat(this.recommendationList.slice(idx + 1));
      }, 1000);
    },
    async addToRefrigerator() {
      const buyItems = [];
      this.shoppingItems.forEach(item => {
        if (item.selected)
          buyItems.push({
            id: item.id,
            nameZh: item.nameZh
          });
      });
      console.log(buyItems);
      const res = await axios.post("/cabinet/userId/buy", buyItems);
      if (res.status === 200) await this.delFood();
    }
  },
  components: {
    FoodBlock,
    RecommendBlock
  }
};
</script>
