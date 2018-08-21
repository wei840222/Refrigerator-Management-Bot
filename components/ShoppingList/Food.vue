<template>
  <div class="food" :style="!edit && lastItem ? 'height: 28px;' : ''">
    <img v-if="food.selected" src="img/ShoppingList/check-box-act.png" class="check-box" @click="selecteFood"/>
    <img v-else src="img/ShoppingList/check-box.png" class="check-box" @click="selecteFood"/>
    <div class="text" :style="food.selected ? 'text-decoration: line-through black' : ''" @click="selecteFood">{{ food.nameZh }}</div>
    <img v-if="edit" src="img/ShoppingList/food-del.png" class="del" @click="delFood"/>
  </div>
</template>

<style lang="scss" scoped>
.food {
  width: 100%;
  height: 38px;
  padding-left: 40px;
  padding-top: 9px;
  color: #8a8a8a;
  background-color: #ffffff;
  box-shadow: 1px 2px 2px #8a8a8a;
  display: flex;

  .check-box {
    height: 14px;
    width: 14px;
    margin-top: 4px;
    margin-right: 10px;
  }

  .text {
    flex-grow: 1;
  }

  .del {
    height: 15px;
    width: 15px;
    margin-top: 3px;
    margin-right: 23px;
    z-index: 1;
  }
}
</style>

<script>
export default {
  props: {
    lastItem: Boolean,
    edit: Boolean,
    food: Object
  },
  methods: {
    selecteFood() {
      this.$emit("selecte-food", this.food);
      this.food.selected = !this.food.selected;
    },
    delFood() {
      this.$emit("del-food", this.food);
    }
  }
};
</script>
