import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Title from './Title';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import healthDeclarationServices from './HealthDeclarationServices.service';
import { useSnackbar } from './SnackbarService';

export default function HealthDeclarationFormCreate() {
    const navigate = useNavigate();
    const [name, setName] = React.useState("");
    const [temperature, setTemperature] = React.useState("");
    const [hasSymptoms, setHasSymptoms] = React.useState(false);
    const [isCloseContact, setIsCloseContact] = React.useState(false);
    const { showSnackbar } = useSnackbar();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            name,
            temperature,
            hasSymptoms,
            isCloseContact,
        };

        healthDeclarationServices.postHealthDeclaration(data)
            .then((response) => {
                setName("");
                setTemperature("");
                setHasSymptoms(false);
                setIsCloseContact(false);

                navigate("/view");
                showSnackbar(response.message, 'success');

            })
            .catch((error) => {
                showSnackbar(error.message, 'error');
            });

    };

    return (
        <Container maxWidth="sm">
            <Title>Health Declaration Form</Title>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="name"
                            name="name"
                            required
                            fullWidth
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                            label="Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="temperature"
                            required
                            type="number" step="0.01"
                            fullWidth
                            onChange={(e) => setTemperature(e.target.value)}
                            id="temperature"
                            label="Temperature (°C)"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            required
                            control={<Checkbox name="hasSymptoms" checked={hasSymptoms} onChange={(e) => setHasSymptoms(e.target.checked)} />}
                            label="Do you have any of the following symptoms now or within the last 14 days?"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            required
                            control={<Checkbox name="isCloseContact" checked={isCloseContact} onChange={(e) => setIsCloseContact(e.target.checked)} />}
                            label="Have you been in contact with anyone who is suspected to have/have been diagnosed with Covid-19 within the last 14 days?"
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Submit
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/view" variant="body2">
                            View all health declaration forms
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}