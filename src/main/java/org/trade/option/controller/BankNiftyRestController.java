package org.trade.option.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.format.DateTimeFormatter;
import java.util.Map;

@RestController
@RequestMapping("bank")
@Slf4j
public class BankNiftyRestController {
    private final WebClient webClient;
    private static final Integer noOfStrikesPricesInEachCompartment = 3;
    Integer depth = 100;
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MMM-yyyy");

    public BankNiftyRestController(WebClient webClient) {
        this.webClient = webClient;
    }

    @GetMapping(value = {"refresh"})
    public Map refresh() {
        return this.webClient
                .get()
                .uri("/bank/refresh/id/ASC")
                .retrieve()
                .onStatus(HttpStatus::is4xxClientError, response -> {
                    log.error("4xx error");
                    return Mono.error(new RuntimeException("4xx"));
                })
                .onStatus(HttpStatus::is5xxServerError, response -> {
                    log.error("5xx error");
                    return Mono.error(new RuntimeException("5xx"));
                })
                .bodyToMono(Map.class)
                .block();
    }

    @GetMapping(value = {"/refreshAnalysis"})
    public Map refreshAnalysis() {
        return this.webClient
                .get()
                .uri("/bank/refreshAnalysis/id/ASC")
                .retrieve()
                .onStatus(HttpStatus::is4xxClientError, response -> {
                    log.error("4xx error");
                    return Mono.error(new RuntimeException("4xx"));
                })
                .onStatus(HttpStatus::is5xxServerError, response -> {
                    log.error("5xx error");
                    return Mono.error(new RuntimeException("5xx"));
                })
                .bodyToMono(Map.class)
                .block();
    }


}
