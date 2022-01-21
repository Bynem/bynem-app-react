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

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />

        <Route path='/login' exact component={Login} />

        <Route path='/meus-simulados' exact component={MeusSimulados} />

        <Route path='/criar-simulados' exact component={CriarSimulado} />

        <Route path='/simulado/:uuidSimulado' exact component={Simulado} />

        <Route path='/criar-perguntas/:uuid' exact component={CriarPerguntas} />


        <Route path='/editar/simulado/:uuid' exact component={EditarSimulado} />

        {/*<Route path='/editar/questao/:uuidSimulado/:uuidPergunta' exact component={EditarQuestaoDeSimulado} /> */}
        <Route path='/vizualizar/simulado/:uuidSimulado' exact component={ViewSimulado} />

      </Switch>
    </BrowserRouter>
  )
}