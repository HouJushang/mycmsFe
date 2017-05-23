/**
 * Created by hou on 2017/4/17.
 */
import Vue from 'vue'
import Vuex from 'vue'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex);

const state ={
    menu: {},
}
const getters = {

}
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})