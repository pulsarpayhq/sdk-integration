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
async function createCharges() {
    console.log("📡 Creating charges...\n");
    try {

    const charge_1 = await client.payments.createCharge(
        {
            amount: 25,
            currency: "USD",
            description: "AI Inference - 10000 tokens",
        },
        { userKey: USER_KEY }
    );

        console.log("✅ Charge detail 1:");
        console.log(charge_1)

    const charge_2 = await client.payments.createCharge(
        {
            amount: 2.5,
            currency: "USDC",
            description: "AI image generation",
        },
        { userKey: USER_KEY }
    );

        console.log("✅ Charge detail 2:");
        console.log(charge_2)

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

createCharges();