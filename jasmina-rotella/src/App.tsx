import './App.css'
import CustomButton from './pages/Button';
import Home from './pages/Home/Home';

function App() {
  return (
    <>
    <Home className='home'>
      <h1>Titolo</h1>
      <div>Div</div>
      <CustomButton className={'button-jas'} >Ciao</CustomButton>
    </Home>
     </>
  )
}

export default App;
