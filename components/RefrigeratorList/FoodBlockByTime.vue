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
        <div class="food-item-text3">{{ dateAdd(food.acquisitionDate, food.expirationDate) }}</div>
        <img src="edit.png" class="food-item-del" v-b-modal="(food.acquisitionDate + idx).toString()"/>
        <b-modal :id="(food.acquisitionDate + idx).toString()" title="編輯品項" ok-only :ok-title="'完成'" @hidden="updateItem(food)">
          名稱：<br/>
          <b-form-input v-model="food.nameZh" type="text"></b-form-input><br/>
          品項：<br/>
          <b-form-input v-model="food.type" type="text"></b-form-input><br/>
          購買日期：<br/>
          <b-form-input v-model="food.acquisitionDate" type="date"></b-form-input><br/>
          保存期限（天）：<br/>
          <b-form-input v-model="food.expirationDate" type="number"></b-form-input>
        </b-modal>
      </div>
    </b-collapse>
  </div>
</template>

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
    dateAdd(acquisitionDate, expirationDate) {
      const date = new Date(
        new Date(acquisitionDate).getTime() +
          expirationDate * 24 * 60 * 60 * 1000
      )
        .toLocaleDateString("zh-TW")
        .replace(/\//g, "-")
        .split("-");
      return (
        date[0] +
        "-" +
        (date[1].length === 1 ? "0" + date[1] : date[1]) +
        "-" +
        (date[2].length === 1 ? "0" + date[2] : date[2])
      );
    },
    async updateItem(food) {
      const data = {
        id: food.id,
        nameZh: food.nameZh,
        type: food.type,
        acquisitionDate: food.acquisitionDate,
        expirationDate: this.dateAdd(food.acquisitionDate, food.expirationDate)
      };
      const res = await axios.post("/cabinet/userId/edit_item", data);
    }
  }
};
</script>
