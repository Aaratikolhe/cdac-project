package com.rentit.repository;

import com.rentit.entity.Customer;
import com.rentit.entity.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Integer>  {
    Optional<List<OrderDetails>> findByCustomer(Customer customer);
    
    OrderDetails findByOrderId(int orderId);
}
