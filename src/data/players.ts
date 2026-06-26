import type { Player, Position } from '@/types'
import { allTeams } from './teams'

// ============================================================
// 真实球员数据库 (每国核心球员，约240人)
// 键: 国家id (3字母), 值: 按位置分组的球员数组
// ============================================================
const REAL_PLAYERS: Record<string, Partial<Record<Position, Player[]>>> = {
  // --- A组 ---
  MEX: {
    GK: [{ id:'MEX-Ochoa', name:'奥乔亚', nameEn:'Guillermo Ochoa', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:78, positions:['GK'], stats:{speed:45,shooting:20,passing:40,defending:55,physical:62} }],
    ST: [{ id:'MEX-Jimenez', name:'希门尼斯', nameEn:'Raul Jimenez', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:80, positions:['ST'], stats:{speed:72,shooting:82,passing:68,defending:35,physical:78} }],
    LW: [{ id:'MEX-Lozano', name:'洛萨诺', nameEn:'Hirving Lozano', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:82, positions:['LW','RW'], stats:{speed:91,shooting:78,passing:72,defending:40,physical:65} }],
    CM: [{ id:'MEX-Alvarez', name:'埃德森·阿尔瓦雷斯', nameEn:'Edson Alvarez', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:81, positions:['CDM','CM'], stats:{speed:68,shooting:55,passing:76,defending:82,physical:80} }],
  },
  RSA: {
    ST: [{ id:'RSA-Foster', name:'福斯特', nameEn:'Lyle Foster', nationality:'RSA', avatar:'/images/players/placeholder.png', rating:74, positions:['ST'], stats:{speed:80,shooting:72,passing:58,defending:30,physical:70} }],
    CM: [{ id:'RSA-Mokoena', name:'莫科纳', nameEn:'Teboho Mokoena', nationality:'RSA', avatar:'/images/players/placeholder.png', rating:73, positions:['CM','CDM'], stats:{speed:65,shooting:60,passing:72,defending:70,physical:68} }],
  },
  KOR: {
    ST: [{ id:'KOR-Son', name:'孙兴慜', nameEn:'Son Heung-min', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:88, positions:['ST','LW'], stats:{speed:89,shooting:87,passing:78,defending:35,physical:72} }],
    CM: [{ id:'KOR-Lee', name:'李刚仁', nameEn:'Lee Kang-in', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:79, positions:['CAM','CM','RW'], stats:{speed:75,shooting:72,passing:82,defending:42,physical:60} }],
    CB: [{ id:'KOR-Kim', name:'金玟哉', nameEn:'Kim Min-jae', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:84, positions:['CB'], stats:{speed:72,shooting:35,passing:62,defending:88,physical:85} }],
    GK: [{ id:'KOR-Jo', name:'赵贤祐', nameEn:'Jo Hyeon-woo', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:74, positions:['GK'], stats:{speed:42,shooting:18,passing:38,defending:52,physical:58} }],
  },
  CZE: {
    ST: [{ id:'CZE-Schick', name:'希克', nameEn:'Patrik Schick', nationality:'CZE', avatar:'/images/players/placeholder.png', rating:82, positions:['ST'], stats:{speed:73,shooting:84,passing:68,defending:30,physical:76} }],
    CM: [{ id:'CZE-Soucek', name:'绍切克', nameEn:'Tomas Soucek', nationality:'CZE', avatar:'/images/players/placeholder.png', rating:81, positions:['CM','CDM'], stats:{speed:62,shooting:68,passing:74,defending:80,physical:84} }],
    CB: [{ id:'CZE-Coufal', name:'曹法尔', nameEn:'Vladimir Coufal', nationality:'CZE', avatar:'/images/players/placeholder.png', rating:78, positions:['RB','CB'], stats:{speed:74,shooting:42,passing:66,defending:78,physical:76} }],
  },
  // --- B组 ---
  CAN: {
    ST: [{ id:'CAN-David', name:'乔纳森·戴维', nameEn:'Jonathan David', nationality:'CAN', avatar:'/images/players/placeholder.png', rating:83, positions:['ST'], stats:{speed:84,shooting:83,passing:70,defending:32,physical:70} }],
    LW: [{ id:'CAN-Davies', name:'阿方索·戴维斯', nameEn:'Alphonso Davies', nationality:'CAN', avatar:'/images/players/placeholder.png', rating:85, positions:['LW','LB','LWB'], stats:{speed:96,shooting:65,passing:74,defending:70,physical:72} }],
    CM: [{ id:'CAN-Eustaquio', name:'欧斯塔基奥', nameEn:'Stephen Eustaquio', nationality:'CAN', avatar:'/images/players/placeholder.png', rating:77, positions:['CM','CDM'], stats:{speed:64,shooting:58,passing:76,defending:72,physical:65} }],
  },
  BIH: {
    ST: [{ id:'BIH-Dzeko', name:'哲科', nameEn:'Edin Dzeko', nationality:'BIH', avatar:'/images/players/placeholder.png', rating:81, positions:['ST'], stats:{speed:55,shooting:85,passing:72,defending:30,physical:78} }],
    CM: [{ id:'BIH-Pjanic', name:'皮亚尼奇', nameEn:'Miralem Pjanic', nationality:'BIH', avatar:'/images/players/placeholder.png', rating:79, positions:['CM','CAM'], stats:{speed:58,shooting:68,passing:86,defending:52,physical:58} }],
  },
  QAT: {
    ST: [{ id:'QAT-Ali', name:'阿尔莫兹·阿里', nameEn:'Almoez Ali', nationality:'QAT', avatar:'/images/players/placeholder.png', rating:72, positions:['ST'], stats:{speed:74,shooting:72,passing:55,defending:25,physical:65} }],
    CM: [{ id:'QAT-Alhaydos', name:'海多斯', nameEn:'Hassan Al-Haydos', nationality:'QAT', avatar:'/images/players/placeholder.png', rating:70, positions:['CAM','CM'], stats:{speed:58,shooting:62,passing:72,defending:40,physical:52} }],
  },
  SUI: {
    ST: [{ id:'SUI-Embolo', name:'恩博洛', nameEn:'Breel Embolo', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:80, positions:['ST'], stats:{speed:84,shooting:78,passing:64,defending:38,physical:82} }],
    CM: [{ id:'SUI-Xhaka', name:'扎卡', nameEn:'Granit Xhaka', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:83, positions:['CM','CDM'], stats:{speed:55,shooting:68,passing:84,defending:76,physical:78} }],
    CB: [{ id:'SUI-Akanji', name:'阿坎吉', nameEn:'Manuel Akanji', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:83, positions:['CB'], stats:{speed:75,shooting:32,passing:70,defending:85,physical:82} }],
    GK: [{ id:'SUI-Sommer', name:'索默', nameEn:'Yann Sommer', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:84, positions:['GK'], stats:{speed:48,shooting:22,passing:52,defending:62,physical:55} }],
  },
  // --- C组 ---
  BRA: {
    GK: [{ id:'BRA-Alisson', name:'阿利松', nameEn:'Alisson Becker', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:89, positions:['GK'], stats:{speed:50,shooting:22,passing:55,defending:65,physical:72} }],
    CB: [{ id:'BRA-Marquinhos', name:'马尔基尼奥斯', nameEn:'Marquinhos', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:86, positions:['CB'], stats:{speed:72,shooting:38,passing:72,defending:88,physical:80} }],
    CM: [{ id:'BRA-Bruno', name:'布鲁诺·吉马良斯', nameEn:'Bruno Guimaraes', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:85, positions:['CM','CDM'], stats:{speed:66,shooting:62,passing:84,defending:78,physical:76} }],
    CAM: [{ id:'BRA-Neymar', name:'内马尔', nameEn:'Neymar Jr', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:88, positions:['CAM','LW'], stats:{speed:85,shooting:84,passing:86,defending:28,physical:55} }],
    LW: [{ id:'BRA-Vinicius', name:'维尼修斯', nameEn:'Vinicius Jr', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:90, positions:['LW','ST'], stats:{speed:94,shooting:84,passing:78,defending:32,physical:68} }],
    RW: [{ id:'BRA-Rodrygo', name:'罗德里戈', nameEn:'Rodrygo', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:84, positions:['RW','ST','LW'], stats:{speed:84,shooting:80,passing:78,defending:35,physical:60} }],
    ST: [{ id:'BRA-Endrick', name:'恩德里克', nameEn:'Endrick', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:78, positions:['ST'], stats:{speed:82,shooting:76,passing:58,defending:22,physical:68} }],
  },
  MAR: {
    ST: [{ id:'MAR-EnNesyri', name:'恩内斯里', nameEn:'Youssef En-Nesyri', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:79, positions:['ST'], stats:{speed:80,shooting:78,passing:55,defending:30,physical:76} }],
    RW: [{ id:'MAR-Hakimi', name:'阿什拉夫', nameEn:'Achraf Hakimi', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:84, positions:['RB','RWB','RM'], stats:{speed:93,shooting:60,passing:74,defending:74,physical:80} }],
    CM: [{ id:'MAR-Amdouni', name:'阿姆杜尼', nameEn:'Amine Amdouni', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:75, positions:['CM','CAM'], stats:{speed:70,shooting:65,passing:74,defending:48,physical:62} }],
  },
  SCO: {
    ST: [{ id:'SCO-Adams', name:'切·亚当斯', nameEn:'Che Adams', nationality:'SCO', avatar:'/images/players/placeholder.png', rating:76, positions:['ST'], stats:{speed:78,shooting:75,passing:62,defending:32,physical:74} }],
    LB: [{ id:'SCO-Robertson', name:'罗伯逊', nameEn:'Andy Robertson', nationality:'SCO', avatar:'/images/players/placeholder.png', rating:84, positions:['LB','LWB'], stats:{speed:84,shooting:48,passing:78,defending:82,physical:78} }],
    CM: [{ id:'SCO-McTominay', name:'麦克托米奈', nameEn:'Scott McTominay', nationality:'SCO', avatar:'/images/players/placeholder.png', rating:80, positions:['CM','CDM'], stats:{speed:66,shooting:72,passing:72,defending:75,physical:82} }],
  },
  JAM: {
    ST: [{ id:'JAM-Antonio', name:'安东尼奥', nameEn:'Michail Antonio', nationality:'JAM', avatar:'/images/players/placeholder.png', rating:78, positions:['ST'], stats:{speed:82,shooting:76,passing:60,defending:38,physical:88} }],
    LW: [{ id:'JAM-Bailey', name:'利昂·贝利', nameEn:'Leon Bailey', nationality:'JAM', avatar:'/images/players/placeholder.png', rating:80, positions:['LW','RW'], stats:{speed:92,shooting:76,passing:70,defending:35,physical:65} }],
  },
  // --- D组 ---
  USA: {
    ST: [{ id:'USA-Pulisic', name:'普利西奇', nameEn:'Christian Pulisic', nationality:'USA', avatar:'/images/players/placeholder.png', rating:84, positions:['LW','RW','CAM'], stats:{speed:86,shooting:78,passing:76,defending:45,physical:62} }],
    CM: [{ id:'USA-McKennie', name:'麦肯尼', nameEn:'Weston McKennie', nationality:'USA', avatar:'/images/players/placeholder.png', rating:80, positions:['CM','CDM'], stats:{speed:70,shooting:65,passing:74,defending:76,physical:80} }],
    GK: [{ id:'USA-Turner', name:'特纳', nameEn:'Matt Turner', nationality:'USA', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:48,shooting:20,passing:42,defending:54,physical:60} }],
    CB: [{ id:'USA-Robinson', name:'安东尼·罗宾逊', nameEn:'Antonee Robinson', nationality:'USA', avatar:'/images/players/placeholder.png', rating:79, positions:['LB'], stats:{speed:90,shooting:38,passing:66,defending:76,physical:74} }],
  },
  PAR: {
    ST: [{ id:'PAR-Almiron', name:'阿尔米隆', nameEn:'Miguel Almiron', nationality:'PAR', avatar:'/images/players/placeholder.png', rating:78, positions:['LW','RW','CAM'], stats:{speed:88,shooting:72,passing:68,defending:40,physical:60} }],
  },
  AUS: {
    ST: [{ id:'AUS-Duke', name:'杜克', nameEn:'Mitchell Duke', nationality:'AUS', avatar:'/images/players/placeholder.png', rating:70, positions:['ST'], stats:{speed:65,shooting:70,passing:52,defending:32,physical:78} }],
    GK: [{ id:'AUS-Ryan', name:'马修·瑞安', nameEn:'Mathew Ryan', nationality:'AUS', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:46,shooting:20,passing:45,defending:55,physical:56} }],
  },
  TUR: {
    ST: [{ id:'TUR-Tosun', name:'托松', nameEn:'Cenk Tosun', nationality:'TUR', avatar:'/images/players/placeholder.png', rating:75, positions:['ST'], stats:{speed:68,shooting:78,passing:58,defending:28,physical:74} }],
    CM: [{ id:'TUR-Calhanoglu', name:'恰尔汗奥卢', nameEn:'Hakan Calhanoglu', nationality:'TUR', avatar:'/images/players/placeholder.png', rating:84, positions:['CM','CAM'], stats:{speed:62,shooting:78,passing:88,defending:55,physical:62} }],
  },
  // --- E组 ---
  GER: {
    GK: [{ id:'GER-Neuer', name:'诺伊尔', nameEn:'Manuel Neuer', nationality:'GER', avatar:'/images/players/placeholder.png', rating:86, positions:['GK'], stats:{speed:52,shooting:25,passing:65,defending:64,physical:72} }],
    CB: [{ id:'GER-Rudiger', name:'吕迪格', nameEn:'Antonio Rudiger', nationality:'GER', avatar:'/images/players/placeholder.png', rating:86, positions:['CB'], stats:{speed:82,shooting:38,passing:66,defending:88,physical:86} }],
    CM: [{ id:'GER-Kimmich', name:'基米希', nameEn:'Joshua Kimmich', nationality:'GER', avatar:'/images/players/placeholder.png', rating:86, positions:['CDM','CM','RB'], stats:{speed:66,shooting:62,passing:86,defending:82,physical:74} }],
    CAM: [{ id:'GER-Musiala', name:'穆西亚拉', nameEn:'Jamal Musiala', nationality:'GER', avatar:'/images/players/placeholder.png', rating:88, positions:['CAM','LW','CM'], stats:{speed:84,shooting:78,passing:82,defending:42,physical:58} }],
    ST: [{ id:'GER-Havertz', name:'哈弗茨', nameEn:'Kai Havertz', nationality:'GER', avatar:'/images/players/placeholder.png', rating:83, positions:['ST','CAM'], stats:{speed:74,shooting:80,passing:76,defending:42,physical:68} }],
    RW: [{ id:'GER-Sane', name:'萨内', nameEn:'Leroy Sane', nationality:'GER', avatar:'/images/players/placeholder.png', rating:84, positions:['LW','RW'], stats:{speed:92,shooting:78,passing:76,defending:38,physical:70} }],
  },
  CUW: {
    ST: [{ id:'CUW-Zivkovic', name:'日夫科维奇', nameEn:'Richairo Zivkovic', nationality:'CUW', avatar:'/images/players/placeholder.png', rating:68, positions:['ST'], stats:{speed:80,shooting:65,passing:48,defending:22,physical:65} }],
  },
  CIV: {
    ST: [{ id:'CIV-Haller', name:'阿莱', nameEn:'Sebastien Haller', nationality:'CIV', avatar:'/images/players/placeholder.png', rating:81, positions:['ST'], stats:{speed:72,shooting:82,passing:65,defending:35,physical:82} }],
    CM: [{ id:'CIV-Kessie', name:'凯西', nameEn:'Franck Kessie', nationality:'CIV', avatar:'/images/players/placeholder.png', rating:82, positions:['CM','CDM'], stats:{speed:68,shooting:65,passing:72,defending:80,physical:86} }],
    CB: [{ id:'CIV-Boly', name:'博利', nameEn:'Willy Boly', nationality:'CIV', avatar:'/images/players/placeholder.png', rating:78, positions:['CB'], stats:{speed:58,shooting:32,passing:55,defending:82,physical:84} }],
  },
  ECU: {
    ST: [{ id:'ECU-Estupinan', name:'埃斯图皮尼安', nameEn:'Pervis Estupinan', nationality:'ECU', avatar:'/images/players/placeholder.png', rating:82, positions:['LB','LWB'], stats:{speed:84,shooting:52,passing:72,defending:80,physical:78} }],
    CM: [{ id:'ECU-Caicedo', name:'凯塞多', nameEn:'Moises Caicedo', nationality:'ECU', avatar:'/images/players/placeholder.png', rating:83, positions:['CDM','CM'], stats:{speed:68,shooting:55,passing:74,defending:84,physical:78} }],
  },
  // --- F组 ---
  NED: {
    GK: [{ id:'NED-Verbruggen', name:'维尔布鲁根', nameEn:'Bart Verbruggen', nationality:'NED', avatar:'/images/players/placeholder.png', rating:78, positions:['GK'], stats:{speed:48,shooting:20,passing:48,defending:58,physical:62} }],
    CB: [{ id:'NED-VanDijk', name:'范戴克', nameEn:'Virgil van Dijk', nationality:'NED', avatar:'/images/players/placeholder.png', rating:90, positions:['CB'], stats:{speed:76,shooting:48,passing:72,defending:92,physical:88} }],
    CM: [{ id:'NED-DeJong', name:'弗兰基·德容', nameEn:'Frenkie de Jong', nationality:'NED', avatar:'/images/players/placeholder.png', rating:85, positions:['CM','CDM'], stats:{speed:74,shooting:55,passing:88,defending:72,physical:66} }],
    ST: [{ id:'NED-Depay', name:'德佩', nameEn:'Memphis Depay', nationality:'NED', avatar:'/images/players/placeholder.png', rating:82, positions:['ST','LW'], stats:{speed:80,shooting:82,passing:74,defending:28,physical:72} }],
    RW: [{ id:'NED-Gakpo', name:'加克波', nameEn:'Cody Gakpo', nationality:'NED', avatar:'/images/players/placeholder.png', rating:84, positions:['LW','ST','RW'], stats:{speed:84,shooting:82,passing:76,defending:38,physical:74} }],
  },
  JPN: {
    ST: [{ id:'JPN-Mitoma', name:'三笘薰', nameEn:'Kaoru Mitoma', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:83, positions:['LW','RW'], stats:{speed:88,shooting:74,passing:76,defending:48,physical:62} }],
    CM: [{ id:'JPN-Endo', name:'远藤航', nameEn:'Wataru Endo', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:80, positions:['CDM','CM'], stats:{speed:62,shooting:52,passing:72,defending:84,physical:78} }],
    CAM: [{ id:'JPN-Kubo', name:'久保建英', nameEn:'Takefusa Kubo', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:80, positions:['CAM','RW','LW'], stats:{speed:78,shooting:72,passing:82,defending:35,physical:52} }],
    CB: [{ id:'JPN-Tomiyasu', name:'富安健洋', nameEn:'Takehiro Tomiyasu', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:80, positions:['CB','RB'], stats:{speed:70,shooting:32,passing:62,defending:84,physical:78} }],
  },
  SWE: {
    ST: [{ id:'SWE-Isak', name:'伊萨克', nameEn:'Alexander Isak', nationality:'SWE', avatar:'/images/players/placeholder.png', rating:85, positions:['ST','LW'], stats:{speed:88,shooting:84,passing:72,defending:28,physical:74} }],
    CM: [{ id:'SWE-Kulusevski', name:'库卢塞夫斯基', nameEn:'Dejan Kulusevski', nationality:'SWE', avatar:'/images/players/placeholder.png', rating:83, positions:['RW','CAM','CM'], stats:{speed:80,shooting:76,passing:80,defending:45,physical:76} }],
    CB: [{ id:'SWE-Lindelof', name:'林德洛夫', nameEn:'Victor Lindelof', nationality:'SWE', avatar:'/images/players/placeholder.png', rating:79, positions:['CB'], stats:{speed:62,shooting:30,passing:66,defending:82,physical:74} }],
  },
  TUN: {
    ST: [{ id:'TUN-Msakni', name:'姆萨克尼', nameEn:'Youssef Msakni', nationality:'TUN', avatar:'/images/players/placeholder.png', rating:72, positions:['ST','LW'], stats:{speed:74,shooting:70,passing:62,defending:30,physical:58} }],
    CM: [{ id:'TUN-Skhiri', name:'斯希里', nameEn:'Ellyes Skhiri', nationality:'TUN', avatar:'/images/players/placeholder.png', rating:77, positions:['CDM','CM'], stats:{speed:62,shooting:52,passing:70,defending:78,physical:76} }],
  },
  // --- G组 ---
  BEL: {
    GK: [{ id:'BEL-Courtois', name:'库尔图瓦', nameEn:'Thibaut Courtois', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:89, positions:['GK'], stats:{speed:48,shooting:20,passing:48,defending:68,physical:74} }],
    CM: [{ id:'BEL-DeBruyne', name:'德布劳内', nameEn:'Kevin De Bruyne', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:91, positions:['CM','CAM'], stats:{speed:68,shooting:84,passing:94,defending:48,physical:72} }],
    ST: [{ id:'BEL-Lukaku', name:'卢卡库', nameEn:'Romelu Lukaku', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:85, positions:['ST'], stats:{speed:78,shooting:86,passing:66,defending:32,physical:90} }],
    LW: [{ id:'BEL-Doku', name:'多库', nameEn:'Jeremy Doku', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:82, positions:['LW','RW'], stats:{speed:94,shooting:68,passing:74,defending:32,physical:62} }],
  },
  EGY: {
    ST: [{ id:'EGY-Salah', name:'萨拉赫', nameEn:'Mohamed Salah', nationality:'EGY', avatar:'/images/players/placeholder.png', rating:90, positions:['RW','ST'], stats:{speed:90,shooting:90,passing:80,defending:38,physical:76} }],
    CM: [{ id:'EGY-Elneny', name:'埃尔内尼', nameEn:'Mohamed Elneny', nationality:'EGY', avatar:'/images/players/placeholder.png', rating:74, positions:['CDM','CM'], stats:{speed:55,shooting:48,passing:70,defending:74,physical:68} }],
  },
  IRN: {
    ST: [
      { id:'IRN-Taremi', name:'塔雷米', nameEn:'Mehdi Taremi', nationality:'IRN', avatar:'/images/players/placeholder.png', rating:80, positions:['ST'], stats:{speed:74,shooting:82,passing:68,defending:35,physical:76} },
      { id:'IRN-Azmoun', name:'阿兹蒙', nameEn:'Sardar Azmoun', nationality:'IRN', avatar:'/images/players/placeholder.png', rating:78, positions:['ST'], stats:{speed:80,shooting:78,passing:60,defending:30,physical:72} },
    ],
  },
  NZL: {
    ST: [{ id:'NZL-Wood', name:'克里斯·伍德', nameEn:'Chris Wood', nationality:'NZL', avatar:'/images/players/placeholder.png', rating:78, positions:['ST'], stats:{speed:58,shooting:80,passing:55,defending:35,physical:84} }],
    CB: [{ id:'NZL-Reid', name:'温斯顿·里德', nameEn:'Winston Reid', nationality:'NZL', avatar:'/images/players/placeholder.png', rating:70, positions:['CB'], stats:{speed:48,shooting:30,passing:48,defending:74,physical:76} }],
  },
  // --- H组 ---
  ESP: {
    GK: [{ id:'ESP-Simon', name:'乌奈·西蒙', nameEn:'Unai Simon', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:83, positions:['GK'], stats:{speed:50,shooting:20,passing:58,defending:62,physical:62} }],
    CM: [{ id:'ESP-Rodri', name:'罗德里', nameEn:'Rodri', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:91, positions:['CDM','CM'], stats:{speed:62,shooting:72,passing:88,defending:90,physical:82} }],
    CAM: [{ id:'ESP-Pedri', name:'佩德里', nameEn:'Pedri', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:86, positions:['CM','CAM'], stats:{speed:72,shooting:62,passing:88,defending:58,physical:55} }],
    ST: [{ id:'ESP-Morata', name:'莫拉塔', nameEn:'Alvaro Morata', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:83, positions:['ST'], stats:{speed:78,shooting:84,passing:66,defending:30,physical:74} }],
    LW: [{ id:'ESP-Williams', name:'尼科·威廉姆斯', nameEn:'Nico Williams', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:83, positions:['LW','RW'], stats:{speed:92,shooting:73,passing:72,defending:35,physical:62} }],
    RW: [{ id:'ESP-Yamal', name:'亚马尔', nameEn:'Lamine Yamal', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:84, positions:['RW','LW'], stats:{speed:88,shooting:76,passing:80,defending:28,physical:55} }],
  },
  CPV: {
    ST: [{ id:'CPV-Tavares', name:'塔瓦雷斯', nameEn:'Julio Tavares', nationality:'CPV', avatar:'/images/players/placeholder.png', rating:65, positions:['ST'], stats:{speed:62,shooting:65,passing:45,defending:22,physical:68} }],
  },
  KSA: {
    ST: [{ id:'KSA-AlDawsari', name:'萨勒姆·达瓦萨里', nameEn:'Salem Al-Dawsari', nationality:'KSA', avatar:'/images/players/placeholder.png', rating:74, positions:['LW','RW'], stats:{speed:78,shooting:70,passing:64,defending:35,physical:58} }],
    CM: [{ id:'KSA-Kanno', name:'卡诺', nameEn:'Mohamed Kanno', nationality:'KSA', avatar:'/images/players/placeholder.png', rating:68, positions:['CM','CDM'], stats:{speed:58,shooting:48,passing:62,defending:68,physical:72} }],
  },
  URU: {
    ST: [{ id:'URU-Nunez', name:'努涅斯', nameEn:'Darwin Nunez', nationality:'URU', avatar:'/images/players/placeholder.png', rating:83, positions:['ST','LW'], stats:{speed:88,shooting:82,passing:64,defending:32,physical:84} }],
    CM: [{ id:'URU-Valverde', name:'巴尔韦德', nameEn:'Federico Valverde', nationality:'URU', avatar:'/images/players/placeholder.png', rating:87, positions:['CM','RM','RW'], stats:{speed:82,shooting:80,passing:82,defending:74,physical:84} }],
    CB: [{ id:'URU-Araujo', name:'阿劳霍', nameEn:'Ronald Araujo', nationality:'URU', avatar:'/images/players/placeholder.png', rating:84, positions:['CB'], stats:{speed:78,shooting:32,passing:58,defending:88,physical:86} }],
  },
  // --- I组 ---
  FRA: {
    ST: [{ id:'FRA-Mbappe', name:'姆巴佩', nameEn:'Kylian Mbappe', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:91, positions:['ST','LW','RW'], stats:{speed:97,shooting:88,passing:80,defending:36,physical:78} }],
    CM: [{ id:'FRA-Tchouameni', name:'楚阿梅尼', nameEn:'Aurelien Tchouameni', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:84, positions:['CDM','CM'], stats:{speed:68,shooting:62,passing:78,defending:84,physical:82} }],
    CB: [{ id:'FRA-Saliba', name:'萨利巴', nameEn:'William Saliba', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:85, positions:['CB'], stats:{speed:76,shooting:28,passing:68,defending:88,physical:84} }],
    LW: [{ id:'FRA-Barcola', name:'巴尔科拉', nameEn:'Bradley Barcola', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:81, positions:['LW','RW'], stats:{speed:90,shooting:72,passing:70,defending:35,physical:60} }],
    GK: [{ id:'FRA-Maignan', name:'迈尼昂', nameEn:'Mike Maignan', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:88, positions:['GK'], stats:{speed:48,shooting:18,passing:48,defending:66,physical:70} }],
  },
  NOR: {
    ST: [{ id:'NOR-Haaland', name:'哈兰德', nameEn:'Erling Haaland', nationality:'NOR', avatar:'/images/players/placeholder.png', rating:92, positions:['ST'], stats:{speed:88,shooting:94,passing:66,defending:28,physical:92} }],
    CM: [{ id:'NOR-Odegaard', name:'厄德高', nameEn:'Martin Odegaard', nationality:'NOR', avatar:'/images/players/placeholder.png', rating:88, positions:['CAM','CM'], stats:{speed:68,shooting:76,passing:90,defending:48,physical:58} }],
    RW: [{ id:'NOR-Bobb', name:'博布', nameEn:'Oscar Bobb', nationality:'NOR', avatar:'/images/players/placeholder.png', rating:76, positions:['RW','LW'], stats:{speed:78,shooting:65,passing:72,defending:32,physical:55} }],
  },
  SEN: {
    ST: [{ id:'SEN-Mane', name:'马内', nameEn:'Sadio Mane', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:86, positions:['LW','ST','RW'], stats:{speed:88,shooting:84,passing:76,defending:42,physical:74} }],
    CM: [{ id:'SEN-Gueye', name:'盖耶', nameEn:'Idrissa Gueye', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:80, positions:['CDM','CM'], stats:{speed:64,shooting:48,passing:70,defending:84,physical:74} }],
    CB: [{ id:'SEN-Koulibaly', name:'库利巴利', nameEn:'Kalidou Koulibaly', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:84, positions:['CB'], stats:{speed:68,shooting:30,passing:58,defending:88,physical:86} }],
    GK: [{ id:'SEN-Mendy', name:'爱德华·门迪', nameEn:'Edouard Mendy', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:82, positions:['GK'], stats:{speed:46,shooting:18,passing:40,defending:58,physical:68} }],
  },
  PER: {
    ST: [{ id:'PER-Lapadula', name:'拉帕杜拉', nameEn:'Gianluca Lapadula', nationality:'PER', avatar:'/images/players/placeholder.png', rating:74, positions:['ST'], stats:{speed:70,shooting:75,passing:55,defending:28,physical:70} }],
  },
  // --- J组 ---
  ARG: {
    ST: [
      { id:'ARG-Messi', name:'梅西', nameEn:'Lionel Messi', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:91, positions:['RW','CAM','ST'], stats:{speed:78,shooting:92,passing:92,defending:32,physical:62} },
      { id:'ARG-Alvarez', name:'胡利安·阿尔瓦雷斯', nameEn:'Julian Alvarez', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:85, positions:['ST','LW'], stats:{speed:82,shooting:85,passing:72,defending:42,physical:72} },
    ],
    CM: [{ id:'ARG-MacAllister', name:'麦卡利斯特', nameEn:'Alexis Mac Allister', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:83, positions:['CM','CAM'], stats:{speed:64,shooting:68,passing:84,defending:66,physical:68} }],
    CB: [{ id:'ARG-Romero', name:'克里斯蒂安·罗梅罗', nameEn:'Cristian Romero', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:84, positions:['CB'], stats:{speed:68,shooting:30,passing:58,defending:88,physical:84} }],
    GK: [{ id:'ARG-Martinez', name:'埃米利亚诺·马丁内斯', nameEn:'Emiliano Martinez', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:86, positions:['GK'], stats:{speed:48,shooting:18,passing:44,defending:64,physical:70} }],
  },
  ALG: {
    ST: [{ id:'ALG-Mahrez', name:'马赫雷斯', nameEn:'Riyad Mahrez', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:84, positions:['RW','CAM'], stats:{speed:78,shooting:80,passing:84,defending:35,physical:62} }],
    CM: [{ id:'ALG-Bennacer', name:'本纳赛尔', nameEn:'Ismael Bennacer', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:80, positions:['CM','CDM'], stats:{speed:64,shooting:55,passing:80,defending:74,physical:62} }],
  },
  AUT: {
    ST: [{ id:'AUT-Sabitzer', name:'萨比策', nameEn:'Marcel Sabitzer', nationality:'AUT', avatar:'/images/players/placeholder.png', rating:80, positions:['CM','CAM'], stats:{speed:68,shooting:74,passing:76,defending:58,physical:68} }],
    CB: [{ id:'AUT-Alaba', name:'阿拉巴', nameEn:'David Alaba', nationality:'AUT', avatar:'/images/players/placeholder.png', rating:84, positions:['CB','LB','CDM'], stats:{speed:78,shooting:55,passing:78,defending:84,physical:74} }],
  },
  JOR: {
    ST: [{ id:'JOR-AlTamari', name:'塔马里', nameEn:'Musa Al-Tamari', nationality:'JOR', avatar:'/images/players/placeholder.png', rating:72, positions:['RW','LW'], stats:{speed:82,shooting:68,passing:60,defending:30,physical:58} }],
  },
  // --- K组 ---
  COL: {
    ST: [{ id:'COL-Diaz', name:'路易斯·迪亚斯', nameEn:'Luis Diaz', nationality:'COL', avatar:'/images/players/placeholder.png', rating:85, positions:['LW','ST'], stats:{speed:92,shooting:80,passing:72,defending:40,physical:68} }],
    CM: [{ id:'COL-James', name:'哈梅斯·罗德里格斯', nameEn:'James Rodriguez', nationality:'COL', avatar:'/images/players/placeholder.png', rating:82, positions:['CAM','CM'], stats:{speed:58,shooting:82,passing:86,defending:40,physical:60} }],
  },
  POR: {
    ST: [{ id:'POR-Ronaldo', name:'C罗', nameEn:'Cristiano Ronaldo', nationality:'POR', avatar:'/images/players/placeholder.png', rating:89, positions:['ST','LW'], stats:{speed:82,shooting:93,passing:78,defending:32,physical:76} }],
    CM: [{ id:'POR-Fernandes', name:'B费', nameEn:'Bruno Fernandes', nationality:'POR', avatar:'/images/players/placeholder.png', rating:88, positions:['CAM','CM'], stats:{speed:68,shooting:84,passing:88,defending:55,physical:70} }],
    LW: [{ id:'POR-Leao', name:'莱奥', nameEn:'Rafael Leao', nationality:'POR', avatar:'/images/players/placeholder.png', rating:84, positions:['LW','ST'], stats:{speed:93,shooting:78,passing:72,defending:28,physical:74} }],
    CB: [{ id:'POR-Dias', name:'鲁本·迪亚斯', nameEn:'Ruben Dias', nationality:'POR', avatar:'/images/players/placeholder.png', rating:87, positions:['CB'], stats:{speed:68,shooting:35,passing:64,defending:90,physical:84} }],
    GK: [{ id:'POR-Costa', name:'迪奥戈·科斯塔', nameEn:'Diogo Costa', nationality:'POR', avatar:'/images/players/placeholder.png', rating:82, positions:['GK'], stats:{speed:48,shooting:18,passing:50,defending:60,physical:64} }],
  },
  NGA: {
    ST: [{ id:'NGA-Osimhen', name:'奥斯梅恩', nameEn:'Victor Osimhen', nationality:'NGA', avatar:'/images/players/placeholder.png', rating:87, positions:['ST'], stats:{speed:88,shooting:86,passing:64,defending:32,physical:84} }],
    LW: [{ id:'NGA-Lookman', name:'卢克曼', nameEn:'Ademola Lookman', nationality:'NGA', avatar:'/images/players/placeholder.png', rating:81, positions:['LW','ST','RW'], stats:{speed:86,shooting:76,passing:68,defending:32,physical:65} }],
    CM: [{ id:'NGA-Ndidi', name:'恩迪迪', nameEn:'Wilfred Ndidi', nationality:'NGA', avatar:'/images/players/placeholder.png', rating:80, positions:['CDM','CM'], stats:{speed:64,shooting:48,passing:66,defending:84,physical:82} }],
  },
  UAE: {
    ST: [{ id:'UAE-Caio', name:'卡约', nameEn:'Caio Canedo', nationality:'UAE', avatar:'/images/players/placeholder.png', rating:68, positions:['ST'], stats:{speed:72,shooting:66,passing:50,defending:22,physical:62} }],
  },
  // --- L组 ---
  ENG: {
    ST: [{ id:'ENG-Kane', name:'凯恩', nameEn:'Harry Kane', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:91, positions:['ST'], stats:{speed:70,shooting:93,passing:80,defending:40,physical:82} }],
    CM: [
      { id:'ENG-Bellingham', name:'贝林厄姆', nameEn:'Jude Bellingham', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:89, positions:['CAM','CM'], stats:{speed:78,shooting:80,passing:84,defending:70,physical:80} },
      { id:'ENG-Rice', name:'赖斯', nameEn:'Declan Rice', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:86, positions:['CDM','CM'], stats:{speed:70,shooting:62,passing:78,defending:86,physical:82} },
    ],
    RW: [{ id:'ENG-Saka', name:'萨卡', nameEn:'Bukayo Saka', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:86, positions:['RW','LW'], stats:{speed:86,shooting:80,passing:78,defending:52,physical:66} }],
    CB: [{ id:'ENG-Stones', name:'斯通斯', nameEn:'John Stones', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:83, positions:['CB'], stats:{speed:62,shooting:35,passing:72,defending:85,physical:76} }],
    GK: [{ id:'ENG-Pickford', name:'皮克福德', nameEn:'Jordan Pickford', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:83, positions:['GK'], stats:{speed:48,shooting:22,passing:52,defending:60,physical:62} }],
  },
  CRO: {
    CM: [
      { id:'CRO-Modric', name:'莫德里奇', nameEn:'Luka Modric', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:87, positions:['CM','CAM'], stats:{speed:58,shooting:76,passing:92,defending:62,physical:58} },
      { id:'CRO-Kovacic', name:'科瓦契奇', nameEn:'Mateo Kovacic', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:82, positions:['CM','CDM'], stats:{speed:72,shooting:55,passing:82,defending:68,physical:65} },
    ],
    CB: [{ id:'CRO-Gvardiol', name:'格瓦迪奥尔', nameEn:'Josko Gvardiol', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:84, positions:['CB','LB'], stats:{speed:76,shooting:42,passing:68,defending:86,physical:82} }],
  },
  GHA: {
    ST: [{ id:'GHA-Kudus', name:'库杜斯', nameEn:'Mohammed Kudus', nationality:'GHA', avatar:'/images/players/placeholder.png', rating:82, positions:['CAM','RW','CM'], stats:{speed:80,shooting:76,passing:74,defending:48,physical:68} }],
    CM: [{ id:'GHA-Partey', name:'托马斯·帕尔特伊', nameEn:'Thomas Partey', nationality:'GHA', avatar:'/images/players/placeholder.png', rating:82, positions:['CDM','CM'], stats:{speed:62,shooting:62,passing:76,defending:82,physical:78} }],
  },
  PAN: {
    ST: [{ id:'PAN-Diaz', name:'伊斯梅尔·迪亚斯', nameEn:'Ismael Diaz', nationality:'PAN', avatar:'/images/players/placeholder.png', rating:68, positions:['ST'], stats:{speed:76,shooting:66,passing:48,defending:25,physical:65} }],
  },
}

