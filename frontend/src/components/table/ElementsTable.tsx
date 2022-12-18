import React, {useEffect, useRef} from 'react'
import './table.css'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import {update, set, selectElements, TableElement} from '../../store/elementsSlice'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow
} from "@mui/material";
import {CompatClient, Stomp} from "@stomp/stompjs";
import {selectThreshold} from "../../store/thresholdSlice";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import {Header} from "./Header";
import {selectSorting} from "../../store/sortingSlice";


export function ElementsTable() {
    const rows = Object.values(useAppSelector(selectElements))
    const threshold = useAppSelector(selectThreshold)
    const { order, orderBy } = useAppSelector(selectSorting);
    const dispatch = useAppDispatch()

    if (rows.length === 0) {
        // fetch('http://localhost:8080/elements/all')
        fetch('/elements/all')
            .then((response) => response.json())
            .then((data: TableElement[]) => dispatch(set(data)))
            .catch((error) => {throw new Error(error);});
    }

    rows.sort((a, b) => {
        let result = 0;
        if (orderBy === 'symbol') {
            result = a.symbol.localeCompare(b.symbol)
        } else {
            result = a.price - b.price
        }
        if (order === 'desc') {
            result *= -1;
        }

        return result;
    })

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(100);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const wsRef = useRef<WebSocket|null>(null);
    useEffect(() => {
        const webSocket = new WebSocket('ws://localhost:8080/ws');

        webSocket.onopen = () => console.log("ws opened");
        webSocket.onclose = () => console.log("ws closed");


        wsRef.current = webSocket

        return () => {
            webSocket.close();
        };
    }, [])

    const clientRef = useRef<CompatClient|null>(null);
    useEffect(() => {
        const stompClient = Stomp.over(wsRef.current);
        stompClient.connect({}, () => {
            stompClient.subscribe("/topic/updates", payload => {
                dispatch(update(JSON.parse(payload.body)))
            });
        });
        clientRef.current = stompClient

        return () => {

        }
    }, [])

    return <div>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table" size='small'>
                <Header />
                <TableBody>
                    {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                    ).map((row) => (
                        <TableRow key={row.symbol}>
                            <TableCell component="th" scope="row" align="right" style={{width: "50%"}}>
                                {row.symbol}
                            </TableCell>
                            <TableCell
                                align="left"
                                className={row.price < threshold ? 'red' : 'green'}
                            >
                                {row.price}
                            </TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[10, 50, 100, 500, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    </div>
}