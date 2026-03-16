document.addEventListener('DOMContentLoaded', () => {
  // 공통 별 파티클 헬퍼 (버튼/링크 클릭 시 사용)
  const prefersReducedStars = window.matchMedia('(prefers-reduced-motion: reduce)');
  function spawnStars(x, y){
    if (prefersReducedStars.matches) return;
    const container = document.body;
    const count = 26;
    for (let i = 0; i < count; i++){
      const star = document.createElement('span');
      star.className = 'star-particle';
      const angle = (Math.PI * 2 * i) / count;
      const radius = 60 + Math.random() * 28;
      const dx = Math.cos(angle) * radius;
      const dy = Math.sin(angle) * radius;
      star.style.left = x + 'px';
      star.style.top = y + 'px';
      star.style.setProperty('--dx', dx + 'px');
      star.style.setProperty('--dy', dy + 'px');
      container.appendChild(star);
      setTimeout(() => star.remove(), 700);
    }
  }
  // GNB 모바일 드롭다운
  const btn  = document.querySelector('.gnb__toggle');
  const drop = document.querySelector('#gnb-dropdown');

  if (btn && drop) {
    const close = () => {
      btn.setAttribute('aria-expanded', 'false');
      drop.classList.remove('show');
      drop.setAttribute('aria-hidden','true');
    };
    const open = () => {
      btn.setAttribute('aria-expanded', 'true');
      drop.classList.add('show');
      drop.setAttribute('aria-hidden','false');
    };

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      drop.classList.contains('show') ? close() : open();
    });

    // 드롭다운 내부 링크 클릭 시 닫기
    drop.addEventListener('click', (e) => {
      if (e.target.matches('a')) close();
    });

    // 바깥 클릭 시 닫기
    document.addEventListener('click', (e) => {
      if (drop.classList.contains('show') && !drop.contains(e.target) && !btn.contains(e.target)) {
        close();
      }
    });

    // 데스크톱으로 리사이즈되면 강제 닫기(중복 표시 방지)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) close();
    });
  }

  // 언어 스위치 (헤더 지구본 메뉴)
  (function(){
    const switchRoot = document.querySelector('.lang-switch');
    const currentBtn = switchRoot?.querySelector('.lang-current');
    const menu = switchRoot?.querySelector('.lang-menu');
    if (!switchRoot || !currentBtn || !menu) return;

    const LANG_KEY = 'seoah-lang';
    const dict = {
      ko: {
        nav_identity: 'IDENTITY',
        nav_projects: 'PROJECTS',
        nav_system: 'SYSTEM',
        nav_more: 'MORE',
        nav_contact: 'CONNECT',
        hero_eyebrow: '공공·모바일 서비스의 구조를 설계합니다',
        hero_desc: '서비스 구조를 설계하고, 정책을 정의하고, 직접 만들어 검증하는<br><strong>이서아(Seoah Lee)</strong>입니다.<br>공공·모바일 플랫폼 UX 기획 실무와 0→1 제품 런칭 경험을 보유하고 있습니다.',
        badge_ux: '#UX 기획',
        badge_ia: '#IA 설계',
        badge_public: '#공공서비스',
        badge_policy: '#서비스 정책 정의',
        careers_lead: '공공기관·모바일 플랫폼·B2B까지, UX 기획과 서비스 설계를 주도한 프로젝트입니다.',
        careers_card1_role: 'UX 기획 · 서비스 정책 · 화면설계 · 단독',
        careers_card1_title: 'PASS 모바일지갑 × 고용24',
        careers_card1_desc: '취업지원 디지털 배지 발급·보관·제출 서비스 — 구조 설계부터 서비스 정책 정의까지 단독 기획',
        careers_card2_role: 'UX 기획 · IA 설계 · UI 디자인',
        careers_card2_title: 'KIST 전통문화혁신 플랫폼',
        careers_card2_desc: '전통문화와 관련된 사람과 데이터를 연결하는 온라인 플랫폼',
        careers_card3_role: '브랜딩 · UI 디자인',
        careers_card3_title: '국립중앙도서관 국가서지 링크드 오픈데이터',
        careers_card3_desc: '공공 데이터를 개방하고, 지식과 정보의 흐름을 연결하는 플랫폼',
        careers_cta: '자세히보기 〉',
        personal_lead: '기획·개발·런칭까지 단독으로 실행한 사이드 프로젝트입니다. AI 활용과 0→1 실행력을 확인할 수 있습니다.',
        personal_card1_title: '마음씨 (Mamssi)',
        personal_card1_desc: '감정 기록 및 성장 루틴 관리 앱 (Web/App)',
        personal_card2_title: '잇데이 (Itday)',
        personal_card2_desc: 'AI 기반 칼로리 계산 및 식단 관리 솔루션 (MVP)',
        personal_card3_title: '블랭크 (BLANK)',
        personal_card3_desc: '블록체인 기반 신원 인증 및 결혼 증명 서비스 (B2B)',
        personal_cta: '자세히보기 〉',
        personal_comingsoon: '준비 중 〉',
        flow_tile1: '기획 → 설계 → 검증까지. 화면설계서 작성부터 실제 제품 런칭까지 end-to-end로 실행합니다.',
        flow_tile2: '개발자·디자이너·PO의 언어를 동시에 이해하고, 요구사항을 구조로 번역합니다.',
        flow_tile3: '공공·모바일·B2B·플랫폼. 도메인이 달라도 사용자와 구조 중심으로 문제를 정의합니다.',
        flow_tile4: '브랜딩과 UX를 분리하지 않습니다. 서비스의 첫 인상부터 마지막 인터랙션까지 하나의 흐름으로 설계합니다.',
        system_desc: '기획의 논리(Logic)와 디자인의 감성(Emotion)을 AI 기술로 연결하여, 압도적인 속도로 제품을 완성합니다.',
        more_lead: '브랜딩부터 UX/UI 디자인까지 총괄한 프로젝트입니다.',
        more_2025_pill: '공공 UX 혁신',
        more_2025_title: 'PASS 지갑 내 전자고지 서비스',
        more_2025_desc: 'PASS 앱 내에서 각종 고지서(건강보험, 세금, 범칙금 등)의 수신·열람·결제까지 연결하는 서비스.',
        more_2024_pill: '생성형 AI와의 협업',
        more_2024_title: 'GPT기반 인공지능 토탈 솔루션 메스와이저',
        more_2024_desc: 'On-premise 생성형 AI를 적용, 근거가 보이는 답변과 거버넌스를 동시에 제공하는 업무 도우미.',
        more_2023_pill: '참여형 플랫폼의 경험 디자인',
        more_2023_title: '위치기반 정보 공유 플랫폼 - 제보서비스',
        more_2023_desc: '시민이 직접 정보를 제보하고, 실시간으로 소통하는 생활 밀착형 정보 플랫폼.',
        identity_desc: 'I don&#39;t just write specs; I design structures that work.<br><span class=\"identity-declaration-ko\">화면만 그리는 기획자가 아닙니다. 서비스의 뼈대를 설계하고, 정책을 정의하고, 직접 만들어 검증합니다.</span>',
        identity_marquee: '공공서비스 UX • 모바일 플랫폼 • 브랜딩 • AI 협업 • 0→1 런칭 • ',

        // PASS × 고용24 상세 (projects/pass-goyong24.html)
        goyong_hero_kicker: '공공서비스 UX 기획 · PASS 모바일지갑 · 단독 기획',
        goyong_hero_lead: '취업준비생이 면접 당일, 스마트폰 하나로 경력증명 배지를 꺼내<br>기업 담당자에게 바로 제출할 수 있도록 —<br>PASS 모바일지갑 내 고용24 서비스의 전체 UX를<br>IA 설계부터 서비스 정책 정의, 화면설계서 작성까지 단독으로 기획했습니다.',
        goyong_badge1: '#UX 기획 · 단독',
        goyong_badge2: '#IA 설계',
        goyong_badge3: '#서비스 정책 정의',
        goyong_badge4: '#화면설계서',
        goyong_badge5: '#공공서비스',
        goyong_meta_role: 'UX 기획 · 서비스 정책 정의 · 화면설계서 작성 · 단독',
        goyong_meta_period: '2024.11 — 2025.04 (약 5개월)',
        goyong_meta_platform: 'PASS 모바일지갑 (SKT) · iOS / Android',
        goyong_meta_tools: 'Figma · FigJam · 화면설계서(PPT)',
        goyong_challenge_desc: '배경 및 문제점',
        goyong_challenge_li1: '고용24는 취업지원 핵심 공공 서비스이지만 <strong>PC 웹 중심 구조</strong>로 모바일 접근성이 낮아 실제 사용률이 제한적이었음',
        goyong_challenge_li2: '경력증명·일증명·직업훈련 등 배지를 취업 현장에서 <strong>즉시 꺼내 제출할 수 있는 모바일 경로</strong>가 없었음',
        goyong_challenge_li3: '미가입자·실명인증 누락자 등 <strong>다양한 사용자 케이스</strong>를 수용하면서도 진입 장벽을 낮춰야 하는 설계 과제',
        goyong_solution_desc: '핵심 해결 방향',
        goyong_solution_li1: '<strong>기능 이식이 아닌 구조 재설계</strong> — 기존 고용24 웹의 복잡한 구조를 모바일 중심으로 단순화, IA 단계에서부터 최단 경로를 설계',
        goyong_solution_li2: '<strong>서비스 정책 직접 정의</strong> — 미가입자/가입자/실명인증 누락자 3개 케이스 분기, 배지·이력서 독립 VC 데이터 정책 수립',
        goyong_solution_li3: '<strong>운영 유연성 확보</strong> — 서비스 목록·아이콘·해시태그를 어드민에서 제어 가능하도록 설계해 개발 배포 없이 운영 수정 가능한 구조 구현',
        goyong_ia_title: '구조 설계 — Information Architecture',
        goyong_ia_desc: '화면 설계에 앞서 서비스의 전체 정보 구조를 먼저 정의했습니다.<br>모바일지갑 내 진입 경로부터 배지 발급까지의 계층 구조와 이동 흐름을 설계하고, 각 화면의 Page ID와 연결 경로를 문서화해 개발팀과의 커뮤니케이션 기준을 마련했습니다.',
        goyong_decision_title: '핵심 의사결정 — Why this structure?',
        goyong_decision1_title: '사용자 유형별 진입 분기 설계',
        goyong_decision1_body: '고용24 미가입자, 가입자, 실명인증 누락자 — 동일한 진입점을 공유하는 3개 케이스를 하나의 플로우로 수용하되, 케이스별 안내 팝업과 이탈 경로를 명확히 정의했습니다. 서비스 이용 불가 상황에서도 사용자가 다음 행동을 스스로 인지할 수 있도록 설계했습니다.',
        goyong_decision2_title: '배지·이력서 독립 VC 데이터 정책',
        goyong_decision2_body: '배지 삭제 시 이미 발급된 이력서가 함께 변경되지 않도록 배지와 이력서를 독립된 VC(Verifiable Credential)로 관리하는 데이터 정책을 직접 수립했습니다. 이력서는 발급 시점의 정보를 스냅샷으로 저장하는 구조로, 사용자 데이터의 안정성과 신뢰성을 확보했습니다.',
        goyong_decision3_title: '어드민 연동 기반 운영 유연성',
        goyong_decision3_body: '서비스 목록 순서·아이콘·해시태그·배너 등 운영 단계에서 변경이 잦은 요소를 모두 어드민에서 제어 가능하도록 기획했습니다. 개발 배포 없이도 서비스 운영·수정이 가능한 구조로, 실무 운영 효율을 고려한 설계 결정이었습니다.',
        goyong_feature1_title: '구조 설계 — IA & Flow',
        goyong_feature1_body: '모바일지갑 내 8개 서비스 탭 중 고용24를 중심으로, 사용자가 배지 발급부터 기업 제출까지 <strong>최소한의 뎁스로 도달</strong>할 수 있는 IA를 설계했습니다. 각 화면의 Page ID와 이동 경로를 문서화해 개발팀과의 커뮤니케이션 기준을 마련했습니다.',
        goyong_feature2_title: '화면 설계 — 배지 & 이력서',
        goyong_feature2_body: '디지털 배지 목록·상세, 이력서 목록·페이지네이션 등 핵심 화면을 설계했습니다. 발급 전·후 배지 상태를 시각적으로 구분하고, <strong>경력증명·일증명·직업훈련 3개 카테고리</strong>의 메타데이터 가독성을 개선했습니다.',
        goyong_feature3_title: '제출 & 내역 관리',
        goyong_feature3_body: '배지·이력서 제출부터 이용내역·제출내역 관리까지 <strong>end-to-end 플로우</strong>를 완결했습니다. 발급·제출 성공/오류 상태 피드백 패턴을 정립하고, 사용자가 제출 이력을 한 곳에서 확인할 수 있는 구조를 설계했습니다.',
        goyong_result_title: 'Impact & 프로젝트 규모',
        goyong_result1_title: '5개월 · 20+ 버전 · 단독 기획',
        goyong_result1_body: 'v0.1(2024.11)부터 v3.0(2025.04)까지 약 5개월간 20개 이상의 버전을 단독으로 관리하며 기획·설계·정책 정의를 완수했습니다.',
        goyong_result2_title: '3개 사용자 케이스 완전 정의',
        goyong_result2_body: '미가입자·가입자·실명인증 누락자 — 공공 서비스 특성의 복잡한 엣지 케이스를 서비스 정책으로 문서화하고 각 분기 플로우를 설계했습니다.',
        goyong_result3_title: '발급→보관→제출 통합 구조',
        goyong_result3_body: '단일 앱 내에서 디지털 배지와 이력서의 발급·보관·제출 플로우를 end-to-end로 완결. 국세청·관세청 등 공공기관 연동 기반을 마련했습니다.',
        goyong_next_label: '다음 프로젝트: KIST TRAD →',
        goyong_footer_title: '함께 만들고 싶은 서비스가 있으신가요?',
        goyong_footer_desc: '복잡한 서비스 구조도, 사용자 중심으로 단순하게 설계합니다. 언제든 연락 주세요.',

        // KIST Traditional Culture Innovation Platform detail (projects/kist-trad.html)
        kist_hero_kicker: '공공 플랫폼 UX 기획 · KIST · 기획 + IA + UI 총괄',
        kist_hero_lead: '전통문화 분야의 전문가·기업·연구기관이<br>한 곳에서 연결되고, 수요를 접수하고, R&D 과제를 발굴할 수 있도록 —<br>플랫폼의 전체 정보 구조(IA) 설계부터 서비스 기획, UI 디자인까지<br>총괄했습니다.',
        kist_badge1: '#UX 기획 · 총괄',
        kist_badge2: '#IA 설계',
        kist_badge3: '#UI 디자인',
        kist_badge4: '#공공 플랫폼',
        kist_badge5: '#전통문화',
        kist_overview_title: 'Project Overview',
        kist_meta_role: 'UX 기획 · IA 설계 · UI 디자인 · 총괄',
        kist_meta_client: 'KIST (한국과학기술연구원)',
        kist_meta_platform: 'Web 플랫폼 (반응형)',
        kist_meta_tools: 'Figma · FigJam · 운영 가이드',
        kist_challenge_desc: '배경 및 문제점',
        kist_challenge_li1: '전통문화 관련 기관·학계·현장 정보가 <strong>분절·분산</strong>되어 전문가·데이터·지원사업을 한 곳에서 찾기 어려움',
        kist_challenge_li2: '전통문화 용어 체계가 난해해 <strong>비전문가·기업의 진입 장벽</strong>이 높고, 수요 접수 절차도 복잡함',
        kist_challenge_li3: '공공 포털 접근성 기준을 준수하면서 <strong>브랜드 일관성과 현대적 UI</strong>를 동시에 구현해야 하는 설계 과제',
        kist_solution_desc: '핵심 해결 방향',
        kist_solution_li1: '<strong>7개 대메뉴 기반 IA 설계</strong> — 플랫폼 소개·주요분야·전문가·소통참여·공지·지원단·이용안내로 구조화, 사용자 유형별 탐색 경로 최적화',
        kist_solution_li2: '<strong>수요조사·Q&A 핵심 플로우 설계</strong> — 일반회원·전문가·비회원 3개 케이스별 접수·답변·알림 플로우를 서비스 정책으로 정의',
        kist_solution_li3: '<strong>"전통의 미장센 × 모던 UI"</strong> — 동양화 일러스트와 현대적 컴포넌트를 조화시킨 공공 포털 UX 레퍼런스 구축',
        kist_ia_title: '구조 설계 — Information Architecture',
        kist_ia_desc: '화면 설계에 앞서 플랫폼의 전체 정보 구조를 먼저 정의했습니다.<br>7개 대메뉴와 공통 시스템(로그인·회원관리·마이페이지)을 포함한 전체 IA를 설계하고, 수요조사·Q&A 핵심 플로우의 사용자 케이스별 분기를 문서화했습니다.',
        kist_decision_title: '핵심 의사결정 — Why this structure?',
        kist_decision1_title: '사용자 유형별 수요조사 플로우 분기',
        kist_decision1_body: '일반회원·비회원·전문가 3개 유형이 동일한 수요조사 창구를 사용합니다. 각 유형별 접수·답변·알림 경로를 명확히 분기 설계하고, 전문가 답변은 이메일 링크와 마이페이지 두 가지 경로로 진입 가능하도록 이중 접근 구조를 구현했습니다.',
        kist_decision2_title: '공개글·비공개글 처리 정책 정의',
        kist_decision2_body: 'Q&A 게시판에서 비공개 글 등록 시 KIST 관리자에게 자동으로 이메일이 발송되는 정책을 설계했습니다. 공개글은 일반회원과 관리자 모두 답변·댓글·좋아요가 가능하도록 권한 체계를 정의했습니다.',
        kist_decision3_title: '전문가 승인 기반 회원 계층 설계',
        kist_decision3_body: '일반회원·전문가·전문기업 3개 계층으로 회원 구조를 설계했습니다. 전문가·전문기업 회원은 KIST 담당자 승인(최대 7일)이 필요하며, 승인 전까지 일반회원으로 서비스를 이용할 수 있는 단계적 접근 구조를 구현했습니다.',
        kist_feature1_title: '정보 통합 — 데이터 연결 구조',
        kist_feature1_body: '파편화된 전통문화 관련 기관·전문가·데이터를 표준화하여 하나의 허브 DB로 구축했습니다. 키워드 중심 <strong>통합 검색</strong>과 주제/분야/기관 <strong>다층 필터</strong>로 탐색 비용을 낮추고, 비전문가도 쉽게 진입할 수 있는 구조를 설계했습니다.',
        kist_feature2_title: '연결 — 전문가·기업 매칭',
        kist_feature2_body: '기술이 필요한 장인과 소재가 필요한 과학자를 연결하는 <strong>양방향 매칭 구조</strong>를 설계했습니다. 전문가 프로필·기업 소개를 표준화된 카드형 UI로 제공하고, 수요 접수부터 전문가 채택까지의 플로우를 정의했습니다.',
        kist_feature3_title: '참여 — 수요조사 & R&D 지원',
        kist_feature3_body: '상시 수요조사 창구와 Q&A를 중심으로 <strong>사용자 참여 플로우</strong>를 설계했습니다. 복잡한 R&D 지원 절차를 FAQ 기반 인터랙션으로 단순화하고, 접수부터 전문가 답변·알림까지 end-to-end 흐름을 완결했습니다.',
        kist_result_title: 'The Impact — 주요 성과',
        kist_result1_title: '국내 최초 전통문화 융합 플랫폼',
        kist_result1_body: '공공 포털에서도 <strong>브랜딩 일관성과 확장성</strong>을 갖춘 UX 레퍼런스. 접근성 기준을 충족하면서 민간 수준의 사용성을 구현했습니다.',
        kist_result2_title: '7개 섹션 · 완전한 IA 설계',
        kist_result2_body: '플랫폼 소개부터 이용안내까지 7개 대메뉴와 공통 시스템을 포함한 전체 IA를 설계하고, 수요조사·Q&A 핵심 플로우를 문서화했습니다.',
        kist_result3_title: '산학연 네트워크 활성화',
        kist_result3_body: '기관·전문가·수요처 간 연결 성공 사례 창출. 분산된 정보를 허브화하여 <strong>탐색 비용 감소</strong>와 참여 전환율 향상에 기여했습니다.',
        kist_next_label: '다음 프로젝트: NLDB →',
        kist_footer_title: '함께 만들고 싶은 서비스가 있으신가요?',
        kist_footer_desc: '복잡한 서비스 구조도, 사용자 중심으로 단순하게 설계합니다. 언제든 연락 주세요.',

        // NLDB Linked Open Data detail (projects/nldb.html)
        nldb_hero_kicker: '공공 데이터 포털 · 국립중앙도서관 · 브랜딩 + UI 디자인 총괄',
        nldb_hero_lead: '개발자만 쓰던 공공 LOD 데이터를,<br>연구자·일반 시민 누구나 쉽게 탐색할 수 있도록 —<br>브랜딩 아이덴티티 정의부터 디자인 시스템 구축,<br>UI 컴포넌트 설계까지 전 과정을 총괄했습니다.',
        nldb_badge1: '#브랜딩 · 총괄',
        nldb_badge2: '#디자인 시스템',
        nldb_badge3: '#UI 디자인',
        nldb_badge4: '#공공 데이터 포털',
        nldb_badge5: '#접근성',
        nldb_overview_title: 'Project Overview',
        nldb_meta_role: '브랜딩 · 디자인 시스템 · UI 디자인 총괄',
        nldb_meta_client: '국립중앙도서관',
        nldb_meta_platform: 'Web 포털 (반응형) · 모바일',
        nldb_meta_tools: 'Figma · 디자인 시스템 · 컴포넌트 문서화',
        nldb_challenge_desc: '배경 및 문제점',
        nldb_challenge_li1: '수백만 건의 서지 데이터가 <strong>텍스트 나열 방식</strong>으로만 제공되어 탐색 경로가 단절되고 사용자 피로도가 높음',
        nldb_challenge_li2: '전문 용어·RDF 구조가 <strong>개발자 중심</strong>으로 설계되어 일반 연구자·시민의 진입 장벽이 높음',
        nldb_challenge_li3: '공공기관 접근성 가이드라인을 준수하면서 <strong>민간 수준의 현대적 UI</strong>를 구현해야 하는 설계 과제',
        nldb_solution_desc: '핵심 해결 방향',
        nldb_solution_li1: '<strong>브랜드 아이덴티티 정의</strong> — NL Blue 기반의 공공 신뢰감과 데이터 탐색의 역동성을 결합한 비주얼 시스템 구축',
        nldb_solution_li2: '<strong>탐색 중심 UX 설계</strong> — 의도 기반 자동완성·추천 검색, 핵심 메타데이터 요약 카드, 다차원 패싯 필터로 탐색 경험 고도화',
        nldb_solution_li3: '<strong>디자인 시스템 구축</strong> — 재사용 가능한 컴포넌트 라이브러리와 접근성 가이드를 문서화하여 개발팀 전달 기준 마련',
        nldb_decision_title: '디자인 의사결정 — Key Design Decisions',
        nldb_decision1_title: '공공 신뢰감 × 탐색 역동성',
        nldb_decision1_body: '국립중앙도서관의 공공 브랜드 신뢰감을 유지하면서도, 데이터를 능동적으로 탐색하는 경험을 전달하기 위해 NL Blue 컬러 시스템에 그래프 시각화·인터랙티브 요소를 결합했습니다. 단순 정보 나열이 아닌 \'발견의 경험\'을 설계 방향으로 잡았습니다.',
        nldb_decision2_title: '비전문가를 위한 진입 구조 설계',
        nldb_decision2_body: 'RDF·LOD 전문 용어에 익숙하지 않은 일반 연구자·시민을 위해 키워드 중심 자동완성과 메타데이터 요약 카드를 전면에 배치했습니다. 복잡한 데이터 구조를 뒤로 숨기고, 사용자가 원하는 정보에 최단 경로로 도달할 수 있는 진입 흐름을 설계했습니다.',
        nldb_decision3_title: '접근성 기준 내 디자인 품질 확보',
        nldb_decision3_body: '공공기관 웹 접근성 가이드(WCAG 기준)를 준수하면서 민간 서비스 수준의 UI 완성도를 구현하기 위해 색상 대비·포커스 이동·스크린리더 레이블을 컴포넌트 단위로 정의했습니다. 접근성과 심미성이 충돌하지 않는 디자인 시스템을 구축했습니다.',
        nldb_feature1_title: '브랜딩 — 비주얼 시스템 정의',
        nldb_feature1_body: 'NL Blue 컬러 시스템과 타이포그래피 스케일을 정의하고, 공공 신뢰감과 데이터 탐색의 역동성을 동시에 표현하는 <strong>브랜드 비주얼 시스템</strong>을 구축했습니다. 이후 모든 컴포넌트 설계의 기준이 되는 디자인 토큰을 문서화했습니다.',
        nldb_feature2_title: '지식 그래프 — 관계 시각화 UI',
        nldb_feature2_body: '복잡한 서지 정보 간의 관계를 <strong>그래프 형태로 시각화</strong>하여 사용자가 데이터 연결 구조를 직관적으로 파악할 수 있도록 설계했습니다. 노드·링크 기반의 Discovery Flow로 연관 데이터 간 자연스러운 탐색 동선을 구현했습니다.',
        nldb_feature3_title: '검색 UX — 패싯 필터 & 탐색 피드백',
        nldb_feature3_body: '주제·형태·기관·시대 등 <strong>다차원 패싯 필터</strong>와 실시간 결과 수 카운트로 탐색 피드백을 강화했습니다. 의도 기반 자동완성과 추천 검색으로 사용자가 검색어를 몰라도 원하는 데이터에 도달할 수 있는 UX를 구현했습니다.',
        nldb_result_title: 'Impact & 성과',
        nldb_result1_title: '공공 LOD UX 레퍼런스 확립',
        nldb_result1_body: '이후 공공 LOD 구축 프로젝트의 <strong>UX·디자인 레퍼런스</strong>로 활용. 접근성 기준을 충족하면서 민간 수준 사용성을 구현한 첫 사례.',
        nldb_result2_title: '데이터 접근성 대폭 확장',
        nldb_result2_body: '오프라인 서지자료 수백만 건을 <strong>온라인 데이터 1천만+ 건</strong>으로 확장. 누구나 검색·활용 가능한 개방형 구조 구현.',
        nldb_result3_title: '사용자 반응',
        nldb_result3_body: '"찾기 쉽다", "구조가 직관적이다" 등 <strong>긍정적 피드백 다수</strong>. 개발자 전용 서비스에서 일반 연구자·시민 중심 서비스로 전환 성공.',
        nldb_next_label: '다음 프로젝트: PASS e-Gov →',
        nldb_footer_title: '함께 만들고 싶은 서비스가 있으신가요?',
        nldb_footer_desc: '복잡한 서비스 구조도, 사용자 중심으로 단순하게 설계합니다. 언제든 연락 주세요.',

        // Mamssi detail (projects/mamssi.html)
        mamssi_hero_eyebrow: 'Portfolio Work · 2025–2026',
        mamssi_hero_en: 'Mamssi — Emotion Planting Platform',
        mamssi_hero_desc: '감정을 씨앗으로 심고, 공감으로 키우고,<br/>100일 후 세상에 단 하나뿐인 꽃으로 피워내는<br/>소셜 힐링 앱. 기획·디자인·PM까지<br/>1인 풀사이클로 완성했습니다.',
        mamssi_hero_chip1: '서비스 기획',
        mamssi_hero_chip2: 'UX/UI 디자인',
        mamssi_hero_chip3: '소셜 힐링',
        mamssi_hero_chip4: '감정 시각화',
        mamssi_hero_chip5: 'Cursor AI 협업',
        mamssi_hero_chip6: '● 스토어 등록 준비 중',
        mamssi_overview_label: 'Overview',
        mamssi_overview_title: '감정일기 앱은 많습니다.<br/>하지만 <em>공감받으면 꽃이 피는</em><br/>앱은 없었습니다.',
        mamssi_overview_body: '고립감과 공감 결핍이 심화되는 시대에, 기존 감정 일기 앱들은 기록은 있어도 연결이 없었습니다. 마음,씨는 감정을 씨앗으로 시각화하고, 타인의 공감으로 성장시키며, 100일의 여정 끝에 세상에 단 하나뿐인 감정꽃으로 피워내는 \'감정 플랜팅\' 구조를 고안했습니다. B2C 구독 모델과 B2B 정서 데이터 SaaS를 함께 설계한 1인 기획·디자인·PM 프로젝트입니다.',
        mamssi_overview_chip1: '소셜 힐링',
        mamssi_overview_chip2: 'MZ세대 타깃',
        mamssi_overview_chip3: '디지털 웰니스',
        mamssi_overview_chip4: 'B2C · B2B',
        mamssi_overview_chip5: '1인 프로젝트',
        mamssi_overview_chip6: '스토어 출시 예정',
        mamssi_role_label: 'My Role',
        mamssi_role1_name: '서비스 기획',
        mamssi_role1_desc: '문제 정의, 타깃 분석, 수익 모델(B2C/B2B) 설계, 단계별 목표 수립, Task Flow',
        mamssi_role2_name: 'UX/UI 디자인',
        mamssi_role2_desc: '브랜드 아이덴티티, 앱 전체 화면 설계, 감정꽃 성장 시각화 시스템 구축',
        mamssi_role3_name: '구조 설계',
        mamssi_role3_desc: '정보구조(IA), 공감숲 소셜 네트워크 구조, 성장 로직 및 데이터 흐름 설계',
        mamssi_role4_name: 'PM · 런칭',
        mamssi_role4_desc: 'Cursor AI 개발 협업, Vercel 배포, 사업소개서 작성, 스토어 등록 준비',
        mamssi_persona_label: 'Persona',
        mamssi_persona_title: '누구를 위해<br/>만들었나요?',
        mamssi_personaA_label: 'Persona A',
        mamssi_personaA_name: '김지수, 28세',
        mamssi_personaA_role: '스타트업 마케터 · ENFJ',
        mamssi_personaA_situation_label: 'SITUATION',
        mamssi_personaA_situation: '번아웃이 왔지만 "이 정도는 괜찮아"라며 감정을 억누르는 타입. 퇴근 후 혼자 있을 때 공허함을 느끼고, SNS는 지쳐서 지웠지만 연결감이 그립다.',
        mamssi_personaA_needs_label: 'NEEDS',
        mamssi_personaA_need1: '판단받지 않고 감정을 꺼낼 공간',
        mamssi_personaA_need2: '가볍게 연결되는 소속감',
        mamssi_personaA_need3: '지속할 수 있는 작은 루틴',
        mamssi_personaB_label: 'Persona B',
        mamssi_personaB_name: '박도현, 23세',
        mamssi_personaB_role: '취업 준비생 · INFP',
        mamssi_personaB_situation_label: 'SITUATION',
        mamssi_personaB_situation: '불합격이 반복되며 자존감이 흔들리는 중. 가족에게 걱정 끼치기 싫어 힘들다는 말을 꺼내지 못하고 혼자 삭힌다. 감정을 글로 쓰는 습관이 있다.',
        mamssi_personaB_needs_label: 'NEEDS',
        mamssi_personaB_need1: '익명으로 누군가에게 닿는 경험',
        mamssi_personaB_need2: '쌓여가는 감정의 시각적 기록',
        mamssi_personaB_need3: '성장을 느낄 수 있는 피드백',
        mamssi_pain_label: 'Pain Points',
        mamssi_pain_title: '기존 서비스가<br/><em>해결하지 못한 것들</em>',
        mamssi_pain_intro: '기존 감정 일기 앱들과 SNS의 구조적 한계를 분석하고, 그 사이의 공백을 마음,씨로 채웠습니다.',
        mamssi_pain_compare_diary_label: '기존 감정일기 앱',
        mamssi_pain_compare_diary_body: '기록은 있지만<br/>연결이 없음',
        mamssi_pain_compare_sns_label: '기존 SNS',
        mamssi_pain_compare_sns_body: '연결은 있지만<br/>솔직함이 없음',
        mamssi_pain_compare_mamssi_label: '마음, 씨',
        mamssi_pain_compare_mamssi_body: '기록 + 연결 +<br/>성장 시각화',
        mamssi_pain1_label: 'Pain 01',
        mamssi_pain1_title: '감정을 꺼낼 곳이 없다',
        mamssi_pain1_body: '가까운 사람에겐 부담될까봐, SNS엔 평가받을까봐. 솔직한 감정을 안전하게 털어놓을 공간 자체가 없다.',
        mamssi_pain1_solution: '→ 익명 기반 공감숲으로 해결',
        mamssi_pain2_label: 'Pain 02',
        mamssi_pain2_title: '기록이 쌓여도 의미가 없다',
        mamssi_pain2_body: '일기장은 혼자 닫혀있다. 감정을 기록해도 어디로 가는지, 무엇이 달라지는지 알 수가 없다.',
        mamssi_pain2_solution: '→ 씨앗→꽃 성장 시각화로 해결',
        mamssi_pain3_label: 'Pain 03',
        mamssi_pain3_title: '3일 이상 지속하기 어렵다',
        mamssi_pain3_body: '동기부여가 없으면 루틴이 끊긴다. 기존 앱들은 기록을 강제할 뿐 이어갈 이유를 주지 않는다.',
        mamssi_pain3_solution: '→ 100일 감정꽃 목표와 공감 보상으로 해결',
        mamssi_pain4_label: 'Pain 04',
        mamssi_pain4_title: '혼자라는 느낌이 깊어진다',
        mamssi_pain4_body: '감정을 혼자 삭히는 것이 반복되면 고립감이 심화된다. 연결되고 싶지만 깊은 관계는 부담스럽다.',
        mamssi_pain4_solution: '→ 가볍고 익명인 공감 교류로 해결',
        mamssi_journey_label: 'Core Concept',
        mamssi_journey_title: '씨앗 하나, 감정 하나.<br/><em>100일의 여정</em>으로<br/>꽃이 됩니다.',
        mamssi_journey_stage0_label: '<span class="t-ico">🌰</span> Stage 0',
        mamssi_journey_stage0_title: '씨앗 심기',
        mamssi_journey_stage0_body: '하루 한 번, 오늘의 감정을 선택하고 기록으로 씨앗을 심습니다. 8가지 감정 이모지로 오늘 하루를 표현하고, 나만 보기 또는 공감숲 공유 중 선택합니다.',
        mamssi_journey_stage1_label: '<span class="t-ico">🌱</span> Stage 1–2',
        mamssi_journey_stage1_title: '공감숲에서 물주기',
        mamssi_journey_stage1_body: '공감숲에서 타인의 씨앗에 물(💧)을 주고 받으며 서로의 마음이 자랍니다. 익명 기반 소셜 네트워크로 정서적 연대감을 형성합니다.',
        mamssi_journey_stage2_label: '<span class="t-ico">🌿</span> Stage 3–4',
        mamssi_journey_stage2_title: '단단해지는 줄기, 봉오리',
        mamssi_journey_stage2_body: '꾸준한 기록과 공감이 쌓이면 씨앗이 줄기·봉오리로 성장합니다. 주간 감정 달력으로 나의 흐름을 시각적으로 확인할 수 있습니다.',
        mamssi_journey_stage3_label: '<span class="t-ico">🌸</span> Stage 5',
        mamssi_journey_stage3_title: '세상에 단 하나뿐인 꽃',
        mamssi_journey_stage3_body: '100일의 여정 끝에 나의 감정 패턴을 닮은 고유한 감정꽃이 피어납니다. 감정 프로파일링 리포트로 소중한 정서적 자산이 됩니다.',
        mamssi_screens_label: 'App Screens',
        mamssi_screens_title: '매일 들어오고 싶은<br/><em>정원</em>을 만들었습니다.',
        mamssi_screens_label1: '홈 · 나의 정원',
        mamssi_screens_label2: '공감숲 · 소셜',
        mamssi_screens_label3: '감정 기록하기',
        mamssi_screens_label4: '마이 · 프로필',
        mamssi_numbers_label: 'Numbers',
        mamssi_numbers_title: '감정 데이터는<br/>개인의 치유를 넘어<br/><em>사회적 자산</em>이 됩니다.',
        mamssi_numbers_card1: '<strong>핵심 화면</strong>홈 · 기록 · 공감숲 · 마이',
        mamssi_numbers_card2: '<strong>성장 단계</strong>씨앗 → 새싹 → 줄기 → 봉오리 → 만개',
        mamssi_numbers_card3: '<strong>일의 여정</strong>감정꽃 개화까지의 목표 기간',
        mamssi_numbers_card4: '<strong>인 작업</strong>기획 · 디자인 · PM 풀사이클',
        mamssi_numbers_insight1: 'B2C: 감정 기록 → 공감 → 성장 → 감정꽃 개화의 선순환 설계',
        mamssi_numbers_insight2: 'B2B: 익명 정서 데이터 기반 HR 솔루션, 교육기관 정서 지도화',
        mamssi_numbers_insight3: '공감숲 익명 소셜 네트워크로 정서적 연대감 형성',
        mamssi_numbers_insight4: '디지털 웰니스 인프라로 정서 취약계층 사회적 고립 예방',
        mamssi_numbers_insight5: '감정 프로파일링 리포트로 개인 정서적 자기이해 지원',
        mamssi_reflection_label: 'Reflection',
        mamssi_reflection_quote: '기획부터 디자인, 개발 협업, 배포, 사업화까지 —<br/>처음으로 하나의 서비스를 처음부터 끝까지 혼자 끌고 가면서<br/>"서비스는 기능이 아니라 감정을 설계하는 것"이라는 걸<br/>몸으로 배웠습니다.',
        mamssi_reflection_by: '— 기획 디렉터',
        mamssi_reflection_learn1_title: '감정 중심 UX',
        mamssi_reflection_learn1_body: '기능보다 감정 여정을 설계했을 때 사용자 몰입이 달라진다는 것을 배웠습니다.',
        mamssi_reflection_learn2_title: 'AI와 협업하는 기획',
        mamssi_reflection_learn2_body: '기획자가 명확할수록 Cursor AI가 더 정확하게 움직인다는 사실을 체감했습니다.',
        mamssi_reflection_learn3_title: '1인 풀사이클의 밀도',
        mamssi_reflection_learn3_body: '모든 의사결정을 혼자 하면서 기획·디자인·개발의 연결고리를 입체적으로 이해했습니다.',
        mamssi_reflection_learn4_title: '사회적 가치의 설계',
        mamssi_reflection_learn4_body: '수익 모델과 공공성이 충돌하지 않고 함께 갈 수 있는 구조를 고민했습니다.',
        mamssi_cta_title: '씨앗 하나, 감정 하나.<br/><em>매일 나를 키워요.</em>',
        mamssi_cta_sub: '스토어 등록을 앞두고 있습니다. 지금 웹에서 먼저 만나보세요.',

        // Workflow detail (projects/workflow.html)
        workflow_hero_kicker: 'Workflow · 업무 흐름도',
        workflow_hero_lead: '기획부터 배포까지 혼자 완주하는 구조.<br>UX 기획 · 서비스 설계 · AI 기반 구현이 하나의 흐름으로 연결됩니다.',
        workflow_core_title: 'CORE COMPETENCIES',
        workflow_core_card1_title: '서비스 구조 설계',
        workflow_core_card1_li1: 'IA·플로우·정책 정의',
        workflow_core_card1_li2: '사용자 유형별 분기 설계',
        workflow_core_card1_li3: '권한 체계·RLS·접근성(WCAG)',
        workflow_core_card2_title: 'UX/UI 설계·디자인',
        workflow_core_card2_li1: '화면설계서·기능정의서',
        workflow_core_card2_li2: 'Figma 컴포넌트·상태 정의',
        workflow_core_card2_li3: '디자인 시스템 구축',
        workflow_core_card3_title: 'AI 기반 직접 구현',
        workflow_core_card3_li1: 'Cursor AI·React·Next.js',
        workflow_core_card3_li2: 'Supabase·Vercel 배포',
        workflow_core_card3_li3: '동작 프로토타입 → 실서비스',
        workflow_legend_plan: '기획 · 설계',
        workflow_legend_ai: 'AI 구현 · 검증',
        workflow_legend_design: '디자인 · 협업',
        workflow_legend_docs: '문서 · 정책',
        workflow_process_label: 'Process — 8 Steps'
      },
      en: {
        nav_identity: 'IDENTITY',
        nav_projects: 'PROJECTS',
        nav_system: 'SYSTEM',
        nav_more: 'MORE',
        nav_contact: 'CONNECT',
        hero_eyebrow: 'I design structures for public and mobile services.',
        hero_desc: 'I am <strong>Seoah Lee</strong>, a UX planner who designs service structures, defines policies, and validates them hands-on.<br>I have practical experience in public & mobile platform UX planning and launching products from 0→1.',
        badge_ux: '#UX Planning',
        badge_ia: '#IA Design',
        badge_public: '#Public Service',
        badge_policy: '#Service Policy',
        careers_lead: 'From public institutions to mobile platforms and B2B, I have led UX planning and service architecture.',
        careers_card1_role: 'UX planning · Service policy · Screen spec · Solo',
        careers_card1_title: 'PASS Mobile Wallet × Employment24',
        careers_card1_desc: 'Digital employment badges that can be issued, stored, and submitted in PASS — planned end-to-end from structure to policy.',
        careers_card2_role: 'UX planning · IA design · UI design',
        careers_card2_title: 'KIST Traditional Culture Innovation Platform',
        careers_card2_desc: 'An online platform that connects people and data around traditional culture.',
        careers_card3_role: 'Branding · UI design',
        careers_card3_title: 'National Library Linked Open Data Platform',
        careers_card3_desc: 'A platform that opens public data and connects the flow of knowledge and information.',
        careers_cta: 'View case 〉',
        personal_lead: 'Side projects I shipped end-to-end — from planning and development to launch. You can see how I use AI and execute from 0→1.',
        personal_card1_title: 'Mamssi',
        personal_card1_desc: 'Emotion journaling and growth routine app (Web/App).',
        personal_card2_title: 'Itday',
        personal_card2_desc: 'AI-powered calorie tracking and meal planning solution (MVP).',
        personal_card3_title: 'BLANK',
        personal_card3_desc: 'Blockchain-based identity and marriage certificate service (B2B).',
        personal_cta: 'View details 〉',
        personal_comingsoon: 'Coming soon 〉',
        flow_tile1: 'From planning to design to validation. I execute end-to-end, from screen specs to real product launch.',
        flow_tile2: 'I speak the language of developers, designers, and product owners, and translate requirements into structure.',
        flow_tile3: 'Public, mobile, B2B, platform — regardless of domain, I define problems around users and structure.',
        flow_tile4: 'Brand and UX are one. I design the entire journey from first impression to last interaction.',
        system_desc: 'I connect the logic of planning and the emotion of design with AI technology, and ship products at high speed.',
        more_lead: 'Projects where I owned branding as well as UX/UI design.',
        more_2025_pill: 'Public UX Innovation',
        more_2025_title: 'Electronic Notice Service inside PASS Wallet',
        more_2025_desc: 'A service that lets users receive, view, and pay various public bills (health insurance, tax, fines, etc.) directly inside PASS.',
        more_2024_pill: 'Working with Generative AI',
        more_2024_title: 'Meswiser, GPT-based AI Total Solution',
        more_2024_desc: 'An on-premise generative AI assistant that provides traceable answers and governance at the same time.',
        more_2023_pill: 'Designing Participatory Platforms',
        more_2023_title: 'Location-based Reporting Platform',
        more_2023_desc: 'A local information platform where citizens report issues themselves and communicate in real time.',
        identity_desc: 'I don&#39;t just write specs; I design structures that work.<br><span class=\"identity-declaration-ko\">I design the backbone of a service, define policies, and implement/verify them myself.</span>',
        identity_marquee: 'Public-service UX • Mobile platforms • Branding • AI collaboration • 0→1 launches • ',

        // PASS × Employment24 detail (projects/pass-goyong24.html)
        goyong_hero_kicker: 'Public-service UX planning · PASS mobile wallet · Solo project',
        goyong_hero_lead: 'On interview day, job seekers can pull out their employment badges with just their phone<br>and submit them instantly to recruiters.<br>I designed the end-to-end UX of the Employment24 service inside PASS,<br>from IA and service policy to detailed screen specifications — as a solo planner.',
        goyong_badge1: '#UX Planning · Solo',
        goyong_badge2: '#IA Design',
        goyong_badge3: '#Service Policy',
        goyong_badge4: '#Screen Specs',
        goyong_badge5: '#Public Service',
        goyong_meta_role: 'UX planning · Service policy · Screen specifications · Solo',
        goyong_meta_period: '2024.11 — 2025.04 (about 5 months)',
        goyong_meta_platform: 'PASS mobile wallet (SKT) · iOS / Android',
        goyong_meta_tools: 'Figma · FigJam · Screen specs (PPT)',
        goyong_challenge_desc: 'Background & pain points',
        goyong_challenge_li1: 'Employment24 is a key public service for job seekers, but its <strong>PC web–centric structure</strong> limited actual usage on mobile.',
        goyong_challenge_li2: 'There was no <strong>mobile path to instantly present badges</strong> — such as work history, employment certificates, and training history — in on-site hiring situations.',
        goyong_challenge_li3: 'We had to lower friction while still handling <strong>diverse user cases</strong> such as non-members and users without real-name verification.',
        goyong_solution_desc: 'Core design directions',
        goyong_solution_li1: '<strong>Redesigning the structure, not just porting features</strong> — simplifying the complex Employment24 web flows around mobile, and designing the shortest paths from the IA stage.',
        goyong_solution_li2: '<strong>Defining service policies myself</strong> — modeling three cases (non-member/member/real-name missing) and setting independent VC data policies for badges and resumes.',
        goyong_solution_li3: '<strong>Building operational flexibility</strong> — enabling admins to manage service lists, icons, and hashtags so operations can change things without new deployments.',
        goyong_ia_title: 'Structure Design — Information Architecture',
        goyong_ia_desc: 'Before drawing screens, I defined the overall information architecture of the service.<br>I mapped the hierarchy and flows from entry points in the wallet to badge issuance, and documented each screen’s Page ID and connections as a shared reference with the dev team.',
        goyong_decision_title: 'Key Decisions — Why this structure?',
        goyong_decision1_title: 'Entry flows by user type',
        goyong_decision1_body: 'I designed one coherent flow that still handles three cases — non-member, member, and missing real-name verification — by defining case-specific pop-ups and exit paths. Even when the service cannot be used, users clearly understand what to do next.',
        goyong_decision2_title: 'Independent VC data policy for badges and resumes',
        goyong_decision2_body: 'To prevent resumes from changing when a badge is deleted, I defined a data policy that manages badges and resumes as separate VCs (Verifiable Credentials). Resumes store a snapshot of information at issuance time, ensuring stability and trust in user data.',
        goyong_decision3_title: 'Admin-driven operational flexibility',
        goyong_decision3_body: 'I planned the system so that frequently changing elements — service ordering, icons, hashtags, and banners — can all be controlled from the admin console. This enables operational changes without new deployments and reflects real-world constraints of public-service operations.',
        goyong_feature1_title: 'Structure design — IA & flow',
        goyong_feature1_body: 'Among eight service tabs inside the wallet, I centered the IA around Employment24 so users can reach from badge issuance to company submission with <strong>the minimum number of steps</strong>. I documented Page IDs and transitions to align communication with developers.',
        goyong_feature2_title: 'Screen design — badges & resumes',
        goyong_feature2_body: 'I designed key screens such as badge list/detail and resume list with pagination. I visually differentiated pre/post issuance states and improved metadata readability for <strong>three categories: employment, work, and training</strong>.',
        goyong_feature3_title: 'Submission & history management',
        goyong_feature3_body: 'I completed the <strong>end-to-end flow</strong> from badge/resume submission to usage/submission history management. I standardized feedback patterns for success/error states and designed a single place where users can review their submission history.',
        goyong_result_title: 'Impact & project scale',
        goyong_result1_title: '5 months · 20+ versions · Solo planning',
        goyong_result1_body: 'From v0.1 (2024.11) to v3.0 (2025.04), I managed over 20 versions alone, completing planning, structure design, and policy definition throughout roughly five months.',
        goyong_result2_title: 'Three user cases fully defined',
        goyong_result2_body: 'I documented complex edge cases specific to public services — non-member, member, and missing real-name verification — as service policies and designed dedicated flows for each branch.',
        goyong_result3_title: 'Integrated flow from issuance to storage to submission',
        goyong_result3_body: 'Within a single app, I completed an end-to-end flow for issuing, storing, and submitting digital badges and resumes, laying the groundwork for integrations with public agencies such as the National Tax Service and Korea Customs Service.',
        goyong_next_label: 'Next project: KIST TRAD →',
        goyong_footer_title: 'Do you have a service you’d like to build together?',
        goyong_footer_desc: 'I simplify complex service structures around users. Feel free to reach out anytime.',

        // KIST Traditional Culture Innovation Platform detail (projects/kist-trad.html)
        kist_hero_kicker: 'Public platform UX planning · KIST · Lead for planning, IA, and UI',
        kist_hero_lead: 'I led the entire experience so that experts, companies, and research institutes in the traditional culture domain<br>can connect in one place, submit needs, and discover R&D opportunities —<br>from information architecture for the whole platform to service planning and UI design.',
        kist_badge1: '#UX Planning · Lead',
        kist_badge2: '#IA Design',
        kist_badge3: '#UI Design',
        kist_badge4: '#Public Platform',
        kist_badge5: '#Traditional Culture',
        kist_overview_title: 'Project Overview',
        kist_meta_role: 'UX planning · IA design · UI design · Lead',
        kist_meta_client: 'KIST (Korea Institute of Science and Technology)',
        kist_meta_platform: 'Web platform (responsive)',
        kist_meta_tools: 'Figma · FigJam · Operations guide',
        kist_challenge_desc: 'Background & pain points',
        kist_challenge_li1: 'Information on institutions, academia, and on-site actors in traditional culture was <strong>fragmented and scattered</strong>, making it hard to discover experts, data, and support programs in one place.',
        kist_challenge_li2: 'The terminology system around traditional culture is difficult, so <strong>non-experts and companies face a high barrier to entry</strong>, and the process of submitting needs is complex.',
        kist_challenge_li3: 'We had to meet public portal accessibility standards while still delivering <strong>brand consistency and modern UI</strong> — not an easy combination.',
        kist_solution_desc: 'Core design directions',
        kist_solution_li1: '<strong>IA based on seven top-level menus</strong> — structuring the platform into About, Key Areas, Experts, Participation, Notices, Support Unit, and How to Use, optimizing exploration paths by user type.',
        kist_solution_li2: '<strong>Designing the core flows for demand survey and Q&A</strong> — defining service policies for three cases (member, expert, and guest) across submission, responses, and notifications.',
        kist_solution_li3: '<strong>“Traditional mise-en-scène × modern UI”</strong> — building a public-portal UX reference that blends oriental illustration with contemporary components.',
        kist_ia_title: 'Structure Design — Information Architecture',
        kist_ia_desc: 'Before designing screens, I defined the entire information structure of the platform.<br>I mapped IA for seven top-level menus plus common systems (login, membership, My Page), and documented case-based branches for demand survey and Q&A flows.',
        kist_decision_title: 'Key Decisions — Why this structure?',
        kist_decision1_title: 'Branching flows for demand survey by user type',
        kist_decision1_body: 'Members, guests, and experts all use the same demand survey entry point. I clearly separated their submission, response, and notification flows, and allowed experts to answer through either email links or My Page for redundant access.',
        kist_decision2_title: 'Policies for public vs. private posts',
        kist_decision2_body: 'For private posts on the Q&A board, I designed a policy that automatically emails the KIST admin. For public posts, both members and admins can answer, comment, and like, with explicit permission rules.',
        kist_decision3_title: 'Membership tiers based on expert approval',
        kist_decision3_body: 'I designed three membership tiers — member, expert, and expert company. Expert accounts require approval from a KIST manager (up to 7 days), and until then, users access services as normal members in a staged-access model.',
        kist_feature1_title: 'Integration — Data connection structure',
        kist_feature1_body: 'I standardized fragmented data across institutions, experts, and content in traditional culture into a single hub database. Keyword-based <strong>unified search</strong> and multi-layer filters by topic/field/institution reduce exploration cost and make the platform accessible even to non-experts.',
        kist_feature2_title: 'Connection — Expert and company matching',
        kist_feature2_body: 'I designed a <strong>two-sided matching structure</strong> that connects artisans who need technology with scientists who need materials. Expert profiles and company overviews use standardized card UI, and I defined the flow from need submission to expert selection.',
        kist_feature3_title: 'Participation — Demand survey & R&D support',
        kist_feature3_body: 'I built <strong>user participation flows</strong> around always-open demand surveys and Q&A. Complex R&D support procedures are simplified through FAQ-driven interactions, and I completed an end-to-end flow from submission to expert response and notifications.',
        kist_result_title: 'The Impact — Key outcomes',
        kist_result1_title: 'Korea’s first traditional-culture convergence platform',
        kist_result1_body: 'A UX reference that balances <strong>brand consistency and scalability</strong> even for public portals, meeting accessibility standards while delivering consumer-level usability.',
        kist_result2_title: 'Seven sections · Fully defined IA',
        kist_result2_body: 'I designed the full IA for seven top-level menus and shared systems from platform intro to usage guide, and documented the core flows for demand survey and Q&A.',
        kist_result3_title: 'Energizing the academia–industry–research network',
        kist_result3_body: 'The platform enabled successful connection cases between institutions, experts, and demand-side partners. By turning scattered information into a hub, it reduced <strong>exploration cost</strong> and helped improve participation conversion.',
        kist_next_label: 'Next project: NLDB →',
        kist_footer_title: 'Do you have a service you’d like to build together?',
        kist_footer_desc: 'I simplify complex service structures around users. Feel free to reach out anytime.',

        // NLDB Linked Open Data detail (projects/nldb.html)
        nldb_hero_kicker: 'Public data portal · National Library of Korea · Lead for branding & UI design',
        nldb_hero_lead: 'I led end-to-end design so that public LOD data once used only by developers<br>can be easily explored by researchers and everyday citizens —<br>from defining brand identity and building the design system<br>to designing UI components.',
        nldb_badge1: '#Branding · Lead',
        nldb_badge2: '#Design System',
        nldb_badge3: '#UI Design',
        nldb_badge4: '#Open Data Portal',
        nldb_badge5: '#Accessibility',
        nldb_overview_title: 'Project Overview',
        nldb_meta_role: 'Branding · Design system · UI design · Lead',
        nldb_meta_client: 'National Library of Korea',
        nldb_meta_platform: 'Web portal (responsive) · Mobile',
        nldb_meta_tools: 'Figma · Design system · Component documentation',
        nldb_challenge_desc: 'Background & pain points',
        nldb_challenge_li1: 'Millions of bibliographic records were presented only as <strong>long text lists</strong>, breaking exploration paths and causing fatigue.',
        nldb_challenge_li2: 'Terminology and RDF structures were designed for <strong>developers first</strong>, creating a high barrier to entry for general researchers and citizens.',
        nldb_challenge_li3: 'We had to meet public-sector accessibility guidelines while achieving <strong>modern, consumer-level UI</strong> quality.',
        nldb_solution_desc: 'Core design directions',
        nldb_solution_li1: '<strong>Defining the brand identity</strong> — building a visual system that combines public trust based on “NL Blue” with the dynamism of data exploration.',
        nldb_solution_li2: '<strong>Search-centric UX</strong> — intent-based autocomplete and suggested queries, summary cards for key metadata, and multi-dimensional facet filters to deepen the exploration experience.',
        nldb_solution_li3: '<strong>Building a design system</strong> — creating a reusable component library and documenting accessibility guidelines as a shared contract with the development team.',
        nldb_decision_title: 'Key design decisions',
        nldb_decision1_title: 'Public trust × Exploratory energy',
        nldb_decision1_body: 'To preserve the National Library’s public brand trust while conveying an active exploration experience, I combined the NL Blue color system with graph visualizations and interactive elements. Rather than “listing information”, the north star was to design a sense of discovery.',
        nldb_decision2_title: 'Entry structure for non-experts',
        nldb_decision2_body: 'For researchers and citizens unfamiliar with RDF/LOD terminology, I surfaced keyword-based autocomplete and metadata summary cards. Complex data structures are pushed to the background so users can reach what they need via the shortest path.',
        nldb_decision3_title: 'Design quality within accessibility constraints',
        nldb_decision3_body: 'To meet WCAG-based public accessibility guidelines while delivering consumer-level UI, I defined color contrast, focus movement, and screen reader labels at the component level. The design system ensures accessibility and aesthetics are not in conflict.',
        nldb_feature1_title: 'Branding — Defining the visual system',
        nldb_feature1_body: 'I defined the NL Blue color system and typographic scale, and built a <strong>brand visual system</strong> that expresses both public trust and the dynamism of data exploration. These design tokens became the baseline for all components.',
        nldb_feature2_title: 'Knowledge graph — Visualizing relationships',
        nldb_feature2_body: 'I visualized complex relationships between bibliographic entities as a <strong>graph interface</strong>, so users can intuitively understand how data is connected. Node–link–based discovery flows support natural navigation between related items.',
        nldb_feature3_title: 'Search UX — Facet filters & exploration feedback',
        nldb_feature3_body: 'Multi-dimensional <strong>facet filters</strong> (subject, form, institution, period, etc.) and live result counts strengthen feedback during exploration. With intent-based autocomplete and suggested queries, users can reach the right data even without knowing exact search terms.',
        nldb_result_title: 'Impact & Outcomes',
        nldb_result1_title: 'Established a UX reference for public LOD',
        nldb_result1_body: 'The project became a <strong>UX and design reference</strong> for later public LOD initiatives, as one of the first cases to combine accessibility compliance with consumer-level usability.',
        nldb_result2_title: 'Significantly expanded data accessibility',
        nldb_result2_body: 'Expanded millions of offline bibliographic records into <strong>10M+ online data items</strong> in an open, searchable structure accessible to anyone.',
        nldb_result3_title: 'User feedback',
        nldb_result3_body: 'Users frequently described the service as “easy to find” and “structurally intuitive,” marking a successful shift from a developer-oriented tool to a service centered on researchers and citizens.',
        nldb_next_label: 'Next project: PASS e-Gov →',
        nldb_footer_title: 'Do you have a service you’d like to build together?',
        nldb_footer_desc: 'I simplify complex service structures around users. Feel free to reach out anytime.',

        // Mamssi detail (projects/mamssi.html)
        mamssi_hero_eyebrow: 'Portfolio Work · 2025–2026',
        mamssi_hero_en: 'Mamssi — Emotion Planting Platform',
        mamssi_hero_desc: 'Plant emotions as seeds, grow them with empathy,<br/>and let them bloom into one-of-a-kind flowers after 100 days.<br/>A social healing app I completed end-to-end<br/>across planning, design, and PM as a solo project.',
        mamssi_hero_chip1: 'Service planning',
        mamssi_hero_chip2: 'UX/UI design',
        mamssi_hero_chip3: 'Social healing',
        mamssi_hero_chip4: 'Emotion visualization',
        mamssi_hero_chip5: 'Collaborating with Cursor AI',
        mamssi_hero_chip6: '● Preparing for app store launch',
        mamssi_overview_label: 'Overview',
        mamssi_overview_title: 'There are many mood diary apps,<br/>but none where <em>flowers bloom when you’re understood</em>.',
        mamssi_overview_body: 'In an age of growing isolation and empathy deficit, most emotion diary apps stop at recording; they don’t create connection. Mamssi visualizes feelings as seeds, grows them through others’ empathy, and after a 100-day journey, turns them into a one-of-a-kind emotional flower. It is a solo project where I designed both a B2C subscription model and a B2B emotional data SaaS across planning, design, and PM.',
        mamssi_overview_chip1: 'Social healing',
        mamssi_overview_chip2: 'MZ generation focus',
        mamssi_overview_chip3: 'Digital wellness',
        mamssi_overview_chip4: 'B2C · B2B',
        mamssi_overview_chip5: 'Solo project',
        mamssi_overview_chip6: 'Store launch planned',
        mamssi_role_label: 'My Role',
        mamssi_role1_name: 'Service planning',
        mamssi_role1_desc: 'Problem framing, target analysis, designing B2C/B2B revenue models, defining staged goals, and task flows.',
        mamssi_role2_name: 'UX/UI design',
        mamssi_role2_desc: 'Brand identity, full app screen design, and building the emotional flower growth visualization system.',
        mamssi_role3_name: 'Structure design',
        mamssi_role3_desc: 'Information architecture, empathy-forest social network structure, and growth logic and data flow design.',
        mamssi_role4_name: 'PM & launch',
        mamssi_role4_desc: 'Collaborating with Cursor AI for development, deploying on Vercel, preparing pitch decks, and getting ready for store submission.',
        mamssi_persona_label: 'Persona',
        mamssi_persona_title: 'Who did I<br/>design this for?',
        mamssi_personaA_label: 'Persona A',
        mamssi_personaA_name: 'Jisoo Kim, 28',
        mamssi_personaA_role: 'Startup marketer · ENFJ',
        mamssi_personaA_situation_label: 'SITUATION',
        mamssi_personaA_situation: 'She’s in burnout but keeps telling herself “I’m fine.” She feels empty when alone after work; she has deleted SNS out of fatigue, yet still longs for a sense of connection.',
        mamssi_personaA_needs_label: 'NEEDS',
        mamssi_personaA_need1: 'A space to express emotions without being judged.',
        mamssi_personaA_need2: 'A light sense of belonging and connection.',
        mamssi_personaA_need3: 'A small routine she can realistically keep.',
        mamssi_personaB_label: 'Persona B',
        mamssi_personaB_name: 'Dohyun Park, 23',
        mamssi_personaB_role: 'Job seeker · INFP',
        mamssi_personaB_situation_label: 'SITUATION',
        mamssi_personaB_situation: 'Repeated rejections are eroding his self-esteem. He doesn’t want to worry his family, so he never says he’s struggling and processes everything alone. He already has a habit of writing his feelings down.',
        mamssi_personaB_needs_label: 'NEEDS',
        mamssi_personaB_need1: 'Anonymously reaching someone with his feelings.',
        mamssi_personaB_need2: 'A visual trace of emotions piling up over time.',
        mamssi_personaB_need3: 'Feedback that lets him feel his own growth.',
        mamssi_pain_label: 'Pain Points',
        mamssi_pain_title: 'What existing services<br/><em>failed to solve</em>.',
        mamssi_pain_intro: 'I analyzed the structural gaps between existing emotion diary apps and SNS, and filled that space with Mamssi.',
        mamssi_pain_compare_diary_label: 'Typical diary apps',
        mamssi_pain_compare_diary_body: 'Plenty of records,<br/>but no connection.',
        mamssi_pain_compare_sns_label: 'Typical SNS',
        mamssi_pain_compare_sns_body: 'Plenty of connection,<br/>but little honesty.',
        mamssi_pain_compare_mamssi_label: 'Mamssi',
        mamssi_pain_compare_mamssi_body: 'Recording + connection +<br/>growth visualization',
        mamssi_pain1_label: 'Pain 01',
        mamssi_pain1_title: 'No safe place to open up',
        mamssi_pain1_body: 'Sharing feels like a burden to close ones, and SNS feels like a stage for judgement. There is simply no safe space to put down honest feelings.',
        mamssi_pain1_solution: '→ Solve with an anonymous empathy forest.',
        mamssi_pain2_label: 'Pain 02',
        mamssi_pain2_title: 'Records pile up but feel meaningless',
        mamssi_pain2_body: 'Diaries stay closed. Even if you write every day, it’s unclear where those feelings go or what actually changes.',
        mamssi_pain2_solution: '→ Visualize growth from seed to flower.',
        mamssi_pain3_label: 'Pain 03',
        mamssi_pain3_title: 'Hard to continue beyond three days',
        mamssi_pain3_body: 'Without motivation, routines break. Existing apps often force logging but don’t give a compelling reason to keep going.',
        mamssi_pain3_solution: '→ Use a 100-day flower goal and empathy rewards.',
        mamssi_pain4_label: 'Pain 04',
        mamssi_pain4_title: 'The feeling of being alone deepens',
        mamssi_pain4_body: 'When you repeatedly process emotions alone, isolation worsens. You want to connect, but deep relationships feel heavy.',
        mamssi_pain4_solution: '→ Design a social structure around light, anonymous empathy.',
        mamssi_journey_label: 'Core Concept',
        mamssi_journey_title: 'One seed, one feeling.<br/><em>A 100-day journey</em><br/>to bloom.',
        mamssi_journey_stage0_label: '<span class="t-ico">🌰</span> Stage 0',
        mamssi_journey_stage0_title: 'Planting the seed',
        mamssi_journey_stage0_body: 'Once a day, you choose today’s feeling and plant it as a seed through writing. You pick from eight emotion emojis and decide whether it stays private or goes to the empathy forest.',
        mamssi_journey_stage1_label: '<span class="t-ico">🌱</span> Stage 1–2',
        mamssi_journey_stage1_title: 'Watering in the empathy forest',
        mamssi_journey_stage1_body: 'In the empathy forest, users water each other’s seeds with 💧. An anonymous social network builds a gentle sense of emotional solidarity.',
        mamssi_journey_stage2_label: '<span class="t-ico">🌿</span> Stage 3–4',
        mamssi_journey_stage2_title: 'Strengthening stems and buds',
        mamssi_journey_stage2_body: 'With consistent journaling and empathy, seeds grow into stems and buds. A weekly emotion calendar shows your patterns visually.',
        mamssi_journey_stage3_label: '<span class="t-ico">🌸</span> Stage 5',
        mamssi_journey_stage3_title: 'A one-of-a-kind flower',
        mamssi_journey_stage3_body: 'After 100 days, a unique emotional flower blooms based on your patterns. The profiling report becomes a valuable emotional asset.',
        mamssi_screens_label: 'App Screens',
        mamssi_screens_title: 'A garden<br/>you want to visit every day.',
        mamssi_screens_label1: 'Home · My garden',
        mamssi_screens_label2: 'Empathy forest · Social',
        mamssi_screens_label3: 'Record feelings',
        mamssi_screens_label4: 'My · Profile',
        mamssi_numbers_label: 'Numbers',
        mamssi_numbers_title: 'Emotional data becomes<br/>more than personal healing —<br/><em>it becomes a social asset</em>.',
        mamssi_numbers_card1: '<strong>Core screens</strong>Home · Record · Forest · My',
        mamssi_numbers_card2: '<strong>Growth stages</strong>Seed → Sprout → Stem → Bud → Bloom',
        mamssi_numbers_card3: '<strong>Journey length</strong>100 days to full bloom',
        mamssi_numbers_card4: '<strong>Solo work</strong>Planning · Design · PM full-cycle',
        mamssi_numbers_insight1: 'B2C: A virtuous loop of journaling → empathy → growth → blooming flowers.',
        mamssi_numbers_insight2: 'B2B: Anonymous emotional data powering HR solutions and emotional mapping in education.',
        mamssi_numbers_insight3: 'An anonymous empathy forest that builds emotional solidarity.',
        mamssi_numbers_insight4: 'Digital wellness infrastructure to help prevent social isolation among emotionally vulnerable groups.',
        mamssi_numbers_insight5: 'Emotion profiling reports to support self-understanding.',
        mamssi_reflection_label: 'Reflection',
        mamssi_reflection_quote: 'From planning and design to development collaboration, deployment, and commercialization —<br/>seeing one service through alone from start to finish taught me,<br/>in my bones, that “services are about designing feelings, not just features.”',
        mamssi_reflection_by: '— Product planner',
        mamssi_reflection_learn1_title: 'Emotion-centered UX',
        mamssi_reflection_learn1_body: 'I learned how user engagement changes when you design the emotional journey first, not just the feature set.',
        mamssi_reflection_learn2_title: 'Planning with AI as a partner',
        mamssi_reflection_learn2_body: 'The clearer the planner, the more precisely Cursor AI can execute — I felt this difference directly.',
        mamssi_reflection_learn3_title: 'The density of a solo full-cycle',
        mamssi_reflection_learn3_body: 'Owning every decision gave me a three-dimensional understanding of how planning, design, and development connect.',
        mamssi_reflection_learn4_title: 'Designing social value',
        mamssi_reflection_learn4_body: 'I explored ways for business models and public good to co-exist instead of competing.',
        mamssi_cta_title: 'One seed, one feeling.<br/><em>Grow yourself a little every day.</em>',
        mamssi_cta_sub: 'Store submission is just ahead. You can try the web version first.',

        // Workflow detail (projects/workflow.html)
        workflow_hero_kicker: 'Workflow · Process Map',
        workflow_hero_lead: 'A structure that lets me ship solo from planning to deployment.<br>UX planning, service architecture, and AI-based implementation are connected as one continuous flow.',
        workflow_core_title: 'CORE COMPETENCIES',
        workflow_core_card1_title: 'Service structure design',
        workflow_core_card1_li1: 'Defining IA, flows, and policies',
        workflow_core_card1_li2: 'Designing branches by user type',
        workflow_core_card1_li3: 'Access control, RLS, and WCAG accessibility',
        workflow_core_card2_title: 'UX/UI architecture & design',
        workflow_core_card2_li1: 'Screen specs and functional specs',
        workflow_core_card2_li2: 'Defining Figma components and states',
        workflow_core_card2_li3: 'Building a design system',
        workflow_core_card3_title: 'Hands-on AI implementation',
        workflow_core_card3_li1: 'Cursor AI, React, Next.js',
        workflow_core_card3_li2: 'Supabase and Vercel deployment',
        workflow_core_card3_li3: 'From working prototype to live service',
        workflow_legend_plan: 'Planning · Architecture',
        workflow_legend_ai: 'AI implementation · Validation',
        workflow_legend_design: 'Design · Collaboration',
        workflow_legend_docs: 'Documentation · Policy',
        workflow_process_label: 'Process — 8 Steps'
      }
    };

    function applyLang(lang){
      const current = dict[lang] ? lang : 'ko';
      const map = dict[current];
      document.documentElement.setAttribute('lang', current === 'en' ? 'en' : 'ko');
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (!key || !(key in map)) return;
        el.innerHTML = map[key];
      });
      const label = switchRoot.querySelector('.lang-label');
      if (label) label.textContent = current === 'en' ? 'EN' : 'KO';
      menu.classList.remove('show');
      currentBtn.setAttribute('aria-expanded','false');
    }

    const stored = localStorage.getItem(LANG_KEY) || 'ko';
    applyLang(stored);

    currentBtn.addEventListener('click',(e)=>{
      e.stopPropagation();
      const expanded = currentBtn.getAttribute('aria-expanded') === 'true';
      currentBtn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      menu.classList.toggle('show', !expanded);
    });
    menu.addEventListener('click',(e)=>{
      const btnEl = e.target.closest('button[data-lang]');
      if (!btnEl) return;
      const lang = btnEl.getAttribute('data-lang');
      localStorage.setItem(LANG_KEY, lang);
      applyLang(lang);
    });
    document.addEventListener('click',(e)=>{
      if (!menu.classList.contains('show')) return;
      if (!menu.contains(e.target) && !currentBtn.contains(e.target)){
        menu.classList.remove('show');
        currentBtn.setAttribute('aria-expanded','false');
      }
    });
  })();

  // Footer: 포트폴리오 다운로드 모달 + 별 파티클
  (function(){
    const btn = document.getElementById('footerDownloadBtn');
    const modal = document.getElementById('pdfModal');
    if (!btn || !modal) return;

    const backdropEls = modal.querySelectorAll('[data-pdf-close]');
    const closeEls = modal.querySelectorAll('.pdf-modal-close,[data-pdf-close]');

    function openModal(){
      modal.classList.add('show');
      modal.setAttribute('aria-hidden','false');
    }
    function closeModal(){
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden','true');
    }

    closeEls.forEach(el => el.addEventListener('click', closeModal));
    backdropEls.forEach(el => el.addEventListener('click', closeModal));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
    });

    btn.addEventListener('click',(e)=>{
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      spawnStars(cx, cy + window.scrollY);
      openModal();
    });
  })();

  // 모든 주요 버튼/링크 클릭 시 별 파티클
  (function(){
    const els = document.querySelectorAll('button, a');
    els.forEach(el => {
      el.addEventListener('click',(e)=>{
        // 새 창 열기용 Ctrl/Meta 클릭 등은 패스
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        spawnStars(cx, cy + window.scrollY);
      });
    });
  })();
});
