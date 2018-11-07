export default {
  token: null,
  user: {
    name: '',
    email: '',
    kyc: false,
    whitelist: false,
    payments: [],
    kycDocs: {
      document1: null,
      document2: null
    },
    idmStatus: "",
    isAdmin:false,
    isVerifier:false,
    isActive:false,
    kycStatus:'',
    kycDetails:'',
    address:''
  },
  aggregates: {
    ever_amount: 0,
    ever_bonus: 0,
    ever_total: 0
  },
  ico: {
    startDate: null,
    endDate: null,
    status: ''
  },
  everToken: {
    DA: 'GCWPG42F3UNVYU37XQTNKH57D2RGEIZ6O3D6AI5UCGXQ2RT2XHOW6HNM',
    GA: 'GBGXEJ73RRP5UBRABKYXCECF25YLO35GEFXJUJHPUWOICSK7ODLWEDC4',
    code: 'EVER',
    limit: '500000000'
  },
  isDocsUploaded: false,
  isDocsAvailable: false,
}
