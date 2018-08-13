<template>
  <div>
    <div class="title-bar-tab">
      <div class="title-item-tab" @click="tab = 'addList'" :style="{ 'color': tab === 'addList' ? '#000000' : '#aaaaaa', 'border-bottom': tab === 'addList' ? '#000000 2px solid' : '' }">近期新增</div>
      <div class="title-item-tab" @click="tab = 'refrigeratorList'" :style="{ 'color': tab === 'refrigeratorList' ? '#000000' : '#aaaaaa', 'border-bottom': tab === 'refrigeratorList' ? '#000000 2px solid' : '' }">我的冰箱</div>
    </div>
    <div style="position: fixed; z-index: -1; height: 100%; width: 100%; background-color: #f6f6f6;"/>
    <div v-if="tab === 'addList'" class="food-block">
      <food-block-by-time v-for="(date, idx) in dates" :key="idx" :title="date" :collapseVisible="idx === 0 ? true : false" :foods="refrigeratorListGroupByDate(date)"/>
    </div>
    <div v-else class="food-block">
      <food-block :title="'快過期'" :titleBackground="'#d95a5a'" :collapseVisible="true" :foods="foodsDying"/>
      <food-block :title="'已過期'" :titleBackground="'#afafaf'" :collapseVisible="false" :foods="foodsDied"/>
      <food-block :title="'未過期'" :titleBackground="'#82bd51'" :collapseVisible="false" :foods="foodsAlive"/>
    </div>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
import FoodBlock from "~/components/RefrigeratorList/FoodBlock.vue";
import FoodBlockByTime from "~/components/RefrigeratorList/FoodBlockByTime.vue";

export default {
  async asyncData() {
    const refrigeratorList = await axios.get(
      "/cabinet/userId/item_in_refrigerator"
    );
    return {
      refrigeratorList: refrigeratorList.data.refrigeratorList
    };
  },
  head() {
    return {
      title: "冰箱"
    };
  },
  data() {
    return {
      tab: "addList",
      now: new Date(
        new Date(Date.now()).toLocaleString("zh-TW", {
          timeZone: "Asia/Taipei",
          hour12: false
        })
      ).getTime()
    };
  },
  computed: {
    dates() {
      let dates = [];
      this.refrigeratorList.forEach(element => {
        if (!dates.includes(element.acquisitionDate))
          dates.push(element.acquisitionDate);
      });
      return dates;
    },
    foodsDying() {
      return this.refrigeratorList.filter(item => {
        const expirationDate =
          new Date(item.acquisitionDate).getTime() +
          item.expirationDate * 24 * 60 * 60 * 1000;
        return (
          expirationDate - this.now <= 604800000 &&
          expirationDate - this.now >= 0
        );
      });
    },
    foodsDied() {
      return this.refrigeratorList.filter(item => {
        const expirationDate =
          new Date(item.acquisitionDate).getTime() +
          item.expirationDate * 24 * 60 * 60 * 1000;
        return expirationDate - this.now < 0;
      });
    },
    foodsAlive() {
      return this.refrigeratorList.filter(item => {
        const expirationDate =
          new Date(item.acquisitionDate).getTime() +
          item.expirationDate * 24 * 60 * 60 * 1000;
        return expirationDate - this.now > 604800000;
      });
    }
  },
  methods: {
    refrigeratorListGroupByDate(date) {
      return this.refrigeratorList.filter(
        item => item.acquisitionDate === date
      );
    }
  },
  components: {
    FoodBlock,
    FoodBlockByTime
  }
};
</script>
