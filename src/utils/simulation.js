const TENDERLY_ACCESS_KEY = process.env.REACT_APP_TENDERLY_ACCESS_KEY;

export const simulateApprove = async(web3, chainId, from, to, spender, amount) => {
  try {
    const input = web3.eth.abi.encodeFunctionCall({
      name: 'approve',
      type: 'function',
      inputs: [
        { type: 'address', name: 'spender', indexed: false },
        { type: 'uint256', name: 'amount', indexed: false },
      ],
    }, [spender, amount]);

    const resp = await fetch(
      `https://api.tenderly.co/api/v1/account/maxos2/project/sweep/simulate`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Access-Key': TENDERLY_ACCESS_KEY },
        body: JSON.stringify({
          save: false,
          save_if_fails: false,
          simulation_type: 'full',
          network_id: chainId.toString(),
          from: from,
          to: to,
          input: input,
          gas: 8000000,
          gas_price: 0,
          value: 0,
        }),
      }
    );

    const data = await resp.json();
    return data.transaction;
  } catch (error) {
    console.error('Error:', error);
    return { error_message: error.message };
  }
};

export const simulateBuySweep = async(web3, chainId, from, to, amount) => {
  try {
    const input = web3.eth.abi.encodeFunctionCall({
      name: 'buySweep',
      type: 'function',
      inputs: [{ type: 'uint256', name: 'amount', indexed: false }],
    }, [amount]);

    const resp = await fetch(
      `https://api.tenderly.co/api/v1/account/maxos2/project/sweep/simulate`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Access-Key': TENDERLY_ACCESS_KEY },
        body: JSON.stringify({
          save: false,
          save_if_fails: false,
          simulation_type: 'full',
          network_id: chainId.toString(),
          from: from,
          to: to,
          input: input,
          gas: 8000000,
          gas_price: 0,
          value: 0,
        }),
      }
    );

    const data = await resp.json();
    return data.transaction;
  } catch (error) {
    console.error('Error:', error);
    return { error_message: error.message };
  }
};
