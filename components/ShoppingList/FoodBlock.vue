<template>
  <div>
    <div class="title" v-b-toggle="foodData.type" :style="{ 'color': titleTextColor, 'background-color': titleBackground }">
      <div class="title-text">{{ foodData.type }}</div>
    </div>
    <b-collapse visible :id="foodData.type">
      <div class="food" v-for="food in foodData.foodArray" :key="food.id">{{ food.name }}</div>
    </b-collapse>
  </div>
</template>

<style>
.title {
  height: 30px;
  width: 100%;
}
.title-text{
  padding-left: 40px;
  padding-top: 3px;
}
.food {
  width: 100%;
  padding-top: 2px;
  padding-left: 40px;
  background-color:#f6f6f6;
}
.edit {
  width: 100%;
  padding-top: 2px;
  padding-left: 40px;
  background-color:#f6f6f6;
}
</style>


<script>
export default {
  props: {
    foodData: Object,
    edit: Boolean
  },
  computed: {
    titleBackground() {
      switch (this.foodData.type) {
        case "菜":
          return "#82db51";
        case "肉":
          return "#c29279";
        case "魚":
          return "#69b2c3";
        case "魚":
          return "#69b2c3";
        case "建議":
          return "#e3e2e2";
        default:
          return "#ffffff";
      }
    },
    titleTextColor(){
      if (this.foodData.type == '建議') return '#949394'
      else return "#ffffff";
    }
  }
};
</script>
