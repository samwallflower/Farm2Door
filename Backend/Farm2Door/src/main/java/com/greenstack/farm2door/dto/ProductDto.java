package com.greenstack.farm2door.dto;
import com.greenstack.farm2door.model.Category;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductDto {
    private Long id;
    private String name;
    private BigDecimal price;
    private int inventory;
    private String description;
    private Category category;
    private String origin; // e.g., farm location
    private String unit; // e.g., kg, lb, dozen
    private List<ImageDto> images;
    private Long shopId;
}
