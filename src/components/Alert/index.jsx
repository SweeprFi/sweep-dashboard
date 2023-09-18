
import { ReactComponent as SuccessIcon } from "@images/alerts/success.svg";
import { ReactComponent as ProgressIcon } from "@images/alerts/progress.svg";
import { ReactComponent as WarningIcon } from "@images/alerts/warning.svg";

const alerts = [
    {
        severity: "success",
        bgColor: "bg-app-green-dark",
        textColor: "text-app-green-light",
        icon: <SuccessIcon className="w-7 h-7"/>
    },
    {
        severity: "info",
        bgColor: "bg-app-blue-dark",
        textColor: "text-app-blue-light",
        icon: <ProgressIcon className="w-7 h-7"/>
    },
    {
        severity: "error",
        bgColor: "bg-app-red-dark",
        textColor: "text-app-red-light",
        icon: <WarningIcon className="w-7 h-7"/>
    }
]; 

const Alert = ({ data }) => {
    const alert = alerts.filter((item) => item.severity === data.severity);

    return data.open && (
        <div className={`${alert[0].bgColor} ${alert[0].textColor} px-2 py-2 rounded-md w-full mt-4 relative flex justify-start items-center gap-2`}>
            {
                alert[0].icon
            }
            {data.message}
        </div>
    )
}

export default Alert;