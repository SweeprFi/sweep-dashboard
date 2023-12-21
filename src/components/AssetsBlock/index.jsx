import "@styles/Table.css";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { convertNumber } from "@utils/helper";

const AssetsBlock = ({ chainId }) => {
  const [sweepSorted, setSweepSorted] = useState([])
  const sweepInfo = useSelector((state) => state.sweep)

  useEffect(() => {
    const removed = Object.keys(sweepInfo).filter((chain) => Number(chain) !== Number(chainId));
    if(removed.length > 0) {
      const sorted = [sweepInfo[chainId], ...removed.map(chain => sweepInfo[chain])];
      setSweepSorted(sorted);
    }
  }, [sweepInfo, chainId])

  if(sweepSorted.length === 0) return;

  return (
    <div className="bg-asset sm:pt-4">
      <table id="tableBlock">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Network</th>
            <th scope="col">Local SWEEP</th>
            <th scope="col">SWEEP minted</th>
            <th scope="col">Stabilizer Assets</th>
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
                    <td data-label="Network">{data.network}</td>
                    <td data-label="Local SWEEP">{convertNumber(Number(data.local_supply).toFixed(0))}</td>
                    <td data-label="SWEEP minted">{convertNumber(Number(data.totalBorrowed).toFixed(0))}</td>
                  </Link>
                    <td data-label="Stabilizer Assets">$ {convertNumber(Number(data.totalValue).toFixed(0))}</td>
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
