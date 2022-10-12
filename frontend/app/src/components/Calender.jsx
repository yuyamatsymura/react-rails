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

    

    useEffect(() => {
        handleGetSchedule();
    }, []);

    const handleGetSchedule = async () => {
        try {
            const res = await getSchedule(params.id);
            console.log(res.data);
            setSchedule(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    const handleDateSelect = (date) => {
        // 2回クリックされる場合の考慮
        setFormview(false)
        setFormview(true)
        setSelectDate(date)
    };

    const handleClose = () => {
        setFormview(false);
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
                />
            </Container>
            {formview ? < Form selectDate={selectDate} handleClose={handleClose} url={params} formview={formview} toast={toast}/> : null}
        </>
    );
};
export default Calender;