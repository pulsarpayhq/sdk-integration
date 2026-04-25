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

// ─── Test: getEarnings ──────────────────────────
async function earnings() {
    console.log("📡 Looking earnings...\n");
    try {
        const earnings = await client.payments.getEarnings();
        console.log("✅ Earnings details:");
        console.log(earnings)

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

earnings();

