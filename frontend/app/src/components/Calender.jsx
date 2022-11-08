import React, { useEffect, useState } from 'react';
import { getSchedule } from '../lib/api/schedule';
import { useParams } from 'react-router-dom';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Form from './Form';
import { Box, Button, Container, Toolbar } from '@material-ui/core';
import toast, { Toaster } from 'react-hot-toast';
import Spacer from './Spacer';

const Calender = () => {
    const params = useParams();
    const [schedule, setSchedule] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectDate, setSelectDate] = useState();
    const [editMode, setEditMode] = useState(false);
    const [selectSchedule, setSelectSchedule] = useState();



    useEffect(() => {
        handleGetSchedule();
    }, []);

    const handleGetSchedule = async () => {
        try {
            const res = await getSchedule(params.id);
            let newSchedule = [];
            res.data.forEach(value => {
                newSchedule.push({
                    id: value.id,
                    calenderId: value.calenderId,
                    start: value.start,
                    end: new Date(Date.parse(value.end)),
                    title: value.title
                })
            });
            setSchedule(newSchedule)
        } catch (e) {
            const notify = () => toast.error('共有カレンダーが作成されていません\n 共有カレンダー作成ページにリダイレクトします')
            notify()
            // todo react-URL
            setTimeout(() => { window.location.href = process.env.REACT_APP_BASE_URL }, 3000);
        }
    };

    const handleDateSelect = (date) => {
        setSelectDate(date)
        setEditMode(false)
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEventClick = (data) => {
        const selectData = schedule.find(e => e.id == data.event.id)
        setEditMode(true)
        setSelectSchedule(selectData);
        setOpen(true)
    };

    return (
        <>
            <Toaster />
            <Spacer />
            <Container maxWidth="md">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locale="ja"
                    selectable="true"
                    select={handleDateSelect}
                    events={schedule}
                    eventClick={handleEventClick}
                />
            </Container>
            {open ?
                < Form
                    editMode={editMode}
                    selectDate={editMode ? selectSchedule : selectDate}
                    handleClose={handleClose}
                    url={params}
                    open={open}
                    toast={toast}
                    handleGetSchedule={handleGetSchedule}
                />
                : null
            }
            <Spacer />
        </>
    );
};
export default Calender;