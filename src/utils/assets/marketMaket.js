export const marketMaket = [
  {
    name: "deposit",
    description: "Transfers of a specified amount to the asset. This must be a common transaction by the ERC20.",
    params: [
      {
        name: "to",
        description: "Must be the asset address."
      },
      {
        name: "amount",
        description: "Quantity of the token to be transferred."
      },
    ]
  },
  {
    name: "withdraw",
    description: "Facilitates the withdrawal of a specified amount  from the asset.",
    params: [
      {
        name: "token",
        description: "Must be the base token or Sweep."
      },
      {
        name: "amount",
        description: "Quantity of the token to be withdrawn."
      }
    ]
  },
  {
    name: "borrow",
    description: "Enables the borrowing of a specific amount of Sweep.",
    params: [
      {
        name: "sweepAmount",
        description: "Quantity of the token to be borrowed."
      }
    ]
  },
  {
    name: "repay",
    description: "Burns the Sweep amount to reduce the debt.",
    params: [
      {
        name: "sweepAmount",
        description: "Amount to be burnt by Sweep."
      }
    ]
  },
  {
    name: "buy Sweep",
    description: "Buys Sweep by minting and adding the liquidity into the uniswap pool.",
    params: [
      {
        name: "sweepAmount",
        description: "Amount to be buyed."
      }
    ]
  },
  {
    name: "execute",
    description: "Execute operation to peg to target price of SWEEP.",
    params: [
      {
        name: "sweepAmount",
        description: "Amount to be changed in the AMM."
      }
    ]
  },
]
