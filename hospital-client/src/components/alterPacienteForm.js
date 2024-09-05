import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Grid, Box, MenuItem } from '@mui/material';
import axios from 'axios';

const url = "http://localhost:3000/api/pacientes";

export default function AlterPacienteForm({ paciente, onClose, onSave }) {
    const [formData, setFormData] = useState({ ...paciente });

    useEffect(() => {
        setFormData({ ...paciente });
    }, [paciente]);

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
            await axios.put(`${url}/${formData.id}`, formData);
            onSave();
        } catch (error) {
            console.error("Erro ao atualizar paciente:", error);
        }
    };

    return (
        <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Editar Paciente</DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ mt: 2 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Nome"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Logradouro"
                                name="logradouro"
                                value={formData.logradouro}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Número"
                                name="numero"
                                value={formData.numero}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Complemento"
                                name="complemento"
                                value={formData.complemento}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Bairro"
                                name="bairro"
                                value={formData.bairro}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="CEP"
                                name="cep"
                                value={formData.cep}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Cidade"
                                name="cidade"
                                value={formData.cidade}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Documento Número"
                                name="documentoNumero"
                                value={formData.documentoNumero}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                label="Tipo de Documento"
                                name="documentoTipo"
                                value={formData.documentoTipo}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="RG">RG</MenuItem>
                                <MenuItem value="Carteira de motorista">Carteira de motorista</MenuItem>
                                <MenuItem value="CPF">CPF</MenuItem>
                            </TextField>
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
            </DialogActions>
        </Dialog>
    );
}
