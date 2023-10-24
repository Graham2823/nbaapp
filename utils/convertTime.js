export default function convertTo12HourFormat(isoDatetime, showDate) {
    const date = new Date(isoDatetime);
    
    // Extract date components
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    // Extract time components
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert hours to 12-hour format
    hours = hours % 12 || 12;
    // Format the components as a string
    let formattedDatetime
    if(showDate){
        formattedDatetime = `${month}-${day}-${year} ${hours}:${pad(minutes)} ${ampm} ET`;
    }else{
        formattedDatetime = `${hours}:${pad(minutes)} ${ampm} ET`;

    }
    
    return formattedDatetime;
  }
  
  function pad(num) {
    return num.toString().padStart(2, '0');
  }