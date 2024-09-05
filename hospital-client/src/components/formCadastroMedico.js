import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Grid, Box, Typography, FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox, OutlinedInput } from "@mui/material";

const url = "http://localhost:3000/api/medicos";

export default function CadastrarMedicoForm() {
    const [formData, setFormData] = useState({
        nome: "",
        numeroCrm: "",
        diasAtendimento: [],  
        especialidade: "Dermatologista"
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData(prevData => {
                const newDays = [...prevData.diasAtendimento];
                if (checked) {
                    newDays.push(name);
                } else {
                    const index = newDays.indexOf(name);
                    if (index > -1) {
                        newDays.splice(index, 1);
                    }
                }
                return {
                    ...prevData,
                    diasAtendimento: newDays
                };
            });
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(url, {
                ...formData,
                diasAtendimento: formData.diasAtendimento.join(', ')  // Convert array to comma-separated string
            });
            if (response.status === 200) {
                alert("Médico cadastrado com sucesso!");
                setFormData({
                    nome: "",
                    numeroCrm: "",
                    diasAtendimento: [],
                    especialidade: "Dermatologista"
                });
            } else {
                alert("Erro ao cadastrar o médico.");
            }
        } catch (error) {
            console.error("Houve um erro ao cadastrar o médico:", error);
            alert("Erro ao cadastrar o médico.");
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3, p: 2, backgroundColor: 'black', borderRadius: 1 }}
        >
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                Cadastrar Médico
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
                        label="CRM"
                        name="numeroCrm"
                        value={formData.numeroCrm}
                        onChange={handleChange}
                        required
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
                        sx={{ bgcolor: 'black', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' } } }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" sx={{ color: 'white' }}>
                        Atendimento:
                    </Typography>
                    <FormGroup row>
                        {["Segunda", "Terca", "Quarta", "Quinta", "Sexta"].map(day => (
                            <FormControlLabel
                                key={day}
                                control={
                                    <Checkbox
                                        sx={{ color: 'white' }}
                                        checked={formData.diasAtendimento.includes(day)}
                                        onChange={handleChange}
                                        name={day}
                                    />
                                }
                                label={day.charAt(0).toUpperCase() + day.slice(1)}
                            />
                        ))}
                    </FormGroup>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth sx={{ bgcolor: 'black' }}>
                        <InputLabel id="especialidade-label" style={{ color: 'white' }}>Especialidade</InputLabel>
                        <Select
                            labelId="especialidade-label"
                            id="especialidade"
                            name="especialidade"
                            value={formData.especialidade}
                            onChange={handleChange}
                            input={<OutlinedInput label="Especialidade" />}
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
                            <MenuItem value="Dermatologista">Dermatologista</MenuItem>
                            <MenuItem value="Cardiologista">Cardiologista</MenuItem>
                            <MenuItem value="Neurologista">Neurologista</MenuItem>
                            <MenuItem value="Reumatologista">Reumatologista</MenuItem>
                            <MenuItem value="Hematologista">Hematologista</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Cadastrar Médico
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
