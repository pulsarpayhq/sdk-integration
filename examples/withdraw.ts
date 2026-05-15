import {
  PulsarpayClient,
  PulsarpayInsufficientFundsError,
  PulsarpayUnauthorizedError,
  PulsarpayBadRequestError,
} from "pulsarpay-sdk";

const AGENT_KEY = process.env.AGENT_KEY as string;
const WALLET = process.env.WALLET_ADDRESS as string;

// ─── Configuración ───────────────────────────
const client = new PulsarpayClient({
    agentKey: AGENT_KEY,
});

// ─── Test: withdraw ──────────────────────────
async function testWithdraw() {
  console.log("📡  Withdraw request...\n");

  try {
    const payout = await client.payments.withdraw({
      amount: 50,                                             
      walletAddress: WALLET,
    });

    console.log("✅ Withdrawal exitoso!");
    console.log(`   payoutId:  ${payout.payoutId}`);
    console.log(`   success:   ${payout.success}`);
  

  } catch (err) {
    if (err instanceof PulsarpayUnauthorizedError) {
      console.error("❌ Agent key inválida o deshabilitada:", err.message);
    } else if (err instanceof PulsarpayInsufficientFundsError) {
      console.error("❌ Balance insuficiente:", err.message);
    } else if (err instanceof PulsarpayBadRequestError) {
      console.error("❌ Bad request:", err.message);
    } else {
      console.error("❌ Error inesperado:", err);
    }
  }
}

testWithdraw();
