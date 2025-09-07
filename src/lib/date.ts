export function formatDMY(input?: string | Date | null) {
  if (!input) return "-";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return "-";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`; // konsisten di SSR & client
}

export function formatYear(input?: string | Date | null) {
  if (!input) return "-";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return "-";
  return d.getFullYear().toString();
}

export function formatDuration(dateIn?: string | Date | null, dateOut?: string | Date | null) {
  if (!dateIn || !dateOut) return "-";
  const d1 = new Date(dateIn);
  const d2 = new Date(dateOut);
  if (Number.isNaN(d1.getTime()) || Number.isNaN(d2.getTime())) return "-";

  const diffMs = d2.getTime() - d1.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays > 365) {
    const years = diffDays / 365;
    const roundedYears = Math.round(years * 2) / 2;
    return `${roundedYears} tahun`;
  } else if (diffDays > 31) {
    const months = diffDays / 30.44; // average days per month
    const roundedMonths = Math.round(months * 2) / 2;
    return `${roundedMonths} bulan`;
  } else {
    const days = Math.round(diffDays);
    return `${days} hari`;
  }
}
