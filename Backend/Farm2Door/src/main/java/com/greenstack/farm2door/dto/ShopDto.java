package com.greenstack.farm2door.dto;

import lombok.Data;

@Data
public class ShopDto {
    private Long id;
    private String name;
    private String address;
    private String contactNumber; // these will be shown for contacting the shop
    private String contactEmail; // these will be shown for contacting the shop
    private String description;
}
