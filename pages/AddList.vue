<template>
  <b-container>
    <br/>
    <title-bar @add-item="addItem"/>
    <br/>
    <food-row v-for="foodData in data" :key="foodData.id" :id="foodData.id" :name="foodData.name" :type="foodData.type" :buyTime="foodData.buyTime" :period="foodData.period"/>
  </b-container>
</template>

<script>
import TitleBar from "~/components/AddList/TitleBar.vue";
import FoodRow from "~/components/AddList/FoodRow.vue";

export default {
  head() {
    return {
      title: "新增清單"
    };
  },
  async asyncData() {
    return {
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
  methods: {
    addItem(item) {
      this.data.push(item);
    }
  },
  components: {
    TitleBar,
    FoodRow
  }
};
</script>
