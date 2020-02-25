//import Header from '@/components/header';
import LoginForm from '@/components/loginform';

import { mapState } from 'vuex';
export default {
  metaInfo: {
    title: 'Home ddd',
    titleTemplate: '%s',
    htmlAttrs: {
      lang: 'en',
      amp: true,
    },
  },
  name: 'login',
  components: {
    LoginForm
  },
  computed: {
    ...mapState({
      //categories: state => state.web.categories
    })
  },
  data() {
    return {
      products:Array
    };
  },
  created(){
  
    
  },
  mounted() {
   console.log('mounted home');
  }
 
};
