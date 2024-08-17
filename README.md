# Morpho Vault Withdrawal

This is a dapp to interface with MetaMorpho Vaults. It allows users to connect their wallet, enter a MetaMorpho vault address, view their balances, and withdraw their funds. The project is bootstrapped with Next.js and written in TypeScript using React, viem, wagmi, react-query, and Tailwind CSS.

The app is deployed on Vercel:

- [Production (Mainnet)](https://morpho-vault-withdrawal.vercel.app)
- [Preview (Tenderly)](https://morpho-vault-withdrawal-jpangelle-jp-angelles-projects.vercel.app)

## Instructions to run

### Install dependencies

```bash
$ yarn install
```

### Set up environment variables

1. Create a `.env.local` file in the root of the project:
2. Copy the contents of `.env.example` into `.env.local`
3. Fill in the environment variables with the appropriate values

### Run the development server

```bash
$ yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
