export default {
  storeToken(state, token) {
    state.token = token;
  },

  storeUser(state, user) {
    state.user.name = user.name;
    state.user.email = user.email;
    state.user.kyc = user.kyc;
    state.user.whitelist = user.whitelist;
    state.user.payments = user.purchases;
    state.user.kycDocs = user.kycDocs;
    state.user.idmStatus = user.idmStatus;
    state.isDocsAvailable = !!user.kycDocs.document1;
    state.user.isAdmin = user.isAdmin;
    state.user.isVerifier = user.isVerifier;
    state.user.isActive = user.isActive;
    state.user.kycStatus = user.kycStatus;
    state.user.kycDetails = user.kycDetails;
    state.user.address = user.address;
  },

  storeAggregates(state, aggregates) {
    state.aggregates.ever_amount =  aggregates.ever_amount;
    state.aggregates.ever_bonus = aggregates.ever_bonus;
    state.aggregates.ever_total = aggregates.ever_total;
  },

/*   outcome/
 * This function will clear the token and it will set it's value to null.
 *
 */
  clearToken(state) {
    state.token = null;
  },

  setKycDoc(state, document) {
    state.user.kycDocs[document.key] = document.url;
  },

  saveKycDocs(state) {
    state.isDocsUploaded = true;
    state.isDocsAvailable = true;
  }
}
