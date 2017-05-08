import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);


global.Vue   = Vue;
global.axios = axios;
global.Vuex  = Vuex;
