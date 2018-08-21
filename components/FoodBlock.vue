<template>
  <div class="food-block" :id="'food-block' + idx">
    <div class="header" @click="collapseChange">
      <div class="icon"><slot name="icon"/></div>
      <div class="text">{{ title }}</div>
      <div v-if="collapseUseable">
        <div v-if="collapseVisible" class="arrow"><slot name="arrow-down"/></div>
        <div v-else class="arrow"><slot name="arrow-up"/></div>
      </div>
    </div>
    <b-collapse class="content" :id="title" :visible="collapseVisible" :style="boxShadow" @shown="changeBoxShadow(true)"><slot/></b-collapse>
    <div class="footer"><slot name="footer"/></div>
  </div>
</template>

<style lang="scss" scoped>
.food-block {
  position: relative;
  top: 40px;
  width: 100%;
  margin-top: 21px;
  padding-right: 16.8px;
  padding-left: 54.3px;

  .header {
    width: 100%;
    display: flex;
    flex-direction: row;
    border-radius: 10px 10px 0 0;
    background-color: #ffffff;
    box-shadow: 2px 2px 1px #8a8a8a;
    z-index: 1;

    .icon {
      height: 63px;
      width: 63px;
      margin-left: -28px;
      margin-top: 10px;
      border-radius: 31.5px;
      box-shadow: 2px 2px 1px #8a8a8a;
      background-color: #ffffff;
      z-index: 2;
    }

    .text {
      margin-left: 20px;
      margin-top: 21.6px;
      margin-bottom: 21.6px;
      flex-grow: 1;
      color: #6d6d6d;
      font-size: 19.6px;
    }

    .arrow {
      height: 12px;
      width: 21px;
      margin-top: 25px;
      margin-right: 17.6px;
    }
  }

  .content {
    width: 100%;
    background-color: #ffffff;
    z-index: 0;
  }

  .footer {
    width: 100%;
    min-height: 10px;
    background-color: #ffffff;
    border-radius: 0 0 10px 10px;
    box-shadow: 2px 2px 1px#8a8a8a;
    z-index: 3;
  }
}
</style>

<script>
import jump from "jump.js";
import { setTimeout } from "timers";

export default {
  props: {
    idx: Number,
    title: String,
    collapseVisibleInit: Boolean,
    collapseUseable: Boolean
  },
  created() {
    this.changeBoxShadow(true);
  },
  data() {
    return {
      collapseVisible: this.collapseVisibleInit,
      boxShadow: ""
    };
  },
  methods: {
    collapseChange() {
      if (this.collapseUseable) {
        this.changeBoxShadow(false);
        this.collapseVisible = !this.collapseVisible;
        if (this.collapseVisible)
          jump("#food-block" + this.idx, { offset: -53.1 });
      }
    },
    changeBoxShadow(status) {
      if (status) this.boxShadow = "box-shadow: 2px 2px 1px #8a8a8a";
      else this.boxShadow = "";
    }
  }
};
</script>
