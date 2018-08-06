<template>
  <div class="title-bar">
    <div class="title-item">全選</div>
    <div class="title-item">編輯</div>
    <div class="sort-option">
      <div class="option-text">品項</div>
    </div>
  </div>
</template>

<style>
.title-bar {
  padding-left: 40px;
  padding-right: 20px;
  display: flex;
  position: fixed;
  height: 40px;
  width: 100%;
  z-index: 1;
  background-color: #ffffff;
  box-shadow:0px 1px 2px rgba(20%,20%,40%,0.5);
}
.title-item {
  width: 40px;
  height: 20px;
  margin-top: 10px;
  color:#cbcdd4;
}
.sort-option {
  margin-top: 11px;
  height: 20px;
  width: 40px;
  border: #cbcdd4;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  text-align: center;
  margin-left: auto;
}
.option-text {
  font-size: 12px;
  color:#cbcdd4;
}
</style>
