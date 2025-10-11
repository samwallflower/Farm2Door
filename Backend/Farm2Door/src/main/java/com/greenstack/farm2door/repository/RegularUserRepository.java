package com.greenstack.farm2door.repository;

import com.greenstack.farm2door.model.RegularUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegularUserRepository extends JpaRepository<RegularUser, Long> {
}
