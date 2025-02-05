import Task from "@/components/Task";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
export const metadata: Metadata = {
    title: "Task",
    description:
        "Task",
};

const TaskPage = () => {
    return (
        <DefaultLayout>
            <Task />
        </DefaultLayout>
    );
};

export default TaskPage;
