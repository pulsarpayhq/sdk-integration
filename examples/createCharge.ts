import {
    PulsarpayClient,
    PulsarpayUnauthorizedError,
    PulsarpayBadRequestError,
    PulsarpayNotFoundError,
    PulsarpayInsufficientFundsError
} from "pulsarpay-sdk";

const AGENT_KEY = process.env.AGENT_KEY as string;
const USER_KEY = process.env.USER_KEY as string;

// ─── Configuración ───────────────────────────
const client = new PulsarpayClient({
    agentKey: AGENT_KEY,
});

// ─── Test: createCharge ──────────────────────────
async function createCharge() {
    console.log("📡 Creating charge...\n");
    try {

    const charge = await client.payments.createCharge(
        {
            amount: 100,
            currency: "USDC",
            description: "AI Inference - 1000 tokens",
        },
        { userKey: USER_KEY }
    );

        console.log("✅ Charge detail:");
        console.log(charge)

    } catch (err) {
        if (err instanceof PulsarpayUnauthorizedError) {
            console.error("❌ Agent key inválida o deshabilitada:", err.message);
        } else if (err instanceof PulsarpayBadRequestError) {
            console.error("❌ Bad request:", err.message);
        } else if (err instanceof PulsarpayNotFoundError) {
            console.error("❌ Not found:", err.message);
        }else if (err instanceof PulsarpayInsufficientFundsError) {
            console.error("❌ Payment Required:", err.message);
        } else {
            console.error("❌ Error inesperado:", err);
        }
    }
}

createCharge();