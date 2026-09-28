export function remoteImageFor(event) {
  return event?.event_profile_img ? {uri: event.event_profile_img} : null;
}

export function formatPrice({event_price_from: from, event_price_to: to}) {
  const start = Number(from) || 0;
  const end = Number(to) || 0;
  if (!start && !end) {
    return 'Free';
  }
  if (!end || end === start) {
    return `€${start}`;
  }
  return `€${start} - €${end}`;
}

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

// The feed returns dates as "dd.mm.yy" ("05.09.22"); the design renders them as
// "5 Sep 2022", collapsing a range to its shared month and year.
function parseApiDate(value) {
  const match = /^(\d{1,2})\.(\d{1,2})\.(\d{2}|\d{4})$/.exec(
    String(value ?? '').trim(),
  );
  if (!match) {
    return null;
  }
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = match[3].length === 2 ? 2000 + Number(match[3]) : Number(match[3]);
  if (day < 1 || day > 31 || month < 1 || month > 12) {
    return null;
  }
  return {day, month, year};
}

function formatOne({day, month, year}) {
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

export function formatDates({
  readable_from_date: from,
  readable_to_date: to,
}) {
  const start = parseApiDate(from);
  const end = parseApiDate(to);

  if (!start) {
    // Unrecognised shape — show whatever the API gave rather than nothing.
    return from && to ? `${from} - ${to}` : from || to || '';
  }
  if (!end) {
    return formatOne(start);
  }
  if (start.year === end.year && start.month === end.month) {
    return `${start.day} - ${end.day} ${MONTHS[start.month - 1]} ${start.year}`;
  }
  if (start.year === end.year) {
    return `${start.day} ${MONTHS[start.month - 1]} - ${end.day} ${
      MONTHS[end.month - 1]
    } ${start.year}`;
  }
  return `${formatOne(start)} - ${formatOne(end)}`;
}

export function chipsFor(event) {
  const keywords = event?.keywords?.length
    ? event.keywords
    : (event?.danceStyles || []).map(style => style.ds_name);
  return keywords.slice(0, 4);
}

export function locationFor(event) {
  return [event?.city, event?.country].filter(Boolean).join(', ');
}
