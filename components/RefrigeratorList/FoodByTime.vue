<template>
  <div class="food" :style="lastItem ? 'height: 28px;' : ''">
    <img class="type-icon" :src="foodTypeIconSrc"/>
    <div class="text">{{ food.nameZh }}</div>
    <div class="date">{{ food.expirationDate }}</div>
    <img src="img/RefrigeratorList/food-edit.png" class="edit" v-b-modal="(food.acquisitionDate + idx).toString()"/>
    <b-modal :id="(food.acquisitionDate + idx).toString()" title="編輯品項" ok-only :ok-title="'完成'" @hidden="updateItem">
      <div class="row">
        <div class="option">名稱：</div>
        <input class="input" v-model="food.nameZh" type="text"/>
      </div>
      <div class="row">
        <div class="option">品項：</div>
        <b-form-select class="input" v-model="food.type" :options="options"/>
      </div>
      <div class="row">
        <div class="option">購買日期：</div>
        <b-form-input class="input" v-model="food.acquisitionDate" type="date"/>
      </div>
      <div class="row">
        <div class="option">保存期限：</div>
        <b-form-input class="input" v-model="food.expirationDate" type="date"/>
      </div>
    </b-modal>
  </div>
</template>

<style lang="scss" scoped>
.food {
  width: 100%;
  height: 38px;
  padding-left: 40px;
  padding-top: 9px;
  color: #8a8a8a;
  background-color: #ffffff;
  box-shadow: 1px 2px 2px #8a8a8a;
  display: flex;

  .type-icon {
    height: 14px;
    width: 14px;
    margin-top: 4px;
    margin-right: 10px;
  }

  .text {
    flex-grow: 1;
  }

  .date {
    padding-top: 1px;
    font-size: 14px;
    min-width: 80px;
    margin-right: 10px;
    color: #d6cecd;
  }

  .edit {
    height: 15px;
    width: 15px;
    margin-top: 3px;
    margin-right: 23px;
    z-index: 1;
  }
}

.modal {
  .row {
    width: 100%;
    padding-left: 12px;
    padding-right: 12px;
    display: flex;
    margin: 0px;
  }

  .option {
    font-size: 14px;
    margin-top: 6px;
    color: #b2b2b2;
  }

  .input {
    border: 1px #dbdbdb solid;
    background-color: #ffffff;
    color: #878787;
    border-radius: 5px;
    height: 40px;
    width: 90%;
    margin-top: 6px;
    padding-left: 6px;
    outline: none;
    flex-grow: 1;
  }
}
</style>

<script>
import axios from "~/plugins/axios";

export default {
  props: {
    lastItem: Boolean,
    food: Object,
    idx: Number
  },
  data() {
    return {
      options: [
        { value: "甜品", text: "甜品" },
        { value: "零食", text: "零食" },
        { value: "飲料", text: "飲料" },
        { value: "青菜", text: "青菜" },
        { value: "水果", text: "水果" },
        { value: "海鮮", text: "海鮮" },
        { value: "冷凍", text: "冷凍" },
        { value: "其他", text: "其他" },
        { value: "肉", text: "肉" }
      ]
    };
  },
  computed: {
    foodTypeIconSrc() {
      switch (this.food.type) {
        case "冷凍":
          return "img/RefrigeratorList/type-frozen-food.png";
        case "飲料":
          return "img/RefrigeratorList/type-drinks.png";
        case "青菜":
          return "img/RefrigeratorList/type-vegetable.png";
        case "肉":
          return "img/RefrigeratorList/type-meat.png";
        case "海鮮":
          return "img/RefrigeratorList/type-seafood.png";
        case "點心":
          return "img/RefrigeratorList/type-snack.png";
        case "水果":
          return "img/RefrigeratorList/type-fruit.png";
        case "其他":
          return "img/RefrigeratorList/type-others.png";
      }
    }
  },
  methods: {
    async updateItem() {
      const res = await axios.post("/cabinet/userId/edit_item", this.food);
    }
  }
};
</script>
