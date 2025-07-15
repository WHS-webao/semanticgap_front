export function buildTree(pages) {
  // 1) ‘home’ 제거 & segments 분리 helper
  const normalize = path => {
    const segs = path.split('/').filter(Boolean);
    if (segs[0]?.toLowerCase() === 'home') segs.shift();
    return segs;
  };

  // 2) 중분류 소개 키(대/중 조합) 집합 생성
  const midIntros = new Set();
  pages.forEach(({ path }) => {
    const segs = normalize(path);
    if (segs.length === 3) {
      // [대, 중, 소] 가 있으면, 해당 [대/중] 조합의 ‘소개용’ 페이지가 있을 수 있음
      midIntros.add(`${segs[0]}/${segs[1]}`);
    }
  });

  // 3) 실제 그룹핑 시작
  const tree = {};
  pages.forEach(({ path, title }) => {
    const segs = normalize(path);

    // 대→중→소 구조
    if (segs.length === 3) {
      const [main, mid] = segs;
      if (!tree[main]) tree[main] = {};
      if (!tree[main][mid]) tree[main][mid] = [];
      tree[main][mid].push({ subTitle: title, subPath: path });
    }
    // 대→소 구조 (segments.length===2)
    else if (segs.length === 2) {
      const [main, second] = segs;
      // “소개용 중분류” 조합인지 체크
      if (midIntros.has(`${main}/${second}`)) {
        // 중분류 소개용 페이지는 여기서 무시(그대로 header 링크로만 쓰임)
        return;
      }
      // 진짜 소분류니까 _default 그룹으로
      if (!tree[main]) tree[main] = {};
      if (!tree[main]._default) tree[main]._default = [];
      tree[main]._default.push({ subTitle: second, subPath: path });
    }
    // 그 외(segments 길이 <2 이거나 >3) 전부 무시
  });

  return tree;
}