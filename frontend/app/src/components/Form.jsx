import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { createSchedule, updateSchedule, deleteSchedule } from '../lib/api/schedule';

const Form = ({ selectDate, handleClose, url, formview, toast, handleGetSchedule, editMode }) => {


    const [value, setValue] = useState({
        calenderId: url.id,
        start: editMode ? selectDate.start : selectDate.start.toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).split("/").join("-"),
        end: editMode ? selectDate.end : "",
        title: editMode ? selectDate.title : ""
    })

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await createSchedule(value.calenderId, value)
            handleClose()
            handleGetSchedule()
            const notify = () => toast.success('スケジュールの登録ができました')
            notify()
        } catch (e) {
            console.log(e)
            const notify = () => toast.error('スケジュールの登録に失敗しました')
            notify()
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await updateSchedule(value.calenderId, selectDate.id, value)
            handleClose()
            handleGetSchedule()
            const notify = () => toast.success('スケジュールの更新ができました')
            notify()
        } catch (e) {
            console.log(e)
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            const res = await deleteSchedule(value.calenderId, selectDate.id)
            handleClose()
            handleGetSchedule()
            const notify = () => toast.success('スケジュールの削除ができました')
            notify()
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <>
            <Dialog open={formview} onClose={handleClose}>
                {editMode ? <DialogTitle>スケジュール更新</DialogTitle> : <DialogTitle>スケジュール入力</DialogTitle>}
                <DialogContent>
                    <label>タイトル</label>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        name="title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={value.title}
                        onChange={(e) => handleChange(e)}
                    />
                    <label>開始日</label>
                    <TextField
                        margin="dense"
                        id="start"
                        name="start"
                        type="date"
                        fullWidth
                        variant="standard"
                        value={value.start}
                        onChange={(e) => handleChange(e)}
                    />
                    <label>終了日</label>
                    <TextField
                        margin="dense"
                        id="end"
                        name="end"
                        type="date"
                        fullWidth
                        variant="standard"
                        value={value.end ?? ''}
                        onChange={(e) => handleChange(e)}
                    />
                </DialogContent>
                <DialogActions>
                    {editMode ?
                        <>
                            <Button onClick={handleUpdate} variant="contained" color="primary">更新</Button>
                            <Button onClick={handleDelete} variant="contained" color="secondary">削除</Button>
                        </>
                        : <Button onClick={handleSubmit} variant="contained" color="primary">登録</Button>
                    }
                    <Button onClick={handleClose} variant="contained">キャンセル</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
export default Form;