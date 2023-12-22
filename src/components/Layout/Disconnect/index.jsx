import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useWallet } from "@utils/walletHelper";
import { shortAddress } from "@utils/helper";
import { DocumentDuplicateIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid'

const Disconnect = () => {
  const { walletAddress, disconnectHandler } = useWallet();

  return (
    <div className="fix">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button>
            {shortAddress(walletAddress)}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-10 right-0 mt-2 w-56 origin-top-right rounded-md bg-app-black-light ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item className="bg-app-black">
                <button
                  onClick={() => navigator.clipboard.writeText(walletAddress)}
                  className={`bg-app-black text-white group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <DocumentDuplicateIcon className="h-6 w-6 text-white cursor-pointer mr-2" />
                  Copy Address
                </button>
              </Menu.Item>
              <Menu.Item className="mt-2 bg-app-black">
                <button
                  onClick={disconnectHandler}
                  className={`bg-app-black text-white group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <ArrowRightOnRectangleIcon className="h-6 w-6 text-white cursor-pointer mr-2" />
                  Disconnect
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default Disconnect;
