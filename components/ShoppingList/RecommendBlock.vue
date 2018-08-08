<template>
  <div>
    <div class="title-recommend" v-b-toggle.recommend>
      <div class="title-text-recommend">建議清單</div>
    </div>
    <b-collapse visible id="recommend">
      <div class="recommend" v-for="rmd in recommend" :key="rmd.id">{{ rmd.name }}</div>
    </b-collapse>
  </div>
</template>

<style>
.title-recommend {
  height: 30px;
  width: 100%;
  background-color:#e3e2e2;
}
.title-text-recommend{
  padding-left: 40px;
  padding-top: 3px;
  color: #949394;
}
.recommend {
  width: 100%;
  padding-top: 2px;
  padding-left: 40px;
  color: #afafaf;
  background-color:#ededec;
}
</style>


<script>
export default {
  props: {
    recommend: Array
  }
};
</script>
