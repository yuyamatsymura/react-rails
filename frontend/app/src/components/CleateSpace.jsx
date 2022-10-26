import React, { useState } from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import toast, { Toaster } from 'react-hot-toast';
import Alert from '@material-ui/lab/Alert';
import { createCalender } from '../lib/api/calender';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExplanationCard from './ExplanationCard';
import Spacer from './Spacer';

const CleateSpace = () => {

    const [created, setCreated] = useState(false);
    const [url, setUrl] = useState("");
    // todo react-URL
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await createCalender()
            setUrl(baseUrl + res.data.url)
            setCreated(true)
            const notify = () => toast.success('共有カレンダーが作成されました')
            notify()
        } catch (e) {
            console.log(e)
            const notify = () => toast.error('共有カレンダーの作成に失敗しました')
            notify()
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(url)
        const notify = () => toast.success('URLをコピーしました')
        notify()
    }

    return (
        <>
            <Toaster />
            <Grid container alignItems='center' justifyContent='center' direction="column">
                <h1>共有カレンダーの作成</h1>
                <Box component="span" m={1}>
                    <Button onClick={handleSubmit} variant="contained" color="primary" disabled={created}>作成</Button>
                </Box>
                {created ? <Box mt={2}>
                    <Alert severity="success" size="small" component="span" action={
                        <FileCopyIcon fontSize="small" color="action" onClick={handleCopy} />
                    }>
                        < a target = "_blank" href = {url} >{url}</ a >
                    </Alert>
                </Box> : null}
                <Spacer />
                <ExplanationCard />
            </Grid>
        </>
    );
};
export default CleateSpace;