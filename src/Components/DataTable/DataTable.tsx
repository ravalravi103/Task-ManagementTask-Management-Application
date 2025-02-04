import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorIcon from '@mui/icons-material/Error';
import { toast } from "sonner";

type TaskStatus = "Pending" | "In Progress" | "Completed";
interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
  status: TaskStatus;
}

interface DataTableProps {
  taskFields: string[];
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  visibleRows: Task[];
  getStatusIcon: (status: string) => JSX.Element | null;
  handleEditClick: (task: Task) => void;
  handleDeleteTask: (taskId: number) => void;
  isOverdue: (dueDate: string) => boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  taskFields,
  statusFilter,
  setStatusFilter,
  visibleRows,
  getStatusIcon,
  handleEditClick,
  handleDeleteTask,
  isOverdue 
}) => {
  const theme = useTheme();

  const editTask = (task: Task) => {
    if (isOverdue(task.due_date)) {
      toast.error("Cannot Edit The Due Task");
    } else {
      handleEditClick(task);
    }
  };

  return (
    <Table sx={{ minWidth: 750, height: '200px' }}>
      <TableHead>
        <TableRow>
          {taskFields.map((field, index) => (
            <TableCell key={index} sx={{ textAlign: 'center' }}>
              {field === 'Status' ? (
                <FormControl sx={{ minWidth: 120 }} size="small">
                  <InputLabel id="status-filter-label" sx={{ fontSize: '14px', color: theme.palette.mode === 'dark' ? 'white' : 'black' }}>Status</InputLabel>
                  <Select
                    labelId="status-filter-label"
                    id="status-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    label="Status"
                    size="small"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="OverDue">Over Due</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                field
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {visibleRows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={taskFields.length} sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}>
              No Data Found
            </TableCell>
          </TableRow>
        ) : (
          visibleRows.map((task, index) => {
            const labelId = `enhanced-table-checkbox-${index}`;
            return (
              <TableRow
                key={task.id}
                sx={{
                  backgroundColor: isOverdue(task.due_date) ? 'rgb(255 123 0 / 0.6)' : 'none',
                }}
              >
                <TableCell component="th" id={labelId} scope="row" padding="none" sx={{ textAlign: 'center' }}>
                  {task.id}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{task.title}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{task.description}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{task.due_date}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                    {isOverdue(task.due_date) ? <ErrorIcon color="error" sx={{ fontSize: 30, color: 'rgb(255 102 0)' }} /> : getStatusIcon(task.status)}
                    <Typography sx={{ ml: 1 }}>{isOverdue(task.due_date) ? "OverDue" : task.status}</Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <IconButton color="primary" onClick={() => editTask(task)} title="Edit Task">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteTask(task.id)} title="Delete Task">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
