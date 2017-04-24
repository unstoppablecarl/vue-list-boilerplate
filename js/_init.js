import _ from 'lodash';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

global._     = _;
global.Vue   = Vue;
global.axios = axios;
global.Vuex  = Vuex;
