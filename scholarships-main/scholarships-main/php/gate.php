<?php

function login($username, $password)
{
    include "config/index.php";
        $query_User_reA = sprintf("SELECT * FROM `admin` WHERE username='{$username}'");
        $User_reA = mysqli_query($sKhalid, $query_User_reA) or die(mysqli_error($sKhalid));
        $row_User_reA = mysqli_fetch_assoc($User_reA);
        $totalRows_User_reA = mysqli_num_rows($User_reA);
        if ($totalRows_User_reA > 0) {
            if ($row_User_reA['password'] == $password) {
                $arr = ['status' => 1, 'message' => 'Logging you in'];
                exit(json_encode($arr));
            }
        }else{
            $arr = ['status' => 0, 'message' => 'Wrong credentials'];
                exit(json_encode($arr));
        }
}

function fetchAllProperty(){
    include "config/index.php";
    $query_User_re = sprintf("SELECT * FROM property_l");
    $User_re = mysqli_query($sKhalid, $query_User_re) or die(mysqli_error($sKhalid));
    $row_User_re = mysqli_fetch_assoc($User_re);
    $totalRows_User_re = mysqli_num_rows($User_re);
    if ($totalRows_User_re > 0) {
            $cc = [];
            do {
                $cc[] = $row_User_re;
            } while ($row_User_re = mysqli_fetch_assoc($User_re));
            exit(json_encode($cc));
    }
}
function fetchProperty(){
    include "config/index.php";
    $availability = "sale";
    $query_User_re = sprintf("SELECT * FROM property_l WHERE `availability` = '$availability'");
    $User_re = mysqli_query($sKhalid, $query_User_re) or die(mysqli_error($sKhalid));
    $row_User_re = mysqli_fetch_assoc($User_re);
    $totalRows_User_re = mysqli_num_rows($User_re);
    if ($totalRows_User_re > 0) {
            $cc = [];
            do {
                $cc[] = $row_User_re;
            } while ($row_User_re = mysqli_fetch_assoc($User_re));
            exit(json_encode($cc));
    }
}


