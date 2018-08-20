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
      <food-block  v-for="(type, idx) in types" :key="idx">
        <img slot="icon" :src="foodBlockIconSrc(type)"/>
        <span slot="text">{{ type }}</span>
        <img slot="arrow" src="img/ShoppingList/arrow-green.png"/>
        <div class="food" v-for="(food, idx) in foods(type)" :key="idx" :style="{ 'border-radius': !edit && idx === foods(type).length - 1 ? '0 0 10px 10px' : '' }">
          <img v-if="food.selected" src="img/ShoppingList/check-box-act.png" class="check-box" @click="food.selected = !food.selected"/>
          <img v-else src="img/ShoppingList/check-box.png" class="check-box" @click="food.selected = !food.selected"/>
          <div :style="{ 'flex-grow': 1, 'text-decoration': food.selected ? 'line-through black' : '' }" @click="food.selected = !food.selected">{{ food.nameZh }}</div>
          <img v-if="edit" src="img/ShoppingList/food-del.png" class="del" @click="delFood(food);"/>
        </div>
        <div v-if="edit" class="edit">
          <img src="img/ShoppingList/food-add.png" class="add"/>
          <div class="input-box">
            <input class="input" type="text" placeholder="新增" v-model="addFood[type]" @change="addFood({ nameZh: addFood[type], type: type }); addFood[type] = '';"/>
          </div>
          <img src="img/ShoppingList/food-add-fin.png" class="fin" @click="addFood({ nameZh: addFood[type], type: type }); addFood[type] = '';"/>
        </div>
        <div v-if="!edit && foods(type).length === 0" style="height: 10px; width: 100%;"/>
      </food-block>
    </div>
    <div v-else>
      <food-block>
        <img slot="icon" src="img/ShoppingList/type-all.png"/>
        <span slot="text">全部</span>
        <div class="food" v-for="(food, idx) in foods()" :key="idx" :style="idx === foods().length - 1 ? 'border-radius: 0 0 10px 10px;' : ''">
          <img v-if="food.selected" src="img/ShoppingList/check-box-act.png" class="check-box" @click="food.selected = !food.selected"/>
          <img v-else src="img/ShoppingList/check-box.png" class="check-box" @click="food.selected = !food.selected"/>
          <div :style="{ 'flex-grow': 1, 'text-decoration': food.selected ? 'line-through black' : '' }" @click="food.selected = !food.selected">{{ food.nameZh }}</div>
          <img v-if="edit" src="img/ShoppingList/food-del.png" class="del" @click="delFood(food);"/>
        </div>
        <div v-if="foods().length === 0" style="height: 10px; width: 100%;"/>
      </food-block>
    </div>
    <food-block>
      <img slot="icon" src="img/ShoppingList/type-all.png"/>
      <span slot="text">建議</span>
      <div class="food" v-for="(food, idx) in recommendationList.slice(0, 5)" :key="idx" :style="idx === recommendationList.slice(0, 5).length - 1 ? 'border-radius: 0 0 10px 10px; margin-bottom: 85px;' : ''">
        <img v-if="food.selected" src="img/ShoppingList/check-box-act.png" class="check-box" @click="food.selected = !food.selected; addRecommendFood(idx);"/>
        <img v-else src="img/ShoppingList/check-box.png" class="check-box" @click="food.selected = !food.selected"/>
        <div :style="{ 'flex-grow': 1, 'text-decoration': food.selected ? 'line-through black' : '' }" @click="food.selected = !food.selected; addRecommendFood(idx);">{{ food.nameZh }}</div>
      </div>
      <div v-if="recommendationList.slice(0, 5).length === 0" style="height: 10px; width: 100%; margin-bottom: 85px;"/>
    </food-block>
    <div class="footer"><img src="addToRefrigerator.png" class="button" @click="addToRefrigerator"/></div>
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

.food {
  width: 100%;
  height: 38px;
  padding-left: 40px;
  padding-top: 9px;
  color: #8a8a8a;
  background-color: #ffffff;
  box-shadow: 1px 2px 1px #8a8a8a;
  display: flex;

  .check-box {
    height: 14px;
    width: 14px;
    margin-top: 4px;
    margin-right: 10px;
  }

  .del {
    height: 15px;
    width: 15px;
    margin-top: 3px;
    margin-right: 23px;
    z-index: 1;
  }
}

.edit {
  width: 100%;
  height: 40px;
  padding-left: 38px;
  color: #d2d6da;
  background-color: #ffffff;
  box-shadow: 2px 2px 2px#8a8a8a;
  border-top: 1px #e8e8e8 dashed;
  border-radius: 0 0 10px 10px;
  display: flex;

  .add {
    height: 17px;
    width: 17px;
    margin-top: 11px;
    margin-right: 8px;
    z-index: 1;
  }

  .input-box {
    flex-grow: 1;
  }

  .input {
    border-width: 0px;
    height: 30px;
    width: 100px;
    margin-left: 0px;
    margin-top: 4px;
    margin-right: 10px;
    caret-color: #cdd2d6;
    color: #cdd2d6;
    background-color: #ffffff;
    outline: none;
  }

  .fin {
    height: 20px;
    width: 48px;
    min-width: 48px;
    margin-top: 9px;
    margin-right: 17.6px;
    z-index: 1;
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
    addRecommendFood(idx) {
      setTimeout(() => {
        this.addFood({
          nameZh: this.recommendationList[idx].nameZh,
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
      const res = await axios.post("/cabinet/userId/buy", buyItems);
      if (res.status === 200) this.$router.push("/RefrigeratorList");
    }
  },
  components: {
    FoodBlock
  }
};
</script>
