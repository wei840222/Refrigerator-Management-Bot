<template>
  <div>
    <div class="food-title" v-b-toggle="foodData.type" :style="{ 'background-color': titleBackground }">
      <div class="food-title-text">{{ foodData.type }}</div>
    </div>
    <b-collapse visible :id="foodData.type">
      <div class="food-item" v-for="food in foodData.foodArray" :key="food.id" @click="food.select = !food.select">
        <img v-if="food.select" src="ckeck-box-act.png" class="food-item-check-box"/>
        <img v-else src="check-box.png" class="food-item-check-box"/>
        <div :style="{ 'flex-grow': 1, 'text-decoration': food.select ? 'line-through black' : '' }">{{ food.name }}</div>
        <img v-if="edit" src="del.png" class="food-item-del"/>
      </div>
      <div v-if="edit" class="edit">
        <img src="add.png" class="edit-add"/>
        <b-form-input v-model="addFoodName" type="text" :placeholder="editText" class="edit-input" @focus.native="editText = ''" @blur.native="addFood" @change="addFood(); editText = '';"/>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  props: {
    foodData: Object,
    edit: Boolean
  },
  data() {
    return {
      editing: false,
      addFoodName: "",
      editText: "編輯"
    };
  },
  computed: {
    titleBackground() {
      switch (this.foodData.type) {
        case "菜":
          return "#82db51";
        case "肉":
          return "#c29279";
        case "魚":
          return "#69b2c3";
        case "魚":
          return "#69b2c3";
        default:
          return "#000000";
      }
    }
  },
  methods: {
    addFood() {
      this.editText = "編輯";
      if (this.addFoodName != "") {
        this.$emit("addFood", {
          type: this.foodData.type,
          addFoodName: this.addFoodName
        });
        this.editing = false;
        this.addFoodName = "";
      }
    }
  }
};
</script>
