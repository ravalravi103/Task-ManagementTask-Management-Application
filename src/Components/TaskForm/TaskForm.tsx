import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { Button, Grid, TextField } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import TaskFormLogic from '../HOC/TaskFormLogic';

export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';
export interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
  status: TaskStatus;
}

export interface TaskFormProps {
  formik: any;
  taskArray: TaskStatus[];
  loading: boolean;
  error: string;
  onClose?: () => void;
  task?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ formik, task, taskArray, loading, error }) => {
  return (
    <React.Fragment>
      <Box>
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', mt: formik.values.id ? '0' : '30px' }}>
          {!task && (
            <Grid item xs={12} md={6}>
              <Box component="img" src="/images/task.png" alt="Task Image" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Grid>
          )}

          <Grid item xs={12} md={task ? 12 : 6}>
            <Box mb={2}>
              <Box sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                {formik.values.id ? 'Edit Task' : 'Create Task'}
              </Box>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  label="Task Title"
                  fullWidth
                  margin="normal"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
                <TextField
                  label="Task Description"
                  fullWidth
                  margin="normal"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <Box sx={{ width: '100%' }}>
                      <DatePicker
                        label="Due Date"
                        value={formik.values.due_date ? dayjs(formik.values.due_date) : null} // Convert string to Dayjs
                        onChange={(newValue) => {
                          formik.setFieldValue('due_date', newValue ? newValue.format('YYYY-MM-DD') : '');  // Save as string in 'YYYY-MM-DD' format
                        }}
                        minDate={dayjs()}
                        sx={{ width: '100%' }}
                      />
                    </Box>
                  </DemoContainer>
                </LocalizationProvider>
                {formik.touched.due_date && formik.errors.due_date && (
                  <FormHelperText error>{formik.errors.due_date}</FormHelperText>
                )}
                <FormControl fullWidth sx={{ marginTop: '5%', marginBottom: '2%' }}>
                  <InputLabel id="status">Status</InputLabel>
                  <Select
                    labelId="status"
                    id="status"
                    value={formik.values.status}
                    label="Status"
                    onChange={(e) => formik.setFieldValue('status', e.target.value)}
                  >
                    {taskArray.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.status && formik.errors.status && (
                    <FormHelperText error>{formik.errors.status}</FormHelperText>
                  )}
                </FormControl>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Submit'}
                </Button>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {loading && <p>Loading tasks...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </React.Fragment>
  );
};

export default TaskFormLogic(TaskForm);
