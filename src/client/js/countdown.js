///***COUNTDOWN FUNCTION****////
//let start = document.getElementById('departure').value;

const getCountdown = async(start) => {
    let startDate = new Date(start);
    let today = new Date();
    const difference = startDate - today
    let days = Math.ceil(difference / (1000 * 60 * 60 * 24));
      
    if (days > 1){
        document.getElementById('countdown').innerHTML = `Start packing, your journey starts in ${days} days!`
    } else {
        document.getElementById('countdown').innerHTML = `Start packing, your journey starts tomorrow!`

    }
}

export {getCountdown}