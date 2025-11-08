package com.greenstack.farm2door.controller;

import com.greenstack.farm2door.dto.ShopDto;
import com.greenstack.farm2door.exceptions.AlreadyExistsException;
import com.greenstack.farm2door.exceptions.ResourceNotFoundException;
import com.greenstack.farm2door.model.Shop;
import com.greenstack.farm2door.request.AddShopRequest;
import com.greenstack.farm2door.request.UpdateShopRequest;
import com.greenstack.farm2door.response.ApiResponse;
import com.greenstack.farm2door.service.shop.IShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/shops")
public class ShopController {
    private final IShopService shopService;

    // get all shops
    @GetMapping("/all")
    public ResponseEntity<ApiResponse> getAllShops(){
        List<Shop> shops = shopService.getAllShops();
        List<ShopDto> convertedShops = shopService.getConvertedShops(shops);
        return  !convertedShops.isEmpty() ?
                ResponseEntity.ok(new ApiResponse("Shops retrieved successfully", convertedShops))
                : ResponseEntity.status(NOT_FOUND).body(new ApiResponse("No shops found", null));
    }

    // get shop by id
    @GetMapping("/shop/{shopId}/shop")
    public ResponseEntity<ApiResponse> getShopById(@PathVariable Long shopId){
        try {
            Shop shop = shopService.getShopById(shopId);
            ShopDto shopDto = shopService.convertToDto(shop);
            return ResponseEntity.ok(new ApiResponse("Shop retrieved successfully", shopDto));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }

    // get shop by name
    @GetMapping("/shop/by-shopName")
    public ResponseEntity<ApiResponse> getShopByName(@RequestParam String shopName){
        try {
            Shop shop = shopService.getShopByName(shopName);
            ShopDto shopDto = shopService.convertToDto(shop);
            return shop != null ?
                    ResponseEntity.ok(new ApiResponse("Shop retrieved successfully", shopDto)) :
                    ResponseEntity.status(NOT_FOUND).body(new ApiResponse("No shop found with the given name", null));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    // get shop by user id
    @GetMapping("/shop/user/{userId}/shop")
    public ResponseEntity<ApiResponse> getShopByUserId(@PathVariable Long userId) {
        try {
            Shop shop = shopService.getShopByUserId(userId);
            ShopDto shopDto = shopService.convertToDto(shop);
            return shopDto != null ?
                    ResponseEntity.ok(new ApiResponse("Shop retrieved successfully", shopDto)):
                    ResponseEntity.status(NOT_FOUND).body(new ApiResponse("No shop found for the given userId", null));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }


    // count products in shop
    @GetMapping("/shop/{shopId}/products/count")
    public ResponseEntity<ApiResponse> countProductsInShop(@PathVariable Long shopId) {
        try {
            Long count = shopService.countProductsInShop(shopId);
            return ResponseEntity.ok(new ApiResponse("Product count retrieved successfully", count));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    // add a shop
    @PostMapping("/add/{userId}/shop")
    public ResponseEntity<ApiResponse> addShop(@RequestBody AddShopRequest shop, @PathVariable Long userId) {
        try {
            Shop newShop = shopService.addShop(shop, userId);
            ShopDto shopDto = shopService.convertToDto(newShop);
            return ResponseEntity.ok(new ApiResponse("Shop added successfully", shopDto));
        } catch (AlreadyExistsException e) {
            return ResponseEntity.status(CONFLICT).body(new ApiResponse(e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    // update shop details
    @PutMapping("/shop/{shopId}/update")
    public ResponseEntity<ApiResponse> updateShop(@PathVariable Long shopId, @RequestBody UpdateShopRequest shop) {
        try {
            Shop updatedShop = shopService.updateShop(shopId, shop);
            ShopDto shopDto = shopService.convertToDto(updatedShop);
            return ResponseEntity.ok(new ApiResponse("Shop updated successfully", shopDto));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    // delete shop
    @DeleteMapping("/shop/{shopId}/delete")
    public ResponseEntity<ApiResponse> deleteShop(@PathVariable Long shopId) {
        try {
            shopService.deleteShopById(shopId);
            return ResponseEntity.ok(new ApiResponse("Shop deleted successfully", shopId));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

}
