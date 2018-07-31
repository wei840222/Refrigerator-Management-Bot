<template>
  <b-container>
    <b-card bg-variant="dark" text-variant="white" :title="type">
      <food-row v-for="food in foods" :key="food.id"  :id="food.id" :name="food.name">
    </b-card>
    <br/>
  </b-container>
</template>

<script>
import FoodRow from "~/components/ShoppingList/RecommendRow.vue";

export default {
  props: {
    type: String,
    foods: Array
  },
  components: {
    RecommendRow
  }
};
</script>
