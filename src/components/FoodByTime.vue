<template>
  <div class="food" :style="food.firstUse ? 'background-color: #f2f2f2;' : ''">
    <div class="type-icon">
      <img v-if="food.easyExpired" class="img2" src="img/type-easy-expired.png"/>
      <img v-else class="img" :src="foodTypeIconSrc"/>
    </div>
    <div class="text text-reduction">{{ food.nameZh }}</div>
    <div class="date" :style="food.easyExpired ? 'color: #27ab38;' : ''">{{ food.expirationDate }}</div>
    <img src="img/food-edit.png" class="edit" v-b-modal="(food.acquisitionDate + idx).toString()" @click="$emit('stop-update')"/>
    <b-modal v-model="modalShow" :id="(food.acquisitionDate + idx).toString()" title="編輯品項" @hidden="updateItem">
      <div class="row">
        <div class="option">名稱：</div>
        <input class="input" v-model="food.nameZh" type="text"/>
      </div>
      <div class="row">
        <div class="option">品項：</div>
        <select class="input" v-model="food.type">
          <option v-for="(option, idx) in options" :key="idx" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
      <div class="row">
        <div class="option">購買日期：</div>
        <input class="input" v-model="food.acquisitionDate" type="date"/>
      </div>
      <div class="row">
        <div class="option">保存期限：</div>
        <input class="input" v-model="food.expirationDate" type="date"/>
      </div>
      <img slot="modal-footer" class="btn" src="img/btn-fin.png" @click="modalShow = !modalShow; $emit('start-update')"/>
    </b-modal>
  </div>
</template>

<style lang="scss" scoped>
.food {
  width: 100%;
  height: 38px;
  padding-left: 10px;
  padding-top: 9px;
  background-color: #ffffff;
  display: flex;
  .type-icon {
    min-width: 70px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .img {
      max-height: 28px;
      margin-top: -2px;
    }
    .img2 {
      max-height: 16px;
      margin-top: 4px;
    }
  }
  .text {
    color: #848485;
    flex-grow: 1;
  }
  .date {
    padding-top: 1px;
    font-size: 14px;
    min-width: 80px;
    margin-right: 10px;
    color: #d0c8c8;
  }
  .edit {
    height: 15px;
    width: 15px;
    margin-top: 3px;
    margin-right: 20px;
    z-index: 1;
  }
}
.modal {
  .row {
    width: 100%;
    padding-left: 12px;
    padding-right: 12px;
    display: flex;
    margin: 0px;
  }
  .option {
    font-size: 14px;
    margin-top: 6px;
    color: #b2b2b2;
  }
  .input {
    border: 1px #dbdbdb solid;
    background-color: #ffffff;
    color: #878787;
    border-radius: 5px;
    height: 40px;
    width: 90%;
    margin-top: 6px;
    padding-left: 6px;
    outline: none;
    flex-grow: 1;
  }
  .btn {
    height: 37px;
    width: 57px;
    padding: 0px;
    margin-left: 6px;
  }
}
</style>

<script>
export default {
  props: {
    food: Object,
    idx: Number
  },
  data() {
    return {
      modalShow: false,
      options: [
        { value: "點心", text: "點心" },
        { value: "飲料", text: "飲料" },
        { value: "青菜", text: "青菜" },
        { value: "水果", text: "水果" },
        { value: "海鮮", text: "海鮮" },
        { value: "冷凍", text: "冷凍" },
        { value: "其他", text: "其他" },
        { value: "肉", text: "肉" }
      ]
    };
  },
  computed: {
    foodTypeIconSrc() {
      switch (this.food.type) {
        case "冷凍":
          return "img/type-frozen-food.png";
        case "飲料":
          return "img/type-drinks.png";
        case "青菜":
          return "img/type-vegetable.png";
        case "肉":
          return "img/type-meat.png";
        case "海鮮":
          return "img/type-seafood.png";
        case "點心":
          return "img/type-snack.png";
        case "水果":
          return "img/type-fruit.png";
        case "其他":
          return "img/type-others.png";
        default:
          return "img/type-others.png";
      }
    }
  },
  methods: {
    async updateItem() {
      this.food.easyExpired = false;
      await this.$axios.post(
        "/cabinet/userId/edit_item",
        this.food
      );
    }
  }
};
</script>