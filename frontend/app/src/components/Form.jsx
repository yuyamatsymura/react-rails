import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { createSchedule } from '../lib/api/schedule';

const Form = ({ selectDate, handleClose, url, formview, toast }) => {
    // todo split("/").join("-") を変換するよう修正する
    const [calenderId, setCalenderId] = useState(url.id);
    const [value, setValue] = useState({
        calenderId: calenderId,
        start: selectDate.start.toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).split("/").join("-"),
        end: "",
        title: ""
    })

    const handleChange = (e) => {
        console.log("handleChange")
        console.log(e.target)
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await createSchedule(value)
            handleClose()
            const notify = () => toast.success('スケジュールの登録ができました')
            notify()
            console.log(res)
        } catch (e) {
            console.log(e)
            const notify = () => toast.error('スケジュールの登録に失敗しました')
            notify()
        }
    }

    return (
        <>
            <Dialog open={formview} onClose={handleClose}>
                <DialogTitle>スケジュール入力</DialogTitle>
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
                        value={value.end}
                        onChange={(e) => handleChange(e)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained">Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">Subscribe</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
export default Form;