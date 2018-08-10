<template>
  <div>
    <div class="recommend-title" v-b-toggle.recommend @click="collapsed =!collapsed">
      <div class="recommend-title-text">建議清單</div>
      <img v-if="collapsed" src="arrow-down.png" class="food-title-icon"/>
      <img v-else src="arrow-up.png" class="food-title-icon"/>
    </div>
    <b-collapse visible id="recommend">
      <div class="recommend-item" v-for="rmd in recommend" :key="rmd.id" @click="rmd.select = !rmd.select">
        <img v-if="rmd.select" src="ckeck-box-act.png" class="food-item-check-box"/>
        <img v-else src="check-box.png" class="food-item-check-box"/>
        <div :style="{ 'flex-grow': 1, 'text-decoration': rmd.select ? 'line-through black' : '' }">{{ rmd.name }}</div>
        <img v-if="edit" src="del.png" class="food-item-del"/>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  props: {
    recommend: Array
  },
  data() {
    return {
      collapsed: false
    };
  }
};
</script>
