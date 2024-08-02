<?php
function uploadImages($base64Image)
{
    if (empty($base64Image)) {
        return ['status' => 'success', 'imagePaths' => []]; // No image to upload
    }

    $upload_directory = '../../public/Images/';
    $imagePaths = [];

    if (!is_dir($upload_directory)) {
        mkdir($upload_directory, 0777, true);
    }

    $image_parts = explode(";base64,", $base64Image);
    if (count($image_parts) !== 2) {
        return ['status' => 'error', 'message' => 'Invalid image format'];
    }

    $image_type_aux = explode("image/", $image_parts[0]);
    if (count($image_type_aux) !== 2) {
        return ['status' => 'error', 'message' => 'Invalid image type'];
    }

    $image_type = $image_type_aux[1];
    $image_base64 = base64_decode($image_parts[1]);
    $file_name = uniqid() . '.' . $image_type;
    $file = $upload_directory . $file_name;
    $image_save_link = '/Images/' . $file_name;

    if (file_put_contents($file, $image_base64)) {
        $imagePaths[] = $image_save_link;
    } else {
        return ['status' => 'error', 'message' => 'Failed to upload image'];
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