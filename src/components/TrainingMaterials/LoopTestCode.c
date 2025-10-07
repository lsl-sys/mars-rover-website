// 循环和选择语句测试
#include <stdio.h>

int main() {
    int i, sum = 0;
    
    // 测试for循环
    printf("for循环测试：\n");
    for (i = 1; i <= 5; i++) {
        printf("i = %d\n", i);
        sum += i;
    }
    printf("sum = %d\n\n", sum);
    
    // 测试while循环
    printf("while循环测试：\n");
    i = 1;
    sum = 0;
    while (i <= 5) {
        printf("i = %d\n", i);
        sum += i;
        i++;
    }
    printf("sum = %d\n\n", sum);
    
    // 测试if语句
    printf("if语句测试：\n");
    int number = 10;
    if (number > 5) {
        printf("%d > 5\n", number);
    } else {
        printf("%d <= 5\n", number);
    }
    
    if (number == 10) {
        printf("%d == 10\n", number);
    }
    
    if (number != 20) {
        printf("%d != 20\n", number);
    }
    
    return 0;
}