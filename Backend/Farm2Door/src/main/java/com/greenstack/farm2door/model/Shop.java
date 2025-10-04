package com.greenstack.farm2door.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Shop {
    // When setting up a shop on the platform ,
    // the user should use the same email and password as their user account
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String address;
    private String contactNumber; // these will be shown for contacting the shop
    private String contactEmail; // these will be shown for contacting the shop
    private String description;

    @OneToMany
    @JoinColumn(name = "shop_id")
    private List<Product> products;

    @OneToOne
    @JoinColumn(name = "shop_owner_id", referencedColumnName = "id")
    private ShopOwner shopOwner;

    public Shop(String name) {
        this.name = name;
    }
}
