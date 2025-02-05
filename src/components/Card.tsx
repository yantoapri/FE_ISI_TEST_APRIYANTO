"use client"
import avatar from '../assets/images/avatar.jpg';
import Image from 'next/image';
interface Props {
    item: any;
    cardTitle: string;
    createNew?: any;
    handleEdit?: any;
    className?: string;
}

const Card: React.FC<Props> = ({ cardTitle, item, createNew, handleEdit }) => {

    return (
        <div className="grid-cols-3">
            <div className="w-full max-w-sm p-2 bg-gray-200 border border-gray-200 rounded-lg shadow-sm sm:p-2 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex px-1">
                    <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                        {cardTitle}
                    </h5>

                </div>
                <div className='card-task overflow-y-auto'>
                    {item && item.map((x: any, key: any) => {
                        return (
                            <>
                                <div key={cardTitle + "" + key} className="w-full max-w-sm p-2 mb-2 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-2 dark:bg-gray-800 dark:border-gray-700">
                                    <h6 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                                        {x.title}
                                    </h6>
                                    <p className='text-sm text-gray-800 bg-gray-200 p-2'>
                                        {x.description}
                                    </p>
                                    <div className='flex px-1 mt-3'>
                                        <button className='font-medium text-grey-600 dark:text-grey-500 hover:underline mx-1'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ><path d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-370h80v370q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-390h80v390Z" /></svg>
                                        </button>
                                        <button className='font-medium text-grey-600 dark:text-grey-500 hover:underline mx-1'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" /></svg>
                                        </button>
                                        <button className='font-medium text-grey-600 dark:text-grey-500 hover:underline mx-1' onClick={() => handleEdit(x.id)}>
                                            <svg
                                                className="fill-current"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g clipPath="url(#clip0_62_9787)">
                                                    <path
                                                        d="M15.55 2.97499C15.55 2.77499 15.475 2.57499 15.325 2.42499C15.025 2.12499 14.725 1.82499 14.45 1.52499C14.175 1.24999 13.925 0.974987 13.65 0.724987C13.525 0.574987 13.375 0.474986 13.175 0.449986C12.95 0.424986 12.75 0.474986 12.575 0.624987L10.875 2.32499H2.02495C1.17495 2.32499 0.449951 3.02499 0.449951 3.89999V14C0.449951 14.85 1.14995 15.575 2.02495 15.575H12.15C13 15.575 13.725 14.875 13.725 14V5.12499L15.35 3.49999C15.475 3.34999 15.55 3.17499 15.55 2.97499ZM8.19995 8.99999C8.17495 9.02499 8.17495 9.02499 8.14995 9.02499L6.34995 9.62499L6.94995 7.82499C6.94995 7.79999 6.97495 7.79999 6.97495 7.77499L11.475 3.27499L12.725 4.49999L8.19995 8.99999ZM12.575 14C12.575 14.25 12.375 14.45 12.125 14.45H2.02495C1.77495 14.45 1.57495 14.25 1.57495 14V3.87499C1.57495 3.62499 1.77495 3.42499 2.02495 3.42499H9.72495L6.17495 6.99999C6.04995 7.12499 5.92495 7.29999 5.87495 7.49999L4.94995 10.3C4.87495 10.5 4.92495 10.675 5.02495 10.85C5.09995 10.95 5.24995 11.1 5.52495 11.1H5.62495L8.49995 10.15C8.67495 10.1 8.84995 9.97499 8.97495 9.84999L12.575 6.24999V14ZM13.5 3.72499L12.25 2.49999L13.025 1.72499C13.225 1.92499 14.05 2.74999 14.25 2.97499L13.5 3.72499Z"
                                                        fill=""
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_62_9787">
                                                        <rect width="16" height="16" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </button>

                                        <div className='ml-auto flex px-1'>
                                            <span className="h-8 w-8 rounded-full">
                                                <Image src={avatar} alt="User" className='rounded-full w-7 h-7' />
                                            </span>
                                            <span className="h-8 w-8 rounded-full">
                                                <Image src={avatar} alt="User" className='rounded-full w-7 h-7' />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>



            </div>
        </div>
    )
}

export default Card;