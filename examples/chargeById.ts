import {
    PulsarpayClient,
    PulsarpayUnauthorizedError,
    PulsarpayBadRequestError,
    PulsarpayNotFoundError
} from "pulsarpay-sdk";

const AGENT_KEY = process.env.AGENT_KEY as string;

// ─── Configuración ───────────────────────────
const client = new PulsarpayClient({
    agentKey: AGENT_KEY,
});

// ─── Test: getChargeById ──────────────────────────
async function getChargeById(id: string) {
    console.log("🚀 Looking getChargeById...\n");
    
    try {
        const charge = await client.payments.getCharge(id);
        console.log("✅ Charge detail:");
        console.log(charge)

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

getChargeById("cmq31ygqe0004jp04tqhh8jj3");
