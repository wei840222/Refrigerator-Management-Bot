<template>
  <div class="food-block">
    <div class="header">
      <div class="icon"><slot name="icon"/></div>
      <div class="text"><slot name="text"/></div>
      <div class="arrow"><slot name="arrow"/></div>
    </div>
    <div class="content"><slot/></div>
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
    box-shadow: 2px 2px 2px #8a8a8a;
    z-index: 1;

    .icon {
      height: 63px;
      width: 63px;
      margin-left: -28px;
      margin-top: 10px;
      border-radius: 31.5px;
      box-shadow: 2px 2px 2px #8a8a8a;
      background-color: #ffffff;
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
    border-radius: 0 0 10px 10px;
    box-shadow: 2px 2px 2px#8a8a8a;
  }
}
</style>
