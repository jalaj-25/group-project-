CREATE DATABASE india_post_db;

USE india_post_db;

-- Create the parcels table
CREATE TABLE parcel_deliveries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id VARCHAR(50),
    sender_name VARCHAR(100),
    sender_contact VARCHAR(15),
    sender_state VARCHAR(50),
    sender_district VARCHAR(50),
    sender_address TEXT,
    sender_pincode VARCHAR(10),
    recipient_name VARCHAR(100),
    recipient_contact VARCHAR(15),
    recipient_state VARCHAR(50),
    recipient_district VARCHAR(50),
    recipient_address TEXT,
    recipient_pincode VARCHAR(10),
    service_type VARCHAR(50),
    pickup_date DATE,
    pickup_time_slot VARCHAR(50),
    delivery_date DATE,
    delivery_time_slot VARCHAR(50)
);


CREATE TABLE Postman (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    phone_number VARCHAR(15),  -- New column added before pincode
    pincode VARCHAR(10)
);

INSERT INTO Postman (id, name, phone_number, pincode) 
VALUES
(1, 'Rahul Sharma', '9876543210', '110001'),
(2, 'Priya Verma', '9876543211', '110002'),
(3, 'Anil Kumar', '9876543212', '110003'),
(4, 'Sunita Singh', '9876543213', '110004'),
(5, 'Rajesh Mehta', '9876543214', '110005'),
(6, 'Neeta Joshi', '9876543215', '110006'),
(7, 'Vikram Sethi', '9876543216', '110007'),
(8, 'Anita Rao', '9876543217', '110008'),
(9, 'Deepak Agarwal', '9876543218', '110009'),
(10, 'Suman Chaudhary', '9876543219', '110010'),
(11, 'Manish Gupta', '9876543220', '110011'),
(12, 'Sneha Iyer', '9876543221', '110012'),
(13, 'Karan Kapoor', '9876543222', '110013'),
(14, 'Geeta Sood', '9876543223', '110014'),
(15, 'Rajiv Bansal', '9876543224', '110015'),
(16, 'Tanvi Malhotra', '9876543225', '110016'),
(17, 'Arvind Choudhary', '9876543226', '110017'),
(18, 'Pooja Saxena', '9876543227', '110018'),
(19, 'Nikhil Sharma', '9876543228', '110019'),
(20, 'Ritika Jain', '9876543229', '110020'),
(21, 'Mohit Yadav', '9876543230', '110021'),
(22, 'Sakshi Verma', '9876543231', '110022'),
(23, 'Gaurav Mehta', '9876543232', '110023'),
(24, 'Nisha Reddy', '9876543233', '110024'),
(25, 'Amit Tiwari', '9876543234', '110025'),
(26, 'Kavita Bhardwaj', '9876543235', '110026'),
(27, 'Pankaj Srivastava', '9876543236', '110027'),
(28, 'Neha Thakur', '9876543237', '110028'),
(29, 'Rohit Kapoor', '9876543238', '110029'),
(30, 'Simran Malhotra', '9876543239', '110030');





INSERT INTO parcel_deliveries (sender_id, sender_name, sender_contact, sender_state, sender_district, sender_address, sender_pincode,
                                recipient_name, recipient_contact, recipient_state, recipient_district, recipient_address, recipient_pincode,
                                service_type, pickup_date, pickup_time_slot, delivery_date, delivery_time_slot)
