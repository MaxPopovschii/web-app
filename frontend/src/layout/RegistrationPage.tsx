import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RegistrationFormState {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormState>({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);


  // Handle OTP verification
  const handleOtpVerification = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  
    // Verify OTP (example: replace with API call)
    const response = await fetch(`http://localhost:8000/auth/verify-otp?otp=${otp}`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      setIsOtpVerified(true);
      alert('Registration successful');
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } else {
      alert('Invalid OTP');
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const { name, surname, email, password, confirmPassword } = formData;

    // Validazione base
    if (!name || !surname || !email || !password || !confirmPassword ) {
      setError('Tutti i campi sono obbligatori.');
      setSuccess(null);
      return;
    }

    if (password !== confirmPassword) {
      setError('Le password non corrispondono.');
      setSuccess(null);
      return;
    }
    // Send email for OTP (example: replace with API call)
    const response = await fetch('http://localhost:8000/auth/send-otp?email=' + email, {
      method: 'POST',
    });
    
    if (response.ok) {
      // OTP sent, show the OTP input popup
      setShowOtpPopup(true);
    } else {
      alert('Error sending OTP');
    }
  };
  const handleOtpChange = ( e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value);
  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Registrati</h2>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
        <div style={styles.inputGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            pattern='^[^\s@]+@[^\s@]+\.[^\s@]+$'
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            pattern='^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="confirmPassword">Conferma Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          Registrati
        </button>
      </form>
      {/* OTP Popup */}
      {showOtpPopup && !isOtpVerified && (
        <div style={styles.otpPopup}>
          <div style={styles.otpPopupContent}>
            <h3>Enter OTP</h3>
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter OTP"
              style={styles.otpPopupInput}
              required
            />
            <br />
            <button
              onClick={handleOtpVerification}
              style={styles.otpPopupButton}
            >
              Verify OTP
            </button>
            <button
              onClick={() => setShowOtpPopup(false)}
              style={styles.otpPopupButtonCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  form: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '350px',
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  error: {
    color: 'red',
    marginBottom: '15px',
    textAlign: 'center',
  },
  success: {
    color: 'green',
    marginBottom: '15px',
    textAlign: 'center',
  },
  otpPopup: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  otpPopupContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    width: '300px',
  },
  otpPopupInput: {
    width: '80%',
    padding: '8px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  otpPopupButton: {
    marginTop: '10px',
    width: '48%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  otpPopupButtonCancel: {
    marginTop: '10px',
    width: '48%',
    padding: '10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  otpPopupButtonHover: {
    backgroundColor: '#0056b3',
  },
  otpPopupButtonCancelHover: {
    backgroundColor: '#c82333',
  },
};

export default RegistrationPage;
