import Popover from "@components/Popover"


const SweepItem = ({ className, label, symbolLeft, value, symbolRight, message }) => {
  return (
    <div className={`bg-app-sweepMetrics rounded-3xl p-8 flex flex-col justify-center items-start relative ${className}`}>
      <div className="growing absolute top-0 left-0 w-full h-full p-[2px] rounded-3xl">
        <div className="growing-inner w-full h-full"></div>
      </div>
      <h3 className="font-archivo-regular mt-2 text-app-gray-dark whitespace-nowrap text-sm sm:text-base lg:text-sm xl:text-base">
        {label}
        {!!message && <Popover message={message} />}
      </h3>
      <div className="flex items-center gap-4 text-3xl sm:text-4xl lg:text-3xl xl:text-4xl">
        {symbolLeft && symbolLeft}
        {value}
        {symbolRight && symbolRight}
      </div>
    </div>
  )
}

export default SweepItem;