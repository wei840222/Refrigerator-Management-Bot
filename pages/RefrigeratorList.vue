<template>
  <div>
    <div class="title-bar-tab">
      <div class="title-item-tab" @click="tab = 'addList'" :style="{ 'color': tab === 'addList' ? '#000000' : '#aaaaaa', 'border-bottom': tab === 'addList' ? '#000000 2px solid' : '' }">近期新增</div>
      <div class="title-item-tab" @click="tab = 'refrigeratorList'" :style="{ 'color': tab === 'refrigeratorList' ? '#000000' : '#aaaaaa', 'border-bottom': tab === 'refrigeratorList' ? '#000000 2px solid' : '' }">我的冰箱</div>
    </div>
    <div style="position: fixed; z-index: -1; height: 100%; width: 100%; background-color: #f6f6f6;"/>
    <div v-if="tab === 'addList'" class="food-block">
      <food-block-by-time :title="'2018-08-07'" :collapseVisible="true" :foodData="data"/>
      <food-block-by-time :title="'2018-08-14'" :collapseVisible="false" :foodData="data"/>
      <food-block-by-time :title="'2018-08-21'" :collapseVisible="false" :foodData="data"/>
    </div>
    <div v-else class="food-block">
      <food-block :title="'快過期'" :titleBackground="'#d95a5a'" :collapseVisible="true" :foodData="data"/>
      <food-block :title="'已過期'" :titleBackground="'#afafaf'" :collapseVisible="false" :foodData="data"/>
      <food-block :title="'未過期'" :titleBackground="'#82bd51'" :collapseVisible="false" :foodData="data"/>
    </div>
  </div>
</template>

<script>
import FoodBlock from "~/components/RefrigeratorList/FoodBlock.vue";
import FoodBlockByTime from "~/components/RefrigeratorList/FoodBlockByTime.vue";

export default {
  head() {
    return {
      title: "冰箱"
    };
  },
  data() {
    return {
      tab: "addList",
      data: [
        {
          id: "1",
          type: "魚",
          buyTime: "2018-07-31",
          period: "2018-08-07",
          name: "鯛魚"
        },
        {
          id: "2",
          type: "魚",
          buyTime: "2018-07-31",
          period: "2018-08-07",
          name: "鯊魚"
        },
        {
          id: "3",
          type: "肉",
          buyTime: "2018-07-31",
          period: "2018-08-14",
          name: "牛五花"
        },
        {
          id: "4",
          type: "肉",
          buyTime: "2018-07-31",
          period: "2018-08-14",
          name: "梅花豬"
        },
        {
          id: "5",
          type: "肉",
          buyTime: "2018-07-31",
          period: "2018-08-14",
          name: "小羔羊"
        },
        {
          id: "7",
          type: "點心",
          buyTime: "2018-07-31",
          period: "2018-08-31",
          name: "巧克力"
        },
        {
          id: "8",
          type: "點心",
          buyTime: "2018-07-31",
          period: "2018-08-31",
          name: "棉花糖"
        },
        {
          id: "9",
          type: "點心",
          buyTime: "2018-07-31",
          period: "2018-08-31",
          name: "奶油餅"
        }
      ]
    };
  },
  components: {
    FoodBlock,
    FoodBlockByTime
  }
};
</script>
