package org.trade.option.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.format.DateTimeFormatter;

@Controller
@Slf4j
public class NavigationController {

    @GetMapping(value = { "/","/index"})
    public String index(Model model) {
        model.addAttribute("active", 0);
        return "core/index";
    }

    @GetMapping(value = { "home", "dashboard"})
    public String home(Model model) {
        model.addAttribute("active", 1);
        return "core/home";
    }

    @GetMapping(value = { "nifty/analysis" })
    public String niftyAnalysis(Model model) {
        model.addAttribute("active", 2);
        return "core/analysis";
    }

    @GetMapping(value = { "bank/analysis" })
    public String bankNiftyAnalysis(Model model) {
        model.addAttribute("active", 3);
        return "core/bnfAnalysis";
    }

    @GetMapping(value = { "about"})
    public String about(Model model) {
        model.addAttribute("active", 4);
        return "core/about";
    }

    @GetMapping(value = { "contact"})
    public String contact(Model model) {
        model.addAttribute("active", 5);
        return "core/contact";
    }

}
