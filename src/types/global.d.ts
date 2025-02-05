interface TabItem {
    label: string;
    icon: React.ReactNode;
    path: string;
    component: React.LazyExoticComponent<React.ComponentType<any>>;
}

type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | "OverDue";

interface Task {
    id?: number;
    title: string;
    description: string;
    due_date: string;
    status: TaskStatus;
}

