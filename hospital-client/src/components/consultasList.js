import React, { useEffect, useState } from "react";
import axios from "axios";
import AlterConsultaForm from './alterConsultaForm';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Estilização personalizada para o Select e OutlinedInput
const CustomSelect = styled(Select)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#ffffff',
        },
        '&:hover fieldset': {
            borderColor: '#ffffff',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#ffffff',
        },
    },
    '& .MuiSelect-select': {
        color: '#ffffff',
    },
    '& .MuiInputLabel-root': {
        color: '#ffffff',
    },
}));

export default function ConsultasList({ user }) {
    const urlConsultas = "http://localhost:3000/api/consultas";
    const urlMedicos = "http://localhost:3000/api/medicos";
    const urlPacientes = "http://localhost:3000/api/pacientes";

    const [consultas, setConsultas] = useState([]);
    const [allConsultas, setAllConsultas] = useState([]);
    const [medicos, setMedicos] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [selectedMedico, setSelectedMedico] = useState("");
    const [selectedPaciente, setSelectedPaciente] = useState("");
    const [message, setMessage] = useState(null);
    const [editingConsulta, setEditingConsulta] = useState(null);

    useEffect(() => {
        fetchConsultas();
        fetchMedicos();
        fetchPacientes();
    }, []);

    const fetchConsultas = async () => {
        try {
            const response = await axios.get(urlConsultas);
            setConsultas(response.data.consultas);
            setAllConsultas(response.data.consultas); // Armazena as consultas originais
        } catch (error) {
            console.error("Erro ao buscar consultas:", error);
            setMessage({ type: 'error', text: 'Erro ao buscar consultas.' });
        }
    };

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

    const handleMedicoChange = (event) => {
        setSelectedMedico(event.target.value);
        filterConsultas(event.target.value, selectedPaciente);
    };

    const handlePacienteChange = (event) => {
        setSelectedPaciente(event.target.value);
        filterConsultas(selectedMedico, event.target.value);
    };

    const filterConsultas = (medicoId, pacienteId) => {
        let filtered = allConsultas;

        if (medicoId) {
            filtered = filtered.filter(consulta => consulta.medico.id === medicoId);
        }

        if (pacienteId) {
            filtered = filtered.filter(consulta => consulta.paciente.id === pacienteId);
        }

        setConsultas(filtered);
    };

    const handleEdit = (consulta) => {
        setEditingConsulta(consulta);
    };

    const handleSave = () => {
        setEditingConsulta(null);
        fetchConsultas();
    };

    const handleClose = () => {
        setEditingConsulta(null);
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>Lista de Consultas</Typography>
            {message && <Alert severity={message.type}>{message.text}</Alert>}

            <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel sx={{ color: '#ffffff' }} id="medico-label">Filtrar por Médico</InputLabel>
                        <CustomSelect
                            labelId="medico-label"
                            id="medico"
                            value={selectedMedico}
                            onChange={handleMedicoChange}
                            input={<OutlinedInput label="Filtrar por Médico" />}
                        >
                            <MenuItem value="">
                                <em>Todos</em>
                            </MenuItem>
                            {medicos.map(medico => (
                                <MenuItem key={medico.id} value={medico.id}>
                                    {medico.nome}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel sx={{ color: '#ffffff' }} id="paciente-label">Filtrar por Paciente</InputLabel>
                        <CustomSelect
                            labelId="paciente-label"
                            id="paciente"
                            value={selectedPaciente}
                            onChange={handlePacienteChange}
                            input={<OutlinedInput label="Filtrar por Paciente" />}
                        >
                            <MenuItem value="">
                                <em>Todos</em>
                            </MenuItem>
                            {pacientes.map(paciente => (
                                <MenuItem key={paciente.id} value={paciente.id}>
                                    {paciente.nome}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    </FormControl>
                </Grid>
            </Grid>

            {consultas.length === 0 ? (
                <Typography variant="h6" color="textSecondary">
                    Nenhuma consulta encontrada.
                </Typography>
            ) : (
                <TableContainer component={Paper} sx={{ backgroundColor: '#000000' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: '#ffffff' }}>ID</TableCell>
                                <TableCell sx={{ color: '#ffffff' }}>Data</TableCell>
                                <TableCell sx={{ color: '#ffffff' }}>Tipo</TableCell>
                                <TableCell sx={{ color: '#ffffff' }}>Médico</TableCell>
                                <TableCell sx={{ color: '#ffffff' }}>Paciente</TableCell>
                                <TableCell sx={{ color: '#ffffff' }}>Observações</TableCell>
                                <TableCell sx={{ color: '#ffffff' }}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {consultas.map((consulta) => (
                                <TableRow key={consulta.id}>
                                    <TableCell sx={{ color: '#ffffff' }}>{consulta.id}</TableCell>
                                    <TableCell sx={{ color: '#ffffff' }}>{consulta.data}</TableCell>
                                    <TableCell sx={{ color: '#ffffff' }}>{consulta.tipo}</TableCell>
                                    <TableCell sx={{ color: '#ffffff' }}>
                                        {consulta.medico.nome || "N/A"}
                                    </TableCell>
                                    <TableCell sx={{ color: '#ffffff' }}>
                                        {consulta.paciente.nome || "N/A"}
                                    </TableCell>
                                    <TableCell sx={{ color: '#ffffff' }}>{consulta.observacoes}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleEdit(consulta)}
                                        >
                                            Editar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {editingConsulta && (
                <AlterConsultaForm
                    consulta={editingConsulta}
                    onClose={handleClose}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}
