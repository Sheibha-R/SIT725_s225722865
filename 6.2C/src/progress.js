function calculateProgress(certificates) {
  if (!Array.isArray(certificates)) throw new Error("certificates must be an array");

  const total = certificates.length;
  const completed = certificates.filter(c => c.completed === true).length;

  const completedHours = certificates
    .filter(c => c.completed === true)
    .reduce((sum, c) => sum + Number(c.hours || 0), 0);

  const progressPercent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return {
    totalCertificates: total,
    completedCertificates: completed,
    progressPercent,
    completedHours: Number(completedHours.toFixed(1))
  };
}

module.exports = { calculateProgress };
