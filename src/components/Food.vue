<template>
  <div class="food">
    <div class="text text-reduction">{{ food.nameZh }}</div>
    <div class="date" :style="{ 'color': foodColor }">{{ food.expirationDateString }}</div>
    <img class="del" src="img/food-del.png" @click="delFood"/>
  </div>
</template>

<style lang="scss" scoped>
.food {
  width: 100%;
  height: 38px;
  padding-left: 20px;
  padding-top: 9px;
  color: #8a8a8a;
  background-color: #ffffff;
  display: flex;
  .text {
    margin-top: -1px;
    flex-grow: 1;
    color: #8a8a8a;
  }
  .date {
    padding-top: 1px;
    min-width: 80px;
    font-size: 14px;
    margin-right: 10px;
    text-align: left;
  }
  .del {
    height: 15px;
    width: 15px;
    margin-top: 3px;
    margin-right: 20px;
    z-index: 1;
  }
}
</style>

<script>
export default {
  props: {
    food: Object,
    foodColor: String
  },
  methods: {
    async delFood() {
      const res = await this.$axios.post(
        "/cabinet/userId/delete_item_from_shoppingist",
        {
          id: this.food.id,
          nameZh: this.food.nameZh,
          type: this.food.type
        }
      );
      if (res.status === 200) this.$emit("del-food");
    }
  }
};
</script>