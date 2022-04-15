package com.rentit.service;

import com.rentit.Dao.PlaceOrderDto;
import com.rentit.Dao.PlaceOrderItemDto;
import com.rentit.entity.*;
import com.rentit.repository.*;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    LoginRepository loginRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    OrderDetailsRepository orderDetailsRepository;

    @Autowired
    OrderItemsRepository orderItemsRepository;

    @Autowired
    ProductRepository productRepository;

    SimpleDateFormat formatter1=new SimpleDateFormat("dd/MM/yyyy");

    public List<OrderDetails> getAllOrders(String username) {
        Login login = loginRepository.findByUsername(username);
        Optional<Customer> customer = customerRepository.findByLoginId(login);
        Optional<List<OrderDetails>> orderDetails = orderDetailsRepository.findByCustomer(customer.get());
        return orderDetails.get();
    }

    public OrderDetails getOrder(int orderId) {
        return orderDetailsRepository.findByOrderId(orderId);
    }

    public OrderDetails placeOrder(PlaceOrderDto placeOrderDto, String username) {

        Login login = loginRepository.findByUsername(username);
        Optional<Customer> customer = customerRepository.findByLoginId(login);

        List<OrderItem> orderItemList = new ArrayList<>();
        List<Product> productList = new ArrayList<>();
        for (PlaceOrderItemDto placeOrderItemDto : placeOrderDto.getItemList()) {
            OrderItem orderItem = new OrderItem();
            Product product = productRepository.findByProductId(placeOrderItemDto.getProductId());
            if (product.getAvailable().equalsIgnoreCase("Y")) {
                orderItem.setProduct(product);
                orderItem.setItemCost(placeOrderItemDto.getItemCost());
                try {
                    orderItem.setItemRentDate(formatter1.parse(placeOrderItemDto.getItemRentDate()));
                    orderItem.setItemReturnDate(formatter1.parse(placeOrderItemDto.getItemReturnDate()));
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                orderItemList.add(orderItem);
                product.setAvailable("N");
                productList.add(product);
            } else {
                return null;
            }
        }
        orderItemList = orderItemsRepository.saveAll(orderItemList);
        productRepository.saveAll(productList);
        OrderDetails orderDetails = new OrderDetails();
        orderDetails.setOrderPrice(placeOrderDto.getOrderPrice());
        orderDetails.setCustomer(customer.get());
        orderDetails.setOrderstatus("Order Placed");
        orderDetails.setOrderItemList(orderItemList);
        orderDetails = orderDetailsRepository.save(orderDetails);

        return orderDetails;
    }

    public HttpStatus deleteOrder(int id) {
        OrderDetails orderDetails = orderDetailsRepository.findByOrderId(id);
        List<Product> productList = new ArrayList<>();
        for (OrderItem orderItem : orderDetails.getOrderItemList()) {
            Product product = orderItem.getProduct();
            product.setAvailable("Y");
            productList.add(product);
            orderItemsRepository.delete(orderItem);
            productRepository.save(product);
        }
        orderDetailsRepository.delete(orderDetails);
        return HttpStatus.OK;
    }
}
