package kr.hs.dgsw.webclass01;

import org.springframework.stereotype.Service;

@Service
public class CalculatorServicelmpl implements CalculatorService {
    @Override
    public int calculator(int a, int b, int type) {
        int result = 0;

        switch(type) {  // 더하기는 1, 빼기 2, 곱하기 3, 나누기는 4로 정하여 문자열을 사용하지 않고 간단하게 사용했다.
            case 1:
                result = a + b;
                break;
            case 2:
                result = a - b;
                break;
            case 3:
                result = a * b;
                break;
            case 4:
                if (b != 0) result = a / b;
                break;
        }

        return result;
    }
}
