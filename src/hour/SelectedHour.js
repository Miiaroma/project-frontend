import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const SelectedHour = (props) => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [id_hour, setIdhour] = useState('');
    const [id_project, setIdproject] = useState('');
    const [id_person, setIdperson] = useState('');
    const [work_hour, setWorkhour] = useState('');    
    const navigate = useNavigate();
    const {id}=useParams();

    useEffect(() => {
        
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log("id="+id);
                const { data: response } = await axios.get(apiURL + '/hour/'+id, {
                    auth: {
                        id_person:localStorage.getItem('idperson'),
                        password:localStorage.getItem('password')
                    }
                })
                setIdhour(id);
                console.log(response.id_hour);
                setIdhour(response.id_hour);
                setIdproject(response.id_project);
                setIdperson(response.id_person);   
                setWorkhour(response.work_hour);                
                console.log(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    const handleSubmit = () => {
        setLoading(true);
        setIsError(false);
        const data = {
            id_hour: id,
            id_project,
            id_person,
            work_hour: work_hour           
        }
        console.log("TEST");
        console.log(data);
        axios.put(apiURL + '/hour/'+id, data, {
            auth: {
                id_person:localStorage.getItem('idperson'),
                password:localStorage.getItem('password')
            }
        })
            .then(res => {
                setIdhour('');
                setIdproject('');
                setIdperson('');
                setWorkhour('');               
                setLoading(false);
                return navigate("/hourlist");
            }).catch(err => {
                setLoading(false);
                setIsError(true);
            });
    }

    return (
        <div className="container">
            <table className='table table-bordered'>
                <thead>
                    <tr className='table-info'>                        
                        <th>Hour Id</th><th>Project Id</th><th>Person Id</th><th>Work Hours</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td><input type="number" min="1" id="idhour" value={id} onChange={e => setIdhour(e.target.value)} /></td>
                            <td><input type="number" min="1" id="idproject" value={id_project} onChange={e => setIdproject(e.target.value)} /></td>
                            <td><input type="number" min="1" id="idperson" value={id_person} onChange={e => setIdperson(e.target.value)} /></td>
                            <td><input type="text" id="workhour" value={work_hour} onChange={e => setWorkhour(e.target.value)} /></td>
                            <td><button type="submit" className='btn btn-primary' onClick={handleSubmit}  disabled={loading}>Update</button></td>
                        </tr>
                    
                </tbody>
            </table>
        </div>
    )
}

export default SelectedHour;