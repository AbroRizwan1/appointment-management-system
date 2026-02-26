const QueryValidation = (formdata) => {
let newErrors = {};

    // Name validation
  if (!formdata.name.trim()) {
    newErrors.name = "Name is required";
  } else if (formdata.name.length < 3) {
    newErrors.name = "Name must be at least 3 characters";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formdata.email) {
    newErrors.email = "Email is required";
  } else if (!emailRegex.test(formdata.email)) {
    newErrors.email = "Invalid email format";
  }

  // Phone validation
  const phoneRegex = /^[0-9]{11}$/;
  if (!formdata.phone) {
    newErrors.phone = "Phone number is required";
  } else if (!phoneRegex.test(formdata.phone)) {
    newErrors.phone = "Phone must be 11 digits";
  }
  
  if (!formdata.subject.trim()) {
    newErrors.subject = "Subject is required";
  } else if (formdata.subject.length < 3) {
    newErrors.subject = "Subject must be at least 3 characters";
  }

if (!formdata.message.trim()) {
    newErrors.message = "Message is required";
  } else if (formdata.message.length < 10) {
    newErrors.message = "Message must be at least 10 characters";
  }


  return newErrors;
}

export default QueryValidation
