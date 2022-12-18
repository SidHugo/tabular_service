import React from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks'
import {selectThreshold, set} from "../store/thresholdSlice";
import {InputAdornment, TextField} from "@mui/material";


export function ThresholdInput() {
    const threshold = useAppSelector(selectThreshold)
    const dispatch = useAppDispatch()

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        dispatch(set(parseFloat(event.target.value)))
    }

    return <div>
        <TextField
            id="threshold-input"
            label="Threshold"
            variant="outlined"
            value={threshold}
            onChange={handleChange}
            InputProps={{
                endAdornment: <InputAdornment position="end">$</InputAdornment>,
                inputMode: 'numeric',
            }}
        />
    </div>
}