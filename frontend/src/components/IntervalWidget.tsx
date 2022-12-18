import React from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks'
import {Button, Grid, InputAdornment, TextField} from "@mui/material";
import {selectInterval, set} from "../store/intervalWidgetSlice";


export function IntervalWidget() {
    const interval = useAppSelector(selectInterval)
    const dispatch = useAppDispatch()

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        dispatch(set(parseFloat(event.target.value)))
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        fetch('/config/updateInterval', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ intervalMillis: interval })
        })
    }

    return <div>
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <TextField
                    id="threshold-input"
                    label="Update interval"
                    variant="outlined"
                    value={interval}
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">ms</InputAdornment>,
                        inputMode: 'numeric',
                    }}
                />
            </Grid>
            <Grid item xs={6} alignItems="stretch" style={{ display: "flex" }}>
                <Button variant="contained" onClick={handleClick}>
                    Send update interval
                </Button>
            </Grid>
        </Grid>
    </div>
}