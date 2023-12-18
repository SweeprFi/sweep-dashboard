import "@styles/Table.css";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const AssetsBlock = ({ chainId }) => {
  const [sweepSorted, setSweepSorted] = useState([])
  const sweepInfo = useSelector((state) => state.sweep)

  useEffect(() => {
    const removed = Object.keys(sweepInfo).filter((chain) => Number(chain) !== chainId);
    if(removed.length > 0) {
      const sorted = [sweepInfo[chainId], ...removed.map(chain => sweepInfo[chain])];
      setSweepSorted(sorted);
    }
  }, [sweepInfo, chainId])

  if(sweepSorted.length === 0) return;

  return (
    <div className="bg-asset sm:pt-6 mt-6 sm:mt-6">
      <table id="tableBlock">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Network</th>
            <th scope="col">Local SWEEP supply</th>
            <th scope="col">SWEEP minted</th>
            <th scope="col">Total asset</th>
          </tr>
        </thead>
        <tbody>
          {
            sweepSorted.map(data => {
              return (
                <tr key={data.chain}>
                  <Link to={`/dashboard/${data.network.toLowerCase()}`}>
                    <td data-label="img">
                      <img src={data.logo} alt="logo" className="w-6 h-6" />
                    </td>
                    <td data-label="network">{data.network}</td>
                    <td data-label="local-supply">{data.local_supply}</td>
                    <td data-label="total-borrowed">{data.totalBorrowed}</td>
                  </Link>
                    <td data-label="total-asset">$ {data.totalValue}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default AssetsBlock;
