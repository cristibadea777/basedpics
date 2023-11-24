import './App.css';
import InsertBasedPic from './components/InsertBasedPic';
import BasedPicsTable from './components/BasedPicsTable';
import { get, getDatabase, ref} from "firebase/database"
import { useEffect, useState } from "react"
import { app } from "./firebase"

function App() {
  
  const database = getDatabase(app)
  const [listaBasedPics,    setListaBasedPics] = useState({})
  const [basedPicsRef,      setBasedPicsRef]   = useState(ref(database, "based_pics"))

  const [modalMessageProps, setModalMessageProps] = useState({
    viewModalMessage    : false,
    mesajModal          : '',
    confirma            : '',
    actiune             : '',
    functie             : ''
  })

  const populareListaBasedPics = async () => {
    try {
        const snapshot      = await get(basedPicsRef)
        const basedPicsData = snapshot.val()
        return basedPicsData          
    } catch (error) {
        console.log("Error querying pics data " + error)
        setModalMessageProps({
            viewModalMessage : true,
            mesajModal       : "Error querying pics data"
        })
    }
  }

  useEffect(
    () => {
      populareListaBasedPics().then(data => setListaBasedPics(data))
    }, [basedPicsRef]
  )   

  return (
    <div className="App">

      <div className="App-header">
        <div style={{height:"8vw", width: "10vw"}}>
          <a href={'/'} target="_blank" rel="noopener noreferrer" style={{cursor: "pointer"}}>
            <img src={require('./logo.png')} className="App-logo" alt="logo"></img>
          </a>
        </div>
        <div style={{display: "flex", width: "100%", flexDirection: "column"}}>
          <InsertBasedPic 
            database               = {database}
            listaBasedPics         = {listaBasedPics}
            populareListaBasedPics = {populareListaBasedPics}
            setListaBasedPics      = {setListaBasedPics}
            modalMessageProps      = {modalMessageProps}
            setModalMessageProps   = {setModalMessageProps}
          />
        </div>
      </div>
      
      <div className='App-body'>
        <BasedPicsTable 
          database               = {database}
          listaBasedPics         = {listaBasedPics}
          setListaBasedPics      = {setListaBasedPics}
          modalMessageProps      = {modalMessageProps}
          setModalMessageProps   = {setModalMessageProps}
        />
      </div>

    </div>
  )
}
export default App;