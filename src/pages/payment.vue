<template>
  <v-layout column>
    <v-layout justify-center>
      <v-stepper v-model="step" class="modal">
        <v-stepper-header>
          <v-stepper-step :complete="step > 1" step="1">Your Stellar Account</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="step > 2" step="2">Select payment Option</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="step > 3" step="3">Payment</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card color="grey lighten-4" class="grey--text text--darken-3">
              <v-card-text>
                <v-layout column>
                  <div class="headline font-weight-bold">Purchase Amount :  {{ amountEver }} EVER</div>
                  <v-divider></v-divider>
                  <br/>
                  <div class="headline">Your Stellar Account</div>
                  <div>Choose which account in which to receive your EVER, once payment has been recieved, by entering your <b>public</b> account number.</div>
                  <br/>
                  <v-text-field solo v-model="destinationAccount"></v-text-field>
                  <div><b>This account must:</b></div>
                  <ol>
                    <li>Be under your control, i.e. you must be able to sign for it to access your EVER once the tokens have been transferred there.</li>
                    <li>Be active, i.e. have a minimum balance of XLM</li>
                    <li>Have an existing trust line to the asset EVER issued by GDRCJ5OJTTIL4VUQZ52PCZYAUINEH2CUSP5NC2R6D6WQ47JBLG6DF5TE</li>
                    <li>Follow Document <a href="https://medium.com/everlife-ai/how-to-accept-and-hold-ever-tokens-c249fa2dac70" target="_blank">click Here</a></li>
                  </ol>
                  <v-checkbox
                    v-model="secureCheck"
                    label="I understand that I'm responsible for entering a correct destination account into which the EVER tokens will be deposited once payment is received."
                    hide-details
                  ></v-checkbox>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-layout justify-end class="mt-4">
                  <v-btn @click="nextStep(2)" :disabled="!hasAcceptedStep1Terms" color="blue darken-2 white--text">Next ></v-btn>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card color="grey lighten-4" class="grey--text text--darken-3">
              <v-card-title primary-title>
                <div class="headline">Select Payment Option </div>

              </v-card-title>
              <v-card-actions>
                <v-container>
                  <v-layout column>
                    <div> Select which currency you want to pay your purchase with.</div>
                    <v-flex xs12 sm6 d-flex>
                      <v-select
                        :items="currencies"
                        v-model="selectedCurrency"
                        label="Select currency"
                        solo
                      ></v-select>
                    </v-flex>
                    <v-form v-show="selectedCurrency === 'XLM'">

                      <div> Enter the account <b>from</b> which your payment in XLM will be made. </div>
                      <v-text-field
                        light :solo="true"
                        v-model="xlmSourceAccount"
                        required
                      ></v-text-field>

                      <v-checkbox
                        v-model="secureCheck2"
                        label="I understand that i have to provide a source correct address for the payment to make it possible to match it against this purchase."
                        hide-details
                      ></v-checkbox>

                    </v-form>
                    <v-layout justify-end class="mt-5">
                      <v-btn @click="nextStep(3)" :disabled="!step2complete" color="blue darken-2 white--text">Next ></v-btn>
                    </v-layout>
                  </v-layout>
                </v-container>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card color="grey lighten-4" class="grey--text text--darken-3">
              <v-card-text>
                <v-layout column>
                  <v-card-text><vue-markdown v-if="paymentInstruction" :source="paymentInstruction"/></v-card-text>
                  <div v-show="paymentLink">
                    <v-layout column>
                      <v-btn :href="paymentLink" target="_blank" color="blue darken-2 white--text">Pay with CoinPayment</v-btn>
                      <v-card-text>This will open in a new window.</v-card-text>
                    </v-layout>
                  </div>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-layout justify-end class="mt-5">
                  <v-btn :to="{name: 'dashboard'}" color="blue darken-2 white--text">Done</v-btn>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

        </v-stepper-items>
      </v-stepper>
    </v-layout>

    <v-layout justify-center v-show="errorMessage">
      <v-card>
        <v-card-text class="red--text">{{errorMessage}}</v-card-text>
      </v-card>
    </v-layout>

  </v-layout>

</template>


<script>
  import VueMarkdown from 'vue-markdown'
  import axios from "../axios";
  import {
    getAccountBalance
  } from "../stellar/transaction";

  export default {
    data() {
      return {
        done: false,
        step: 0,
        amountEver: 0,
        destinationAccount: null,
        xlmSourceAccount: null,
        secureCheck: false,
        secureCheck2: false,
        errorOnContribute: "",
        selectedCurrency : null,
        currencies: ['BTC', 'ETH', 'XLM'],
        errorMessage: null,
        paymentInstruction: null,
        paymentLink: null
      };
    },
    created() {
        this.amountEver = this.$route.params.amountEver;
        if(this.$route.query.debug) {
            this.debug = this.$route.query.debug;
        }
    },

    mounted() {
    },

    methods: {
      async registerPurchase() {
        const everAsNumber = this.amountEver.replace(/[,\s]/g, '');
        const response = await axios.post("api/account/purchase", {
          "ever_amount": everAsNumber,
          "currency": this.selectedCurrency,
          "issue_to": this.destinationAccount,
          "source_ref": this.xlmSourceAccount
        });
        return response.data;
      },
      async nextStep(nextStep) {
        try {
          if (nextStep === 2) {
            //TODO: Check that the destination account is valid and has trustline
            const accountResponse = await getAccountBalance(this.destinationAccount);
            console.log(accountResponse);
          }
          if (nextStep === 3) {
            //TODO: Check that the source account is valid
            const paymentResponse = await this.registerPurchase();
            console.log(paymentResponse);
            this.paymentInstruction = paymentResponse.pay_instruction;
            this.paymentLink = paymentResponse.payment_link;
          }
          this.step = nextStep;
        } catch (e) {
          this.errorMessage = e.message;
        }
      }
    },
    computed: {
      paymentAmount() {
        return parseInt(this.xlmAmount) + 3;
      },
      hasAcceptedStep1Terms() {
        return this.secureCheck;
      },
      step2complete() {
        if (this.selectedCurrency) {
          if (this.selectedCurrency === 'XLM') {
            return this.secureCheck2;
          } else {
            return true;
          }
        } else {
          return false;
        }
      }
    },
    components: {
      vueMarkdown: VueMarkdown
    }
  };
</script>

<style scoped>
  .modal {
    width: 700px;
  }

  .termsCheck label {
    font-size: 10px;
  }
</style>

<style scoped child-component="label">
  label {
    font-size: 10px;
  }
</style>
