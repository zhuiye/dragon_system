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
const getRouteMap = (pathCount: number, groupRank: number) => {
  const routeMap = new Map();
  const innerFourMap = new Map();
  innerFourMap.set(3, 1);
  innerFourMap.set(1, 2);
  innerFourMap.set(2, 3);
  innerFourMap.set(4, 4);

  routeMap.set(4, innerFourMap);

  const innerSixMap = new Map();

  innerSixMap.set(5, 1);
  innerSixMap.set(3, 2);
  innerSixMap.set(1, 3);
  innerSixMap.set(2, 4);
  innerSixMap.set(4, 5);
  innerSixMap.set(6, 6);

  routeMap.set(6, innerSixMap);

  const innerEightMap = new Map();

  innerEightMap.set(7, 1);
  innerEightMap.set(5, 2);
  innerEightMap.set(3, 3);
  innerEightMap.set(1, 4);
  innerEightMap.set(2, 5);
  innerEightMap.set(4, 6);
  innerEightMap.set(6, 7);
  innerEightMap.set(7, 8);

  routeMap.set(8, innerEightMap);

  return routeMap.get(pathCount).get(groupRank);

  // if()
};

function randomAssign(data: any[], m: number, n: number, race_track_number: number) {
  // 随机打乱队伍的顺序
  const shuffledData = data.sort(() => Math.random() - 0.5);
  const result = [];
  let assignedCount = 0;
  for (let i = 0; i < n; i++) {
    const assignedData = shuffledData.slice(assignedCount, assignedCount + m);
    if (assignedData.length < m) {
      break;
    }
    assignedCount += assignedData.length;
    const group = {
      group_number: i,
      data: assignedData.map((item) => ({
        team_name: item.team_name,
        team_id: item.team_id,
        path: Math.floor(Math.random() * race_track_number) + 1,
      })),
    };
    result.push(group);
  }
  return result;
}

export { getRouteMap, randomAssign };
export default generateSnakeGroup;
