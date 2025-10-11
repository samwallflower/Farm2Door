package com.greenstack.farm2door.service.image;

import com.greenstack.farm2door.dto.ImageDto;
import com.greenstack.farm2door.model.Image;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IImageService {
    Image getImagebyId(Long id);
    List<ImageDto> saveImages(List<MultipartFile> files, Long productId);
    void deleteImageById(Long id);
    void updateImage(MultipartFile file, Long imageId);
    List<Image> getImagesByProductId(Long productId);
}
