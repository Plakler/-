import { defineStore } from "pinia";
let useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false,
      refresh: false,
    }
  }
})
export default useLayOutSettingStore;