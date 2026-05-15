import {
    PulsarpayClient,
    PulsarpayUnauthorizedError,
    PulsarpayBadRequestError,
    PulsarpayConflictError,
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
        } else if (err instanceof PulsarpayConflictError) {
            console.error("❌ Nombre de agente ya registrado:", err.message);
        } else {
            console.error("❌ Error inesperado:", err);
        }
    }
}

registerAgent();