VALUES
    ('S001', 'Rahul Sharma', '9876543210', 'Maharashtra', 'Pune', '123, MG Road, Pune', '411001', 'Aditi Patil', '9876543211', 'Maharashtra', 'Mumbai', '456, Marine Drive, Mumbai', '110010', 'Express', '2024-10-07', '09:00-11:00', '2024-10-08', '14:00-16:00'),
    ('S002', 'Neha Gupta', '8765432109', 'Delhi', 'Delhi', '789, Connaught Place', '110010', 'Karan Verma', '8765432108', 'Delhi', 'Noida', '101, Sector 15, Noida', '201301', 'Standard', '2024-10-08', '11:00-13:00', '2024-10-20', '16:00-18:00'),
    ('S003', 'Vikram Singh', '7654321098', 'Karnataka', 'Bangalore', '234, Brigade Road', '560001', 'Sita Nair', '7654321097', 'Karnataka', 'Mysore', '98, Mysore Road', '570001', 'Express', '2024-10-11', '09:00-11:00', '2024-10-12', '10:00-12:00'),
    ('S004', 'Meera Patel', '6543210987', 'Gujarat', 'Ahmedabad', '456, Ashram Road', '380001', 'Ravi Desai', '6543210986', 'Gujarat', 'Surat', '321, Gopi Talav', '395001', 'Standard', '2024-10-13', '14:00-16:00', '2024-10-14', '10:00-12:00'),
    ('S005', 'Ajay Joshi', '5432109876', 'Maharashtra', 'Nagpur', '789, Sitabuldi', '440001', 'Riya Rane', '5432109875', 'Maharashtra', 'Thane', '654, LBS Marg', '400607', 'Express', '2024-10-15', '11:00-13:00', '2024-10-16', '14:00-16:00'),
    ('S006', 'Sneha Roy', '4321098765', 'West Bengal', 'Kolkata', '123, Park Street', '700016', 'Amit Bose', '4321098764', 'West Bengal', 'Howrah', '456, B B Ganguly Street', '711101', 'Standard', '2024-10-17', '09:00-11:00', '2024-10-18', '16:00-18:00'),
    ('S007', 'Karan Mehta', '3210987654', 'Tamil Nadu', 'Chennai', '789, Nungambakkam', '600034', 'Deepika Suresh', '3210987653', 'Tamil Nadu', 'Coimbatore', '321, RS Puram', '641002', 'Express', '2024-10-19', '14:00-16:00', '2024-10-20', '10:00-12:00'),
    ('S008', 'Priya Rao', '2109876543', 'Uttar Pradesh', 'Lucknow', '234, Hazratganj', '110010', 'Rajesh Kumar', '2109876542', 'Uttar Pradesh', 'Agra', '789, Fatehpur Sikri', '282001', 'Standard', '2024-10-08', '11:00-13:00', '2024-10-22', '14:00-16:00'),
    ('S009', 'Anil Kumar', '1098765432', 'Rajasthan', 'Jaipur', '456, MI Road', '302001', 'Pooja Singh', '1098765431', 'Rajasthan', 'Udaipur', '234, City Palace', '110010', 'Express', '2024-10-03', '09:00-11:00', '2024-10-08', '16:00-18:00'),
    ('S010', 'Nisha Verma', '0987654321', 'Punjab', 'Amritsar', '789, Golden Temple Road', '143001', 'Sandeep Singh', '0987654320', 'Punjab', 'Ludhiana', '123, Ferozepur Road', '141001', 'Standard', '2024-10-25', '14:00-16:00', '2024-10-26', '10:00-12:00'),
    ('S011', 'Ravi Shankar', '9876504321', 'Bihar', 'Patna', '234, Boring Road', '800001', 'Geeta Devi', '9876504320', 'Bihar', 'Gaya', '321, Bodh Gaya', '823001', 'Express', '2024-10-27', '11:00-13:00', '2024-10-28', '14:00-16:00'),
    ('S012', 'Deepak Nair', '8765432108', 'Kerala', 'Kochi', '456, Marine Drive', '682001', 'Anjali Menon', '8765432107', 'Kerala', 'Thiruvananthapuram', '321, MG Road', '695001', 'Standard', '2024-10-29', '09:00-11:00', '2024-10-30', '16:00-18:00'),
    ('S013', 'Sonia Mehta', '7654321097', 'Madhya Pradesh', 'Indore', '789, MG Road', '452001', 'Kunal Sharma', '7654321096', 'Madhya Pradesh', 'Bhopal', '456, MP Nagar', '462001', 'Express', '2024-10-31', '14:00-16:00', '2024-11-01', '10:00-12:00'),
    ('S014', 'Rohit Singh', '6543210986', 'Telangana', 'Hyderabad', '234, Banjara Hills', '500034', 'Anjali Reddy', '6543210985', 'Telangana', 'Warangal', '100, jay road', '506002', 'Standard', '2024-11-02', '11:00-13:00', '2024-11-03', '14:00-16:00'),
    ('S015', 'Pooja Sharma', '5432109875', 'Gujarat', 'Vadodara', '123, Alkapuri', '390007', 'Mohit Patel', '5432109874', 'Gujarat', 'Rajkot', '234, Gondal Road', '360001', 'Express', '2024-11-04', '09:00-11:00', '2024-11-05', '16:00-18:00');


    
