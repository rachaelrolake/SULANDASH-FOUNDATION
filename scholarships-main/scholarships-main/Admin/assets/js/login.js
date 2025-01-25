$("#LoginNow").on("click", (e) => {

    let emailAdd = document.querySelector("#emailAdd").value
    let password = document.querySelector("#password").value
  
    // console.log(emailAdd, password);
    e.preventDefault()
    $("#msg_box4").html(`
      <div class="flex justify-center items-center mt-4">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
      </div>
    `)
  
    $("#LoginNow").addClass("hidden")
  
    $.ajax({
      type: "GET",
      url: `${HOST}/?login&email=${emailAdd}&password=${password}`,
      dataType: 'json',
      success: function (data) {
        if (data.status === 2) {
          $("#msg_box4").html(`
            <p class="text-warning text-center mt-4 text-lg" style="font-size: 20px !important;">${data.message}</p>
          `)
          $("#LoginNow").removeClass("hidden")
  
        } else if (data.status === 1) {
          $("#msg_box4").html(`
            <p class="text-success text-center mt-4" style="font-size: 20px !important;">${data.message}</p>
          `)
          localStorage.setItem("userData", JSON.stringify(data.user))
          setTimeout(() => {
            window.location.href = "./html/dashboard.html"
          }, 1000);
  
        } else if (data.status === 0) {
          $("#msg_box4").html(`
            <p class="text-warning text-center mt-4 text-base">${data.message}</p>
          `)
          $("#LoginNow").removeClass("hidden")
        }
      },
      error: function (request, error) {
        console.log(error);
        $("#msg_box4").html(`
          <p class="text-danger text-center mt-4 text-lg">Something went wrong try again !</p>
        `)
        $("#LoginNow").removeClass("hidden")
      }
    });
  
  })


  