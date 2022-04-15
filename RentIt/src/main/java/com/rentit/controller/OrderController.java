package com.rentit.controller;

import com.rentit.Dao.PlaceOrderDto;
import com.rentit.entity.OrderDetails;
import com.rentit.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderController {

    @Autowired
    OrderService orderService;

    @GetMapping("/allorders")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<OrderDetails> fetchAllOrders(@RequestParam String username)
    {
        return orderService.getAllOrders(username);
    }

    @GetMapping("/order")
    @CrossOrigin(origins = "http://localhost:3000")
    public OrderDetails fetchAllOrders(@RequestParam int orderId)
    {
        return orderService.getOrder(orderId);
    }

    @PostMapping("/placeorder")
    @CrossOrigin(origins = "http://localhost:3000")
    public OrderDetails placeOrder(@RequestBody PlaceOrderDto placeOrderDto, @RequestParam String username)
    {
        return orderService.placeOrder(placeOrderDto, username);
    }

    @DeleteMapping("/deleteOrder")
    @CrossOrigin(origins = "http://localhost:3000")
    public HttpStatus deleteOrder(@RequestParam int id) {
        return orderService.deleteOrder(id);
    }

}