// ============================================================
// 根据国家 tier 生成球员的属性基准
// ============================================================
const TIER_STATS: Record<number, { ratingRange: [number,number]; statsBase: Player['stats'] }> = {
  1: { ratingRange: [78,92], statsBase: {speed:72,shooting:70,passing:72,defending:55,physical:68} },
  2: { ratingRange: [72,86], statsBase: {speed:68,shooting:66,passing:66,defending:55,physical:66} },
  3: { ratingRange: [60,78], statsBase: {speed:64,shooting:60,passing:60,defending:52,physical:62} },
  4: { ratingRange: [50,70], statsBase: {speed:58,shooting:52,passing:50,defending:48,physical:56} },
}

// 各位置的能力偏移
const POSITION_VARIANCE: Partial<Record<Position, Partial<Player['stats']>>> = {
  GK: { speed: -30, shooting: -55, passing: -30, defending: 15, physical: 0 },
  CB: { speed: -10, shooting: -40, passing: -10, defending: 20, physical: 10 },
  LB: { speed: 10, shooting: -25, passing: 5, defending: 10, physical: 2 },
  RB: { speed: 10, shooting: -25, passing: 5, defending: 10, physical: 2 },
  LWB: { speed: 15, shooting: -20, passing: 8, defending: 5, physical: 5 },
  RWB: { speed: 15, shooting: -20, passing: 8, defending: 5, physical: 5 },
  CDM: { speed: -5, shooting: -20, passing: 5, defending: 20, physical: 10 },
  CM: { speed: 0, shooting: -5, passing: 10, defending: 5, physical: 2 },
  CAM: { speed: 5, shooting: 10, passing: 12, defending: -10, physical: -10 },
  LM: { speed: 10, shooting: -5, passing: 5, defending: -5, physical: -2 },
  RM: { speed: 10, shooting: -5, passing: 5, defending: -5, physical: -2 },
  LW: { speed: 15, shooting: 5, passing: 5, defending: -15, physical: -5 },
  RW: { speed: 15, shooting: 5, passing: 5, defending: -15, physical: -5 },
  ST: { speed: 5, shooting: 20, passing: -5, defending: -20, physical: 5 },
}

