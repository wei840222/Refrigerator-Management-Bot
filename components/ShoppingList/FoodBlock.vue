<template>
  <div>
    <div v-if="type != 'all'" class="food-title" v-b-toggle="type" :style="{ 'background-color': titleBackground }" @click="collapsed =!collapsed">
      <div class="food-title-text">{{ type }}</div>
      <div v-if="foods.length > 0">
        <img v-if="collapsed" src="arrow-down.png" class="food-title-icon"/>
        <img v-else src="arrow-up.png" class="food-title-icon"/>
      </div>
    </div>
    <b-collapse visible :id="type">
      <div class="food-item" v-for="(food, idx) in foods" :key="idx">
        <img v-if="food.selected" src="ckeck-box-act.png" class="food-item-check-box" @click="food.selected = !food.selected"/>
        <img v-else src="check-box.png" class="food-item-check-box" @click="food.selected = !food.selected"/>
        <div :style="{ 'flex-grow': 1, 'text-decoration': food.selected ? 'line-through black' : '' }" @click="food.selected = !food.selected">{{ food.nameZh }}</div>
        <img v-if="edit" src="del.png" class="food-item-del" @click="delFood(arguments, food)"/>
      </div>
      <div v-if="edit" class="edit">
        <img src="add.png" class="edit-add"/>
        <div class="edit-input-box">
          <input class="edit-input" v-model="addFoodName" type="text" placeholder="新增" @change="addFood"/>
        </div>
        <img src="addFin.png" class="food-item-add-fin" @click="addFood"/>
      </div>
    </b-collapse>
  </div>
</template>

<style>
.food-title {
  height: 40px;
  width: 100%;
  display: flex;
}

.food-title-text {
  padding-left: 40px;
  padding-top: 10px;
  color: #ffffff;
  flex-grow: 1;
}

.food-title-icon {
  height: 12px;
  width: 21px;
  margin-top: 14px;
  margin-right: 20px;
}

.food-item {
  width: 100%;
  height: 38px;
  padding-left: 40px;
  padding-top: 9px;
  margin-right: 0px;
  color: #8a8a8a;
  background-color: #f6f6f6;
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
  border-top-color: #e5e5e5;
  border-top-style: dashed;
  border-top-width: 1px;
  color: #d2d6da;
  background-color: #f6f6f6;
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
  width: 80%;
  height: 30px;
  margin-left: 0px;
  margin-top: 4px;
  flex-grow: 1;
  display: flex;
}

.edit-input {
  border-width: 0px;
  height: 30px;
  margin-right: 10px;
  caret-color: #b5b5b5;
  color: #b5b5b5;
  background-color: #f6f6f6;
  outline: none;
  flex-grow: 1;
}

.food-item-add-fin {
  height: 20px;
  width: 48px;
  min-width: 48px;
  margin-top: 9px;
  margin-right: 20px;
  z-index: 1;
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
    titleBackground() {
      switch (this.type) {
        case "冷凍":
          return "#7BA2DB";
        case "飲料":
          return "#EFCE43";
        case "青菜":
          return "#81C14E";
        case "肉":
          return "#C18F7B";
        case "海鮮":
          return "#80C9E0";
        case "甜品":
          return "#FC97C5";
        case "零食":
          return "#F9914B";
        case "水果":
          return "#36CEB8";
        case "其他":
          return "#C683F2";
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
