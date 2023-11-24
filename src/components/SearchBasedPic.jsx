import { faArrowLeft, faArrowRight, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './Components.css';
import { useEffect, useState } from "react";

const SearchBasedPic = ({listOfFilteredObjects, setSearchedText, setTablePage, searchedText}) => {

    const [itemsPerPage,        setItemsPerPage]        = useState(9)
    const [lowerBound,          setLowerBound]          = useState(0)
    const [paginaCurenta,       setPaginaCurenta]       = useState(1)

    //se recalculeaza de fiecare data cand itemsPerPage si listOfFilteredObjects se schimba
    const totalPagini = Math.ceil(Object.keys(listOfFilteredObjects).length / itemsPerPage) 

    const handleClickPaginaInainte = () => {
        if( paginaCurenta < totalPagini){
            setLowerBound(lowerBound + itemsPerPage)
            setPaginaCurenta(paginaCurenta + 1)
        }
    }

    const handleClickPaginaInapoi = () => {
        if(lowerBound > 0){
            setLowerBound(lowerBound - itemsPerPage)
            setPaginaCurenta(paginaCurenta - 1)
        }
    }

    const handleChangeItemsPerPage = (event) => {
        setItemsPerPage(Number(event.target.value))
        setLowerBound(0)
        setPaginaCurenta(1)
    }
    
    useEffect(
        () => {
            //reset paginilor   
            setLowerBound(0)
            setPaginaCurenta(1)
        }, [searchedText]
    )

    useEffect(() => {
        const startIndex = (paginaCurenta - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        const slicedEntriesListOfFilteredObjects = {}
    
        const keys = Object.keys(listOfFilteredObjects)
        for (let i = startIndex; i < endIndex && i < keys.length; i++) {
            const key = keys[i]
            slicedEntriesListOfFilteredObjects[key] = listOfFilteredObjects[key]
        }
    
        setTablePage(slicedEntriesListOfFilteredObjects)
    }, [paginaCurenta, lowerBound, itemsPerPage, searchedText, listOfFilteredObjects])

    return (
        <div style={{width: "100%", height: "7vh", display: "flex", alignItems:"center", justifyContent:"center"}}>
            <div style={{width: "25%", display: "flex", flexDirection: "row", padding: "2%"}}>
                <label><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></label>
                <input style={{marginLeft: "5%"}} onChange={(e) => {setSearchedText(e.target.value)} }></input>
            </div>
            <div style={{width: "25%", display: "flex", flexDirection: "row", padding: "2%"}}>
                <button  
                    disabled = {(paginaCurenta - 1 === 0) ? true : false}
                    onClick={handleClickPaginaInapoi} className="pageBtn">
                        <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                </button>
                <label   className="pageBtn">{paginaCurenta} / {totalPagini}</label>
                <button
                    onClick={handleClickPaginaInainte} className="pageBtn"> 
                    <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                </button>    
                <select style={{textAlign:"center", display: "flex", cursor: "pointer"}} className="pageBtn" onChange={(event)=>{handleChangeItemsPerPage(event)}}>
                    <option value={9}>Items / page</option>
                    <option value={9}>9</option>
                    <option value={18}>18</option>
                    <option value={36}>36</option>
                    <option value={81}>81</option>
                </select>
            </div>
        </div>
    )
}
export default SearchBasedPic