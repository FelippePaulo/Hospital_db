import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, MenuItem, Grid, Box, Typography } from "@mui/material";
import { FormControl, InputLabel, Select, OutlinedInput } from '@mui/material';

const url = "http://localhost:3000/api/pacientes";

export default function CadastrarPacienteForm() {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const [formData, setFormData] = useState({
        nome: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cep: "",
        cidade: "",
        documentoNumero: "",
        documentoTipo: "CPF"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(url, formData);
            console.log(formData)
            if (response.status === 201) {
                alert("Paciente cadastrado com sucesso!");
                setFormData({
                    nome: "",
                    logradouro: "",
                    numero: "",
                    complemento: "",
                    bairro: "",
                    cep: "",
                    cidade: "",
                    documentoNumero: "",
                    documentoTipo: "CPF"
                });
            } else {
                alert("Erro ao cadastrar o paciente.");
            }
        } catch (error) {
            console.error("Houve um erro ao cadastrar o paciente:", error);
            alert("Erro ao cadastrar o paciente.");
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3, p: 2, backgroundColor: 'black', borderRadius: 1 }}
        >
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                Cadastrar Paciente
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Nome"
                        name="nome"
                        value={formData.nome}
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
                        label="Logradouro"
                        name="logradouro"
                        value={formData.logradouro}
                        onChange={handleChange}
                        required
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
                        sx={{ bgcolor: 'black', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' } } }}
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
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
                        sx={{ bgcolor: 'black', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' } } }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Complemento"
                        name="complemento"
                        value={formData.complemento}
                        onChange={handleChange}
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
                        sx={{ bgcolor: 'black', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' } } }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Bairro"
                        name="bairro"
                        value={formData.bairro}
                        onChange={handleChange}
                        required
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
                        sx={{ bgcolor: 'black', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' } } }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="CEP"
                        name="cep"
                        value={formData.cep}
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
                        label="Cidade"
                        name="cidade"
                        value={formData.cidade}
                        onChange={handleChange}
                        required
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
                        sx={{ bgcolor: 'black', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' } } }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth sx={{ bgcolor: 'black' }}>
                        <InputLabel id="documentoTipo-label" style={{ color: 'white' }}>Tipo de Documento</InputLabel>
                        <Select
                            labelId="documentoTipo-label"
                            id="documentoTipo"
                            name="documentoTipo"
                            value={formData.documentoTipo}
                            onChange={handleChange}
                            input={<OutlinedInput label="Tipo de Documento" />}
                            MenuProps={MenuProps}
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
                            <MenuItem value="CPF">CPF</MenuItem>
                            <MenuItem value="RG">RG</MenuItem>
                            <MenuItem value="Carteira de motorista">Carteira de motorista</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Número do Documento"
                        name="documentoNumero"
                        value={formData.documentoNumero}
                        onChange={handleChange}
                        required
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
                        sx={{ bgcolor: 'black', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' } } }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Cadastrar Paciente
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
