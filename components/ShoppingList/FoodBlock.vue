<template>
  <div>
    <div class="food-title" v-b-toggle="foodData.type" :style="{ 'background-color': titleBackground }">
      <div class="food-title-text">{{ foodData.type }}</div>
    </div>
    <b-collapse visible :id="foodData.type">
      <b-form-checkbox
        class="food-item"
        v-for="food in foodData.foodArray"
        :key="food.id"
        :id="food.id"
        v-model="food.select"
        :style="{ 'text-decoration':food.select ? 'line-through black' : '' }">
        {{ food.name }}
      </b-form-checkbox>
      <div v-if="edit" class="edit">
        <b-form-input v-if="editing" v-model="addFoodName" type="text" class="edit-input" @blur.native="addFood"/>
        <div v-else @click="editing = true">編輯</div>
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
      addFoodName: ""
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
          return "#ffffff";
      }
    }
  },
  methods: {
    addFood() {
      this.$emit("addFood", {
        type: this.foodData.type,
        addFoodName: this.addFoodName
      });
      this.editing = false;
      this.addFoodName = "";
    }
  }
};
</script>
