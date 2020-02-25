import axios from 'axios';
import Settings from '@/common/settings';

const state={
  usuario:null
};

const actions = {
  getUsers({dispatch,commit}){
    return axios.get(Settings.APIURL + 'api/getUsers').then((response) => {
      let res={
        'status':response.status,
        'data':response.data
      }
   
      return res;
    }).catch((error,error2) => {
      debugger;
      const customError={
        'status':404,
        'message':'Login incorrecto'
      }
      return customError;
    });
 },
 loginUser({dispatch,commit},data){
   
    const options={
      'email':data.email,
      'password':data.password
    }
    return axios.post(Settings.APIURL + 'api/login',options).then((response) => {
      debugger;

      let res={
        'status':response.status,
        'data':response.data
      }
      commit('setUser',response.data.usuario);
      return res;
    }).catch((error,error2) => {
      debugger;
      const customError={
        'status':404,
        'message':'Login incorrecto'
      }
      return customError;
    });
  }
};

const getters = {};

const mutations = {
  setUser(state, usuario) {
    state.usuario=usuario;
  }
};

export default  {
  namespaced: true,
  state,
  actions,
  mutations,
};
