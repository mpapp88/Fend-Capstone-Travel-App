///***COUNTDOWN FUNCTION****////
const departure = document.getElementById('departure').value;

const getCountdown = async(departure) => {
    const departureDate = new Date(departure);
      let d = new Date();
      let todaysDate = new Date();
      todaysDate = new Date(todaysDate);
      const difference = departureDate - todaysDate
      let days = Math.ceil(difference / (1000 * 60 * 60 * 24));
      
      if (days > 1){
          document.getElementById('countdown').innerHTML = `Start packing, your journey starts in ${days} days!`
      } else {
          document.getElementById('countdown').innerHTML = `Start packing, your journey starts tomorrow!`

      }
}

    module.export = getCountdown;