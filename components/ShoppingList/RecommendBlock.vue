<template>
  <div>
    <div class="title-recommend" v-b-toggle.recommend>
      <div class="title-text-recommend">建議清單</div>
    </div>
    <b-collapse visible id="recommend">
      <b-form-checkbox
        class="recommend"
        v-for="rmd in recommend"
        :key="rmd.id"
        :id="rmd.id"
        v-model="rmd.select"
        :style="{ 'text-decoration':rmd.select ? 'line-through black' : '' }">
        {{ rmd.name }}
      </b-form-checkbox>
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
  padding-top: 5px;
  color: #949394;
}
.recommend {
  width: 100%;
  padding-top: 2px;
  padding-left: 63px;
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
