package org.trade.option.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("nifty")
@Slf4j
public class NiftyRestController {
    private final WebClient webClient;
    public NiftyRestController(WebClient webClient) {
        this.webClient = webClient;
    }

    @GetMapping(value = {"/refresh"})
    public Map refresh() {
        return this.webClient
                .get()
                .uri("/nifty/refresh/id/ASC")
                .retrieve()
                .onStatus(HttpStatus::is4xxClientError, response -> {
                    log.error("4xx error");
                    return Mono.error(new RuntimeException("4xx"));
                })
                .onStatus(HttpStatus::is5xxServerError, response -> {
                    System.out.println("5xx error");
                    return Mono.error(new RuntimeException("5xx"));
                })
                .bodyToMono(Map.class)
                .block();
    }

    @GetMapping(value = {"/refreshAnalysis"})
    public @ResponseBody Map refreshAnalysis() {
        return this.webClient
                .get()
                .uri("/nifty/refreshAnalysis/id/ASC")
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

    @GetMapping(value = {"/refreshIndexes"})
    public @ResponseBody Map refreshIndexes() {
        return this.webClient
                .get()
                .uri("/nifty/refreshIndexes")
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
