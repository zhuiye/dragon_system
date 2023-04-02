function generateFirstGroup(arr: any, groupNumber: any) {
  let index = 0;

  let group = [];
  let flag = true;

  while (index < arr.length) {
    group.push(arr[index]);
    index = flag ? index + (groupNumber * 2 - 1) : index + 1;
    flag = !flag;
  }

  return group;
}
function generateSnakeGroup(arr: any, groupNumber: any) {
  // 处理原始数据，补成 groupNumber 和 arr 的倍数
  const max = arr.at(-1);
  let copy = max;
  while (copy % groupNumber != 0) {
    arr.push(++copy);
  }

  let res = [];
  let temp = [];
  let currentGroup = 1;
  let last = generateFirstGroup(arr, groupNumber);
  res.push(last);
  // 上一位数的概念?
  while (currentGroup < groupNumber) {
    for (let i = 0; i < last.length; i++) {
      if (i % 2 === 0) {
        temp.push(last[i] + 1);
      } else {
        temp.push(last[i] - 1);
      }
    }

    res.push(temp);
    // 重置
    last = temp.slice();

    temp = [];
    currentGroup++;
  }
  // 过滤掉大于
  return res.map((item) => item.filter((item) => item <= max));
}

/** 赛道匹配算法 */
function routeMatchGrade() {
  const routeMap = new Map();
  routeMap.set(4, [
    { routeNo: 1, rank: 3 },
    { routeNo: 2, rank: 1 },
    { routeNo: 3, rank: 2 },
    { routeNo: 4, rank: 4 },
  ]);
  routeMap.set(6, [
    { routeNo: 1, rank: 5 },
    { routeNo: 2, rank: 3 },
    { routeNo: 3, rank: 1 },
    { routeNo: 4, rank: 2 },
    { routeNo: 5, rank: 4 },
    { routeNo: 6, rank: 6 },
  ]);
  routeMap.set(8, [
    { routeNo: 1, rank: 7 },
    { routeNo: 2, rank: 5 },
    { routeNo: 3, rank: 3 },
    { routeNo: 4, rank: 1 },
    { routeNo: 5, rank: 2 },
    { routeNo: 6, rank: 4 },
    { routeNo: 7, rank: 6 },
    { routeNo: 8, rank: 8 },
  ]);

  return routeMap;

  // if()
}

export default generateSnakeGroup;
