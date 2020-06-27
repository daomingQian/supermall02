import Vue from 'vue'
import Vuex from 'vuex'

import getters from "./getters.js"
import mutations from "./mutation.js"

Vue.use(Vuex)


const state = {
	listShop: []
}
export default new Vuex.Store({
  state,
  getters,
  mutations
})
