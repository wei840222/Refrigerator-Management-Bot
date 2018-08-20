<template>
  <div>
    <div v-if="type != 'all'" class="food-title" v-b-toggle="type" @click="collapsed =!collapsed">
      <img :src="titleTypeImg" class="food-title-type"/>
      <div class="food-title-text">
        <div class="food-title-text-ch">{{ type }}</div>
        <div class="food-title-text-eng">{{ titleEnglish }}</div>
      </div>
      <div v-if="foods.length > 0">
        <img v-if="collapsed" src="img/ShoppingList/arrow-green.png" class="food-title-icon"/>
        <img v-else src="img/ShoppingList/arrow-green.png" class="food-title-icon"/>
      </div>
    </div>
    <b-collapse visible :id="type">
      <div class="food-item" v-for="(food, idx) in foods" :key="idx">
        <img v-if="food.selected" src="img/ShoppingList/check-box-act.png" class="food-item-check-box" @click="food.selected = !food.selected"/>
        <img v-else src="img/ShoppingList/check-box.png" class="food-item-check-box" @click="food.selected = !food.selected"/>
        <div :style="{ 'flex-grow': 1, 'text-decoration': food.selected ? 'line-through black' : '' }" @click="food.selected = !food.selected">{{ food.nameZh }}</div>
        <img v-if="edit" src="img/ShoppingList/food-del.png" class="food-item-del" @click="delFood(arguments, food)"/>
      </div>
    </b-collapse>
    <div v-if="edit" class="edit">
      <img src="img/ShoppingList/food-add.png" class="edit-add"/>
      <div class="edit-input-box">
        <input class="edit-input" v-model="addFoodName" type="text" placeholder="新增" @change="addFood"/>
      </div>
      <img src="img/ShoppingList/food-add-fin.png" class="food-item-add-fin" @click="addFood"/>
    </div>
    <div class="food-footer"/>
  </div>
</template>

<style>
.food-title {
  width: 100%;
  display: flex;
  flex-direction: row;
  border-radius: 15px 15px 0 0;
  background-color: #ffffff;
  box-shadow: 1px 2px 1px #8a8a8a;
}

.food-title-type {
  height: 63px;
  width: 63px;
  margin-left: -28px;
  margin-top: 16px;
  border-radius: 31.5px;
  box-shadow: 1px 2px 1px #8a8a8a;
}

.food-title-text {
  margin-left: 40px;
  margin-top: 21.6px;
  margin-bottom: 21.6px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.food-title-text-ch {
  margin-bottom: 6.6px;
  color: #6d6d6d;
  font-size: 19.6px;
}

.food-title-text-eng {
  color: #999899;
  font-size: 12.9px;
}

.food-title-icon {
  height: 12px;
  width: 21px;
  margin-top: 42.89px;
  margin-right: 17.6px;
}

.food-item {
  width: 100%;
  height: 38px;
  padding-left: 40px;
  padding-top: 9px;
  color: #8a8a8a;
  background-color: #ffffff;
  border-top: 1px #e8e8e8 solid;
  box-shadow: 1px 2px 1px #8a8a8a;
  display: flex;
}

.food-item-check-box {
  height: 14px;
  width: 14px;
  margin-top: 4px;
  margin-right: 10px;
}

.food-item-del {
  height: 15px;
  width: 15px;
  margin-top: 3px;
  margin-right: 23px;
  z-index: 1;
}

.edit {
  width: 100%;
  height: 40px;
  padding-left: 38px;
  color: #d2d6da;
  background-color: #ffffff;
  box-shadow: 1px 2px 1px #8a8a8a;
  border-top: 1px #e8e8e8 dashed;
  display: flex;
}

.edit-add {
  height: 17px;
  width: 17px;
  margin-top: 11px;
  margin-right: 8px;
  z-index: 1;
}

.edit-input-box {
  flex-grow: 1;
}

.edit-input {
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

.food-item-add-fin {
  height: 20px;
  width: 48px;
  min-width: 48px;
  margin-top: 9px;
  margin-right: 17.6px;
  z-index: 1;
}

.food-footer {
  height: 15px;
  width: 100%;
  border-radius: 0 0 15px 15px;
  background-color: #ffffff;
  box-shadow: 1px 2px 1px #8a8a8a;
}
</style>

<script>
import axios from "~/plugins/axios";

export default {
  props: {
    type: String,
    foods: Array,
    edit: Boolean
  },
  data() {
    return {
      editing: false,
      addFoodName: "",
      editText: "新增",
      collapsed: false
    };
  },
  computed: {
    titleEnglish() {
      switch (this.type) {
        case "冷凍":
          return "Frozen Food";
        case "飲料":
          return "Drinks";
        case "青菜":
          return "Vegetable";
        case "肉":
          return "Meat";
        case "海鮮":
          return "Seafood";
        case "甜品":
          return "Sweet";
        case "零食":
          return "Snack";
        case "水果":
          return "Fruit";
        case "其他":
          return "Others";
      }
    },
    titleTypeImg() {
      switch (this.type) {
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
        case "甜品":
          return "img/ShoppingList/type-sweet.png";
        case "零食":
          return "img/ShoppingList/type-sweet.png";
        case "水果":
          return "img/ShoppingList/type-fruit.png";
        case "其他":
          return "img/ShoppingList/type-others.png";
      }
    }
  },
  methods: {
    addFood() {
      this.editText = "新增";
      if (this.addFoodName != "") {
        this.$emit("addFood", {
          type: this.type,
          addFoodName: this.addFoodName
        });
        this.editing = false;
        this.addFoodName = "";
      }
    },
    async delFood(event, food) {
      const res = await axios.post(
        "/cabinet/userId/delete_item_from_shoppingist",
        {
          id: food.id,
          nameZh: food.addFoodName,
          type: food.type
        }
      );
      if (res.status === 200) this.$emit("delFood");
    }
  }
};
</script>
