import { ref, remove, update } from "firebase/database"
import { useEffect, useState } from "react"
import ModalMessage from "./ModalMessage"
import './Components.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEdit, faX } from "@fortawesome/free-solid-svg-icons";
import SearchBasedPic from "./SearchBasedPic";
import { saveAs } from 'file-saver';

const BasedPicsTable = ({database, listaBasedPics, setListaBasedPics, modalMessageProps, setModalMessageProps}) => {

    const [searchedText, setSearchedText] = useState('')
    const [filteredBasedPics,   setFilteredBasedPics] = useState({})
    const filterListaBasedPics = (listaBasedPics) => {
        if(listaBasedPics){
            const userInputTags = searchedText.split('#').filter(tag => tag !== '')
            if(userInputTags.length === 0) return listaBasedPics
            return Object.fromEntries(
                Object.entries(listaBasedPics).filter( ([key, value]) => {
                    return userInputTags.some(tag => value.taguri.includes(tag))
                })
            )
        }
    }
    useEffect(
        () => {
            setFilteredBasedPics(filterListaBasedPics(listaBasedPics))
        }, [listaBasedPics, searchedText]
    )
    
    const updateBasedPicsList = (updatedValues, id) => {        
        const editedListaBasedPics = {...listaBasedPics}
        editedListaBasedPics[id] = {
            ...editedListaBasedPics[id],
            ...updatedValues,
        }
        setListaBasedPics(editedListaBasedPics)        
    }

    const updateListAtDelete = (id) => {
        const editedListaBasedPics = {...listaBasedPics}
        delete editedListaBasedPics[id]
        setListaBasedPics(editedListaBasedPics)
    }

    const InputComponent = ({basedPic, id, index}) => {

        const [updatedValues, setUpdatedValues] = useState({
            sourceURL       : basedPic.sourceURL      || '',
            maxResImageURL  : basedPic.maxResImageURL || '',
            taguri          : basedPic.taguri         || ''
        })

        const handleClickEdit = () => {
            setModalMessageProps({ 
                viewModalMessage: true, 
                mesajModal      : "Edit ?",
                actiune         : "edit",
                functie         : handleEdit,
                confirma        : true
            })
        }

        //const handleDownloadImage = async () => {
            //const response = await fetch(updatedValues.maxResImageURL);
            //const blob = await response.blob();
            //saveAs(blob, updatedValues.maxResImageURL.toString());
        //}

        const handleEdit = async () => {
            try {
                const basedPicRef = ref(database, `based_pics/${id}`)
                await update(basedPicRef, updatedValues)
                setModalMessageProps({ viewModalMessage: true, mesajModal : "Based pic updated" })
                await updateBasedPicsList(updatedValues, id)
            } catch (error) { 
                setModalMessageProps({ viewModalMessage: true, mesajModal : "Error updating based pic", actiune: "error" })
                console.log(error)
            }
        }

        const handleClickDelete = () => {
            setModalMessageProps({ 
                viewModalMessage: true, 
                mesajModal      : "Delete ?",
                actiune         : "delete",
                functie         : handleDelete,
                confirma        : true
            })
        }
        const handleDelete = async () => {
            try {
                const basedPicRef = ref(database, `based_pics/${id}`)
                await remove(basedPicRef)
                setModalMessageProps({ viewModalMessage: true, mesajModal : "Cringe pic deleted" })
                await updateListAtDelete(id)
            } catch (error) {
                setModalMessageProps({
                    ...modalMessageProps, 
                    mesajModal: 'Error at delete', 
                    actiune: 'error',
                    viewModalMessage: true
                })
                console.log(error)
            }
        }

        return(
            <div>
                <div className="divInputLabel">
                    <div className="divLabel"><label>Source</label></div>
                    <input 
                        onChange={(e) => {setUpdatedValues({...updatedValues, sourceURL : e.target.value})}} 
                        value={updatedValues.sourceURL}>
                    </input>
                </div>
                <div className="divInputLabel">
                    <div className="divLabel"><label>Image</label></div>
                    <input 
                        onChange={(e) => {setUpdatedValues({...updatedValues, maxResImageURL : e.target.value})}} 
                        value={updatedValues.maxResImageURL}>
                    </input>
                </div>
                <div className="divInputLabel">
                    <div className="divLabel"><label>Tags</label></div>
                    <input 
                        onChange={(e) => {setUpdatedValues({...updatedValues, taguri : e.target.value})}} 
                        value={updatedValues.taguri}>
                    </input>
                </div>
                <div className="divButoane">
                    {
                    // <button onClick={handleDownloadImage}><label><FontAwesomeIcon icon={faDownload} color="#282c34"></FontAwesomeIcon></label></button>
                    }
                    <button onClick={handleClickEdit}   className="editBtn"><label><FontAwesomeIcon icon={faEdit} color="#282c34"></FontAwesomeIcon></label></button>
                    <button onClick={handleClickDelete} className="deleteBtn"><label><FontAwesomeIcon icon={faX} color="#282c34"></FontAwesomeIcon></label></button>
                </div>
            </div>
        )
    }

    const [tablePage, setTablePage] = useState({})
    const ComponentaTabel = () => {
        return(
            <div style={{width: "100%", height: "79vh", overflowY: "auto", display: "flex", flexWrap: "wrap", marginBottom: "1%", justifyContent: "center"}}>
                 {tablePage && Object.entries(tablePage).map(([id, basedPic], index) => (
                    <div key={id} style={{width: "30%", height: "30%", margin: "1%"}}>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <a href={basedPic.maxResImageURL} target="_blank" rel="noopener noreferrer" style={{cursor: "pointer"}}>
                                <img height="150vw" width="140vw" src={basedPic.maxResImageURL} alt=""></img>
                            </a>
                            <InputComponent 
                                basedPic  = {basedPic} 
                                id        = {id}
                                index     = {index}
                            />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return(
        <div>
            <div style={{width: "100%", borderBottom: "1px solid #fcee09", display: "flex", alignItems: "flex-start", flexDirection: "column"}}>
                {modalMessageProps.viewModalMessage && (
                    <ModalMessage 
                        modalMessageProps    = {modalMessageProps} 
                        setModalMessageProps = {setModalMessageProps}
                    />
                )}
                <ComponentaTabel />
            </div>
            <div className="App-footer">
                <SearchBasedPic 
                    listOfObjects         = {listaBasedPics}
                    listOfFilteredObjects = {filteredBasedPics}
                    searchedText          = {searchedText}
                    setSearchedText       = {setSearchedText}
                    setTablePage          = {setTablePage}
                />
            </div>
        </div>
    )
    
}
export default BasedPicsTable