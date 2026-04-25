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

// ─── Test: listCharges ──────────────────────────
async function listCharges() {
    console.log("📡 Looking listCharges...\n");
    try {
        const charges = await client.payments.listCharges();
        console.log("List charges...\n");
        console.log(charges)

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

listCharges();
