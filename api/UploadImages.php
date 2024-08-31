<?php
function uploadImages($files)
{
    if (empty($files) || !isset($files['tmp_name']) || empty($files['tmp_name'])) {
        return ['status' => 'success', 'imagePaths' => []]; // No image to upload
    }

    $upload_directory = '../../Images/';
    $imagePaths = [];

    if (!is_dir($upload_directory)) {
        mkdir($upload_directory, 0777, true);
    }

    foreach ($files['tmp_name'] as $index => $tmp_name) {
        if ($files['error'][$index] !== UPLOAD_ERR_OK) {
            return ['status' => 'error', 'message' => 'Error uploading file'];
        }

        $image_type = pathinfo($files['name'][$index], PATHINFO_EXTENSION);
        $file_name = uniqid() . '.' . $image_type;
        $file = $upload_directory . $file_name;
        $image_save_link = '/Images/' . $file_name;

        if (move_uploaded_file($tmp_name, $file)) {
            $imagePaths[] = $image_save_link;
        } else {
            return ['status' => 'error', 'message' => 'Failed to upload image'];
        }
    }

    return ['status' => 'success', 'imagePaths' => $imagePaths];
}

// for usage
// require_once '../UploadImages.php';
// $uploadResult = uploadImages($received_files['images']);
//     if ($uploadResult['status'] === 'error') {
//         echo json_encode($uploadResult);
//         return;
//     }

//     $images_json = implode(',', $uploadResult['imagePaths']);
// $queue->setImage($images_json);