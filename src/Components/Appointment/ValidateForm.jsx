const validateForm = (appointment) => {
  let newErrors = {};

  // Name validation
  if (!appointment.name.trim()) {
    newErrors.name = "Name is required";
  } else if (appointment.name.length < 3) {
    newErrors.name = "Name must be at least 3 characters";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!appointment.email) {
    newErrors.email = "Email is required";
  } else if (!emailRegex.test(appointment.email)) {
    newErrors.email = "Invalid email format";
  }

  // Phone validation
  const phoneRegex = /^[0-9]{11}$/;
  if (!appointment.phone) {
    newErrors.phone = "Phone number is required";
  } else if (!phoneRegex.test(appointment.phone)) {
    newErrors.phone = "Phone must be 11 digits";
  }

  // // Date validation
  if (!appointment.date) {
    newErrors.date = "Date is required";
  } else {
    const selectedDate = new Date(appointment.date);

    // today's date with time set to 00:00:00 for accurate comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // max date is 1 year from today
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    maxDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      newErrors.date = "Past date is not allowed";
    } else if (selectedDate > maxDate) {
      newErrors.date = "Date cannot be more than 1 year ahead";
    }
  }

  // Doctor selection validation
  if (!appointment.select || appointment.select === "select") {
    newErrors.select = "Please select a doctor";
  }

  // 🔹 Slot validation (NEW)
  if (!appointment.slot || appointment.slot.trim() === "") {
    newErrors.slot = "Please select a slot";
  }

  return newErrors;
};

export default validateForm;
