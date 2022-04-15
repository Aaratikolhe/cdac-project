package com.rentit.Dao;

public class PlaceOrderItemDto {
    private String itemRentDate;
    private String itemReturnDate;
    private int productId;
    private float itemCost;

    public String getItemRentDate() {
        return itemRentDate;
    }

    public void setItemRentDate(String itemRentDate) {
        this.itemRentDate = itemRentDate;
    }

    public String getItemReturnDate() {
        return itemReturnDate;
    }

    public void setItemReturnDate(String itemReturnDate) {
        this.itemReturnDate = itemReturnDate;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public float getItemCost() {
        return itemCost;
    }

    public void setItemCost(float itemCost) {
        this.itemCost = itemCost;
    }
}
