async function fetchAnalytics() {

    let config = {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
    };
    try {
      const response = await fetch(
        `${HOST}/?dashboardAnalytics`
      );
  
      const userAnalytics = await response.json();
  
  
      
      $("#primary").html(userAnalytics.total_primary)
      $("#sec").html(userAnalytics.total_sec)
      $("#college").html(userAnalytics.total_college)
  
     
     
    } catch (error) {
      console.log(error)
    }
  
  
  }
  
  fetchAnalytics()