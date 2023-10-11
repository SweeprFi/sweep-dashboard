// SWAPs - excluded on UNISWAP asset
const swapFunctions = [
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
]

// Functions in all Stabilizers
const common = [
  {
    name: "deposit",
    description: "Transfers of a specified amount to the asset.",
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
]

// invest - divest with 2 params
const investDivest = [
  {
    name: "invest",
    description: "Facilitates an investment operation in the asset.",
    params: [
      {
        name: "usdxAmount",
        description: "Amount to be invested."
      },
      {
        name: "slippage",
        description: "Tolerance to consider when swapping tokens within the AMM."
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
      },
      {
        name: "slippage",
        description: "Tolerance to consider when swapping tokens within the AMM."
      }
    ]
  },
]

// Custom Stabilizer functions
const uniswap = [
  ...common,
  {
    name: "invest",
    description: "Increases the liquidity of the pool.",
    params: [
      {
        name: "usdxAmount",
        description: " USDC amount of asset to be added."
      },
      {
        name: "sweepAmount",
        description: " Sweep amount of asset to be added."
      },
      {
        name: "usdxMinIn",
        description: "Min USDC amount to be used for liquidity."
      },
      {
        name: "sweepMinIn",
        description: "Min Sweep amount to be used for liquidity."
      },
    ]
  },
  {
    name: "divest",
    description: "Decreases the current liquidity.",
    params: [
      {
        name: "liquidityAmount",
        description: "Liquidity Amount to decrease."
      },
      {
        name: "amountOut0",
        description: "Minimum amount received back in token0."
      },
      {
        name: "amountOut1",
        description: "Minimum amount received back in token1."
      },
    ]
  },
]

const market = [...common]
const usdPlus = [...common, ...swapFunctions, ...investDivest]
const dsr = [...common, ...swapFunctions, ...investDivest]

export const stabilizers = {
  "Uniswap Asset": [...uniswap],
  "Market Maker": [...market],
  "USDPlus Asset": [...usdPlus],
  "DSR Asset":[...dsr],
}
