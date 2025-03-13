import './Navbar.css';
import { auth } from './../../firbaseConfig'; // Importa auth desde tu configuración de Firebase
import { signOut } from 'firebase/auth'; // Importa la función signOut

import { CreateAcoountModal } from './modals/Create Account/CreateAccountModal';
import { LogInModal } from './modals/LogIn/LogInModal';
import { StartModal } from './modals/StartModal/StartModal';
import { ExitModal } from './modals/Exit/ExitModal';

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UploadIcon from '../../icons/upload.png'
import TradIcon from '../../icons/Trad.png'
import CleanIcon from '../../icons/Clean.png'
import TypeIcon from '../../icons/Type.png'
import DownloadIcon from  '../../icons/Download.png'

export function Navbar(){
    const handleSignOut = async () => {
        try {
          // Cierra la sesión del usuario actual
          await signOut(auth);
          console.log("has salido de la cuenta")
        } catch (error) {
          console.error("Error al cerrar sesión:", error);
          alert("Ocurrió un error al cerrar sesión. Por favor, intenta de nuevo.");
        }
      };
    {/*Modals*/}
    const [createModalOpen, setCreateModalOpen]=useState(false);
    const [logInModalOpen, setLogInModalOpen]=useState(false);
    const [startModalOpen, setStartModalOpen]=useState(false);
    const [exitModalOpen, setExitModalOpen]=useState(false);
    

    {/* Circulos en nav*/ }
    const [receivedOptions, setReceivedOptions] = useState({
        Translate:false,
        Clean:false,
        Type:false
    })
    const OptionIcon:Record<string,string>={
        Translate:TradIcon,
        Clean:CleanIcon,
        Type:TypeIcon
    }
    const activeOptions = useMemo(() => 
        Object.keys(receivedOptions)
            .filter(key => receivedOptions[key as keyof typeof receivedOptions]),
        [receivedOptions]
    );

    const manageOptions=(options: { Translate: boolean; Clean: boolean; Type: boolean; })=>{
        setReceivedOptions(options);
        setStarted(true)
    }

    //Pasos
    const [currentStep,setCurrentStep]=useState(0);

    const [started, setStarted]=useState(false)
    
    
    const navigate = useNavigate();
    const steps = ["upload",...activeOptions.map(opt=>opt.toLowerCase()),"download"]
    
    const handleNext=()=>{
        if (currentStep < steps.length-1) {
            setCurrentStep(currentStep + 1);
            navigate(`/${steps[currentStep + 1]}`)
        }
    }
    const handlePrev=()=>{
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            navigate(`/${steps[currentStep - 1]}`)
        }
    }

    const handleExit=()=>{
        navigate("/")
        setReceivedOptions({
            Translate:false,
            Clean:false,
            Type:false
        })
        setStarted(false)
        setCurrentStep(0)
        setExitModalOpen(false)
    }

    return(
        <nav>
            <div className='nav-container'>
                <img src="" alt="Icon" />

                <div className='circles'>
                    {activeOptions.length > 0 && (
                        <>
                            <div className={`circle ${currentStep === 0 ? "yellow" : currentStep > 0 ? "green" : ""}`}>
                                <img src={UploadIcon} alt="Upload Icon" />
                            </div>

                            {activeOptions.map((option, index) => (
                                <div 
                                    className={`circle ${currentStep === index + 1 ? "yellow" : currentStep > index + 1 ? "green" : ""}`} 
                                    key={index}
                                >
                                    <img src={OptionIcon[option]} alt={`${option} icon`} />
                                </div>
                            ))}

                            <div className={`circle ${currentStep === steps.length - 1 ? "yellow" : currentStep > steps.length - 1 ? "green" : ""}`}>
                                <img src={DownloadIcon} alt="Download Icon" />
                            </div>
                        </>
                    )}
                </div>

                <div className='nav-btns'>

                    {!started?(
                        <>
                            <button onClick={handleSignOut} className="btn-sign-out">
                                Cerrar sesión
                            </button>
                            <button className='start-btn' onClick={()=>setStartModalOpen(true)}>Start</button>
                            <a onClick={()=>setCreateModalOpen(true)}>Register</a>
                            <a onClick={()=>setLogInModalOpen(true)}>Log in</a>
                        </>
                    ):(
                        <>
                            <button className='exit-btn' onClick={()=>setExitModalOpen(true)}>Exit</button>
                            <button className='prev-btn' onClick={handlePrev} disabled={currentStep===0}>Prev</button>
                            <button className='next-btn' onClick={handleNext} disabled={currentStep===steps.length-1}>Next</button>
                        </>
                    )}
                </div>
            </div>
            
            {createModalOpen && <CreateAcoountModal closeCreateModal={()=>setCreateModalOpen(false)} />}
            {logInModalOpen && <LogInModal closeLogInModal={()=>setLogInModalOpen(false)} />}
            {startModalOpen && <StartModal onSend={manageOptions} closeStartModal={()=>setStartModalOpen(false)} />}
            {exitModalOpen && <ExitModal handleExit={handleExit} closeExitModal={() => setExitModalOpen(false)} />}

        </nav>
    )
}