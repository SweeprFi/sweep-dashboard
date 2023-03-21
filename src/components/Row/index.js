export const TextRow = (props) => {
  return (
    <div className="flex items-center">
      <div className="mr-2 font-bold">{props.name}</div>
      <div className={`${props.valueClass} hidden sm:block`}>{props.value}</div>
      <div className={`${props.valueClass} block sm:hidden`}>{props.mobileValue}</div>
    </div>
  )
}

export const LinkRow = (props) => {
  const isMobile = props.mobileValue != undefined;

  return (
    <div className="flex items-center">
      <div className="mr-2 font-bold">{props.name}</div>
      <a 
        href={props.link} 
        target="_blank" 
        rel="noreferrer" 
        className={`hover:text-red-300 ${isMobile ? 'hidden' : ''} sm:block`}
      >
        {props.value}
      </a>
      {isMobile && (
        <a href={props.link} target="_blank" rel="noreferrer" className="hover:text-red-300 block sm:hidden">
          {props.mobileValue}
        </a>
      )}
    </div>
  )
}