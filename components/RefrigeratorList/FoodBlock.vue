<template>
  <b-card-body>
    <food-row v-for="foodData in foods" :key="foodData.id" :id="foodData.id" :name="foodData.name" :type="foodData.type" :buyTime="foodData.buyTime" :period="foodData.period"/>
  </b-card-body>
</template>

<script>
import FoodRow from "~/components/RefrigeratorList/FoodRow.vue";

export default {
  props: {
    foods: Array
  },
  components: {
    FoodRow
  }
};
</script>
