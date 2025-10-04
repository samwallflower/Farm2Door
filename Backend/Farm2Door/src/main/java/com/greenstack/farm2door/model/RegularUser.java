package com.greenstack.farm2door.model;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "user_profiles")
@PrimaryKeyJoinColumn(name = "user_id")
public class RegularUser extends User {
    private String FirstName;
    private String LastName;

    // cart
    // orders

    public RegularUser() {
        super();
    }
}
