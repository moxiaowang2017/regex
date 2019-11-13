// 正则表达式位置匹配攻略
// 重点：
/**
 * 1.什么是位置：位置是相邻字符之间的位置
 * 2.字符字典：
 *   ^（脱字符）匹配开头，在多行匹配中匹配行开头。
 *   $（美元符号）匹配结尾，在多行匹配中匹配行结尾。
 * 
 *   \b是单词边界，具体就是\w和\W之间的位置，也包括\w和^之间的位置，也包括\w和$之间的位置
 *   \B就是\b的反面的意思，非单词边界
 * 
 *   (?=p)，其中p是一个子模式，即p前面的位置
 *   (?!p)就是(?=p)的反面意思
 */


// 1.什么是位置：位置是相邻字符之间的位置
// 2.如何匹配位置
// 2.1 ^和$
/**
 * ^（脱字符）匹配开头，在多行匹配中匹配行开头。
   $（美元符号）匹配结尾，在多行匹配中匹配行结尾。
 */
{
    // 注：把字符串的开头和结尾用"#"替换
    var result = "hello".replace(/^|$/g, '#');
    console.log(result);
    // => "#hello#"
}

{
    // 多行匹配模式时，二者是行的概念
    var result = "I\nlove\njavascript".replace(/^|$/gm, '#');
    console.log(result);
    /*
    #I#
    #love#
    #javascript#
    */

}

// 2.2 \b和\B
/**
 * \b是单词边界，具体就是\w和\W之间的位置，也包括\w和^之间的位置，也包括\w和$之间的位置
 * \B就是\b的反面的意思，非单词边界
 */
{
    /**
     * 分析：
     * 第一个"#"，两边是"["与"J"，是\W和\w之间的位置。
     * 第二个"#"，两边是"S"与"]"，也就是\w和\W之间的位置。
     * 第三个"#"，两边是空格与"L"，也就是\W和\w之间的位置。
     * 第四个"#"，两边是"1"与"."，也就是\w和\W之间的位置。
     * 第五个"#"，两边是"."与"m"，也就是\W和\w之间的位置。
     * 第六个"#"，其对应的位置是结尾，但其前面的字符"4"是\w，即\w和$之间的位置
     */
    var result = "[JS] Lesson_01.mp4".replace(/\b/g, '#');
    console.log(result);
    // => "[#JS#] #Lesson_01#.#mp4#"

}
{
    var result = "[JS] Lesson_01.mp4".replace(/\B/g, '#');
    console.log(result);
    // => "#[J#S]# L#e#s#s#o#n#_#0#1.m#p#4"

}
// 2.3 (?=p)和(?!p)
/**
 * (?=p)，其中p是一个子模式，即p前面的位置
 * (?!p)就是(?=p)的反面意思
 */
{
    // (?=l)，表示'l'字符前面的位置
    var result = "hello".replace(/(?=l)/g, '#');
    console.log(result);
    // => "he#l#lo"
}

{
    var result = "hello".replace(/(?!l)/g, '#');
    console.log(result);
    // => "#h#ell#o#"

}

// 3.位置的特性
/**
 * 对于位置的理解，我们可以理解成空字符""
 * 如："hello" == "" + "h" + "" + "e" + "" + "l" + "" + "l" + "o" + "";
 */
{
    var result = /^^hello$$$/.test("hello");
    console.log(result);
    // => true

}
{
    var result = /(?=he)^^he(?=\w)llo$\b\b$/.test("hello");
    console.log(result);
    // => true

}

// ==============================应用=========================
// 4.相关案例
// 4.1 不匹配任何东西的正则 /.^/
// 4.2 数字的千位分隔符表示法
// 第一步 弄出最后一个逗号
{
    var result = "12345678".replace(/(?=\d{3}$)/g, ',')
    console.log(result);
    // => "12345,678"

}
// 第二步 弄出所有的逗号 要求后面3个数字一组，也就是\d{3}至少出现一次
{
    var result = "12345678".replace(/(?=(\d{3})+$)/g, ',')
    console.log(result);
    // => "12,345,678"

}
// 第三步 发现问题（一但是3的倍数，就把其前面的位置替换成逗号）
{
    var result = "123456789".replace(/(?=(\d{3})+$)/g, ',')
    console.log(result);
    // => ",123,456,789"

}
// 第四步 修正
/**
 * 分析：
 * 要求匹配的到这个位置不能是开头
 */
{
    var string1 = "12345678",
        string2 = "123456789";
    reg = /(?!^)(?=(\d{3})+$)/g;

    var result = string1.replace(reg, ',')
    console.log(result);
    // => "12,345,678"

    result = string2.replace(reg, ',');
    console.log(result);
    // => "123,456,789"

}
// 第5步 支持其他形式 如：把"12345678 123456789"替换成"12,345,678 123,456,789"
{
    var string = "12345678 123456789",
        reg = /(?!\b)(?=(\d{3})+\b)/g;
    // 或 (?!\b)说的就是\B  =》 /\B(?=(\d{3})+\b)/g   
    var result = string.replace(reg, ',')
    console.log(result);
    // => "12,345,678 123,456,789"

}
// 4.3 验证密码问题(密码长度6-12位，由数字、小写字符和大写字母组成，但必须至少包括2种字符)
// 第一步 不考虑“必须至少包括2种字符”
{
    var reg = /^[0-9A-Za-z]{6,12}$/;

}
// 第二步  判断是否包含有某一种字符
/**
 * 1. (?=.*[0-9])^ = (?=.*[0-9])和^
 * 2. 表示开头前面还有个位置
 * 3. (?=.*[0-9])表示该位置后面的字符匹配.*[0-9]
 * 4. 接下来的字符，必须包含个数字
 */
{
    // 必须包含数字
    var reg = /(?=.*[0-9])^[0-9A-Za-z]{6,12}$/;

}
// 第三步 同时包含具体两种字符
{
    // 同时包含数字和小写字母，可以用(?=.*[0-9])(?=.*[a-z])来做
    var reg = /(?=.*[0-9])(?=.*[a-z])^[0-9A-Za-z]{6,12}$/;

}
// 第四步
/**
 * 同时包含数字和小写字母
   同时包含数字和大写字母
   同时包含小写字母和大写字母
   同时包含数字、小写字母和大写字母
 */
{
    var reg = /((?=.*[0-9])(?=.*[a-z])|(?=.*[0-9])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z]))^[0-9A-Za-z]{6,12}$/;
    console.log(reg.test("1234567")); // false 全是数字
    console.log(reg.test("abcdef")); // false 全是小写字母
    console.log(reg.test("ABCDEFGH")); // false 全是大写字母
    console.log(reg.test("ab23C")); // false 不足6位
    console.log(reg.test("ABCDEF234")); // true 大写字母和数字
    console.log(reg.test("abcdEF234")); // true 三者都有

}
// 另一种解法
/**
 * 分析
 * 不能全部都是数字，
 * 也不能全部都是小写字母，
 * 也不能全部都是大写字母
 */
{
    var reg = /(?!^[0-9]{6,12}$)(?!^[a-z]{6,12}$)(?!^[A-Z]{6,12}$)^[0-9A-Za-z]{6,12}$/;
    console.log(reg.test("1234567")); // false 全是数字
    console.log(reg.test("abcdef")); // false 全是小写字母
    console.log(reg.test("ABCDEFGH")); // false 全是大写字母
    console.log(reg.test("ab23C")); // false 不足6位
    console.log(reg.test("ABCDEF234")); // true 大写字母和数字
    console.log(reg.test("abcdEF234")); // true 三者都有

}