package kr.hs.dgsw.webclass01;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GetController {
    @Autowired
    private CalculatorService cs;

    @GetMapping("/calculator/{a}/{b}/{type}")
    public int caluclator(@PathVariable String a, @PathVariable String b, @PathVariable String type){
        return cs.calculator(Integer.parseInt(a),Integer.parseInt(b),Integer.parseInt(type));
    }
}