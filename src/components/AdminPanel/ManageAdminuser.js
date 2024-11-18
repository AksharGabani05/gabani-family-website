// src/components/AdminPanel/ManageAdminUser.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container, Button, Form, Modal, Table, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


const ManageAdminUserContainer = styled(Container)`
  padding: 20px;
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: center; /* Center buttons horizontally */
  gap: 10px; /* Space between buttons */
`;

const ManageAdminUser = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [village, setVillage] = useState('');
  const [district, setDistrict] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const fetchAdminUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin-users');
      setAdminUsers(response.data);
    } catch (error) {
      console.error('Error fetching admin users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { name, phone, email, village, district, password };

    try {
      if (selectedUser) {
        // Update existing user
        await axios.put(`http://localhost:5000/admin-users/${selectedUser.id}`, newUser);
        setAdminUsers(adminUsers.map(user => (user.id === selectedUser.id ? newUser : user)));
      } else {
        // Add new user
        await axios.post('http://localhost:5000/admin-users', newUser);
        setAdminUsers([...adminUsers, newUser]);
      }
      clearForm();
    } catch (error) {
      console.error('Error saving admin user:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setName(user.name);
    setPhone(user.phone);
    setEmail(user.email);
    setVillage(user.village);
    setDistrict(user.district);
    setPassword(''); // Do not set password for editing
    setModalVisible(true);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/admin-users/${userId}`);
      setAdminUsers(adminUsers.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting admin user:', error);
    }
  };

  const clearForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setVillage('');
    setDistrict('');
    setPassword('');
    setSelectedUser(null);
    setModalVisible(false);
  };
  const navigate = useNavigate();

  const handleBack = () => {
      navigate(-1); // or navigate('/some-path');
  };

 

  return (
    <ManageAdminUserContainer>
      <h1 className="mb-4">Manage Admin Users</h1>
      <Button variant="secondary" onClick={handleBack}>
              <FontAwesomeIcon icon={faArrowLeft} className="me-1"/>
              Back
            </Button><br></br>
            <br></br>
      <Button 
        variant="primary" 
        onClick={() => setModalVisible(true)} 
        className="mb-3"
      >
        Add Admin User
      </Button>

      <Modal show={modalVisible} onHide={clearForm}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedUser ? 'Edit Admin User' : 'Add New Admin User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={12}>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Control 
                    type="text" 
                    placeholder="Admin Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="formPhone" className="mb-3">
                  <Form.Control 
                    type="text" 
                    placeholder="Phone Number" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    required 
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Control 
                    type="email" 
                    placeholder="Admin Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="formVillage" className="mb-3">
                  <Form.Control 
                    type="text" 
                    placeholder="Village" 
                    value={village} 
                    onChange={(e) => setVillage(e.target.value)} 
                    required 
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="formDistrict" className="mb-3">
                  <Form.Control 
                    type="text" 
                    placeholder="District" 
                    value={district} 
                    onChange={(e) => setDistrict(e.target.value)} 
                    required 
                  />
                </Form.Group>
              </Col>
              {selectedUser === null && ( // Only show password field when adding a user
                <Col md={12}>
                  <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Control 
                      type="password" 
                      placeholder="Password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required 
                    />
                  </Form.Group>
                </Col>
              )}
            </Row>
            <Button variant="primary" type="submit" className="me-2">
              {selectedUser ? 'Update Admin User' : 'Add Admin User'}
            </Button>
            
          </Form>
        </Modal.Body>
      </Modal>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Village</th>
            <th>District</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {adminUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.village}</td>
              <td>{user.district}</td>
              <td>
                <ActionsContainer>
                  <Button variant="warning" onClick={() => handleEdit(user)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
                </ActionsContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ManageAdminUserContainer>
  );
};

export default ManageAdminUser;
