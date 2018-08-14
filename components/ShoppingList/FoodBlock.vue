<template>
  <div>
    <div class="food-title" v-b-toggle="type" :style="{ 'background-color': titleBackground }" @click="collapsed =!collapsed">
      <div class="food-title-text">{{ type }}</div>
      <img v-if="collapsed" src="arrow-down.png" class="food-title-icon"/>
      <img v-else src="arrow-up.png" class="food-title-icon"/>
    </div>
    <b-collapse visible :id="type">
      <div class="food-item" v-for="(food, idx) in foods" :key="idx" @click="food.selected = !food.selected">
        <img v-if="food.selected" src="ckeck-box-act.png" class="food-item-check-box"/>
        <img v-else src="check-box.png" class="food-item-check-box"/>
        <div :style="{ 'flex-grow': 1, 'text-decoration': food.selected ? 'line-through black' : '' }">{{ food.nameZh }}</div>
        <img v-if="edit" src="del.png" class="food-item-del"/>
      </div>
      <div v-if="edit" class="edit">
        <img src="add.png" class="edit-add"/>
        <div class="edit-input-box">
          <b-form-input class="edit-input" v-model="addFoodName" type="text" :placeholder="editText" @focus.native="editText = ''" @blur.native="editText = '新增'" @change="addFood"/>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
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
        case "青菜":
          return "#82db51";
        case "肉":
          return "#c29279";
        case "海鮮":
          return "#69b2c3";
        case "飲料":
          return "#EFCE43";
        case "冷凍食品":
          return "#7BA2DB";
        default:
          return "#000000";
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
    }
  }
};
</script>
