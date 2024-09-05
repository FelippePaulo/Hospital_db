import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Grid, Box, Typography, FormControl, InputLabel, Select, MenuItem, OutlinedInput } from "@mui/material";
import { format } from 'date-fns';

const urlConsulta = "http://localhost:3000/api/consultas";
const urlMedicos = "http://localhost:3000/api/medicos";
const urlPacientes = "http://localhost:3000/api/pacientes";

export default function ConsultaForm() {
    const [formData, setFormData] = useState({
        data: "",
        tipo: "",
        observacoes: "",
        medicamentosPreescritos: "",
        examesSolicitados: "",
        medicoId: "",
        pacienteId: ""
    });

    const [medicos, setMedicos] = useState([]);
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        // Fetching medicos and pacientes for dropdowns
        const fetchData = async () => {
            try {
                const [medicosResponse, pacientesResponse] = await Promise.all([
                    axios.get(urlMedicos),
                    axios.get(urlPacientes)
                ]);
                setMedicos(medicosResponse.data.medicos);
                setPacientes(pacientesResponse.data.pacientes);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleDateChange = (e) => {
        const { value } = e.target;
        // Format the date value to YYYY-MM-DD
        setFormData(prevData => ({
            ...prevData,
            data: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Format date before sending
            const formattedData = {
                ...formData,
                data: formData.data ? format(new Date(formData.data), 'yyyy-MM-dd') : ''
            };
            console.log(urlConsulta, formattedData)
            const response = await axios.post(urlConsulta, formattedData);
            if (response.status === 201) {
                alert("Consulta cadastrada com sucesso!");
                setFormData({
                    data: "",
                    tipo: "",
                    observacoes: "",
                    medicamentosPreescritos: "",
                    examesSolicitados: "",
                    medicoId: "",
                    pacienteId: ""
                });
            } else {
                alert("Erro ao cadastrar a consulta.");
            }
        } catch (error) {
            console.error("Houve um erro ao cadastrar a consulta:", error);
            alert("Erro ao cadastrar a consulta.");
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3, p: 2, backgroundColor: 'black', borderRadius: 1 }}
        >
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                Cadastrar Consulta
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Data"
                        name="data"
                        type="date"
                        value={formData.data}
                        onChange={handleDateChange}
                        required
                        InputLabelProps={{ style: { color: 'white' }, shrink: true }}
                        InputProps={{ style: { color: 'white' } }}
                        sx={{ bgcolor: 'black', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' } } }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Tipo"
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                        required
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
                        sx={{ bgcolor: 'black', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' } } }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Observações"
                        name="observacoes"
                        multiline
                        rows={4}
                        value={formData.observacoes}
                        onChange={handleChange}
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
                        sx={{ bgcolor: 'black', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' } } }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Medicamentos Prescritos"
                        name="medicamentosPreescritos"
                        value={formData.medicamentosPreescritos}
                        onChange={handleChange}
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
                        sx={{ bgcolor: 'black', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' } } }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Exames Solicitados"
                        name="examesSolicitados"
                        value={formData.examesSolicitados}
                        onChange={handleChange}
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
                        sx={{ bgcolor: 'black', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' } } }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth sx={{ bgcolor: 'black' }}>
                        <InputLabel id="medico-label" style={{ color: 'white' }}>Médico</InputLabel>
                        <Select
                            labelId="medico-label"
                            id="medico"
                            name="medicoId"
                            value={formData.medicoId}
                            onChange={handleChange}
                            input={<OutlinedInput label="Médico" />}
                            sx={{
                                bgcolor: 'black',
                                color: 'white',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#3f51b5',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#3f51b5',
                                },
                                '& .MuiSvgIcon-root': {
                                    color: 'white',
                                },
                            }}
                        >
                            {medicos.map(medico => (
                                <MenuItem key={medico.id} value={medico.id}>
                                    {medico.nome}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth sx={{ bgcolor: 'black' }}>
                        <InputLabel id="paciente-label" style={{ color: 'white' }}>Paciente</InputLabel>
                        <Select
                            labelId="paciente-label"
                            id="paciente"
                            name="pacienteId"
                            value={formData.pacienteId}
                            onChange={handleChange}
                            input={<OutlinedInput label="Paciente" />}
                            sx={{
                                bgcolor: 'black',
                                color: 'white',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#3f51b5',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#3f51b5',
                                },
                                '& .MuiSvgIcon-root': {
                                    color: 'white',
                                },
                            }}
                        >
                            {pacientes.map(paciente => (
                                <MenuItem key={paciente.id} value={paciente.id}>
                                    {paciente.nome}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Cadastrar Consulta
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
