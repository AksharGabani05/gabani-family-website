// src/components/UserPanel/FamilyTree.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarAlt, faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const FamilyTreeContainer = styled.div`
  padding: 20px;
  text-align: center;
  background-color: #f0f8ff; /* Light background color for contrast */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  transition: border-color 0.3s;

  &:focus {
    border-color: #2c3e50; /* Change border color on focus */
    outline: none;
  }
`;

const VillageSelect = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
`;

const FamilyMemberCard = styled.div`
  margin: 10px 0;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.03); /* Slightly larger on hover */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Increase shadow on hover */
  }
`;

const CardBody = styled.div`
  padding: 20px;
`;

const MemberDetail = styled.p`
  margin: 5px 0;
  font-size: 1.1em;
  display: flex;
  align-items: center;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  color: #2c3e50;
`;

const Loader = styled.div`
  font-size: 1.5em;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  &::after {
    content: '';
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #2c3e50;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 1.2em;
  margin-top: 20px;
`;

const FamilyTree = () => {
  const [familyData, setFamilyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [uniqueVillages, setUniqueVillages] = useState([]);

  useEffect(() => {
    const fetchFamilyData = async () => {
      try {
        const response = await fetch('http://localhost:5000/members');
        if (!response.ok) {
          throw new Error('Failed to fetch family data');
        }
        const data = await response.json();
        setFamilyData(data);

        const villages = [...new Set(data.map(member => member.village))];
        setUniqueVillages(villages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching family data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFamilyData();
  }, []);

  const filteredMembers = familyData.filter(member =>
    (member.id.includes(searchTerm) ||
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.mobile.includes(searchTerm) ||
    member.village.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedVillage ? member.village === selectedVillage : true)
  );

  if (loading) {
    return (
      <FamilyTreeContainer>
        <Title>Family Tree</Title>
        <Loader>Loading family data...</Loader>
      </FamilyTreeContainer>
    );
  }

  return (
    <FamilyTreeContainer>
      <Title>Family Tree</Title>
      <p>Explore the family lineage and connections here.</p>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <SearchInput
        type="text"
        placeholder="Search by ID, name, mobile, or village..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <VillageSelect
        value={selectedVillage}
        onChange={(e) => setSelectedVillage(e.target.value)}
      >
        <option value="">All Villages</option>
        {uniqueVillages.map(village => (
          <option key={village} value={village}>{village}</option>
        ))}
      </VillageSelect>
      {filteredMembers.length === 0 ? (
        <p>No family data available.</p>
      ) : (
        <div className="container">
          {filteredMembers.map((member) => (
            <FamilyMemberCard key={member.id}>
              <CardBody>
                <h5><Icon icon={faUser} /> {member.name}</h5>
                <MemberDetail><Icon icon={faUser} /> <strong>ID:</strong> {member.id}</MemberDetail>
                <MemberDetail><Icon icon={faCalendarAlt} /> <strong>Birth Date:</strong> {member.birthDate}</MemberDetail>
                <MemberDetail><Icon icon={faMapMarkerAlt} /> <strong>Village:</strong> {member.village}</MemberDetail>
                <MemberDetail><Icon icon={faMapMarkerAlt} /> <strong>District:</strong> {member.district}</MemberDetail>
                <MemberDetail><Icon icon={faPhone} /> <strong>Mobile:</strong> {member.mobile}</MemberDetail>
                <MemberDetail><Icon icon={faEnvelope} /> <strong>Email:</strong> {member.email}</MemberDetail>
              </CardBody>
            </FamilyMemberCard>
          ))}
        </div>
      )}
    </FamilyTreeContainer>
  );
};

export default FamilyTree;
