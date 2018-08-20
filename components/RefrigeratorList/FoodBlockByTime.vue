<template>
  <div>
    <div class="food-title" v-b-toggle="title + 'collapse'" @click="collapsed =!collapsed">
      <div class="food-title-date">
        <div class="food-title-date-text">{{ title.slice(5).replace('-', ".") }}</div>
      </div>
      <div class="food-title-text2" style="color: #b7b7b8">{{ title.slice(0, 4) }}</div>
      <img v-if="collapsed" src="arrow-gray-down.png" class="food-title-icon"/>
      <img v-else src="arrow-gray-up.png" class="food-title-icon"/>
    </div>
    <b-collapse :visible="collapseVisible" :id="title + 'collapse'">
      <div class="food-item" v-for="(food, idx) in foods" :key="idx">
        <b-badge variant="primary" class="food-item-type">{{ food.type }}</b-badge>
        <div class="food-item-text1">{{ food.nameZh }}</div>
        <div class="food-item-text3">{{ food.expirationDate }}</div>
        <img src="edit.png" class="food-item-del" v-b-modal="(food.acquisitionDate + idx).toString()"/>
        <b-modal :id="(food.acquisitionDate + idx).toString()" title="編輯品項" ok-only :ok-title="'完成'" @hidden="updateItem(food)">
          <div class="form-row">
            <div class="form-option">名稱：</div>
            <input class="edit-input" v-model="food.nameZh" type="text"/>
          </div>
          <div class="form-row">
            <div class="form-option">品項：</div>
            <b-form-select class="edit-input" v-model="food.type" :options="options"/>
          </div>
          <div class="form-row">
            <div class="form-option">購買日期：</div>
            <b-form-input class="edit-input" v-model="food.acquisitionDate" type="date"/>
          </div>
          <div class="form-row">
            <div class="form-option">保存期限：</div>
            <b-form-input class="edit-input" v-model="food.expirationDate" type="date"/>
          </div>
        </b-modal>
      </div>
    </b-collapse>
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

.food-title-date {
  height: 63px;
  width: 63px;
  margin-left: -28px;
  margin-top: 14px;
  border-radius: 31.5px;
  box-shadow: 1px 2px 1px #8a8a8a;
  background-color: #ffffff;
  z-index: 1;
}

.food-title-date-text {
  text-align: center;
  margin-top: 18px;
  font-size: 18px;
  color: #27ab38;
}

.food-title-text2 {
  padding: 21.6px;
  color: #6d6d6d;
  font-size: 24px;
  flex-grow: 1;
}

.food-title-icon {
  height: 12px;
  width: 21px;
  margin-top: 41.1px;
  margin-right: 20px;
}

.food-item {
  width: 100%;
  height: 38px;
  padding-left: 40px;
  padding-top: 9px;
  margin-right: 0px;
  background-color: #ffffff;
  box-shadow: 1px 2px 1px #8a8a8a;
  display: flex;
}

.food-item-type {
  height: 17px;
  margin-top: 3px;
  margin-right: 10px;
  z-index: 1;
}

.food-item-text1 {
  margin-top: -1px;
  flex-grow: 1;
  color: #8a8a8a;
}

.food-item-text3 {
  padding-top: 1px;
  font-size: 14px;
  min-width: 80px;
  margin-right: 10px;
  color: #d6cecd;
}

.food-item-del {
  height: 15px;
  width: 15px;
  margin-top: 3px;
  margin-right: 23px;
  z-index: 1;
}

.form-row {
  width: 100%;
  padding-left: 12px;
  padding-right: 12px;
  display: flex;
  margin: 0px;
}

.form-option {
  font-size: 14px;
  margin-top: 6px;
  color: #b2b2b2;
}

.edit-input {
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
    title: String,
    collapseVisible: Boolean,
    foods: Array
  },
  data() {
    return {
      collapsed: false,
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
  methods: {
    async updateItem(food) {
      console.log(food);
      const res = await axios.post("/cabinet/userId/edit_item", food);
    }
  }
};
</script>
