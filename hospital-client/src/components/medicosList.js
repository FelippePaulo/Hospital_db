import React, { useEffect, useState } from "react";
import axios from "axios";
import AlterMedicoForm from './alterMedicoForm';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function MedicosList() {
    const url = "http://localhost:3000/api/medicos";
    const [medicos, setMedicos] = useState([]);
    const [editingMedico, setEditingMedico] = useState(null);
    const [message, setMessage] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedMedico, setSelectedMedico] = useState(null);
    
    useEffect(() => {
        fetchMedicos();
    }, []);

    const fetchMedicos = async () => {
        try {
            setMedicos([]);
            axios.get(url).then((response) => {
                console.log("m", response.data, url);
                setMedicos(response.data.medicos);
            });
        } catch (error) {
            console.error("Erro ao buscar médicos:", error);
            setMessage({ type: 'error', text: 'Erro ao buscar médicos.' });
        }
    };
    
    const confirmDelete = (medico) => {
        setSelectedMedico(medico);
        setOpenDialog(true);
    };

    const handleDelete = async () => {
        if (!selectedMedico) return;

        try {
            const response = await axios.delete(`${url}/${selectedMedico.id}`);
            if (response.status === 200) {
                setMessage({ type: 'success', text: 'Médico excluído com sucesso.' });
                setMedicos(medicos.filter(medico => medico.id !== selectedMedico.id));
            }
        } catch (error) {
            console.error("Erro ao excluir médico:", error);
            setMessage({ type: 'error', text: 'Erro ao excluir médico.' });
        } finally {
            setOpenDialog(false);
            setSelectedMedico(null);
        }
    };

    const handleEdit = (medico) => {
        setEditingMedico(medico);
    };

    const handleSave = () => {
        setEditingMedico(null);
        fetchMedicos();
    };

    const handleClose = () => {
        setEditingMedico(null);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setSelectedMedico(null);
    };

    if (medicos.length === 0) return <div>Carregando...</div>;

    return (
        <div>
            <Typography variant="h4" gutterBottom>Lista de Médicos</Typography>
            {message && <Alert severity={message.type}>{message.text}</Alert>}
            <TableContainer component={Paper} sx={{ backgroundColor: '#000000' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: '#ffffff' }}>ID</TableCell>
                            <TableCell sx={{ color: '#ffffff' }}>Nome</TableCell>
                            <TableCell sx={{ color: '#ffffff' }}>CRM</TableCell>
                            <TableCell sx={{ color: '#ffffff' }}>Dias de Atendimento</TableCell>
                            <TableCell sx={{ color: '#ffffff' }}>Especialidade</TableCell>
                            <TableCell sx={{ color: '#ffffff' }}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {medicos.map((medico) => (
                            <TableRow key={medico.id}>
                                <TableCell sx={{ color: '#ffffff' }}>{medico.id}</TableCell>
                                <TableCell sx={{ color: '#ffffff' }}>{medico.nome}</TableCell>
                                <TableCell sx={{ color: '#ffffff' }}>{medico.numeroCrm}</TableCell>
                                <TableCell sx={{ color: '#ffffff' }}>{medico.diasAtendimento}</TableCell>
                                <TableCell sx={{ color: '#ffffff' }}>{medico.especialidade}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => confirmDelete(medico)}
                                    >
                                        Deletar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEdit(medico)}
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
            {editingMedico && (
                <AlterMedicoForm
                    medico={editingMedico}
                    onClose={handleClose}
                    onSave={handleSave}
                />
            )}
            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirmar Exclusão</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Tem certeza que deseja excluir o médico <strong>{selectedMedico?.nome}</strong>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDelete} color="error" autoFocus>
                        Deletar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
