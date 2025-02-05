'use client'
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import Card from '../Card';
import { useEffect, useState } from "react";
import FormModal from "../Modal/formModal";
import Swal from 'sweetalert2'
import Loader from "@/components/common/Loader";
import Cookies from "js-cookie";
import { object } from "zod";
const Task = () => {
    let [modal, setModal] = useState(false);
    let [currentUser, setCurrentUser]: any = useState("")
    let [isNew, setNew] = useState(true);
    let [editData, setEditData] = useState([]);
    let [task, setTask]: any = useState({ newTask: [], onProgress: [], done: [], reject: [] })
    let [team, setTeam]: any = useState([]);
    let [loading, setLoading]: any = useState(false)
    const handleClose = () => {
        setNew(true)
        setModal(false);
    }
    const handleCreate = () => {
        setNew(true)
        setModal(!modal);
    }
    const handleEdit = async (id: any) => {
        setLoading(true)
        setNew(false)
        await fetch("/api/task/" + id).then((res: any) => {
            res.json().then((result: any) => {
                setEditData(result.data)
            })
        }).finally(() => {
            setModal(!modal);
            setLoading(false)
        })
    }
    const handleSubmit = async (data: any) => {

        if (isNew) {
            try {
                data["authorId"] = currentUser.id
                setLoading(true)
                let res = await fetch("/api/task", {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                let result = await res.json();
                if (res && result.ok) {
                    handleClose();
                    setLoading(false)
                    Swal.fire({
                        title: 'Success',
                        text: 'Data Hasben Saved',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then((res) => {
                        loadTask();
                    })
                } else {
                    setLoading(false)
                    let key = Object.keys(result.errors.fieldErrors)
                    let msg = "";
                    key.map(x => {
                        msg += result.errors.fieldErrors[x] + "\n"
                    })
                    Swal.fire({
                        title: result.message,
                        text: msg,
                        icon: 'error',
                    })
                }
            } catch (e: any) {
                setLoading(false)
                Swal.fire({
                    title: 'Error!',
                    text: e.message,
                    icon: 'error',
                })
            }
        } else {
            try {
                setLoading(true)
                await fetch("/api/task", {
                    method: "PUT",
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then((res: any) => {
                    res.json().then((result: any) => {
                        setLoading(false)
                        Swal.fire({
                            title: 'Success',
                            text: 'Data Hasben Saved',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then((res) => {
                            setLoading(false)
                            handleClose();
                            loadTask();
                        })
                    })
                });
            } catch (e: any) {
                setLoading(false)
                Swal.fire({
                    title: 'Error!',
                    text: e.message,
                    icon: 'error',
                })
            }

        }
    }
    const loadTask = async () => {
        setLoading(true)
        await fetch("/api/task").then((res: any) => {
            res.json().then((data: any) => {
                setTask(data.data)
                setLoading(false)
            })
        });
    }



    useEffect(() => {

        setLoading(true)
        Promise.all([
            fetch("/api/task").then((res: any) => {
                res.json().then((data: any) => {
                    setTask(data.data)
                    setLoading(false)
                })
            }),
            fetch("/api/user").then((res: any) => {
                res.json().then((data: any) => {
                    setTeam(data.data)
                })
            })
        ]).then(() => {
            setLoading(false)
        })
        let cookie: any = Cookies.get("login");
        cookie = JSON.parse(cookie);
        setCurrentUser(cookie.user)
    }, [])
    return (
        <div className="w-full ">
            {loading ? <Loader /> : <></>}
            <Breadcrumb pageName="Task" />
            <FormModal
                show={modal}
                close={handleClose}
                isNew={isNew}
                data={editData}
                submit={(e: any) => handleSubmit(e)}
                dataTeam={team}

            />
            <div className="w-full flex mb-2">
                {currentUser.role == "LEAD" && (<button onClick={handleCreate} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add New Task</button>)}
                <div className="w-auto ml-2">
                    <input
                        id="search"
                        type="text"
                        placeholder="Search"
                        className="w-full rounded-lg border-[1.5px] border-stroke  px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"

                    />
                </div>
            </div>
            <div className="relative overflow-x-auto">
                <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="mb-2 mx-1 ">
                        <Card cardTitle="Not Started" item={task.newTask} handleEdit={handleEdit}></Card>
                    </div>
                    <div className="mb-2 mx-1 ">
                        <Card cardTitle="On Progress" item={task.onProgress} handleEdit={handleEdit}></Card>
                    </div>
                    <div className="mb-2 mx-1 ">
                        <Card cardTitle="Done" item={task.done} handleEdit={handleEdit}></Card>
                    </div>
                    <div className="mb-2 mx-1 ">
                        <Card cardTitle="Reject" item={task.reject} handleEdit={handleEdit}></Card>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Task;
