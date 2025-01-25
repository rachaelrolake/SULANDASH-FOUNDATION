let HOST = "https://sulandsahfoundation.org/php/index.php"


let STATES = `
  <option disabled selected>--Select State--</option>
  <option value="Abia">Abia</option>
  <option value="Adamawa">Adamawa</option>
  <option value="Akwa Ibom" >Akwa Ibom</option>
  <option value="Anambra">Anambra</option>
  <option value="Bauchi">Bauchi</option>
  <option value="Bayelsa">Bayelsa</option>
  <option value="Benue">Benue</option>
  <option value="Borno">Borno</option>
  <option value="Cross River">Cross River</option>
  <option value="Delta">Delta</option>
  <option value="Ebonyi">Ebonyi</option>
  <option value="Edo">Edo</option>
  <option value="Ekiti">Ekiti</option>
  <option value="Enugu">Enugu</option>
  <option value="FCT">Federal Capital Territory</option>
  <option value="Gombe">Gombe</option>
  <option value="Imo">Imo</option>
  <option value="Jigawa">Jigawa</option>
  <option value="Kaduna">Kaduna</option>
  <option value="Kano">Kano</option>
  <option value="Katsina">Katsina</option>
  <option value="Kebbi">Kebbi</option>
  <option value="Kogi">Kogi</option>
  <option value="Kwara">Kwara</option>
  <option value="Lagos">Lagos</option>
  <option value="Nasarawa">Nasarawa</option>
  <option value="Niger">Niger</option>
  <option value="Ogun">Ogun</option>
  <option value="Ondo">Ondo</option>
  <option value="Osun">Osun</option>
  <option value="Oyo">Oyo</option>
  <option value="Plateau">Plateau</option>
  <option value="Rivers">Rivers</option>
  <option value="Sokoto">Sokoto</option>
  <option value="Taraba">Taraba</option>
  <option value="Yobe">Yobe</option>
  <option value="Zamfara">Zamfara</option>
`
let stateSelect2 = document.querySelector("#state")
stateSelect2.innerHTML = STATES

function postCMs(theImagClass, boxi1, boxi2) {
  // Feedback to the user that files are uploading
  const imageContainer = document.getElementById('image-container');
  const loader = document.getElementById('loader');
  const publixh = document.getElementById('publish');
  const loadedImage = document.getElementById('loaded-image');

  let allInputs = document.querySelectorAll(".taxReqInput2");
  let fileInputs = document.querySelectorAll("." + theImagClass + '[type="file"]');
  let allRadioBoxs = document.querySelectorAll(".form-check-input");

  // Assuming PublitioAPI is a properly configured API wrapper
  const publitio = new PublitioAPI("cfnfP3krqA2XVRVSLoAy", "sxez75Lji3RATkr7GMT651babu1z4giw");

  let obj = {
    endpoint: "createSecondary",
    data: {},
  };
  
  async function uploadFiles() {
   
    for (let fileInput of fileInputs) {
      if (fileInput.files.length > 0) {
        for (let file of fileInput.files) {
          const reader = new FileReader();
          console.log(file);
          reader.readAsBinaryString(file);
         
          loader.style.display = 'block';
          loadedImage.style.display = 'block';
          try {
            let data = await publitio.uploadFile(file, 'file', {
              title: `${file.name} - ${fileInput.dataset.name}`,
              public_id: `${file.name.replace(/\.[^/.]+$/, "")}` // Removing file extension for public_id
            });

            // console.log('File uploaded:', data.url_preview);
            // Assuming `data.url_preview` contains the URL to the uploaded file
            if (!obj.data[fileInput.dataset.name]) {
              obj.data[fileInput.dataset.name] = [];
            }
            obj.data[fileInput.dataset.name] = data.url_preview
            // console.log(obj.data)
          } catch (error) {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Error Uploading your files, try again!",
            });
            $("#" + boxi2).html(``);
            return;
          }
        }
      } else {
        alert("Upload all required files");
        $("#" + boxi1).html(``);
        return; // Stop execution if no file is selected
      }
    }

    // Handle other inputs
    allInputs.forEach(allInput => {
      obj.data[allInput.dataset.name] = allInput.value;
    });

    allRadioBoxs.forEach((allRadioBox) => {
      if (allRadioBox.checked) {
        obj.data[allRadioBox.name] = allRadioBox.value;
      }
    });

    console.log(obj);
    let StringedData = JSON.stringify(obj);
    loader.style.display = 'none';
    loadedImage.style.display = 'none';
    publixh.style.display = 'none';
    
    
    $.ajax({
      type: "POST",
      url: HOST,
      dataType: "json",
      data: StringedData,
      success: function(data) {
      
        Swal.fire({
          title: "Good job!",
         text: data.message,
        })
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      },
      error: function(request, error) {
       
      }
    });
    
  }

  uploadFiles();
}




