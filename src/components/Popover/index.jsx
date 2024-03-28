import { useState } from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid';

const Popover = ({ message }) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsPopoverVisible(true);
  };

  const handleMouseLeave = () => {
    setIsPopoverVisible(false);
  };

  return (
    <div className="popover-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <QuestionMarkCircleIcon className='w-4 h-4 cursor-pointer' />
      {isPopoverVisible && <div className="popover">{message}</div>}
    </div>
  );
};

export default Popover;
