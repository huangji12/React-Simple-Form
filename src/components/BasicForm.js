import { useState, useEffect } from 'react';
import useInput from '../hooks/use-input';

const isNotEmpty = value =>  value.trim() !== '';
const reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
const isEmail = value => reg.test(value);

const BasicForm = (props) => {
  const { 
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid, 
    hasError: firstNameInputHasError, 
    valueChangeHandler: firstNameInputChangedHandler, 
    inputBlurHandler: firstNameInputBlurHandler,
    reset: resetFirstNameInput,
  } = useInput(isNotEmpty);

  const { 
    value: enteredLastName,
    isValid: enteredLastNameIsValid, 
    hasError: lastNameInputHasError, 
    valueChangeHandler: lastNameInputChangedHandler, 
    inputBlurHandler: lastNameInputBlurHandler,
    reset: resetLastNameInput,
  } = useInput(isNotEmpty);

  

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailInputChangedHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput(isEmail);

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    if (enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid) {
      setFormIsValid(true);
    }else {
      setFormIsValid(false);
    }
  }, [enteredFirstNameIsValid, enteredLastNameIsValid, enteredEmailIsValid]);

  const formSubmissionHandler = event => {
    event.preventDefault();
    
    if (!enteredFirstNameIsValid && !enteredLastNameIsValid && !enteredEmailIsValid ) {
      return;
    }
    console.log(enteredFirstName,enteredLastName,enteredEmail);

    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
  };

  const firstNameInputClasses = firstNameInputHasError ? 'form-control invalid' : 'form-control';
  const lastNameInputClasses = lastNameInputHasError ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';


  

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='control-group'>
        <div className={firstNameInputClasses}>
          <label htmlFor='name'>First Name</label>
          <input 
            type='text' 
            id='first name' 
            onChange={firstNameInputChangedHandler}
            onBlur={firstNameInputBlurHandler}
            value={enteredFirstName}
          />
          {firstNameInputHasError && <p className="error-text">First name must not by empty.</p>}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor='name'>Last Name</label>
          <input 
            type='text' 
            id='last name'
            onChange={lastNameInputChangedHandler}
            onBlur={lastNameInputBlurHandler}
            value={enteredLastName} 
          />
          {lastNameInputHasError && <p className="error-text">Last name must not by empty.</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input 
          type='text' 
          id='email' 
          onChange={emailInputChangedHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
      </div>
      {emailInputHasError && <p className="error-text">Please entered a valid Email.</p>}
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
