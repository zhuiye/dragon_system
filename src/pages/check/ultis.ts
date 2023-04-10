function checkDate(date: number): number {
  const now = new Date().getTime(); // 获取当前时间的时间戳

  if (now + 30 * 60 * 1000 < date) {
    return 0;
  } else if (now + 30 * 60 * 1000 >= date && now < date - 15 * 60 * 1000) {
    return 1;
  } else {
    return 2;
  }
}

export { checkDate };
