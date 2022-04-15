package com.rentit.Dao;

import java.util.List;

public class PlaceOrderDto {

    private float orderPrice;
    private List<PlaceOrderItemDto> itemList;

    public float getOrderPrice() {
        return orderPrice;
    }

    public void setOrderPrice(float orderPrice) {
        this.orderPrice = orderPrice;
    }

    public List<PlaceOrderItemDto> getItemList() {
        return itemList;
    }

    public void setItemList(List<PlaceOrderItemDto> itemList) {
        this.itemList = itemList;
    }
}
