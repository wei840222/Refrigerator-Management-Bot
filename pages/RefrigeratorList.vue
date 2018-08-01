<template>
  <b-container>
    <br/>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-btn block href="#" v-b-toggle.accordion1 variant="warning">快過期</b-btn>
      </b-card-header>
      <b-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <food-block :foods="data"/>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-btn block href="#" v-b-toggle.accordion2 variant="danger">已過期</b-btn>
      </b-card-header>
      <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <food-block :foods="data"/>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-btn block href="#" v-b-toggle.accordion3 variant="success">能吃</b-btn>
      </b-card-header>
      <b-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <food-block :foods="data"/>
        </b-card-body>
      </b-collapse>
    </b-card>
  </b-container>
</template>

<script>
import FoodBlock from "~/components/RefrigeratorList/FoodBlock.vue";

export default {
  head() {
    return {
      title: "冰箱"
    };
  },
  data () {
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
    }
  },
  components: {
    FoodBlock
  }
}
</script>
