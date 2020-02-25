export default {
  metaInfo: {
    title: 'HOme',
    titleTemplate: '%s',
    htmlAttrs: {
      lang: 'es',
      amp: true,
    },
  },

  components: {
   
  },
  computed: {
    isHome() {
      return (this.$route.name === 'home' && this.$route );
    }
  },
  methods: {
   
  },
  mounted(){
   console.log('Mounted App');
   
  },
};
