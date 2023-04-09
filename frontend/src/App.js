
import { useState, useEffect } from 'react'
import axios from 'axios'
function App() {

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    let [listContact, setListContact] = useState([]);
    const [updateNameText, setUpdateNameText] = useState('')
    const [updateContactText, setUpdateContactText] = useState('');
    const [updateIdText, setUpdateIdText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');


    let i = 1;


    // console.log({updateContactText,updateNameText}) --> just checking data 




    const addContact = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/contact", { name: name, mobile: number });
            setListContact(prevList => [...prevList, res.data]);
            setName('');
            setNumber('');

        } catch (err) {
            console.log(err)

        }

    }
    const handleSearch = async (e) => {

        try {
            const res = await axios.get(`https://address-book-manager.onrender.com/api/v1/contact?filter=${searchQuery}`);
            setListContact(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        handleSearch();
    }, [searchQuery]);


    useEffect(() => {
        const getAllContact = async () => {
            try {
                let res;
                if (searchQuery) {
                    res = await axios.get(`https://address-book-manager.onrender.com/api/v1/contact?filter=${searchQuery}`);
                } else {
                    res = await axios.get(`https://address-book-manager.onrender.com/api/v1/contact`);
                }
                setListContact(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        getAllContact();
    }, []);

    const deletContact = async (id) => {
        try {
            const res = await axios.delete(`https://address-book-manager.onrender.com/api/v1/contact/${id}`)
            const newListContact = listContact.filter(curlelm => curlelm._id !== id)
            setListContact(newListContact);

        } catch (err) {
            console.log(err)
        }
    }


    const editContact = (id) => {
        const contactToEdit = listContact.find((curlelm) => curlelm._id === id);
        setUpdateIdText(contactToEdit._id)
        setUpdateNameText(contactToEdit.name);
        setUpdateContactText(contactToEdit.mobile);

    };
    const updateContact = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch(`https://address-book-manager.onrender.com/api/v1/contact/${updateIdText}`, { name: updateNameText, mobile: updateContactText });
            const updatedContact = res.data;
            const updatedList = listContact.map(contact => {
                if (contact._id === updatedContact._id) {
                    return updatedContact;
                }
                return contact;
            });
            setListContact(updatedList);
        } catch (err) {
            console.log(err);
        }
    };










    return (
        <div className="container mt-5 ">
            <h1 className="text-center mb-5">Simple Address Book Manager</h1>


            <nav className="navbar navbar-light bg-light ">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#add-contact-modal">
                    +Add Contact
                </button>
                <form className="form-inline ml-auto" onSubmit={handleSearch}>

                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit" >Search</button>
                </form>
            </nav>


            {/* Add Contact Modal */}
            <div className="modal fade" id="add-contact-modal" tabIndex="-1" role="dialog" aria-labelledby="add-contact-modal-label" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="add-contact-modal-label">Add Contact</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form id="add-contact-form" onSubmit={e => addContact(e)} >
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="name-input">Name:</label>
                                    <input type="text" className="form-control " id="name-input" required onChange={(e) => setName(e.target.value)} value={name} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mobile-input">Mobile Number:</label>
                                    <input type="tel" className="form-control " id="mobile-input" required onChange={(e) => setNumber(e.target.value)} value={number} />
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary" data-toggle="modal" data-target="#add-contact-modal">Save</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Add edit Modal */}
            <div className="modal fade" id="edit-contact-modal" tabIndex="-1" role="dialog" aria-labelledby="edit-contact-modal-label" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="edit-contact-modal-label">Edit Contact</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form id="edit-contact-form" onSubmit={e => { updateContact(e) }} >
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="edit-name-input">id:</label>
                                    <input type="text" className="form-control" id="edit-name-input" required value={updateIdText} onChange={(e) => setUpdateIdText(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edit-name-input">Name:</label>
                                    <input type="text" className="form-control" id="edit-name-input" required value={updateNameText} onChange={(e) => setUpdateNameText(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edit-mobile-input">Mobile Number:</label>
                                    <input type="tel" className="form-control" id="edit-mobile-input" required value={updateContactText} onChange={(e) => setUpdateContactText(e.target.value)} />
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary" data-toggle="modal" data-target="#edit-contact-modal" >Update</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

           


            <h2 className="mt-5 mb-3">Contact List</h2>
            <table className="table " >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Mobile Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="contact-list">
                    {listContact.map((curlelm) => (

                        <tr key={curlelm._id}>
                            <th>{i++}</th>
                            <th>{curlelm.name}</th>
                            <td>{curlelm.mobile}</td>
                            <td>
                                <button className="btn btn-success btn-sm mr-2" data-toggle="modal" data-target="#edit-contact-modal" onClick={() => editContact(curlelm._id)}>Edit</button>
                                <button className="btn btn-danger btn-sm" onClick={() => { deletContact(curlelm._id) }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


    );
}

export default App;
