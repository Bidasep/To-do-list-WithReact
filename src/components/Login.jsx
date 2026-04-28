import { useContext } from "react";
import { useInput } from "../hooks/useInput";
import { UserContext } from "../contexts/UserContext";

function Login() {

    const nomeDoUsuario = useInput();
    const {setUsuario} = useContext(UserContext);

    const handleLogin = (e) => {
        e.preventDefault();
        //validar
        // gravar usuário
        setUsuario({ nome: nomeDoUsuario.valor, estaLogado: true });
    }

    return (    

        <form  onSubmit={handleLogin}>
            <input type="text"
            placeholder="Digite Seu nome:"
            value={nomeDoUsuario.valor}
            onChange={nomeDoUsuario.onChange} />

            <button type="Submit">Entrar</button>
        </form>

    );


}

export default Login;