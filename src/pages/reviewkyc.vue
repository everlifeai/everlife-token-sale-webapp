<template>
  <v-data-table
    :headers="headers"
    :items="items"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="">{{ props.item.name}}</td>
      <td class="">{{ props.item.email}}</td>
      <td class="">{{ props.item.phone}}</td>
      <td class="">{{ props.item.createdAt | formatDate}}</td>
      <td class="text-xs-center">{{ props.item.address}}</td>
      <td class="text-xs-center">{{ props.item.idmStatus}}</td>
      <td class="text-xs-center">
        <span v-if="props.item.kycStatus=='ACCEPT'"><v-chip small  color="green" text-color="white">Accept</v-chip></span>
        <span v-else-if="props.item.kycStatus=='REJECT'"><v-chip small  color="red" text-color="white">Reject</v-chip></span>
        <span v-else-if="props.item.kycStatus=='PENDING'"><v-chip small color="orange" text-color="white">Pending</v-chip></span>


      </td>
      <td >
        <figure class="half" style="display:flex">
          <img v-img="{ cursor: 'zoom-in' }" :src="props.item.kycDocs.document2" width="50" height="40" class="mr-2" style="margin-top:7px">
          <img v-img="{ cursor: 'zoom-in' }" :src="props.item.kycDocs.document1" width="50" height="40" style="margin-top:7px">
        </figure>
      </td>
      <td class="justify-center layout px-0">
        <v-icon small text-xs-center color="primary" class="mr-2" @click="acceptItem(props.item)">
          thumb_up
        </v-icon>

        <v-icon small text-xs-center color="error"  @click="rejectItem(props.item)">
          thumb_down
        </v-icon>
        </td>
    </template>
  </v-data-table>
</template>


<script>
  import axios from "../axios";
  import Vue from 'vue';
  import VueImg from 'v-img';

  Vue.use(VueImg);
  const vueImgConfig = {
  // Consider alt of image as its title in gallery?
  altAsTitle: false,
}
Vue.use(VueImg, vueImgConfig)

  export default {
    mounted: function () {
      this.getData()
    },

    data: function () {
      return {
        headers: [
            { text: "Name", align: "center", sortable: false, value: 'name' },
            { text: "Email", align: "center", sortable: false, value: 'email' },
            { text: "Phone", align: "center", sortable: false, value: 'phone' },
            { text: "Created", align: "center", sortable: false, value: 'created' },
            { text: "Address", align: "center", sortable: false, value: 'address' },
            { text: "IDM Status", align: "center", sortable: false, value: 'idmStatus' },
            { text: "KYC Status", align: "center", sortable: true, value: 'kycStatus' },
            { text: "ID Proof", align: "center", sortable: false, value: 'idProof' },
            { text: "Actions", align: "center", sortable: false},
          ],
          items: []

      }
    },

  methods: {
      getData: function () {
        var self = this
        axios.get('api/kyc/getUsers', {
          dataType: 'json',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          mode: 'no-cors',
          credentials: 'include'
        })
        .then(function (response) {
           self.items = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
      },

      acceptItem (item) {
          confirm('Are you sure you want to Accept this Kyc user : '+item.name) &&
          axios.post('api/kyc/kycStatus', {
            user_id:item._id, kycStatus:"ACCEPT"
          })
        .then(function (response) {
            console.log(response.data);
         })
        .catch(function (error) {
          console.log(error)
        })

        //Send email to Kyc User

        this.getData();
        this.sendMailItem(item);
      },

      rejectItem (item) {
          confirm('Are you sure you want to Reject this Kyc user : '+item.name) &&
          axios.post('api/kyc/kycStatus', {
            user_id:item._id, kycStatus:"REJECT"
          })
        .then(function (response) {
            console.log(response.data);
         })
        .catch(function (error) {
          console.log(error)
        })
        this.getData();
      },

      sendMailItem (item) {
          console.log('Sending mail to user : '+item.email);
          var messageItem = {
            from: process.env.MAILGUN_SENDER_FROM,
            subject: "Kyc Approved from EverlifeAI",
            assetname:"assets/kycApprovedTemplate.pug",
          };

          var recipientItem = {
            email: item.email,
            name: item.name,
          };

          axios.post('api/communicate/mail', {
            recipient:recipientItem, message:messageItem
          })
        .then(function (response) {
            console.log(response.data);
         })
        .catch(function (error) {
          console.log(error)
        })

      }



    },
  }
</script>
