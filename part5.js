// 正则表达式的拆分
// 1.结构和操作符
/**
 * 结构：字符字面量、字符组、量词、锚字符、分组、选择分支、反向引用。
 * 
 * 字面量，匹配一个具体字符，包括不用转义的和需要转义的。比如a匹配字符"a"，又比如\n匹配换行符，又比如\.匹配小数点。
 * 字符组，匹配一个字符，可以是多种可能之一，比如[0-9]，表示匹配一个数字。也有\d的简写形式。另外还有反义字符组，表示可以是除了特定字符之外任何一个字符，比如[^0-9]，表示一个非数字字符，也有\D的简写形式。
 * 量词，表示一个字符连续出现，比如a{1,3}表示“a”字符连续出现3次。另外还有常见的简写形式，比如a+表示“a”字符连续出现至少一次。
 * 锚点，匹配一个位置，而不是字符。比如^匹配字符串的开头，又比如\b匹配单词边界，又比如(?=\d)表示数字前面的位置。
 * 分组，用括号表示一个整体，比如(ab)+，表示"ab"两个字符连续出现多次，也可以使用非捕获分组(?:ab)+。
 * 分支，多个子表达式多选一，比如abc|bcd，表达式匹配"abc"或者"bcd"字符子串。
 * 反向引用，比如\2，表示引用第2个分组。
 * 
 * 操作符：优先级从上至下，由高到低
 * 
 * 1.转义符 \
 * 2.括号和方括号 (...)、(?:...)、(?=...)、(?!...)、[...]
 * 3.量词限定符 {m}、{m,n}、{m,}、?、*、+
 * 4.位置和序列 ^ 、$、 \元字符、 一般字符
 * 5. 管道符（竖杠）|
 */

//  2.注意点
//  2.1 匹配字符串整体问题 如：/^abc|bcd$/,/^(abc|bcd)$
//  2.2 量词连缀问题  错：/^[abc]{3}+$/  对：/^([abc]{3})+$/
//  2.3 元字符转义问题
/**
 * ^ $ . * + ? | \ / ( ) [ ] { } = ! : - ,
 */
{
    // 可以一律转义
    var string = "^$.*+?|\\/[]{}=!:-,";
    var regex = /\^\$\.\*\+\?\|\\\/\[\]\{\}\=\!\:\-\,/;
    console.log(regex.test(string));
    // => true

}
// 2.3.1 字符组中的元字符  []、^、-
{
    var string = "^$.*+?|\\/[]{}=!:-,";
    var regex = /[\^$.*+?|\\/\[\]{}=!:\-,]/g;
    console.log(string.match(regex));
    // => ["^", "$", ".", "*", "+", "?", "|", "\", "/", "[", "]", "{", "}", "=", "!", ":", "-", ","]

}

// 2.3.2 匹配“[abc]”和“{3,5}”
/**
 * 只需要在第一个方括号转义即可，因为后面的方括号构不成字符组，正则不会引发歧义，自然不需要转义
 * 同理，要匹配字符串"{3,5}"，只需要把正则写成/\{3,5}/即可。
 */
{
    var string = "[abc]";
    var regex = /\[abc]/g;
    console.log(string.match(regex)[0]);
    // => "[abc]"

}
// 同理，要匹配字符串"{3,5}"，只需要把正则写成/\{3,5}/即可。
{
    var string = "{,3}";
    var regex = /{,3}/g;
    console.log(string.match(regex)[0]);
    // => "{,3}"

}
// 2.3.3 其余情况
/**
 * 1.比如= ! : - ,等符号，只要不在特殊结构中，也不需要转义
 * 2.括号需要前后都转义的，如/\(123\)/
 * 3.至于剩下的^ $ . * + ? | \ /等字符，只要不在字符组内，都需要转义的
 */

//  3.案例分析
//  3.1 身份证
/**
 * 因为竖杠“|”,的优先级最低，所以正则分成了两部分\d{15}和\d{17}[\dxX]
 */
{
    var string = "33032619980812612X";
    var regex = /^(\d{15}|\d{17}[\dxX])$/;
    console.log(regex.test(string));
    // => true

}

// 3.2 IPV4地址
/**
 * 分析：
 * 1.((...)\.){3}(...)
 * 2. 0{0,2}\d，匹配一位数，包括0补齐的。比如，9、09、009；
 *    0?\d{2}，匹配两位数，包括0补齐的，也包括一位数；
 *    1\d{2}，匹配100到199;
 *    2[0-4]\d，匹配200-249；
 *    25[0-5]，匹配250-255
 */
{
    var string = "123.134.235.234";
    var regex = /^((0{0,2}\d|0?\d{2}|1\d{2}|2[0-4]\d|25[0-5])\.){3}(0{0,2}\d|0?\d{2}|1\d{2}|2[0-4]\d|25[0-5])$/;
    console.log(regex.test(string));
    // => true
}