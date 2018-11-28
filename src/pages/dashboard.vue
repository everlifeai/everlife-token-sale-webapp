<template>

  <v-layout column>
    <v-layout v-bind="binding" wrap class="details-section" v-show="aggregates.ever_amount>0">

      <v-flex xs12 sm4 class="pa-2">
          <v-card class="rounded-card">
            <v-card-title class="font-weight-bold text--darken-2 grey--text">Purchased Tokens</v-card-title>
            <v-divider ></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content class="subheading font-weight-bold text--darken-2 grey--text">{{ aggregates.ever_amount }} EVER</v-list-tile-content>
              </v-list-tile>
            </v-list>
         </v-card>
      </v-flex>

      <v-flex xs12 sm4 class="pa-2">
        <v-card class="rounded-card">
          <v-card-title class="font-weight-bold text--darken-2 grey--text">Bonus Tokens</v-card-title>
              <v-divider ></v-divider>
              <v-list dense>
                <v-list-tile>
                  <v-list-tile-content class="subheading font-weight-bold text--darken-2 grey--text">{{ aggregates.ever_bonus }} EVER</v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-card>
      </v-flex>

      <v-flex xs12 sm4 class="pa-2">
        <v-card class="rounded-card">
          <v-card-title class="font-weight-bold text--darken-2 grey--text">Total Tokens</v-card-title>
            <v-divider ></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content class="subheading font-weight-bold text--darken-2 grey--text">{{ aggregates.ever_total }} EVER</v-list-tile-content>
              </v-list-tile>
            </v-list>
         </v-card>

      </v-flex>
    </v-layout>

    <v-layout v-bind="binding" wrap class="details-section">
        <v-flex xs12 md8  class="pa-2">
        <v-card >
           <table>
           </tr>
              <tr>
                <td  class="pa-4">
                  <div  class="title">How it Works</div>
                  <div class="pt-4">You will be able to purchase EVER using XLM, ETH or BTC once your KYC is approved.  <BR/> <BR/></div>
                  Move the slider to select the amount of EVER you are looking to purchase. <BR/>
                  <!--<v-btn  color="secondary">FAQ / Learn More</v-btn>-->
                  <br/>
                </td>
                <td  class="pa-2"> <br/><iframe width="250" height="170" src="https://www.youtube.com/embed/A2DrqxT5M2c" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></td>
              </tr>
             </table>

        </v-card>
      </v-flex>
      <v-flex xs12 sm4 class="pa-2">
        <v-card>
              <div class="pa-4">
                <v-layout fill-height>
                  <v-flex xs12 align-end >
                    <div class="subheading">Purchase EVER</div>
                    <div class="pt-2 title text-xs-center font-weight-bold">{{ slider }} <span class="body-1 text-xs-center">EVER</span></div>
                    <div >
                      <v-flex class="px-5">
                        <v-slider
                          v-model="slider"
                          :max="max"
                          :min="min"
                        ></v-slider>
                      </v-flex>
                    </div>
                    <div>
                      <div class="px-5">
                        <v-btn block color="info" v-show="enablePurchase.enablePurchaseBtn" :to="{ name: 'payment', params: { amountEver: slider }}">Buy Now</v-btn>
                        <v-btn block  disabled v-show="!enablePurchase.enablePurchaseBtn">Buy Now</v-btn>
                      </div>
                    </div>
                  </v-flex>
                </v-layout>
              </div>
          </v-card>
      </v-flex>
    </v-layout>


    <v-layout v-bind="binding" wrap class="details-section">
      <v-flex xs12 sm12 class="pa-2">
        <v-card>
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex
              xs6
              sm6
              md3

                v-for="card in cards"
                v-bind="{ [`xs${card.flex}`]: true }"
                :key="card.title"
              >
                <v-card>
                  <v-container>
                      <v-img :src="card.src"  outline height="100px"></v-img>
                      <v-container fill-height fluid pa-3 text-xs-center>
                        <v-layout fill-height>
                          <v-flex xs12 align-end flexbox>
                            <span class="subheading font-weight-medium " v-text="card.ever">Ever</span>
                            <span class="subheading "> EVER</span>
                          </v-flex>
                        </v-layout>
                      </v-container>

                    <div class="px-3">
                        <v-btn btn-xs block color="info" dark v-show="enablePurchase.enablePurchaseBtn" :to="{ name: 'payment', params: { amountEver: card.ever }}">Buy Now</v-btn>
                        <v-btn block  disabled v-show="!enablePurchase.enablePurchaseBtn">Buy Now</v-btn>
                    </div>
                </v-container>
                </v-card>

              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout v-show="aggregates.ever_amount>0">
      <v-flex class="pa-2">
        <payment-table class="table" :payments="user.payments"></payment-table>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import PaymentTable from "../components/PaymentTable.vue";

export default {
  data() {
    return {
    min: 0,
        max: 1000000,
        slider: 10000,
        range: [0, 1000000],
      cards: [
        { src: 'https://everlife.ai/images/coin/ever-coin-1.png', flex: 3, ever:'250' },
        { src: 'https://everlife.ai/images/coin/ever-coin-2.png', flex: 3, ever:'1,000'  },
        { src: 'https://everlife.ai/images/coin/ever-coin-3.png', flex: 3, ever:'2,500'  },
        { src: 'https://everlife.ai/images/coin/ever-coin-4.png', flex: 3, ever:'5,000'  },
        { src: 'https://everlife.ai/images/coin/ever-coin-5.png', flex: 3, ever:'10,000'  },
        { src: 'https://everlife.ai/images/coin/ever-coin-6.png', flex: 3, ever:'25,000'  },
        { src: 'https://everlife.ai/images/coin/ever-coin-7.png', flex: 3, ever:'100,000'  },
        { src: 'https://everlife.ai/images/coin/ever-coin-8.png', flex: 3, ever:'500,000'  },


      ]
    }
  },
  computed: {
    ...mapGetters(["user","aggregates"]),

    enablePurchase: function () {
      if (this.user.kycStatus=="ACCEPT") {
        return { enablePurchaseBtn:true};
      }else{
        return {enablePurchaseBtn:false};
      }

    },
    binding() {
      const binding = {};
      if (this.$vuetify.breakpoint.mdAndUp) binding.row = true;
      else binding.column = true;
      return binding;
    }
  },
  methods: {
    getKycDetails() {
      if (this.user.kyc) {
        return {
          text: "Verified!",
          color: "green"
        };
      } else if (!this.user.kycDocs.document1) {
        return {
          text: "Documents not submited!",
          color: "red"
        };
      } else if (this.user.kycDocs.document1 && !this.user.kyc) {
        return {
          text: "Verifying!",
          color: "yellow"
        };
      }
    },
    isKycSubmitted() {
      if (this.user.kycDocs.document1) {
        return false;
      } else {
        return true;
      }
    }
  },
  beforeMount() {
    this.$store.dispatch("updateProfile");
  },
  components: {
    PaymentTable
  }
};
</script>
<style scoped>
.table {
  width: 100%;
}

.details-section {
  font-family: "PT Sans", sans-serif;
}

.rounded-card{
    border-radius:3px;
}

.THIS .table-test thead th span {
background-color: #16325c;
color: white}
</style>
