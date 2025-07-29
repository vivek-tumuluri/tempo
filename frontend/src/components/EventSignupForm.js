import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './EventSignupForm.css';

const EventSignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    performance_name: '',
    performance_type: '',
    duration: '',
    number_of_performers: '',
    performer_names: '',
    group: '',
    performance_description: '',
    coordinator_name: '',
    contact_number: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5001/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Signup submitted successfully!');
        setFormData({
          email: '',
          performance_name: '',
          performance_type: '',
          duration: '',
          number_of_performers: '',
          performer_names: '',
          group: '',
          performance_description: '',
          coordinator_name: '',
          contact_number: ''
        });
      } else {
        const error = await response.json();
        toast.error(error.error || 'Signup failed');
      }
    } catch (error) {
      toast.error('Signup failed: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-form-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-header">
          <h1>Ganesh Utsav 2025 - Cultural Event Night</h1>
          <p>Sign up to showcase your talent!</p>
        </div>

        <div className="form-section">
          <h2>Performance Details</h2>
          
          <div className="form-group">
            <label htmlFor="email">Email ID *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="performance_name">Performance Name *</label>
            <input
              type="text"
              id="performance_name"
              name="performance_name"
              value={formData.performance_name}
              onChange={handleChange}
              required
              placeholder="e.g., Bollywood Dance Medley"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="performance_type">Performance Type *</label>
            <select
              id="performance_type"
              name="performance_type"
              value={formData.performance_type}
              onChange={handleChange}
              required
            >
              <option value="">Select a type</option>
              <option value="Dance">Dance</option>
              <option value="Music">Music</option>
              <option value="Drama">Drama</option>
              <option value="Poetry">Poetry</option>
              <option value="Comedy">Comedy</option>
              <option value="Magic">Magic</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration *</label>
            <select
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            >
              <option value="">Select duration</option>
              <option value="2-3 minutes">2-3 minutes</option>
              <option value="3-5 minutes">3-5 minutes</option>
              <option value="5-7 minutes">5-7 minutes</option>
              <option value="7-10 minutes">7-10 minutes</option>
              <option value="10+ minutes">10+ minutes</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="number_of_performers">Number of Performers *</label>
            <input
              type="number"
              id="number_of_performers"
              name="number_of_performers"
              value={formData.number_of_performers}
              onChange={handleChange}
              required
              placeholder="e.g., 5"
              min="1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="performer_names">Performer Names (comma-separated) *</label>
            <textarea
              id="performer_names"
              name="performer_names"
              value={formData.performer_names}
              onChange={handleChange}
              required
              placeholder="e.g., John Doe, Jane Smith, Alex Lee"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="group">Group *</label>
            <select
              id="group"
              name="group"
              value={formData.group}
              onChange={handleChange}
              required
            >
              <option value="">Select a group</option>
              <option value="Group A">Group A</option>
              <option value="Group B">Group B</option>
              <option value="Group C">Group C</option>
              <option value="Group D">Group D</option>
              <option value="Individual">Individual</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="performance_description">Performance Description (Optional)</label>
            <div className="description-container">
              <textarea
                id="performance_description"
                name="performance_description"
                value={formData.performance_description}
                onChange={handleChange}
                placeholder="A short, engaging description of your performance."
                rows="3"
              />
              <button type="button" className="generate-btn">
                + Generate Description
              </button>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Coordinator Information</h2>
          
          <div className="form-group">
            <label htmlFor="coordinator_name">Coordinator Name *</label>
            <input
              type="text"
              id="coordinator_name"
              name="coordinator_name"
              value={formData.coordinator_name}
              onChange={handleChange}
              required
              placeholder="e.g., Priya Sharma"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact_number">Contact Number *</label>
            <input
              type="tel"
              id="contact_number"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              required
              placeholder="e.g., 1234567890"
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-button"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Signup'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventSignupForm; 