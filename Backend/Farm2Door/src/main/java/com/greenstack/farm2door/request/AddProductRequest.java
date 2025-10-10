package com.greenstack.farm2door.request;

import com.greenstack.farm2door.model.Category;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class AddProductRequest {
    private String name;
    private String description;
    private BigDecimal price; // price per unit
    private int inventory;
    private String origin; // e.g., farm location
    private String unit;
    private Category category;
}
