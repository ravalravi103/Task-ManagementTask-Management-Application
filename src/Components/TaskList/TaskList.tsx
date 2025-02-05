import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { Box } from '@mui/material';
import React, { Suspense, useEffect } from 'react';
import { deleteTaskById, fetchTasks } from '../../Redux/Slice/taskSlice';
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper'
import { toast } from 'sonner';
import DataTable from '../DataTable/DataTable';

const TaskUpdateDialog = React.lazy(() => import('../Dialog/Dialog'));

const TaskList = () => {
  const { taskState: { data, error, loading } } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [statusFilter, setStatusFilter] = React.useState<TaskStatus>("Pending");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<Task>();

  useEffect(() => {
    dispatch(fetchTasks({ page, rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isOverdue = (dueDate: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    return due < today;
  };

  const filteredRows = React.useMemo(
    () =>
      data.filter((task) => {
        if (!statusFilter) return true;
        console.log(statusFilter)
        if (statusFilter === "OverDue") {
          return isOverdue(task.due_date);
        }
        if (statusFilter === "Pending") {
          return !isOverdue(task.due_date) && task.status === 'Pending';
        }
        return task.status.toLowerCase() === statusFilter.toLowerCase();
      }),
    [statusFilter, data]
  );

  const visibleRows = React.useMemo(
    () => filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, filteredRows]
  );
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircleIcon sx={{ color: 'green' }} />;
      case "In Progress":
        return <HourglassEmptyIcon sx={{ color: 'orange' }} />;
      case "Pending":
        return <AccessAlarmIcon sx={{ color: 'red' }} />;
      default:
        return null;
    }
  };

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDeleteTask = async (taskId: number) => {
    const data = await dispatch(deleteTaskById(taskId));
    if (data.meta.requestStatus === 'fulfilled') {
      toast.success("Task Deleted Successfully");
    } else {
      toast.error("Error Deleting Task, Task Not Found");
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, mt: "60px", boxShadow: '0px 1px 2px 2px rgba(169, 169, 169, 0.4)' }}>
        <TableContainer sx={{ maxHeight: 700 }}>
          <DataTable
            taskFields={['TaskNo', 'Title', 'Description', 'Date', 'Status', 'Actions']}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            visibleRows={visibleRows}
            getStatusIcon={getStatusIcon}
            handleEditClick={handleEditClick}
            handleDeleteTask={handleDeleteTask}
            isOverdue={isOverdue}
          />
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {selectedTask && (
        <Suspense fallback={<div>Loading...</div>}>
          {dialogOpen && <TaskUpdateDialog open={dialogOpen} onClose={handleDialogClose} task={selectedTask} />}
        </Suspense>
      )}
    </Box>
  );
};

export default TaskList;
