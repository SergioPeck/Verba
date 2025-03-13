import './CreateAccountModal.css';
import { auth, googleProvider } from '../../../../firbaseConfig';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';

export const CreateAcoountModal = ({closeCreateModal}:{closeCreateModal: ()=>void})=> {

    const handleGoogleSignIn = async () => {
        try {
          const result = await signInWithPopup(auth, googleProvider);
          const user = result.user;
      
          // Datos que necesita tu backend
          const userData = {
            uid: user.uid,
            name: user.displayName || "", // Puede ser null, así que aseguramos un string
            email: user.email,
            profile_pic: user.photoURL || "", // Puede ser null
            account_type: "google",
            google_id: user.providerData[0]?.uid || "" // ID de Google
          };
      
          // Enviar al backend
          const response = await fetch("http://localhost:3000/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
          });
      
          if (!response.ok) {
            throw new Error("Error al registrar usuario en el backend");
          }
      
          closeCreateModal();
        } catch (error) {
          console.error("Error al iniciar sesión con Google:", error);
        }
      };
      
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const handleCreateUserWithEmailPassword = async () => {
        try {
          const result = await createUserWithEmailAndPassword(auth, email, password);
          const user = result.user;
      
          const userData = {
            uid: user.uid,
            name: email, // Si el usuario no ingresa nombre, usar el email
            email: user.email,
            profile_pic: "", // No hay foto en este caso
            account_type: "email",
            google_id: null // No aplica
          };
      
          const response = await fetch("http://localhost:5000/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
          });
      
          if (!response.ok) {
            throw new Error("Error al registrar usuario en el backend");
          }
      
          closeCreateModal();
        } catch (error) {
          console.error("Error al crear cuenta:", error);
        }
      };
      
    return(
        <>
            <div className="create-account-overlay" onClick={closeCreateModal}>
                <div className="create-account-modal" onClick={(e)=>{e.stopPropagation()}}>
                    <h2>Welcome</h2>
                    <button className='btn-login-google' onClick={handleGoogleSignIn}>Log in with google</button>
                    <div className='separator'>or</div>
                    <div className='create-account-inputs-div'>
                        <input 
                        className='create-account-input' 
                        type="text" 
                        name="Email" 
                        placeholder='Email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                         />
                        <input 
                        className='create-account-input' 
                        type="password" 
                        name="Password" 
                        placeholder='Password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                         />
                    </div>
                    <button className='btn-create-account' onClick={handleCreateUserWithEmailPassword}>Create account</button>
                </div>
            </div>
        </>
    )

}