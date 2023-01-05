import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { createSchedule, updateSchedule, deleteSchedule } from '../lib/api/schedule';

const Form = ({ selectDate, handleClose, url, open, toast, handleGetSchedule, editMode }) => {

    const dateFormat = (date) => {
        // YYYY-MM-DDにフォーマットする。
        return date.toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit", }).split("/").join("-");
    }

    const [value, setValue] = useState({
        calenderId: url.id,
        start: editMode ? selectDate.start : dateFormat(selectDate.start),
        end: editMode ? dateFormat(selectDate.end) : "",
        title: editMode ? selectDate.title : ""
    })

    const handleChange = (e) => {
        if (e.target.name === "title" && e.target.value.length > 30) {
            return;
        }
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            const res = await createSchedule(value.calenderId, value)
            handleClose()
            handleGetSchedule()
            const notify = () => toast.success('スケジュールの登録が完了しました。')
            notify()
        } catch (e) {
            console.log(e)
            const notify = () => toast.error('スケジュールの登録に失敗しました。')
            notify()
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        if (!validate()) return;
        try {
            const res = await updateSchedule(value.calenderId, selectDate.id, value)
            handleClose()
            handleGetSchedule()
            const notify = () => toast.success('スケジュールの更新が完了しました。')
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
            const notify = () => toast.success('スケジュールの削除が完了しました。')
            notify()
        } catch (e) {
            console.log(e)
        }
    }

    const validate = () => {
        let validated = true;
        if (value.title === "") {
            const notify = () => toast.error('タイトルが未入力のため登録できません。')
            notify()
            validated = false;
        }
        if (value.start === "") {
            const notify = () => toast.error('開始日が未入力のため登録できません。')
            notify()
            validated = false;
        }
        if (value.end !== "" && value.start > value.end) {
            const notify = () => toast.error('開始日と終了日の大小関係が正しくありません。')
            notify()
            validated = false;
        }
        return validated;
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
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