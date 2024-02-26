import "@styles/Table.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { convertNumber } from "@utils/helper";

const AssetsBlock = ({ chainId }) => {
  const navigate = useNavigate();
  const [sweepSorted, setSweepSorted] = useState([])
  const sweepInfo = useSelector((state) => state.sweep)

  useEffect(() => {
    const removed = Object.keys(sweepInfo).filter((chain) => Number(chain) !== Number(chainId));
    if(removed.length > 0) {
      let sorted = [sweepInfo[chainId], ...removed.map(chain => sweepInfo[chain])];
      sorted = sorted.filter(item => item);
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
            <th scope="col">Stabilizer Assets</th>
            <th scope="col">SWEEP LIABILITIES</th>
          </tr>
        </thead>
        <tbody>
          {
            sweepSorted.map(data => {
              const { chain, network, logo, local_supply, totalValue, totalBorrowed, target_price } = data;
              const liabilities = (Number(totalBorrowed) * Number(target_price)).toFixed(0);
              return (
                <tr
                  key={chain}
                  className="cursor-pointer"
                  onClick={() => navigate(`/dashboard/${network.toLowerCase()}`)}
                >
                  <td data-label="img">
                    <img src={logo} alt="logo" className="w-6 h-6" />
                  </td>
                  <td data-label="Network">{network}</td>
                  <td data-label="Local SWEEP">{convertNumber(Number(local_supply).toFixed(0))}</td>
                  <td data-label="Stabilizer Assets">$ {convertNumber(Number(totalValue).toFixed(0))}</td>
                  <td data-label="SWEEP LIABILITIES">{`${convertNumber(Number(totalBorrowed))} ($${convertNumber(liabilities)})`}</td>
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
