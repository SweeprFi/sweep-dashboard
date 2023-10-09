import "@styles/Asset.css";
import { scanLink } from "@utils/helper";
import { languages } from "@config/languages";
import ExternalLink from "@components/ExternalLink";

const AssetPage = (props) => {
  const { asset, chainId, address} = props;

  return (
    <div className="bg-l2s p-4">
      <div className="text-2xl sm:text-4xl lg:text-3xl xl:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-app-red to-app-pink-light">
        {asset.name}
      </div>
      <br />
      <div className="grid">
        <div className="sm:col-span-6 lg:col-span-6 xl:col-span-7 bg-app-sweepMetrics rounded-3xl p-8 flex items-center gap-6 relative overflow-hidden">
          <div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <span className="uppercase bg-app-sweepMetrics py-1 px-2 rounded-lg bg-gradient-to-r from-app-red to-app-pink-light">
                      {languages.text_status_title}
                    </span>
                  </td>
                </tr>
                <tr><td>&nbsp;</td></tr>
                <tr>
                  <td>{languages.text_borrower}</td><td>{asset.borrower}</td>
                </tr>
                <tr>
                  <td>{languages.text_loan_limit}</td><td>{asset.loanLimit}</td>
                </tr>
                <tr><td>&nbsp;</td></tr>
                <tr>
                  <td>{languages.text_sweep_borrowed}</td><td>{asset.sweepBorrowed}</td>
                </tr>
                <tr>
                  <td>{languages.text_fee}</td><td>{asset.fee}</td>
                </tr>
                <tr>
                <td>{languages.text_debt}</td><td>{asset.debt}</td>
                </tr>
                <tr><td>&nbsp;</td></tr>
                <tr>
                  <td>{languages.text_min_equity_ratio}</td><td>{asset.minEquityRatio} %</td>
                </tr>
                <tr>
                  <td>{languages.text_equity_ratio}</td><td>{asset.equityRatio} %</td>
                </tr>
                <tr><td>&nbsp;</td></tr>
                <tr>
                  <td>{languages.text_current_value}</td><td>{asset.currentValue}</td>
                </tr>
                <tr>
                  <td>{languages.text_asset_value}</td><td>{asset.assetValue}</td>
                </tr>
                <tr>
                  <td>{languages.text_deposited_value}</td><td>{asset.deposited}</td>
                </tr>
                <tr>
                  <td>{languages.text_equities}</td><td>{asset.juniorTranche}</td>
                </tr>
                <tr><td>&nbsp;</td></tr>
                <tr>
                  <td>{languages.text_max_borrow}</td><td>{asset.maxBorrow}</td>
                </tr>
                <tr>
                  <td>{languages.text_max_withdraw}</td><td>{asset.maxWithdraw}</td>
                </tr>
              </tbody>
            </table>

            <br/>
            <ExternalLink
              title={languages.link_stabilizer}
              link={scanLink(chainId, address)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssetPage;
