package com.greenstack.farm2door.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ShopConfig {

    // Bean for ModelMapper to map between DTOs and entities.
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

}