// 常见姓氏生成池
const LAST_NAMES = [
  'Silva','Santos','Costa','Pereira','Fernandes','Garcia','Lopez','Martinez','Gonzalez','Rodriguez',
  'Kim','Park','Lee','Choi','Jung','Kang','Cho','Yoon','Zhang','Wang',
  'Mueller','Schmidt','Weber','Fischer','Wagner','Becker','Hoffmann','Schaefer','Koch','Bauer',
  'Johnson','Williams','Brown','Jones','Miller','Davis','Wilson','Moore','Taylor','Anderson',
  'Diallo','Traore','Toure','Keita','Coulibaly','Kone','Sissoko','Fofana','Sangare','Doumbia',
  'Suzuki','Tanaka','Yamamoto','Watanabe','Ito','Sato','Takahashi','Kobayashi','Nakamura','Kato',
]

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v))
}

/** 生成一个占位球员 */
function generatePlayer(countryId: string, position: Position, index: number): Player {
  const team = allTeams.find(t => t.id === countryId)
  const tier = team?.tier || 3
  const base = TIER_STATS[tier]
  const variance = POSITION_VARIANCE[position] || {}
  const rating = randomInt(base.ratingRange[0], base.ratingRange[1])

  const stats: Player['stats'] = {
    speed: clamp(base.statsBase.speed + (variance.speed || 0) + randomInt(-8, 8), 20, 99),
    shooting: clamp(base.statsBase.shooting + (variance.shooting || 0) + randomInt(-8, 8), 10, 99),
    passing: clamp(base.statsBase.passing + (variance.passing || 0) + randomInt(-8, 8), 15, 99),
    defending: clamp(base.statsBase.defending + (variance.defending || 0) + randomInt(-8, 8), 10, 99),
    physical: clamp(base.statsBase.physical + (variance.physical || 0) + randomInt(-8, 8), 20, 99),
  }

  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]
  const countryName = team?.name || countryId

  return {
    id: `${countryId}-GEN-${position}-${index}`,
    name: `${countryName}${lastName}`,
    nameEn: `${lastName} #${index + 1}`,
    nationality: countryId,
    avatar: '/images/players/placeholder.png',
    rating,
    positions: [position],
    stats,
  }
}

