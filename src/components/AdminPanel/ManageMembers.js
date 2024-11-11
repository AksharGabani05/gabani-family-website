import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Modal, Button, Table } from 'react-bootstrap';

// Styled Components
const Container = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  input {
    padding: 10px;
    width: 100%;
    font-size: 1em;
  }
`;

const StyledTable = styled(Table)`
  margin-top: 20px;
  width: 100%; /* Ensure table takes full width */

  th, td {
    text-align: center;
  }
`;

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [villageFilter, setVillageFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [newMember, setNewMember] = useState({
    id: '',
    name: '',
    birthDate: '',
    village: '',
    district: '',
    mobile: '',
    email: '',
    password: '',
  });
  const [isEditing, setIsEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Fetch members from the API
  useEffect(() => {
    const fetchMembers = async () => {
      const response = await fetch('http://localhost:5000/members');
      const data = await response.json();
      setMembers(data);
    };
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  const addOrUpdateMember = async () => {
    if (isEditing !== null) {
      const response = await fetch(`http://localhost:5000/members/${isEditing}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember),
      });
      if (response.ok) {
        const updatedMember = await response.json();
        setMembers(members.map((member) => (member.id === updatedMember.id ? updatedMember : member)));
      } else {
        console.error('Failed to update member');
      }
      setIsEditing(null);
    } else {
      const response = await fetch('http://localhost:5000/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember),
      });
      if (response.ok) {
        const addedMember = await response.json();
        setMembers([...members, addedMember]);
      } else {
        console.error('Failed to add member');
      }
    }

    resetForm();
    setShowModal(false);
  };

  const editMember = (member) => {
    setIsEditing(member.id);
    setNewMember(member);
    setShowModal(true);
  };

  const deleteMember = async (id) => {
    const response = await fetch(`http://localhost:5000/members/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setMembers(members.filter((member) => member.id !== id));
    } else {
      console.error('Failed to delete member');
    }
  };

  const resetForm = () => {
    setNewMember({
      id: '',
      name: '',
      birthDate: '',
      village: '',
      district: '',
      mobile: '',
      email: '',
      password: '',
    });
    setIsEditing(null);
  };

  // Calculate age based on birth date
  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // Filtered members based on search term, filters, and age range
  const filteredMembers = members.filter(member => {
    const age = calculateAge(member.birthDate);
    const withinAgeRange = (minAge ? age >= parseInt(minAge) : true) &&
                           (maxAge ? age <= parseInt(maxAge) : true);

    return (member.id.toString().includes(searchTerm) || // Search by ID
            (member.name && member.name.toLowerCase().includes(searchTerm.toLowerCase())) || // Search by name
            (member.mobile && member.mobile.includes(searchTerm)) // Search by mobile
           ) &&
           (member.village && member.village.toLowerCase().includes(villageFilter.toLowerCase())) &&
           (member.district && member.district.toLowerCase().includes(districtFilter.toLowerCase())) &&
           withinAgeRange;
});


  // Function to apply filters from filter modal
  const applyFilters = () => {
    setShowFilterModal(false);
  };

  return (
    <Container>
      <Title>Manage Members</Title>
      <InputWrapper>
        <input
          type="text"
          placeholder="Search by ID, Name, or Mobile"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="info" onClick={() => setShowFilterModal(true)}>
          Filter
        </Button>
      </InputWrapper>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Member
      </Button>

      <StyledTable striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Birth Date</th>
            <th>Age</th> {/* New column for age */}
            <th>Village</th>
            <th>District</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.birthDate}</td>
              <td>{calculateAge(member.birthDate)}</td> {/* Calculate age here */}
              <td>{member.village}</td>
              <td>{member.district}</td>
              <td>{member.mobile}</td>
              <td>{member.email}</td>
              <td>
                <Button variant="warning" onClick={() => editMember(member)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => deleteMember(member.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Member' : 'Add Member'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputWrapper>
            <input
              type="text"
              name="id"
              value={newMember.id}
              placeholder="ID"
              onChange={handleChange}
            />
            <input
              type="text"
              name="name"
              value={newMember.name}
              placeholder="Name"
              onChange={handleChange}
            />
            <input
              type="date"
              name="birthDate"
              value={newMember.birthDate}
              onChange={handleChange}
            />
            <input
              type="text"
              name="village"
              value={newMember.village}
              placeholder="Village"
              onChange={handleChange}
            />
            <input
              type="text"
              name="district"
              value={newMember.district}
              placeholder="District"
              onChange={handleChange}
            />
            <input
              type="text"
              name="mobile"
              value={newMember.mobile}
              placeholder="Mobile"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              value={newMember.email}
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              value={newMember.password}
              placeholder="Password"
              onChange={handleChange}
            />
          </InputWrapper>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={addOrUpdateMember}>
            {isEditing ? 'Update Member' : 'Add Member'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Filter Modal */}
      <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Members</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputWrapper>
            <input
              type="text"
              name="village"
              value={villageFilter}
              placeholder="Filter by village"
              onChange={(e) => setVillageFilter(e.target.value)}
            />
            <input
              type="text"
              name="district"
              value={districtFilter}
              placeholder="Filter by district"
              onChange={(e) => setDistrictFilter(e.target.value)}
            />
            <input
              type="number"
              name="minAge"
              value={minAge}
              placeholder="Min Age"
              onChange={(e) => setMinAge(e.target.value)}
            />
            <input
              type="number"
              name="maxAge"
              value={maxAge}
              placeholder="Max Age"
              onChange={(e) => setMaxAge(e.target.value)}
            />
          </InputWrapper>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFilterModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={applyFilters}>
            Apply Filters
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageMembers;
