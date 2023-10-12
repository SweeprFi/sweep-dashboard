import "@styles/Asset.css";
import { scanLink } from "@utils/helper";
import { languages } from "@config/languages";
import ExternalLink from "@components/ExternalLink";
import HowTo from "@components/HowTo";

const AssetPage = (props) => {
  const { asset, chainId, address } = props;

  const EmptyRow = () => {
    return <tr><td>&nbsp;</td></tr>
  }

  const Title = (props) => {
    return (
      <>
        <EmptyRow />
        <tr>
          <td>
            <span className={`uppercase text-black bg-app-sweepMetrics py-1 px-2 rounded-lg bg-gradient-to-r ${props.class}`}>
              {props.title}
            </span>
          </td>
        </tr>
        <EmptyRow />
      </>
    )
  }

  const Row = (props) => {
    return (
      <tr>
        <td>{props.label}</td><td>{props.value}</td>
      </tr>
    )
  }

  const shorten = (addr) => { return `${addr.slice(0, 7)} ··· ${addr.slice(-7)}`}

  return (
    <div className="bg-l2s p-4">
      <div className="text-2xl sm:text-4xl lg:text-3xl xl:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-app-red to-app-pink-light">
        {asset.name}
      </div>
      <br />
      <div className="grid">
        <div className="sm:col-span-6 lg:col-span-6 xl:col-span-7 bg-app-sweepMetrics rounded-3xl p-8 flex items-center gap-6 relative overflow-hidden">
          <div>
            <ExternalLink
              title={languages.link_stabilizer}
              link={scanLink(chainId, address + "#writeContract")}
            />
            <table>
              <tbody>
                <Title title={languages.text_configuration_title} class={"from-app-red to-app-pink-light"} />
                {/* <Row label={languages.text_borrower} value={asset.borrower} /> */}
                <tr>
                  <td>{languages.text_borrower}</td>
                  <td>
                    <ExternalLink
                      title={shorten(asset.borrower)}
                      link={scanLink(chainId, asset.borrower)}
                    />
                  </td>
                </tr>
                <Row label={languages.text_loan_limit} value={asset.loanLimit} />
                <Row label={languages.text_call_delay} value={asset.callDelay} />
                <Row label={languages.text_spread_fee} value={asset.spreadFee + " %"} />
                <Row label={languages.text_min_equity_ratio} value={asset.minEquityRatio + " %"} />
                <EmptyRow />
                <Row label={languages.text_auto_invest_enabled} value={asset.autoInvestEnabled.toString()} />
                {
                  asset.autoInvestEnabled &&
                  <>
                    <Row label={languages.text_auto_invest_amount} value={asset.autoInvestMinAmount} />
                    <Row label={languages.text_auto_invest_ratio} value={asset.autoInvestMinRatio + " %"} />
                  </>
                }
                <Title title={languages.text_status_title} class={"from-app-red to-app-pink-light"} />
                <Row label={languages.text_sweep_borrowed} value={asset.sweepBorrowed} />
                <Row label={languages.text_fee} value={asset.fee} />
                <Row label={languages.text_debt} value={asset.debt} />
                <EmptyRow />
                <Row label={languages.text_equity_ratio} value={asset.equityRatio + " %"} />
                <EmptyRow />
                <Row label={languages.text_current_value} value={asset.currentValue} />
                <Row label={languages.text_asset_value} value={asset.assetValue} />
                <Row label={languages.text_deposited_value} value={asset.deposited} />
                <Row label={languages.text_equities} value={asset.juniorTranche} />
                <EmptyRow />
                <Row label={languages.text_max_borrow} value={asset.maxBorrow} />
                <Row label={languages.text_remaning_borrow} value={asset.remainingBorrow} />
                <Row label={languages.text_max_withdraw} value={asset.maxWithdraw} />
                <Title title={languages.text_call_title} class={"from-app-red to-app-pink-light"} />
                <Row label={languages.text_call_time} value={asset.callTime} />
                <Row label={languages.text_call_amount} value={asset.callAmount} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <br />
      <HowTo name={asset.name} />
    </div>
  )
}

export default AssetPage;
