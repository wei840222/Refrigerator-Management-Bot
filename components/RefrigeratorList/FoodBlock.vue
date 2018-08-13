<template>
  <div>
    <div class="food-title" v-b-toggle="title" :style="{ 'background-color': titleBackground }" @click="collapsed =!collapsed">
      <div class="food-title-text">{{ title }}</div>
      <img v-if="collapsed" src="arrow-down.png" class="food-title-icon"/>
      <img v-else src="arrow-up.png" class="food-title-icon"/>
    </div>
    <b-collapse :visible="collapseVisible" :id="title">
      <div class="food-item" v-for="(food, idx) in foods" :key="idx">
        <div class="food-item-text1">{{ food.nameZh }}</div>
        <div class="food-item-text2" :style="{ 'color': titleBackground }">{{ expirationDate(food.acquisitionDate, food.expirationDate) }}</div>
        <img src="del.png" class="food-item-del"/>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    titleBackground: String,
    collapseVisible: Boolean,
    foods: Array
  },
  data() {
    return {
      collapsed: false
    };
  },
  methods: {
    expirationDate(acquisitionDate, expirationDate) {
      const expiration_date =
        new Date(acquisitionDate).getTime() +
        expirationDate * 24 * 60 * 60 * 1000;
      const now = new Date(
        new Date(Date.now()).toLocaleString("zh-TW", {
          timeZone: "Asia/Taipei",
          hour12: false
        })
      ).getTime();
      if (expiration_date - now <= 604800000 && expiration_date - now >= 0)
        return (
          "剩" +
          Math.floor((expiration_date - now) / 1000 / 60 / 60 / 24) +
          "天"
        );
      else if (expiration_date - now < 0)
        return (
          "過期" +
          Math.floor((now - expiration_date) / 1000 / 60 / 60 / 24) +
          "天"
        );
      else {
        const date = new Date(expiration_date)
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
      }
    }
  }
};
</script>
