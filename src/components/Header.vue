<template>
<div>
    <div class="header">
        <v-container class="my-0">
            <v-layout row align-content-space-between>
                <v-flex>
                <div v-if="!isSignIn">
                  <router-link  :to="{ name: 'login'}"<img alt="logo" src="/static/logo-full-white.png" srcset="/static/logo-full-white2x.png 2x"></router-link>
                  </div>
                <div v-else-if="isAdmin">
                  <router-link  :to="{ name: 'dashboard'}"><img alt="logo" src="/static/logo-full-white.png" srcset="/static/logo-full-white2x.png 2x"></router-link>
                  </div>
                  <div v-else>
                    <router-link  :to="{ name: 'reviewkyc'}"><img alt="logo" src="/static/logo-full-white.png" srcset="/static/logo-full-white2x.png 2x"></router-link>
                  </div>
                </v-flex>
                <v-flex>
                    <v-layout justify-end hidden-md-and-up>
                        <i class="fa fa-bars fa-2x white--text" @click.stop="drawer = !drawer"></i>
                    </v-layout>
                    <v-layout justify-end hidden-sm-and-down>
                            <v-btn href
                                router
                                :to="item.to"
                                :key="i"
                                v-for="(item, i) in items"
                                exact flat :ripple="false" dark
                                > {{item.title}} </v-btn>

                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
    <v-alert class="alert text-md-center caption" v-show="alert.show" :color="alert.color">
        <span>{{alert.text}}</span>
        <span>{{alert.reason}}</span>
        <span v-show="alert.rshow"><router-link  :to="{ name: 'kyc'}"  class="text-color:white">Proceed to Submit your KYC details</router-link></span>
        <br/>
      </v-alert>
    <div>

    </div>
    <v-navigation-drawer
        v-model="drawer"
        temporary dark
        absolute right
        class="drawer"
        >
        <v-list class="pt-0" dense>
            <v-divider></v-divider>
            <v-list-tile router :to="item.to" v-for="(item, i) in items" :key="i" exact>
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    <div class="header-angle-bg">
        <div class="overlay-bubble">
            <div class="overlay-bubble-1"></div>
            <div class="overlay-bubble-2"></div>
            <div class="overlay-bubble-3"></div>
            <div class="overlay-bubble-4"></div>
            <div class="overlay-bubble-5"></div>
            <div class="overlay-bubble-6"></div>
        </div>
        <vue-particles
            color="#dedede"
            :particleOpacity="0.7"
            :particlesNumber="80"
            shapeType="circle"
            :particleSize="4"
            linesColor="#dedede"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
        ></vue-particles>
    </div>


</div>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
    };
  },
  computed: {
      isAdmin: function () {
        return !this.$store.getters.isVerifier;
      },

      isSignIn: function(){
        return this.$store.getters.isLoggedIn;
      },

      alert: function () {
        if(this.$store.getters.isLoggedIn && !this.$store.getters.isVerifier){
          if (this.$store.getters.kycStatus=="ACCEPT") {
            return {show:false, enablePurchaseBtn:true};
          }else if(this.$store.getters.kycStatus=="REJECT"){
              if(this.$store.getters.kycDetails!=null){
                return {show:true,  rshow:true, enablePurchaseBtn:false, color:"error", text:"We regret to inform you that your KYC application was rejected.", rejshow:true, reason:'Reason : '+this.$store.getters.kycDetails};
              }
            return {show:true,  rshow:true, enablePurchaseBtn:false, color:"error", text:"We regret to inform you that your KYC application was rejected."};
          }else if(this.$store.getters.kycStatus=="PENDING"){
            return {show:true, rshow:false, enablePurchaseBtn:false, color:"warning", text:"Waiting for KYC approval, a notification e-mail will be sent once verification is complete."};
          }else{
              return {show:true, rshow:true, enablePurchaseBtn:false, color:"error", text:"Your KYC is Pending."};
          }
        }else{
            return {show:false, rshow:false, rejshow:false};
        }
      },

      items() {
          if(this.$store.getters.isLoggedIn){
            const idmStatus = this.$store.getters.idmStatus;
            const kycStatus = this.$store.getters.kycStatus;

            if(this.$store.getters.isVerifier){
              return [
                  { title: "Review Kyc", to: "/reviewkyc" },
                  { title: "Logout", to: "/logout" }
              ]
            }else if((idmStatus != null && idmStatus != "DECLINE")
              && (kycStatus!=null && kycStatus=="ACCEPT")){
              return [
                  { title: "Dashboard", to: "/dashboard" },
                  { title: "KYC", to: "/kyc" },
                  { title: "Payment", to: "/payment" },
                  { title: "Logout", to: "/logout" }
              ]
            }else if(idmStatus != null && idmStatus != "DECLINE"){
              return [
                  { title: "Dashboard", to: "/dashboard" },
                  { title: "KYC", to: "/kyc" },
                  { title: "Logout", to: "/logout" }
              ]
            }else{
                return [
                    { title: "KYC", to: "/kyc" },
                    { title: "Logout", to: "/logout" }
                ]
              }
          }
          return [
              { title: "Login", to: "/login" },
              { title: "Signup", to: "/signup" },
          ];
      }
  }
};
</script>


<style scoped>
.drawer {
    background-color: #111233 !important;
    /* height: 100%; */
}
.header {
    /* background-color: #3455ff; */
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background: transparent;
    width: 100%;
}

.header-angle-bg{
    position:absolute;
    left:0;
    top:0;
    height:80px;
    width:100%;
    content:'';
    overflow:hidden;
    z-index: 1;
    background-color: #3455ff;
}
.overlay-bubble{
    position:absolute;
    top:0;
    left:0;
    height:100%;
    width:100%
}
.overlay-bubble div{
    position:absolute;
    border-radius:50%;
    background:rgba(255,255,255,0.05);
    transform:skewY(-17deg)
}
.overlay-bubble-1{
    height:735px;
    width:735px;
    right:calc(50% - 65px);
    top:calc(50% + 10px)
}
.overlay-bubble-2{
    height:680px;
    width:680px;
    right:calc(50% + 360px);
    top:calc(50% - 145px)
}
.overlay-bubble-3{
    height:350px;
    width:350px;
    right:calc(50% - 95px);
    top:calc(50% + 540px)
}
.overlay-bubble-4{
    height:650px;
    width:650px;
    left:calc(50% + 435px);
    top:calc(50% - 240px)
}
.overlay-bubble-5{
    height:350px;
    width:350px;
    left:calc(50% + 490px);
    top:calc(50% + 240px)
}
.overlay-bubble-6{
    height:440px;
    width:440px;
    left:calc(50% + 685px);
    top:calc(50% + 240px)
}

.alert {
    position: absolute;
    top: 60px;
    left: 0;
    z-index: 3;
    width: 100%;
    height:10px
}
</style>
