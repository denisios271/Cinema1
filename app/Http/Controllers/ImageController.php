<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use claviska\SimpleImage;

class ImageController extends Controller
{
    const IMAGE_PATH = '/images/posters/';
    
    public static function download(string $uri)
    {
        $uri = str_replace('https://', 'http://', $uri);
        Log::info("Started downloading and resizing image: '{$uri}'");
        
        Log::debug('Starting initialization...');
        $folder = public_path(self::IMAGE_PATH);
        $resultSize = (object) [
            'width' => 400,
            'height' => 600,
        ];
        $fileName = time() . '.jpg';
        $fullFileName = "{$folder}{$fileName}";
    
        Log::debug('Trying to fetch data from url...');
        $image = new SimpleImage($uri);

        Log::debug('Trying to resize image...');
        $image->resize($resultSize->width, $resultSize->height);

        Log::debug("Trying to save image to the file '{$fullFileName}'...");
        $image->toFile("{$fullFileName}", 'image/jpeg');
        
        Log::debug("Finished downloading and resizing image from '{$uri}' to '{$fullFileName}'");
        return $fileName;
    }
}
