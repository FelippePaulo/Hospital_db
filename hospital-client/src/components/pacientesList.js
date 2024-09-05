import React, { useEffect, useState } from "react";
import axios from "axios";
import AlterPacienteForm from './alterPacienteForm';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Alert } from '@mui/material';

export default function PacientesList() {
    const url = "http://localhost:3000/api/pacientes";
    const [pacientes, setPacientes] = useState([]);
    const [editingPaciente, setEditingPaciente] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchPacientes();
    }, []);

    const fetchPacientes = async () => {
        try {
            setPacientes([]);
            axios.get(url).then((response)=>{
                console.log("p", response.data, url);
                setPacientes(response.data.pacientes);
                
            });
        } catch (error) {
            console.error("Erro ao buscar pacientes:", error);
            setMessage({ type: 'error', text: 'Erro ao buscar pacientes.' });
        }
    };

    const deletePaciente = async (id) => {
        try {
            const response = await axios.delete(`${url}/${id}`);
            if (response.status === 200) {
                setMessage({ type: 'success', text: 'Paciente excluído com sucesso.' });
            }
            setPacientes(pacientes.filter(paciente => paciente.id !== id));
        } catch (error) {
            console.error("Erro ao excluir paciente:", error);
            setMessage({ type: 'error', text: 'Erro ao excluir paciente.' });
        }
    };

    const handleEdit = (paciente) => {
        setEditingPaciente(paciente);
    };

    const handleSave = () => {
        setEditingPaciente(null);
        fetchPacientes();
    };

    const handleClose = () => {
        setEditingPaciente(null);
    };

    if (pacientes.length === 0) return <div>Carregando...</div>;

    return (
        <div>
            <Typography variant="h4" gutterBottom>Lista de Pacientes</Typography>
            {message && <Alert severity={message.type}>{message.text}</Alert>}
            <TableContainer component={Paper} sx={{ backgroundColor: '#000000' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: '#ffffff' }}>ID</TableCell>
                            <TableCell sx={{ color: '#ffffff' }}>Nome</TableCell>
                            <TableCell sx={{ color: '#ffffff' }}>Endereço</TableCell>
                            <TableCell sx={{ color: '#ffffff' }}>Documento</TableCell>
                            <TableCell sx={{ color: '#ffffff' }}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pacientes.map((paciente) => (
                            <TableRow key={paciente.id}>
                                <TableCell sx={{ color: '#ffffff' }}>{paciente.id}</TableCell>
                                <TableCell sx={{ color: '#ffffff' }}>{paciente.nome}</TableCell>
                                <TableCell sx={{ color: '#ffffff' }}>{`${paciente.cep}, ${paciente.cidade}, ${paciente.bairro}, ${paciente.logradouro}, ${paciente.numero}, ${paciente.complemento}`}</TableCell>
                                <TableCell sx={{ color: '#ffffff' }}>{`${paciente.documentoTipo}: ${paciente.documentoNumero}`}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => deletePaciente(paciente.id)}
                                    >
                                        Deletar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEdit(paciente)}
                                        sx={{ ml: 1 }}  // Margin-left para espaçamento
                                    >
                                        Editar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {editingPaciente && (
                <AlterPacienteForm
                    paciente={editingPaciente}
                    onClose={handleClose}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}
