import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig/instance';
import './Genders.css';
import PopForm from '../popUpform/popForm';

const ShowGenders = () => {
    const [Genders, setGenders] = useState([]);
    const [show, setShow] = useState(false);
    const [currentGender, setCurrentGender] = useState({});

    useEffect(() => {
        axiosInstance.get('Sex/getSex.php')
            .then(response => {
                setGenders(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the Genders!", error);
            });
    }, []);

    const handleEdit = (Gender) => {
        setCurrentGender(Gender);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentGender({ ...currentGender, [name]: value });
    };

    const handleSave = () => {
        axiosInstance.post('Sex/updategender.php', currentGender)
            .then(response => {
                setGenders(Genders.map(Gender =>
                    Gender.SexID === currentGender.SexID ? currentGender : Gender
                ));
                setShow(false);
            })
            .catch(error => {
                console.error("There was an error updating the Genders!", error);
            });
    };

    return (
        <div className="Genders-table">
            <h1>Genders List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {Genders.map(Gender => (
                        <tr key={Gender.SexID}>
                            <td>{Gender.SexID}</td>
                            <td>{Gender.Name}</td>
                            <td><button onClick={() => handleEdit(Gender)}>Edit</button></td>
                            <td><button>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <PopForm show={show} handleClose={handleClose} handleSave={handleSave}>
                <h2>Edit Gender</h2>
                <form>
                    <label>
                        ID:
                        <input type="number" name="SexID" value={currentGender.SexID} onChange={handleChange} readOnly />
                    </label>
                    <label>
                        Name:
                        <input type="text" name="Name" value={currentGender.Name} onChange={handleChange} />
                    </label>
                </form>
            </PopForm>
        </div>
    );
};

export default ShowGenders;
