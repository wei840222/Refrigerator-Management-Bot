<template>
  <b-container>
    <br/>
    <b-button v-b-modal="'add'" @click="beforeAddItem">新增</b-button>
    <b-modal id="add" title="新增品項" @ok="addItem">
      名稱：<br/>
      <b-form-input v-model="newItem.name" type="text"></b-form-input><br/>
      品項：<br/>
      <b-form-input v-model="newItem.type" type="text"></b-form-input><br/>
      購買日期：<br/>
      <b-form-input v-model="newItem.buyTime" type="date"></b-form-input><br/>
      保存期限：<br/>
      <b-form-input v-model="newItem.period" type="date"></b-form-input>
    </b-modal>
    <br/>
    <br/>
    <food-row v-for="foodData in data" :key="foodData.id" :id="foodData.id" :name="foodData.name" :type="foodData.type" :buyTime="foodData.buyTime" :period="foodData.period"/>
  </b-container>
</template>

<script>
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
  data() {
    return {
      newItem: {
        id: 10,
        type: null,
        buyTime: null,
        period: null,
        name: null
      }
    };
  },
  methods: {
    beforeAddItem() {
      this.newItem.type = null;
      this.newItem.buyTime = null;
      this.newItem.period = null;
      this.newItem.name = null;
    },
    addItem() {
      this.newItem.id++;
      this.data.push(this.newItem);
    }
  },
  components: {
    FoodRow
  }
};
</script>
