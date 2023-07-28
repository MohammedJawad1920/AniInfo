
import { Fragment } from 'react'
import Image from 'next/image'
import { Menu, Transition } from '@headlessui/react'
import { UserIcon, UserCircleIcon } from '@heroicons/react/24/solid'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Profile({user, LogoutLink}) {
  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div>
        <Menu.Button className="inline-flex  justify-center rounded-full text-sm font-semibold p-1 text-black bg-amber-400">
          <UserIcon className=' w-5 h-5 md:w-7 md:h-7'/>
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
        <Menu.Items className="absolute right-0 z-10 mt-3 w-56 origin-top-right rounded-md bg-zinc-300 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div className='flex flex-col items-center justify-center p-4'>
                  {
                    user?.picture 
                    ? <Image 
                        src={user?.picture}
                        width={65}
                        height={65}/>
                    : <div className='w-16 h-16'>
                        <UserCircleIcon />
                      </div> 
                  }
                  <div>
                    <h2 className='font-bold'>Welcome</h2>
                    {user?.given_name?.[0]}
                    {user?.family_name?.[0]}
                 </div>
                  <LogoutLink className='bg-amber-400 py-1 px-2 font-bold rounded' >Logout</LogoutLink>
                </div>
               
                
              )}
            </Menu.Item> 
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
