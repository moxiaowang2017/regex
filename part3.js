// 正则表达式括号的作用
// 重点：
/**
 * 1.括号是提供分组功能，使量词+作用于“ab”这个整体
 * 2.多选分支结构(p1|p2)中，提供了子表达式的所有可能
 * 3.?:表示匹配且获取，?=表示匹配但不获取
 */

// 1.分组和分支结构
// 1.1分组
/**
 * 括号是提供分组功能，使量词+作用于“ab”这个整体
 */
{
    var regex = /(ab)+/g;
    var string = "ababa abbb ababab";
    console.log(string.match(regex));
    // => ["abab", "ab", "ababab"]

}
// 1.2分支结构
/**
 * 多选分支结构(p1|p2)中，提供了子表达式的所有可能
 */
{
    var regex = /^I love (JavaScript|Regular Expression)$/;
    console.log(regex.test("I love JavaScript"));
    console.log(regex.test("I love Regular Expression"));
    // => true
    // => true
}
// 2.引用分组
// 2.1 提取数据
/**
 * match返回的一个数组，第一个元素是整体匹配结果，然后是各个分组（括号里）匹配的内容，然后是匹配下标，最后是输入的文本
 */
{
    var regex = /(\d{4})-(\d{2})-(\d{2})/;
    var string = "2017-06-12";
    console.log(string.match(regex));
    // => ["2017-06-12", "2017", "06", "12", index: 0, input: "2017-06-12"]
    // 注：如果正则是否有修饰符g，match返回的数组格式是不一样的
}
// 使用正则对象的exec方法
{
    var regex = /(\d{4})-(\d{2})-(\d{2})/;
    var string = "2017-06-12";
    console.log(regex.exec(string));
    // => ["2017-06-12", "2017", "06", "12", index: 0, input: "2017-06-12"]

}
// 可以使用构造函数的全局属性$1至$9来获取
{
    var regex = /(\d{4})-(\d{2})-(\d{2})/;
    var string = "2017-06-12";

    regex.test(string); // 正则操作即可，例如
    //regex.exec(string);
    //string.match(regex);

    console.log(RegExp.$1); // "2017"
    console.log(RegExp.$2); // "06"
    console.log(RegExp.$3); // "12"

}
// 2.2 替换
{
    // 把yyyy-mm-dd格式，替换成mm/dd/yyyy
    var regex = /(\d{4})-(\d{2})-(\d{2})/;
    var string = "2017-06-12";
    var result = string.replace(regex, "$2/$3/$1");
    console.log(result);
    // => "06/12/2017"

}
// 其中replace中的，第二个参数里用$1、$2、$3指代相应的分组
{
    var regex = /(\d{4})-(\d{2})-(\d{2})/;
    var string = "2017-06-12";
    var result = string.replace(regex, function () {
        return RegExp.$2 + "/" + RegExp.$3 + "/" + RegExp.$1;
    });
    console.log(result);
    // => "06/12/2017"

}
// 也等价于
{
    var regex = /(\d{4})-(\d{2})-(\d{2})/;
    var string = "2017-06-12";
    var result = string.replace(regex, function (match, year, month, day) {
        return month + "/" + day + "/" + year;
    });
    console.log(result);
    // => "06/12/2017"
}

// 3.反向引用
{
    /**
     * 分析：
     * 里面的\1，表示的引用之前的那个分组(-|\/|\.)
     */
    var regex = /\d{4}(-|\/|\.)\d{2}\1\d{2}/;
    var string1 = "2017-06-12";
    var string2 = "2017/06/12";
    var string3 = "2017.06.12";
    var string4 = "2016-06/12";
    console.log(regex.test(string1)); // true
    console.log(regex.test(string2)); // true
    console.log(regex.test(string3)); // true
    console.log(regex.test(string4)); // false

}
// 3.1 括号嵌套
/**
 * 第一个字符是数字，比如说1，
 * 第二个字符是数字，比如说2，
 * 第三个字符是数字，比如说3，
 * 接下来的是\1，是第一个分组内容，那么看第一个开括号对应的分组是什么，是123，
 * 接下来的是\2，找到第2个开括号，对应的分组，匹配的内容是1，
 * 接下来的是\3，找到第3个开括号，对应的分组，匹配的内容是23，
 * 最后的是\4，找到第3个开括号，对应的分组，匹配的内容是3。
 */
{
    var regex = /^((\d)(\d(\d)))\1\2\3\4$/;
    var string = "1231231233";
    console.log(regex.test(string)); // true
    console.log(RegExp.$1); // 123
    console.log(RegExp.$2); // 1
    console.log(RegExp.$3); // 23
    console.log(RegExp.$4); // 3

}

