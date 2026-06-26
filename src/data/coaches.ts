import type { Coach } from '@/types'

export const allCoaches: Coach[] = [
  // ═══════════════════════════════════════
  // Group A
  // ═══════════════════════════════════════
  {
    id: 'coach-MEX', name: '哈维尔·阿吉雷', nameEn: 'Javier Aguirre',
    nationality: '墨西哥', avatar: '/images/coaches/coach-MEX.png',
    style: '高位压迫', att: 15, def: 11, adp: 14,
    preferredFormations: ['4-3-3', '4-2-3-1'],
    description: '老江湖三度执教，激情高压打法著称',
  },
  {
    id: 'coach-RSA', name: '雨果·布罗斯', nameEn: 'Hugo Broos',
    nationality: '比利时', avatar: '/images/coaches/coach-RSA.png',
    style: '防守反击', att: 10, def: 16, adp: 13,
    preferredFormations: ['4-4-2', '4-2-3-1', '5-3-2'],
    description: '务实稳守派，带领南非复兴的功勋教头',
  },
  {
    id: 'coach-KOR', name: '洪明甫', nameEn: 'Hong Myung-bo',
    nationality: '韩国', avatar: '/images/coaches/coach-KOR.png',
    style: '高位压迫', att: 14, def: 10, adp: 12,
    preferredFormations: ['4-4-2', '4-2-3-1'],
    description: '韩国传奇后卫转型，跑动逼抢型足球代表',
  },
  {
    id: 'coach-CZE', name: '伊万·哈谢克', nameEn: 'Ivan Hasek',
    nationality: '捷克', avatar: '/images/coaches/coach-CZE.png',
    style: '传控渗透', att: 12, def: 13, adp: 15,
    preferredFormations: ['4-2-3-1', '4-1-4-1', '3-4-3'],
    description: '技术流派教头，注重中场传控组织',
  },

  // ═══════════════════════════════════════
  // Group B
  // ═══════════════════════════════════════
  {
    id: 'coach-CAN', name: '杰西·马什', nameEn: 'Jesse Marsch',
    nationality: '美国', avatar: '/images/coaches/coach-CAN.png',
    style: '高位压迫', att: 16, def: 10, adp: 13,
    preferredFormations: ['4-3-3', '4-2-3-1', '3-4-3'],
    description: '红牛系高压教练，激情与体能并重',
  },
  {
    id: 'coach-BIH', name: '谢尔盖·巴尔巴雷兹', nameEn: 'Sergej Barbarez',
    nationality: '波黑', avatar: '/images/coaches/coach-BIH.png',
    style: '两翼齐飞', att: 15, def: 9, adp: 11,
    preferredFormations: ['4-3-3', '4-4-2', '3-5-2'],
    description: '善用边路通道，进攻激进但防守不稳',
  },
  {
    id: 'coach-QAT', name: '廷廷·马克斯', nameEn: 'Tintín Márquez',
    nationality: '西班牙', avatar: '/images/coaches/coach-QAT.png',
    style: '传控渗透', att: 11, def: 10, adp: 14,
    preferredFormations: ['4-2-3-1', '4-3-3'],
    description: '西班牙技术流传教士，致力打造传控足球',
  },
  {
    id: 'coach-SUI', name: '穆拉特·雅金', nameEn: 'Murat Yakin',
    nationality: '瑞士', avatar: '/images/coaches/coach-SUI.png',
    style: '铁桶大巴', att: 9, def: 18, adp: 14,
    preferredFormations: ['5-3-2', '4-2-3-1', '4-1-4-1'],
    description: '瑞士混凝土防线的缔造者，大赛经验丰富',
  },

  // ═══════════════════════════════════════
  // Group C
  // ═══════════════════════════════════════
  {
    id: 'coach-BRA', name: '卡洛·安切洛蒂', nameEn: 'Carlo Ancelotti',
    nationality: '意大利', avatar: '/images/coaches/coach-BRA.png',
    style: '传控渗透', att: 18, def: 14, adp: 17,
    preferredFormations: ['4-3-3', '4-2-3-1', '4-3-2-1'],
    description: '冠军教头，战术大师，五欧冠得主',
  },
  {
    id: 'coach-MAR', name: '瓦利德·雷格拉吉', nameEn: 'Walid Regragui',
    nationality: '摩洛哥', avatar: '/images/coaches/coach-MAR.png',
    style: '防守反击', att: 12, def: 17, adp: 16,
    preferredFormations: ['4-1-4-1', '4-3-3', '5-3-2'],
    description: '北非狐狸，2022四强奇迹缔造者',
  },
  {
    id: 'coach-SCO', name: '史蒂夫·克拉克', nameEn: 'Steve Clarke',
    nationality: '苏格兰', avatar: '/images/coaches/coach-SCO.png',
    style: '高位压迫', att: 11, def: 13, adp: 12,
    preferredFormations: ['4-2-3-1', '3-4-3', '4-3-3'],
    description: '硬朗苏格兰风格代表，强调身体对抗',
  },
  {
    id: 'coach-HAI', name: '加布里埃尔·卡尔德隆', nameEn: 'Gabriel Calderón',
    nationality: '阿根廷', avatar: '/images/coaches/coach-HAI.png',
    style: '防守反击', att: 7, def: 13, adp: 10,
    preferredFormations: ['4-4-2', '5-3-2', '4-2-3-1'],
    description: '阿根廷老帅，率海地首闯世界杯的奇迹缔造者',
  },

  // ═══════════════════════════════════════
  // Group D
  // ═══════════════════════════════════════
  {
    id: 'coach-USA', name: '毛里西奥·波切蒂诺', nameEn: 'Mauricio Pochettino',
    nationality: '阿根廷', avatar: '/images/coaches/coach-USA.png',
    style: '高位压迫', att: 17, def: 13, adp: 16,
    preferredFormations: ['4-3-3', '4-2-3-1', '4-2-2-2'],
    description: '阿根廷名帅，高压逼抢与年轻化改造大师',
  },
  {
    id: 'coach-PAR', name: '丹尼尔·加内罗', nameEn: 'Daniel Garnero',
    nationality: '阿根廷', avatar: '/images/coaches/coach-PAR.png',
    style: '铁桶大巴', att: 8, def: 17, adp: 12,
    preferredFormations: ['5-3-2', '4-4-2', '4-1-4-1'],
    description: '南美防反教头，铁血防守为先',
  },
  {
    id: 'coach-AUS', name: '格拉汉姆·阿诺德', nameEn: 'Graham Arnold',
    nationality: '澳大利亚', avatar: '/images/coaches/coach-AUS.png',
    style: '高位压迫', att: 13, def: 12, adp: 11,
    preferredFormations: ['4-2-3-1', '4-4-2', '3-5-2'],
    description: '袋鼠军团硬汉，体能型高压足球代言人',
  },
  {
    id: 'coach-TUR', name: '温琴佐·蒙特拉', nameEn: 'Vincenzo Montella',
    nationality: '意大利', avatar: '/images/coaches/coach-TUR.png',
    style: '两翼齐飞', att: 16, def: 10, adp: 13,
    preferredFormations: ['4-3-3', '4-2-3-1', '3-4-3'],
    description: '小飞机攻势足球，进攻调教出色但防守有漏洞',
  },

  // ═══════════════════════════════════════
  // Group E
  // ═══════════════════════════════════════
  {
    id: 'coach-GER', name: '尤利安·纳格尔斯曼', nameEn: 'Julian Nagelsmann',
    nationality: '德国', avatar: '/images/coaches/coach-GER.png',
    style: '高位压迫', att: 16, def: 14, adp: 17,
    preferredFormations: ['4-2-3-1', '4-3-3', '3-4-3'],
    description: '德国少帅天才，战术创新与高压足球集大成者',
  },
  {
    id: 'coach-CUW', name: '迪克·艾德沃卡特', nameEn: 'Dick Advocaat',
    nationality: '荷兰', avatar: '/images/coaches/coach-CUW.png',
    style: '防守反击', att: 11, def: 14, adp: 16,
    preferredFormations: ['4-4-2', '4-2-3-1', '5-3-2'],
    description: '荷兰老帅经验丰富，务实力求稳定输出',
  },
  {
    id: 'coach-CIV', name: '埃默斯·法埃', nameEn: 'Emerse Faé',
    nationality: '科特迪瓦', avatar: '/images/coaches/coach-CIV.png',
    style: '两翼齐飞', att: 14, def: 11, adp: 13,
    preferredFormations: ['4-3-3', '4-2-3-1', '4-4-2'],
    description: '非洲大象新帅，激活边路进攻为核心理念',
  },
  {
    id: 'coach-ECU', name: '费利克斯·桑切斯', nameEn: 'Félix Sánchez',
    nationality: '西班牙', avatar: '/images/coaches/coach-ECU.png',
    style: '防守反击', att: 10, def: 15, adp: 14,
    preferredFormations: ['4-4-2', '4-2-3-1', '4-1-4-1'],
    description: '西班牙青训大师，在厄瓜多尔打造实用反击体系',
  },

  // ═══════════════════════════════════════
  // Group F
  // ═══════════════════════════════════════
  {
    id: 'coach-NED', name: '罗纳德·科曼', nameEn: 'Ronald Koeman',
    nationality: '荷兰', avatar: '/images/coaches/coach-NED.png',
    style: '传控渗透', att: 15, def: 14, adp: 16,
    preferredFormations: ['4-3-3', '4-2-3-1', '3-4-3'],
    description: '荷兰全攻全守传人，进攻组织层次分明',
  },
  {
    id: 'coach-JPN', name: '森保一', nameEn: 'Hajime Moriyasu',
    nationality: '日本', avatar: '/images/coaches/coach-JPN.png',
    style: '传控渗透', att: 13, def: 13, adp: 15,
    preferredFormations: ['4-2-3-1', '4-3-3', '3-4-3'],
    description: '日本足球传控哲学践行者，善于临场变招',
  },
  {
    id: 'coach-SWE', name: '格雷厄姆·波特', nameEn: 'Graham Potter',
    nationality: '英格兰', avatar: '/images/coaches/coach-SWE.png',
    style: '传控渗透', att: 14, def: 13, adp: 16,
    preferredFormations: ['4-3-3', '3-4-3', '4-2-3-1'],
    description: '英格兰学院派教头，战术多变且善于调教技术型球队',
  },
  {
    id: 'coach-TUN', name: '贾莱尔·卡德里', nameEn: 'Jalel Kadri',
    nationality: '突尼斯', avatar: '/images/coaches/coach-TUN.png',
    style: '防守反击', att: 11, def: 14, adp: 12,
    preferredFormations: ['4-4-2', '4-3-3', '5-3-2'],
    description: '迦太基雄鹰掌舵人，反击效率至上',
  },

  // ═══════════════════════════════════════
  // Group G
  // ═══════════════════════════════════════
  {
    id: 'coach-BEL', name: '多梅尼科·特德斯科', nameEn: 'Domenico Tedesco',
    nationality: '德国', avatar: '/images/coaches/coach-BEL.png',
    style: '传控渗透', att: 14, def: 13, adp: 15,
    preferredFormations: ['4-2-3-1', '4-3-3', '3-4-3'],
    description: '学院派少帅，用传控体系激活比利时黄金一代',
  },
  {
    id: 'coach-EGY', name: '鲁伊·维多利亚', nameEn: 'Rui Vitória',
    nationality: '葡萄牙', avatar: '/images/coaches/coach-EGY.png',
    style: '防守反击', att: 12, def: 15, adp: 13,
    preferredFormations: ['4-3-3', '4-2-3-1', '4-1-4-1'],
    description: '葡萄牙战术大师，围绕核心打造反击利器',
  },
  {
    id: 'coach-IRN', name: '阿米尔·加莱诺伊', nameEn: 'Amir Ghalenoei',
    nationality: '伊朗', avatar: '/images/coaches/coach-IRN.png',
    style: '铁桶大巴', att: 9, def: 17, adp: 13,
    preferredFormations: ['5-3-2', '4-4-2', '4-2-3-1'],
    description: '波斯铁骑统帅，亚洲顶级防守大师',
  },
  {
    id: 'coach-NZL', name: '达伦·巴泽利', nameEn: 'Darren Bazeley',
    nationality: '新西兰', avatar: '/images/coaches/coach-NZL.png',
    style: '两翼齐飞', att: 12, def: 9, adp: 10,
    preferredFormations: ['4-4-2', '4-3-3', '3-5-2'],
    description: '新西兰本土教头，利用身体优势走边路',
  },

  // ═══════════════════════════════════════
  // Group H
  // ═══════════════════════════════════════
  {
    id: 'coach-ESP', name: '路易斯·德拉富恩特', nameEn: 'Luis de la Fuente',
    nationality: '西班牙', avatar: '/images/coaches/coach-ESP.png',
    style: '传控渗透', att: 16, def: 14, adp: 17,
    preferredFormations: ['4-3-3', '4-2-3-1', '4-1-4-1'],
    description: '西班牙青训体系结晶，传控足球正宗传人',
  },
  {
    id: 'coach-CPV', name: '佩德罗·布里托', nameEn: 'Pedro Brito',
    nationality: '佛得角', avatar: '/images/coaches/coach-CPV.png',
    style: '防守反击', att: 11, def: 12, adp: 11,
    preferredFormations: ['4-4-2', '4-2-3-1'],
    description: '蓝色鲨鱼军的务实领航员',
  },
  {
    id: 'coach-KSA', name: '埃尔韦·勒纳尔', nameEn: 'Hervé Renard',
    nationality: '法国', avatar: '/images/coaches/coach-KSA.png',
    style: '传控渗透', att: 12, def: 14, adp: 16,
    preferredFormations: ['4-2-3-1', '4-3-3', '4-4-2'],
    description: '沙漠传奇教头，善于调教技术型球队',
  },
  {
    id: 'coach-URU', name: '马塞洛·贝尔萨', nameEn: 'Marcelo Bielsa',
    nationality: '阿根廷', avatar: '/images/coaches/coach-URU.png',
    style: '铁桶大巴', att: 13, def: 18, adp: 17,
    preferredFormations: ['4-2-3-1', '4-3-3', '4-4-2'],
    description: '疯子贝尔萨将疯狂进攻基因注入乌拉圭铁血防守',
  },

  // ═══════════════════════════════════════
  // Group I
  // ═══════════════════════════════════════
  {
    id: 'coach-FRA', name: '迪迪埃·德尚', nameEn: 'Didier Deschamps',
    nationality: '法国', avatar: '/images/coaches/coach-FRA.png',
    style: '防守反击', att: 13, def: 18, adp: 16,
    preferredFormations: ['4-2-3-1', '4-3-3', '4-4-2'],
    description: '实用主义大师，擅长大赛淘汰赛博弈',
  },
  {
    id: 'coach-NOR', name: '斯塔勒·索尔巴肯', nameEn: 'Ståle Solbakken',
    nationality: '挪威', avatar: '/images/coaches/coach-NOR.png',
    style: '两翼齐飞', att: 15, def: 10, adp: 13,
    preferredFormations: ['4-3-3', '4-2-3-1', '3-4-3'],
    description: '北欧海盗指挥官，边锋群战术运用纯熟',
  },
  {
    id: 'coach-SEN', name: '阿利乌·西塞', nameEn: 'Aliou Cissé',
    nationality: '塞内加尔', avatar: '/images/coaches/coach-SEN.png',
    style: '高位压迫', att: 14, def: 14, adp: 15,
    preferredFormations: ['4-3-3', '4-2-3-1', '4-4-2'],
    description: '特兰加雄狮领袖，让非洲力量与高压战术融合',
  },
  {
    id: 'coach-IRQ', name: '赫苏斯·卡萨斯', nameEn: 'Jesús Casas',
    nationality: '西班牙', avatar: '/images/coaches/coach-IRQ.png',
    style: '铁桶大巴', att: 9, def: 15, adp: 12,
    preferredFormations: ['4-4-2', '5-3-2', '4-2-3-1'],
    description: '西班牙教头，以防守组织见长，带领美索不达米亚雄狮出征',
  },

  // ═══════════════════════════════════════
  // Group J
  // ═══════════════════════════════════════
  {
    id: 'coach-ARG', name: '莱昂内尔·斯卡洛尼', nameEn: 'Lionel Scaloni',
    nationality: '阿根廷', avatar: '/images/coaches/coach-ARG.png',
    style: '传控渗透', att: 15, def: 14, adp: 18,
    preferredFormations: ['4-3-3', '4-2-3-1', '4-4-2'],
    description: '世界杯冠军教头，平衡实用与技术的大师',
  },
  {
    id: 'coach-ALG', name: '弗拉基米尔·佩特科维奇', nameEn: 'Vladimir Petković',
    nationality: '瑞士', avatar: '/images/coaches/coach-ALG.png',
    style: '两翼齐飞', att: 14, def: 12, adp: 14,
    preferredFormations: ['4-3-3', '4-2-3-1', '3-5-2'],
    description: '沙漠之狐教头，偏好边路快速突击战术',
  },
  {
    id: 'coach-AUT', name: '拉尔夫·朗尼克', nameEn: 'Ralf Rangnick',
    nationality: '德国', avatar: '/images/coaches/coach-AUT.png',
    style: '高位压迫', att: 16, def: 13, adp: 16,
    preferredFormations: ['4-2-3-1', '4-4-2', '4-3-3'],
    description: '高位压迫足球教父，红牛体系创始人',
  },
  {
    id: 'coach-JOR', name: '侯赛因·阿穆塔', nameEn: 'Hussein Ammouta',
    nationality: '摩洛哥', avatar: '/images/coaches/coach-JOR.png',
    style: '防守反击', att: 10, def: 14, adp: 12,
    preferredFormations: ['4-4-2', '4-2-3-1', '5-3-2'],
    description: '约旦雄鹰的北非教头，擅长编织防守网络',
  },

  // ═══════════════════════════════════════
  // Group K
  // ═══════════════════════════════════════
  {
    id: 'coach-COL', name: '内斯托尔·洛伦佐', nameEn: 'Néstor Lorenzo',
    nationality: '阿根廷', avatar: '/images/coaches/coach-COL.png',
    style: '传控渗透', att: 14, def: 13, adp: 15,
    preferredFormations: ['4-3-3', '4-2-3-1', '4-4-2'],
    description: '阿根廷传控流派的哥伦比亚传道者',
  },
  {
    id: 'coach-POR', name: '罗伯托·马丁内斯', nameEn: 'Roberto Martínez',
    nationality: '西班牙', avatar: '/images/coaches/coach-POR.png',
    style: '高位压迫', att: 16, def: 12, adp: 14,
    preferredFormations: ['4-3-3', '3-4-3', '4-2-3-1'],
    description: '攻势足球信徒，将高压传控植入葡萄牙',
  },
  {
    id: 'coach-COD', name: '塞巴斯蒂安·德萨布雷', nameEn: 'Sébastien Desabre',
    nationality: '法国', avatar: '/images/coaches/coach-COD.png',
    style: '两翼齐飞', att: 12, def: 11, adp: 13,
    preferredFormations: ['4-3-3', '4-2-3-1', '4-4-2'],
    description: '法国教头，充满激情的攻势足球，激活刚果豹群进攻天赋',
  },
  {
    id: 'coach-UZB', name: '法比奥·卡纳瓦罗', nameEn: 'Fabio Cannavaro',
    nationality: '意大利', avatar: '/images/coaches/coach-UZB.png',
    style: '传控渗透', att: 13, def: 16, adp: 15,
    preferredFormations: ['4-3-3', '4-2-3-1', '4-4-2'],
    description: '金球后卫转任教头，将意大利防守基因注入中亚白狼',
  },

  // ═══════════════════════════════════════
  // Group L
  // ═══════════════════════════════════════
  {
    id: 'coach-ENG', name: '加雷斯·索斯盖特', nameEn: 'Gareth Southgate',
    nationality: '英格兰', avatar: '/images/coaches/coach-ENG.png',
    style: '高位压迫', att: 14, def: 16, adp: 17,
    preferredFormations: ['4-2-3-1', '4-3-3', '3-4-3'],
    description: '英格兰复兴功勋，攻守平衡的绅士教头',
  },
  {
    id: 'coach-CRO', name: '兹拉特科·达利奇', nameEn: 'Zlatko Dalić',
    nationality: '克罗地亚', avatar: '/images/coaches/coach-CRO.png',
    style: '传控渗透', att: 13, def: 14, adp: 17,
    preferredFormations: ['4-3-3', '4-2-3-1', '4-1-4-1'],
    description: '克罗地亚黄金一代掌舵人，中场传控享誉世界',
  },
  {
    id: 'coach-GHA', name: '奥托·阿多', nameEn: 'Otto Addo',
    nationality: '加纳', avatar: '/images/coaches/coach-GHA.png',
    style: '两翼齐飞', att: 13, def: 11, adp: 12,
    preferredFormations: ['4-3-3', '4-2-3-1', '4-4-2'],
    description: '加纳黑星少帅，速攻型边路突破战术',
  },
  {
    id: 'coach-PAN', name: '托马斯·克里斯蒂安森', nameEn: 'Thomas Christiansen',
    nationality: '西班牙', avatar: '/images/coaches/coach-PAN.png',
    style: '铁桶大巴', att: 10, def: 15, adp: 13,
    preferredFormations: ['5-3-2', '4-4-2', '4-2-3-1'],
    description: '巴拿马防守教头，用铁桶阵弥补牌面不足',
  },
]
