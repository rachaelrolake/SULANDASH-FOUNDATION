async function fetchRevenueHeads() {

    const response = await fetch(`${HOST}/?getAllPrimary`)
    const revenues = await response.json()
    $("#loader").remove()
  console.log(revenues)
    if (revenues.status === 0) {
    } else {
        revenues.message.forEach((userInvoice, i) => {
            let addd = ""
            addd += `
              <tr class="relative">
              <td>${i + 1}</td>
              <td>${userInvoice.application_id}</td>
              <td>${userInvoice.fullname}</td>
              <td>${userInvoice.email}</td>
              <td>${userInvoice.address}</td>
              <td>${userInvoice.state}</td>
              <td>${userInvoice.phone}</td>
              <td>${userInvoice.time_in.split(" ")[0]}</td>
                `
            if (userInvoice.application_status === "Approved") {
              addd += `
                  <td id="" class="checking">
                    <p class='text-success'>${userInvoice.application_status}</p>
                  </td>
                  
                  `
            } else {
              addd += `
                  <td id="" class="checking">
                    <p class='text-danger'>${userInvoice.application_status}</p>
                  </td>
                  `
            }
      
            addd += `
              <td>
                <a href="./view-primary.html?id=${userInvoice.id}&load=true" target="_blank" class="btn btn-primary btn-sm viewUser" >View Details</a>
              </td>
              </tr>
              `
            $("#showThem").append(addd);
            $("#showThem2").append(`
              <tr>
                  <td>${i + 1}</td>
                  <td>${userInvoice.application_id}</td>
              <td>${userInvoice.fullname}</td>
              <td>${userInvoice.email}</td>
              <td>${userInvoice.address}</td>
              <td>${userInvoice.state}</td>
              <td>${userInvoice.phone}</td>
              <td>${userInvoice.time_in.split(" ")[0]}</td>
              <td>${userInvoice.application_status}</td>
              </tr>
            `)
          });
  
    }
  }
  
  fetchRevenueHeads().then(res => {
    $('#dataTable').DataTable();
  })






  