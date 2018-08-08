<template>
  <div>
    <div class="title" v-b-toggle.recommend>
      <div class="title-text">建議清單</div>
    </div>
    <b-collapse visible id="recommend">
      <div class="food" v-for="food in foodData" :key="food.id">{{ food.name }}</div>
    </b-collapse>
  </div>
</template>

<style>
.title {
  height: 30px;
  width: 100%;
  color: #949394;
  background-color: #e3e2e2;
}
.title-text {
  padding-left: 40px;
  padding-top: 3px;
}
.food {
  width: 100%;
  padding-top: 2px;
  padding-left: 40px;
  background-color: #f6f6f6;
}
.edit {
  width: 100%;
  padding-top: 2px;
  padding-left: 40px;
  background-color: #f6f6f6;
}
</style>


<script>
export default {
  props: {
    foodData: Array
  }
};
</script>
