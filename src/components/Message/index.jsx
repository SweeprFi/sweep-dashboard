import { toast } from 'react-toastify';
import { scanLink, shortAddress } from "@utils/helper";
import ExternalLink from "@components/ExternalLink";

export const notifyMsg = (msg, type) => {
  toast[type](<DisplayMsg />, {
    position: "bottom-right",
    autoClose: 7000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    data: { msg }
  })
}

export const notifyMsgWithLink = (msg, network, value) => {
  toast.info(<DisplayLink />, {
    position: "bottom-right",
    autoClose: 7000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    data: { msg, network, value }
  })
}

const DisplayMsg = ({ data }) => (
  <div>{data.msg}</div>
)

const DisplayLink = ({ data }) => {
  return (
    <div>
      <ExternalLink
        title={`${data.msg} ${shortAddress(data.value)}`}
        link={scanLink(data.network, `tx/${data.value}`)}
      />
    </div>
  )
}