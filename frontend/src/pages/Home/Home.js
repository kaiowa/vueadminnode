//import Header from '@/components/header';

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
  name: 'home',
  components: {

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
   this.$store.dispatch('web/getUsers');

  }
 
};
