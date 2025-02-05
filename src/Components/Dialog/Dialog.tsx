import React, { Suspense } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TaskFormLogic from '../HOC/TaskFormLogic'; // Import TaskFormLogic

const TaskForm = React.lazy(() => import('../TaskForm/TaskForm'));

interface TaskUpdateDialogProps {
  open: boolean;
  onClose: () => void;
  task: Task;
}

const TaskUpdateDialog: React.FC<TaskUpdateDialogProps> = ({ open, onClose, task }) => {

  const TaskFormWithLogic = TaskFormLogic(TaskForm);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{ position: 'absolute', right: 20, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Suspense fallback={<div>Loading...</div>}>
          <TaskFormWithLogic task={task} onClose={onClose} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};

export default TaskUpdateDialog;
