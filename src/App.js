import './App.css';
import Main from './pages/unAuth/main/Main'
import Header from './components/layout/header/Header'
import Footer from './components/layout/footer/Footer'
import Authorization from './pages/unAuth/authorization/Authorization'


function App() {
  return (
    <div className="App">
      <Header/>
      {/*<Main/>*/}
      <Authorization/>
      {/*<Footer/>*/}
    </div>
  );
}

export default App;
