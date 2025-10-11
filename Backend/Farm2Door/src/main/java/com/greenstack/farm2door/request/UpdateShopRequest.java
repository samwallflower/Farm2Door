package com.greenstack.farm2door.request;

import lombok.Data;

@Data
public class UpdateShopRequest {
    private String name; // unique name for the shop
    private String address;
    private String contactNumber; // these will be shown for contacting the shop
    private String contactEmail; // these will be shown for contacting the shop
    private String description;
}
