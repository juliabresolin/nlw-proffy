export default function convertHourToMinutes(time: string) {
  // separating the string time and convert in number

  const [hour, minutes] = time.split(':').map(Number);

  // convert hour in minutes and add minutes to previous array

  const timeInMinutes = hour * 60 + minutes;

  return timeInMinutes;
}
