export default function reviewCreated(timestamp: string): string {
  const startDate = new Date(timestamp);
  const currentDate = new Date();

  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears >= 1) {
    return `Review dibuat ${diffYears} tahun lalu`;
  } else if (diffMonths >= 1) {
    return `Review dibuat ${diffMonths} bulan lalu`;
  } else {
    return `Review dibuat ${diffDays} hari lalu`;
  }
}
