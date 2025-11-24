package com.greenstack.farm2door.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int quantity;
    private BigDecimal unitPrice;
    private BigDecimal totalPrice;

    //Many cartItems can have one product .
    // like many people can buy same product at the same time
    @ManyToOne
    @JoinColumn(name="product_id", referencedColumnName = "id")
    private Product product;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="cart_id", referencedColumnName = "id")
    private Cart cart;

    public void setTotalPrice() {
        if (unitPrice != null && quantity > 0) {
            this.totalPrice = this.unitPrice.multiply(new BigDecimal(quantity));
        } else {
            this.totalPrice = BigDecimal.ZERO;
        }
    }
}
