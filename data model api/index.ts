import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/data-model', (req, res) => {
    res.send('data model api is up and running\n');
});

app.get('/data-model/patient', (req, res) => {
    res.json({
        "Patient": {
            "userId": {
                "type": "string",
                "description": "Unique identifier for the patient (e.g., UUID)"
            },
            "passwordHash": {
                "type": "string",
                "description": "Hashed password for authentication"
            },
            "salt": {
                "type": "string",
                "description": "Salt used for password hashing"
            },
            "authToken": {
                "type": "string",
                "description": "Current authentication token (e.g., JWT)"
            },
            "refreshToken": {
                "type": "string",
                "description": "Token used to refresh the authentication token"
            },
            "name": {
                "type": "string",
                "notes": "Up to 4 components of the full name"
            },
            "phoneNumber": {
                "type": "string",
                "notes": "e.g., +249XXXXXXXXX"
            },
            "email": {
                "type": "string",
                "notes": "Valid email format"
            },
            "birthDate": {
                "type": "date",
                "notes": "Used to derive age"
            },
            "gender": {
                "type": "enum",
                "values": ["Male", "Female"]
            },
            "profilePicture": {
                "type": "string",
                "notes": "File/Image URL (Profile picture)"
            },
            "bloodGroup": {
                "type": "string",
                "notes": "Should be confirmed by a verified doctor in the app"
            },
            "homeAddress": {
                "type": "object",
                "notes": "Address string or GPS coordinates",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": ["string", "coordinates"],
                        "description": "Indicates whether the address is a string or GPS coordinates"
                    },
                    "value": {
                        "type": "string",
                        "description": "The address string or GPS coordinates (e.g., '30.123, 31.456')"
                    }
                }
            },
            "backupAddress": {
                "type": "object",
                "notes": "Alternate address",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": ["string", "coordinates"],
                        "description": "Indicates whether the address is a string or GPS coordinates"
                    },
                    "value": {
                        "type": "string",
                        "description": "The alternate address string or GPS coordinates (e.g., '30.789, 31.012')"
                    }
                }
            },
            "createdAt": {
                "type": "datetime",
                "description": "Timestamp of when the patient record was created"
            },
            "updatedAt": {
                "type": "datetime",
                "description": "Timestamp of when the patient record was last updated"
            },
            "accountStatus": {
                "type": "enum",
                "values": ["active", "inactive", "pending_verification", "blocked"],
                "description": "Current status of the patient's account"
            },
            "isEmailVerified": {
                "type": "boolean",
                "description": "Indicates if the patient's email address has been verified"
            },
            "isPhoneVerified": {
                "type": "boolean",
                "description": "Indicates if the patient's phone number has been verified"
            },
            "preferredLanguage": {
                "type": "string",
                "description": "Patient's preferred language for communication (e.g., 'en', 'ar')"
            },
            "communicationPreferences": {
                "type": "array",
                "items": {
                    "type": "enum",
                    "values": ["email", "sms", "phone", "app_notification"]
                },
                "description": "Patient's preferred methods of communication"
            },
            "emergencyContact": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "phoneNumber": {
                        "type": "string"
                    },
                    "relationship": {
                        "type": "string"
                    }
                },
                "description": "Details of the patient's emergency contact"
            }
        }
    })
})

app.get('/data-model/doctor', (req, res) => {
    res.json({
        "Doctor": {
            "doctorId": {
                "type": "string",
                "description": "Unique identifier for the doctor (e.g., UUID)"
            },
            "name": {
                "type": "string",
                "notes": "Full name with 4 components"
            },
            "whatsappPhoneNumber": {
                "type": "string",
                "notes": "e.g., +249XXXXXXXXX"
            },
            "email": {
                "type": "string",
                "notes": "Valid email format"
            },
            "passwordHash": {
                "type": "string",
                "notes": "Hashed password for security"
            },
            "salt": {
                "type": "string",
                "notes": "Salt used for password hashing"
            },
            "specialty": {
                "type": "string",
                "notes": "From dropdown list: https://www.smsb.gov.sd"
            },
            "services": {
                "type": "array",
                "items": {
                    "type": "string"
                },
                "notes": "List of services (can select or add new)"
            },
            "medicalCertificate": {
                "type": "string",
                "notes": "File upload (image or document file) - URL or path"
            },
            "profilePicture": {
                "type": "string",
                "notes": "File upload (image) - URL or path"
            },
            "acceptedInsurance": {
                "type": "array",
                "items": {
                    "type": "string"
                },
                "notes": "List of insurance providers (if already registered in the system)"
            },
            "education": {
                "type": "string",
                "notes": "Optional / Not required"
            },
            "additionalNotes": {
                "type": "string",
                "notes": "Text field (any extra information)"
            },
            "waitingTimeAfterBooking": {
                "type": ["integer", "string"],
                "notes": "e.g., estimated time in minutes or hours"
            },
            "createdAt": {
                "type": "datetime",
                "description": "Timestamp of when the doctor record was created"
            },
            "updatedAt": {
                "type": "datetime",
                "description": "Timestamp of when the doctor record was last updated"
            },
            "accountStatus": {
                "type": "enum",
                "values": ["active", "inactive", "pending_verification", "blocked"],
                "description": "Current status of the doctor's account"
            },
            "isEmailVerified": {
                "type": "boolean",
                "description": "Indicates if the doctor's email address has been verified"
            },
            "isPhoneVerified": {
                "type": "boolean",
                "description": "Indicates if the doctor's phone number has been verified"
            },
            "authToken": {
                "type": "string",
                "description": "Current authentication token (e.g., JWT)"
            },
            "refreshToken": {
                "type": "string",
                "description": "Token used to refresh the authentication token"
            }
        }
    })
})


app.listen(5500, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Server is running on port 5500');
})