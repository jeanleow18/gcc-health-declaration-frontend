import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import healthDeclarationServices from './HealthDeclarationServices.service';
import { useSnackbar } from './SnackbarService';

function massageData(data) {
    return data ? 'Yes' : 'No';
}

export default function HealthDeclarationFormView() {
    const { showSnackbar } = useSnackbar();
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        healthDeclarationServices.getHealthDeclarations()
            .then((apiData) => {
                setData(apiData);
            })
            .catch((error) => {
                showSnackbar(error.toString(), 'error');
            });
    }, []);

    return (
        <Container>
            <Title>View Health Declaration Forms</Title>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Table size="medium">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Temperature</TableCell>
                                    <TableCell>Has Symptoms</TableCell>
                                    <TableCell>Is Close Contact</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => (
                                    <TableRow key={row.ID}>
                                        <TableCell>{row.Name}</TableCell>
                                        <TableCell>{row.Temperature}</TableCell>
                                        <TableCell>{massageData(row.HasSymptoms)}</TableCell>
                                        <TableCell>{massageData(row.CloseContact)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Link color="primary" href="/" sx={{ mt: 3 }}>
                            Submit new health declaration form
                        </Link>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}