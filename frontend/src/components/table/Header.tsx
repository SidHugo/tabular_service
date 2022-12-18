import React from 'react'
import {TableElement} from "../../store/elementsSlice";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectSorting, set} from "../../store/sortingSlice";
import {TableCell, TableHead, TableRow, TableSortLabel} from "@mui/material";
import Box from "@mui/material/Box";
import { visuallyHidden } from '@mui/utils';

interface HeadCell {
    id: keyof TableElement;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'symbol',
        numeric: false,
        label: 'Symbol',
    },
    {
        id: 'price',
        numeric: true,
        label: 'Price',
    }
];

export function Header() {
    const { order, orderBy } = useAppSelector(selectSorting);
    const dispatch = useAppDispatch()

    const createSortHandler = (property: keyof TableElement) => (event: React.MouseEvent<unknown>) => {
        const isAsc = orderBy === property && order === 'asc';
        dispatch(set({
            order: isAsc ? 'desc' : 'asc',
            orderBy: property
        }))
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'left' : 'right'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
