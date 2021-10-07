///***COUNTDOWN FUNCTION****////
//let start = document.getElementById('departure').value;

const getCountdown = async(start, end) => {
    let startDate = new Date(start);
    let returnDate = new Date(end);
    let today = new Date();

    //Countdown
    const difference = startDate - today
    let days = Math.ceil(difference / (1000 * 60 * 60 * 24));
      
    if (days > 1){
        document.getElementById('countdown').innerHTML = `Start packing, your journey starts in ${days} days!`
    } else {
        document.getElementById('countdown').innerHTML = `Start packing, your journey starts tomorrow!`
    }

    //Duration
    const duration = (returnDate - startDate)/(1000 * 60 * 60 * 24);
    if(duration > 1){
        document.getElementById('duration').innerHTML = `You will be away for ${duration} days.`
    } else if(duration = 1){
        document.getElementById('duration').innerHTML = `You will be away for ${duration} day.`
    }
}

export {getCountdown}