import {
    PulsarpayClient,
    PulsarpayUnauthorizedError,
    PulsarpayBadRequestError,
    PulsarpayNotFoundError,
    PulsarpayInsufficientFundsError
} from "pulsarpay-sdk";

// ─── Configuración ───────────────────────────
const client = new PulsarpayClient({});

// ─── Test: registerAgent ──────────────────────────
async function registerAgent() {
    console.log("📡 Register agent...\n");
    try {

        const result = await client.agents.register({
            name: "integration-sdk",
            email: "sdk@example.com",
            website: "https://example.com",
        });

        console.log("✅ Agent detail:");
        console.log(result)

    } catch (err) {
        if (err instanceof PulsarpayUnauthorizedError) {
            console.error("❌ Agent key inválida o deshabilitada:", err.message);
        } else if (err instanceof PulsarpayBadRequestError) {
            console.error("❌ Bad request:", err.message);
        } else if (err instanceof PulsarpayNotFoundError) {
            console.error("❌ Not found:", err.message);
        } else if (err instanceof PulsarpayInsufficientFundsError) {
            console.error("❌ Payment Required:", err.message);
        } else {
            console.error("❌ Error inesperado:", err);
        }
    }
}

registerAgent();