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

function randomAssign(data: any, group_count: any, len: any, race_track_number: any) {
  // 首先将 data 按照随机顺序排序
  const shuffledData = shuffle(data);

  // 计算每组最少需要的队伍数
  const minTeamCount = Math.floor(shuffledData.length / group_count);

  // 如果最少需要的队伍数小于 len，则将 len 设置为 minTeamCount
  if (minTeamCount < len) {
    len = minTeamCount;
  }

  // 将队伍分成 group_count 组
  const groups = [];
  for (let i = 0; i < group_count; i++) {
    groups.push({
      group_number: i,
      data: [],
    });
  }

  // 依次将队伍添加到组中
  for (let i = 0; i < shuffledData.length; i++) {
    const team = shuffledData[i];
    let added = false;
    for (let j = 0; j < groups.length; j++) {
      const group = groups[j];
      // 如果该组还没有达到最少需要的队伍数，则将该队伍添加到该组
      if (group.data.length < len) {
        group.data.push(assignPath(team, group.data, race_track_number));
        added = true;
        break;
      }
    }
    // 如果没有找到可以添加的组，则将该队伍添加到随机的一组中
    if (!added) {
      const randomIndex = Math.floor(Math.random() * groups.length);
      groups[randomIndex].data.push(assignPath(team, groups[randomIndex].data, race_track_number));
    }
  }

  return groups;
}

// 用于将数组随机排序的函数
function shuffle(array: string | any[]) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// 用于为队伍分配 path 的函数
function assignPath(team: any, data: any, race_track_number: any): any {
  const usedPaths = data.map((item: { path: any }) => item.path);
  let path;
  do {
    path = Math.floor(Math.random() * race_track_number) + 1;
  } while (usedPaths.includes(path));
  return {
    team_name: team.team_name,
    team_id: team.team_id,
    path: path,
  };
}

/**处理分道 */
const getItemByRank = (rank: number | any, data: any[]) => {
  for (const item of data) {
    if (item.no === rank) {
      return item;
    }
  }
  return [];
};

const assignMapWithPath = (data: any[], pathCount: number, groupCount: number) => {
  const count = pathCount * groupCount;
  const model = [];
  for (let i = 1; i <= count; i++) {
    model.push(i);
  }
  const groups = generateSnakeGroup(model, groupCount);
  const newData = groups.map((items, index) => {
    return items.map((rank) => {
      return getItemByRank(rank, data);
    });
  });
  // 组内排名

  const mapGroupInnerRank = newData.map((group) => {
    return group
      .sort((a, b) => a.score - b.score)
      .map((item, index) => {
        return {
          groupInnerRank: index + 1,
          ...item,
        };
      });
  });

  const mapWithPath = mapGroupInnerRank.map((group) => {
    return group.map((item) => {
      return {
        ...item,
        path: getRouteMap(pathCount, item.groupInnerRank),
      };
    });
  });

  mapWithPath.forEach((item) => {
    item.sort((a: any, b: any) => a.path - b.path);
  });

  return mapWithPath;
};

export { getRouteMap, randomAssign, assignMapWithPath };
export default generateSnakeGroup;
