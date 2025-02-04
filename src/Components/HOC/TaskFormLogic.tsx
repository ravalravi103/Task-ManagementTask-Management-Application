import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../Redux/store'; 
import { createNewTask, updateExistingTask } from '../../Redux/Slice/taskSlice'; // Import your action creators
import { toast } from 'sonner';
import { Task, TaskFormProps, TaskStatus } from '../TaskForm/TaskForm';

const TaskFormLogic = (Component: React.ComponentType<TaskFormProps>) => {
  const TaskFormWithLogic: React.FC<{ task?: Task; onClose?: () => void }> = ({ task, onClose }) => {
    const taskArray: TaskStatus[] = ['Pending', 'In Progress', 'Completed']; // Static statuses
    const { taskState: { error, loading } } = useAppSelector((state) => state);
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            id: task?.id ,
            title: task?.title || '',
            description: task?.description || '',
            due_date: task?.due_date || '',
            status: task?.status || '',
        },
          
      validationSchema: Yup.object({
        title: Yup.string().required('Task title is required'),
        description: Yup.string(),
        due_date: Yup.date().required('Due date is required'),
        status: Yup.string().oneOf(taskArray, 'Invalid status').required('Status is required'),
      }),
      onSubmit: async (values) => {
        try {
          let data;
          const status: TaskStatus = values.status as TaskStatus;
          if (task) {
            data = await dispatch(updateExistingTask({ ...values, id: task.id, status }));
          } else {
            data = await dispatch(createNewTask({ ...values, status }));
          }

          if (data.meta.requestStatus === 'fulfilled') {
            toast.success(task ? 'Task Updated Successfully' : 'Task Created Successfully');
            formik.resetForm();
            if (task && onClose) {
              onClose();
            }
          } else {
            toast.error('Error Creating/Updating Task');
          }
        } catch (error) {
          toast.error('Error Creating/Updating Task');
        }
      },
    });

    return <Component formik={formik} taskArray={taskArray} loading={loading} error={error} onClose={onClose} task={task} />;
  };

  return TaskFormWithLogic;
};

export default TaskFormLogic;
