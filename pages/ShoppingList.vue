<template>
  <div>
    <div class="green-bar"/>
    <div class="nav">
      <div class="item" @click="selectedAll = !selectedAll; selectAll()" :style="{ 'color': selectedAll ? '#000000' : '#aaaaaa' }">全選</div>
      <div class="item" @click="groupByType ? edit = !edit : ''" :style="{ 'color': edit ? '#000000' : '#aaaaaa' }">編輯</div>
      <div class="option" @click="groupByType = !groupByType">
        <div class="text">{{ groupByType ? '品項' : '全部'}}</div>
        <img class="icon" src="option.png"/>
      </div>
    </div>
    <div v-if="groupByType">
      <food-block v-for="(type, idx) in types" :key="idx">
        <img slot="icon" :src="foodBlockIconSrc(type)"/>
        <span slot="text">{{ type }}</span>
        <img slot="arrow" src="img/ShoppingList/arrow-green.png"/>
        <food v-for="(food, idx) in foods(type)" :key="idx" :edit="edit" :lastItem="idx === foods(type).length - 1" :food="food" @del-food="delFood"/>
        <edit v-if="edit" :type="type" @add-food="addFood"/>
        <div v-if="!edit && foods(type).length === 0" style="height: 10px; width: 100%;"/>
      </food-block>
    </div>
    <div v-else>
      <food-block>
        <img slot="icon" src="img/ShoppingList/type-all.png"/>
        <span slot="text">全部</span>
        <food v-for="(food, idx) in foods()" :key="idx" :edit="edit" :lastItem="idx === foods().length - 1" :food="food" @del-food="delFood"/>
        <div v-if="foods().length === 0" style="height: 10px; width: 100%;"/>
      </food-block>
    </div>
    <food-block style="margin-bottom: 85px;">
      <img slot="icon" src="img/ShoppingList/type-all.png"/>
      <span slot="text">建議</span>
      <food v-for="(food, idx) in recommendationList.slice(0, 5)" :key="idx" :edit="false" :lastItem="idx === recommendationList.slice(0, 5).length - 1" :food="food" @selecte-food="addRecommendFood"/>
      <div v-if="recommendationList.slice(0, 5).length === 0" style="height: 10px; width: 100%;"/>
    </food-block>
    <div class="footer"><img class="button" src="addToRefrigerator.png" @click="addToRefrigerator"/></div>
  </div>
</template>

<style lang="scss" scoped>
.green-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 83.5px;
  background-color: #27ab38;
}

.nav {
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

  .item {
    width: 60px;
    height: 20px;
    margin-top: 10px;
  }

  .option {
    margin-top: 11px;
    height: 22px;
    width: 60px;
    border: #b7b7b8;
    border-style: solid;
    border-width: 1px;
    border-radius: 11px;
    margin-left: auto;
    display: flex;

    .text {
      font-size: 12px;
      margin-left: 12px;
      margin-top: 2px;
      color: #cecfcf;
    }

    .icon {
      height: 5px;
      width: 9px;
      margin-top: 8px;
      margin-left: 4px;
    }
  }
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

  .button {
    bottom: 0px;
    margin-top: 12px;
    margin-bottom: 12px;
    height: 40px;
    z-index: 10;
  }
}
</style>

<script>
import axios from "~/plugins/axios";
import FoodBlock from "~/components/FoodBlock.vue";
import Food from "~/components/ShoppingList/Food.vue";
import Edit from "~/components/ShoppingList/Edit.vue";

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
      types: ["肉", "青菜", "水果", "海鮮", "點心", "飲料", "冷凍", "其他"]
    };
  },
  methods: {
    foodBlockIconSrc(type) {
      switch (type) {
        case "冷凍":
          return "img/ShoppingList/type-frozen-food.png";
        case "飲料":
          return "img/ShoppingList/type-drinks.png";
        case "青菜":
          return "img/ShoppingList/type-vegetable.png";
        case "肉":
          return "img/ShoppingList/type-meat.png";
        case "海鮮":
          return "img/ShoppingList/type-seafood.png";
        case "點心":
          return "img/ShoppingList/type-snack.png";
        case "水果":
          return "img/ShoppingList/type-fruit.png";
        case "其他":
          return "img/ShoppingList/type-others.png";
      }
    },
    foods(type) {
      if (!type) return this.shoppingItems;
      else return this.shoppingItems.filter(item => item.type === type);
    },
    selectAll() {
      this.shoppingItems.forEach(element => {
        element.selected = this.selectedAll;
      });
    },
    async addFood(food) {
      if (food.nameZh === "") return;
      const res = await axios.post(
        "/cabinet/userId/add_item_to_shoppingist",
        food
      );
      if (res.status === 200)
        this.shoppingItems.push({
          id: res.data,
          nameZh: food.nameZh,
          type: food.type,
          selected: false
        });
    },
    async delFood(food) {
      let res = await axios.post(
        "/cabinet/userId/delete_item_from_shoppingist",
        {
          id: food.id,
          nameZh: food.nameZh,
          type: food.type
        }
      );
      if (res.status === 200) {
        res = await axios.get("/cabinet/userId/shopping_list");
        res.data.shoppingItems.forEach(element => {
          element.selected = this.shoppingItems.filter(
            item => item.id === element.id
          ).selected;
        });
        this.shoppingItems = res.data.shoppingItems;
      }
    },
    addRecommendFood(food) {
      setTimeout(() => {
        this.addFood({
          nameZh: food.nameZh,
          type: food.type
        });
        const idx = this.recommendationList.findIndex(
          element =>
            element.nameZh === food.nameZh && element.type === food.type
        );
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
      const res = await axios.post("/cabinet/userId/buy", buyItems);
      if (res.status === 200) this.$router.push("/RefrigeratorList");
    }
  },
  components: {
    FoodBlock,
    Food,
    Edit
  }
};
</script>
