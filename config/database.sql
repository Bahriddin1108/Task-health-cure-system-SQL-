CREATE DATABASE user_list;

CREATE TABLE Patients(
    id  NOT NULL PRIMARY KEY,
    p_name VARCHAR(60) NOT NULL,
    age NUMBER NOT NULL,
    medical_history  VARCHAR(60) NOT NULL,
    created_date DATE NOT NULL,
    updated_date DATE NOT NULL,
    contact_info JSON   
)
CREATE TABLE Appointments(
    id VARCHAR(80) PRIMARY KEY,
    passport_id VARCHAR(80),
    name VARCHAR(80) NOT NULL,
    enums VARCHAR(80) NOT NULL,
    doctors VARCHAR(80) NOT NULL,
    status VARCHAR(80) NOT NULL,
    
)
CREATE TABLE Enums(
    id BIGSERIAL PRIMARY KEY,
    e_name VARCHAR(80) NOT NULL,
    
)
CREATE TABLE Doctors(
    id BIGSERIAL PRIMARY KEY,
    d_name VARCHAR(80) NOT NULL
)