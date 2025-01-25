const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const datas = "secondary_school"

// console.log(id)

async function openInvoice() {
  // let done = document.getElementById("done")
    const response = await fetch(
      `${HOST}?getSinglePrimary&id=${id}&data=${datas}`
    );
    const userInvoices = await response.json();
    console.log(userInvoices);
  
    if (userInvoices.status === 1) {
      let addd = ""
        $("#basic").html(`
        <div class="media align-items-center py-3 mb-3">
        <img src="${userInvoices.message.passport}" alt="" class="d-block ui-w-100 rounded-circle">
        <div class="media-body ml-4 mt-2">
          <h4 class="font-weight-bold mb-0">${userInvoices.message.fullname}</h4>
          <div class="text-muted">Application ID: ${userInvoices.message.application_id}</div>
        </div>
      </div>
      <hr>
      <table class="table table-borderless user-view-table m-0">
        <tbody>
          <tr>
            <td class="fw-semibold">Fullname:</td>
            <td>${userInvoices.message.fullname}</td>
          </tr>
          <tr>
            <td class="fw-semibold">Gender:</td>
            <td>${userInvoices.message.gender}</td>
          </tr>
          <tr>
            <td class="fw-semibold">Address:</td>
            <td>${userInvoices.message.address}</td>
          </tr>
          <tr>
            <td class="fw-semibold">city:</td>
            <td>${userInvoices.message.city}</td>
          </tr>
          <tr>
            <td class="fw-semibold">State:</td>
            <td>${userInvoices.message.state}</td>
          </tr>
          <tr>
            <td class="fw-semibold">Email:</td>
            <td>${userInvoices.message.email}</td>
          </tr>
          <tr>
            <td class="fw-semibold">Phone:</td>
            <td>${userInvoices.message.phone}</td>
          </tr>
        </tbody>
      </table>
      `)

      addd += `
      <table class="table table-borderless user-view-table m-0">
      <tbody>
        <tr>
          <td class="fw-semibold">Birth Certificate:</td>
          <td><a href="${userInvoices.message.birth}" class="btn btn-outline-primary">View</a></td>
        </tr>
        <tr>
          <td class="fw-semibold">State of Origin Certificate:</td>
          <td><a href="${userInvoices.message.origin}" class="btn btn-outline-primary">View</a></td>
        </tr>
        <tr>
          <td class="fw-semibold">Previous result:</td>
          <td><a href="${userInvoices.message.result}" class="btn btn-outline-primary">View</a></td>
        </tr>
        <tr>
          <td class="fw-bold">Passport Photograph:</td>
          <td><a href="${userInvoices.message.passport}" class="btn btn-outline-primary">View</a></td>
        </tr>
        <tr>
        <td class="fw-bold">Essay:</td>
        <td><a href="${userInvoices.message.essay}" class="btn btn-outline-primary">View</a></td>
      </tr>
      <tr>
      <td class="fw-bold">Recorded Video:</td>
      <td><a href="${userInvoices.message.video}" class="btn btn-outline-primary">View</a></td>
    </tr>
        <tr>
          <td class="fw-semibold">Application Date:</td>
          <td>${userInvoices.message.time_in.split(" ")[0]}</td>
        </tr>
        `
        if (userInvoices.message.application_status === "Approved") {
          addd += `
          <tr>
          <td class="fw-semibold">Application Status:</td>
          <td id="" class="checking">
          <p class='text-success'>${userInvoices.message.application_status}</p>
        </td>
        </tr>
              
              `
              $("#done").addClass("hidden");
        } else {
          addd += `
          <tr>
          <td class="fw-semibold">Application Status:</td>
          <td id="" class="checking">
          <p class='text-danger'>${userInvoices.message.application_status}</p>
        </td>
        </tr>
              `
              $("#done").removeClass("hidden");
        }
        addd += `
       
      </tbody>
    </table>
      
      `

      $("#documents").append(addd)

    } else {
      $("#basic").html(`
        <div class="invoicetop"></div>
        <div class="flex justify-center items-center h-[60vh]">
          <p class="fontBold text-xl">No Information</p>
        </div>
      `)
      $("#documents").html(`
      <div class="invoicetop"></div>
      <div class="flex justify-center items-center h-[60vh]">
        <p class="fontBold text-xl">No Information</p>
      </div>
    `)
    }
  }


  openInvoice()

  function openDoor(){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "GET",
          url: `${HOST}?updateApp&id=${id}&datas=${datas}`,
          dataType: "json",
          success: function (data) {
            console.log(data);
            if (data.status === 1) {
              Swal.fire("Updated", data.message, "success");
              setTimeout(() => {
                window.location.href="./secondary.html";
              }, 1000);

            } else {
              Swal.fire(
                "Try again!",
                "Something went wrong, try again !",
                "error"
              );
            }
          },
          error: function (request, error) {
            Swal.fire("Try again!", "Something went wrong, try again !", "error");
          },
        });
      }
    });
  }
