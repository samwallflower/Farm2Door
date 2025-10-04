package com.greenstack.farm2door.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "shop_owners")
@PrimaryKeyJoinColumn(name = "user_id")
public class ShopOwner extends User {
    // A shop owner can own only one shop
    // A shop can have only one shop owner
    // This is a one-to-one relationship
    @OneToOne(mappedBy = "shopOwner", cascade = CascadeType.ALL)
    private Shop shop;
    public  ShopOwner() {
        super();
    }
}
