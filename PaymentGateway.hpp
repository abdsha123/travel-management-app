// PaymentGateway.hpp
#ifndef PAYMENTGATEWAY_HPP
#define PAYMENTGATEWAY_HPP

#include <string>
#include <iostream>

class PaymentGateway {
public:
    // Static method to simulate payment processing
    static bool processPayment(double amount, const std::string& paymentMethod) {
        // Simulate payment processing
        std::cout << "Processing payment of " << amount << " via " << paymentMethod << "...\n";
        // Simulate a successful payment
        return true;  // Assuming payment is always successful for this simulation
    }
};

#endif  // PAYMENTGATEWAY_HPP
