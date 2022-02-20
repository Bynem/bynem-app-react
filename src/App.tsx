import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/index'
import MeusSimulados from './pages/meus-simulados'
import CriarSimulado from './pages/criar-simulados'
import Simulado from './pages/simulado'
import ViewSimulado from './pages/vizualizar/simulado'
import CriarPerguntas from './pages/criar-perguntas'
import EditarSimulado from './pages/editar/simulado'
import EditarQuestaoDeSimulado from './pages/editar/questao/simulado'
import Login from './pages/login'
import RecuperarSenha from './pages/recuperarSenha'
import NovaSenha from './pages/novaSenha'
import EditQuestionsPage from './pages/editar/questao/simulado'

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />

        <Route path='/login' exact component={Login} />

        <Route path='/recuperar-senha' exact component={RecuperarSenha} />

        <Route path='/nova-senha' exact component={NovaSenha} />

        <Route path='/meus-simulados' exact component={MeusSimulados} />

        <Route path='/criar-simulados' exact component={CriarSimulado} />

        <Route path='/simulado/:uuidSimulado' exact component={Simulado} />

        <Route path='/criar-perguntas/:uuiSimulado' exact component={CriarPerguntas} />

        <Route path='/criar-perguntas/:uuiSimulado/:numeroDaPergunta' exact component={CriarPerguntas} />

        <Route path='/editar/simulado/:uuid' exact component={EditarSimulado} />

        <Route path='/editar/questao/:uuidSimulado/:uuidQuestao' exact component={EditQuestionsPage} />

        <Route path='/vizualizar/simulado/:uuidSimulado' exact component={ViewSimulado} />

      </Switch>
    </BrowserRouter>
  )
}