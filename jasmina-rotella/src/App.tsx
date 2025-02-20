import './App.css'
import CustomButton from './pages/Button';
import Home from './pages/Home/Home';
import './pages/Home/Style.css'

function App() {
  const clickButton = () => {
    console.log("ciao")
  }
  return (
    <>
    <Home className='home'>
      <h1>Titolo</h1>
      <div>Div</div>
      <CustomButton onClick={clickButton}>Custom Button</CustomButton>
    </Home>
     </>
  )
}

export default App;
