interface TabItem {
    label: string;
    icon: React.ReactNode;
    path: string;
    component: React.LazyExoticComponent<React.ComponentType<any>>;
}

interface Task {
    id: number;
    title: string;
    description: string;
    due_date: string;
    status: TaskStatus;
}

type TaskStatus = 'Pending' | 'In Progress' | 'Completed';