import {
    PulsarpayClient,
    PulsarpayUnauthorizedError,
    PulsarpayBadRequestError,
    PulsarpayNotFoundError,
    type PayoutListResponse,
    type PayoutSingleResponse,
} from "pulsarpay-sdk";

const AGENT_KEY = process.env.AGENT_KEY as string;

// ─── Configuración ───────────────────────────
const client = new PulsarpayClient({
    agentKey: AGENT_KEY,
});

// ─── Test: listWithdrawals ──────────────────────────
async function listWithdrawals() {
    console.log("📡 Listing withdrawals...\n");
    
    try {

        const result = await client.payments.listWithdrawals();
        const { payouts } = result as PayoutListResponse;

        console.log(`✅ ${payouts.length} withdrawal(s) found:\n`);
        for (const p of payouts) {
            console.log(`  [${p.status}] ${p.id} — ${p.amount} ${p.currency} → ${p.destination.walletAddress}`);
        }
    } catch (err) {
        if (err instanceof PulsarpayUnauthorizedError) {
            console.error("❌ Agent key inválida o deshabilitada:", err.message);
        } else if (err instanceof PulsarpayBadRequestError) {
            console.error("❌ Bad request:", err.message);
        } else if (err instanceof PulsarpayNotFoundError) {
            console.error("❌ Not found:", err.message);
        } else {
            console.error("❌ Error inesperado:", err);
        }
    }
}

// Para consultar un payout específico, pasá el payoutId:
// const result = await client.payments.listWithdrawals({ payoutId: "cmoqbpavp00071ry1t2iyr1hw" });
// const { payout } = result as PayoutSingleResponse;

listWithdrawals();
