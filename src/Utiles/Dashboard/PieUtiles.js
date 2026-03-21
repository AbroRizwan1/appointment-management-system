export function getFilteredAppointments(appointments) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // helper → status count
  const getStatusCount = (data) => {
    return {
      confirmed: data.filter((a) => a.status === "confirmed").length,
      pending: data.filter((a) => a.status === "pending").length,
      completed: data.filter((a) => a.status === "completed").length,
      cancelled: data.filter((a) => a.status === "cancelled").length,
    };
  };

  // Weekly
  const weekly = appointments.filter((apt) => {
    const diffDays = (today - new Date(apt.date)) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  });

  // Monthly
  const monthly = appointments.filter(
    (apt) =>
      new Date(apt.date).getMonth() === currentMonth &&
      new Date(apt.date).getFullYear() === currentYear,
  );

  // Quarterly
  const quarterly = appointments.filter((apt) => {
    const diffDays = (today - new Date(apt.date)) / (1000 * 60 * 60 * 24);
    return diffDays <= 90;
  });

  // Yearly
  const yearly = appointments.filter(
    (apt) => new Date(apt.date).getFullYear() === currentYear,
  );

  return {
    weekly,
    weeklyStatus: getStatusCount(weekly),

    monthly,
    monthlyStatus: getStatusCount(monthly),

    quarterly,
    quarterlyStatus: getStatusCount(quarterly),

    yearly,
    yearlyStatus: getStatusCount(yearly),
  };
}
