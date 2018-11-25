<template>
  <div>
    <div class="green-bar"/>
    <div class="tab">
      <div class="item" @click="tab = 'addList'" :style="{ 'color': tab === 'addList' ? '#000000' : '#aaaaaa', 'border-bottom': tab === 'addList' ? '#000000 2px solid' : '' }">近期新增</div>
      <div class="item" @click="tab = 'refrigeratorList'" :style="{ 'color': tab === 'refrigeratorList' ? '#000000' : '#aaaaaa', 'border-bottom': tab === 'refrigeratorList' ? '#000000 2px solid' : '' }">我的冰箱</div>
    </div>
    <div v-if="tab === 'addList'">
      <food-block v-for="(date, idx) in dates" :key="idx" :idx="idx"
        :collapseVisibleInit="idx === 0 ? true : false"
        :collapseUseable="refrigeratorListGroupByDate(date).length > 0 ? true : false"
        :style="idx === dates.length -1 ? 'margin-bottom: 21px;' : ''">
        <div slot="icon" class="icon-date">{{ date ? date.slice(8) : '' }}</div>
        <div slot="text" class="title-date">{{ date ? date.slice(0, 7).replace('-', '.') : '' }}</div>
        <img slot="arrow-down" src="img/arrow-gray-down.png"/>
        <img slot="arrow-up" src="img/arrow-gray-up.png"/>
        <food-by-time v-for="(food, idx) in refrigeratorListGroupByDate(date)" :key="idx" :idx="idx"
          :lastItem="idx === refrigeratorListGroupByDate(date).length - 1"
          :food="food" @stop-update="update = false" @start-update="update = true"/>
      </food-block>
    </div>
    <div v-else>
      <food-block :idx="1" :headerBackgroundColor="'#ED7879'" :collapseVisibleInit="true" :collapseUseable="foodsDying.length > 0 ? true : false">
        <img slot="icon" class="icon-img" src="img/foods-dying.png"/>
        <div slot="text" class="title">快過期</div>
        <img slot="arrow-down" src="img/arrow-white-down.png"/>
        <img slot="arrow-up" src="img/arrow-white-up.png"/>
        <food v-for="(food, idx) in foodsDying" :key="idx" :lastItem="idx === foodsDying.length - 1" :food="food" :foodColor="'#F47070'" @del-food="delFood"/>
      </food-block>
      <food-block :idx="2" :headerBackgroundColor="'#ADADAD'" :collapseVisibleInit="false" :collapseUseable="foodsDied.length > 0 ? true : false">
        <img slot="icon" class="icon-img" src="img/foods-died.png"/>
        <div slot="text" class="title">已過期</div>
        <img slot="arrow-down" src="img/arrow-white-down.png"/>
        <img slot="arrow-up" src="img/arrow-white-up.png"/>
        <food v-for="(food, idx) in foodsDied" :key="idx" :lastItem="idx === foodsDied.length - 1" :food="food" :foodColor="'#565656'" @del-food="delFood"/>
      </food-block>
      <food-block :idx="3" :headerBackgroundColor="'#9ACA55'" :collapseVisibleInit="false" :collapseUseable="foodsAlive.length > 0 ? true : false" style="margin-bottom: 21px;">
        <img slot="icon" class="icon-img" src="img/foods-alive.png"/>
        <div slot="text" class="title">未過期</div>
        <img slot="arrow-down" src="img/arrow-white-down.png"/>
        <img slot="arrow-up" src="img/arrow-white-up.png"/>
        <food v-for="(food, idx) in foodsAlive" :key="idx" :lastItem="idx === foodsAlive.length - 1" :food="food" :foodColor="'#65BE2B'" @del-food="delFood"/>
      </food-block>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.green-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 83.5px;
  background-color: #27ab38;
}
.tab {
  height: 40px;
  width: 100%;
  top: 0;
  display: flex;
  position: fixed;
  z-index: 10;
  background-color: #ffffff;
  box-shadow: 0px 1px 2px rgba(20%, 20%, 40%, 0.5);
  .item {
    margin-top: 10px;
    height: 28px;
    text-align: center;
    flex-grow: 1;
  }
}
.title-date {
  color: #6d6d6d;
  font-size: 19.6px;
}
.title {
  color: #ffffff;
  font-size: 19.6px;
}
.icon-date {
  text-align: center;
  margin-top: 14px;
  font-size: 26px;
  font-weight: bold;
  color: #27ab38;
}
.icon-img {
  height: 43px;
  width: 43px;
  margin: 10px;
}
</style>

<script>
import FoodBlock from "@/components/FoodBlock.vue";
import FoodByTime from "@/components/RefrigeratorList/FoodByTime.vue";
import Food from "@/components/RefrigeratorList/Food.vue";

