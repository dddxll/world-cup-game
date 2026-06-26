import type { NationalTeam } from '@/types'

export const allTeams: NationalTeam[] = [
  // ═══════════════════════════════════════
  // Group A
  // ═══════════════════════════════════════
  {
    id: 'MEX', name: '墨西哥', nameEn: 'Mexico',
    flag: '/images/flags/mex.svg', tier: 2, group: 'A',
    ratings: { attack: 76, defense: 70, midfield: 74 },
    coachId: 'coach-MEX', coachStyle: '高位压迫',
  },
  {
    id: 'RSA', name: '南非', nameEn: 'South Africa',
    flag: '/images/flags/rsa.svg', tier: 3, group: 'A',
    ratings: { attack: 68, defense: 62, midfield: 65 },
    coachId: 'coach-RSA', coachStyle: '防守反击',
  },
  {
    id: 'KOR', name: '韩国', nameEn: 'South Korea',
    flag: '/images/flags/kor.svg', tier: 3, group: 'A',
    ratings: { attack: 72, defense: 64, midfield: 68 },
    coachId: 'coach-KOR', coachStyle: '高位压迫',
  },
  {
    id: 'CZE', name: '捷克', nameEn: 'Czech Republic',
    flag: '/images/flags/cze.svg', tier: 3, group: 'A',
    ratings: { attack: 70, defense: 63, midfield: 69 },
    coachId: 'coach-CZE', coachStyle: '传控渗透',
  },

  // ═══════════════════════════════════════
  // Group B
  // ═══════════════════════════════════════
  {
    id: 'CAN', name: '加拿大', nameEn: 'Canada',
    flag: '/images/flags/can.svg', tier: 2, group: 'B',
    ratings: { attack: 74, defense: 66, midfield: 70 },
    coachId: 'coach-CAN', coachStyle: '高位压迫',
  },
  {
    id: 'BIH', name: '波黑', nameEn: 'Bosnia and Herzegovina',
    flag: '/images/flags/bih.svg', tier: 3, group: 'B',
    ratings: { attack: 69, defense: 60, midfield: 66 },
    coachId: 'coach-BIH', coachStyle: '两翼齐飞',
  },
  {
    id: 'QAT', name: '卡塔尔', nameEn: 'Qatar',
    flag: '/images/flags/qat.svg', tier: 4, group: 'B',
    ratings: { attack: 58, defense: 50, midfield: 55 },
    coachId: 'coach-QAT', coachStyle: '传控渗透',
  },
  {
    id: 'SUI', name: '瑞士', nameEn: 'Switzerland',
    flag: '/images/flags/sui.svg', tier: 2, group: 'B',
    ratings: { attack: 72, defense: 74, midfield: 73 },
    coachId: 'coach-SUI', coachStyle: '铁桶大巴',
  },

  // ═══════════════════════════════════════
  // Group C
  // ═══════════════════════════════════════
  {
    id: 'BRA', name: '巴西', nameEn: 'Brazil',
    flag: '/images/flags/bra.svg', tier: 1, group: 'C',
    ratings: { attack: 90, defense: 78, midfield: 85 },
    coachId: 'coach-BRA', coachStyle: '两翼齐飞',
  },
  {
    id: 'MAR', name: '摩洛哥', nameEn: 'Morocco',
    flag: '/images/flags/mar.svg', tier: 2, group: 'C',
    ratings: { attack: 74, defense: 76, midfield: 75 },
    coachId: 'coach-MAR', coachStyle: '防守反击',
  },
  {
    id: 'SCO', name: '苏格兰', nameEn: 'Scotland',
    flag: '/images/flags/sco.svg', tier: 3, group: 'C',
    ratings: { attack: 68, defense: 62, midfield: 66 },
    coachId: 'coach-SCO', coachStyle: '高位压迫',
  },
  {
    id: 'HAI', name: '海地', nameEn: 'Haiti',
    flag: '/images/flags/hai.svg', tier: 4, group: 'C',
    ratings: { attack: 48, defense: 42, midfield: 45 },
    coachId: 'coach-HAI', coachStyle: '防守反击',
  },

  // ═══════════════════════════════════════
  // Group D
  // ═══════════════════════════════════════
  {
    id: 'USA', name: '美国', nameEn: 'United States',
    flag: '/images/flags/usa.svg', tier: 1, group: 'D',
    ratings: { attack: 80, defense: 75, midfield: 78 },
    coachId: 'coach-USA', coachStyle: '高位压迫',
  },
  {
    id: 'PAR', name: '巴拉圭', nameEn: 'Paraguay',
    flag: '/images/flags/par.svg', tier: 3, group: 'D',
    ratings: { attack: 64, defense: 68, midfield: 63 },
    coachId: 'coach-PAR', coachStyle: '铁桶大巴',
  },
  {
    id: 'AUS', name: '澳大利亚', nameEn: 'Australia',
    flag: '/images/flags/aus.svg', tier: 3, group: 'D',
    ratings: { attack: 66, defense: 64, midfield: 63 },
    coachId: 'coach-AUS', coachStyle: '高位压迫',
  },
  {
    id: 'TUR', name: '土耳其', nameEn: 'Turkey',
    flag: '/images/flags/tur.svg', tier: 3, group: 'D',
    ratings: { attack: 71, defense: 62, midfield: 68 },
    coachId: 'coach-TUR', coachStyle: '两翼齐飞',
  },

  // ═══════════════════════════════════════
  // Group E
  // ═══════════════════════════════════════
  {
    id: 'GER', name: '德国', nameEn: 'Germany',
    flag: '/images/flags/ger.svg', tier: 1, group: 'E',
    ratings: { attack: 86, defense: 80, midfield: 84 },
    coachId: 'coach-GER', coachStyle: '高位压迫',
  },
  {
    id: 'CUW', name: '库拉索', nameEn: 'Curaçao',
    flag: '/images/flags/cuw.svg', tier: 4, group: 'E',
    ratings: { attack: 52, defense: 44, midfield: 48 },
    coachId: 'coach-CUW', coachStyle: '防守反击',
  },
  {
    id: 'CIV', name: '科特迪瓦', nameEn: "Côte d'Ivoire",
    flag: '/images/flags/civ.svg', tier: 3, group: 'E',
    ratings: { attack: 72, defense: 66, midfield: 68 },
    coachId: 'coach-CIV', coachStyle: '两翼齐飞',
  },
  {
    id: 'ECU', name: '厄瓜多尔', nameEn: 'Ecuador',
    flag: '/images/flags/ecu.svg', tier: 3, group: 'E',
    ratings: { attack: 68, defense: 67, midfield: 65 },
    coachId: 'coach-ECU', coachStyle: '防守反击',
  },

  // ═══════════════════════════════════════
  // Group F
  // ═══════════════════════════════════════
  {
    id: 'NED', name: '荷兰', nameEn: 'Netherlands',
    flag: '/images/flags/ned.svg', tier: 1, group: 'F',
    ratings: { attack: 84, defense: 82, midfield: 86 },
    coachId: 'coach-NED', coachStyle: '传控渗透',
  },
  {
    id: 'JPN', name: '日本', nameEn: 'Japan',
    flag: '/images/flags/jpn.svg', tier: 2, group: 'F',
    ratings: { attack: 76, defense: 72, midfield: 74 },
    coachId: 'coach-JPN', coachStyle: '传控渗透',
  },
  {
    id: 'SWE', name: '瑞典', nameEn: 'Sweden',
    flag: '/images/flags/swe.svg', tier: 2, group: 'F',
    ratings: { attack: 72, defense: 73, midfield: 70 },
    coachId: 'coach-SWE', coachStyle: '铁桶大巴',
  },
  {
    id: 'TUN', name: '突尼斯', nameEn: 'Tunisia',
    flag: '/images/flags/tun.svg', tier: 3, group: 'F',
    ratings: { attack: 66, defense: 65, midfield: 64 },
    coachId: 'coach-TUN', coachStyle: '防守反击',
  },

  // ═══════════════════════════════════════
  // Group G
  // ═══════════════════════════════════════
  {
    id: 'BEL', name: '比利时', nameEn: 'Belgium',
    flag: '/images/flags/bel.svg', tier: 1, group: 'G',
    ratings: { attack: 86, defense: 78, midfield: 85 },
    coachId: 'coach-BEL', coachStyle: '传控渗透',
  },
  {
    id: 'EGY', name: '埃及', nameEn: 'Egypt',
    flag: '/images/flags/egy.svg', tier: 2, group: 'G',
    ratings: { attack: 75, defense: 70, midfield: 72 },
    coachId: 'coach-EGY', coachStyle: '防守反击',
  },
  {
    id: 'IRN', name: '伊朗', nameEn: 'Iran',
    flag: '/images/flags/irn.svg', tier: 3, group: 'G',
    ratings: { attack: 66, defense: 70, midfield: 64 },
    coachId: 'coach-IRN', coachStyle: '铁桶大巴',
  },
  {
    id: 'NZL', name: '新西兰', nameEn: 'New Zealand',
    flag: '/images/flags/nzl.svg', tier: 4, group: 'G',
    ratings: { attack: 56, defense: 52, midfield: 50 },
    coachId: 'coach-NZL', coachStyle: '两翼齐飞',
  },

  // ═══════════════════════════════════════
  // Group H
  // ═══════════════════════════════════════
  {
    id: 'ESP', name: '西班牙', nameEn: 'Spain',
    flag: '/images/flags/esp.svg', tier: 1, group: 'H',
    ratings: { attack: 85, defense: 80, midfield: 90 },
    coachId: 'coach-ESP', coachStyle: '传控渗透',
  },
  {
    id: 'CPV', name: '佛得角', nameEn: 'Cape Verde',
    flag: '/images/flags/cpv.svg', tier: 4, group: 'H',
    ratings: { attack: 55, defense: 48, midfield: 52 },
    coachId: 'coach-CPV', coachStyle: '防守反击',
  },
  {
    id: 'KSA', name: '沙特', nameEn: 'Saudi Arabia',
    flag: '/images/flags/ksa.svg', tier: 3, group: 'H',
    ratings: { attack: 64, defense: 60, midfield: 62 },
    coachId: 'coach-KSA', coachStyle: '传控渗透',
  },
  {
    id: 'URU', name: '乌拉圭', nameEn: 'Uruguay',
    flag: '/images/flags/uru.svg', tier: 2, group: 'H',
    ratings: { attack: 76, defense: 78, midfield: 72 },
    coachId: 'coach-URU', coachStyle: '铁桶大巴',
  },

  // ═══════════════════════════════════════
  // Group I
  // ═══════════════════════════════════════
  {
    id: 'FRA', name: '法国', nameEn: 'France',
    flag: '/images/flags/fra.svg', tier: 1, group: 'I',
    ratings: { attack: 88, defense: 82, midfield: 86 },
    coachId: 'coach-FRA', coachStyle: '防守反击',
  },
  {
    id: 'NOR', name: '挪威', nameEn: 'Norway',
    flag: '/images/flags/nor.svg', tier: 2, group: 'I',
    ratings: { attack: 78, defense: 68, midfield: 73 },
    coachId: 'coach-NOR', coachStyle: '两翼齐飞',
  },
  {
    id: 'SEN', name: '塞内加尔', nameEn: 'Senegal',
    flag: '/images/flags/sen.svg', tier: 2, group: 'I',
    ratings: { attack: 77, defense: 72, midfield: 74 },
    coachId: 'coach-SEN', coachStyle: '高位压迫',
  },
  {
    id: 'IRQ', name: '伊拉克', nameEn: 'Iraq',
    flag: '/images/flags/irq.svg', tier: 4, group: 'I',
    ratings: { attack: 52, defense: 48, midfield: 50 },
    coachId: 'coach-IRQ', coachStyle: '铁桶大巴',
  },

  // ═══════════════════════════════════════
  // Group J
  // ═══════════════════════════════════════
  {
    id: 'ARG', name: '阿根廷', nameEn: 'Argentina',
    flag: '/images/flags/arg.svg', tier: 1, group: 'J',
    ratings: { attack: 88, defense: 80, midfield: 87 },
    coachId: 'coach-ARG', coachStyle: '传控渗透',
  },
  {
    id: 'ALG', name: '阿尔及利亚', nameEn: 'Algeria',
    flag: '/images/flags/alg.svg', tier: 2, group: 'J',
    ratings: { attack: 76, defense: 70, midfield: 73 },
    coachId: 'coach-ALG', coachStyle: '两翼齐飞',
  },
  {
    id: 'AUT', name: '奥地利', nameEn: 'Austria',
    flag: '/images/flags/aut.svg', tier: 2, group: 'J',
    ratings: { attack: 74, defense: 72, midfield: 75 },
    coachId: 'coach-AUT', coachStyle: '高位压迫',
  },
  {
    id: 'JOR', name: '约旦', nameEn: 'Jordan',
    flag: '/images/flags/jor.svg', tier: 4, group: 'J',
    ratings: { attack: 58, defense: 54, midfield: 56 },
    coachId: 'coach-JOR', coachStyle: '防守反击',
  },

  // ═══════════════════════════════════════
  // Group K
  // ═══════════════════════════════════════
  {
    id: 'COL', name: '哥伦比亚', nameEn: 'Colombia',
    flag: '/images/flags/col.svg', tier: 2, group: 'K',
    ratings: { attack: 78, defense: 72, midfield: 76 },
    coachId: 'coach-COL', coachStyle: '传控渗透',
  },
  {
    id: 'POR', name: '葡萄牙', nameEn: 'Portugal',
    flag: '/images/flags/por.svg', tier: 1, group: 'K',
    ratings: { attack: 85, defense: 78, midfield: 84 },
    coachId: 'coach-POR', coachStyle: '高位压迫',
  },
  {
    id: 'COD', name: '民主刚果', nameEn: 'DR Congo',
    flag: '/images/flags/cod.svg', tier: 3, group: 'K',
    ratings: { attack: 65, defense: 62, midfield: 63 },
    coachId: 'coach-COD', coachStyle: '两翼齐飞',
  },
  {
    id: 'UZB', name: '乌兹别克斯坦', nameEn: 'Uzbekistan',
    flag: '/images/flags/uzb.svg', tier: 3, group: 'K',
    ratings: { attack: 62, defense: 60, midfield: 64 },
    coachId: 'coach-UZB', coachStyle: '传控渗透',
  },

  // ═══════════════════════════════════════
  // Group L
  // ═══════════════════════════════════════
  {
    id: 'ENG', name: '英格兰', nameEn: 'England',
    flag: '/images/flags/eng.svg', tier: 1, group: 'L',
    ratings: { attack: 86, defense: 82, midfield: 84 },
    coachId: 'coach-ENG', coachStyle: '高位压迫',
  },
  {
    id: 'CRO', name: '克罗地亚', nameEn: 'Croatia',
    flag: '/images/flags/cro.svg', tier: 2, group: 'L',
    ratings: { attack: 76, defense: 74, midfield: 80 },
    coachId: 'coach-CRO', coachStyle: '传控渗透',
  },
  {
    id: 'GHA', name: '加纳', nameEn: 'Ghana',
    flag: '/images/flags/gha.svg', tier: 3, group: 'L',
    ratings: { attack: 70, defense: 62, midfield: 68 },
    coachId: 'coach-GHA', coachStyle: '两翼齐飞',
  },
  {
    id: 'PAN', name: '巴拿马', nameEn: 'Panama',
    flag: '/images/flags/pan.svg', tier: 3, group: 'L',
    ratings: { attack: 62, defense: 66, midfield: 60 },
    coachId: 'coach-PAN', coachStyle: '铁桶大巴',
  },
]
