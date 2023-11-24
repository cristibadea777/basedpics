import { useState } from "react"
import './Components.css';
import { ref, push, set } from "firebase/database";
import ModalMessage from "./ModalMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

const InsertBasedPic = ({database, setListaBasedPics, modalMessageProps, setModalMessageProps, populareListaBasedPics}) => {

    const [imageInputValues, setImageInputValues] = useState({
        sourceURL     : '',
        maxResImageURL: '',
        taguri        : ''
    })

    const dataRef   = ref(database, "based_pics") //'tabelu' based_pics

    const updateListAtInsert = async () => {
        populareListaBasedPics().then(data => setListaBasedPics(data))
    }

    const handleInsert = async () => {
        if(
            imageInputValues.sourceURL      && 
            imageInputValues.maxResImageURL &&
            imageInputValues.taguri
        ){
            try{
                const newBasedPicRecord = push(dataRef)
                await set(newBasedPicRecord, imageInputValues)
                setModalMessageProps({
                    viewModalMessage : true,
                    mesajModal       : "New based pic inserted"     
                })
                await updateListAtInsert(imageInputValues)
                setImageInputValues({
                    sourceURL       : "",
                    maxResImageURL  : "",
                    taguri          : ""
                })
            }
            catch (error) {  
                setModalMessageProps({
                    ...modalMessageProps, 
                    mesajModal: 'Error at insert', 
                    actiune: 'error',
                    viewModalMessage: true
                })
                console.error("Error: ", error)
            }
        }
        else{
            setModalMessageProps({
                ...modalMessageProps, 
                mesajModal: 'Fill in the fields',
                actiune: 'error', 
                viewModalMessage: true
            })
        }        
    }

    return(
        <div className="InsertBasedPic-container">

            {modalMessageProps.viewModalMessage && (
                <ModalMessage 
                    modalMessageProps       = {modalMessageProps}
                    setModalMessageProps    = {setModalMessageProps}
                />
            )}

            <div className="input-group">
                <label htmlFor='sourceURL'>Source</label>
                <input
                    type='text'
                    id='sourceURL'
                    name='sourceURL'
                    value={imageInputValues.sourceURL}
                    onChange={(e) => setImageInputValues({...imageInputValues, sourceURL: e.target.value})}
                />
            </div>

            <div className="input-group">
                <label htmlFor='maxResImageURL'>Image URL</label>
                <input
                    type='text'
                    id='maxResImageURL'
                    name='maxResImageURL'
                    value={imageInputValues.maxResImageURL}
                    onChange={(e) => setImageInputValues({...imageInputValues, maxResImageURL: e.target.value})}
                />
            </div>

            <div className="input-group">
                <label htmlFor='taguri'>Tags</label>
                <input
                    type='text'
                    id='taguri'
                    name='taguri'
                    value={imageInputValues.taguri}
                    onChange={(e) => setImageInputValues({...imageInputValues, taguri: e.target.value})}
                />
            </div>
        
            <div className="input-group">
                <label>&nbsp;</label>
                <button className="pageBtn" onClick={handleInsert}><label style={{cursor: "pointer"}}><FontAwesomeIcon icon={faAdd} color="yellow"></FontAwesomeIcon></label></button>
            </div>

        </div>
    )

}
export default InsertBasedPic