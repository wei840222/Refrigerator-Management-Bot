<template>
  <div>
    <div class="title-bar-tab">
      <div class="title-item-tab" @click="tab = 'addList'" :style="{ 'color': tab === 'addList' ? '#000000' : '#aaaaaa', 'border-bottom': tab === 'addList' ? '#000000 2px solid' : '' }">近期新增</div>
      <div class="title-item-tab" @click="tab = 'refrigeratorList'" :style="{ 'color': tab === 'refrigeratorList' ? '#000000' : '#aaaaaa', 'border-bottom': tab === 'refrigeratorList' ? '#000000 2px solid' : '' }">我的冰箱</div>
    </div>
    <div v-if="tab === 'addList'">
      近期新增
    </div>
    <div v-else>
      我的冰箱
    </div>
  </div>
</template>

<script>
import FoodBlock from "~/components/RefrigeratorList/FoodBlock.vue";

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
          type: "菜",
          buyTime: "2018-07-31",
          period: "2018-08-07",
          name: "高麗菜"
        },
        {
          id: "2",
          type: "菜",
          buyTime: "2018-07-31",
          period: "2018-08-07",
          name: "花菜"
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
    FoodBlock
  }
};
</script>
