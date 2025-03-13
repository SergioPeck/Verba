import './LogInModal.css';

export const LogInModal = ({closeLogInModal}:{closeLogInModal: ()=>void})=> {
    
    return(
        <>
            <div className="logIn-overlay" onClick={closeLogInModal}>
                <div className="logIn-modal" onClick={(e)=>{e.stopPropagation()}}>
                    <h2>Welcome</h2>
                    <button className='btn-login-google'>Log in with google</button>
                    <div className='separator'>or</div>
                    <div className='logIn-inputs-div'>
                        <input className='logIn-input' type="text" name="Email" placeholder='Email' />
                        <input className='logIn-input' type="password" name="Password" placeholder='Password' />
                        <a>Have you forgotten the password?</a>
                    </div>
                    <button className='btn-logIn' onClick={closeLogInModal}>Log In</button>
                </div>
            </div>
        </>
    )

}