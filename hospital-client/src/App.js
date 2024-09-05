import React, { useEffect, useState } from 'react';
import './App.css';
import { AppBar, Toolbar, Menu, MenuItem, Typography, Button } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PacientesList from './components/pacientesList';
import FormCadastroPaciente from './components/formCadastroPaciente';
import MedicosList from './components/medicosList'; 
import FormCadastroMedico from './components/formCadastroMedico'
import ConsultaForm from './components/formConsulta';
import ConsultasList from './components/consultasList';
import axios from 'axios';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

function App() {
  const [anchorElPacientes, setAnchorElPacientes] = useState(null);
  const [anchorElMedicos, setAnchorElMedicos] = useState(null);
  const [anchorElConsultas, setAnchorElConsultas] = useState(null);
  const [conteudo, setConteudo] = useState(null);

  const [ user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState(null);

  const login = useGoogleLogin({
      onSuccess: (codeResponse) => {
        console.log("Foi 1");
        console.log(codeResponse);
        setUser(codeResponse)
      },
      onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(
      () => {
          if (user) {
              axios
                  .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                      headers: {
                          Authorization: `Bearer ${user.access_token}`,
                          Accept: 'application/json'
                      }
                  })
                  .then((res) => {
                      console.log("Foi");
                      console.log(res.data);
                      setProfile(res.data);
                  })
                  .catch((err) => console.log(err));
          }
      },
      [ user ]
  );

 
  const logOut = () => {
      googleLogout();
      setProfile(null);
  };

  const handleMenuClick = (setter) => (event) => {
    setter(event.currentTarget);
  };

  const handleMenuClose = (setter) => () => {
    setter(null);
  };

  const handleListarPacientes = () => {
    setConteudo('listarPacientes');
    handleMenuClose(setAnchorElPacientes)();
  };

  const handleCadastrarPaciente = () => {
    setConteudo('cadastrarPaciente');
    handleMenuClose(setAnchorElPacientes)();
  };

  const handleListarMedicos = () => {
    setConteudo('listarMedicos');
    handleMenuClose(setAnchorElMedicos)();
  };

  const handleCadastrarMedico = () => {
    setConteudo('cadastrarMedico');
    handleMenuClose(setAnchorElMedicos)();
  };

  const handleListarConsultas = () => {
    setConteudo('listarConsultas');
    handleMenuClose(setAnchorElConsultas)();
  };

  const handleCadastrarConsulta = () => {
    setConteudo('cadastrarConsulta');
    handleMenuClose(setAnchorElConsultas)();
  };

  return (
    <div className="App">
      {profile ? (   
      <div>
      <AppBar position="static" sx={{ backgroundColor: '#2E3B55' }}>

        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">
            Hospital DB - {profile.name}
          </Typography>
          <div>
            <Button color="inherit" onClick={handleMenuClick(setAnchorElPacientes)}>
              Pacientes
              <ArrowDropDownIcon />
            </Button>
            <Menu
              anchorEl={anchorElPacientes}
              open={Boolean(anchorElPacientes)}
              onClose={handleMenuClose(setAnchorElPacientes)}
            >
              <MenuItem onClick={handleListarPacientes}>Listar Pacientes</MenuItem>
              <MenuItem onClick={handleCadastrarPaciente}>Cadastrar Paciente</MenuItem>
            </Menu>

            <Button color="inherit" onClick={handleMenuClick(setAnchorElMedicos)}>
              Médicos
              <ArrowDropDownIcon />
            </Button>
            <Menu
              anchorEl={anchorElMedicos}
              open={Boolean(anchorElMedicos)}
              onClose={handleMenuClose(setAnchorElMedicos)}
            >
              <MenuItem onClick={handleListarMedicos}>Listar Médicos</MenuItem>
              <MenuItem onClick={handleCadastrarMedico}>Cadastrar Médico</MenuItem>
            </Menu>

            <Button color="inherit" onClick={handleMenuClick(setAnchorElConsultas)}>
              Consultas
              <ArrowDropDownIcon />
            </Button>
            <Menu
              anchorEl={anchorElConsultas}
              open={Boolean(anchorElConsultas)}
              onClose={handleMenuClose(setAnchorElConsultas)}
            >
              <MenuItem onClick={handleListarConsultas}>Listar Consultas</MenuItem>
              <MenuItem onClick={handleCadastrarConsulta}>Agendar Consulta</MenuItem>
            </Menu>
            <Button color="inherit" onClick={logOut}>
              logOut
            </Button>
            
          </div>

        </Toolbar>
      </AppBar>

      <header className="App-header">
        <div className="conteudo-container">
          {conteudo === 'listarPacientes' && <PacientesList />}
          {conteudo === 'cadastrarPaciente' && <FormCadastroPaciente />}
          {conteudo === 'listarMedicos' && <MedicosList />}
          {conteudo === 'cadastrarMedico' && <FormCadastroMedico />}
          {conteudo === 'cadastrarConsulta' && <ConsultaForm />} 
          {conteudo === 'listarConsultas' && <ConsultasList />}
        </div>
      </header>
      </div>
      ) : (
        <Button onClick={login}>
          Entrar com google
        </Button>
      )}
    </div>
  );
}

export default App;