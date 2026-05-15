# CLAUDE.md

## Project Overview

Integration examples for **pulsarpay-sdk** — a payment processing SDK for managing USDC payments on Solana. Each file in `examples/` is a standalone runnable script demonstrating a specific SDK operation.

## Tech Stack

- TypeScript (strict mode) + Node.js >= 20
- ES Modules (`"type": "module"`)
- `tsx` for running TypeScript directly
- `dotenv` via `--env-file` flag (not imported)

## Running Examples

```bash
node --env-file=.env --import tsx/esm examples/<filename>.ts
```

Do NOT use `npx tsx examples/<filename>.ts` — it won't load `.env`.

Available examples:
- `chargeById.ts` — get a charge by ID
- `listCharges.ts` — list charges with pagination
- `createCharge.ts` — create a charge against user balance
- `earnings.ts` — get agent earnings summary
- `withdraw.ts` — withdraw USDC to a Solana wallet
- `listWithdrawals.ts` — list withdrawal history (or fetch a single payout by ID)
- `registerAgent.ts` — register a new Pulsarpay agent

## Environment Variables

Copy `.env.example` to `.env` and fill in:

| Variable | Description |
|---|---|
| `AGENT_KEY` | Agent auth key (`ag_live_...`), from https://www.pulsarpay.io |
| `USER_KEY` | User auth key (`Bearer pp_live_...`), needed for `createCharge` |
| `WALLET_ADDRESS` | Solana wallet address, needed for `withdraw` |

## SDK Client

All examples initialize the client the same way:

```typescript
const client = new PulsarpayClient({
  agentKey: process.env.AGENT_KEY!,
});
```

## SDK Error Types

Use these for typed error handling:

- `PulsarpayUnauthorizedError` — invalid/disabled key
- `PulsarpayBadRequestError` — invalid request params
- `PulsarpayNotFoundError` — resource not found
- `PulsarpayInsufficientFundsError` — insufficient balance
- `PulsarpayConflictError` — duplicate resource (e.g. agent name already registered)
- `PulsarpayNetworkError` — network/timeout errors

## Local SDK Development

The `pulsarpay-sdk` is symlinked from `../pulsarpay-sdk`. When iterating on the SDK:

1. Make changes in the SDK directory
2. Run `npm run build` in the SDK directory
3. Changes are immediately reflected here (no reinstall needed)

## No Tests / No Linter

There is no test suite or linter configured. TypeScript strict mode provides static type checking.
