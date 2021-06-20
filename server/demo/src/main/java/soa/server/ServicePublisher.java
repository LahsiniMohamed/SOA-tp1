package soa.server;

import soa.webservices.ProductsManagerImpl;

import javax.xml.ws.Endpoint;

public class ServicePublisher {
    public static void main(String[] args) {
        String url = "http://localhost:8081/";

        Endpoint.publish(url, new ProductsManagerImpl());
        System.out.println("**** Server started ****");
    }
}
