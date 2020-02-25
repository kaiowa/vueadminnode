<template>
  <div class="login-form">
    <div class="wrapper">
 <form
      novalidate
      @submit.prevent="validateUser"
      >

      <ul class="wrapper">
        
        <li class="form-row">
          
          <input
            id="email"
            v-model="form.email"
            placeholder="Email"
            type="email"
            name="email"
            autocomplete="email"

          >
          <div v-if="$v.form.email.$error" class="input-error">
            <span v-if="!$v.form.email.email">El email introducido no es válido</span>
            <span v-if="!$v.form.email.required">Campo requerido</span>
          </div>
        </li>

        <li class="form-row">
           <input
            id="password"
            v-model="form.password"
            placeholder="Password"
            type="password"
            name="password"
            autocomplete="password"
      	  >
          <div v-if="$v.form.password.$error" class="input-error">
            <span v-if="!$v.form.password.required">Campo requerido</span>
            <span v-if="!$v.form.password.minLength">Debe tener al menos 2 caracteres</span>
          </div>  

        </li>
        <li class="form-row">
          <button type="submit" >Login</button>
        </li>
        <li class="form-row row-error" v-if="errorLogin==true">
          <span class="error">{{textoError}}</span>
        </li>
      </ul>
    
      </form>
		</div>
  </div>
</template>
<script src="./loginform.js"></script>
<style lang="scss" scoped>
  @import "./loginform.scss";
</style>
