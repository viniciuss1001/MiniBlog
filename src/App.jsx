//importação do react-router-dom
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';//função que mapeia se a autenticação do usuário foi feita com sucesso
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAutentication';


import './App.css';
//context auth ptovider
import { AuthProvider } from './context/AuthContext';
//pages
import Home from './pages/home/Home';
import About from './pages/about/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login/Login';
import Create from './pages/Create/Create';
import CreatePoste from './pages/newPost/CreatePoste';
import Dashboard from './pages/dashboard/Dashboard';
import PagNotFound from './pages/404/PagNotFound';
import Search from './pages/search/Search';
import Post from './pages/post/Post';
import PostEdit from './pages/formEdit/PostEdit'



function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined //jogo para o loading o valor do usuário(pessoa) comparado ao undefined, e se for undefined, está carregando alguma coisa, dá para impedir que seja exibido algo até que o usuário seja carregado

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })
    },[auth])

  if(loadingUser){
    return<p>Carregando...</p> 
  }
  //apresentar para o usuário que está sendo carregado algo enquanto a página carrega


  return (
    <div className="App">
      {/*estabelecimento de rotas da aplicação */}
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/posts/:id' element={<Post />} />
            <Route path='/post/edit/:id' element={user ? <PostEdit /> :<Navigate to="/"/> } />
            <Route path='/login' element={!user ? <Login /> :<Navigate to="/"/> } />
            <Route path='/create' element={!user ? <Create /> : <Navigate to="/"/>} />
            <Route path='/newpostage' element={user ? <CreatePoste /> : <Navigate to="/login"/>} />
            <Route path='/search' element={<Search />} />
            <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/login"/>} />
            <Route path='*' element={<PagNotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
