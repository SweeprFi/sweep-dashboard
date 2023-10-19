export const uniswapAsset = [
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
    description: "Increases the liquidity of the pool.",
    params: [
      {
        name: "usdxAmount",
        description: "USDC amount of asset to be added."
      },
      {
        name: "sweepAmount",
        description: "Sweep amount of asset to be added."
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
  {
    name: "collect",
    description: "Collects the fees associated with provided liquidity.",
    params: []
  }
]