/** 主导出: 获取某国某位置的全部球员 (真实+填充) */
export function getPlayers(countryId: string, position: Position): Player[] {
  const countryData = REAL_PLAYERS[countryId] || {}
  // 获取该位置的真实球员
  const positionPlayers = countryData[position] || []
  // 获取所有该位置兼容的真实球员 (如 ST 也可以出现在 LW 位置)
  const compatibleReal: Player[] = [...positionPlayers]
  if (position !== 'GK') {
    // 从其他位置补充能踢此位置的球员
    for (const [pos, players] of Object.entries(countryData)) {
      if (pos === position) continue
      for (const p of (players as Player[])) {
        if (p.positions.some(pp => pp === position) && !compatibleReal.find(r => r.id === p.id)) {
          compatibleReal.push(p)
        }
      }
    }
  }

  // 如果真实球员 >= 3 个，直接返回
  if (compatibleReal.length >= 3) return compatibleReal.slice(0, 6)

  // 否则用生成器补充到至少 4 个
  const team = allTeams.find(t => t.id === countryId)
  const tier = team?.tier || 3
  const fillCount = tier <= 2 ? 4 : 3  // 强队多补几个

  const result = [...compatibleReal]
  while (result.length < fillCount + compatibleReal.length) {
    result.push(generatePlayer(countryId, position, result.length))
  }
  return result
}
