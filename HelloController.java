package kr.hs.dgsw.webclass01;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/calRequest")
    public String CalculatorRequest(@RequestParam final int A, @RequestParam final int B, @RequestParam final int type) {
        return calculator(A, B, type);
    }

    @GetMapping("/calPath/{A}/{B}/{type}")
    public String CalculatorPath(@PathVariable final int A, @PathVariable final int B, @PathVariable final int type) {
        return calculator(A,B,type);
    }

    public String calculator(int A, int B, int type) {
        if (type == 1) {
            return "" + A + "+" + B + "=" + (A+B);
        }
        else if (type == 2) {
            return "" + A + "-" + B + "=" + (A-B);
        }
        else if (type == 3) {
            return "" + A + "*" + B + "=" + (A*B);
        }
        else if (type == 4) {
            if (B != 0) {
                float fA = Float.valueOf(A);
                float fB = Float.valueOf(B);
                return "" + A + "/" + B + "=" + (fA/fB);
            }
        }
        return "Error! type or A or B is Invalid!" + A + "," + B + "," + type;
    }
}