// 3.2 \10表示什么
/**
 * \10是表示第10个分组
 */
{
    var regex = /(1)(2)(3)(4)(5)(6)(7)(8)(9)(#) \10+/;
    var string = "123456789# ######"
    console.log(regex.test(string));
    // => true
}
// 3.3 引用不存在的分组会怎样？
/**
 * 因为反向引用，是引用前面的分组，但我们在正则里引用了不存在的分组时，此时正则不会报错，只是匹配反向引用的字符本身。
 * 例如\2，就匹配"\2"。注意"\2"表示对"2"进行了转意
 */
{
    var regex = /\1\2\3\4\5\6\7\8\9/;
    console.log(regex.test("\1\2\3\4\5\6\7\8\9"));
    console.log("\1\2\3\4\5\6\7\8\9".split(""));

}

// 4. 非捕获分组(?:p)
{
    var regex = /(?:ab)+/g;
    var string = "ababa abbb ababab";
    console.log(string.match(regex));
    // => ["abab", "ab", "ababab"]

}
// 5.相关案例
// 5.1 字符串trim方法模拟
// 第一种，匹配到开头和结尾的空白符，然后替换成空字符
{
    function trim(str) {
        return str.replace(/^\s+|\s+$/g, '');
    }
    console.log(trim("  foobar   "));
    // => "foobar"
}
// 第二种，匹配整个字符串，然后用引用来提取出相应的数据
{
    // 这里使用了惰性匹配*?，不然也会匹配最后一个空格之前的所有空格的
    function trim(str) {
        return str.replace(/^\s*(.*?)\s*$/g, "$1");
    }
    console.log(trim("  foobar   "));
    // => "foobar"

}
// 5.2 将每个单词的首字母转换为大写
{
    function titleize(str) {
        // ?:表示匹配且获取，?=表示匹配但不获取
        return str.toLowerCase().replace(/(?:^|\s)\w/g, function (c) {
            return c.toUpperCase();
        });
    }
    console.log(titleize('my name is epeli'));
    // => "My Name Is Epeli"

}

// 5.3 驼峰化
/**
 * 其中分组(.)表示首字母。
 * 单词的界定是，前面的字符可以是多个连字符、下划线以及空白符。
 * 正则后面的?的目的，是为了应对str尾部的字符可能不是单词字符，
 * 比如str是'-moz-transform'
 */
{
    function camelize(str) {
        return str.replace(/[-_\s]+(.)?/g, function (match, c) {
            console.info(c)
            return c ? c.toUpperCase() : '';
        });
    }
    console.log(camelize('-moz-\ntransform'));
    // => "MozTransform"

}

// 5.4 中划线化
{
    function dasherize(str) {
        return str.replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
    }
    console.log(dasherize('MozTransform'));
    // => "-moz-transform"

}

// 5.5 html转义和反转义
{
    // 将HTML特殊字符转换成等值的实体
    function escapeHTML(str) {
        var escapeChars = {
            '¢': 'cent',
            '£': 'pound',
            '¥': 'yen',
            '€': 'euro',
            '©': 'copy',
            '®': 'reg',
            '<': 'lt',
            '>': 'gt',
            '"': 'quot',
            '&': 'amp',
            '\'': '#39'
        };
        console.info('RegExp', new RegExp('[' + Object.keys(escapeChars).join('') + ']', 'g'))
        return str.replace(new RegExp('[' + Object.keys(escapeChars).join('') + ']', 'g'), function (match) {
            return '&' + escapeChars[match] + ';';
        });
    }
    console.log(escapeHTML('<div>Blah blah blah</div>'));
    // => "&lt;div&gt;Blah blah blah&lt;/div&gt";

}
// 反转译
{
    // 实体字符转换为等值的HTML。
    function unescapeHTML(str) {
        var htmlEntities = {
            nbsp: ' ',
            cent: '¢',
            pound: '£',
            yen: '¥',
            euro: '€',
            copy: '©',
            reg: '®',
            lt: '<',
            gt: '>',
            quot: '"',
            amp: '&',
            apos: '\''
        };
        return str.replace(/\&([^;]+);/g, function (match, key) {
            if (key in htmlEntities) {
                return htmlEntities[key];
            }
            return match;
        });
    }
    console.log(unescapeHTML('&lt;div&gt;Blah blah blah&lt;/div&gt;'));
    // => "<div>Blah blah blah</div>"

}

// 5.6 匹配成对标签
/**
 * 分析:
 * 1.匹配一个开标签，可以使用正则<[^>]+>，
 * 2.匹配一个闭标签，可以使用<\/[^>]+>，
 */
{
    var regex = /<([^>]+)>[\d\D]*<\/\1>/;
    var string1 = "<title>regular expression</title>";
    var string2 = "<p>laoyao bye bye</p>";
    var string3 = "<title>wrong!</p>";
    console.log(regex.test(string1)); // true
    console.log(regex.test(string2)); // true
    console.log(regex.test(string3)); // false

}
