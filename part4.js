// 正则表达式回溯法原理
// 1.什么是回溯
/**
 * 简单定义：退到之前的某一步这一过程，我们称为“回溯”
 * 发生场景：尝试匹配失败时，接下来的一步通常就是回溯。
 * 
 * 从问题的某一种状态（初始状态）出发，
 * 搜索从这种状态出发所能达到的所有“状态”，
 * 当一条路走到“尽头”的时候（不能再前进），
 * 再后退一步或若干步，从另一种可能“状态”出发，
 * 继续搜索，直到所有的“路径”（状态）都试探过。
 * 这种不断“前进”、不断“回溯”寻找解的方法，就称作“回溯法”
 */
// 2.常见的回溯形式
/**
 * 1.贪婪量词“试”的策略是：买衣服砍价。价钱太高了，便宜点，不行，再便宜点。
 * 2.惰性量词“试”的策略是：卖东西加价。给少了，再多给点行不，还有点少啊，再给点。
 * 3.分支结构“试”的策略是：货比三家。这家不行，换一家吧，还不行，再换。
 */
// 2.1 贪婪量词 如：b{1,3}
{
    var string = "12345";
    var regex = /(\d{1,3})(\d{1,3})/;
    console.log(string.match(regex));
    // => ["12345", "123", "45", index: 0, input: "12345"]

}
// 2.2 惰性量词 (惰性量词就是在贪婪量词后面加个问号)
{
    var string = "12345";
    var regex = /(\d{1,3}?)(\d{1,3})/;
    console.log(string.match(regex));
    // => ["1234", "1", "234", index: 0, input: "12345"]

}
// 2.3 分支结构
/**
 * 分支结构，可能前面的子模式会形成了局部匹配，如果接下来表达式整体不匹配时，仍会继续尝试剩下的分支。这种尝试也可以看成一种回溯。
 */
{
    var string = "candy";
    var regex = /can|candy/;
    console.log(string.match(regex));
    // => [ 'can', index: 0, input: 'candy' ]
}

