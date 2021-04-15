const content = `
  题目：请实现一个函数，输入一个整数（以二进制串形式），输出该数二进制表示中 1 的个数。例如，把 9 表示成二进制是 1001，有 2 位是 1。因此，如果输入 9，则该函数输出 2。
  难度: easy

  第一次解题：
  var hammingWeight = function(n) {
    let savings = n.toString(2);
    let result = savings.replace(/0/g, '');
    return result.length;
  };
`
function Offer15() {
  return (
    <pre className="Offer15">
      {content}
    </pre>
  );
}

export default Offer15;