function createUser(){

include "config/index.php"; // include database connection file

$upload_path = '../uploads/'; // Set upload folder path

// Valid image extensions
$valid_extensions = array('jpeg', 'jpg', 'png', 'gif');

// Initialize error message array
$errorMessages = [];

if(isset($_FILES['image']['name']) && is_array($_FILES['image']['name'])) {
    $fileCount = count($_FILES['image']['name']);

    for($i = 0; $i < $fileCount; $i++) {
        $fileName = $_FILES['image']['name'][$i];
        $tempPath = $_FILES['image']['tmp_name'][$i];
        $fileSize = $_FILES['image']['size'][$i];
        
        if(empty($fileName)) {
            $errorMessages[] = "Please select an image.";
            continue;
        }
        
        $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        
        if(in_array($fileExt, $valid_extensions)) {
            if(!file_exists($upload_path . $fileName)) {
                if($fileSize < 5000000) {
                    move_uploaded_file($tempPath, $upload_path . $fileName);
                } else {
                    $errorMessages[] = "Sorry, your file is too large, please upload 5 MB size.";
                }
            } else {
                $errorMessages[] = "Sorry, file already exists check upload folder.";
            }
        } else {
            $errorMessages[] = "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
        }
    }
} else {
    $errorMessages[] = "No files provided.";
}
if(!empty($errorMessages)) {
    $errorMSG = json_encode(array("messages" => $errorMessages, "status" => 0 ));
    echo $errorMSG;
} else {
    // echo json_encode(array("message" => "Files uploaded successfully", "status" => 1));
    $listing_type = $_POST['listing_type'];
    $property_type = $_POST['property_type'];
    $price = $_POST['price'];
    $description = $_POST['description'];
    $location = $_POST['locat'];
    $land_size = $_POST['land_size'];
    $bed_space = $_POST['bed_space'];
    $bathroom = $_POST['bathroom'];
    $availability = "sale";
    
                  $query_User_re = sprintf("INSERT INTO property_l (`listing_type`, `image`, `property_type`, `price`, `description`, `location`, `land_size`, `bed_space`, `bathroom`, `availability`)
                  VALUES('$listing_type', '$fileName', '$property_type', '$price', '$description', '$location', '$land_size', '$bed_space', '$bathroom', '$availability')");
              $User_re = mysqli_query($sKhalid, $query_User_re) or die(mysqli_error($sKhalid));
              if ($User_re ) {
              $arr = [
              'status' => 1,'message' => "property added successfully"
              ];
              exit(json_encode($arr));
              }	
}
	
}

function updatePropertyListing(){
    

// $error=array();
// $extension=array("jpeg","jpg","png","gif");
// foreach($_FILES["files"]["tmp_name"] as $key=>$tmp_name) {
//     $file_name=$_FILES["files"]["name"][$key];
//     $file_tmp=$_FILES["files"]["tmp_name"][$key];
//     $ext=pathinfo($file_name,PATHINFO_EXTENSION);

//     if(in_array($ext,$extension)) {
//         if(!file_exists("photo_gallery/".$txtGalleryName."/".$file_name)) {
//             move_uploaded_file($file_tmp=$_FILES["files"]["tmp_name"][$key],"photo_gallery/".$txtGalleryName."/".$file_name);
//         }
//         else {
//             $filename=basename($file_name,$ext);
//             $newFileName=$filename.time().".".$ext;
//             move_uploaded_file($file_tmp=$_FILES["files"]["tmp_name"][$key],"photo_gallery/".$txtGalleryName."/".$newFileName);
//         }
//     }
//     else {
//         array_push($error,"$file_name, ");
//     }
// }
    include "config/index.php"; // include database connection file

	
    $fileName  =  $_FILES['image']['name'];
    $tempPath  =  $_FILES['image']['tmp_name'];
    $fileSize  =  $_FILES['image']['size'];
            
    if(empty($fileName))
    {
        $errorMSG = json_encode(array("message" => "please select image", "status" => false));	
        echo $errorMSG;
    }
    else
    {
        $upload_path = '../img/uploads/'; // set upload folder path 
        
        $fileExt = strtolower(pathinfo($fileName,PATHINFO_EXTENSION)); // get image extension
            
        // valid image extensions
        $valid_extensions = array('jpeg', 'jpg', 'png', 'gif'); 
                        
        // allow valid image file formats
        if(in_array($fileExt, $valid_extensions))
        {				
            //check file not exist our upload folder path
            if(!file_exists($upload_path . $fileName))
            {
                // check file size '5MB'
                if($fileSize < 5000000){
                    move_uploaded_file($tempPath, $upload_path . $fileName); // move file from system temporary path to our upload folder path 
                }
                else{		
                    $errorMSG = json_encode(array("message" => "Sorry, your file is too large, please upload 5 MB size", "status" => false));	
                    echo $errorMSG;
                }
            }
            else
            {		
                $errorMSG = json_encode(array("message" => "Sorry, file already exists check upload folder", "status" => false));	
                echo $errorMSG;
            }
        }
        else
        {		
            $errorMSG = json_encode(array("message" => "Sorry, only JPG, JPEG, PNG & GIF files are allowed", "status" => false));	
            echo $errorMSG;		
        }
    }
            
    // if no error caused, continue ....
    if(!isset($errorMSG))
    {
        $id = $_POST['id'];
        $listing_type = $_POST['listing_type'];
        $property_type = $_POST['property_type'];
        $price = $_POST['price'];
        $description = $_POST['description'];
        $location = $_POST['locat'];
        $land_size = $_POST['land_size'];
        $bed_space = $_POST['bed_space'];
        $bathroom = $_POST['bathroom'];
        $availability = "sale";
        
                  
    $query_User_re = sprintf("UPDATE property_l SET `listing_type`= '$listing_type', `image` = '$image', `property_type`= '$property_type', `price` = '$price', `description` = '$description', `location` = '$location', `land_size` = '$land_size', `bed_space` = '$bed_space', `bathroom` = '$bathroom', `availability` = '$availability' WHERE id = '$id'");
    $User_re = mysqli_query($sKhalid, $query_User_re) or die(mysqli_error($sKhalid));
    $row_User_re = mysqli_fetch_assoc($User_re);
    $totalRows_User_re = mysqli_num_rows($User_re);
    if ($User_re) {
            $arr = [
                'status' => 1,'message' => "property Upadated successfully"
            ];
            exit(json_encode($arr));
    }else {
        $arr = [
            'status' => 0,'message' => "Failed to add Property"
        ];
        exit(json_encode($arr));
    }
    }
}



function fetchAgent(){
    include "config/index.php";

    $query_User_re = sprintf("SELECT * FROM agent");
    $User_re = mysqli_query($sKhalid, $query_User_re) or die(mysqli_error($sKhalid));
    $row_User_re = mysqli_fetch_assoc($User_re);
    $totalRows_User_re = mysqli_num_rows($User_re);
    if ($totalRows_User_re) {
            $arr = [];
            do{
                $arr[] = $row_User_re;
            }while($row_User_re = mysqli_fetch_assoc($User_re));
            exit(json_encode($arr));
    }
}

function createAgent(){
    include "config/index.php";
    $fullname = $_POST['fullname'];
    $img = $_POST['img'];
    $phone = $_POST['phone'];

    $query_User_re = sprintf("INSERT INTO agent (`fullname`, `image`, `phone`)
                            VALUES('$fullname', '$img', '$phone')");
    $User_re = mysqli_query($sKhalid, $query_User_re) or die(mysqli_error($sKhalid));
    $row_User_re = mysqli_fetch_assoc($User_re);
    $totalRows_User_re = mysqli_num_rows($User_re);
    if ($totalRows_User_re > 0) {
            $arr = [
                'status' => 1,'message' => "Agent added successfully"
            ];
            exit(json_encode($arr));
    }
    else {
        $arr = [
            'status' => 0,'message' => "Failed to add Agent"
        ];
        exit(json_encode($arr));
}
}

function updateAgent(){
    include "config/index.php";
    $fullname = $_POST['fullname'];
    $img = $_POST['img'];
    $phone = $_POST['phone'];

    $query_User_re = sprintf("UPDATE agent SET `fullname`= '$fullname', `image` = '$img', `phone`= '$phone' WHERE id = '$id'");
    $User_re = mysqli_query($sKhalid, $query_User_re) or die(mysqli_error($sKhalid));
    $row_User_re = mysqli_fetch_assoc($User_re);
    $totalRows_User_re = mysqli_num_rows($User_re);
    if ($User_re) {
            $arr = [
                'status' => 1,'message' => "agent Updated successfully"
            ];
            exit(json_encode($arr));
    }else {
        $arr = [
            'status' => 0,'message' => "Failed to update Property"
        ];
        exit(json_encode($arr));
    }
}

function fetchContact(){
    include "config/index.php";

    $query_User_re = sprintf("SELECT * FROM contact");
    $User_re = mysqli_query($sKhalid, $query_User_re) or die(mysqli_error($sKhalid));
    $row_User_re = mysqli_fetch_assoc($User_re);
    $totalRows_User_re = mysqli_num_rows($User_re);
    if ($totalRows_User_re > 0) {
            $arr = [];
            do{
                $arr[] = $row_User_re;
            }while($row_User_re = mysqli_fetch_assoc($User_re));
            exit(json_encode($arr));
    }
}

function createContact(){
    include "config/index.php";
    $location = $_POST['location'];
    $phone = $_POST['phone'];

    $query_User_re = sprintf("INSERT INTO contact (`location`, `phone`)
                            VALUES('$location', '$phone')");
    $User_re = mysqli_query($sKhalid, $query_User_re) or die(mysqli_error($sKhalid));
    $row_User_re = mysqli_fetch_assoc($User_re);
    $totalRows_User_re = mysqli_num_rows($User_re);
    if ($totalRows_User_re > 0) {
            $arr = [
                'status' => 1,'message' => "contact added successfully"
            ];
            exit(json_encode($arr));
    }
    else {
        $arr = [
            'status' => 0,'message' => "Failed to add contact"
        ];
        exit(json_encode($arr));
}

}

function updateContact(){
    include "config/index.php";
    $location = $_POST['location'];
    $phone = $_POST['phone'];

    $query_User_re = sprintf("UPDATE contact SET `location`= '$location', `phone`= '$phone' WHERE id = '$id'");
    $User_re = mysqli_query($sKhalid, $query_User_re) or die(mysqli_error($sKhalid));
    $row_User_re = mysqli_fetch_assoc($User_re);
    $totalRows_User_re = mysqli_num_rows($User_re);
    if ($User_re) {
            $arr = [
                'status' => 1,'message' => "Contact Updated successfully"
            ];
            exit(json_encode($arr));
    }else {
        $arr = [
            'status' => 0,'message' => "Failed to update Contact"
        ];
        exit(json_encode($arr));
    }
}
function fetchPropManagers(){
    include "config/index.php";

    $query_User_re = sprintf("SELECT * FROM property_managers");
    $User_re = mysqli_query($sKhalid, $query_User_re) or die(mysqli_error($sKhalid));
    $row_User_re = mysqli_fetch_assoc($User_re);
    $totalRows_User_re = mysqli_num_rows($User_re);
    if ($totalRows_User_re > 0) {
            $arr = [];
            do{
                $arr[] = $row_User_re;
            }while( $row_User_re = mysqli_fetch_assoc($User_re));
            exit(json_encode($arr));
    }
}

function createPropManagers(){
    include "config/index.php";
    $fname = $_POST['fullname'];
    $image = $_POST['image'];
    $designation = $_POST['designation'];
    $twitter = $_POST['twitter'];
    $facebook = $_POST['facebook'];
    $linkedin = $_POST['linkedin'];

    $query_User_re = sprintf("INSERT INTO property_managers (`fullname`, `image`, `designation`, `twitter`, `facebook`, `linkedin`)
                            VALUES('$fname', '$image', '$designation', '$twitter','$facebook', '$linkedin')");
    $User_re = mysqli_query($sKhalid, $query_User_re) or die(mysqli_error($sKhalid));
    $row_User_re = mysqli_fetch_assoc($User_re);
    $totalRows_User_re = mysqli_num_rows($User_re);
    if ($totalRows_User_re > 0) {
            $arr = [
                'status' => 1,'message' => "Property manager added successfully"
            ];
            exit(json_encode($arr));
    }
    else {
        $arr = [
            'status' => 0,'message' => "Failed to add property manager"
        ];
        exit(json_encode($arr));
}

}

function updatePropManagers(){
    include "config/index.php";
    $fname = $_POST['fullname'];
    $image = $_POST['image'];
    $designation = $_POST['designation'];
    $twitter = $_POST['twitter'];
    $facebook = $_POST['facebook'];
    $linkedin = $_POST['linkedin'];

    $query_User_re = sprintf("UPDATE property_managers SET `fullname`= '$fname', `image`= '$image', `designation`= '$designation', `twitter`= '$twitter', `facebook`= '$facebook', `linkedin`= '$linkedin' WHERE id = '$id'");
    $User_re = mysqli_query($sKhalid, $query_User_re) or die(mysqli_error($sKhalid));
    $row_User_re = mysqli_fetch_assoc($User_re);
    $totalRows_User_re = mysqli_num_rows($User_re);
    if ($User_re) {
            $arr = [
                'status' => 1,'message' => "Property agent Updated successfully"
            ];
            exit(json_encode($arr));
    }else {
        $arr = [
            'status' => 0,'message' => "Failed to update property agent"
        ];
        exit(json_encode($arr));
    }
}
