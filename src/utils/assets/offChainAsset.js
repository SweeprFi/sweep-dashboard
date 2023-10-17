export const offChainAsset = [
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
    name: "invest",
    description: "Facilitates an investment operation in the asset.",
    params: [
      {
        name: "usdxAmount",
        description: "USDC Amount to be invested."
      },
      {
        name: "sweepAmount",
        description: "SWEEP Amount to be invested."
      }
    ]
  },
  {
    name: "divest",
    description: "Facilitates an divestment operation in the asset.",
    params: [
      {
        name: "usdxAmount",
        description: "Amount to be divested."
      }
    ]
  },
  {
    name: "buy Sweep On AMM",
    description: "Buys sweep from the Stabilizer's balance to the AMM (swaps USDC to SWEEP).",
    params: [
      {
        name: "usdxAmount",
        description: "Amount to be changed in the AMM."
      },
      {
        name: "amountOutMin",
        description: "The minimum amount of the target token that the function should obtain."
      }
    ]
  },
  {
    name: "sell Sweep On AMM",
    description: "Sells sweep amount from the Stabilizer's balance to the AMM (swaps SWEEP to USDC).",
    params: [
      {
        name: "sweepAmount",
        description: "Amount to be changed in the AMM."
      },
      {
        name: "amountOutMin",
        description: "The minimum amount of the target token that the function should obtain."
      }
    ]
  },
  {
    name: "set Wallet",
    description: "Updates wallet to send the investment to. This function can be executed only if the proposed function has not been executed.",
    params: [
      {
        name: "wallet",
        description: "New wallet address."
      }
    ]
  },
  {
    name: "payback",
    description: "Paybacks stable coins to Asset.",
    params: [
      {
        name: "token",
        description: "Address to payback."
      },
      {
        name: "amount",
        description: "Amount to be paid back."
      }
    ]
  },
  {
    name: "update Value",
    description: "Updates the value of investment.",
    params: [
      {
        name: "value",
        description: "New value of investment."
      }
    ]
  },
]
