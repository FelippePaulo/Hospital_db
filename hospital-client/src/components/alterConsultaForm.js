import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Grid, Box, MenuItem, FormControl, InputLabel, Select, OutlinedInput } from '@mui/material';
import axios from 'axios';

const urlConsultas = "http://localhost:3000/api/consultas";
const urlMedicos = "http://localhost:3000/api/medicos";
const urlPacientes = "http://localhost:3000/api/pacientes";

export default function AlterConsultaForm({ consulta, onClose, onSave }) {
    const [formData, setFormData] = useState({ ...consulta });
    const [medicos, setMedicos] = useState([]);
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        setFormData({ ...consulta });
        fetchMedicos();
        fetchPacientes();
    }, [consulta]);

    const fetchMedicos = async () => {
        try {
            const response = await axios.get(urlMedicos);
            setMedicos(response.data.medicos);
        } catch (error) {
            console.error("Erro ao buscar médicos:", error);
        }
    };

    const fetchPacientes = async () => {
        try {
            const response = await axios.get(urlPacientes);
            setPacientes(response.data.pacientes);
        } catch (error) {
            console.error("Erro ao buscar pacientes:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${urlConsultas}/${formData.id}`, formData);
            onSave();
        } catch (error) {
            console.error("Erro ao atualizar consulta:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${urlConsultas}/${formData.id}`);
            onSave();
        } catch (error) {
            console.error("Erro ao remover consulta:", error);
        }
    };

    return (
        <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Editar Consulta</DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ mt: 2, backgroundColor: 'white' }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Data"
                                name="data"
                                type="date"
                                value={formData.data}
                                onChange={handleChange}
                                required
                                InputLabelProps={{ shrink: true }}
                                sx={{ 
                                    '& .MuiOutlinedInput-root': { 
                                        '& fieldset': { borderColor: '#000000' }, 
                                        '&:hover fieldset': { borderColor: '#000000' }, 
                                        '&.Mui-focused fieldset': { borderColor: '#000000' } 
                                    }, 
                                    '& .MuiInputLabel-root': { color: '#000000' }, 
                                    color: '#000000' 
                                }}
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
                                sx={{ 
                                    '& .MuiOutlinedInput-root': { 
                                        '& fieldset': { borderColor: '#000000' }, 
                                        '&:hover fieldset': { borderColor: '#000000' }, 
                                        '&.Mui-focused fieldset': { borderColor: '#000000' } 
                                    }, 
                                    '& .MuiInputLabel-root': { color: '#000000' }, 
                                    color: '#000000' 
                                }}
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
                                sx={{ 
                                    '& .MuiOutlinedInput-root': { 
                                        '& fieldset': { borderColor: '#000000' }, 
                                        '&:hover fieldset': { borderColor: '#000000' }, 
                                        '&.Mui-focused fieldset': { borderColor: '#000000' } 
                                    }, 
                                    '& .MuiInputLabel-root': { color: '#000000' }, 
                                    color: '#000000' 
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="medico-label" style={{ color: 'black' }}>Médico</InputLabel>
                                <Select
                                    labelId="medico-label"
                                    id="medico"
                                    name="medicoId"
                                    value={formData.medicoId}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Médico" />}
                                    sx={{ 
                                        '& .MuiOutlinedInput-root': { 
                                            '& fieldset': { borderColor: '#000000' }, 
                                            '&:hover fieldset': { borderColor: '#000000' }, 
                                            '&.Mui-focused fieldset': { borderColor: '#000000' } 
                                        }, 
                                        '& .MuiSelect-select': { color: '#000000' }, 
                                        '& .MuiInputLabel-root': { color: '#000000' }
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
                            <FormControl fullWidth>
                                <InputLabel id="paciente-label" style={{ color: 'black' }}>Paciente</InputLabel>
                                <Select
                                    labelId="paciente-label"
                                    id="paciente"
                                    name="pacienteId"
                                    value={formData.pacienteId}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Paciente" />}
                                    sx={{ 
                                        '& .MuiOutlinedInput-root': { 
                                            '& fieldset': { borderColor: '#000000' }, 
                                            '&:hover fieldset': { borderColor: '#000000' }, 
                                            '&.Mui-focused fieldset': { borderColor: '#000000' } 
                                        }, 
                                        '& .MuiSelect-select': { color: '#000000' }, 
                                        '& .MuiInputLabel-root': { color: '#000000' }
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
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Salvar
                </Button>
                <Button onClick={handleDelete} color="error">
                    Remover
                </Button>
            </DialogActions>
        </Dialog>
    );
}
