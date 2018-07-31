<template>
  <b-container>
    <b-card :title="type">
      <food-row v-for="food in foods" :key="food.id"  :id="food.id" :name="food.name"/>
    </b-card>
    <br/>
  </b-container>
</template>

<script>
import FoodRow from "~/components/ShoppingList/FoodRow.vue";

export default {
  props: {
    type: String,
    foods: Array
  },
  components: {
    FoodRow
  }
};
</script>
