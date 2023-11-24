import './Components.css';

const ModalMessage = ({modalMessageProps, setModalMessageProps}) => {
    const justifyButtonValue  = modalMessageProps.confirma ? "space-around" : "center" 
    const functionButtonText  = modalMessageProps.actiune === 'delete' ? "Delete"    : "Edit"
    const functionButtonClass = modalMessageProps.actiune === 'delete' ? "deleteBtn" : "editBtn"
    return(
        <div className="modalContainerTransparent">
            <div className="messageModal">
                <div style={{width: "100%", height: "25%", backgroundColor: "#1F51FF", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <div><label style={{color: "#FBFFFF"}}>{modalMessageProps.mesajModal}</label></div>
                </div>
                <div style={{width: "100%", flexGrow: 1, backgroundColor: "#222", display: "flex", justifyContent: justifyButtonValue, alignItems: "center", flexDirection: "column"}}>
                    {modalMessageProps.confirma && (
                            <img height="100vw" src={require('../thinking.png')} alt="" style={{marginBottom: "2%"}}></img>
                    )}
                    <div style={{display: "flex", justifyContent: "space-around", alignItems: "start", flexDirection: "row", width: "100%"}}>
                        {modalMessageProps.confirma && (
                            <div>
                                <button onClick={modalMessageProps.functie} className={functionButtonClass}>{functionButtonText}</button>
                            </div>
                        )}
                        <div style={{display: "flex", flexDirection: "column"}}>
                            {(!modalMessageProps.confirma && modalMessageProps.actiune !== "error") && (
                                <img height="90vw" src={require('../thumbsup.png')} alt="" style={{marginBottom: "7%"}}></img>
                            )}
                            {(!modalMessageProps.confirma && modalMessageProps.actiune === "error") && (
                                <img height="90vw" src={require('../fail.png')} alt="" style={{marginBottom: "7%"}}></img>
                            )}
                            <button onClick={() => { setModalMessageProps({...modalMessageProps, viewModalMessage : false})}}> Close </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalMessage