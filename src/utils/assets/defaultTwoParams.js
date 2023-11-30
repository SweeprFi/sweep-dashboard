export const defaultTwoParams = [
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
    name: "borrow",
    description: "Enables the borrowing of a specific amount of Sweep.",
    params: [
      {
        name: "sweepAmount",
        description: "Quantity of the token to be borrowed (i.e 1000000000000000000 is 1 SWEEP)."
      }
    ]
  },
  {
    name: "sell Sweep On AMM",
    description: "Sells sweep amount from the Stabilizer's balance to the AMM (swaps SWEEP to USDC).",
    params: [
      {
        name: "sweepAmount",
        description: "Amount to be changed in the AMM (i.e 1000000000000000000 is 1 SWEEP)."
      },
      {
        name: "amountOutMin",
        description: "The minimum amount of the target token that the function should obtain."
      }
    ]
  },
  {
    name: "invest",
    description: "Facilitates an investment operation in the asset.",
    params: [
      {
        name: "usdxAmount",
        description: "Amount to be invested (i.e 1000000 is 1 USDx)."
      },
      {
        name: "slippage",
        description: "Tolerance to consider when swapping tokens within the AMM (i.e 10000 is 10%)."
      }
    ]
  },
  {
    name: "divest",
    description: "Facilitates an divestment operation in the asset.",
    params: [
      {
        name: "usdxAmount",
        description: "Amount to be divested (i.e 1000000 is 1 USDx)."
      },
      {
        name: "slippage",
        description: "Tolerance to consider when swapping tokens within the AMM (i.e 10000 is 10%)."
      }
    ]
  },
  {
    name: "buy Sweep On AMM",
    description: "Buys sweep from the Stabilizer's balance to the AMM (swaps USDC to SWEEP).",
    params: [
      {
        name: "usdxAmount",
        description: "Amount to be changed in the AMM (i.e 1000000 is 1 USDx)."
      },
      {
        name: "amountOutMin",
        description: "The minimum amount of the target token that the function should obtain."
      }
    ]
  },
  {
    name: "repay",
    description: "Burns the Sweep amount to reduce the debt.",
    params: [
      {
        name: "sweepAmount",
        description: "Amount to be burnt by Sweep (i.e 1000000000000000000 is 1 SWEEP)."
      }
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
]
