package com.greenstack.farm2door.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "shop_owners")
public class ShopOwner{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // A shop owner is also a user
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;


    // A shop owner can own only one shop
    // A shop can have only one shop owner
    // This is a one-to-one relationship
    @OneToOne(mappedBy = "shopOwner")
    private Shop shop;

}
