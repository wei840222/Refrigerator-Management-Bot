<template>
  <div>
    <div class="green-bar"/>
    <div class="nav">
      <div class="item" @click="selectedAll = !selectedAll; selectAll()" :style="{ 'color': selectedAll ? '#000000' : '#aaaaaa' }">全選</div>
      <div class="item" @click="edit = !edit" :style="{ 'color': edit ? '#000000' : '#aaaaaa' }">編輯</div>
      <div class="option" @click="groupByType = !groupByType">
        <div class="text">{{ groupByType ? '品項' : '全部'}}</div>
        <img class="icon" src="img/ShoppingList/option.png"/>
      </div>
    </div>
    <div v-if="groupByType">
      <food-block v-for="(type, idx) in types" :key="idx" :idx="idx" :collapseVisibleInit="idx === 0 ? true : false" :collapseUseable="foods(type).length > 0 ? true : false" :ref="type">
        <img slot="icon" :src="foodBlockIconSrc(type)"/>
        <div slot="text" class="title">{{ type }}</div>
        <img slot="arrow-down" src="img/ShoppingList/arrow-green-down.png"/>
        <img slot="arrow-up" src="img/ShoppingList/arrow-green-up.png"/>
        <food v-for="(food, idx) in foods(type)" :key="idx" :food="food" :edit="edit" @del-food="delFood"/>
        <edit slot="footer" v-if="edit" :type="type" @add-food="addFood"/>
      </food-block>
    </div>
    <div v-else>
      <food-block :idx="-1" :collapseVisibleInit="true" :collapseUseable="false">
        <img slot="icon" src="img/ShoppingList/type-all.png" style="width: 43px; margin-left: 10px; margin-top:17.26px;"/>
        <div slot="text" class="title">全部</div>
        <food v-for="(food, idx) in foods()" :key="idx" :food="food" :edit="edit" @del-food="delFood"/>
      </food-block>
    </div>
    <food-block :collapseVisibleInit="true" :collapseUseable="false" style="margin-bottom: 81px;">
      <img slot="icon" src="img/ShoppingList/type-recommend.png"/>
      <div slot="text" class="title">建議</div>
      <food v-for="(food, idx) in recommendationList.slice(0, 5)" :key="idx" :food="food" @selecte-food="addRecommendFood"/>
    </food-block>
    <div class="footer"><img class="button" src="img/ShoppingList/btn-refrigerator.png" @click="addToRefrigerator"/></div>
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

.title {
  color: #6d6d6d;
  font-size: 19.6px;
}

.footer {
  bottom: 0px;
  height: 61px;
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
    height: 37px;
    z-index: 10;
  }
}
</style>

<script>
import axios from "~/plugins/axios";
import FoodBlock from "~/components/FoodBlock.vue";
import Food from "~/components/ShoppingList/Food.vue";
import Edit from "~/components/ShoppingList/Edit.vue";
import { setInterval } from "timers";

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
  mounted() {
    this.shoppingItems.forEach(element => {
      element.selected = false;
    });
    this.recommendationList.forEach(element => {
      element.selected = false;
    });
    this.recommendationList.sort((a, b) => b.quantity - a.quantity);
    setInterval(async () => {
      const res = await axios.get("/cabinet/userId/shopping_list");
      res.data.shoppingItems.forEach(element => {
        try {
          element.selected = this.shoppingItems.filter(
            item => item.id === element.id
          )[0].selected;
        } catch (err) {}
      });
      this.shoppingItems = res.data.shoppingItems;
    }, 5000);
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
          )[0].selected;
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
