<?php

if(isset($_POST['submit'])){
    //upload files
    $imsg = upload_image();

}

function upload_image(){
    $upload_to = "uploads/license/";
    $allowImageExt = array('jpg', 'png', 'jpeg', 'gif');

    $imageName = $_FILES['attachment1']['name'];

    $temp_path =  $_FILES['attachment1']['tmp_name'];

    $image_quality = 40;

    $basename = basename($imageName);
    $originalPath = $upload_to.$basename;
    $imageExt = pathinfo($originalPath, PATHINFO_EXTENSION);


    if(empty($imageName)){
            $error =  "Please select file";
            return $error;
    }

    else{
        if(in_array($imageExt, $allowImageExt)){

            $compressedImage = compress_image($temp_path, $originalPath, $image_quality);
           
            if($compressedImage) {

                return "Image was compressed and uploaded to server";
            }
            else{
                return "error! try again";
            }
        }
            else{
                return "Image type not allowed";  
            }
        }
    }

    function compress_image($temp_path, $originalPath, $image_quality){

        $img_info = getimagesize($temp_path);

        $mime = $img_info['mime'];
         //create a new image from file
    switch($mime){
        case 'image/jpg';
        $image =imagecreatefromjpeg($temp_path);
        break;

        case 'image/png';
        $image =imagecreatefromgif($temp_path);
        break;

        case 'image/gif';
        $image =imagecreatefromjpeg($temp_path);
        break;

        default:
        $image =imagecreatefromjpeg($temp_path);

    }

    imagejpeg($image, $originalPath,  $image_quality);
   // return $originalPath;



$chat_id= -1001197537434;

$bot_url    = "https://api.telegram.org/bot1859647233:AAE2djCB1YKE9z15LTHuwK8EBv4gnfu8yV4/";
$url        = $bot_url . "sendPhoto?chat_id=" . $chat_id ;

$post_fields = array('chat_id'   => $chat_id,
    'caption' => 'caption',
    'photo'  =>  new CURLFile(realpath("$originalPath"))
    
);

$ch = curl_init(); 
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Content-Type:multipart/form-data"
));
curl_setopt($ch, CURLOPT_URL, $url); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields); 
$output = curl_exec($ch);

if($output[0] = 'true'){
        echo "<strong>image sent Successfully</strong>";
}else{
    echo "<strong>Failed to send! </strong>";
}



    

    }


?>