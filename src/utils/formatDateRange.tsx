export default function formatDateRange(
  startDate: string,
  endDate: string,
): string {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const start = new Date(startDate);
  const end = new Date(endDate);

  const startDay = start.getDate();
  const startMonth = months[start.getMonth()];
  const startYear = start.getFullYear();

  const endDay = end.getDate();
  const endMonth = months[end.getMonth()];
  const endYear = end.getFullYear();

  if (startYear === endYear) {
    if (startMonth === endMonth) {
      return `${startDay}-${endDay} ${startMonth} ${startYear}`;
    } else {
      return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${startYear}`;
    }
  } else {
    return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`;
  }
}
