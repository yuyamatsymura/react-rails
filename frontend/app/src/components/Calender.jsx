import React, { useEffect, useState } from 'react';
import { getSchedule } from '../lib/api/schedule';
import { useParams } from 'react-router-dom';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Form from './Form';

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

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale="ja"
                selectable="true"
                select={handleDateSelect}
                events={schedule}
            />
            {formview ? < Form selectDate={selectDate} setFormview={setFormview} url={params}/> : null}
        </>
    );
};
export default Calender;