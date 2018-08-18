<template>
  <div>
    <div v-for="(food, idx) in foods" :key="idx">
      <div class="title-bar">
        <div class="title-text">{{ food.title }}</div>
      </div>
      <div class="form-option">名稱：</div>
      <input class="edit-input" v-model="food.nameZh" type="text"/>
      <div class="form-option">品項：</div>
      <input class="edit-input" v-model="food.type" type="text"/>
      <div class="form-option">購買日期：</div>
      <input class="edit-input" v-model="food.acquisitionDate" type="date"/>
      <div class="form-option">保存期限：</div>
      <input class="edit-input" v-model="food.expirationDate" type="date"/>
      <br/><br/>
    </div>
    <div class="btn-row">
      <img class="btn" src="addBtn.png" @click="addFood"/>
      <img class="btn" src="addFinBtn.png" @click="addFoodToDB"/>
    </div>
  </div>
</template>

<style>
.title-bar {
  height: 40px;
  width: 100%;
  display: flex;
  border-top: 1px #d1d1d1 solid;
  border-bottom: 1px #d1d1d1 solid;
  background-color: #f4f4f4;
}

.title-text {
  font-size: 16px;
  margin-left: 12px;
  margin-top: 6px;
  color: #7e7e7f;
}

.form-option {
  font-size: 14px;
  margin-left: 12px;
  margin-top: 6px;
  color: #b2b2b2;
}

.edit-input {
  border: 1px #dbdbdb solid;
  background-color: #ffffff;
  border-radius: 5px;
  height: 30px;
  width: 90%;
  margin-top: 6px;
  margin-left: 12px;
  outline: none;
}

.btn-row {
  width: 100%;
  margin-top: -20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.btn {
  height: 42px;
  width: 65px;
  margin-right: 8px;
  margin-left: -30px;
}
</style>

<script>
import axios from "~/plugins/axios";

export default {
  head() {
    return {
      title: "新增清單"
    };
  },
  data() {
    const nowDateArray = new Date(Date.now())
      .toLocaleString("zh-TW", {
        timeZone: "Asia/Taipei",
        hour12: false
      })
      .split(" ")[0]
      .split("/");
    const nowDate =
      nowDateArray[0] +
      "-" +
      (nowDateArray[1].length === 1 ? "0" + nowDateArray[1] : nowDateArray[1]) +
      "-" +
      (nowDateArray[2].length === 1 ? "0" + nowDateArray[2] : nowDateArray[2]);
    return {
      nowDate: nowDate,
      foods: [
        {
          title: "品項 1",
          nameZh: "",
          type: "",
          acquisitionDate: nowDate,
          expirationDate: ""
        }
      ]
    };
  },
  methods: {
    addFood() {
      this.foods.push({
        title: "品項 " + (this.foods.length + 1),
        nameZh: "",
        type: "",
        acquisitionDate: this.nowDate,
        expirationDate: ""
      });
    },
    async addFoodToDB() {
      this.foods.forEach(food => {
        axios.post("/cabinet/userId/add_item", {
          nameZh: food.nameZh,
          type: food.type,
          expirationDate: food.expirationDate
        });
      });
      this.foods = [];
      this.addFood();
    }
  }
};
</script>
