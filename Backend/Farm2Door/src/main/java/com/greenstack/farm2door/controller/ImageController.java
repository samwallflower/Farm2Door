package com.greenstack.farm2door.controller;

import com.greenstack.farm2door.dto.ImageDto;
import com.greenstack.farm2door.exceptions.ResourceNotFoundException;
import com.greenstack.farm2door.model.Image;
import com.greenstack.farm2door.response.ApiResponse;
import com.greenstack.farm2door.service.image.IImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.sql.SQLException;
import java.util.List;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/images")
public class ImageController {
    private final IImageService imageService;

    //upload images
    @PostMapping("/upload")
    public ResponseEntity<ApiResponse> saveImages(@RequestParam List<MultipartFile> files, @RequestParam Long productId){
        try{
            List<ImageDto> imageDtos = imageService.saveImages(files, productId);
            return ResponseEntity.ok(new ApiResponse("Upload successful", imageDtos));
        }catch (Exception e){
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse("Upload failed!", e.getMessage()));
        }
    }

    // download image
    @GetMapping("/image/download/{imageId}")
    public ResponseEntity<Resource> downloadImage(@PathVariable Long imageId) throws SQLException {
        Image image = imageService.getImagebyId(imageId);
        ByteArrayResource resource = new ByteArrayResource(image.getImage().getBytes(1, (int) image.getImage().length()));// 1 till length of the blob
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(image.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + image.getFileName() + "\"")
                .body(resource);
    }

    // update image
    @PutMapping("/image/{imageId}/update")
    public ResponseEntity<ApiResponse> updateImage(@PathVariable Long imageId, @RequestBody MultipartFile file) {
        try {
            Image image = imageService.getImagebyId(imageId);
            if (image != null) {
                imageService.updateImage(file, imageId);
                return ResponseEntity.ok(new ApiResponse("Update successful", null));
            }
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
        return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse("Update failed!", INTERNAL_SERVER_ERROR));

    }
    // delete image
    @DeleteMapping("/image/{imageId}/delete")
    public ResponseEntity<ApiResponse> deleteImage(@PathVariable Long imageId){
        try {
            Image image = imageService.getImagebyId(imageId);
            if (image != null) {
                imageService.deleteImageById(imageId);
                return ResponseEntity.ok(new ApiResponse("Delete successful", null));
            }
        }catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
        return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse("Delete failed!", INTERNAL_SERVER_ERROR));
    }
}
