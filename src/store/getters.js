export default {
  token(state) {
    return state.token;
  },

  isLoggedIn(state) {
    return !!state.token;
  },

  user(state) {
    return state.user;
  },

  aggregates(state) {
    return state.aggregates;
  },

  everToken(state){
    return state.everToken;
  },

  isDocsAvailable(state) {
    return state.isDocsAvailable;
  },

  isDocsUploaded(state) {
    return state.isDocsUploaded;
  },

  getKycDocs (state) {
    return state.user.kycDocs;
  },

  idmStatus(state) {
    return state.user.idmStatus;
  },

  isAdmin(state) {
    return state.user.isAdmin;
  },

  isVerifier(state) {
    return state.user.isVerifier;
  },

  isActive(state){
    return state.user.isActive;
  },

  kycStatus(state){
    return state.user.kycStatus;
  },

  kycDetails(state){
    return state.user.kycDetails;
  }
}
