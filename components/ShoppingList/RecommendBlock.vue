<template>
  <div>
    <b-card bg-variant="dark" text-variant="white" :title="type">
      <recommend-row v-for="food in foods" :key="food.id"  :id="food.id" :name="food.name"/>
    </b-card>
    <br/>
  </div>
</template>

<script>
import RecommendRow from "~/components/ShoppingList/RecommendRow.vue";

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
