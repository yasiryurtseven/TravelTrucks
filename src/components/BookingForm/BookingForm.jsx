import { useState } from 'react';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import css from './BookingForm.module.css';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim() || !isNaN(formData.name.trim())) {
      newErrors.name = 'Please enter your name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter your email.';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // iziToast bildirimi
    iziToast.success({
      title: 'Success',
      message: 'Booking request sent successfully!',
      position: 'topRight',
      timeout: 3000,
    });

    setFormData({ name: '', email: '' });
    setErrors({});
  };

  return (
    <div className={css.card}>
      <h3 className={css.title}>Book your campervan now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form onSubmit={handleSubmit} className={css.form} noValidate>
        {/* Name Input */}
        <div className={css.inputGroup}>
          <div className={css.inputWrapper}>
            <input
              type="text"
              name="name"
              placeholder="Name*"
              value={formData.name}
              onChange={handleChange}
              className={`${css.input} ${errors.name ? css.inputError : ''}`}
            />
            {errors.name && (
              <span className={css.errorIcon} aria-hidden="true">
                !
              </span>
            )}
          </div>
          {errors.name && (
            <span className={css.errorMessage}>{errors.name}</span>
          )}
        </div>

        {/* Email Input */}
        <div className={css.inputGroup}>
          <div className={css.inputWrapper}>
            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={formData.email}
              onChange={handleChange}
              className={`${css.input} ${errors.email ? css.inputError : ''}`}
            />
            {errors.email && (
              <span className={css.errorIcon} aria-hidden="true">
                !
              </span>
            )}
          </div>
          {errors.email && (
            <span className={css.errorMessage}>{errors.email}</span>
          )}
        </div>

        <button type="submit" className={css.sendBtn}>
          Send
        </button>
      </form>
    </div>
  );
}