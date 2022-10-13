import React, { useEffect, useState } from 'react';
import { getSchedule } from '../lib/api/schedule';
import { useParams } from 'react-router-dom';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Form from './Form';
import { Box, Button, Container, Toolbar } from '@material-ui/core';
import toast, { Toaster } from 'react-hot-toast';

const Calender = () => {
    const params = useParams();

    const [schedule, setSchedule] = useState([]);
    const [formview, setFormview] = useState(false);
    const [selectDate, setSelectDate] = useState();
    const [editMode, setEditMode] = useState(false);
    const [selectSchedule, setSelectSchedule] = useState();



    useEffect(() => {
        handleGetSchedule();
    }, []);

    const handleGetSchedule = async () => {
        try {
            const res = await getSchedule(params.id);
            setSchedule(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    const handleDateSelect = (date) => {
        setSelectDate(date)
        setEditMode(false)
        setFormview(true)
    };

    const handleClose = () => {
        setFormview(false);
    };

    const handleEventClick = (data) => {
        const selectData = schedule.find(e => e.id == data.event.id)
        setEditMode(true)
        setSelectSchedule(selectData);
        setFormview(true)
    };

    return (
        <>
            <Box component="span" m={1}>
                <Button variant="contained">
                    Default
                </Button>
            </Box>
            <Toaster />
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
            {formview ?
                < Form
                    editMode={editMode}
                    selectDate={editMode ? selectSchedule : selectDate}
                    handleClose={handleClose}
                    url={params}
                    formview={formview}
                    toast={toast}
                    handleGetSchedule={handleGetSchedule}
                />
                : null
            }
        </>
    );
};
export default Calender;