export default {
  data() {
    const nowDate = new Date(Date.now())
      .toLocaleString("zh-TW", {
        timeZone: "Asia/Taipei",
        hour12: false
      })
      .split(" ")[0]
      .replace(/\//g, "-")
      .split("-");
    return {
      refrigeratorList: [],
      tab:
        this.$route.query.tab === "refrigeratorList"
          ? "refrigeratorList"
          : "addList",
      update: true,
      now:
        nowDate[0] +
        "-" +
        (nowDate[1].length === 1 ? "0" + nowDate[1] : nowDate[1]) +
        "-" +
        (nowDate[2].length === 1 ? "0" + nowDate[2] : nowDate[2])
    };
  },
  async mounted() {
    const response = await this.$axios.get(
      "/cabinet/userId/item_in_refrigerator"
    );
    response.data.refrigeratorList.forEach(element => {
      const date = new Date(
        new Date(element.acquisitionDate).getTime() +
          element.expirationDate * 24 * 60 * 60 * 1000
      )
        .toLocaleDateString("zh-TW")
        .replace(/\//g, "-")
        .split("-");
      element.expirationDate =
        date[0] +
        "-" +
        (date[1].length === 1 ? "0" + date[1] : date[1]) +
        "-" +
        (date[2].length === 1 ? "0" + date[2] : date[2]);
      if (element.firstUse) {
        this.$axios.post("/cabinet/userId/edit_item", {
          id: element.id,
          nameZh: element.nameZh,
          type: element.type,
          acquisitionDate: element.acquisitionDate,
          expirationDate: element.expirationDate,
          notify: element.notify,
          firstUse: false,
          easyExpired: element.easyExpired
        });
      }
    });
    this.refrigeratorList = response.data.refrigeratorList;
    setInterval(async () => {
      if (this.update) {
        const refrigeratorList = await this.$axios.get(
          "/cabinet/userId/item_in_refrigerator"
        );
        refrigeratorList.data.refrigeratorList.forEach(element => {
          try {
            element.firstUse = this.refrigeratorList.filter(
              item => item.id === element.id
            )[0].firstUse;
          } catch (err) {
            alert(err);
          }
          const date = new Date(
            new Date(element.acquisitionDate).getTime() +
              element.expirationDate * 24 * 60 * 60 * 1000
          )
            .toLocaleDateString("zh-TW")
            .replace(/\//g, "-")
            .split("-");
          element.expirationDate =
            date[0] +
            "-" +
            (date[1].length === 1 ? "0" + date[1] : date[1]) +
            "-" +
            (date[2].length === 1 ? "0" + date[2] : date[2]);
        });
        this.refrigeratorList = refrigeratorList.data.refrigeratorList;
      }
    }, 5000);
  },
  computed: {
    dates() {
      let dates = [];
      this.refrigeratorList.forEach(element => {
        if (!dates.includes(element.acquisitionDate))
          dates.push(element.acquisitionDate);
      });
      dates.sort((a, b) => a < b);
      return dates;
    },
    foodsDying() {
      const refrigeratorList = this.refrigeratorList;
      return refrigeratorList
        .filter(food => {
          const date =
            new Date(food.expirationDate).getTime() -
            new Date(this.now).getTime();
          if (date <= 604800000 && date >= 0)
            food.expirationDateString =
              Math.floor(date / 1000 / 60 / 60 / 24) === 0
                ? "今天過期"
                : "還剩" + Math.floor(date / 1000 / 60 / 60 / 24) + "天";
          return date <= 604800000 && date >= 0;
        })
        .sort((a, b) => {
          if (a.expirationDate > b.expirationDate) return 1;
          else if (a.expirationDate < b.expirationDate) return -1;
        });
    },
    foodsDied() {
      const refrigeratorList = this.refrigeratorList;
      return refrigeratorList
        .filter(food => {
          const date =
            new Date(food.expirationDate).getTime() -
            new Date(this.now).getTime();
          if (date < 0)
            food.expirationDateString =
              "過期" + Math.floor(-date / 1000 / 60 / 60 / 24) + "天";
          return date < 0;
        })
        .sort((a, b) => {
          if (a.expirationDate > b.expirationDate) return 1;
          else if (a.expirationDate < b.expirationDate) return -1;
        });
    },
    foodsAlive() {
      const refrigeratorList = this.refrigeratorList;
      return refrigeratorList
        .filter(food => {
          const date =
            new Date(food.expirationDate).getTime() -
            new Date(this.now).getTime();
          if (date > 604800000) food.expirationDateString = food.expirationDate;
          return date > 604800000;
        })
        .sort((a, b) => {
          if (a.expirationDate > b.expirationDate) return 1;
          else if (a.expirationDate < b.expirationDate) return -1;
        });
    }
  },
  methods: {
    refrigeratorListGroupByDate(date) {
      return this.refrigeratorList
        .filter(item => item.acquisitionDate === date)
        .sort((a, b) => {
          if (a.firstUse) return -1;
          else if (b.firstUse) return 1;
          else return 0;
        })
        .sort((a, b) => {
          if (a.easyExpired) return -1;
          else if (b.easyExpired) return 1;
        });
    },
    async delFood() {
      const res = await this.$axios.get("/cabinet/userId/item_in_refrigerator");
      res.data.refrigeratorList.forEach(element => {
        const date = new Date(
          new Date(element.acquisitionDate).getTime() +
            element.expirationDate * 24 * 60 * 60 * 1000
        )
          .toLocaleDateString("zh-TW")
          .replace(/\//g, "-")
          .split("-");
        element.expirationDate =
          date[0] +
          "-" +
          (date[1].length === 1 ? "0" + date[1] : date[1]) +
          "-" +
          (date[2].length === 1 ? "0" + date[2] : date[2]);
      });
      this.refrigeratorList = res.data.refrigeratorList;
    }
  },
  components: {
    FoodBlock,
    FoodByTime,
    Food
  }
};
</script>