<template>
  <div>
    <div class="food-title" v-b-toggle="title + 'collapse'" style="background-color: #eae8e8" @click="collapsed =!collapsed">
      <div class="food-title-text" style="color: #b7b7b8">{{ title }}</div>
      <img v-if="collapsed" src="arrow-down.png" class="food-title-icon"/>
      <img v-else src="arrow-up.png" class="food-title-icon"/>
    </div>
    <b-collapse :visible="collapseVisible" :id="title + 'collapse'">
      <div class="food-item" v-for="(food, idx) in foods" :key="idx">
        <b-badge variant="primary" class="food-item-type">{{ food.type }}</b-badge>
        <div class="food-item-text1">{{ food.nameZh }}</div>
        <div class="food-item-text3">{{ food.expirationDate }}</div>
        <img src="edit.png" class="food-item-del" v-b-modal="(food.acquisitionDate + idx).toString()"/>
        <b-modal :id="(food.acquisitionDate + idx).toString()" title="編輯品項" ok-only :ok-title="'完成'" @hidden="updateItem(food)">
          名稱：<br/>
          <b-form-input v-model="food.nameZh" type="text"></b-form-input><br/>
          品項：<br/>
          <b-form-input v-model="food.type" type="text"></b-form-input><br/>
          購買日期：<br/>
          <b-form-input v-model="food.acquisitionDate" type="date"></b-form-input><br/>
          保存期限：<br/>
          <b-form-input v-model="food.expirationDate" type="date"></b-form-input>
        </b-modal>
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

.food-item-type {
  height: 17px;
  margin-top: 3px;
  margin-right: 10px;
  z-index: 1;
}

.food-item-text1 {
  margin-top:-1px;
  flex-grow: 1;
  color: #8a8a8a;
}

.food-item-text3 {
  padding-top: 1px;
  font-size: 14px;
  margin-right: 50px;
  color: #d6cecd;
}

.food-item-del {
  height: 15px;
  width: 15px;
  margin-top: 3px;
  margin-right: 23px;
  z-index: 1;
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
      collapsed: false
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
