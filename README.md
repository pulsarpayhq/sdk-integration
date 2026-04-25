# pulsarpay-sdk — Integration Examples

Practical examples showing how to use the [pulsarpay-sdk](https://github.com/pulsarpay/pulsarpay-sdk) in a real project.

## Requirements

- Node.js >= 20
- A Pulsarpay agent key (`ag_live_...`) — [register here](https://pulsarpay.io)

## Setup

```bash
# 1 — Clone the repo
git clone https://github.com/pulsarpay/sdk-integration.git
cd sdk-integration

# 2 — Install dependencies
npm install

# 3 — Set your agent key
cp .env.example .env
# Edit .env and add your AGENT_KEY
```

## Environment Variables

Create a `.env` file in the root of the project based on `.env.example`:

```env
AGENT_KEY=ag_live_your_key_here
```

> ⚠️ Never commit your `.env` file. It's already included in `.gitignore`.

## Running Examples

Each example is a standalone TypeScript file. Use `node --env-file` to load the `.env` automatically:

```bash
node --env-file=.env --import tsx/esm examples/<filename>.ts
```

> ⚠️ Do not use `npx tsx examples/<filename>.ts` directly — it won't load the `.env` file.

### Available Examples

| File | Description |
|---|---|
| `examples/chargeById.ts` | Get a charge by ID |
| `examples/list-charges.ts` | List all charges with pagination |
| `examples/create-charge.ts` | Create a charge against a user's balance |
| `examples/earnings.ts` | Get agent earnings summary |
| `examples/withdraw.ts` | Withdraw earned USDC to a Solana wallet |

### Quick example

```bash
# Get a charge by ID
node --env-file=.env --import tsx/esm examples/chargeById.ts

# List charges
node --env-file=.env --import tsx/esm examples/list-charges.ts

# Withdraw funds
node --env-file=.env --import tsx/esm examples/withdraw.ts
```

## Project Structure

```
sdk-integration/
├── examples/
│   ├── chargeById.ts       ← Get charge by ID
│   ├── list-charges.ts     ← List charges with pagination
│   ├── create-charge.ts    ← Create a new charge
│   ├── earnings.ts         ← Get earnings summary
│   └── withdraw.ts         ← Withdraw to Solana wallet
├── .env.example            ← Environment variables template
├── .env                    ← Your local keys (git ignored)
├── .gitignore
├── tsconfig.json
├── package.json
└── README.md
```

## Error Handling

All examples handle errors using the typed error classes exported by the SDK:

```ts
import {
  PulsarpayUnauthorizedError,
  PulsarpayInsufficientFundsError,
  PulsarpayNotFoundError,
  PulsarpayBadRequestError,
  PulsarpayNetworkError,
} from "pulsarpay-sdk";

try {
  await client.payments.getCharge("charge-id");
} catch (err) {
  if (err instanceof PulsarpayUnauthorizedError) {
    // Invalid or disabled agent key
  } else if (err instanceof PulsarpayNotFoundError) {
    // Charge not found
  } else if (err instanceof PulsarpayNetworkError) {
    // Network or timeout error
  }
}
```

## Using the SDK in Your Own Project

```bash
npm install pulsarpay-sdk
```

```ts
import { PulsarpayClient } from "pulsarpay-sdk";

const client = new PulsarpayClient({
  agentKey: process.env.AGENT_KEY!,
});

const earnings = await client.payments.getEarnings();
console.log(`Total earned: ${earnings.totalEarned} ${earnings.currency}`);
```

Full SDK documentation is available at the [pulsarpay-sdk repository](https://github.com/pulsarpay/pulsarpay-sdk).

## License

MIT