import { validationMixin } from 'vuelidate';
import {
  required,
  email,
  minLength,
} from 'vuelidate/lib/validators';

export default {
  name: 'loginform',
  mixins: [validationMixin],
  data:()=>({
      errorLogin:{
        type:Boolean,
        value:false
      },
      textoError:String,
      form:{
        email:null,
        password:null
      }
  }),
  validations: {
    form: {
      password: {
        required,
        minLength:minLength(2)
      },
      email: {
        required,
        email
      }
    }
  },
  methods:{
    login(){
      console.log('login');
      this.$store.dispatch('web/loginUser',this.form).then((data)=>{
        debugger;
        if(data.status==200){
          this.$router.push({
            name: 'home',
          });
        }
        if(data.status!=200){
          this.errorLogin=true;
          this.textoError=data.message;
        }
        console.log(data);
      });
    },
    validateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.login();
      }
    },
    resetErrors(){
      console.log('reseto de los errores');
    }
  },
  created(){
    console.log('created banner');
  },
  mounted() {
   
   console.log('mounted banner');
  }
  
};
