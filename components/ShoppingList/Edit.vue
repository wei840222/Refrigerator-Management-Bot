<template>
  <div class="edit">
    <img src="img/ShoppingList/food-add.png" class="add"/>
    <div class="input-box">
      <input class="input" type="text" placeholder="新增" v-model="nameZh" @change="addFood" @focus="showAddFin = true" @blur="showAddFin = false"/>
    </div>
    <img v-if="showAddFin" src="img/ShoppingList/food-add-fin.png" class="fin" @click="addFood"/>
  </div>
</template>

<style lang="scss" scoped>
.edit {
  width: 100%;
  height: 40px;
  padding-left: 38px;
  color: #d2d6da;
  background-color: #ffffff;
  box-shadow: 2px 2px 1px#8a8a8a;
  border-top: 1px #e8e8e8 dashed;
  border-radius: 0 0 10px 10px;
  display: flex;
  z-index: 1;

  .add {
    height: 17px;
    width: 17px;
    margin-top: 11px;
    margin-right: 8px;
    z-index: 2;
  }

  .input-box {
    flex-grow: 1;
  }

  .input {
    border-width: 0px;
    height: 30px;
    width: 100px;
    margin-left: 0px;
    margin-top: 4px;
    margin-right: 10px;
    caret-color: #cdd2d6;
    color: #cdd2d6;
    background-color: #ffffff;
    outline: none;
  }

  .fin {
    height: 20px;
    width: 48px;
    min-width: 48px;
    margin-top: 9px;
    margin-right: 17.6px;
    z-index: 2;
  }
}
</style>

<script>
export default {
  props: {
    type: String
  },
  data() {
    return {
      nameZh: "",
      showAddFin: false
    };
  },
  methods: {
    addFood() {
      this.$parent.$parent.$refs[this.type][0].collapseVisible = true;
      this.$emit("add-food", { nameZh: this.nameZh, type: this.type });
      this.nameZh = "";
    }
  }
};
</script>
