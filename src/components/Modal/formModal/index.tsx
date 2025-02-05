import { useEffect, useState } from "react";
import Cookies from "js-cookie";
interface Props {
    submit?: any;
    show?: boolean;
    close?: any;
    isNew?: boolean;
    data?: any;
    dataTeam?: any;
    className?: string;
}

const FormModal = ({ submit, show = false, close, isNew, data, dataTeam }: Props) => {
    const [form, setForm]: any = useState({
        id: "",
        title: "",
        description: "",
        status: "",
        asignt: "",
        authorId: null,
    });
    const [role, setRole] = useState("")
    useEffect(() => {
        if (isNew) {
            setForm({
                id: "",
                title: "",
                description: "",
                status: "",
                asignt: "",
                authorId: 1,
            })
        } else {
            setForm({
                id: data.id,
                title: data?.title,
                description: data?.description,
                status: data?.status,
                asignt: data?.asignt,
                authorId: data.authorId,
            })
        }
    }, [isNew])
    useEffect(() => {
        let cookie: any = Cookies.get("login");
        cookie = JSON.parse(cookie);
        setRole(cookie.user.role)
    }, [])
    const handleSubmit = () => {
        submit(form)
    }
    return (
        <div id="default-modal" className={`overflow-y-auto overflow-x-hidden modal fixed  z-50 justify-center items-center w-full mt-100 md:inset-0 h-[calc(100%-1rem)] max-h-full ${show ? '' : 'hidden'}`} >
            <div className="relative p-4 w-full max-w-2xl max-h-full mx-auto">
                <div className="relative bg-white rounded-lg shadow-md border-gray-500 dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {isNew ? 'Add New Task' : 'Edit Task'}
                        </h3>
                        <button type="button" onClick={close} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        <div className="mb-2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Title
                            </label>
                            <input
                                type="text"
                                placeholder="Title"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                            />
                        </div>
                        <div className="mb-2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Description
                            </label>
                            <textarea
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                placeholder="Description"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            ></textarea>
                        </div>
                        <div className="mb-2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Status
                            </label>
                            <select
                                value={form.status}
                                onChange={(e) => setForm({ ...form, status: e.target.value })}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            >
                                <option value="" disabled>Status</option>
                                <option value="NotStarted">Not Started</option>
                                <option value="OnProgress">On Progress</option>
                                <option value="Done">Done</option>
                                <option value="Riject">Riject</option>
                            </select>
                        </div>

                        {role == "LEAD" && (<div className="mb-2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Asignt to
                            </label>
                            <select
                                value={form.asignt}
                                onChange={(e) => setForm({ ...form, asignt: e.target.value })}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            >
                                <option value="" disabled>Select Team</option>

                                {dataTeam.length > 0 && dataTeam.map((x: any, key: any) => {
                                    return (
                                        <>
                                            <option value={x.id} key={key}>{x.name}</option>
                                        </>
                                    )
                                })}

                            </select>
                        </div>)}

                    </div>
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button onClick={handleSubmit} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                        <button onClick={close} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormModal;