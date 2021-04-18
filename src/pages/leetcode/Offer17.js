const content = `
  题目：输入数字 n，按顺序打印出从 1 到最大的 n 位十进制数。比如输入 3，则打印出 1、2、3 一直到最大的 3 位数 999。
  难度: easy

  第一次解题：
  var printNumbers = function (n) {
    if (n === 0) return [];
    let result = [];
    let max = Math.pow(10, n);
    for (let i = 1; i < max; i++) {
      result.push(i)
    }
    return result;
  };
`

function Offer17() {
  return (
    <pre className="Offer17">
      {content}
    </pre>
  );
}

export default Offer17;