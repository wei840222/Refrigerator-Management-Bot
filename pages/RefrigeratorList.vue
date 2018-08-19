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
      <food-block :title="'快過期'" :titleBackground="'#d95a5a'" :foodColor="'#F47070'" :collapseVisible="true" :foods="foodsDying" :now="now" @delFood="delFood"/>
      <food-block :title="'已過期'" :titleBackground="'#afafaf'" :foodColor="'#565656'" :collapseVisible="false" :foods="foodsDied" :now="now" @delFood="delFood"/>
      <food-block :title="'未過期'" :titleBackground="'#82bd51'" :foodColor="'#65BE2B'" :collapseVisible="false" :foods="foodsAlive" :now="now" @delFood="delFood"/>
    </div>
  </div>
</template>

<style>
.title-bar-tab {
  height: 40px;
  width: 100%;
  display: flex;
  position: fixed;
  z-index: 10;
  background-color: #ffffff;
  box-shadow: 0px 1px 2px rgba(20%, 20%, 40%, 0.5);
}

.title-item-tab {
  margin-top: 10px;
  height: 28px;
  text-align: center;
  flex-grow: 1;
}

.food-block {
  position: relative;
  top: 40px;
  width: 100%;
}
</style>

<script>
import axios from "~/plugins/axios";
import FoodBlock from "~/components/RefrigeratorList/FoodBlock.vue";
import FoodBlockByTime from "~/components/RefrigeratorList/FoodBlockByTime.vue";

export default {
  async asyncData() {
    const refrigeratorList = await axios.get(
      "/cabinet/userId/item_in_refrigerator"
    );
    refrigeratorList.data.refrigeratorList.forEach(element => {
      const date = new Date(
        new Date(element.acquisitionDate).getTime() +
          element.expirationDate * 24 * 60 * 60 * 1000
      )
        .toLocaleDateString("zh-TW")
        .replace(/\//g, "-")
        .split("-");
      element.expirationDate =
        date[0] +
        "-" +
        (date[1].length === 1 ? "0" + date[1] : date[1]) +
        "-" +
        (date[2].length === 1 ? "0" + date[2] : date[2]);
    });
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
    const nowDate = new Date(Date.now())
      .toLocaleString("zh-TW", {
        timeZone: "Asia/Taipei",
        hour12: false
      })
      .split(" ")[0]
      .replace(/\//g, "-")
      .split("-");
    return {
      tab: "addList",
      now:
        nowDate[0] +
        "-" +
        (nowDate[1].length === 1 ? "0" + nowDate[1] : nowDate[1]) +
        "-" +
        (nowDate[2].length === 1 ? "0" + nowDate[2] : nowDate[2])
    };
  },
  computed: {
    dates() {
      let dates = [];
      this.refrigeratorList.forEach(element => {
        if (!dates.includes(element.acquisitionDate))
          dates.push(element.acquisitionDate);
      });
      dates.sort((a, b) => a > b);
      return dates;
    },
    foodsDying() {
      return this.refrigeratorList.filter(food => {
        const date =
          new Date(food.expirationDate).getTime() -
          new Date(this.now).getTime();
        if (date <= 604800000 && date >= 0)
          food.expirationDateString =
            "剩" + Math.floor(date / 1000 / 60 / 60 / 24) + "天";
        return date <= 604800000 && date >= 0;
      });
    },
    foodsDied() {
      return this.refrigeratorList.filter(food => {
        const date =
          new Date(food.expirationDate).getTime() -
          new Date(this.now).getTime();
        if (date < 0)
          food.expirationDateString =
            "過期" + Math.floor(-date / 1000 / 60 / 60 / 24) + "天";
        return date < 0;
      });
    },
    foodsAlive() {
      return this.refrigeratorList.filter(food => {
        const date =
          new Date(food.expirationDate).getTime() -
          new Date(this.now).getTime();
        if (date > 604800000) food.expirationDateString = food.expirationDate;
        return date > 604800000;
      });
    }
  },
  methods: {
    refrigeratorListGroupByDate(date) {
      return this.refrigeratorList.filter(
        item => item.acquisitionDate === date
      );
    },
    async delFood() {
      const res = await axios.get("/cabinet/userId/item_in_refrigerator");
      res.data.refrigeratorList.forEach(element => {
        const date = new Date(
          new Date(element.acquisitionDate).getTime() +
            element.expirationDate * 24 * 60 * 60 * 1000
        )
          .toLocaleDateString("zh-TW")
          .replace(/\//g, "-")
          .split("-");
        element.expirationDate =
          date[0] +
          "-" +
          (date[1].length === 1 ? "0" + date[1] : date[1]) +
          "-" +
          (date[2].length === 1 ? "0" + date[2] : date[2]);
      });
      this.refrigeratorList = res.data.refrigeratorList;
    }
  },
  components: {
    FoodBlock,
    FoodBlockByTime
  }
};
</script>
