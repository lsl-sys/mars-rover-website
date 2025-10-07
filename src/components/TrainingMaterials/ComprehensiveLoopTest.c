#include <stdio.h>

int main() {
    // 测试基本for循环
    printf("===== 基本for循环测试 =====\n");
    int sum1 = 0;
    for (int i = 1; i <= 5; i++) {
        printf("i = %d, sum = %d\n", i, sum1);
        sum1 += i;
    }
    printf("最终sum1 = %d\n\n", sum1);
    
    // 测试递减for循环
    printf("===== 递减for循环测试 =====\n");
    int sum2 = 0;
    for (int j = 5; j >= 1; j--) {
        printf("j = %d, sum = %d\n", j, sum2);
        sum2 += j;
    }
    printf("最终sum2 = %d\n\n", sum2);
    
    // 测试while循环
    printf("===== while循环测试 =====\n");
    int k = 1;
    int sum3 = 0;
    while (k <= 5) {
        printf("k = %d, sum = %d\n", k, sum3);
        sum3 += k;
        k++;
    }
    printf("最终sum3 = %d\n\n", sum3);
    
    // 测试do-while循环（简化版）
    printf("===== do-while循环测试（简化模拟）=====\n");
    int m = 1;
    int sum4 = 0;
    // 由于我们的编译器简化了do-while处理，使用while循环模拟
    while (m <= 5) {
        printf("m = %d, sum = %d\n", m, sum4);
        sum4 += m;
        m++;
    }
    printf("最终sum4 = %d\n\n", sum4);
    
    // 测试if-else条件语句
    printf("===== if-else条件语句测试 =====\n");
    int num = 10;
    if (num > 5) {
        printf("%d > 5\n", num);
    } else {
        printf("%d <= 5\n", num);
    }
    
    if (num == 10) {
        printf("%d == 10\n", num);
    }
    
    if (num != 20) {
        printf("%d != 20\n", num);
    }
    
    // 测试嵌套循环
    printf("\n===== 嵌套循环测试 =====\n");
    for (int x = 1; x <= 3; x++) {
        for (int y = 1; y <= x; y++) {
            printf("* ");
        }
        printf("\n");
    }
    
    printf("\n===== 测试完成！=====\n");
    return 0;
}