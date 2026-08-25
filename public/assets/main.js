/* TravelNDC landing page interactions: expandable product panels, scroll reveals and mobile navigation. */
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.menu-toggle');
  toggle?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.textContent = isOpen ? '×' : '☰';
  });
  document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open'); toggle?.setAttribute('aria-expanded', 'false'); if (toggle) toggle.textContent = '☰';
  }));

  const screenCopy = {
    offers: {
      nav: 'Offer & Order System', label: 'Live NDC order', title: 'Offer to order, connected', subline: 'Rich content · Ancillaries · Order lifecycle', bundle: 'Dynamic offer bundle', detail: 'Seat · Bag · Lounge · Flexible change', price: 'Ready', confidence: 'Order confidence <b>High</b>', action: 'Review order →'
    },
    service: {
      nav: 'Airline Booking Portal', label: 'Agency booking flow', title: 'Your airline, one portal', subline: 'Branded experience · Agency access · Self-service', bundle: 'Agency fare package', detail: 'Private fare · Seat · Bag · Service options', price: 'Live', confidence: 'Portal status <b>Ready</b>', action: 'Open booking flow →'
    },
    insights: {
      nav: 'Airline Group System', label: 'Group overview', title: 'Manage every airline together', subline: 'Multi-brand control · Shared rules · Group insight', bundle: 'Group commercial rule', detail: 'Brand controls · Market rules · Shared reporting', price: 'Active', confidence: 'Group performance <b>On track</b>', action: 'View group insight →'
    },
    content: {
      nav: 'NDC IFG Solution', label: 'Payment & settlement', title: 'NDC payments, under control', subline: 'IFG connectivity · Market payments · Settlement', bundle: 'Settlement-ready order', detail: 'Payment choice · Reconciliation · Financial control', price: 'Secure', confidence: 'Payment status <b>Verified</b>', action: 'Review payment flow →'
    }
  };
  const screenCopyZh = {
    offers: { nav: 'Offer 与 Order 系统', label: '实时 NDC 订单', title: '从产品到订单，全程连接', subline: '丰富内容 · 附加服务 · 订单生命周期', bundle: '动态产品组合', detail: '座位 · 行李 · 休息室 · 灵活变更', price: '已就绪', confidence: '订单信心 <b>高</b>', action: '查看订单 →' },
    service: { nav: '航司预订门户', label: '旅行社预订流程', title: '您的航司，一个门户', subline: '品牌体验 · 旅行社接入 · 自助服务', bundle: '旅行社票价套餐', detail: '私有票价 · 座位 · 行李 · 服务选项', price: '实时', confidence: '门户状态 <b>已就绪</b>', action: '打开预订流程 →' },
    insights: { nav: '航司集团系统', label: '集团总览', title: '统一管理每家航司', subline: '多品牌控制 · 共享规则 · 集团洞察', bundle: '集团商业规则', detail: '品牌控制 · 市场规则 · 共享报表', price: '运行中', confidence: '集团业绩 <b>进展顺利</b>', action: '查看集团洞察 →' },
    content: { nav: 'NDC IFG 解决方案', label: '支付与结算', title: 'NDC 支付，尽在掌控', subline: 'IFG 连接 · 市场支付 · 结算', bundle: '结算就绪订单', detail: '支付选择 · 对账 · 财务控制', price: '安全', confidence: '支付状态 <b>已验证</b>', action: '查看支付流程 →' }
  };
  const screenCopyIntl = {
    ja: {
      offers:{nav:'Offer & Order システム',label:'ライブ NDC 注文',title:'オファーから注文まで、すべて接続',subline:'豊富なコンテンツ · 付帯サービス · 注文ライフサイクル',bundle:'ダイナミック・オファー',detail:'座席 · 手荷物 · ラウンジ · 柔軟な変更',price:'準備完了',confidence:'注文の信頼性 <b>高</b>',action:'注文を確認 →'},
      service:{nav:'航空会社予約ポータル',label:'代理店予約フロー',title:'あなたの航空会社、ひとつのポータル',subline:'ブランド体験 · 代理店アクセス · セルフサービス',bundle:'代理店運賃パッケージ',detail:'運賃 · 座席 · 手荷物 · サービス',price:'ライブ',confidence:'ポータルの状態 <b>準備完了</b>',action:'予約フローを開く →'},
      insights:{nav:'航空会社グループシステム',label:'グループ概要',title:'すべての航空会社を一元管理',subline:'マルチブランド · 共通ルール · グループ洞察',bundle:'グループ販売ルール',detail:'ブランド管理 · 市場ルール · レポート',price:'稼働中',confidence:'グループ実績 <b>順調</b>',action:'グループ分析を見る →'},
      content:{nav:'NDC IFG ソリューション',label:'決済と精算',title:'NDC決済をコントロール',subline:'IFG接続 · 市場別決済 · 精算',bundle:'精算可能な注文',detail:'支払方法 · 照合 · 財務管理',price:'安全',confidence:'決済状態 <b>確認済み</b>',action:'決済フローを見る →'}
    },
    ko: {
      offers:{nav:'Offer & Order 시스템',label:'실시간 NDC 주문',title:'오퍼부터 주문까지, 하나로 연결',subline:'풍부한 콘텐츠 · 부가서비스 · 주문 라이프사이클',bundle:'동적 오퍼 번들',detail:'좌석 · 수하물 · 라운지 · 유연한 변경',price:'준비됨',confidence:'주문 신뢰도 <b>높음</b>',action:'주문 검토 →'},
      service:{nav:'항공사 예약 포털',label:'여행사 예약 흐름',title:'하나의 항공사, 하나의 포털',subline:'브랜드 경험 · 여행사 접근 · 셀프서비스',bundle:'여행사 운임 패키지',detail:'운임 · 좌석 · 수하물 · 서비스',price:'실시간',confidence:'포털 상태 <b>준비됨</b>',action:'예약 흐름 열기 →'},
      insights:{nav:'항공사 그룹 시스템',label:'그룹 개요',title:'모든 항공사를 함께 관리',subline:'멀티 브랜드 · 공통 규칙 · 그룹 인사이트',bundle:'그룹 상업 규칙',detail:'브랜드 관리 · 시장 규칙 · 리포트',price:'활성',confidence:'그룹 성과 <b>정상</b>',action:'그룹 인사이트 보기 →'},
      content:{nav:'NDC IFG 솔루션',label:'결제 및 정산',title:'NDC 결제를 완벽하게 관리',subline:'IFG 연결 · 시장별 결제 · 정산',bundle:'정산 준비 주문',detail:'결제 방식 · 대사 · 재무 관리',price:'보안',confidence:'결제 상태 <b>검증됨</b>',action:'결제 흐름 검토 →'}
    },
    th: { offers:{nav:'ระบบ Offer & Order',label:'คำสั่งซื้อ NDC แบบเรียลไทม์',title:'เชื่อมต่อจากข้อเสนอถึงคำสั่งซื้อ',subline:'เนื้อหาที่ครบถ้วน · บริการเสริม · วงจรคำสั่งซื้อ',bundle:'ชุดข้อเสนอแบบไดนามิก',detail:'ที่นั่ง · สัมภาระ · เลานจ์ · เปลี่ยนแปลงยืดหยุ่น',price:'พร้อม',confidence:'ความมั่นใจในคำสั่งซื้อ <b>สูง</b>',action:'ตรวจสอบคำสั่งซื้อ →'}, service:{nav:'พอร์ทัลจองสายการบิน',label:'ขั้นตอนจองสำหรับเอเจนต์',title:'สายการบินของคุณในพอร์ทัลเดียว',subline:'แบรนด์ · เอเจนต์ · บริการตนเอง',bundle:'แพ็กเกจค่าโดยสารเอเจนต์',detail:'ค่าโดยสาร · ที่นั่ง · สัมภาระ · บริการ',price:'ใช้งานจริง',confidence:'สถานะพอร์ทัล <b>พร้อม</b>',action:'เปิดขั้นตอนการจอง →'}, insights:{nav:'ระบบกลุ่มสายการบิน',label:'ภาพรวมกลุ่ม',title:'จัดการทุกสายการบินร่วมกัน',subline:'หลายแบรนด์ · กฎร่วม · ข้อมูลเชิงลึก',bundle:'กฎการค้าของกลุ่ม',detail:'แบรนด์ · ตลาด · รายงาน',price:'ใช้งานอยู่',confidence:'ผลการดำเนินงาน <b>เป็นไปตามแผน</b>',action:'ดูข้อมูลเชิงลึก →'}, content:{nav:'โซลูชัน NDC IFG',label:'การชำระเงินและการชำระบัญชี',title:'ควบคุมการชำระเงิน NDC',subline:'IFG · การชำระเงินตามตลาด · การชำระบัญชี',bundle:'คำสั่งซื้อพร้อมชำระบัญชี',detail:'ทางเลือกชำระเงิน · กระทบยอด · การเงิน',price:'ปลอดภัย',confidence:'สถานะการชำระเงิน <b>ยืนยันแล้ว</b>',action:'ตรวจสอบการชำระเงิน →'} },
    ar: { offers:{nav:'نظام Offer وOrder',label:'طلب NDC مباشر',title:'من العرض إلى الطلب، اتصال كامل',subline:'محتوى غني · خدمات إضافية · دورة الطلب',bundle:'حزمة عروض ديناميكية',detail:'مقعد · أمتعة · صالة · تغيير مرن',price:'جاهز',confidence:'موثوقية الطلب <b>عالية</b>',action:'مراجعة الطلب ←'}, service:{nav:'بوابة حجز شركات الطيران',label:'مسار حجز الوكيل',title:'شركة الطيران الخاصة بك، بوابة واحدة',subline:'تجربة العلامة · وصول الوكلاء · خدمة ذاتية',bundle:'حزمة أسعار الوكلاء',detail:'سعر · مقعد · أمتعة · خدمات',price:'مباشر',confidence:'حالة البوابة <b>جاهزة</b>',action:'فتح مسار الحجز ←'}, insights:{nav:'نظام مجموعة شركات الطيران',label:'نظرة عامة على المجموعة',title:'إدارة كل شركات الطيران معاً',subline:'علامات متعددة · قواعد مشتركة · رؤى المجموعة',bundle:'قاعدة تجارية للمجموعة',detail:'علامة · سوق · تقارير',price:'نشط',confidence:'أداء المجموعة <b>على المسار</b>',action:'عرض الرؤى ←'}, content:{nav:'حل NDC IFG',label:'المدفوعات والتسوية',title:'مدفوعات NDC تحت السيطرة',subline:'اتصال IFG · مدفوعات الأسواق · تسوية',bundle:'طلب جاهز للتسوية',detail:'خيارات دفع · مطابقة · تحكم مالي',price:'آمن',confidence:'حالة الدفع <b>تم التحقق</b>',action:'مراجعة الدفع ←'} },
    ru: { offers:{nav:'Система Offer и Order',label:'Онлайн-заказ NDC',title:'От предложения до заказа — всё связано',subline:'Контент · допуслуги · жизненный цикл заказа',bundle:'Динамический пакет предложений',detail:'Место · багаж · лаунж · гибкое изменение',price:'Готово',confidence:'Уверенность в заказе <b>Высокая</b>',action:'Проверить заказ →'}, service:{nav:'Портал бронирования',label:'Поток бронирования агента',title:'Ваша авиакомпания — один портал',subline:'Бренд · доступ агентов · самообслуживание',bundle:'Пакет тарифов для агентства',detail:'Тариф · место · багаж · сервис',price:'Онлайн',confidence:'Статус портала <b>Готово</b>',action:'Открыть поток бронирования →'}, insights:{nav:'Система группы авиакомпаний',label:'Обзор группы',title:'Управляйте всеми авиакомпаниями вместе',subline:'Мультибренд · общие правила · аналитика',bundle:'Коммерческое правило группы',detail:'Бренды · рынки · отчёты',price:'Активно',confidence:'Показатели группы <b>в норме</b>',action:'Открыть аналитику →'}, content:{nav:'Решение NDC IFG',label:'Платежи и расчёты',title:'Платежи NDC под контролем',subline:'IFG · платежи по рынкам · расчёты',bundle:'Заказ готов к расчёту',detail:'Оплата · сверка · финансовый контроль',price:'Защищено',confidence:'Статус платежа <b>Проверен</b>',action:'Проверить платёж →'} }
  };
  document.querySelectorAll('.feature').forEach(item => item.addEventListener('click', () => {
    document.querySelectorAll('.feature').forEach(feature => { feature.classList.remove('active'); feature.querySelector('i').textContent = '+'; });
    item.classList.add('active'); item.querySelector('i').textContent = '−';
    const copy = screenCopy[item.dataset.screen];
    const language = window.TravelNDCLanguage || (document.documentElement.lang === 'zh-CN' ? 'zh' : 'en');
    const content = language === 'zh' ? screenCopyZh[item.dataset.screen] : (screenCopyIntl[language]?.[item.dataset.screen] || copy);
    if (content) {
      document.querySelector('.product-shell').classList.toggle('portal-view', item.dataset.screen === 'service');
      document.querySelector('.mock-nav span:nth-child(2)').textContent = content.nav;
      document.querySelector('.mock-nav small').textContent = content.label;
      document.querySelector('.mock-title h3').textContent = content.title;
      document.querySelector('.mock-title p').textContent = content.subline;
      document.querySelector('.bundle h4').textContent = content.bundle;
      document.querySelector('.bundle p').textContent = content.detail;
      document.querySelector('.bundle > strong').textContent = content.price;
      document.querySelector('.mock-footer span').innerHTML = content.confidence;
      document.querySelector('.mock-footer button').textContent = content.action;
    }
  }));
  document.addEventListener('travelndc:language-changed', () => {
    document.querySelector('.feature.active')?.click();
  });

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

  // Individually supplied airline logos, rendered in equal display boxes.
  const airlinePartners = [
    ['Singapore Airlines','singapore'], ['Cathay Pacific','cathay'], ['Qatar Airways','qatar'], ['Etihad Airways','etihad'], ['Emirates','emirates'], ['Finnair','finnair'],
    ['Lufthansa','lufthansa'], ['Austrian Airlines','austrian'], ['Brussels Airlines','brussels'], ['Swiss','swiss'], ['Air France','air-france'],
    ['British Airways','british-airways'], ['United Airlines','united'], ['American Airlines','american'], ['Alaska Airlines','alaska'], ['Turkish Airlines','turkish'], ['KLM','klm'],
    ['Vueling','vueling'], ['Scoot','scoot'], ['Iberia','iberia'], ['Ethiopian Airlines','ethiopian'], ['Airlink','airlink'], ['EVA Air','eva'],
    ['Air China','air-china'], ['China Eastern Airlines','china-eastern'], ['China Southern Airlines','china-southern'], ['XiamenAir','xiamenair'], ['Spring Airlines','spring'],
    ['Air Macau','air-macau'], ['Juneyao Air','juneyao'], ['Shenzhen Airlines','shenzhen'], ['Hebei Airlines','hebei'], ['9 Air','9air']
  ];
  const logoTrack = document.querySelector('.logo-wall-track');
  if (logoTrack) {
    [...airlinePartners, ...airlinePartners].forEach(([name, filename], index) => {
      const logo = document.createElement('img');
      logo.className = 'airline-logo';
      logo.src = `assets/airlines/${filename}.png`;
      logo.setAttribute('role', 'listitem');
      logo.alt = name;
      if (index >= airlinePartners.length) logo.setAttribute('aria-hidden', 'true');
      logoTrack.appendChild(logo);
    });
  }

  document.querySelector('.prompt')?.addEventListener('submit', event => {
    event.preventDefault();
    const input = event.currentTarget.querySelector('input');
    if (input.value.trim()) { input.value = ''; input.placeholder = 'Your distribution workflow is being shaped…'; }
  });
});
