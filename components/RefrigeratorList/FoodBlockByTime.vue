<template>
  <div>
    <div class="food-title" v-b-toggle="title" style="background-color: #eae8e8" @click="collapsed =!collapsed">
      <div class="food-title-text" style="color: #b7b7b8">{{ title }}</div>
      <img v-if="collapsed" src="arrow-down.png" class="food-title-icon"/>
      <img v-else src="arrow-up.png" class="food-title-icon"/>
    </div>
    <b-collapse :visible="collapseVisible" :id="title">
      <div class="food-item" v-for="(food, idx) in foods" :key="idx">
        <b-badge variant="primary" class="food-item-type">{{ food.type }}</b-badge>
        <div class="food-item-text1">{{ food.nameZh }}</div>
        <div class="food-item-text3">{{ dateAdd(food.acquisitionDate, food.expirationDate) }}</div>
        <img src="edit.png" class="food-item-del"/>
      </div>
    </b-collapse>
  </div>
</template>

<script>
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
      return new Date(
        new Date(acquisitionDate).getTime() +
          expirationDate * 24 * 60 * 60 * 1000
      )
        .toLocaleDateString("zh-TW")
        .replace(/\//g, "-");
    }
  }
};
</script>
