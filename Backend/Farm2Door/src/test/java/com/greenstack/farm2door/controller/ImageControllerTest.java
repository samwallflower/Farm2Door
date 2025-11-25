package com.greenstack.farm2door.controller;

import com.greenstack.farm2door.dto.ImageDto;
import com.greenstack.farm2door.exceptions.ResourceNotFoundException;
import com.greenstack.farm2door.model.Image;
import com.greenstack.farm2door.response.ApiResponse;
import com.greenstack.farm2door.service.image.IImageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Blob;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.http.HttpStatus.*;

class ImageControllerTest {

    @Mock
    private IImageService imageService;

    @InjectMocks
    private ImageController imageController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveImages_Success() throws Exception {
        MultipartFile file1 = new MockMultipartFile("file1", "file1.jpg", "image/jpeg", "data".getBytes());
        List<MultipartFile> files = Arrays.asList(file1);

        ImageDto dto = new ImageDto();
        List<ImageDto> dtos = Arrays.asList(dto);

        when(imageService.saveImages(files, 1L)).thenReturn(dtos);

        ResponseEntity<ApiResponse> response = imageController.saveImages(files, 1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Upload successful", response.getBody().getMessage());
        assertEquals(dtos, response.getBody().getData());
    }

    @Test
    void testSaveImages_Failure() throws Exception {
        MultipartFile file1 = new MockMultipartFile("file1", "file1.jpg", "image/jpeg", "data".getBytes());
        List<MultipartFile> files = Arrays.asList(file1);

        when(imageService.saveImages(files, 1L)).thenThrow(new RuntimeException("DB error"));

        ResponseEntity<ApiResponse> response = imageController.saveImages(files, 1L);

        assertEquals(INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("Upload failed!", response.getBody().getMessage());
    }

    @Test
    void testDownloadImage_Success() throws SQLException {
        Image image = mock(Image.class);
        Blob blob = mock(Blob.class);
        when(image.getImage()).thenReturn(blob);
        when(blob.length()).thenReturn(4L);
        when(blob.getBytes(1, 4)).thenReturn(new byte[]{1, 2, 3, 4});
        when(image.getFileType()).thenReturn("image/jpeg");
        when(image.getFileName()).thenReturn("file.jpg");

        when(imageService.getImagebyId(1L)).thenReturn(image);

        ResponseEntity<Resource> response = imageController.downloadImage(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
    }

    @Test
    void testUpdateImage_Success() throws ResourceNotFoundException {
        MultipartFile file = new MockMultipartFile("file", "file.jpg", "image/jpeg", "data".getBytes());
        Image image = new Image();

        when(imageService.getImagebyId(1L)).thenReturn(image);
        doNothing().when(imageService).updateImage(file, 1L);

        ResponseEntity<ApiResponse> response = imageController.updateImage(1L, file);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Update successful", response.getBody().getMessage());
    }

    @Test
    void testUpdateImage_NotFound() throws ResourceNotFoundException {
        MultipartFile file = new MockMultipartFile("file", "file.jpg", "image/jpeg", "data".getBytes());

        when(imageService.getImagebyId(1L)).thenThrow(new ResourceNotFoundException("Image not found"));

        ResponseEntity<ApiResponse> response = imageController.updateImage(1L, file);

        assertEquals(NOT_FOUND, response.getStatusCode());
        assertEquals("Image not found", response.getBody().getMessage());
        assertNull(response.getBody().getData());
    }

    @Test
    void testDeleteImage_Success() throws ResourceNotFoundException {
        Image image = new Image();
        when(imageService.getImagebyId(1L)).thenReturn(image);
        doNothing().when(imageService).deleteImageById(1L);

        ResponseEntity<ApiResponse> response = imageController.deleteImage(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Delete successful", response.getBody().getMessage());
    }

    @Test
    void testDeleteImage_NotFound() throws ResourceNotFoundException {
        when(imageService.getImagebyId(1L)).thenThrow(new ResourceNotFoundException("Image not found"));

        ResponseEntity<ApiResponse> response = imageController.deleteImage(1L);

        assertEquals(NOT_FOUND, response.getStatusCode());
        assertEquals("Image not found", response.getBody().getMessage());
        assertNull(response.getBody().getData());
    }

    @Test
    void testGetImagesByProductId_Success() throws ResourceNotFoundException {
        Image image = new Image();
        List<Image> images = Arrays.asList(image);
        ImageDto dto = new ImageDto();
        List<ImageDto> dtos = Arrays.asList(dto);

        when(imageService.getImagesByProductId(1L)).thenReturn(images);
        when(imageService.convertToDtoList(images)).thenReturn(dtos);

        ResponseEntity<ApiResponse> response = imageController.getImagesByProductId(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Images fetched successfully", response.getBody().getMessage());
        assertEquals(dtos, response.getBody().getData());
    }

    @Test
    void testGetImagesByProductId_NotFound() throws ResourceNotFoundException {
        when(imageService.getImagesByProductId(1L)).thenThrow(new ResourceNotFoundException("No images found"));

        ResponseEntity<ApiResponse> response = imageController.getImagesByProductId(1L);

        assertEquals(NOT_FOUND, response.getStatusCode());
        assertEquals("No images found", response.getBody().getMessage());
        assertNull(response.getBody().getData());
    }
}
