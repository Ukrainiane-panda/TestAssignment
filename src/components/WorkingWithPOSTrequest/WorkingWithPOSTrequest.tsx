import React, { useState } from 'react';
import cn from 'classnames';
import { Position } from '../../type/Position';
import { getToken } from '../../utils/fetchClient';

import '../../style/WorkingWithPOSTrequest.scss';
import '../../style/form.scss';
import '../../style/Success.scss';
import '../../style/error.scss';

import successPhoto from '../../photos/success-image.svg';

interface Props {
  positions: Position[];
}

export const WorkingWithPOSTrequest: React.FC<Props> = ({ 
  positions 
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [positionId, setPositionId] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(false);
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPhone, setErrorPhone] = useState('');

  const clearForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setPositionId(0);
    setSelectedFile(null);
    setInvalidFields([]);
    setIsFormValid(false);
    setErrorName('');
    setErrorEmail('');
    setErrorPhone('');
  };

  const validateForm = () => {
    const invalidFields: string[] = [];

    if (!name || name.length < 2 || name.length > 60) {
      invalidFields.push('name');
      setErrorName('Name should be a string with length between 2 and 60 characters.');
    } 

    if (!email || email.length < 2 || email.length > 100) {
      invalidFields.push('email');
      setErrorEmail('Email should be a valid email address.')
    }

    if (!phone || !/^\+\d{12}$/.test(phone)) {
      invalidFields.push('phone');
      setErrorPhone(
        'Phone should be a valid phone number starting with +380.',
      );
    }

    if (positionId === null) {
      invalidFields.push('position');
    }

    setInvalidFields(invalidFields);

    if (invalidFields.length > 0) {
      setIsFormValid(false);
      return false;
    }

    setIsFormValid(true);
    return true;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      setSelectedFile(fileInput.files[0]);
    }
  };
  
  const submitForm = async (event:  React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('position_id', positionId.toString());

      if (selectedFile) {
        formData.append('photo', selectedFile);
      }

      const token = await getToken();

      const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
        method: 'POST',
        body: formData,
        headers: {
          'Token': token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        if (data.success) {
          setIsSubmissionSuccessful(true);
          clearForm();
        } else {
          console.error('Server error:', data);
        }
      } else {
        console.error('Failed to make POST request');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  return (
    <section className="workingWithPOSTrequest">
      <div className="container">
        <div className="workingWithPOSTrequest__content">
          <h2 className="workingWithPOSTrequest__title">
            Working with POST request
          </h2>
          <div className="workingWithPOSTrequest__form">
            <form 
              method="post" 
              className="form"
              id="formPost"
              onSubmit={submitForm}
            >
              <div className="form__group">
                <p className="form__item">
                  <input
                    type="text" 
                    name="name" 
                    id="name" 
                    placeholder=" " 
                    required 
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className={cn(
                      'form__item--input', { 'input--invalid': invalidFields.includes('name') }
                    )}
                  />
                  <label className="form__item--label" htmlFor="name">Your name</label>
                  {isFormValid && <p className='error'>{errorName}</p>}
                </p>
                <p className="form__item">
                  <input 
                    type="email" 
                    name="email" 
                    id="email"  
                    placeholder=" " 
                    required  
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className={cn(
                      'form__item--input', { 'input--invalid': invalidFields.includes('email') },
                    )}
                  />
                  <label className="form__item--label" htmlFor="emale">Email</label>
                  {isFormValid && <p className='error'>{errorEmail}</p>}
                </p>
                <p className="form__item">
                  <input 
                    type="tel" 
                    name="phone" 
                    id="phone" 
                    placeholder=" " 
                    required 
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    className={cn(
                      'form__item--input', { 'input--invalid': invalidFields.includes('phone') }
                    )}
                  />
                  <label className="form__item--label" htmlFor="phone">Phone</label>
                  {isFormValid && <p className='error'>{errorPhone}</p>}
                  <p className='form__item--helper'>+38 (XXX) XXX - XX - XX</p>
                </p>
              </div>
              <div className="form__selecteGroup">
                <p className="form__selecteGroup--text">Select your position</p>
                {positions.map(position => (
                  <label className="form__selecteGroup--label" key={position.id}>
                    <input 
                      type="radio" 
                      name="position" 
                      value={position.id} 
                      className="form__selecteGroup--inpyt" 
                      onChange={() => setPositionId(position.id)}
                    />
                    <span className="form__selecteGroup--name">{position.name}</span>
                  </label>
                ))}
              </div>
              <div className="form__fileBlock">
                <label 
                  className={cn(
                    'form__field--upload', { 'input--invalid': invalidFields.includes('name') },
                  )}
                >
                  Upload
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="input-upload" 
                    required  
                    onChange={handleFileChange} 
                  />
                </label>
                <span className="form__fileBlock--text">
                  {selectedFile ? selectedFile.name : 'Upload your photo'}
                </span>
              </div>
              <div className="form__signUp">
                <button 
                  type="submit" 
                  className={cn(
                    'form__button button', { 'disabled': !isFormValid }
                  )}
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
        {isSubmissionSuccessful && (
          <div className='success'>
            <h3 className='success__text'>User successfully registered</h3>
            <img 
              src={successPhoto} 
              alt="Success" 
              className='success__img' 
              onClick={() => setIsSubmissionSuccessful(false)}
            />
          </div>
          )}
      </div>
    </section>
  );
};
