package com.skmagic.magicplus.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController // 전역 ResponseBody
@RequestMapping(value = "/api", method = { RequestMethod.GET, RequestMethod.POST })
public class TestContorller {

  @PostMapping("/test")
  public Map<String, Object> testHandler() {
    System.out.println("test api called");

    Map<String, Object> res = new HashMap<>();
    res.put("resultCd", "002");
    res.put("resultMsg", "api 호출에 성공했습니다.");

    return res;
  }

  @PostMapping("/order/list")
  public Map<String, Object> orderListHandler() {
    System.out.println("test api called");

    List<Map<String, Object>> orderList = List.of(
        Map.of(
            "key", "1",
            "ordNo", 12050241936L,
            "ordState", "배송중",
            "ordType", "약정",
            "ordDate", "2022.10.02 11:09",
            "ordProduct", "베이직 필터샤워기",
            "ordUsr", "testuser12"),
        Map.of(
            "key", "2",
            "ordNo", 39591058383L,
            "ordState", "배송중",
            "ordType", "일반",
            "ordDate", "2023.11.29 23:09",
            "ordProduct", "온오프 필터샤워기",
            "ordUsr", "showermaster"),
        Map.of(
            "key", "3",
            "ordNo", 21052241236L,
            "ordState", "배송중",
            "ordType", "일반",
            "ordDate", "2020.02.01 23:09",
            "ordProduct", "미스트 필터샤워기",
            "ordUsr", "skmagicplus"),
        Map.of(
            "key", "4",
            "ordNo", 11065241222L,
            "ordState", "배송중",
            "ordType", "약정",
            "ordDate", "2022.10.09 23:09",
            "ordProduct", "듀얼 케어필터",
            "ordUsr", "user1234"));

    Map<String, Object> res = new HashMap<>();
    res.put("orderList", orderList);

    return res;
  }
}
