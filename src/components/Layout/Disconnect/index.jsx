import { Fragment, useCallback, useState } from 'react'
import { useWallet } from "@utils/walletHelper";
import { shortAddress } from "@utils/helper";
import { chainList } from "@config/constants";
import {
  CheckIcon,
  DocumentDuplicateIcon,
  ArrowRightOnRectangleIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from '@heroicons/react/20/solid';
import { Menu, Transition } from '@headlessui/react';

const Disconnect = () => {
  const { chainId, walletAddress, disconnectHandler, setChain } = useWallet();
  const [copiedText, setCopiedText] = useState(false);
  const currentChain = chainList.find(chain => Number(chain.chainId) === Number(chainId))

  const swapChain = useCallback(async (id) => {
    await setChain({ chainId: id });
  }, [setChain])

  const clickHandler = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopiedText(true)
    setTimeout(() => {
      setCopiedText(false);
    }, 2000);
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div className="mx-2 py-2 px-3 bg-app-black rounded-3xl border-2 border-app-black-light">
            <Menu.Button className="align-middle">
              <div className="flex justify-center items-center text-white gap-2">
                <img src={currentChain.logo} alt="" className="h-6 w-6" />
                {shortAddress(walletAddress)}
                {
                  open ?
                    <ChevronUpIcon className="h-6 w-6 m-auto" /> :
                    <ChevronDownIcon className="h-6 w-6 m-auto" />
                }
              </div>
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
            <Menu.Items className="absolute z-10 right-0 mt-2 w-72 origin-top-right border-2 border-app-black-light rounded-3xl bg-app-black">
              <div className="px-2 py-1">
                <Menu.Item>
                  <div>
                    {chainList.map(chain => {
                      const selected = Number(chain.chainId) === Number(chainId);
                      return (
                        <div
                          key={chain.chainId}
                          onClick={() => swapChain(chain.chainId)}
                          className="h-8 bg-app-black-light flex items-center my-2 py-1 px-2 rounded-3xl cursor-pointer hover:bg-app-blue-dark"
                        >
                          <img src={chain.logo} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                          <span className='font-normal mx-3 block truncate'>
                            {chain.name}
                          </span>
                          {
                            selected &&
                            <span className='text-white ml-auto mr-0'>
                              <CheckIcon className="h-5 w-5 text-app-blue-light" aria-hidden="true" />
                            </span>
                          }
                        </div>
                      )
                    })}
                  </div>
                </Menu.Item>
                <div className="flex flex-row">
                  <button
                    onClick={clickHandler}
                    className={`cursor-pointer bg-app-black-light text-white group inline-block w-full items-center rounded-2xl p-2 mb-1 mr-1 hover:bg-app-blue-dark`}
                  >
                    <DocumentDuplicateIcon className="h-6 w-6 m-auto" />
                    {copiedText ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={disconnectHandler}
                    className={`cursor-pointer bg-app-black-light text-white group inline-block w-full items-center rounded-2xl p-2 mb-1 ml-1 hover:bg-app-blue-dark`}
                  >
                    <ArrowRightOnRectangleIcon className="h-6 w-6 m-auto" />
                    Disconnect
                  </button>
                </div>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default Disconnect;
