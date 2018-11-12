<template>
  <div>
    <v-dialog v-model="dialog" max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">Edit : {{editedItem.name}}</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md5>
              <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.phone" label="Phone"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md3>
              <v-select :items="selectItems" v-model="editedItem.kycStatus" label="kycStatus"></v-select>
            </v-flex>

            <v-flex xs12 sm6 md12>
              <v-text-field v-model="editedItem.address" label="Address"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md12>
              <v-text-field v-model="editedItem.kycDetails" label="Reject Reason"></v-text-field>
            </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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

          <v-icon small text-xs-center  @click="editItem(props.item)">
            edit
          </v-icon>
          </td>
      </template>
    </v-data-table>
  </div>
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

    data: () => ({
        dialog: false,
        selectItems: ['ACCEPT', 'REJECT'],
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
          items: [],
          editedIndex: -1,
          editedItem: {
            name: '',
            address:''
          },
          defaultItem: {
            name: '',
            address: ''
          }
    }),

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

      editItem(item){
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          console.log(33, this.editedItem);
          this.saveItem(this.editedItem)
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.close()
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
        this.sendEmail(item, "assets/kycApprovedTemplate.pug", "Kyc Approved from EverlifeAI");
      },

      saveItem (item) {
          axios.post('api/kyc/kycInfo', {
            user_id:item._id,
            name:item.name,
            phone:item.phone,
            address:item.address,
            kycStatus:item.kycStatus,
            kycDetails:item.kycDetails,
          })
        .then(function (response) {
            console.log(response.data);
         })
        .catch(function (error) {
          console.log(error)
        })

        if(item.kycStatus=="REJECT"){
          this.sendEmail(item, "assets/kycRejectedTemplate.pug", "Kyc Rejected from EverlifeAI");
        }else if(item.kycStatus=="ACCEPT"){
          this.sendEmail(item, "assets/kycApprovedTemplate.pug", "Kyc Approved from EverlifeAI");
        }
      },

      sendEmail(item, emailAsset, emailSubject) {
          console.log('Sending mail to user : '+item.email);
          var messageItem = {
            from: process.env.MAILGUN_SENDER_FROM,
            subject: emailSubject,
            assetname:emailAsset,
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
