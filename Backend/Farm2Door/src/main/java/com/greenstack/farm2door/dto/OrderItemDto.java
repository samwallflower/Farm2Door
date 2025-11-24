package com.greenstack.farm2door.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderItemDto {
    private Long productId;
    private String productName;
    private int quantity;
    private String productUnit;
    private BigDecimal price;
}
