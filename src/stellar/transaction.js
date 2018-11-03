import StellarSdk from 'stellar-sdk'
import store from '../store'

/**
 * Setup server for pubic network or testnet
 */
let server;
if (process.env.STELLAR_TESTNET === "true") {
    server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    StellarSdk.Network.useTestNetwork();
} else {
    server = new StellarSdk.Server('https://horizon.stellar.org/');
    StellarSdk.Network.usePublicNetwork();
}

/*   outcome/
 * This function will return the user account balance.
 * By using public key of user.
 */
export const getAccountBalance = async function (publicKey) {
    // Validate key
    let validKey = StellarSdk.StrKey.isValidEd25519PublicKey(publicKey);

    if(!validKey) {
        return false;
    }

    // Verify account exists
    let account = await validateRecipientExists(publicKey);

    if(!account) {
        return false;
    }

    // Check live account (XLM balance)
    console.log(account.balances);
    if(!account.balances.some((balance) => balance.asset_type === "native" && Number(balance.balance) > 1.5)) {
        console.log("not native")
        return false;
    }

    // Check trustline to EVER
    if(!account.balances.some((balance) => balance.asset_code === "EVER")) {
        return false;
    }
    
    return true;
};

const validateRecipientExists = async (publicKey) => {
    try {
      return await server.loadAccount(publicKey);
    } catch (err) {
      return false;
    }
}