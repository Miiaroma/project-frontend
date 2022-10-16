import React, { useState } from 'react';
import axios from "axios";
import apiURL from './myURL';

function Login() {

    const [id_person, setIdperson] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [databaseError, setDatabaseError] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        setIsError(false);
        window.localStorage.clear();
        axios.post(apiURL + '/login', {id_person,password}, {
        })
            .then(res => {
                setIdperson('');
                setPassword('');
                setLoading(false);
                console.log(res.data);
                if(res.data.errno){
                    console.log(res.data.errno);
                    setDatabaseError('Virhe tietokantayhteydessä');
                }
                else if(res.data===false){
                    setDatabaseError('Tunnus ja salasana eivät täsmää');
                }
                else {
                    setDatabaseError('Kirjautuminen onnistui');
                    localStorage.setItem('idperson',id_person);
                    localStorage.setItem('password',password);
                }
            }).catch(err => {
                setLoading(false);
                setIsError(true);
            });
    }

    return (
        <div className="container">
            <div >
                <div className='form-group'>
                    <label htmlFor="idperson">idperson </label>
                    <input className='form-control'
                        type="text"
                        id="idperson"
                        value={id_person}
                        onChange={e => setIdperson(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">password </label>
                    <input className='form-control'
                        type="text"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                </div>
                <div className='form-group'>
                    <button className='btn btn-primary form-control'
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                    >Login</button>
                </div>
                {isError && <small>Something went wrong. Please try again later.</small>}
                <br/>
                {databaseError}
            </div>
        </div>
    );
}

export default Login;