import React, { useState, useEffect } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, FormControlLabel, Checkbox, Select, MenuItem } from '@mui/material';
import axios from "axios";

const url = "http://localhost:3000/api/medicos";

const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
const specialties = ["Dermatologista", "Cardiologista", "Neurologista", "Reumatologista", "Hematologista"];

export default function AlterMedicoForm({ medico, onClose, onSave }) {
    const [formData, setFormData] = useState({
        ...medico,
        diasAtendimento: medico.diasAtendimento.split(', ') // Transformar a string em um array
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            let updatedDays = [...formData.diasAtendimento];
            if (checked) {
                updatedDays.push(value);
            } else {
                updatedDays = updatedDays.filter(day => day !== value);
            }
            setFormData({
                ...formData,
                diasAtendimento: updatedDays
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSave = async () => {
        try {
            // Transformar o array de dias de atendimento em uma string antes de salvar
            const updatedFormData = {
                ...formData,
                diasAtendimento: formData.diasAtendimento.join(', ')
            };
            await axios.put(`${url}/${medico.id}`, updatedFormData);
            onSave();
        } catch (error) {
            console.error("Erro ao salvar médico:", error);
        }
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Editar Médico</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="nome"
                    label="Nome"
                    type="text"
                    fullWidth
                    value={formData.nome}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="numeroCrm"
                    label="CRM"
                    type="text"
                    fullWidth
                    value={formData.numeroCrm}
                    onChange={handleChange}
                />

                <FormGroup>
                    <DialogTitle>Dias de Atendimento</DialogTitle>
                    {daysOfWeek.map(day => (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.diasAtendimento.includes(day)}
                                    onChange={handleChange}
                                    name="diasAtendimento"
                                    value={day}
                                />
                            }
                            label={day}
                            key={day}
                        />
                    ))}
                </FormGroup>

                <Select
                    fullWidth
                    margin="dense"
                    name="especialidade"
                    value={formData.especialidade}
                    onChange={handleChange}
                >
                    {specialties.map(specialty => (
                        <MenuItem value={specialty} key={specialty}>
                            {specialty}
                        </MenuItem>
                    ))}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleSave} color="primary">
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
