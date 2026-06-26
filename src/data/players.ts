import type { Player, Position } from '@/types'

// ============================================================
// 真实球员数据库 (全部真实姓名，覆盖 48+ 国，1000+ 球员)
// 键: 国家id (3字母), 值: 按位置分组的球员数组
// 所有球员均使用真实姓名，头像统一使用占位图
// 评分范围: 强队核心 85-91, 主力 80-84, 轮换 75-79, 替补 70-74, 弱队 60-70
// ============================================================
const REAL_PLAYERS: Record<string, Partial<Record<Position, Player[]>>> = {

ALG: {
  GK: [
    { id:'ALG-Mandrea', name:'曼德雷亚', nameEn:'Alex Mandrea', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:44,shooting:16,passing:42,defending:54,physical:60} },
    { id:'ALG-Oukidja', name:'乌基贾', nameEn:'Alexandre Oukidja', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:75, positions:['GK'], stats:{speed:42,shooting:14,passing:40,defending:52,physical:58} },
  ],
  CB: [
    { id:'ALG-Mandi', name:'曼迪', nameEn:'Aissa Mandi', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:78, positions:['CB','RB'], stats:{speed:62,shooting:35,passing:62,defending:82,physical:78} },
    { id:'ALG-Bensebaini', name:'本塞拜尼', nameEn:'Ramy Bensebaini', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:80, positions:['LB','CB'], stats:{speed:76,shooting:55,passing:66,defending:80,physical:76} },
    { id:'ALG-Atal', name:'阿塔尔', nameEn:'Youcef Atal', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:78, positions:['RB','RM'], stats:{speed:86,shooting:55,passing:66,defending:76,physical:70} },
    { id:'ALG-Touba', name:'图巴', nameEn:'Ahmed Touba', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:74, positions:['CB'], stats:{speed:58,shooting:30,passing:55,defending:78,physical:76} },
  ],
  CM: [
    { id:'ALG-Bentaleb', name:'本塔勒布', nameEn:'Nabil Bentaleb', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CDM'], stats:{speed:60,shooting:58,passing:72,defending:72,physical:72} },
    { id:'ALG-Feghouli', name:'费古利', nameEn:'Sofiane Feghouli', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:78, positions:['RW','CM'], stats:{speed:78,shooting:68,passing:72,defending:48,physical:64} },
    { id:'ALG-Zerrouki', name:'泽鲁基', nameEn:'Ramiz Zerrouki', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:75, positions:['CM','CDM'], stats:{speed:62,shooting:52,passing:68,defending:68,physical:66} },
    { id:'ALG-Aouar', name:'奥亚尔', nameEn:'Houssem Aouar', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:82, positions:['CM','CAM'], stats:{speed:76,shooting:72,passing:80,defending:48,physical:62} },
  ],
  LW: [
    { id:'ALG-Brahimi', name:'布拉希米', nameEn:'Yacine Brahimi', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:79, positions:['LW','CAM'], stats:{speed:78,shooting:72,passing:74,defending:35,physical:58} },
    { id:'ALG-Gouiri', name:'古伊里', nameEn:'Amine Gouiri', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:80, positions:['ST','LW'], stats:{speed:78,shooting:76,passing:70,defending:38,physical:64} },
    { id:'ALG-Chaibi', name:'沙伊比', nameEn:'Farouk Chaibi', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:74, positions:['LW','RW'], stats:{speed:80,shooting:65,passing:62,defending:32,physical:55} },
  ],
  ST: [
    { id:'ALG-Slimani', name:'斯利马尼', nameEn:'Islam Slimani', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:78, positions:['ST'], stats:{speed:66,shooting:80,passing:52,defending:28,physical:82} },
    { id:'ALG-Sayoud', name:'赛尤德', nameEn:'Andre Sayoud', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:73, positions:['ST'], stats:{speed:68,shooting:72,passing:50,defending:25,physical:70} },
    { id:'ALG-Mahrez', name:'马赫雷斯', nameEn:'Riyad Mahrez', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:85, positions:['RW','CAM'], stats:{speed:80,shooting:80,passing:84,defending:38,physical:58} },
  ],
},

ARG: {
  GK: [
    { id:'ARG-EMartinez', name:'E·马丁内斯', nameEn:'Emiliano Martinez', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:86, positions:['GK'], stats:{speed:48,shooting:20,passing:50,defending:60,physical:68} },
    { id:'ARG-JuanMusso', name:'穆索', nameEn:'Juan Musso', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:80, positions:['GK'], stats:{speed:46,shooting:18,passing:46,defending:56,physical:62} },
    { id:'ARG-Rulli', name:'鲁利', nameEn:'Gerónimo Rulli', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:78, positions:['GK'], stats:{speed:44,shooting:16,passing:44,defending:55,physical:62} },
  ],
  CB: [
    { id:'ARG-RomeroC', name:'C·罗梅罗', nameEn:'Cristian Romero', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:84, positions:['CB'], stats:{speed:72,shooting:38,passing:64,defending:90,physical:82} },
    { id:'ARG-Otamendi', name:'奥塔门迪', nameEn:'Nicolas Otamendi', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:82, positions:['CB'], stats:{speed:60,shooting:38,passing:62,defending:86,physical:82} },
    { id:'ARG-Lisandro', name:'利桑德罗', nameEn:'Lisandro Martinez', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:84, positions:['CB','LB'], stats:{speed:70,shooting:38,passing:68,defending:86,physical:78} },
    { id:'ARG-Balerdi', name:'巴莱尔迪', nameEn:'Leonardo Balerdi', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:78, positions:['CB'], stats:{speed:64,shooting:35,passing:62,defending:80,physical:78} },
  ],
  LB: [
    { id:'ARG-Tagliafico', name:'塔利亚菲科', nameEn:'Nicolas Tagliafico', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:80, positions:['LB','LM'], stats:{speed:74,shooting:48,passing:66,defending:80,physical:76} },
    { id:'ARG-Acuna', name:'阿库尼亚', nameEn:'Marcos Acuna', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:78, positions:['LB','LM'], stats:{speed:78,shooting:55,passing:72,defending:72,physical:70} },
    { id:'ARG-Medina', name:'梅迪纳', nameEn:'Facundo Medina', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:78, positions:['CB','LB'], stats:{speed:68,shooting:35,passing:60,defending:80,physical:76} },
  ],
  RB: [
    { id:'ARG-Molina', name:'莫利纳', nameEn:'Nahuel Molina', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:82, positions:['RB','RWB'], stats:{speed:82,shooting:42,passing:68,defending:78,physical:72} },
    { id:'ARG-Montiel', name:'蒙铁尔', nameEn:'Gonzalo Montiel', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:79, positions:['RB'], stats:{speed:76,shooting:42,passing:64,defending:78,physical:74} },
  ],
  CM: [
    { id:'ARG-DePaul', name:'德保罗', nameEn:'Rodrigo De Paul', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:84, positions:['CM','RM'], stats:{speed:74,shooting:72,passing:82,defending:68,physical:72} },
    { id:'ARG-MacAllister', name:'麦卡利斯特', nameEn:'Alexis Mac Allister', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:83, positions:['CM','CAM'], stats:{speed:70,shooting:72,passing:80,defending:62,physical:66} },
    { id:'ARG-FernandezE', name:'E·费尔南德斯', nameEn:'Enzo Fernandez', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:85, positions:['CM','CAM'], stats:{speed:68,shooting:68,passing:82,defending:65,physical:66} },
    { id:'ARG-LoCelso', name:'洛塞尔索', nameEn:'Giovani Lo Celso', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:82, positions:['CM','CAM'], stats:{speed:66,shooting:68,passing:78,defending:52,physical:60} },
    { id:'ARG-Paredes', name:'帕雷德斯', nameEn:'Leandro Paredes', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:80, positions:['CDM','CM'], stats:{speed:58,shooting:62,passing:76,defending:78,physical:76} },
    { id:'ARG-Palacios', name:'帕拉西奥斯', nameEn:'Exequiel Palacios', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:82, positions:['CM','CDM'], stats:{speed:64,shooting:62,passing:74,defending:72,physical:70} },
    { id:'ARG-PazN', name:'帕斯', nameEn:'Nico Paz', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:76, positions:['CAM','CM'], stats:{speed:70,shooting:65,passing:72,defending:48,physical:58} },
    { id:'ARG-Barco', name:'巴尔科', nameEn:'Valentín Barco', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:78, positions:['LB','LM'], stats:{speed:82,shooting:55,passing:68,defending:70,physical:62} },
  ],
  LW: [
    { id:'ARG-DiMaria', name:'迪马利亚', nameEn:'Angel Di Maria', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:86, positions:['RW','LW'], stats:{speed:82,shooting:82,passing:86,defending:35,physical:58} },
    { id:'ARG-Garnacho', name:'加纳乔', nameEn:'Alejandro Garnacho', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:80, positions:['LW','RW'], stats:{speed:90,shooting:72,passing:64,defending:30,physical:58} },
    { id:'ARG-NicoGonzalez', name:'尼古拉斯·冈萨雷斯', nameEn:'Nicolás González', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:80, positions:['LW','RW'], stats:{speed:86,shooting:74,passing:66,defending:38,physical:62} },
  ],
  ST: [
    { id:'ARG-Messi', name:'梅西', nameEn:'Lionel Messi', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:91, positions:['RW','CAM'], stats:{speed:78,shooting:92,passing:90,defending:32,physical:62} },
    { id:'ARG-LMartinez', name:'劳塔罗', nameEn:'Lautaro Martinez', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:87, positions:['ST'], stats:{speed:80,shooting:88,passing:68,defending:38,physical:80} },
    { id:'ARG-Dybala', name:'迪巴拉', nameEn:'Paulo Dybala', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:84, positions:['CAM','ST'], stats:{speed:78,shooting:84,passing:78,defending:35,physical:58} },
    { id:'ARG-AlvarezJ', name:'阿尔瓦雷斯', nameEn:'Julian Alvarez', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:85, positions:['ST','LW'], stats:{speed:78,shooting:82,passing:70,defending:42,physical:72} },
    { id:'ARG-Almada', name:'阿尔马达', nameEn:'Thiago Almada', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:80, positions:['CAM','LW'], stats:{speed:82,shooting:74,passing:72,defending:35,physical:58} },
    { id:'ARG-FlacoLopez', name:'弗拉科·洛佩斯', nameEn:'Flaco López', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:76, positions:['ST'], stats:{speed:74,shooting:76,passing:55,defending:28,physical:72} },
    { id:'ARG-GSimeone', name:'G·西蒙尼', nameEn:'Giuliano Simeone', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:76, positions:['ST','LW'], stats:{speed:78,shooting:72,passing:58,defending:38,physical:70} },
  ],
},

AUS: {
  GK: [
    { id:'AUS-RyanM', name:'瑞安', nameEn:'Mathew Ryan', nationality:'AUS', avatar:'/images/players/placeholder.png', rating:79, positions:['GK'], stats:{speed:46,shooting:18,passing:48,defending:56,physical:62} },
    { id:'AUS-Redmayne', name:'雷德梅恩', nameEn:'Andrew Redmayne', nationality:'AUS', avatar:'/images/players/placeholder.png', rating:73, positions:['GK'], stats:{speed:42,shooting:16,passing:42,defending:52,physical:58} },
  ],
  CB: [
    { id:'AUS-SouttarH', name:'苏塔', nameEn:'Harry Souttar', nationality:'AUS', avatar:'/images/players/placeholder.png', rating:80, positions:['CB'], stats:{speed:55,shooting:42,passing:58,defending:84,physical:84} },
    { id:'AUS-Rowles', name:'罗尔斯', nameEn:'Kye Rowles', nationality:'AUS', avatar:'/images/players/placeholder.png', rating:74, positions:['CB','LB'], stats:{speed:62,shooting:30,passing:60,defending:80,physical:76} },
    { id:'AUS-Degenek', name:'德格内克', nameEn:'Milos Degenek', nationality:'AUS', avatar:'/images/players/placeholder.png', rating:73, positions:['CB','RB'], stats:{speed:66,shooting:32,passing:58,defending:78,physical:76} },
  ],
  LB: [
    { id:'AUS-Behich', name:'贝希奇', nameEn:'Aziz Behich', nationality:'AUS', avatar:'/images/players/placeholder.png', rating:75, positions:['LB','RB'], stats:{speed:80,shooting:42,passing:62,defending:76,physical:72} },
  ],
  CM: [
    { id:'AUS-Mooy', name:'穆伊', nameEn:'Aaron Mooy', nationality:'AUS', avatar:'/images/players/placeholder.png', rating:79, positions:['CM','CDM'], stats:{speed:62,shooting:62,passing:74,defending:65,physical:66} },
    { id:'AUS-IrwinJ', name:'欧文', nameEn:'Jackson Irvine', nationality:'AUS', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CDM'], stats:{speed:60,shooting:62,passing:68,defending:72,physical:76} },
    { id:'AUS-McGree', name:'麦格里', nameEn:'Riley McGree', nationality:'AUS', avatar:'/images/players/placeholder.png', rating:74, positions:['CM','CAM'], stats:{speed:68,shooting:62,passing:66,defending:55,physical:62} },
  ],
  LW: [
    { id:'AUS-Goodwin', name:'古德温', nameEn:'Craig Goodwin', nationality:'AUS', avatar:'/images/players/placeholder.png', rating:74, positions:['LW','LM'], stats:{speed:80,shooting:65,passing:66,defending:42,physical:62} },
    { id:'AUS-BoyleM', name:'博伊尔', nameEn:'Martin Boyle', nationality:'AUS', avatar:'/images/players/placeholder.png', rating:73, positions:['RW','LW'], stats:{speed:84,shooting:68,passing:58,defending:35,physical:58} },
  ],
  ST: [
    { id:'AUS-MacLaren', name:'麦克拉伦', nameEn:'Jamie Maclaren', nationality:'AUS', avatar:'/images/players/placeholder.png', rating:75, positions:['ST'], stats:{speed:74,shooting:78,passing:50,defending:25,physical:70} },
    { id:'AUS-DukeM', name:'杜克', nameEn:'Mitchell Duke', nationality:'AUS', avatar:'/images/players/placeholder.png', rating:73, positions:['ST'], stats:{speed:72,shooting:72,passing:48,defending:28,physical:74} },
    { id:'AUS-Cummings', name:'卡明斯', nameEn:'Jason Cummings', nationality:'AUS', avatar:'/images/players/placeholder.png', rating:72, positions:['ST'], stats:{speed:70,shooting:72,passing:55,defending:25,physical:68} },
  ],
},

AUT: {
  GK: [
    { id:'AUT-Schlager', name:'施拉格尔', nameEn:'Alexander Schlager', nationality:'AUT', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:46,shooting:18,passing:44,defending:54,physical:60} },
    { id:'AUT-Lindner', name:'林德纳', nameEn:'Heinz Lindner', nationality:'AUT', avatar:'/images/players/placeholder.png', rating:73, positions:['GK'], stats:{speed:44,shooting:16,passing:42,defending:52,physical:58} },
  ],
  CB: [
    { id:'AUT-Alaba', name:'阿拉巴', nameEn:'David Alaba', nationality:'AUT', avatar:'/images/players/placeholder.png', rating:86, positions:['CB','LB'], stats:{speed:78,shooting:72,passing:80,defending:84,physical:76} },
    { id:'AUT-Lainer', name:'莱纳', nameEn:'Stefan Lainer', nationality:'AUT', avatar:'/images/players/placeholder.png', rating:79, positions:['RB','RM'], stats:{speed:82,shooting:52,passing:66,defending:78,physical:74} },
    { id:'AUT-Posch', name:'波施', nameEn:'Stefan Posch', nationality:'AUT', avatar:'/images/players/placeholder.png', rating:78, positions:['CB','RB'], stats:{speed:66,shooting:38,passing:62,defending:82,physical:80} },
  ],
  CM: [
    { id:'AUT-SchlagerX', name:'X·施拉格尔', nameEn:'Xaver Schlager', nationality:'AUT', avatar:'/images/players/placeholder.png', rating:80, positions:['CM','CDM'], stats:{speed:70,shooting:58,passing:74,defending:74,physical:74} },
    { id:'AUT-Laimer', name:'莱默尔', nameEn:'Konrad Laimer', nationality:'AUT', avatar:'/images/players/placeholder.png', rating:83, positions:['CM','CDM'], stats:{speed:82,shooting:62,passing:74,defending:78,physical:78} },
    { id:'AUT-Sabitzer', name:'萨比策', nameEn:'Marcel Sabitzer', nationality:'AUT', avatar:'/images/players/placeholder.png', rating:84, positions:['CAM','CM'], stats:{speed:74,shooting:80,passing:76,defending:62,physical:68} },
  ],
  CAM: [
    { id:'AUT-Baumgartner', name:'鲍姆加特纳', nameEn:'Christoph Baumgartner', nationality:'AUT', avatar:'/images/players/placeholder.png', rating:80, positions:['CAM','LW'], stats:{speed:72,shooting:72,passing:72,defending:42,physical:62} },
    { id:'AUT-SchmidR', name:'施密德', nameEn:'Romano Schmid', nationality:'AUT', avatar:'/images/players/placeholder.png', rating:75, positions:['CAM','CM'], stats:{speed:68,shooting:62,passing:68,defending:48,physical:58} },
  ],
  ST: [
    { id:'AUT-Arnautovic', name:'阿瑙托维奇', nameEn:'Marko Arnautovic', nationality:'AUT', avatar:'/images/players/placeholder.png', rating:82, positions:['ST','LW'], stats:{speed:78,shooting:84,passing:66,defending:35,physical:78} },
    { id:'AUT-Gregoritsch', name:'格雷戈里奇', nameEn:'Michael Gregoritsch', nationality:'AUT', avatar:'/images/players/placeholder.png', rating:77, positions:['ST'], stats:{speed:64,shooting:78,passing:58,defending:30,physical:76} },
    { id:'AUT-Kalajdzic', name:'卡拉伊季奇', nameEn:'Sasa Kalajdzic', nationality:'AUT', avatar:'/images/players/placeholder.png', rating:77, positions:['ST'], stats:{speed:62,shooting:78,passing:55,defending:30,physical:82} },
  ],
},

BEL: {
  GK: [
    { id:'BEL-Courtois', name:'库尔图瓦', nameEn:'Thibaut Courtois', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:89, positions:['GK'], stats:{speed:52,shooting:20,passing:48,defending:62,physical:70} },
    { id:'BEL-Lammens', name:'拉门斯', nameEn:'Senne Lammens', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:74, positions:['GK'], stats:{speed:44,shooting:16,passing:42,defending:52,physical:58} },
    { id:'BEL-Penders', name:'彭德斯', nameEn:'Mike Penders', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:72, positions:['GK'], stats:{speed:44,shooting:16,passing:40,defending:50,physical:56} },
  ],
  CB: [
    { id:'BEL-Theate', name:'蒂特', nameEn:'Arthur Theate', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:79, positions:['CB','LB'], stats:{speed:68,shooting:35,passing:60,defending:80,physical:78} },
    { id:'BEL-Debast', name:'德巴斯特', nameEn:'Zeno Debast', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:76, positions:['CB','CDM'], stats:{speed:64,shooting:32,passing:62,defending:80,physical:76} },
    { id:'BEL-DeWinter', name:'德温特', nameEn:'Koni De Winter', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:75, positions:['CB','CDM'], stats:{speed:62,shooting:30,passing:58,defending:78,physical:78} },
    { id:'BEL-Mechele', name:'梅切勒', nameEn:'Brandon Mechele', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:74, positions:['CB'], stats:{speed:58,shooting:28,passing:55,defending:78,physical:78} },
    { id:'BEL-Ngoy', name:'恩戈伊', nameEn:'Nathan Ngoy', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:74, positions:['CB'], stats:{speed:60,shooting:28,passing:52,defending:76,physical:74} },
  ],
  LB: [
    { id:'BEL-Castagne', name:'卡斯塔涅', nameEn:'Timothy Castagne', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:78, positions:['LB','RB'], stats:{speed:80,shooting:48,passing:66,defending:78,physical:74} },
    { id:'BEL-DeCuyper', name:'德克伊珀', nameEn:'Maxim De Cuyper', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:76, positions:['LB','LM'], stats:{speed:82,shooting:48,passing:64,defending:74,physical:70} },
    { id:'BEL-Seys', name:'塞斯', nameEn:'Joaquin Seys', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:72, positions:['LB','RB'], stats:{speed:78,shooting:38,passing:58,defending:72,physical:68} },
  ],
  RB: [
    { id:'BEL-Meunier', name:'默尼耶', nameEn:'Thomas Meunier', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:78, positions:['RB','RM'], stats:{speed:78,shooting:62,passing:68,defending:76,physical:74} },
  ],
  CDM: [
    { id:'BEL-OnanaA', name:'奥纳纳', nameEn:'Amadou Onana', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:82, positions:['CDM','CM'], stats:{speed:68,shooting:58,passing:72,defending:84,physical:84} },
    { id:'BEL-Witsel', name:'维特塞尔', nameEn:'Axel Witsel', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:80, positions:['CDM','CB'], stats:{speed:58,shooting:52,passing:72,defending:80,physical:78} },
  ],
  CM: [
    { id:'BEL-Tielemans', name:'蒂勒曼斯', nameEn:'Youri Tielemans', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:82, positions:['CM','CDM'], stats:{speed:64,shooting:72,passing:80,defending:65,physical:70} },
    { id:'BEL-Raskin', name:'拉斯金', nameEn:'Nicolas Raskin', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CDM'], stats:{speed:66,shooting:55,passing:70,defending:68,physical:66} },
    { id:'BEL-Vanaken', name:'瓦纳肯', nameEn:'Hans Vanaken', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:78, positions:['CAM','CM'], stats:{speed:62,shooting:68,passing:74,defending:58,physical:68} },
  ],
  CAM: [
    { id:'BEL-DeBruyne', name:'德布劳内', nameEn:'Kevin De Bruyne', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:91, positions:['CM','CAM'], stats:{speed:76,shooting:86,passing:92,defending:58,physical:72} },
  ],
  LW: [
    { id:'BEL-Trossard', name:'特罗萨德', nameEn:'Leandro Trossard', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:84, positions:['LW','CAM'], stats:{speed:84,shooting:80,passing:74,defending:42,physical:62} },
    { id:'BEL-Doku', name:'多库', nameEn:'Jeremy Doku', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:82, positions:['RW','LW'], stats:{speed:94,shooting:72,passing:68,defending:35,physical:58} },
  ],
  RW: [
    { id:'BEL-Saelemaekers', name:'萨勒马克尔斯', nameEn:'Alexis Saelemaekers', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:78, positions:['RW','RB'], stats:{speed:82,shooting:65,passing:66,defending:58,physical:64} },
    { id:'BEL-Lukebakio', name:'卢克巴基奥', nameEn:'Dodi Lukebakio', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:78, positions:['RW','LW'], stats:{speed:86,shooting:72,passing:62,defending:38,physical:62} },
    { id:'BEL-FernandezPardo', name:'费尔南德斯-帕尔多', nameEn:'Matias Fernandez-Pardo', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:74, positions:['RW','LW'], stats:{speed:82,shooting:68,passing:58,defending:32,physical:55} },
    { id:'BEL-MoreiraD', name:'莫雷拉', nameEn:'Diego Moreira', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:74, positions:['LW','RW'], stats:{speed:84,shooting:62,passing:58,defending:30,physical:55} },
  ],
  ST: [
    { id:'BEL-Lukaku', name:'卢卡库', nameEn:'Romelu Lukaku', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:85, positions:['ST'], stats:{speed:78,shooting:86,passing:66,defending:32,physical:90} },
    { id:'BEL-Openda', name:'奥蓬达', nameEn:'Lois Openda', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:81, positions:['ST'], stats:{speed:88,shooting:80,passing:55,defending:28,physical:74} },
    { id:'BEL-DeKetelaere', name:'德凯特拉雷', nameEn:'Charles De Ketelaere', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:80, positions:['CAM','ST'], stats:{speed:72,shooting:68,passing:74,defending:35,physical:68} },
    { id:'BEL-Batshuayi', name:'巴舒亚伊', nameEn:'Michy Batshuayi', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:77, positions:['ST'], stats:{speed:74,shooting:78,passing:55,defending:25,physical:70} },
  ],
},
BIH: {
  GK: [
    { id:'BIH-Sehic', name:'谢希奇', nameEn:'Ibrahim Sehic', nationality:'BIH', avatar:'/images/players/placeholder.png', rating:74, positions:['GK'], stats:{speed:44,shooting:16,passing:42,defending:52,physical:58} },
    { id:'BIH-Piric', name:'皮里奇', nameEn:'Arijan Piric', nationality:'BIH', avatar:'/images/players/placeholder.png', rating:71, positions:['GK'], stats:{speed:42,shooting:14,passing:40,defending:50,physical:56} },
  ],
  CB: [
    { id:'BIH-Kolasinac', name:'科拉希纳茨', nameEn:'Sead Kolasinac', nationality:'BIH', avatar:'/images/players/placeholder.png', rating:78, positions:['LB','CB'], stats:{speed:76,shooting:48,passing:66,defending:80,physical:84} },
    { id:'BIH-Ahmedhodzic', name:'艾哈迈德霍季奇', nameEn:'Anel Ahmedhodzic', nationality:'BIH', avatar:'/images/players/placeholder.png', rating:76, positions:['CB'], stats:{speed:64,shooting:35,passing:60,defending:80,physical:78} },
    { id:'BIH-Hadzikunic', name:'哈济库尼奇', nameEn:'Adrian Hadzikunic', nationality:'BIH', avatar:'/images/players/placeholder.png', rating:72, positions:['CB'], stats:{speed:58,shooting:28,passing:55,defending:78,physical:76} },
  ],
  CM: [
    { id:'BIH-Pjanic', name:'皮亚尼奇', nameEn:'Miralem Pjanic', nationality:'BIH', avatar:'/images/players/placeholder.png', rating:82, positions:['CM','CDM'], stats:{speed:58,shooting:68,passing:84,defending:62,physical:58} },
    { id:'BIH-Krunic', name:'克鲁尼奇', nameEn:'Rade Krunic', nationality:'BIH', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CDM'], stats:{speed:62,shooting:55,passing:68,defending:72,physical:72} },
  ],
  CAM: [
    { id:'BIH-Dzeko', name:'哲科', nameEn:'Edin Dzeko', nationality:'BIH', avatar:'/images/players/placeholder.png', rating:83, positions:['ST'], stats:{speed:62,shooting:84,passing:66,defending:30,physical:80} },
    { id:'BIH-Demirovic', name:'德米罗维奇', nameEn:'Ermedin Demirovic', nationality:'BIH', avatar:'/images/players/placeholder.png', rating:75, positions:['ST'], stats:{speed:76,shooting:78,passing:55,defending:28,physical:74} },
  ],
  ST: [
    { id:'BIH-Menalo', name:'梅纳洛', nameEn:'Mirsad Menalo', nationality:'BIH', avatar:'/images/players/placeholder.png', rating:72, positions:['ST','LW'], stats:{speed:74,shooting:70,passing:52,defending:25,physical:68} },
  ],
},

BRA: {
  GK: [
    { id:'BRA-Alisson', name:'阿利松', nameEn:'Alisson', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:89, positions:['GK'], stats:{speed:50,shooting:22,passing:55,defending:62,physical:68} },
    { id:'BRA-Ederson', name:'埃德森', nameEn:'Ederson', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:86, positions:['GK'], stats:{speed:55,shooting:24,passing:60,defending:60,physical:66} },
    { id:'BRA-Weverton', name:'韦弗顿', nameEn:'Weverton', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:78, positions:['GK'], stats:{speed:48,shooting:20,passing:50,defending:58,physical:64} },
  ],
  CB: [
    { id:'BRA-Marquinhos', name:'马尔基尼奥斯', nameEn:'Marquinhos', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:86, positions:['CB','CDM'], stats:{speed:72,shooting:42,passing:72,defending:90,physical:80} },
    { id:'BRA-GabrielM', name:'加布里埃尔', nameEn:'Gabriel Magalhães', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:85, positions:['CB'], stats:{speed:66,shooting:42,passing:64,defending:86,physical:82} },
    { id:'BRA-Bremer', name:'布雷默', nameEn:'Bremer', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:84, positions:['CB'], stats:{speed:66,shooting:35,passing:58,defending:88,physical:84} },
    { id:'BRA-Ibanez', name:'伊巴涅斯', nameEn:'Roger Ibañez', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:80, positions:['CB'], stats:{speed:68,shooting:38,passing:60,defending:84,physical:80} },
    { id:'BRA-LeoPereira', name:'莱奥·佩雷拉', nameEn:'Léo Pereira', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:78, positions:['CB'], stats:{speed:62,shooting:32,passing:58,defending:80,physical:80} },
  ],
  LB: [
    { id:'BRA-Sandro', name:'桑德罗', nameEn:'Alex Sandro', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:80, positions:['LB','LWB'], stats:{speed:80,shooting:45,passing:68,defending:80,physical:76} },
    { id:'BRA-DouglasSantos', name:'道格拉斯·桑托斯', nameEn:'Douglas Santos', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:77, positions:['LB','LM'], stats:{speed:82,shooting:48,passing:72,defending:78,physical:74} },
  ],
  RB: [
    { id:'BRA-Danilo', name:'达尼洛', nameEn:'Danilo', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:79, positions:['RB','LB'], stats:{speed:78,shooting:48,passing:68,defending:82,physical:76} },
    { id:'BRA-Wesley', name:'韦斯利', nameEn:'Wesley', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:76, positions:['RB','RM'], stats:{speed:82,shooting:42,passing:64,defending:76,physical:72} },
  ],
  CDM: [
    { id:'BRA-Casemiro', name:'卡塞米罗', nameEn:'Casemiro', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:84, positions:['CDM','CM'], stats:{speed:58,shooting:62,passing:74,defending:90,physical:86} },
    { id:'BRA-Fabinho', name:'法比尼奥', nameEn:'Fabinho', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:82, positions:['CDM','CB'], stats:{speed:62,shooting:55,passing:74,defending:86,physical:84} },
  ],
  CM: [
    { id:'BRA-BrunoG', name:'B·吉马良斯', nameEn:'Bruno Guimarães', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:85, positions:['CM','CDM'], stats:{speed:66,shooting:65,passing:82,defending:74,physical:72} },
    { id:'BRA-Paqueta', name:'帕克塔', nameEn:'Lucas Paqueta', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:83, positions:['CAM','CM'], stats:{speed:68,shooting:72,passing:80,defending:58,physical:68} },
    { id:'BRA-DaniloSantos', name:'达尼洛·桑托斯', nameEn:'Danilo Santos', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CDM'], stats:{speed:64,shooting:58,passing:68,defending:72,physical:70} },
    { id:'BRA-EdersonMID', name:'埃德森(中场)', nameEn:'Éderson', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:78, positions:['CM','CDM'], stats:{speed:62,shooting:62,passing:72,defending:74,physical:72} },
  ],
  LW: [
    { id:'BRA-ViniJr', name:'维尼修斯', nameEn:'Vinicius Junior', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:90, positions:['LW','ST'], stats:{speed:94,shooting:82,passing:78,defending:32,physical:68} },
    { id:'BRA-MartinelliG', name:'马丁内利', nameEn:'Gabriel Martinelli', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:84, positions:['LW','ST'], stats:{speed:90,shooting:78,passing:70,defending:38,physical:64} },
  ],
  RW: [
    { id:'BRA-Raphinha', name:'拉菲尼亚', nameEn:'Raphinha', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:86, positions:['RW','LW'], stats:{speed:88,shooting:78,passing:80,defending:38,physical:66} },
    { id:'BRA-Rodrygo', name:'罗德里戈', nameEn:'Rodrygo', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:85, positions:['RW','LW'], stats:{speed:88,shooting:80,passing:74,defending:35,physical:62} },
    { id:'BRA-LuizHenrique', name:'路易斯·恩里克', nameEn:'Luiz Henrique', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:77, positions:['RW','LW'], stats:{speed:90,shooting:72,passing:66,defending:35,physical:58} },
  ],
  ST: [
    { id:'BRA-Neymar', name:'内马尔', nameEn:'Neymar Jr', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:88, positions:['LW','CAM'], stats:{speed:86,shooting:86,passing:84,defending:35,physical:62} },
    { id:'BRA-Cunha', name:'马特乌斯·库尼亚', nameEn:'Matheus Cunha', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:82, positions:['ST','LW'], stats:{speed:82,shooting:80,passing:70,defending:38,physical:72} },
    { id:'BRA-Endrick', name:'恩德里克', nameEn:'Endrick', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:78, positions:['ST'], stats:{speed:82,shooting:76,passing:58,defending:22,physical:68} },
    { id:'BRA-IgorThiago', name:'伊戈尔·蒂亚戈', nameEn:'Igor Thiago', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:76, positions:['ST'], stats:{speed:74,shooting:76,passing:55,defending:28,physical:78} },
    { id:'BRA-Rayan', name:'拉扬', nameEn:'Rayan', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:74, positions:['ST'], stats:{speed:78,shooting:74,passing:52,defending:25,physical:72} },
  ],
},

CAN: {
  GK: [
    { id:'CAN-Borjan', name:'博扬', nameEn:'Milan Borjan', nationality:'CAN', avatar:'/images/players/placeholder.png', rating:78, positions:['GK'], stats:{speed:46,shooting:18,passing:44,defending:56,physical:62} },
    { id:'CAN-Crepeau', name:'克雷波', nameEn:'Maxime Crepeau', nationality:'CAN', avatar:'/images/players/placeholder.png', rating:74, positions:['GK'], stats:{speed:44,shooting:16,passing:42,defending:54,physical:58} },
  ],
  CB: [
    { id:'CAN-VitoriaS', name:'维多利亚', nameEn:'Steven Vitoria', nationality:'CAN', avatar:'/images/players/placeholder.png', rating:74, positions:['CB'], stats:{speed:55,shooting:35,passing:58,defending:80,physical:80} },
    { id:'CAN-KennedyS', name:'肯尼迪', nameEn:'Scott Kennedy', nationality:'CAN', avatar:'/images/players/placeholder.png', rating:72, positions:['CB'], stats:{speed:58,shooting:28,passing:55,defending:78,physical:78} },
    { id:'CAN-MillerK', name:'米勒', nameEn:'Kamal Miller', nationality:'CAN', avatar:'/images/players/placeholder.png', rating:73, positions:['CB','LB'], stats:{speed:64,shooting:30,passing:58,defending:78,physical:76} },
  ],
  LB: [
    { id:'CAN-Adekugbe', name:'阿德库贝', nameEn:'Sam Adekugbe', nationality:'CAN', avatar:'/images/players/placeholder.png', rating:73, positions:['LB','LM'], stats:{speed:80,shooting:42,passing:60,defending:74,physical:72} },
  ],
  RB: [
    { id:'CAN-JohnstonA', name:'约翰斯顿', nameEn:'Alistair Johnston', nationality:'CAN', avatar:'/images/players/placeholder.png', rating:76, positions:['RB','RM'], stats:{speed:80,shooting:45,passing:64,defending:78,physical:74} },
    { id:'CAN-Laryea', name:'拉里亚', nameEn:'Richie Laryea', nationality:'CAN', avatar:'/images/players/placeholder.png', rating:74, positions:['RB','RM'], stats:{speed:84,shooting:48,passing:62,defending:72,physical:68} },
  ],
  CM: [
    { id:'CAN-Davies', name:'戴维斯', nameEn:'Alphonso Davies', nationality:'CAN', avatar:'/images/players/placeholder.png', rating:86, positions:['LB','LM'], stats:{speed:96,shooting:72,passing:76,defending:72,physical:66} },
    { id:'CAN-Eustaquio', name:'尤斯塔基奥', nameEn:'Stephen Eustaquio', nationality:'CAN', avatar:'/images/players/placeholder.png', rating:78, positions:['CM','CDM'], stats:{speed:66,shooting:58,passing:74,defending:70,physical:68} },
    { id:'CAN-Kaye', name:'卡耶', nameEn:'Mark-Anthony Kaye', nationality:'CAN', avatar:'/images/players/placeholder.png', rating:75, positions:['CM','CDM'], stats:{speed:64,shooting:55,passing:68,defending:68,physical:70} },
    { id:'CAN-Osorio', name:'奥索里奥', nameEn:'Jonathan Osorio', nationality:'CAN', avatar:'/images/players/placeholder.png', rating:75, positions:['CM','CAM'], stats:{speed:64,shooting:62,passing:66,defending:58,physical:62} },
  ],
  LW: [
    { id:'CAN-Buchanan', name:'布坎南', nameEn:'Tajon Buchanan', nationality:'CAN', avatar:'/images/players/placeholder.png', rating:77, positions:['RW','LW'], stats:{speed:88,shooting:68,passing:62,defending:42,physical:64} },
    { id:'CAN-Hoilett', name:'霍伊莱特', nameEn:'Junior Hoilett', nationality:'CAN', avatar:'/images/players/placeholder.png', rating:74, positions:['LW','RW'], stats:{speed:78,shooting:65,passing:66,defending:38,physical:58} },
  ],
  ST: [
    { id:'CAN-DavidJ', name:'戴维', nameEn:'Jonathan David', nationality:'CAN', avatar:'/images/players/placeholder.png', rating:84, positions:['ST','CAM'], stats:{speed:82,shooting:82,passing:70,defending:38,physical:68} },
    { id:'CAN-LarinC', name:'拉林', nameEn:'Cyle Larin', nationality:'CAN', avatar:'/images/players/placeholder.png', rating:78, positions:['ST'], stats:{speed:78,shooting:78,passing:58,defending:30,physical:72} },
    { id:'CAN-Cavallini', name:'卡瓦利尼', nameEn:'Lucas Cavallini', nationality:'CAN', avatar:'/images/players/placeholder.png', rating:73, positions:['ST'], stats:{speed:72,shooting:72,passing:50,defending:28,physical:74} },
  ],
},

CIV: {
  GK: [
    { id:'CIV-Sangare', name:'桑加雷', nameEn:'Badra Ali Sangare', nationality:'CIV', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:46,shooting:18,passing:44,defending:54,physical:60} },
  ],
  CB: [
    { id:'CIV-Bailly', name:'拜利', nameEn:'Eric Bailly', nationality:'CIV', avatar:'/images/players/placeholder.png', rating:80, positions:['CB'], stats:{speed:72,shooting:38,passing:60,defending:84,physical:80} },
    { id:'CIV-DiopI', name:'迪奥普', nameEn:'Issa Diop', nationality:'CIV', avatar:'/images/players/placeholder.png', rating:76, positions:['CB'], stats:{speed:64,shooting:35,passing:58,defending:82,physical:80} },
  ],
  RB: [
    { id:'CIV-SingoW', name:'辛戈', nameEn:'Wilfried Singo', nationality:'CIV', avatar:'/images/players/placeholder.png', rating:78, positions:['RB','CB'], stats:{speed:84,shooting:52,passing:66,defending:78,physical:78} },
  ],
  CM: [
    { id:'CIV-Kessie', name:'凯西', nameEn:'Franck Kessie', nationality:'CIV', avatar:'/images/players/placeholder.png', rating:84, positions:['CM','CDM'], stats:{speed:70,shooting:72,passing:74,defending:80,physical:84} },
    { id:'CIV-FofanaS', name:'塞科·福法纳', nameEn:'Seko Fofana', nationality:'CIV', avatar:'/images/players/placeholder.png', rating:82, positions:['CM','CAM'], stats:{speed:74,shooting:72,passing:76,defending:68,physical:78} },
  ],
  LW: [
    { id:'CIV-Zaha', name:'扎哈', nameEn:'Wilfried Zaha', nationality:'CIV', avatar:'/images/players/placeholder.png', rating:84, positions:['LW','ST'], stats:{speed:88,shooting:80,passing:68,defending:38,physical:66} },
  ],
  ST: [
    { id:'CIV-Haller', name:'阿莱', nameEn:'Sebastien Haller', nationality:'CIV', avatar:'/images/players/placeholder.png', rating:82, positions:['ST'], stats:{speed:68,shooting:82,passing:62,defending:32,physical:80} },
    { id:'CIV-PepeN', name:'佩佩', nameEn:'Nicolas Pepe', nationality:'CIV', avatar:'/images/players/placeholder.png', rating:81, positions:['RW','ST'], stats:{speed:88,shooting:76,passing:66,defending:35,physical:58} },
  ],
},

COL: {
  GK: [
    { id:'COL-Ospina', name:'奥斯皮纳', nameEn:'David Ospina', nationality:'COL', avatar:'/images/players/placeholder.png', rating:82, positions:['GK'], stats:{speed:48,shooting:18,passing:48,defending:56,physical:62} },
    { id:'COL-VargasC', name:'巴尔加斯', nameEn:'Camilo Vargas', nationality:'COL', avatar:'/images/players/placeholder.png', rating:78, positions:['GK'], stats:{speed:44,shooting:16,passing:44,defending:54,physical:60} },
  ],
  CB: [
    { id:'COL-MinaY', name:'米纳', nameEn:'Yerry Mina', nationality:'COL', avatar:'/images/players/placeholder.png', rating:81, positions:['CB'], stats:{speed:62,shooting:55,passing:62,defending:84,physical:84} },
    { id:'COL-SanchezD', name:'桑切斯', nameEn:'Davinson Sanchez', nationality:'COL', avatar:'/images/players/placeholder.png', rating:80, positions:['CB'], stats:{speed:68,shooting:38,passing:62,defending:84,physical:80} },
    { id:'COL-Cuesta', name:'奎斯塔', nameEn:'Carlos Cuesta', nationality:'COL', avatar:'/images/players/placeholder.png', rating:76, positions:['CB'], stats:{speed:62,shooting:32,passing:58,defending:80,physical:78} },
    { id:'COL-AraujoR', name:'R·阿劳霍', nameEn:'Ronald Araújo', nationality:'COL', avatar:'/images/players/placeholder.png', rating:84, positions:['CB','RB'], stats:{speed:74,shooting:42,passing:64,defending:88,physical:84} },
  ],
  LB: [
    { id:'COL-MojicaJ', name:'莫希卡', nameEn:'Johan Mojica', nationality:'COL', avatar:'/images/players/placeholder.png', rating:76, positions:['LB','LM'], stats:{speed:80,shooting:48,passing:66,defending:76,physical:72} },
  ],
  CM: [
    { id:'COL-BarriosW', name:'巴里奥斯', nameEn:'Wilmar Barrios', nationality:'COL', avatar:'/images/players/placeholder.png', rating:78, positions:['CDM','CM'], stats:{speed:62,shooting:52,passing:66,defending:80,physical:78} },
    { id:'COL-UribeM', name:'乌里韦', nameEn:'Mateus Uribe', nationality:'COL', avatar:'/images/players/placeholder.png', rating:80, positions:['CM','CDM'], stats:{speed:64,shooting:68,passing:72,defending:72,physical:74} },
    { id:'COL-LermaJ', name:'莱尔马', nameEn:'Jefferson Lerma', nationality:'COL', avatar:'/images/players/placeholder.png', rating:80, positions:['CDM','CM'], stats:{speed:62,shooting:62,passing:66,defending:82,physical:80} },
  ],
  CAM: [
    { id:'COL-James', name:'J·罗', nameEn:'James Rodriguez', nationality:'COL', avatar:'/images/players/placeholder.png', rating:86, positions:['CAM','RW'], stats:{speed:68,shooting:82,passing:86,defending:38,physical:62} },
    { id:'COL-LuisDiaz', name:'迪亚斯', nameEn:'Luis Diaz', nationality:'COL', avatar:'/images/players/placeholder.png', rating:86, positions:['LW','RW'], stats:{speed:90,shooting:80,passing:72,defending:42,physical:66} },
  ],
  ST: [
    { id:'COL-BaccaC', name:'巴卡', nameEn:'Carlos Bacca', nationality:'COL', avatar:'/images/players/placeholder.png', rating:78, positions:['ST'], stats:{speed:78,shooting:80,passing:58,defending:28,physical:74} },
    { id:'COL-BorjaM', name:'博尔哈', nameEn:'Miguel Borja', nationality:'COL', avatar:'/images/players/placeholder.png', rating:77, positions:['ST'], stats:{speed:72,shooting:80,passing:52,defending:25,physical:78} },
  ],
},

CRO: {
  GK: [
    { id:'CRO-Livakovic', name:'利瓦科维奇', nameEn:'Dominik Livakovic', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:82, positions:['GK'], stats:{speed:48,shooting:18,passing:48,defending:58,physical:64} },
    { id:'CRO-Kotarski', name:'科塔尔斯基', nameEn:'Dominik Kotarski', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:44,shooting:16,passing:44,defending:54,physical:60} },
    { id:'CRO-Pandur', name:'潘杜尔', nameEn:'Ivor Pandur', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:72, positions:['GK'], stats:{speed:42,shooting:14,passing:40,defending:50,physical:56} },
  ],
  CB: [
    { id:'CRO-Gvardiol', name:'格瓦迪奥尔', nameEn:'Josko Gvardiol', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:84, positions:['CB','LB'], stats:{speed:82,shooting:55,passing:72,defending:88,physical:82} },
    { id:'CRO-Sutalo', name:'舒塔洛', nameEn:'Josip Sutalo', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:80, positions:['CB'], stats:{speed:62,shooting:32,passing:62,defending:84,physical:80} },
    { id:'CRO-CaletaCar', name:'卡莱塔-卡尔', nameEn:'Duje Ćaleta-Car', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:78, positions:['CB'], stats:{speed:62,shooting:35,passing:62,defending:82,physical:80} },
    { id:'CRO-Pongracic', name:'庞格拉契奇', nameEn:'Marin Pongračić', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:76, positions:['CB'], stats:{speed:60,shooting:30,passing:58,defending:80,physical:78} },
    { id:'CRO-Erlic', name:'埃尔利奇', nameEn:'Martin Erlić', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:75, positions:['CB'], stats:{speed:58,shooting:28,passing:55,defending:80,physical:78} },
    { id:'CRO-VuskovicL', name:'武什科维奇', nameEn:'Luka Vušković', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:76, positions:['CB'], stats:{speed:62,shooting:32,passing:55,defending:80,physical:76} },
  ],
  LB: [
    { id:'CRO-Stanisic', name:'斯塔尼西奇', nameEn:'Josip Stanišić', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:79, positions:['RB','CB'], stats:{speed:74,shooting:42,passing:62,defending:78,physical:76} },
  ],
  CM: [
    { id:'CRO-Modric', name:'莫德里奇', nameEn:'Luka Modric', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:87, positions:['CM','CAM'], stats:{speed:72,shooting:76,passing:90,defending:65,physical:62} },
    { id:'CRO-Kovacic', name:'科瓦契奇', nameEn:'Mateo Kovacic', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:84, positions:['CM','CDM'], stats:{speed:72,shooting:62,passing:82,defending:68,physical:66} },
    { id:'CRO-PasalicM', name:'M·帕萨利奇', nameEn:'Mario Pašalić', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:80, positions:['CM','CAM'], stats:{speed:66,shooting:68,passing:72,defending:58,physical:66} },
    { id:'CRO-Vlasic', name:'弗拉希奇', nameEn:'Nikola Vlašić', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:78, positions:['CAM','CM'], stats:{speed:76,shooting:72,passing:70,defending:48,physical:64} },
    { id:'CRO-SucicL', name:'L·苏契奇', nameEn:'Luka Sučić', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:78, positions:['CM','CAM'], stats:{speed:68,shooting:65,passing:74,defending:55,physical:62} },
    { id:'CRO-Baturina', name:'巴图里纳', nameEn:'Martin Baturina', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CAM'], stats:{speed:66,shooting:62,passing:72,defending:48,physical:58} },
    { id:'CRO-Jakic', name:'亚基奇', nameEn:'Kristijan Jakić', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:76, positions:['CDM','CM'], stats:{speed:60,shooting:52,passing:66,defending:74,physical:72} },
    { id:'CRO-PetarSucic', name:'P·苏契奇', nameEn:'Petar Sučić', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:74, positions:['CM','CDM'], stats:{speed:62,shooting:55,passing:64,defending:68,physical:66} },
    { id:'CRO-Moro', name:'莫罗', nameEn:'Nikola Moro', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:75, positions:['CM','CDM'], stats:{speed:62,shooting:58,passing:66,defending:70,physical:68} },
  ],
  LW: [
    { id:'CRO-Perisic', name:'佩里西奇', nameEn:'Ivan Perišić', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:84, positions:['LW','LM'], stats:{speed:82,shooting:82,passing:78,defending:52,physical:76} },
  ],
  ST: [
    { id:'CRO-Kramaric', name:'克拉马里奇', nameEn:'Andrej Kramarić', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:80, positions:['ST','CAM'], stats:{speed:74,shooting:82,passing:70,defending:38,physical:72} },
    { id:'CRO-Budimir', name:'布季米尔', nameEn:'Ante Budimir', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:79, positions:['ST'], stats:{speed:66,shooting:78,passing:55,defending:30,physical:80} },
    { id:'CRO-PetkovicB', name:'佩特科维奇', nameEn:'Bruno Petkovic', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:78, positions:['ST'], stats:{speed:62,shooting:78,passing:64,defending:28,physical:80} },
    { id:'CRO-PasalicM', name:'M·帕萨利奇(锋)', nameEn:'Marco Pašalić', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:74, positions:['RW','ST'], stats:{speed:82,shooting:70,passing:60,defending:32,physical:62} },
    { id:'CRO-Musap', name:'穆萨', nameEn:'Petar Musa', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:76, positions:['ST'], stats:{speed:74,shooting:76,passing:55,defending:28,physical:72} },
    { id:'CRO-Matanovic', name:'马塔诺维奇', nameEn:'Igor Matanović', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:74, positions:['ST'], stats:{speed:72,shooting:74,passing:52,defending:25,physical:76} },
  ],
},

CZE: {
  GK: [
    { id:'CZE-Pavlenka', name:'帕夫伦卡', nameEn:'Jiri Pavlenka', nationality:'CZE', avatar:'/images/players/placeholder.png', rating:79, positions:['GK'], stats:{speed:46,shooting:18,passing:48,defending:56,physical:62} },
    { id:'CZE-Vaclik', name:'瓦茨利克', nameEn:'Tomas Vaclik', nationality:'CZE', avatar:'/images/players/placeholder.png', rating:77, positions:['GK'], stats:{speed:44,shooting:16,passing:44,defending:55,physical:60} },
  ],
  CB: [
    { id:'CZE-Coufal', name:'曹法尔', nameEn:'Vladimir Coufal', nationality:'CZE', avatar:'/images/players/placeholder.png', rating:78, positions:['RB','CB'], stats:{speed:78,shooting:42,passing:66,defending:80,physical:76} },
    { id:'CZE-Celustka', name:'切卢斯特卡', nameEn:'Ondrej Celustka', nationality:'CZE', avatar:'/images/players/placeholder.png', rating:74, positions:['CB'], stats:{speed:62,shooting:30,passing:58,defending:80,physical:78} },
    { id:'CZE-KrejciL', name:'克雷伊奇', nameEn:'Ladislav Krejci', nationality:'CZE', avatar:'/images/players/placeholder.png', rating:73, positions:['CB','CDM'], stats:{speed:58,shooting:42,passing:64,defending:78,physical:76} },
  ],
  CM: [
    { id:'CZE-Soucek', name:'绍切克', nameEn:'Tomas Soucek', nationality:'CZE', avatar:'/images/players/placeholder.png', rating:82, positions:['CDM','CM'], stats:{speed:66,shooting:68,passing:70,defending:82,physical:86} },
    { id:'CZE-Darida', name:'达里达', nameEn:'Vladimir Darida', nationality:'CZE', avatar:'/images/players/placeholder.png', rating:77, positions:['CM','CAM'], stats:{speed:62,shooting:65,passing:72,defending:62,physical:66} },
    { id:'CZE-Barak', name:'巴拉克', nameEn:'Antonin Barak', nationality:'CZE', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CAM'], stats:{speed:66,shooting:68,passing:72,defending:55,physical:62} },
  ],
  ST: [
    { id:'CZE-Schick', name:'希克', nameEn:'Patrik Schick', nationality:'CZE', avatar:'/images/players/placeholder.png', rating:82, positions:['ST'], stats:{speed:76,shooting:82,passing:64,defending:32,physical:76} },
    { id:'CZE-Krmencik', name:'克门奇克', nameEn:'Michael Krmencik', nationality:'CZE', avatar:'/images/players/placeholder.png', rating:73, positions:['ST'], stats:{speed:72,shooting:76,passing:50,defending:28,physical:74} },
    { id:'CZE-Pekhart', name:'佩克哈特', nameEn:'Tomas Pekhart', nationality:'CZE', avatar:'/images/players/placeholder.png', rating:71, positions:['ST'], stats:{speed:55,shooting:74,passing:48,defending:25,physical:80} },
  ],
},

DEN: {
  GK: [
    { id:'DEN-SchmeichelK', name:'舒梅切尔', nameEn:'Kasper Schmeichel', nationality:'DEN', avatar:'/images/players/placeholder.png', rating:84, positions:['GK'], stats:{speed:46,shooting:20,passing:48,defending:58,physical:64} },
    { id:'DEN-Ronnow', name:'勒诺夫', nameEn:'Frederik Ronnow', nationality:'DEN', avatar:'/images/players/placeholder.png', rating:79, positions:['GK'], stats:{speed:44,shooting:18,passing:44,defending:56,physical:62} },
  ],
  CB: [
    { id:'DEN-ChristensenA', name:'克里斯滕森', nameEn:'Andreas Christensen', nationality:'DEN', avatar:'/images/players/placeholder.png', rating:84, positions:['CB','CDM'], stats:{speed:66,shooting:38,passing:70,defending:86,physical:78} },
    { id:'DEN-Kjaer', name:'克亚尔', nameEn:'Simon Kjaer', nationality:'DEN', avatar:'/images/players/placeholder.png', rating:82, positions:['CB'], stats:{speed:60,shooting:42,passing:66,defending:86,physical:82} },
    { id:'DEN-NelsonV', name:'内尔松', nameEn:'Victor Nelsson', nationality:'DEN', avatar:'/images/players/placeholder.png', rating:79, positions:['CB'], stats:{speed:64,shooting:32,passing:62,defending:84,physical:80} },
    { id:'DEN-Bah', name:'巴', nameEn:'Alexander Bah', nationality:'DEN', avatar:'/images/players/placeholder.png', rating:77, positions:['RB','RM'], stats:{speed:82,shooting:48,passing:66,defending:76,physical:74} },
  ],
  LB: [
    { id:'DEN-Maehle', name:'梅勒', nameEn:'Joakim Maehle', nationality:'DEN', avatar:'/images/players/placeholder.png', rating:80, positions:['LB','LM'], stats:{speed:84,shooting:55,passing:68,defending:76,physical:72} },
  ],
  CM: [
    { id:'DEN-Hojbjerg', name:'霍伊别尔', nameEn:'Pierre-Emile Hojbjerg', nationality:'DEN', avatar:'/images/players/placeholder.png', rating:83, positions:['CM','CDM'], stats:{speed:64,shooting:68,passing:74,defending:80,physical:82} },
    { id:'DEN-Eriksen', name:'埃里克森', nameEn:'Christian Eriksen', nationality:'DEN', avatar:'/images/players/placeholder.png', rating:86, positions:['CAM','CM'], stats:{speed:68,shooting:78,passing:88,defending:48,physical:60} },
    { id:'DEN-Delaney', name:'德莱尼', nameEn:'Thomas Delaney', nationality:'DEN', avatar:'/images/players/placeholder.png', rating:78, positions:['CM','CDM'], stats:{speed:60,shooting:55,passing:70,defending:74,physical:74} },
    { id:'DEN-JensenM', name:'M·延森', nameEn:'Mathias Jensen', nationality:'DEN', avatar:'/images/players/placeholder.png', rating:78, positions:['CM','CDM'], stats:{speed:64,shooting:58,passing:74,defending:65,physical:66} },
    { id:'DEN-JensenD', name:'D·延森', nameEn:'Daniel Jensen', nationality:'DEN', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CAM'], stats:{speed:66,shooting:62,passing:70,defending:55,physical:60} },
  ],
  LW: [
    { id:'DEN-Damsgaard', name:'达姆斯高', nameEn:'Mikkel Damsgaard', nationality:'DEN', avatar:'/images/players/placeholder.png', rating:77, positions:['LW','CAM'], stats:{speed:78,shooting:72,passing:68,defending:38,physical:58} },
    { id:'DEN-OlsenA', name:'奥尔森', nameEn:'Andreas Olsen', nationality:'DEN', avatar:'/images/players/placeholder.png', rating:76, positions:['LW','RW'], stats:{speed:84,shooting:68,passing:64,defending:35,physical:58} },
  ],
  ST: [
    { id:'DEN-HojlundR', name:'霍伊伦', nameEn:'Rasmus Hojlund', nationality:'DEN', avatar:'/images/players/placeholder.png', rating:84, positions:['ST'], stats:{speed:84,shooting:82,passing:62,defending:35,physical:80} },
    { id:'DEN-Wind', name:'温德', nameEn:'Jonas Wind', nationality:'DEN', avatar:'/images/players/placeholder.png', rating:78, positions:['ST','CAM'], stats:{speed:72,shooting:78,passing:66,defending:32,physical:72} },
  ],
},

ECU: {
  GK: [
    { id:'ECU-Galindez', name:'加林德斯', nameEn:'Hernan Galindez', nationality:'ECU', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:44,shooting:16,passing:44,defending:54,physical:60} },
  ],
  CB: [
    { id:'ECU-TorresF', name:'F·托雷斯', nameEn:'Felix Torres', nationality:'ECU', avatar:'/images/players/placeholder.png', rating:77, positions:['CB'], stats:{speed:62,shooting:35,passing:58,defending:82,physical:80} },
    { id:'ECU-Hincapie', name:'因卡皮耶', nameEn:'Piero Hincapie', nationality:'ECU', avatar:'/images/players/placeholder.png', rating:79, positions:['CB','LB'], stats:{speed:68,shooting:35,passing:62,defending:82,physical:78} },
    { id:'ECU-Arboleda', name:'阿沃莱达', nameEn:'Robert Arboleda', nationality:'ECU', avatar:'/images/players/placeholder.png', rating:76, positions:['CB'], stats:{speed:60,shooting:38,passing:55,defending:80,physical:80} },
  ],
  CM: [
    { id:'ECU-CaicedoM', name:'凯塞多', nameEn:'Moises Caicedo', nationality:'ECU', avatar:'/images/players/placeholder.png', rating:84, positions:['CM','CDM'], stats:{speed:70,shooting:62,passing:76,defending:82,physical:78} },
    { id:'ECU-Gruezzo', name:'格鲁埃索', nameEn:'Carlos Gruezo', nationality:'ECU', avatar:'/images/players/placeholder.png', rating:76, positions:['CDM','CM'], stats:{speed:58,shooting:48,passing:64,defending:80,physical:78} },
    { id:'ECU-MenaA', name:'梅纳', nameEn:'Angel Mena', nationality:'ECU', avatar:'/images/players/placeholder.png', rating:75, positions:['RM','CM'], stats:{speed:78,shooting:65,passing:66,defending:48,physical:60} },
  ],
  ST: [
    { id:'ECU-ValenciaE', name:'瓦伦西亚', nameEn:'Enner Valencia', nationality:'ECU', avatar:'/images/players/placeholder.png', rating:82, positions:['ST','LW'], stats:{speed:80,shooting:84,passing:62,defending:38,physical:76} },
    { id:'ECU-EstradaM', name:'埃斯特拉达', nameEn:'Michael Estrada', nationality:'ECU', avatar:'/images/players/placeholder.png', rating:75, positions:['ST'], stats:{speed:76,shooting:76,passing:55,defending:28,physical:72} },
  ],
},

EGY: {
  GK: [
    { id:'EGY-ElShenawy', name:'埃尔-舍纳维', nameEn:'Mohamed El-Shenawy', nationality:'EGY', avatar:'/images/players/placeholder.png', rating:80, positions:['GK'], stats:{speed:46,shooting:18,passing:46,defending:56,physical:62} },
  ],
  CB: [
    { id:'EGY-Hegazi', name:'赫加齐', nameEn:'Ahmed Hegazi', nationality:'EGY', avatar:'/images/players/placeholder.png', rating:80, positions:['CB'], stats:{speed:60,shooting:38,passing:62,defending:84,physical:82} },
    { id:'EGY-Abdelmonem', name:'阿卜杜勒莫内姆', nameEn:'Mohamed Abdelmonem', nationality:'EGY', avatar:'/images/players/placeholder.png', rating:77, positions:['CB'], stats:{speed:62,shooting:32,passing:58,defending:82,physical:78} },
  ],
  CM: [
    { id:'EGY-Elneny', name:'埃尔内尼', nameEn:'Mohamed Elneny', nationality:'EGY', avatar:'/images/players/placeholder.png', rating:80, positions:['CM','CDM'], stats:{speed:60,shooting:55,passing:74,defending:72,physical:70} },
  ],
  LW: [
    { id:'EGY-Marmoush', name:'马尔穆什', nameEn:'Omar Marmoush', nationality:'EGY', avatar:'/images/players/placeholder.png', rating:82, positions:['LW','ST'], stats:{speed:86,shooting:76,passing:70,defending:38,physical:64} },
    { id:'EGY-SalahM', name:'萨拉赫', nameEn:'Mohamed Salah', nationality:'EGY', avatar:'/images/players/placeholder.png', rating:89, positions:['RW','LW'], stats:{speed:90,shooting:88,passing:82,defending:42,physical:68} },
    { id:'EGY-Trezeguet', name:'特雷泽盖', nameEn:'Mahmoud Trezeguet', nationality:'EGY', avatar:'/images/players/placeholder.png', rating:77, positions:['LW','RM'], stats:{speed:80,shooting:68,passing:64,defending:42,physical:64} },
  ],
  ST: [
    { id:'EGY-MostafaM', name:'穆斯塔法·穆罕默德', nameEn:'Mostafa Mohamed', nationality:'EGY', avatar:'/images/players/placeholder.png', rating:77, positions:['ST'], stats:{speed:72,shooting:78,passing:55,defending:28,physical:76} },
  ],
},


ENG: {
  GK: [
    { id:'ENG-Pickford', name:'皮克福德', nameEn:'Jordan Pickford', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:83, positions:['GK'], stats:{speed:48,shooting:22,passing:48,defending:58,physical:64} },
    { id:'ENG-HendersonD', name:'D·亨德森', nameEn:'Dean Henderson', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:80, positions:['GK'], stats:{speed:46,shooting:20,passing:46,defending:56,physical:62} },
    { id:'ENG-Trafford', name:'特拉福德', nameEn:'James Trafford', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:44,shooting:18,passing:44,defending:54,physical:60} },
  ],
  CB: [
    { id:'ENG-Stones', name:'斯通斯', nameEn:'John Stones', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:83, positions:['CB','CDM'], stats:{speed:68,shooting:42,passing:74,defending:86,physical:78} },
    { id:'ENG-Guehi', name:'格希', nameEn:'Marc Guehi', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:82, positions:['CB'], stats:{speed:66,shooting:30,passing:62,defending:82,physical:76} },
    { id:'ENG-Konsa', name:'孔萨', nameEn:'Ezri Konsa', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:80, positions:['CB','RB'], stats:{speed:68,shooting:32,passing:62,defending:82,physical:78} },
    { id:'ENG-BurnD', name:'伯恩', nameEn:'Dan Burn', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:78, positions:['CB','LB'], stats:{speed:62,shooting:35,passing:60,defending:82,physical:84} },
    { id:'ENG-Quansah', name:'匡萨', nameEn:'Jarell Quansah', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:76, positions:['CB'], stats:{speed:66,shooting:28,passing:58,defending:80,physical:78} },
    { id:'ENG-ChalobahT', name:'查洛巴', nameEn:'Trevoh Chalobah', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:79, positions:['CB','CDM'], stats:{speed:64,shooting:38,passing:62,defending:82,physical:80} },
  ],
  LB: [
    { id:'ENG-Shaw', name:'卢克·肖', nameEn:'Luke Shaw', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:83, positions:['LB','CB'], stats:{speed:76,shooting:52,passing:74,defending:80,physical:76} },
    { id:'ENG-Chilwell', name:'奇尔韦尔', nameEn:'Ben Chilwell', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:81, positions:['LB','LM'], stats:{speed:80,shooting:55,passing:72,defending:78,physical:70} },
  ],
  RB: [
    { id:'ENG-JamesR', name:'里斯·詹姆斯', nameEn:'Reece James', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:84, positions:['RB','CB'], stats:{speed:82,shooting:58,passing:76,defending:82,physical:78} },
    { id:'ENG-Spence', name:'斯彭斯', nameEn:'Djed Spence', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:77, positions:['RB','RM'], stats:{speed:86,shooting:48,passing:64,defending:74,physical:70} },
    { id:'ENG-Trippier', name:'特里皮尔', nameEn:'Kieran Trippier', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:83, positions:['RB','LB'], stats:{speed:72,shooting:55,passing:78,defending:80,physical:72} },
  ],
  CM: [
    { id:'ENG-Rice', name:'赖斯', nameEn:'Declan Rice', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:86, positions:['CDM','CM'], stats:{speed:66,shooting:58,passing:78,defending:86,physical:82} },
    { id:'ENG-Bellingham', name:'贝林厄姆', nameEn:'Jude Bellingham', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:89, positions:['CM','CAM'], stats:{speed:78,shooting:82,passing:82,defending:72,physical:78} },
    { id:'ENG-Mainoo', name:'梅努', nameEn:'Kobbie Mainoo', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:82, positions:['CM','CDM'], stats:{speed:66,shooting:55,passing:78,defending:68,physical:64} },
    { id:'ENG-HendersonJ', name:'J·亨德森', nameEn:'Jordan Henderson', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:79, positions:['CM','CDM'], stats:{speed:58,shooting:58,passing:76,defending:72,physical:74} },
    { id:'ENG-AndersonE', name:'埃利奥特·安德森', nameEn:'Elliot Anderson', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:78, positions:['CM','LW'], stats:{speed:72,shooting:62,passing:68,defending:55,physical:62} },
    { id:'ENG-RogersM', name:'摩根·罗杰斯', nameEn:'Morgan Rogers', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:78, positions:['CAM','LW'], stats:{speed:76,shooting:68,passing:66,defending:42,physical:62} },
  ],
  LW: [
    { id:'ENG-Rashford', name:'拉什福德', nameEn:'Marcus Rashford', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:84, positions:['LW','ST'], stats:{speed:88,shooting:78,passing:68,defending:35,physical:66} },
    { id:'ENG-GordonA', name:'安东尼·戈登', nameEn:'Anthony Gordon', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:83, positions:['LW','RW'], stats:{speed:88,shooting:76,passing:66,defending:42,physical:62} },
  ],
  RW: [
    { id:'ENG-Saka', name:'萨卡', nameEn:'Bukayo Saka', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:86, positions:['RW','LM'], stats:{speed:84,shooting:76,passing:78,defending:55,physical:64} },
    { id:'ENG-Madueke', name:'马杜埃克', nameEn:'Noni Madueke', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:80, positions:['RW','LW'], stats:{speed:86,shooting:72,passing:64,defending:32,physical:58} },
  ],
  ST: [
    { id:'ENG-Kane', name:'凯恩', nameEn:'Harry Kane', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:91, positions:['ST'], stats:{speed:70,shooting:94,passing:82,defending:38,physical:82} },
    { id:'ENG-Toney', name:'托尼', nameEn:'Ivan Toney', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:82, positions:['ST'], stats:{speed:72,shooting:82,passing:64,defending:30,physical:78} },
    { id:'ENG-Watkins', name:'沃特金斯', nameEn:'Ollie Watkins', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:83, positions:['ST'], stats:{speed:84,shooting:82,passing:66,defending:35,physical:72} },
    { id:'ENG-OReilly', name:'奥赖利', nameEn:'Nico O\'Reilly', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:72, positions:['CM','CAM'], stats:{speed:66,shooting:58,passing:68,defending:55,physical:60} },
  ],
},

ESP: {
  GK: [
    { id:'ESP-UnaiSim', name:'乌奈·西蒙', nameEn:'Unai Simon', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:83, positions:['GK'], stats:{speed:48,shooting:20,passing:50,defending:58,physical:64} },
    { id:'ESP-Raya', name:'拉亚', nameEn:'David Raya', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:84, positions:['GK'], stats:{speed:50,shooting:18,passing:48,defending:56,physical:62} },
    { id:'ESP-GarciaJ', name:'J·加西亚', nameEn:'Joan García', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:46,shooting:16,passing:44,defending:54,physical:60} },
  ],
  CB: [
    { id:'ESP-Laporte', name:'拉波尔特', nameEn:'Aymeric Laporte', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:84, positions:['CB','LB'], stats:{speed:66,shooting:42,passing:72,defending:86,physical:78} },
    { id:'ESP-Cubarsi', name:'库巴西', nameEn:'Pau Cubarsí', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:80, positions:['CB'], stats:{speed:64,shooting:30,passing:66,defending:84,physical:74} },
    { id:'ESP-GarciaE', name:'埃里克·加西亚', nameEn:'Eric García', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:79, positions:['CB','CDM'], stats:{speed:62,shooting:32,passing:66,defending:80,physical:76} },
    { id:'ESP-Pubill', name:'普维尔', nameEn:'Marc Pubill', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:76, positions:['RB','CB'], stats:{speed:80,shooting:35,passing:62,defending:78,physical:74} },
  ],
  LB: [
    { id:'ESP-Cucurella', name:'库库雷利亚', nameEn:'Marc Cucurella', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:82, positions:['LB','LM'], stats:{speed:82,shooting:48,passing:72,defending:78,physical:72} },
    { id:'ESP-Grimaldo', name:'格里马尔多', nameEn:'Alejandro Grimaldo', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:84, positions:['LB','LM'], stats:{speed:78,shooting:62,passing:80,defending:74,physical:66} },
  ],
  RB: [
    { id:'ESP-PedroPorro', name:'波罗', nameEn:'Pedro Porro', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:82, positions:['RB','RM'], stats:{speed:82,shooting:55,passing:70,defending:76,physical:72} },
    { id:'ESP-LlorenteM', name:'M·略伦特', nameEn:'Marcos Llorente', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:82, positions:['RB','CM'], stats:{speed:86,shooting:68,passing:72,defending:68,physical:74} },
  ],
  CM: [
    { id:'ESP-Rodri', name:'罗德里', nameEn:'Rodri', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:91, positions:['CDM','CM'], stats:{speed:62,shooting:65,passing:84,defending:88,physical:84} },
    { id:'ESP-Pedri', name:'佩德里', nameEn:'Pedri', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:86, positions:['CM','CAM'], stats:{speed:72,shooting:58,passing:86,defending:62,physical:58} },
    { id:'ESP-Gavi', name:'加维', nameEn:'Gavi', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:85, positions:['CM','CAM'], stats:{speed:70,shooting:58,passing:82,defending:62,physical:58} },
    { id:'ESP-RuizF', name:'法比安·鲁伊斯', nameEn:'Fabian Ruiz', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:84, positions:['CM','CAM'], stats:{speed:64,shooting:68,passing:80,defending:62,physical:66} },
    { id:'ESP-Merino', name:'梅里诺', nameEn:'Mikel Merino', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:83, positions:['CM','CDM'], stats:{speed:64,shooting:68,passing:74,defending:74,physical:76} },
    { id:'ESP-Zubimendi', name:'苏维门迪', nameEn:'Martín Zubimendi', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:83, positions:['CDM','CM'], stats:{speed:60,shooting:52,passing:76,defending:82,physical:78} },
    { id:'ESP-Baena', name:'巴埃纳', nameEn:'Alex Baena', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:81, positions:['CM','CAM'], stats:{speed:66,shooting:65,passing:76,defending:48,physical:58} },
  ],
  LW: [
    { id:'ESP-NicoWilliams', name:'尼科·威廉姆斯', nameEn:'Nico Williams', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:83, positions:['LW','RW'], stats:{speed:90,shooting:72,passing:74,defending:38,physical:62} },
    { id:'ESP-Oyarzabal', name:'奥亚萨瓦尔', nameEn:'Mikel Oyarzabal', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:83, positions:['LW','ST'], stats:{speed:78,shooting:80,passing:74,defending:42,physical:64} },
  ],
  RW: [
    { id:'ESP-Yamal', name:'亚马尔', nameEn:'Lamine Yamal', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:84, positions:['RW','LW'], stats:{speed:90,shooting:78,passing:82,defending:32,physical:58} },
    { id:'ESP-TorresF', name:'费兰·托雷斯', nameEn:'Ferran Torres', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:80, positions:['RW','ST'], stats:{speed:84,shooting:76,passing:68,defending:38,physical:62} },
    { id:'ESP-PinoY', name:'耶雷米·皮诺', nameEn:'Yeremy Pino', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:79, positions:['RW','LW'], stats:{speed:82,shooting:72,passing:66,defending:35,physical:58} },
  ],
  CAM: [
    { id:'ESP-Olmo', name:'奥尔莫', nameEn:'Dani Olmo', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:84, positions:['CAM','LW'], stats:{speed:78,shooting:76,passing:78,defending:48,physical:60} },
  ],
  ST: [
    { id:'ESP-Morata', name:'莫拉塔', nameEn:'Alvaro Morata', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:83, positions:['ST'], stats:{speed:78,shooting:84,passing:64,defending:32,physical:76} },
    { id:'ESP-IglesiasB', name:'博尔哈·伊格莱西亚斯', nameEn:'Borja Iglesias', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:78, positions:['ST'], stats:{speed:66,shooting:78,passing:58,defending:28,physical:80} },
    { id:'ESP-VictorMunoz', name:'维克托·穆尼奥斯', nameEn:'Víctor Muñoz', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:74, positions:['ST'], stats:{speed:72,shooting:74,passing:55,defending:28,physical:72} },
  ],
},

FRA: {
  GK: [
    { id:'FRA-Maignan', name:'迈尼昂', nameEn:'Mike Maignan', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:88, positions:['GK'], stats:{speed:52,shooting:22,passing:52,defending:60,physical:66} },
    { id:'FRA-SambaB', name:'桑巴', nameEn:'Brice Samba', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:82, positions:['GK'], stats:{speed:48,shooting:20,passing:48,defending:58,physical:64} },
    { id:'FRA-Risser', name:'里塞尔', nameEn:'Robin Risser', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:72, positions:['GK'], stats:{speed:44,shooting:16,passing:42,defending:52,physical:58} },
  ],
  CB: [
    { id:'FRA-Saliba', name:'萨利巴', nameEn:'William Saliba', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:85, positions:['CB'], stats:{speed:74,shooting:35,passing:68,defending:88,physical:82} },
    { id:'FRA-Upamecano', name:'于帕梅卡诺', nameEn:'Dayot Upamecano', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:83, positions:['CB'], stats:{speed:74,shooting:38,passing:66,defending:86,physical:84} },
    { id:'FRA-Konate', name:'科纳特', nameEn:'Ibrahima Konaté', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:84, positions:['CB'], stats:{speed:72,shooting:35,passing:62,defending:86,physical:82} },
    { id:'FRA-Kounde', name:'孔德', nameEn:'Jules Koundé', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:84, positions:['CB','RB'], stats:{speed:78,shooting:38,passing:66,defending:86,physical:78} },
    { id:'FRA-Lacroix', name:'拉克罗瓦', nameEn:'Maxence Lacroix', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:79, positions:['CB'], stats:{speed:72,shooting:32,passing:60,defending:82,physical:80} },
    { id:'FRA-LucasH', name:'L·埃尔南德斯', nameEn:'Lucas Hernandez', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:84, positions:['CB','LB'], stats:{speed:76,shooting:42,passing:68,defending:84,physical:80} },
  ],
  LB: [
    { id:'FRA-HernandezT', name:'T·埃尔南德斯', nameEn:'Theo Hernandez', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:86, positions:['LB','LM'], stats:{speed:90,shooting:62,passing:74,defending:78,physical:76} },
    { id:'FRA-Digne', name:'迪涅', nameEn:'Lucas Digne', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:82, positions:['LB','LM'], stats:{speed:80,shooting:55,passing:72,defending:78,physical:74} },
  ],
  RB: [
    { id:'FRA-Gusto', name:'古斯托', nameEn:'Malo Gusto', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:80, positions:['RB','RM'], stats:{speed:84,shooting:48,passing:68,defending:78,physical:72} },
  ],
  CDM: [
    { id:'FRA-Kante', name:'坎特', nameEn:'N\'Golo Kanté', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:86, positions:['CDM','CM'], stats:{speed:76,shooting:48,passing:72,defending:90,physical:78} },
    { id:'FRA-Tchouameni', name:'楚阿梅尼', nameEn:'Aurélien Tchouaméni', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:85, positions:['CDM','CM'], stats:{speed:66,shooting:62,passing:76,defending:86,physical:82} },
  ],
  CM: [
    { id:'FRA-Rabiot', name:'拉比奥', nameEn:'Adrien Rabiot', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:83, positions:['CM','CDM'], stats:{speed:72,shooting:68,passing:76,defending:74,physical:78} },
    { id:'FRA-ZaireEmery', name:'扎伊尔-埃梅里', nameEn:'Warren Zaïre-Emery', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:82, positions:['CM','CDM'], stats:{speed:70,shooting:58,passing:74,defending:72,physical:68} },
    { id:'FRA-KoneM', name:'马努·科内', nameEn:'Manu Koné', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:79, positions:['CM','CDM'], stats:{speed:68,shooting:55,passing:70,defending:72,physical:74} },
  ],
  LW: [
    { id:'FRA-Barcola', name:'巴尔科拉', nameEn:'Bradley Barcola', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:81, positions:['LW','RW'], stats:{speed:90,shooting:72,passing:66,defending:35,physical:58} },
    { id:'FRA-Cherki', name:'切尔基', nameEn:'Rayan Cherki', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:78, positions:['CAM','LW'], stats:{speed:78,shooting:68,passing:74,defending:35,physical:55} },
    { id:'FRA-Doue', name:'杜埃', nameEn:'Désiré Doué', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:76, positions:['LW','CAM'], stats:{speed:82,shooting:65,passing:68,defending:35,physical:55} },
    { id:'FRA-Akliouche', name:'阿克利乌什', nameEn:'Maghnes Akliouche', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:76, positions:['LW','RW'], stats:{speed:84,shooting:68,passing:64,defending:32,physical:55} },
  ],
  RW: [
    { id:'FRA-Dembele', name:'登贝莱', nameEn:'Ousmane Dembélé', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:87, positions:['RW','LW'], stats:{speed:90,shooting:72,passing:76,defending:35,physical:58} },
    { id:'FRA-Olise', name:'奥利塞', nameEn:'Michael Olise', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:84, positions:['RW','CAM'], stats:{speed:80,shooting:72,passing:76,defending:35,physical:60} },
  ],
  ST: [
    { id:'FRA-Mbappe', name:'姆巴佩', nameEn:'Kylian Mbappé', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:91, positions:['ST','LW'], stats:{speed:96,shooting:90,passing:78,defending:32,physical:76} },
    { id:'FRA-Muani', name:'穆阿尼', nameEn:'Randal Kolo Muani', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:83, positions:['ST','LW'], stats:{speed:84,shooting:80,passing:64,defending:35,physical:72} },
    { id:'FRA-ThuramM', name:'M·图拉姆', nameEn:'Marcus Thuram', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:84, positions:['ST','LW'], stats:{speed:86,shooting:80,passing:66,defending:38,physical:78} },
    { id:'FRA-Mateta', name:'马特塔', nameEn:'Jean-Philippe Mateta', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:79, positions:['ST'], stats:{speed:76,shooting:80,passing:58,defending:28,physical:80} },
    { id:'FRA-Giroud', name:'吉鲁', nameEn:'Olivier Giroud', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:84, positions:['ST'], stats:{speed:55,shooting:86,passing:66,defending:32,physical:84} },
  ],
},

GER: {
  GK: [
    { id:'GER-Neuer', name:'诺伊尔', nameEn:'Manuel Neuer', nationality:'GER', avatar:'/images/players/placeholder.png', rating:86, positions:['GK'], stats:{speed:55,shooting:22,passing:55,defending:62,physical:68} },
    { id:'GER-BaumannO', name:'鲍曼', nameEn:'Oliver Baumann', nationality:'GER', avatar:'/images/players/placeholder.png', rating:80, positions:['GK'], stats:{speed:48,shooting:20,passing:48,defending:58,physical:64} },
    { id:'GER-Nubel', name:'尼贝尔', nameEn:'Alexander Nübel', nationality:'GER', avatar:'/images/players/placeholder.png', rating:78, positions:['GK'], stats:{speed:50,shooting:18,passing:46,defending:56,physical:62} },
  ],
  CB: [
    { id:'GER-Kimmich', name:'基米希', nameEn:'Joshua Kimmich', nationality:'GER', avatar:'/images/players/placeholder.png', rating:86, positions:['RB','CM'], stats:{speed:72,shooting:62,passing:86,defending:82,physical:78} },
    { id:'GER-Rudiger', name:'吕迪格', nameEn:'Antonio Rüdiger', nationality:'GER', avatar:'/images/players/placeholder.png', rating:86, positions:['CB','LB'], stats:{speed:78,shooting:42,passing:64,defending:88,physical:86} },
    { id:'GER-Tah', name:'塔赫', nameEn:'Jonathan Tah', nationality:'GER', avatar:'/images/players/placeholder.png', rating:83, positions:['CB'], stats:{speed:64,shooting:32,passing:62,defending:85,physical:82} },
    { id:'GER-Schlotterbeck', name:'施洛特贝克', nameEn:'Nico Schlotterbeck', nationality:'GER', avatar:'/images/players/placeholder.png', rating:82, positions:['CB'], stats:{speed:72,shooting:38,passing:64,defending:84,physical:82} },
    { id:'GER-Thiaw', name:'蒂奥', nameEn:'Malick Thiaw', nationality:'GER', avatar:'/images/players/placeholder.png', rating:79, positions:['CB'], stats:{speed:72,shooting:32,passing:58,defending:82,physical:80} },
    { id:'GER-Anton', name:'安东', nameEn:'Waldemar Anton', nationality:'GER', avatar:'/images/players/placeholder.png', rating:78, positions:['CB','CDM'], stats:{speed:62,shooting:35,passing:62,defending:80,physical:78} },
  ],
  LB: [
    { id:'GER-Raum', name:'劳姆', nameEn:'David Raum', nationality:'GER', avatar:'/images/players/placeholder.png', rating:80, positions:['LB','LM'], stats:{speed:82,shooting:48,passing:72,defending:76,physical:72} },
    { id:'GER-BrownN', name:'N·布朗', nameEn:'Nathaniel Brown', nationality:'GER', avatar:'/images/players/placeholder.png', rating:76, positions:['LB','LM'], stats:{speed:80,shooting:42,passing:64,defending:74,physical:70} },
  ],
  CM: [
    { id:'GER-Goretzka', name:'戈雷茨卡', nameEn:'Leon Goretzka', nationality:'GER', avatar:'/images/players/placeholder.png', rating:82, positions:['CM','CDM'], stats:{speed:72,shooting:74,passing:78,defending:78,physical:84} },
    { id:'GER-GroB', name:'格罗斯', nameEn:'Pascal Groß', nationality:'GER', avatar:'/images/players/placeholder.png', rating:80, positions:['CDM','CM'], stats:{speed:62,shooting:58,passing:76,defending:74,physical:72} },
    { id:'GER-Pavlovic', name:'帕夫洛维奇', nameEn:'Aleksandar Pavlović', nationality:'GER', avatar:'/images/players/placeholder.png', rating:80, positions:['CM','CDM'], stats:{speed:64,shooting:62,passing:74,defending:72,physical:70} },
    { id:'GER-AmirN', name:'阿米里', nameEn:'Nadiem Amiri', nationality:'GER', avatar:'/images/players/placeholder.png', rating:78, positions:['CM','CAM'], stats:{speed:68,shooting:65,passing:72,defending:55,physical:62} },
    { id:'GER-Stiller', name:'施蒂勒', nameEn:'Angelo Stiller', nationality:'GER', avatar:'/images/players/placeholder.png', rating:78, positions:['CM','CDM'], stats:{speed:64,shooting:55,passing:72,defending:68,physical:66} },
    { id:'GER-NmechaF', name:'F·恩梅查', nameEn:'Felix Nmecha', nationality:'GER', avatar:'/images/players/placeholder.png', rating:78, positions:['CM','CAM'], stats:{speed:68,shooting:62,passing:70,defending:62,physical:64} },
    { id:'GER-Leweling', name:'莱韦林', nameEn:'Jamie Leweling', nationality:'GER', avatar:'/images/players/placeholder.png', rating:76, positions:['CAM','RW'], stats:{speed:82,shooting:65,passing:66,defending:42,physical:58} },
  ],
  CAM: [
    { id:'GER-Musiala', name:'穆西亚拉', nameEn:'Jamal Musiala', nationality:'GER', avatar:'/images/players/placeholder.png', rating:88, positions:['CAM','LW'], stats:{speed:82,shooting:76,passing:78,defending:42,physical:62} },
    { id:'GER-Wirtz', name:'维尔茨', nameEn:'Florian Wirtz', nationality:'GER', avatar:'/images/players/placeholder.png', rating:89, positions:['CAM','LW'], stats:{speed:82,shooting:80,passing:84,defending:42,physical:60} },
  ],
  LW: [
    { id:'GER-Sane', name:'萨内', nameEn:'Leroy Sané', nationality:'GER', avatar:'/images/players/placeholder.png', rating:84, positions:['RW','LW'], stats:{speed:92,shooting:76,passing:74,defending:38,physical:62} },
  ],
  ST: [
    { id:'GER-Havertz', name:'哈弗茨', nameEn:'Kai Havertz', nationality:'GER', avatar:'/images/players/placeholder.png', rating:83, positions:['CAM','ST'], stats:{speed:78,shooting:78,passing:74,defending:48,physical:66} },
    { id:'GER-Undav', name:'翁达夫', nameEn:'Deniz Undav', nationality:'GER', avatar:'/images/players/placeholder.png', rating:79, positions:['ST'], stats:{speed:72,shooting:78,passing:60,defending:30,physical:74} },
    { id:'GER-Beier', name:'拜尔', nameEn:'Maximilian Beier', nationality:'GER', avatar:'/images/players/placeholder.png', rating:77, positions:['ST','LW'], stats:{speed:84,shooting:76,passing:58,defending:28,physical:66} },
    { id:'GER-KarlL', name:'卡尔', nameEn:'Lennart Karl', nationality:'GER', avatar:'/images/players/placeholder.png', rating:74, positions:['ST'], stats:{speed:70,shooting:74,passing:55,defending:28,physical:72} },
    { id:'GER-Woltemade', name:'沃尔特马德', nameEn:'Nick Woltemade', nationality:'GER', avatar:'/images/players/placeholder.png', rating:74, positions:['ST'], stats:{speed:68,shooting:72,passing:55,defending:28,physical:74} },
  ],
},

GHA: {
  GK: [
    { id:'GHA-AtiZigi', name:'阿蒂-齐吉', nameEn:'Lawrence Ati-Zigi', nationality:'GHA', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:44,shooting:16,passing:42,defending:54,physical:60} },
  ],
  CB: [
    { id:'GHA-SalisuM', name:'萨利苏', nameEn:'Mohammed Salisu', nationality:'GHA', avatar:'/images/players/placeholder.png', rating:79, positions:['CB'], stats:{speed:66,shooting:35,passing:58,defending:84,physical:80} },
    { id:'GHA-Djiku', name:'吉库', nameEn:'Alexander Djiku', nationality:'GHA', avatar:'/images/players/placeholder.png', rating:78, positions:['CB'], stats:{speed:62,shooting:32,passing:60,defending:82,physical:80} },
  ],
  CM: [
    { id:'GHA-Partey', name:'帕尔特伊', nameEn:'Thomas Partey', nationality:'GHA', avatar:'/images/players/placeholder.png', rating:84, positions:['CDM','CM'], stats:{speed:66,shooting:68,passing:78,defending:82,physical:82} },
    { id:'GHA-Kudus', name:'库杜斯', nameEn:'Mohammed Kudus', nationality:'GHA', avatar:'/images/players/placeholder.png', rating:85, positions:['CAM','CM'], stats:{speed:78,shooting:76,passing:74,defending:55,physical:62} },
  ],
  LW: [
    { id:'GHA-AyewA', name:'安德烈·阿尤', nameEn:'Andre Ayew', nationality:'GHA', avatar:'/images/players/placeholder.png', rating:79, positions:['LW','ST'], stats:{speed:72,shooting:76,passing:68,defending:42,physical:66} },
  ],
  ST: [
    { id:'GHA-WilliamsI', name:'威廉姆斯', nameEn:'Inaki Williams', nationality:'GHA', avatar:'/images/players/placeholder.png', rating:83, positions:['ST','RW'], stats:{speed:88,shooting:80,passing:66,defending:38,physical:76} },
    { id:'GHA-AyewJ', name:'乔丹·阿尤', nameEn:'Jordan Ayew', nationality:'GHA', avatar:'/images/players/placeholder.png', rating:78, positions:['ST','LW'], stats:{speed:76,shooting:74,passing:62,defending:35,physical:70} },
    { id:'GHA-Semenyo', name:'塞梅尼奥', nameEn:'Antoine Semenyo', nationality:'GHA', avatar:'/images/players/placeholder.png', rating:76, positions:['ST','LW'], stats:{speed:84,shooting:74,passing:58,defending:32,physical:72} },
  ],
},


GRE: {
  GK: [
    { id:'GRE-Vlachodimos', name:'弗拉乔季莫斯', nameEn:'Odisseas Vlachodimos', nationality:'GRE', avatar:'/images/players/placeholder.png', rating:78, positions:['GK'], stats:{speed:46,shooting:18,passing:44,defending:56,physical:62} },
  ],
  CB: [
    { id:'GRE-Mavropanos', name:'马夫罗帕诺斯', nameEn:'Konstantinos Mavropanos', nationality:'GRE', avatar:'/images/players/placeholder.png', rating:79, positions:['CB'], stats:{speed:64,shooting:35,passing:60,defending:82,physical:80} },
    { id:'GRE-Hatzidiakos', name:'哈齐迪亚科斯', nameEn:'Pantelis Hatzidiakos', nationality:'GRE', avatar:'/images/players/placeholder.png', rating:75, positions:['CB'], stats:{speed:60,shooting:30,passing:55,defending:78,physical:76} },
  ],
  CM: [
    { id:'GRE-Bakasetas', name:'巴卡塞塔斯', nameEn:'Anastasios Bakasetas', nationality:'GRE', avatar:'/images/players/placeholder.png', rating:78, positions:['CAM','CM'], stats:{speed:66,shooting:72,passing:70,defending:48,physical:62} },
    { id:'GRE-Kourbelis', name:'库尔贝利斯', nameEn:'Dimitris Kourbelis', nationality:'GRE', avatar:'/images/players/placeholder.png', rating:75, positions:['CDM','CM'], stats:{speed:58,shooting:48,passing:64,defending:74,physical:74} },
  ],
  LW: [
    { id:'GRE-Masalas', name:'马萨拉斯', nameEn:'Giorgos Masouras', nationality:'GRE', avatar:'/images/players/placeholder.png', rating:74, positions:['LW','RW'], stats:{speed:82,shooting:65,passing:62,defending:35,physical:58} },
  ],
  ST: [
    { id:'GRE-Pavlidis', name:'帕夫利季斯', nameEn:'Vangelis Pavlidis', nationality:'GRE', avatar:'/images/players/placeholder.png', rating:77, positions:['ST'], stats:{speed:74,shooting:78,passing:55,defending:28,physical:72} },
    { id:'GRE-Giakoumakis', name:'贾库马基斯', nameEn:'Giorgos Giakoumakis', nationality:'GRE', avatar:'/images/players/placeholder.png', rating:76, positions:['ST'], stats:{speed:70,shooting:78,passing:52,defending:28,physical:78} },
  ],
},

IRN: {
  GK: [
    { id:'IRN-Beiranvand', name:'贝兰万德', nameEn:'Alireza Beiranvand', nationality:'IRN', avatar:'/images/players/placeholder.png', rating:78, positions:['GK'], stats:{speed:48,shooting:18,passing:44,defending:56,physical:62} },
  ],
  CB: [
    { id:'IRN-Kanaani', name:'卡纳尼', nameEn:'Hossein Kanaani', nationality:'IRN', avatar:'/images/players/placeholder.png', rating:76, positions:['CB'], stats:{speed:58,shooting:35,passing:58,defending:80,physical:78} },
    { id:'IRN-Khalilzadeh', name:'哈利勒扎德', nameEn:'Shoja Khalilzadeh', nationality:'IRN', avatar:'/images/players/placeholder.png', rating:74, positions:['CB'], stats:{speed:58,shooting:30,passing:55,defending:78,physical:76} },
  ],
  CM: [
    { id:'IRN-Ezatolahi', name:'埃扎托拉希', nameEn:'Saeid Ezatolahi', nationality:'IRN', avatar:'/images/players/placeholder.png', rating:76, positions:['CDM','CM'], stats:{speed:60,shooting:52,passing:66,defending:76,physical:76} },
  ],
  LW: [
    { id:'IRN-Jahanbakhsh', name:'贾汉巴赫什', nameEn:'Alireza Jahanbakhsh', nationality:'IRN', avatar:'/images/players/placeholder.png', rating:77, positions:['RW','LW'], stats:{speed:84,shooting:72,passing:64,defending:42,physical:62} },
    { id:'IRN-Taremi', name:'塔雷米', nameEn:'Mehdi Taremi', nationality:'IRN', avatar:'/images/players/placeholder.png', rating:83, positions:['ST','LW'], stats:{speed:78,shooting:84,passing:72,defending:38,physical:76} },
  ],
  ST: [
    { id:'IRN-Azadeh', name:'阿扎德', nameEn:'Sardar Azmoun', nationality:'IRN', avatar:'/images/players/placeholder.png', rating:82, positions:['ST','LW'], stats:{speed:80,shooting:82,passing:64,defending:35,physical:74} },
  ],
},

IRQ: {
  GK: [
    { id:'IRQ-HassanJ', name:'贾拉勒·哈桑', nameEn:'Jalal Hassan', nationality:'IRQ', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:46,shooting:18,passing:44,defending:54,physical:60} },
  ],
  CB: [
    { id:'IRQ-Sulaka', name:'苏拉卡', nameEn:'Rebin Sulaka', nationality:'IRQ', avatar:'/images/players/placeholder.png', rating:72, positions:['CB'], stats:{speed:58,shooting:28,passing:52,defending:78,physical:76} },
  ],
  ST: [
    { id:'IRQ-HusseinA', name:'艾曼·侯赛因', nameEn:'Aymen Hussein', nationality:'IRQ', avatar:'/images/players/placeholder.png', rating:76, positions:['ST'], stats:{speed:72,shooting:78,passing:55,defending:28,physical:76} },
  ],
},

JPN: {
  GK: [
    { id:'JPN-SuzukiZ', name:'铃木彩艳', nameEn:'Zion Suzuki', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:48,shooting:18,passing:46,defending:56,physical:62} },
    { id:'JPN-OsakoK', name:'大迫敬介', nameEn:'Keisuke Osako', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:72, positions:['GK'], stats:{speed:44,shooting:16,passing:42,defending:52,physical:58} },
    { id:'JPN-HayakawaT', name:'早川朋宏', nameEn:'Tomoki Hayakawa', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:70, positions:['GK'], stats:{speed:42,shooting:14,passing:40,defending:50,physical:56} },
  ],
  CB: [
    { id:'JPN-Tomiyasu', name:'富安健洋', nameEn:'Takehiro Tomiyasu', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:80, positions:['CB','RB'], stats:{speed:72,shooting:38,passing:66,defending:86,physical:80} },
    { id:'JPN-Itakura', name:'板仓滉', nameEn:'Ko Itakura', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:78, positions:['CB','CDM'], stats:{speed:62,shooting:38,passing:64,defending:82,physical:78} },
    { id:'JPN-Taniguchi', name:'谷口彰悟', nameEn:'Shogo Taniguchi', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:74, positions:['CB'], stats:{speed:60,shooting:32,passing:60,defending:80,physical:78} },
    { id:'JPN-WatanabeT', name:'渡边刚', nameEn:'Tsuyoshi Watanabe', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:74, positions:['CB'], stats:{speed:58,shooting:30,passing:55,defending:80,physical:78} },
    { id:'JPN-ItoH', name:'伊藤洋辉', nameEn:'Hiroki Ito', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:80, positions:['CB','LB'], stats:{speed:66,shooting:38,passing:64,defending:82,physical:78} },
    { id:'JPN-SekoA', name:'濑古步梦', nameEn:'Ayumu Seko', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:72, positions:['CB'], stats:{speed:60,shooting:30,passing:55,defending:78,physical:76} },
  ],
  LB: [
    { id:'JPN-Nagatomo', name:'长友佑都', nameEn:'Yuto Nagatomo', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:75, positions:['LB','RB'], stats:{speed:80,shooting:48,passing:66,defending:76,physical:72} },
  ],
  RB: [
    { id:'JPN-Sugawara', name:'菅原由势', nameEn:'Yukinari Sugawara', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:76, positions:['RB','LB'], stats:{speed:82,shooting:42,passing:64,defending:76,physical:70} },
  ],
  CM: [
    { id:'JPN-EndoW', name:'远藤航', nameEn:'Wataru Endo', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:80, positions:['CDM','CM'], stats:{speed:58,shooting:55,passing:72,defending:84,physical:82} },
    { id:'JPN-Kamada', name:'镰田大地', nameEn:'Daichi Kamada', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:80, positions:['CAM','CM'], stats:{speed:72,shooting:76,passing:76,defending:52,physical:62} },
    { id:'JPN-ItoJ', name:'伊东纯也', nameEn:'Junya Ito', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:78, positions:['RW','LW'], stats:{speed:90,shooting:72,passing:68,defending:42,physical:58} },
    { id:'JPN-Doan', name:'堂安律', nameEn:'Ritsu Doan', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:78, positions:['RW','CAM'], stats:{speed:82,shooting:72,passing:66,defending:42,physical:58} },
    { id:'JPN-TanakaA', name:'田中碧', nameEn:'Ao Tanaka', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CAM'], stats:{speed:66,shooting:62,passing:70,defending:58,physical:62} },
    { id:'JPN-SanoK', name:'佐野海舟', nameEn:'Kaishu Sano', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:74, positions:['CM','CDM'], stats:{speed:62,shooting:55,passing:66,defending:70,physical:68} },
    { id:'JPN-SuzukiJ', name:'铃木准之介', nameEn:'Junnosuke Suzuki', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:74, positions:['CM','CAM'], stats:{speed:64,shooting:58,passing:68,defending:55,physical:60} },
  ],
  CAM: [
    { id:'JPN-KuboT', name:'久保建英', nameEn:'Takefusa Kubo', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:80, positions:['RW','CAM'], stats:{speed:82,shooting:72,passing:72,defending:38,physical:55} },
  ],
  LW: [
    { id:'JPN-NakamuraK', name:'中村敬斗', nameEn:'Keito Nakamura', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:76, positions:['LW','RW'], stats:{speed:82,shooting:68,passing:64,defending:35,physical:58} },
    { id:'JPN-SuzukiY', name:'铃木唯人', nameEn:'Yuito Suzuki', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:72, positions:['LW','CAM'], stats:{speed:80,shooting:62,passing:62,defending:32,physical:55} },
  ],
  ST: [
    { id:'JPN-MaedaD', name:'前田大然', nameEn:'Daizen Maeda', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:78, positions:['ST','LW'], stats:{speed:90,shooting:76,passing:58,defending:38,physical:68} },
    { id:'JPN-UedaA', name:'上田绮世', nameEn:'Ayase Ueda', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:76, positions:['ST'], stats:{speed:80,shooting:78,passing:55,defending:28,physical:70} },
    { id:'JPN-OgawaK', name:'小川航基', nameEn:'Koki Ogawa', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:74, positions:['ST'], stats:{speed:72,shooting:74,passing:52,defending:25,physical:72} },
    { id:'JPN-ShiogaiK', name:'盐贝健人', nameEn:'Kento Shiogai', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:72, positions:['ST'], stats:{speed:74,shooting:70,passing:50,defending:22,physical:68} },
    { id:'JPN-GotoK', name:'后藤圭介', nameEn:'Keisuke Goto', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:70, positions:['ST'], stats:{speed:72,shooting:68,passing:48,defending:22,physical:66} },
  ],
},

KOR: {
  GK: [
    { id:'KOR-JoHW', name:'赵贤祐', nameEn:'Jo Hyeon-woo', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:74, positions:['GK'], stats:{speed:48,shooting:16,passing:42,defending:54,physical:58} },
    { id:'KOR-KimSG', name:'金承奎', nameEn:'Kim Seung-gyu', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:72, positions:['GK'], stats:{speed:46,shooting:18,passing:44,defending:56,physical:62} },
    { id:'KOR-SongBK', name:'宋范根', nameEn:'Song Bum-keun', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:70, positions:['GK'], stats:{speed:44,shooting:16,passing:40,defending:50,physical:56} },
  ],
  CB: [
    { id:'KOR-KimMJ', name:'金玟哉', nameEn:'Kim Min-jae', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:84, positions:['CB'], stats:{speed:74,shooting:42,passing:66,defending:88,physical:84} },
    { id:'KOR-LeeHB', name:'李汉范', nameEn:'Lee Han-beom', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:72, positions:['CB'], stats:{speed:62,shooting:30,passing:55,defending:78,physical:76} },
    { id:'KOR-KimTH2', name:'金泰贤', nameEn:'Kim Tae-hyun', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:70, positions:['CB'], stats:{speed:58,shooting:28,passing:52,defending:76,physical:74} },
    { id:'KOR-ParkJS', name:'朴镇燮', nameEn:'Park Jin-seop', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:74, positions:['CB','CDM'], stats:{speed:60,shooting:35,passing:58,defending:78,physical:76} },
    { id:'KOR-SeolYW', name:'薛英佑', nameEn:'Seol Young-woo', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:74, positions:['RB','CB'], stats:{speed:78,shooting:38,passing:62,defending:76,physical:74} },
    { id:'KOR-CastropJ', name:'卡斯特罗普', nameEn:'Jens Castrop', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:72, positions:['CB','CM'], stats:{speed:62,shooting:35,passing:60,defending:76,physical:74} },
  ],
  LB: [
    { id:'KOR-LeeTS', name:'李太锡', nameEn:'Lee Tae-seok', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:72, positions:['LB','LM'], stats:{speed:80,shooting:42,passing:60,defending:74,physical:70} },
    { id:'KOR-KimMH', name:'金文焕', nameEn:'Kim Moon-hwan', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:72, positions:['RB','LB'], stats:{speed:82,shooting:38,passing:58,defending:72,physical:70} },
    { id:'KOR-ChoWJ', name:'赵威济', nameEn:'Cho Wi-je', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:70, positions:['LB','CB'], stats:{speed:76,shooting:32,passing:55,defending:74,physical:72} },
  ],
  RB: [
    { id:'KOR-LeeKH', name:'李基赫', nameEn:'Lee Ki-hyeok', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:70, positions:['RB','RM'], stats:{speed:80,shooting:38,passing:55,defending:72,physical:68} },
  ],
  CM: [
    { id:'KOR-HwangIB', name:'黄仁范', nameEn:'Hwang In-beom', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:78, positions:['CM','CDM'], stats:{speed:66,shooting:58,passing:74,defending:68,physical:66} },
    { id:'KOR-LeeJS', name:'李在城', nameEn:'Lee Jae-sung', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CAM'], stats:{speed:66,shooting:65,passing:70,defending:58,physical:62} },
    { id:'KOR-BaeJH', name:'裴俊镐', nameEn:'Bae Jun-ho', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:74, positions:['CM','CAM'], stats:{speed:68,shooting:58,passing:66,defending:48,physical:58} },
    { id:'KOR-ParkSH', name:'白昇浩', nameEn:'Paik Seung-ho', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:74, positions:['CM','CDM'], stats:{speed:62,shooting:58,passing:68,defending:62,physical:64} },
    { id:'KOR-KimJK', name:'金镇圭', nameEn:'Kim Jin-kyu', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:72, positions:['CM','CDM'], stats:{speed:62,shooting:52,passing:64,defending:66,physical:66} },
    { id:'KOR-YangHJ', name:'杨贤俊', nameEn:'Yang Hyun-jun', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:74, positions:['LW','CM'], stats:{speed:84,shooting:65,passing:60,defending:38,physical:58} },
    { id:'KOR-UmJS', name:'严智星', nameEn:'Um Ji-sung', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:72, positions:['CM','CAM'], stats:{speed:66,shooting:58,passing:62,defending:48,physical:58} },
    { id:'KOR-LeeDG', name:'李东炅', nameEn:'Lee Dong-gyeong', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:74, positions:['CAM','CM'], stats:{speed:68,shooting:62,passing:66,defending:42,physical:58} },
  ],
  CAM: [
    { id:'KOR-LeeKS', name:'李康仁', nameEn:'Lee Kang-in', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:79, positions:['RW','CAM'], stats:{speed:78,shooting:68,passing:76,defending:42,physical:58} },
  ],
  LW: [
    { id:'KOR-SonHM', name:'孙兴慜', nameEn:'Son Heung-min', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:88, positions:['LW','ST'], stats:{speed:88,shooting:86,passing:78,defending:40,physical:66} },
    { id:'KOR-HwangHC', name:'黄喜灿', nameEn:'Hwang Hee-chan', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:80, positions:['LW','ST'], stats:{speed:86,shooting:80,passing:68,defending:45,physical:70} },
  ],
  ST: [
    { id:'KOR-ChoGS', name:'曹圭成', nameEn:'Cho Gue-sung', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:76, positions:['ST'], stats:{speed:76,shooting:76,passing:52,defending:28,physical:78} },
    { id:'KOR-OhHK', name:'吴贤揆', nameEn:'Oh Hyun-kyu', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:74, positions:['ST'], stats:{speed:74,shooting:74,passing:50,defending:25,physical:72} },
  ],
},


MAR: {
  GK: [
    { id:'MAR-Bounou', name:'布努', nameEn:'Yassine Bounou', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:84, positions:['GK'], stats:{speed:50,shooting:18,passing:50,defending:58,physical:64} },
    { id:'MAR-Kajoui', name:'卡约伊', nameEn:'Munir El Kajoui', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:72, positions:['GK'], stats:{speed:44,shooting:16,passing:42,defending:52,physical:58} },
    { id:'MAR-Tagnaouti', name:'塔尼亚乌蒂', nameEn:'Reda Tagnaouti', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:70, positions:['GK'], stats:{speed:42,shooting:14,passing:40,defending:50,physical:56} },
  ],
  CB: [
    { id:'MAR-Aguerd', name:'阿盖尔德', nameEn:'Nayef Aguerd', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:80, positions:['CB'], stats:{speed:66,shooting:38,passing:64,defending:86,physical:80} },
    { id:'MAR-DiopM', name:'M·迪奥普', nameEn:'Issa Diop', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:76, positions:['CB'], stats:{speed:64,shooting:32,passing:58,defending:82,physical:80} },
    { id:'MAR-Riad', name:'里亚德', nameEn:'Chadi Riad', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:76, positions:['CB'], stats:{speed:66,shooting:32,passing:60,defending:80,physical:78} },
    { id:'MAR-Belammari', name:'贝拉马里', nameEn:'Youssef Belammari', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:72, positions:['CB'], stats:{speed:58,shooting:28,passing:55,defending:76,physical:74} },
    { id:'MAR-Halhal', name:'哈尔哈尔', nameEn:'Redouane Halhal', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:72, positions:['CB'], stats:{speed:56,shooting:28,passing:52,defending:76,physical:74} },
  ],
  LB: [
    { id:'MAR-SalahEddine', name:'萨拉赫-埃丁', nameEn:'Anass Salah-Eddine', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:74, positions:['LB','CB'], stats:{speed:76,shooting:38,passing:60,defending:74,physical:72} },
  ],
  RB: [
    { id:'MAR-Hakimi', name:'阿什拉夫', nameEn:'Achraf Hakimi', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:84, positions:['RB','RWB'], stats:{speed:90,shooting:68,passing:76,defending:80,physical:76} },
    { id:'MAR-ElOuahdi', name:'埃尔瓦赫迪', nameEn:'Zakaria El Ouahdi', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:74, positions:['RB','RM'], stats:{speed:82,shooting:42,passing:60,defending:74,physical:72} },
  ],
  CM: [
    { id:'MAR-AmrabatS', name:'阿姆拉巴特', nameEn:'Sofyan Amrabat', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:80, positions:['CDM','CM'], stats:{speed:62,shooting:52,passing:72,defending:84,physical:82} },
    { id:'MAR-Ounahi', name:'乌纳希', nameEn:'Azzedine Ounahi', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:78, positions:['CM','CDM'], stats:{speed:70,shooting:55,passing:72,defending:65,physical:64} },
    { id:'MAR-Bouaddi', name:'布阿迪', nameEn:'Ayyoub Bouaddi', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:74, positions:['CM','CDM'], stats:{speed:64,shooting:52,passing:66,defending:64,physical:62} },
    { id:'MAR-ElKhannouss', name:'埃尔哈努斯', nameEn:'Bilal El Khannouss', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:78, positions:['CM','CAM'], stats:{speed:70,shooting:65,passing:72,defending:48,physical:58} },
    { id:'MAR-ElAynaoui', name:'埃尔艾纳维', nameEn:'Neil El Aynaoui', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:72, positions:['CM','CDM'], stats:{speed:62,shooting:52,passing:62,defending:66,physical:64} },
    { id:'MAR-ElMourabet', name:'埃尔穆拉贝特', nameEn:'Samir El Mourabet', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:72, positions:['CDM','CM'], stats:{speed:58,shooting:45,passing:60,defending:72,physical:70} },
    { id:'MAR-Saibari', name:'赛巴里', nameEn:'Ismael Saibari', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CAM'], stats:{speed:68,shooting:62,passing:66,defending:55,physical:62} },
  ],
  CAM: [
    { id:'MAR-DiazB', name:'布拉欣·迪亚斯', nameEn:'Brahim Díaz', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:84, positions:['CAM','LW'], stats:{speed:84,shooting:76,passing:78,defending:35,physical:58} },
  ],
  LW: [
    { id:'MAR-Ezzalzouli', name:'埃扎尔祖利', nameEn:'Abde Ezzalzouli', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:80, positions:['LW','RW'], stats:{speed:88,shooting:68,passing:62,defending:32,physical:58} },
    { id:'MAR-TalbiC', name:'塔尔比(锋)', nameEn:'Chemsdine Talbi', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:72, positions:['LW','RW'], stats:{speed:82,shooting:65,passing:58,defending:30,physical:55} },
  ],
  ST: [
    { id:'MAR-Rahimi', name:'拉希米', nameEn:'Soufiane Rahimi', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:76, positions:['ST','LW'], stats:{speed:80,shooting:76,passing:58,defending:28,physical:66} },
    { id:'MAR-ElKaabi', name:'埃尔卡比', nameEn:'Ayoub El Kaabi', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:78, positions:['ST'], stats:{speed:74,shooting:80,passing:55,defending:28,physical:78} },
    { id:'MAR-YassineG', name:'亚辛', nameEn:'Gessime Yassine', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:72, positions:['ST'], stats:{speed:72,shooting:70,passing:48,defending:25,physical:70} },
    { id:'MAR-Amaimouni', name:'阿迈穆尼', nameEn:'Ayoube Amaimouni', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:70, positions:['ST'], stats:{speed:70,shooting:68,passing:45,defending:22,physical:68} },
    { id:'MAR-EnNesyri', name:'恩内斯里', nameEn:'Youssef En-Nesyri', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:79, positions:['ST'], stats:{speed:78,shooting:78,passing:52,defending:30,physical:76} },
  ],
},

MEX: {
  GK: [
    { id:'MEX-Ochoa', name:'奥乔亚', nameEn:'Guillermo Ochoa', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:78, positions:['GK'], stats:{speed:48,shooting:18,passing:46,defending:58,physical:62} },
    { id:'MEX-RangelR', name:'兰赫尔', nameEn:'Raúl Rangel', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:72, positions:['GK'], stats:{speed:44,shooting:16,passing:42,defending:52,physical:58} },
    { id:'MEX-AcevedoC', name:'阿塞韦多', nameEn:'Carlos Acevedo', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:74, positions:['GK'], stats:{speed:46,shooting:16,passing:44,defending:54,physical:60} },
  ],
  CB: [
    { id:'MEX-Montes', name:'蒙特斯', nameEn:'César Montes', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:76, positions:['CB'], stats:{speed:64,shooting:35,passing:60,defending:80,physical:76} },
    { id:'MEX-VasquezJ', name:'巴斯克斯', nameEn:'Johan Vásquez', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:77, positions:['CB','LB'], stats:{speed:66,shooting:32,passing:62,defending:80,physical:78} },
    { id:'MEX-ReyesI', name:'雷耶斯', nameEn:'Israel Reyes', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:74, positions:['CB','RB'], stats:{speed:68,shooting:30,passing:58,defending:78,physical:76} },
  ],
  LB: [
    { id:'MEX-Gallardo', name:'加利亚多', nameEn:'Jesus Gallardo', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:74, positions:['LB','LM'], stats:{speed:80,shooting:48,passing:64,defending:76,physical:70} },
    { id:'MEX-ChavezM', name:'查韦斯(卫)', nameEn:'Mateo Chávez', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:72, positions:['LB','CB'], stats:{speed:78,shooting:35,passing:58,defending:74,physical:72} },
  ],
  RB: [
    { id:'MEX-SanchezJ', name:'桑切斯', nameEn:'Jorge Sánchez', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:76, positions:['RB'], stats:{speed:82,shooting:38,passing:60,defending:74,physical:70} },
  ],
  CDM: [
    { id:'MEX-AlvarezE', name:'E·阿尔瓦雷斯', nameEn:'Edson Álvarez', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:81, positions:['CDM','CB'], stats:{speed:62,shooting:48,passing:64,defending:82,physical:82} },
  ],
  CM: [
    { id:'MEX-ChavezL', name:'查韦斯', nameEn:'Luis Chávez', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:75, positions:['CM','CDM'], stats:{speed:66,shooting:62,passing:72,defending:62,physical:64} },
    { id:'MEX-RomoL', name:'罗莫', nameEn:'Luis Romo', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:74, positions:['CM','CDM'], stats:{speed:64,shooting:58,passing:66,defending:68,physical:70} },
    { id:'MEX-PinedaO', name:'皮内达', nameEn:'Orbelín Pineda', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CAM'], stats:{speed:68,shooting:65,passing:68,defending:52,physical:60} },
    { id:'MEX-VargasO', name:'巴尔加斯', nameEn:'Obed Vargas', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:74, positions:['CM','CDM'], stats:{speed:64,shooting:52,passing:66,defending:64,physical:62} },
    { id:'MEX-LiraE', name:'利拉', nameEn:'Erik Lira', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:73, positions:['CM','CDM'], stats:{speed:60,shooting:52,passing:64,defending:66,physical:66} },
    { id:'MEX-FidalgoA', name:'菲达尔戈', nameEn:'Álvaro Fidalgo', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:74, positions:['CM','CDM'], stats:{speed:62,shooting:55,passing:68,defending:62,physical:62} },
    { id:'MEX-AlvaradoR', name:'阿尔瓦拉多', nameEn:'Roberto Alvarado', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:74, positions:['LW','CM'], stats:{speed:78,shooting:65,passing:64,defending:42,physical:58} },
    { id:'MEX-GutierrezB', name:'古铁雷斯', nameEn:'Brian Gutiérrez', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:72, positions:['CM','CAM'], stats:{speed:66,shooting:58,passing:66,defending:48,physical:55} },
    { id:'MEX-HuertaC', name:'韦尔塔', nameEn:'César Huerta', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:72, positions:['LW','CM'], stats:{speed:80,shooting:62,passing:60,defending:35,physical:55} },
    { id:'MEX-MoraG', name:'莫拉', nameEn:'Gilberto Mora', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:70, positions:['CM','CAM'], stats:{speed:64,shooting:55,passing:62,defending:48,physical:55} },
  ],
  LW: [
    { id:'MEX-VegaA', name:'维加', nameEn:'Alexis Vega', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:75, positions:['LW','CAM'], stats:{speed:80,shooting:72,passing:68,defending:40,physical:60} },
  ],
  ST: [
    { id:'MEX-JimenezR', name:'希门尼斯', nameEn:'Raúl Jiménez', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:80, positions:['ST'], stats:{speed:68,shooting:82,passing:66,defending:35,physical:76} },
    { id:'MEX-QuinonesJ', name:'基尼奥内斯', nameEn:'Julián Quiñones', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:76, positions:['ST','LW'], stats:{speed:78,shooting:76,passing:58,defending:32,physical:70} },
    { id:'MEX-GimenezS', name:'S·希门尼斯', nameEn:'Santiago Giménez', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:82, positions:['ST'], stats:{speed:78,shooting:82,passing:62,defending:35,physical:74} },
    { id:'MEX-MartinezG', name:'G·马丁内斯', nameEn:'Guillermo Martínez', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:72, positions:['ST'], stats:{speed:72,shooting:72,passing:50,defending:25,physical:72} },
    { id:'MEX-GonzalezA', name:'冈萨雷斯', nameEn:'Armando González', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:70, positions:['ST'], stats:{speed:70,shooting:68,passing:48,defending:22,physical:68} },
  ],
},

NED: {
  GK: [
    { id:'NED-Flekken', name:'弗莱肯', nameEn:'Mark Flekken', nationality:'NED', avatar:'/images/players/placeholder.png', rating:80, positions:['GK'], stats:{speed:48,shooting:18,passing:48,defending:56,physical:62} },
    { id:'NED-Verbruggen', name:'费尔布吕亨', nameEn:'Bart Verbruggen', nationality:'NED', avatar:'/images/players/placeholder.png', rating:78, positions:['GK'], stats:{speed:46,shooting:18,passing:44,defending:55,physical:60} },
    { id:'NED-Roefs', name:'鲁夫斯', nameEn:'Robin Roefs', nationality:'NED', avatar:'/images/players/placeholder.png', rating:74, positions:['GK'], stats:{speed:44,shooting:16,passing:42,defending:52,physical:58} },
  ],
  CB: [
    { id:'NED-VanDijk', name:'范迪克', nameEn:'Virgil van Dijk', nationality:'NED', avatar:'/images/players/placeholder.png', rating:90, positions:['CB'], stats:{speed:68,shooting:52,passing:72,defending:92,physical:90} },
    { id:'NED-VanDeVen', name:'范德文', nameEn:'Micky van de Ven', nationality:'NED', avatar:'/images/players/placeholder.png', rating:84, positions:['CB','LB'], stats:{speed:88,shooting:35,passing:64,defending:86,physical:80} },
    { id:'NED-Ake', name:'阿克', nameEn:'Nathan Aké', nationality:'NED', avatar:'/images/players/placeholder.png', rating:83, positions:['CB','LB'], stats:{speed:72,shooting:42,passing:68,defending:85,physical:76} },
    { id:'NED-TimberJ', name:'J·廷贝尔', nameEn:'Jurriën Timber', nationality:'NED', avatar:'/images/players/placeholder.png', rating:82, positions:['CB','RB'], stats:{speed:74,shooting:38,passing:66,defending:84,physical:76} },
    { id:'NED-Hato', name:'哈托', nameEn:'Jorrel Hato', nationality:'NED', avatar:'/images/players/placeholder.png', rating:78, positions:['CB','LB'], stats:{speed:72,shooting:32,passing:62,defending:80,physical:76} },
    { id:'NED-VanHecke', name:'范赫克', nameEn:'Jan Paul van Hecke', nationality:'NED', avatar:'/images/players/placeholder.png', rating:76, positions:['CB'], stats:{speed:62,shooting:30,passing:58,defending:82,physical:80} },
  ],
  LB: [
    { id:'NED-Dumfries', name:'邓弗里斯', nameEn:'Denzel Dumfries', nationality:'NED', avatar:'/images/players/placeholder.png', rating:82, positions:['RB','RWB'], stats:{speed:86,shooting:52,passing:68,defending:76,physical:82} },
  ],
  RB: [
    { id:'NED-Frimpong', name:'弗林蓬', nameEn:'Jeremie Frimpong', nationality:'NED', avatar:'/images/players/placeholder.png', rating:82, positions:['RB','RM'], stats:{speed:90,shooting:58,passing:72,defending:72,physical:68} },
  ],
  CM: [
    { id:'NED-FrenkieDeJong', name:'F·德容', nameEn:'Frenkie de Jong', nationality:'NED', avatar:'/images/players/placeholder.png', rating:85, positions:['CM','CDM'], stats:{speed:72,shooting:62,passing:86,defending:72,physical:66} },
    { id:'NED-Reijnders', name:'赖恩德斯', nameEn:'Tijjani Reijnders', nationality:'NED', avatar:'/images/players/placeholder.png', rating:83, positions:['CM','CAM'], stats:{speed:72,shooting:68,passing:76,defending:62,physical:66} },
    { id:'NED-Gravenberch', name:'赫拉芬贝赫', nameEn:'Ryan Gravenberch', nationality:'NED', avatar:'/images/players/placeholder.png', rating:82, positions:['CM','CDM'], stats:{speed:70,shooting:58,passing:74,defending:64,physical:64} },
    { id:'NED-Koopmeiners', name:'库普梅纳斯', nameEn:'Teun Koopmeiners', nationality:'NED', avatar:'/images/players/placeholder.png', rating:82, positions:['CM','CAM'], stats:{speed:66,shooting:72,passing:76,defending:62,physical:68} },
    { id:'NED-DeRoon', name:'德容恩', nameEn:'Marten de Roon', nationality:'NED', avatar:'/images/players/placeholder.png', rating:78, positions:['CDM','CM'], stats:{speed:60,shooting:55,passing:68,defending:78,physical:78} },
    { id:'NED-Wieffer', name:'维费尔', nameEn:'Mats Wieffer', nationality:'NED', avatar:'/images/players/placeholder.png', rating:79, positions:['CDM','CM'], stats:{speed:64,shooting:55,passing:70,defending:74,physical:74} },
    { id:'NED-TilG', name:'蒂尔', nameEn:'Guus Til', nationality:'NED', avatar:'/images/players/placeholder.png', rating:78, positions:['CAM','CM'], stats:{speed:66,shooting:72,passing:66,defending:48,physical:64} },
    { id:'NED-TimberQ', name:'Q·廷贝尔', nameEn:'Quinten Timber', nationality:'NED', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CDM'], stats:{speed:68,shooting:58,passing:68,defending:64,physical:66} },
  ],
  LW: [
    { id:'NED-Gakpo', name:'加克波', nameEn:'Cody Gakpo', nationality:'NED', avatar:'/images/players/placeholder.png', rating:84, positions:['LW','ST'], stats:{speed:82,shooting:80,passing:72,defending:42,physical:68} },
    { id:'NED-Summerville', name:'萨默维尔', nameEn:'Crysencio Summerville', nationality:'NED', avatar:'/images/players/placeholder.png', rating:78, positions:['LW','RW'], stats:{speed:86,shooting:72,passing:64,defending:35,physical:58} },
    { id:'NED-LangN', name:'朗', nameEn:'Noa Lang', nationality:'NED', avatar:'/images/players/placeholder.png', rating:79, positions:['LW','RW'], stats:{speed:82,shooting:72,passing:66,defending:35,physical:58} },
    { id:'NED-KluivertJ', name:'J·克鲁伊维特', nameEn:'Justin Kluivert', nationality:'NED', avatar:'/images/players/placeholder.png', rating:78, positions:['LW','RW'], stats:{speed:86,shooting:68,passing:64,defending:35,physical:58} },
  ],
  ST: [
    { id:'NED-Depay', name:'德佩', nameEn:'Memphis Depay', nationality:'NED', avatar:'/images/players/placeholder.png', rating:82, positions:['ST','LW'], stats:{speed:80,shooting:84,passing:78,defending:35,physical:68} },
    { id:'NED-Malen', name:'马伦', nameEn:'Donyell Malen', nationality:'NED', avatar:'/images/players/placeholder.png', rating:80, positions:['RW','ST'], stats:{speed:86,shooting:78,passing:62,defending:35,physical:64} },
    { id:'NED-Brobbey', name:'布罗比', nameEn:'Brian Brobbey', nationality:'NED', avatar:'/images/players/placeholder.png', rating:78, positions:['ST'], stats:{speed:82,shooting:76,passing:52,defending:28,physical:84} },
    { id:'NED-Weghorst', name:'韦格霍斯特', nameEn:'Wout Weghorst', nationality:'NED', avatar:'/images/players/placeholder.png', rating:78, positions:['ST'], stats:{speed:62,shooting:80,passing:60,defending:30,physical:86} },
  ],
},


NOR: {
  GK: [
    { id:'NOR-Nyland', name:'尼兰德', nameEn:'Orjan Nyland', nationality:'NOR', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:46,shooting:18,passing:44,defending:54,physical:60} },
  ],
  CB: [
    { id:'NOR-Ajer', name:'阿耶尔', nameEn:'Kristoffer Ajer', nationality:'NOR', avatar:'/images/players/placeholder.png', rating:79, positions:['CB','RB'], stats:{speed:66,shooting:38,passing:64,defending:82,physical:80} },
    { id:'NOR-Ostigard', name:'厄斯蒂高', nameEn:'Leo Ostigard', nationality:'NOR', avatar:'/images/players/placeholder.png', rating:76, positions:['CB'], stats:{speed:62,shooting:32,passing:58,defending:80,physical:80} },
  ],
  CM: [
    { id:'NOR-Odegaard', name:'厄德高', nameEn:'Martin Odegaard', nationality:'NOR', avatar:'/images/players/placeholder.png', rating:87, positions:['CAM','CM'], stats:{speed:72,shooting:72,passing:88,defending:52,physical:58} },
    { id:'NOR-Berge', name:'贝尔格', nameEn:'Sander Berge', nationality:'NOR', avatar:'/images/players/placeholder.png', rating:80, positions:['CDM','CM'], stats:{speed:64,shooting:55,passing:72,defending:82,physical:82} },
  ],
  ST: [
    { id:'NOR-Haaland', name:'哈兰德', nameEn:'Erling Haaland', nationality:'NOR', avatar:'/images/players/placeholder.png', rating:91, positions:['ST'], stats:{speed:90,shooting:94,passing:66,defending:42,physical:90} },
    { id:'NOR-Sorloth', name:'索尔洛特', nameEn:'Alexander Sorloth', nationality:'NOR', avatar:'/images/players/placeholder.png', rating:80, positions:['ST'], stats:{speed:82,shooting:82,passing:58,defending:32,physical:82} },
  ],
},

POL: {
  GK: [
    { id:'POL-Szczesny', name:'什琴斯尼', nameEn:'Wojciech Szczesny', nationality:'POL', avatar:'/images/players/placeholder.png', rating:83, positions:['GK'], stats:{speed:48,shooting:20,passing:48,defending:58,physical:64} },
    { id:'POL-Bulka', name:'布尔卡', nameEn:'Marcin Bulka', nationality:'POL', avatar:'/images/players/placeholder.png', rating:79, positions:['GK'], stats:{speed:46,shooting:18,passing:46,defending:56,physical:62} },
  ],
  CB: [
    { id:'POL-Bednarek', name:'贝德纳雷克', nameEn:'Jan Bednarek', nationality:'POL', avatar:'/images/players/placeholder.png', rating:78, positions:['CB'], stats:{speed:64,shooting:35,passing:60,defending:82,physical:80} },
    { id:'POL-Kiwior', name:'基维奥尔', nameEn:'Jakub Kiwior', nationality:'POL', avatar:'/images/players/placeholder.png', rating:79, positions:['CB','LB'], stats:{speed:66,shooting:35,passing:64,defending:80,physical:76} },
    { id:'POL-Dawidowicz', name:'达维多维奇', nameEn:'Pawel Dawidowicz', nationality:'POL', avatar:'/images/players/placeholder.png', rating:75, positions:['CB'], stats:{speed:60,shooting:30,passing:58,defending:78,physical:78} },
  ],
  CM: [
    { id:'POL-Zielinski', name:'杰林斯基', nameEn:'Piotr Zielinski', nationality:'POL', avatar:'/images/players/placeholder.png', rating:84, positions:['CAM','CM'], stats:{speed:72,shooting:72,passing:82,defending:52,physical:62} },
    { id:'POL-SzymanskiS', name:'S·希曼斯基', nameEn:'Sebastian Szymanski', nationality:'POL', avatar:'/images/players/placeholder.png', rating:80, positions:['CAM','CM'], stats:{speed:68,shooting:72,passing:72,defending:48,physical:60} },
    { id:'POL-Linetty', name:'利内蒂', nameEn:'Karol Linetty', nationality:'POL', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CDM'], stats:{speed:62,shooting:55,passing:68,defending:68,physical:68} },
  ],
  LW: [
    { id:'POL-LewandowskiR', name:'莱万多夫斯基', nameEn:'Robert Lewandowski', nationality:'POL', avatar:'/images/players/placeholder.png', rating:88, positions:['ST'], stats:{speed:78,shooting:92,passing:78,defending:38,physical:82} },
    { id:'POL-Milik', name:'米利克', nameEn:'Arkadiusz Milik', nationality:'POL', avatar:'/images/players/placeholder.png', rating:81, positions:['ST'], stats:{speed:72,shooting:82,passing:62,defending:30,physical:78} },
  ],
  ST: [
    { id:'POL-Piatek', name:'皮扬特克', nameEn:'Krzysztof Piatek', nationality:'POL', avatar:'/images/players/placeholder.png', rating:77, positions:['ST'], stats:{speed:72,shooting:78,passing:52,defending:28,physical:74} },
  ],
},

POR: {
  GK: [
    { id:'POR-DiogoCosta', name:'D·科斯塔', nameEn:'Diogo Costa', nationality:'POR', avatar:'/images/players/placeholder.png', rating:82, positions:['GK'], stats:{speed:50,shooting:20,passing:50,defending:58,physical:64} },
    { id:'POR-SaJ', name:'若泽·萨', nameEn:'José Sá', nationality:'POR', avatar:'/images/players/placeholder.png', rating:80, positions:['GK'], stats:{speed:46,shooting:18,passing:46,defending:56,physical:62} },
    { id:'POR-SilvaRui', name:'鲁伊·席尔瓦', nameEn:'Rui Silva', nationality:'POR', avatar:'/images/players/placeholder.png', rating:78, positions:['GK'], stats:{speed:46,shooting:18,passing:44,defending:55,physical:62} },
    { id:'POR-VelhoR', name:'维略', nameEn:'Ricardo Velho', nationality:'POR', avatar:'/images/players/placeholder.png', rating:74, positions:['GK'], stats:{speed:44,shooting:16,passing:42,defending:52,physical:58} },
  ],
  CB: [
    { id:'POR-DiasR', name:'鲁本·迪亚斯', nameEn:'Rúben Dias', nationality:'POR', avatar:'/images/players/placeholder.png', rating:87, positions:['CB'], stats:{speed:64,shooting:38,passing:66,defending:90,physical:84} },
    { id:'POR-Inacio', name:'伊纳西奥', nameEn:'Gonçalo Inácio', nationality:'POR', avatar:'/images/players/placeholder.png', rating:80, positions:['CB','LB'], stats:{speed:68,shooting:38,passing:66,defending:82,physical:78} },
    { id:'POR-AraujoT', name:'T·阿劳霍', nameEn:'Tomás Araújo', nationality:'POR', avatar:'/images/players/placeholder.png', rating:74, positions:['CB','RB'], stats:{speed:66,shooting:32,passing:60,defending:78,physical:76} },
  ],
  LB: [
    { id:'POR-MendesN', name:'N·门德斯', nameEn:'Nuno Mendes', nationality:'POR', avatar:'/images/players/placeholder.png', rating:82, positions:['LB','LM'], stats:{speed:86,shooting:52,passing:66,defending:78,physical:70} },
    { id:'POR-Dalot', name:'达洛特', nameEn:'Diogo Dalot', nationality:'POR', avatar:'/images/players/placeholder.png', rating:80, positions:['RB','LB'], stats:{speed:80,shooting:52,passing:66,defending:78,physical:74} },
  ],
  RB: [
    { id:'POR-Cancelo', name:'坎塞洛', nameEn:'João Cancelo', nationality:'POR', avatar:'/images/players/placeholder.png', rating:84, positions:['RB','LB'], stats:{speed:84,shooting:58,passing:80,defending:78,physical:72} },
    { id:'POR-Semedo', name:'塞梅多', nameEn:'Nélson Semedo', nationality:'POR', avatar:'/images/players/placeholder.png', rating:78, positions:['RB'], stats:{speed:86,shooting:42,passing:66,defending:76,physical:72} },
  ],
  CM: [
    { id:'POR-Bernardo', name:'B·席尔瓦', nameEn:'Bernardo Silva', nationality:'POR', avatar:'/images/players/placeholder.png', rating:88, positions:['RW','CM'], stats:{speed:76,shooting:76,passing:86,defending:58,physical:62} },
    { id:'POR-Bruno', name:'B·费尔南德斯', nameEn:'Bruno Fernandes', nationality:'POR', avatar:'/images/players/placeholder.png', rating:88, positions:['CAM','CM'], stats:{speed:72,shooting:84,passing:88,defending:58,physical:68} },
    { id:'POR-Vitinha', name:'维蒂尼亚', nameEn:'Vitinha', nationality:'POR', avatar:'/images/players/placeholder.png', rating:84, positions:['CM','CDM'], stats:{speed:68,shooting:62,passing:82,defending:62,physical:62} },
    { id:'POR-NevesJ', name:'J·内维斯', nameEn:'João Neves', nationality:'POR', avatar:'/images/players/placeholder.png', rating:82, positions:['CM','CDM'], stats:{speed:66,shooting:58,passing:76,defending:68,physical:64} },
    { id:'POR-NevesR', name:'R·内维斯', nameEn:'Rúben Neves', nationality:'POR', avatar:'/images/players/placeholder.png', rating:80, positions:['CDM','CM'], stats:{speed:58,shooting:68,passing:80,defending:72,physical:72} },
    { id:'POR-CostaS', name:'S·科斯塔', nameEn:'Samú Costa', nationality:'POR', avatar:'/images/players/placeholder.png', rating:76, positions:['CDM','CM'], stats:{speed:62,shooting:52,passing:66,defending:74,physical:72} },
  ],
  LW: [
    { id:'POR-Leao', name:'莱奥', nameEn:'Rafael Leão', nationality:'POR', avatar:'/images/players/placeholder.png', rating:84, positions:['LW','ST'], stats:{speed:90,shooting:82,passing:74,defending:35,physical:68} },
    { id:'POR-Felix', name:'菲利克斯', nameEn:'João Félix', nationality:'POR', avatar:'/images/players/placeholder.png', rating:82, positions:['CAM','LW'], stats:{speed:80,shooting:76,passing:74,defending:42,physical:60} },
    { id:'POR-Guedes', name:'格德斯', nameEn:'Gonçalo Guedes', nationality:'POR', avatar:'/images/players/placeholder.png', rating:80, positions:['LW','ST'], stats:{speed:82,shooting:76,passing:66,defending:38,physical:64} },
    { id:'POR-Trincao', name:'特林康', nameEn:'Francisco Trincão', nationality:'POR', avatar:'/images/players/placeholder.png', rating:78, positions:['RW','LW'], stats:{speed:82,shooting:68,passing:66,defending:35,physical:58} },
  ],
  RW: [
    { id:'POR-NetoP', name:'佩德罗·内托', nameEn:'Pedro Neto', nationality:'POR', avatar:'/images/players/placeholder.png', rating:82, positions:['RW','LW'], stats:{speed:88,shooting:72,passing:72,defending:38,physical:58} },
    { id:'POR-ConceicaoF', name:'F·孔塞桑', nameEn:'Francisco Conceição', nationality:'POR', avatar:'/images/players/placeholder.png', rating:78, positions:['RW','LW'], stats:{speed:86,shooting:68,passing:64,defending:35,physical:55} },
  ],
  ST: [
    { id:'POR-CRonaldo', name:'C罗', nameEn:'Cristiano Ronaldo', nationality:'POR', avatar:'/images/players/placeholder.png', rating:89, positions:['ST'], stats:{speed:78,shooting:92,passing:76,defending:35,physical:78} },
    { id:'POR-RamosG', name:'G·拉莫斯', nameEn:'Gonçalo Ramos', nationality:'POR', avatar:'/images/players/placeholder.png', rating:81, positions:['ST'], stats:{speed:76,shooting:82,passing:64,defending:32,physical:74} },
  ],
},

SCO: {
  GK: [
    { id:'SCO-Gunn', name:'冈恩', nameEn:'Angus Gunn', nationality:'SCO', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:44,shooting:16,passing:44,defending:54,physical:60} },
  ],
  CB: [
    { id:'SCO-RobertsonA', name:'A·罗伯逊', nameEn:'Andy Robertson', nationality:'SCO', avatar:'/images/players/placeholder.png', rating:86, positions:['LB','LM'], stats:{speed:82,shooting:52,passing:80,defending:80,physical:72} },
    { id:'SCO-Tierney', name:'蒂尔尼', nameEn:'Kieran Tierney', nationality:'SCO', avatar:'/images/players/placeholder.png', rating:82, positions:['LB','CB'], stats:{speed:76,shooting:48,passing:72,defending:82,physical:76} },
  ],
  CM: [
    { id:'SCO-McGinn', name:'麦金', nameEn:'John McGinn', nationality:'SCO', avatar:'/images/players/placeholder.png', rating:80, positions:['CM','CAM'], stats:{speed:68,shooting:72,passing:74,defending:68,physical:78} },
    { id:'SCO-McTominay', name:'麦克托米奈', nameEn:'Scott McTominay', nationality:'SCO', avatar:'/images/players/placeholder.png', rating:82, positions:['CM','CDM'], stats:{speed:68,shooting:72,passing:72,defending:78,physical:84} },
    { id:'SCO-Gilmour', name:'吉尔摩', nameEn:'Billy Gilmour', nationality:'SCO', avatar:'/images/players/placeholder.png', rating:77, positions:['CM','CDM'], stats:{speed:62,shooting:52,passing:74,defending:68,physical:58} },
  ],
  ST: [
    { id:'SCO-AdamsC', name:'亚当斯', nameEn:'Che Adams', nationality:'SCO', avatar:'/images/players/placeholder.png', rating:76, positions:['ST','LW'], stats:{speed:78,shooting:76,passing:62,defending:30,physical:72} },
  ],
},

SEN: {
  GK: [
    { id:'SEN-MendyE', name:'E·门迪', nameEn:'Édouard Mendy', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:82, positions:['GK'], stats:{speed:48,shooting:18,passing:46,defending:56,physical:62} },
    { id:'SEN-DiawM', name:'迪奥', nameEn:'Mory Diaw', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:74, positions:['GK'], stats:{speed:44,shooting:16,passing:42,defending:52,physical:58} },
    { id:'SEN-DioufY', name:'迪乌夫', nameEn:'Yehvann Diouf', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:72, positions:['GK'], stats:{speed:44,shooting:16,passing:40,defending:50,physical:56} },
  ],
  CB: [
    { id:'SEN-Koulibaly', name:'库利巴利', nameEn:'Kalidou Koulibaly', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:84, positions:['CB'], stats:{speed:72,shooting:42,passing:66,defending:88,physical:86} },
    { id:'SEN-Niakhate', name:'尼亚卡特', nameEn:'Moussa Niakhaté', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:78, positions:['CB'], stats:{speed:64,shooting:32,passing:60,defending:82,physical:80} },
    { id:'SEN-DioufEM', name:'E·迪乌夫', nameEn:'El Hadji Malick Diouf', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:76, positions:['CB','LB'], stats:{speed:68,shooting:35,passing:60,defending:78,physical:76} },
    { id:'SEN-SarrM', name:'M·萨尔', nameEn:'Mamadou Sarr', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:74, positions:['CB'], stats:{speed:60,shooting:30,passing:55,defending:78,physical:76} },
    { id:'SEN-SeckA', name:'塞克', nameEn:'Abdoulaye Seck', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:74, positions:['CB'], stats:{speed:58,shooting:28,passing:55,defending:78,physical:78} },
  ],
  LB: [
    { id:'SEN-Jakobs', name:'雅各布斯', nameEn:'Ismail Jakobs', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:76, positions:['LB','LM'], stats:{speed:82,shooting:42,passing:64,defending:76,physical:72} },
    { id:'SEN-MendyA', name:'A·门迪', nameEn:'Antoine Mendy', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:72, positions:['LB','CB'], stats:{speed:76,shooting:35,passing:58,defending:74,physical:72} },
  ],
  RB: [
    { id:'SEN-Diatta', name:'迪亚塔', nameEn:'Krépin Diatta', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:76, positions:['RB','RM'], stats:{speed:84,shooting:62,passing:66,defending:72,physical:68} },
  ],
  CM: [
    { id:'SEN-GueyeI', name:'盖耶', nameEn:'Idrissa Gueye', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:80, positions:['CM','CDM'], stats:{speed:68,shooting:58,passing:74,defending:80,physical:78} },
    { id:'SEN-GueyeP', name:'P·盖耶', nameEn:'Pape Gueye', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CDM'], stats:{speed:64,shooting:55,passing:68,defending:72,physical:72} },
    { id:'SEN-CamaraL', name:'L·卡马拉', nameEn:'Lamine Camara', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CAM'], stats:{speed:68,shooting:62,passing:66,defending:55,physical:60} },
    { id:'SEN-DiarraH', name:'H·迪亚拉', nameEn:'Habib Diarra', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:74, positions:['CM','CDM'], stats:{speed:66,shooting:58,passing:64,defending:60,physical:62} },
    { id:'SEN-CissP', name:'P·西塞', nameEn:'Pathé Ciss', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:72, positions:['CDM','CM'], stats:{speed:58,shooting:48,passing:60,defending:72,physical:72} },
    { id:'SEN-SarrPS', name:'P·萨尔', nameEn:'Pape Matar Sarr', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:78, positions:['CM','CDM'], stats:{speed:68,shooting:62,passing:72,defending:68,physical:68} },
    { id:'SEN-NdiayeBS', name:'B·恩迪亚耶', nameEn:'Bara Sapoko Ndiaye', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:72, positions:['CM','CDM'], stats:{speed:62,shooting:52,passing:62,defending:64,physical:64} },
  ],
  LW: [
    { id:'SEN-ManeS', name:'马内', nameEn:'Sadio Mané', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:86, positions:['LW','ST'], stats:{speed:92,shooting:84,passing:78,defending:42,physical:74} },
    { id:'SEN-DiaoA', name:'迪奥', nameEn:'Assane Diao', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:74, positions:['LW','RW'], stats:{speed:84,shooting:68,passing:58,defending:32,physical:55} },
  ],
  RW: [
    { id:'SEN-SarrI', name:'I·萨尔', nameEn:'Ismaïla Sarr', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:82, positions:['RW','LW'], stats:{speed:90,shooting:74,passing:66,defending:38,physical:62} },
    { id:'SEN-MbayeI', name:'姆巴耶', nameEn:'Ibrahim Mbaye', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:72, positions:['RW','LW'], stats:{speed:82,shooting:65,passing:58,defending:32,physical:55} },
  ],
  ST: [
    { id:'SEN-JacksonN', name:'杰克逊', nameEn:'Nicolas Jackson', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:83, positions:['ST','LW'], stats:{speed:86,shooting:78,passing:62,defending:30,physical:68} },
    { id:'SEN-NdiayeI', name:'I·恩迪亚耶', nameEn:'Iliman Ndiaye', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:78, positions:['ST','CAM'], stats:{speed:82,shooting:74,passing:64,defending:38,physical:64} },
    { id:'SEN-DiengB', name:'迪昂', nameEn:'Bamba Dieng', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:74, positions:['ST','LW'], stats:{speed:80,shooting:72,passing:55,defending:28,physical:66} },
    { id:'SEN-NdiayeC', name:'C·恩迪亚耶', nameEn:'Cherif Ndiaye', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:72, positions:['ST'], stats:{speed:72,shooting:72,passing:50,defending:25,physical:70} },
  ],
},


SUI: {
  GK: [
    { id:'SUI-Kobel', name:'科贝尔', nameEn:'Gregor Kobel', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:84, positions:['GK'], stats:{speed:50,shooting:20,passing:48,defending:58,physical:62} },
    { id:'SUI-Mvogo', name:'姆沃戈', nameEn:'Yvon Mvogo', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:74, positions:['GK'], stats:{speed:46,shooting:18,passing:44,defending:54,physical:60} },
    { id:'SUI-KellerM', name:'凯勒', nameEn:'Marvin Keller', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:72, positions:['GK'], stats:{speed:44,shooting:16,passing:42,defending:52,physical:58} },
  ],
  CB: [
    { id:'SUI-Akanji', name:'阿坎吉', nameEn:'Manuel Akanji', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:83, positions:['CB','RB'], stats:{speed:72,shooting:42,passing:66,defending:86,physical:80} },
    { id:'SUI-Elvedi', name:'埃尔维迪', nameEn:'Nico Elvedi', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:78, positions:['CB','RB'], stats:{speed:68,shooting:38,passing:64,defending:84,physical:78} },
    { id:'SUI-RodriguezR', name:'R·罗德里格斯', nameEn:'Ricardo Rodriguez', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:76, positions:['LB','CB'], stats:{speed:66,shooting:52,passing:70,defending:78,physical:72} },
    { id:'SUI-Widmer', name:'维德默', nameEn:'Silvan Widmer', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:75, positions:['RB','CB'], stats:{speed:78,shooting:42,passing:64,defending:76,physical:74} },
    { id:'SUI-Muheim', name:'穆海姆', nameEn:'Miro Muheim', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:72, positions:['LB','CB'], stats:{speed:76,shooting:38,passing:60,defending:74,physical:72} },
    { id:'SUI-Amenda', name:'阿门达', nameEn:'Aurèle Amenda', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:74, positions:['CB'], stats:{speed:64,shooting:32,passing:58,defending:78,physical:76} },
    { id:'SUI-Comert', name:'科梅特', nameEn:'Eray Cömert', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:74, positions:['CB'], stats:{speed:62,shooting:30,passing:58,defending:78,physical:76} },
    { id:'SUI-Jaquez', name:'雅克兹', nameEn:'Luca Jaquez', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:72, positions:['CB'], stats:{speed:60,shooting:28,passing:55,defending:76,physical:74} },
  ],
  CDM: [
    { id:'SUI-XhakaG', name:'扎卡', nameEn:'Granit Xhaka', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:83, positions:['CM','CDM'], stats:{speed:62,shooting:65,passing:80,defending:82,physical:84} },
    { id:'SUI-Freuler', name:'弗罗伊勒', nameEn:'Remo Freuler', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:78, positions:['CM','CDM'], stats:{speed:64,shooting:62,passing:74,defending:74,physical:74} },
    { id:'SUI-Zakaria', name:'扎卡里亚', nameEn:'Denis Zakaria', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:79, positions:['CDM','CM'], stats:{speed:66,shooting:55,passing:68,defending:82,physical:80} },
    { id:'SUI-Jashari', name:'贾沙里', nameEn:'Ardon Jashari', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CDM'], stats:{speed:64,shooting:55,passing:68,defending:70,physical:68} },
    { id:'SUI-Sow', name:'索乌', nameEn:'Djibril Sow', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:78, positions:['CM','CDM'], stats:{speed:68,shooting:55,passing:70,defending:68,physical:66} },
    { id:'SUI-Aebischer', name:'埃比舍尔', nameEn:'Michel Aebischer', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:74, positions:['CM','CDM'], stats:{speed:64,shooting:55,passing:66,defending:64,physical:66} },
  ],
  CAM: [
    { id:'SUI-Rieder', name:'里德', nameEn:'Fabian Rieder', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:76, positions:['CAM','CM'], stats:{speed:68,shooting:65,passing:70,defending:48,physical:58} },
    { id:'SUI-Fassnacht', name:'法斯纳赫特', nameEn:'Christian Fassnacht', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:74, positions:['CAM','LW'], stats:{speed:72,shooting:68,passing:64,defending:42,physical:60} },
    { id:'SUI-Manzambi', name:'曼赞比', nameEn:'Johan Manzambi', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:72, positions:['CAM','LW'], stats:{speed:76,shooting:62,passing:62,defending:35,physical:55} },
  ],
  LW: [
    { id:'SUI-VargasR', name:'巴尔加斯', nameEn:'Rubén Vargas', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:77, positions:['LW','RW'], stats:{speed:82,shooting:68,passing:64,defending:38,physical:58} },
  ],
  ST: [
    { id:'SUI-Embolo', name:'恩博洛', nameEn:'Breel Embolo', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:80, positions:['ST','LW'], stats:{speed:82,shooting:80,passing:66,defending:35,physical:76} },
    { id:'SUI-Okafor', name:'奥卡福', nameEn:'Noah Okafor', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:79, positions:['LW','ST'], stats:{speed:86,shooting:76,passing:60,defending:35,physical:62} },
    { id:'SUI-Ndoye', name:'恩多耶', nameEn:'Dan Ndoye', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:78, positions:['ST','RW'], stats:{speed:84,shooting:72,passing:62,defending:38,physical:64} },
    { id:'SUI-Amdouni', name:'阿姆杜尼', nameEn:'Zeki Amdouni', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:77, positions:['ST','CAM'], stats:{speed:74,shooting:76,passing:64,defending:30,physical:66} },
    { id:'SUI-Itten', name:'伊滕', nameEn:'Cedric Itten', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:73, positions:['ST'], stats:{speed:68,shooting:74,passing:55,defending:28,physical:74} },
  ],
},

SWE: {
  GK: [
    { id:'SWE-OlsenR', name:'奥尔森', nameEn:'Robin Olsen', nationality:'SWE', avatar:'/images/players/placeholder.png', rating:80, positions:['GK'], stats:{speed:46,shooting:18,passing:46,defending:56,physical:62} },
  ],
  CB: [
    { id:'SWE-Lindelof', name:'林德洛夫', nameEn:'Victor Lindelof', nationality:'SWE', avatar:'/images/players/placeholder.png', rating:82, positions:['CB','RB'], stats:{speed:64,shooting:42,passing:68,defending:84,physical:78} },
  ],
  CM: [
    { id:'SWE-Ekdal', name:'埃克达尔', nameEn:'Albin Ekdal', nationality:'SWE', avatar:'/images/players/placeholder.png', rating:78, positions:['CM','CDM'], stats:{speed:62,shooting:58,passing:70,defending:72,physical:72} },
    { id:'SWE-Forsberg', name:'福斯贝里', nameEn:'Emil Forsberg', nationality:'SWE', avatar:'/images/players/placeholder.png', rating:82, positions:['CAM','LW'], stats:{speed:72,shooting:76,passing:80,defending:48,physical:62} },
    { id:'SWE-Kulusevski', name:'库卢塞夫斯基', nameEn:'Dejan Kulusevski', nationality:'SWE', avatar:'/images/players/placeholder.png', rating:84, positions:['RW','CAM'], stats:{speed:78,shooting:74,passing:80,defending:42,physical:62} },
  ],
  ST: [
    { id:'SWE-Isak', name:'伊萨克', nameEn:'Alexander Isak', nationality:'SWE', avatar:'/images/players/placeholder.png', rating:85, positions:['ST','LW'], stats:{speed:84,shooting:84,passing:72,defending:35,physical:68} },
    { id:'SWE-Gyokeres', name:'约克雷斯', nameEn:'Viktor Gyokeres', nationality:'SWE', avatar:'/images/players/placeholder.png', rating:84, positions:['ST'], stats:{speed:82,shooting:82,passing:66,defending:38,physical:80} },
  ],
},

TUN: {
  GK: [
    { id:'TUN-Dahmen', name:'达赫门', nameEn:'Aymen Dahmen', nationality:'TUN', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:44,shooting:16,passing:42,defending:54,physical:60} },
  ],
  CB: [
    { id:'TUN-TalbiM', name:'塔尔比', nameEn:'Montassar Talbi', nationality:'TUN', avatar:'/images/players/placeholder.png', rating:76, positions:['CB'], stats:{speed:60,shooting:32,passing:58,defending:80,physical:78} },
  ],
  CM: [
    { id:'TUN-Skhiri', name:'斯希里', nameEn:'Ellyes Skhiri', nationality:'TUN', avatar:'/images/players/placeholder.png', rating:80, positions:['CDM','CM'], stats:{speed:62,shooting:55,passing:70,defending:82,physical:78} },
    { id:'TUN-Laidouni', name:'莱杜尼', nameEn:'Aissa Laidouni', nationality:'TUN', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CDM'], stats:{speed:64,shooting:55,passing:66,defending:72,physical:72} },
  ],
  LW: [
    { id:'TUN-Msakni', name:'姆萨克尼', nameEn:'Youssef Msakni', nationality:'TUN', avatar:'/images/players/placeholder.png', rating:78, positions:['LW','CAM'], stats:{speed:82,shooting:76,passing:68,defending:35,physical:62} },
  ],
  ST: [
    { id:'TUN-Jebali', name:'杰巴利', nameEn:'Seifeddine Jebali', nationality:'TUN', avatar:'/images/players/placeholder.png', rating:74, positions:['ST'], stats:{speed:76,shooting:74,passing:50,defending:25,physical:72} },
  ],
},

TUR: {
  GK: [
    { id:'TUR-Cakir', name:'恰基尔', nameEn:'Ugurcan Cakir', nationality:'TUR', avatar:'/images/players/placeholder.png', rating:81, positions:['GK'], stats:{speed:48,shooting:18,passing:48,defending:56,physical:62} },
  ],
  CB: [
    { id:'TUR-Demiral', name:'德米拉尔', nameEn:'Merih Demiral', nationality:'TUR', avatar:'/images/players/placeholder.png', rating:80, positions:['CB'], stats:{speed:66,shooting:42,passing:58,defending:84,physical:82} },
    { id:'TUR-Soyuncu', name:'瑟云聚', nameEn:'Caglar Soyuncu', nationality:'TUR', avatar:'/images/players/placeholder.png', rating:79, positions:['CB'], stats:{speed:64,shooting:38,passing:62,defending:82,physical:80} },
    { id:'TUR-Bardakci', name:'巴尔达克奇', nameEn:'Abdulkerim Bardakci', nationality:'TUR', avatar:'/images/players/placeholder.png', rating:77, positions:['CB'], stats:{speed:60,shooting:32,passing:58,defending:82,physical:80} },
  ],
  CM: [
    { id:'TUR-Calhanoglu', name:'恰尔汉奥卢', nameEn:'Hakan Calhanoglu', nationality:'TUR', avatar:'/images/players/placeholder.png', rating:85, positions:['CAM','CM'], stats:{speed:68,shooting:78,passing:86,defending:58,physical:62} },
    { id:'TUR-Kokcu', name:'克科库', nameEn:'Orkun Kokcu', nationality:'TUR', avatar:'/images/players/placeholder.png', rating:79, positions:['CM','CDM'], stats:{speed:64,shooting:68,passing:76,defending:62,physical:64} },
  ],
  LW: [
    { id:'TUR-Unde', name:'云代尔', nameEn:'Cengiz Under', nationality:'TUR', avatar:'/images/players/placeholder.png', rating:79, positions:['RW','CAM'], stats:{speed:86,shooting:74,passing:68,defending:35,physical:55} },
  ],
  ST: [
    { id:'TUR-Yazici', name:'亚泽哲', nameEn:'Yusuf Yazici', nationality:'TUR', avatar:'/images/players/placeholder.png', rating:77, positions:['CAM','ST'], stats:{speed:68,shooting:74,passing:66,defending:35,physical:62} },
    { id:'TUR-Tosun', name:'托松', nameEn:'Cenk Tosun', nationality:'TUR', avatar:'/images/players/placeholder.png', rating:78, positions:['ST'], stats:{speed:68,shooting:80,passing:58,defending:28,physical:78} },
  ],
},

URU: {
  GK: [
    { id:'URU-Rochet', name:'罗切特', nameEn:'Sergio Rochet', nationality:'URU', avatar:'/images/players/placeholder.png', rating:78, positions:['GK'], stats:{speed:46,shooting:18,passing:46,defending:56,physical:62} },
    { id:'URU-Muslera', name:'穆斯莱拉', nameEn:'Fernando Muslera', nationality:'URU', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:48,shooting:20,passing:48,defending:58,physical:64} },
    { id:'URU-MeleS', name:'梅莱', nameEn:'Santiago Mele', nationality:'URU', avatar:'/images/players/placeholder.png', rating:72, positions:['GK'], stats:{speed:44,shooting:16,passing:42,defending:52,physical:58} },
  ],
  CB: [
    { id:'URU-AraujoR', name:'R·阿劳霍', nameEn:'Ronald Araújo', nationality:'URU', avatar:'/images/players/placeholder.png', rating:84, positions:['CB','RB'], stats:{speed:74,shooting:42,passing:64,defending:88,physical:84} },
    { id:'URU-GimenezJ', name:'希门尼斯', nameEn:'José María Giménez', nationality:'URU', avatar:'/images/players/placeholder.png', rating:84, positions:['CB'], stats:{speed:64,shooting:42,passing:64,defending:88,physical:84} },
    { id:'URU-BuenoS', name:'布埃诺', nameEn:'Santiago Bueno', nationality:'URU', avatar:'/images/players/placeholder.png', rating:78, positions:['CB'], stats:{speed:62,shooting:32,passing:60,defending:82,physical:80} },
    { id:'URU-CaceresS', name:'S·卡塞雷斯', nameEn:'Sebastián Cáceres', nationality:'URU', avatar:'/images/players/placeholder.png', rating:76, positions:['CB'], stats:{speed:64,shooting:32,passing:58,defending:80,physical:78} },
  ],
  LB: [
    { id:'URU-OliveraM', name:'奥利韦拉', nameEn:'Mathías Olivera', nationality:'URU', avatar:'/images/players/placeholder.png', rating:78, positions:['LB','LM'], stats:{speed:80,shooting:48,passing:66,defending:76,physical:74} },
    { id:'URU-VinaM', name:'比尼亚', nameEn:'Matías Viña', nationality:'URU', avatar:'/images/players/placeholder.png', rating:76, positions:['LB','LM'], stats:{speed:80,shooting:42,passing:64,defending:76,physical:72} },
    { id:'URU-Piquerez', name:'皮克雷斯', nameEn:'Joaquín Piquerez', nationality:'URU', avatar:'/images/players/placeholder.png', rating:74, positions:['LB'], stats:{speed:78,shooting:42,passing:62,defending:74,physical:72} },
    { id:'URU-SanabriaJM', name:'萨纳夫里亚', nameEn:'Juan Manuel Sanabria', nationality:'URU', avatar:'/images/players/placeholder.png', rating:72, positions:['LB','CDM'], stats:{speed:74,shooting:38,passing:60,defending:72,physical:70} },
  ],
  RB: [
    { id:'URU-VarelaG', name:'巴雷拉', nameEn:'Guillermo Varela', nationality:'URU', avatar:'/images/players/placeholder.png', rating:74, positions:['RB','RM'], stats:{speed:80,shooting:45,passing:64,defending:76,physical:72} },
  ],
  CM: [
    { id:'URU-Valverde', name:'巴尔韦德', nameEn:'Federico Valverde', nationality:'URU', avatar:'/images/players/placeholder.png', rating:87, positions:['CM','CAM'], stats:{speed:82,shooting:78,passing:82,defending:72,physical:74} },
    { id:'URU-Bentancur', name:'本坦库尔', nameEn:'Rodrigo Bentancur', nationality:'URU', avatar:'/images/players/placeholder.png', rating:82, positions:['CM','CDM'], stats:{speed:66,shooting:65,passing:76,defending:74,physical:72} },
    { id:'URU-UgarteM', name:'乌加特', nameEn:'Manuel Ugarte', nationality:'URU', avatar:'/images/players/placeholder.png', rating:83, positions:['CDM','CM'], stats:{speed:62,shooting:48,passing:66,defending:86,physical:82} },
    { id:'URU-MartinezE', name:'E·马丁内斯(中)', nameEn:'Emiliano Martínez', nationality:'URU', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CDM'], stats:{speed:62,shooting:55,passing:66,defending:72,physical:70} },
    { id:'URU-ZalazarR', name:'萨拉查', nameEn:'Rodrigo Zalazar', nationality:'URU', avatar:'/images/players/placeholder.png', rating:74, positions:['CM','CAM'], stats:{speed:64,shooting:65,passing:68,defending:48,physical:58} },
    { id:'URU-DeArrascaeta', name:'德阿拉斯卡埃塔', nameEn:'Giorgian De Arrascaeta', nationality:'URU', avatar:'/images/players/placeholder.png', rating:80, positions:['CAM','LW'], stats:{speed:74,shooting:76,passing:78,defending:42,physical:62} },
    { id:'URU-DeLaCruz', name:'德拉克鲁斯', nameEn:'Nicolás De La Cruz', nationality:'URU', avatar:'/images/players/placeholder.png', rating:80, positions:['CM','CAM'], stats:{speed:72,shooting:72,passing:72,defending:55,physical:62} },
    { id:'URU-Canobbio', name:'卡诺比奥', nameEn:'Agustín Canobbio', nationality:'URU', avatar:'/images/players/placeholder.png', rating:76, positions:['LW','CM'], stats:{speed:82,shooting:68,passing:64,defending:42,physical:60} },
    { id:'URU-AraujoM', name:'M·阿劳霍', nameEn:'Maximiliano Araújo', nationality:'URU', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','LW'], stats:{speed:80,shooting:68,passing:66,defending:48,physical:62} },
  ],
  LW: [
    { id:'URU-Pellistri', name:'佩利斯特里', nameEn:'Facundo Pellistri', nationality:'URU', avatar:'/images/players/placeholder.png', rating:78, positions:['RW','LW'], stats:{speed:84,shooting:62,passing:66,defending:38,physical:58} },
    { id:'URU-RodriguezB', name:'B·罗德里格斯', nameEn:'Brian Rodríguez', nationality:'URU', avatar:'/images/players/placeholder.png', rating:76, positions:['LW','RW'], stats:{speed:86,shooting:72,passing:62,defending:35,physical:58} },
  ],
  ST: [
    { id:'URU-Nunez', name:'努涅斯', nameEn:'Darwin Núñez', nationality:'URU', avatar:'/images/players/placeholder.png', rating:83, positions:['ST','LW'], stats:{speed:88,shooting:84,passing:64,defending:32,physical:80} },
    { id:'URU-VinasF', name:'比尼亚斯(锋)', nameEn:'Federico Viñas', nationality:'URU', avatar:'/images/players/placeholder.png', rating:74, positions:['ST'], stats:{speed:72,shooting:74,passing:55,defending:28,physical:72} },
    { id:'URU-AguirreR', name:'阿吉雷', nameEn:'Rodrigo Aguirre', nationality:'URU', avatar:'/images/players/placeholder.png', rating:72, positions:['ST'], stats:{speed:74,shooting:72,passing:52,defending:25,physical:72} },
  ],
},

USA: {
  GK: [
    { id:'USA-Turner', name:'特纳', nameEn:'Matt Turner', nationality:'USA', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:46,shooting:18,passing:42,defending:54,physical:60} },
    { id:'USA-FreeseM', name:'弗里兹', nameEn:'Matt Freese', nationality:'USA', avatar:'/images/players/placeholder.png', rating:72, positions:['GK'], stats:{speed:44,shooting:16,passing:40,defending:52,physical:58} },
    { id:'USA-BradyC', name:'布雷迪', nameEn:'Chris Brady', nationality:'USA', avatar:'/images/players/placeholder.png', rating:70, positions:['GK'], stats:{speed:42,shooting:14,passing:40,defending:50,physical:56} },
  ],
  CB: [
    { id:'USA-Ream', name:'里姆', nameEn:'Tim Ream', nationality:'USA', avatar:'/images/players/placeholder.png', rating:74, positions:['CB','LB'], stats:{speed:58,shooting:30,passing:64,defending:80,physical:74} },
    { id:'USA-RobinsonM', name:'罗宾逊', nameEn:'Miles Robinson', nationality:'USA', avatar:'/images/players/placeholder.png', rating:76, positions:['CB'], stats:{speed:66,shooting:28,passing:55,defending:80,physical:78} },
    { id:'USA-RichardsC', name:'理查兹', nameEn:'Chris Richards', nationality:'USA', avatar:'/images/players/placeholder.png', rating:76, positions:['CB','CDM'], stats:{speed:64,shooting:32,passing:60,defending:80,physical:78} },
    { id:'USA-TrustyA', name:'特拉斯蒂', nameEn:'Auston Trusty', nationality:'USA', avatar:'/images/players/placeholder.png', rating:74, positions:['CB','LB'], stats:{speed:66,shooting:30,passing:58,defending:78,physical:76} },
    { id:'USA-McKenzieM', name:'麦肯齐', nameEn:'Mark McKenzie', nationality:'USA', avatar:'/images/players/placeholder.png', rating:74, positions:['CB'], stats:{speed:62,shooting:30,passing:58,defending:78,physical:76} },
    { id:'USA-ArfstenM', name:'阿尔夫斯滕', nameEn:'Max Arfsten', nationality:'USA', avatar:'/images/players/placeholder.png', rating:72, positions:['CB','LB'], stats:{speed:68,shooting:28,passing:55,defending:76,physical:74} },
    { id:'USA-FreemanA', name:'弗里曼', nameEn:'Alex Freeman', nationality:'USA', avatar:'/images/players/placeholder.png', rating:70, positions:['CB','RB'], stats:{speed:70,shooting:28,passing:52,defending:74,physical:72} },
  ],
  LB: [
    { id:'USA-RobinsonA', name:'A·罗宾逊', nameEn:'Antonee Robinson', nationality:'USA', avatar:'/images/players/placeholder.png', rating:79, positions:['LB','LM'], stats:{speed:86,shooting:42,passing:64,defending:76,physical:72} },
  ],
  RB: [
    { id:'USA-Dest', name:'德斯特', nameEn:'Sergiño Dest', nationality:'USA', avatar:'/images/players/placeholder.png', rating:82, positions:['RB','LB'], stats:{speed:82,shooting:42,passing:62,defending:74,physical:66} },
    { id:'USA-ScallyJ', name:'斯卡利', nameEn:'Joe Scally', nationality:'USA', avatar:'/images/players/placeholder.png', rating:74, positions:['RB','LB'], stats:{speed:82,shooting:38,passing:62,defending:74,physical:70} },
  ],
  CM: [
    { id:'USA-McKennie', name:'麦肯尼', nameEn:'Weston McKennie', nationality:'USA', avatar:'/images/players/placeholder.png', rating:80, positions:['CM','CDM'], stats:{speed:70,shooting:68,passing:72,defending:72,physical:76} },
    { id:'USA-AdamsT', name:'T·亚当斯', nameEn:'Tyler Adams', nationality:'USA', avatar:'/images/players/placeholder.png', rating:80, positions:['CDM','CM'], stats:{speed:66,shooting:48,passing:70,defending:82,physical:74} },
    { id:'USA-TillmanM', name:'M·蒂尔曼', nameEn:'Malik Tillman', nationality:'USA', avatar:'/images/players/placeholder.png', rating:78, positions:['CAM','CM'], stats:{speed:72,shooting:68,passing:70,defending:48,physical:60} },
    { id:'USA-AaronsonLM', name:'阿伦森', nameEn:'Brenden Aaronson', nationality:'USA', avatar:'/images/players/placeholder.png', rating:76, positions:['CAM','CM'], stats:{speed:78,shooting:62,passing:70,defending:48,physical:55} },
    { id:'USA-BerhalterS', name:'伯哈尔特', nameEn:'Sebastian Berhalter', nationality:'USA', avatar:'/images/players/placeholder.png', rating:72, positions:['CM','CDM'], stats:{speed:62,shooting:52,passing:64,defending:64,physical:64} },
    { id:'USA-RoldanC', name:'罗尔丹', nameEn:'Cristian Roldan', nationality:'USA', avatar:'/images/players/placeholder.png', rating:74, positions:['CM','RM'], stats:{speed:68,shooting:62,passing:66,defending:62,physical:68} },
    { id:'USA-ZendejasA', name:'森德哈斯', nameEn:'Alejandro Zendejas', nationality:'USA', avatar:'/images/players/placeholder.png', rating:74, positions:['LW','CM'], stats:{speed:80,shooting:65,passing:62,defending:38,physical:58} },
  ],
  CAM: [
    { id:'USA-Pulisic', name:'普利希奇', nameEn:'Christian Pulisic', nationality:'USA', avatar:'/images/players/placeholder.png', rating:84, positions:['LW','CAM'], stats:{speed:82,shooting:78,passing:74,defending:42,physical:58} },
    { id:'USA-ReynaG', name:'G·雷纳', nameEn:'Gio Reyna', nationality:'USA', avatar:'/images/players/placeholder.png', rating:82, positions:['CAM','RW'], stats:{speed:74,shooting:72,passing:78,defending:38,physical:55} },
  ],
  LW: [
    { id:'USA-Weah', name:'维阿', nameEn:'Tim Weah', nationality:'USA', avatar:'/images/players/placeholder.png', rating:78, positions:['RW','LW'], stats:{speed:86,shooting:68,passing:62,defending:38,physical:58} },
  ],
  ST: [
    { id:'USA-BalogunF', name:'巴洛贡', nameEn:'Folarin Balogun', nationality:'USA', avatar:'/images/players/placeholder.png', rating:79, positions:['ST'], stats:{speed:80,shooting:76,passing:60,defending:28,physical:68} },
    { id:'USA-PepiR', name:'佩皮', nameEn:'Ricardo Pepi', nationality:'USA', avatar:'/images/players/placeholder.png', rating:77, positions:['ST'], stats:{speed:78,shooting:76,passing:55,defending:28,physical:72} },
    { id:'USA-WrightH', name:'赖特', nameEn:'Haji Wright', nationality:'USA', avatar:'/images/players/placeholder.png', rating:75, positions:['ST'], stats:{speed:76,shooting:72,passing:55,defending:28,physical:70} },
  ],
},


WAL: {
  GK: [
    { id:'WAL-WardD', name:'沃德', nameEn:'Danny Ward', nationality:'WAL', avatar:'/images/players/placeholder.png', rating:77, positions:['GK'], stats:{speed:44,shooting:16,passing:44,defending:55,physical:62} },
  ],
  CB: [
    { id:'WAL-Rodon', name:'罗登', nameEn:'Joe Rodon', nationality:'WAL', avatar:'/images/players/placeholder.png', rating:78, positions:['CB'], stats:{speed:64,shooting:32,passing:58,defending:82,physical:80} },
    { id:'WAL-Ampadu', name:'安帕杜', nameEn:'Ethan Ampadu', nationality:'WAL', avatar:'/images/players/placeholder.png', rating:76, positions:['CB','CDM'], stats:{speed:62,shooting:38,passing:64,defending:78,physical:76} },
    { id:'WAL-DaviesB', name:'B·戴维斯', nameEn:'Ben Davies', nationality:'WAL', avatar:'/images/players/placeholder.png', rating:78, positions:['LB','CB'], stats:{speed:72,shooting:42,passing:66,defending:78,physical:74} },
  ],
  CM: [
    { id:'WAL-Ramsey', name:'拉姆齐', nameEn:'Aaron Ramsey', nationality:'WAL', avatar:'/images/players/placeholder.png', rating:82, positions:['CAM','CM'], stats:{speed:66,shooting:74,passing:80,defending:55,physical:64} },
    { id:'WAL-WilsonH', name:'H·威尔逊', nameEn:'Harry Wilson', nationality:'WAL', avatar:'/images/players/placeholder.png', rating:78, positions:['RW','CAM'], stats:{speed:78,shooting:72,passing:70,defending:42,physical:58} },
    { id:'WAL-JamesD', name:'D·詹姆斯', nameEn:'Daniel James', nationality:'WAL', avatar:'/images/players/placeholder.png', rating:76, positions:['LW','RW'], stats:{speed:92,shooting:68,passing:62,defending:38,physical:58} },
  ],
  ST: [
    { id:'WAL-JohnsonB', name:'B·约翰逊', nameEn:'Brennan Johnson', nationality:'WAL', avatar:'/images/players/placeholder.png', rating:79, positions:['ST','RW'], stats:{speed:88,shooting:74,passing:62,defending:35,physical:64} },
    { id:'WAL-MooreK', name:'K·摩尔', nameEn:'Kieffer Moore', nationality:'WAL', avatar:'/images/players/placeholder.png', rating:75, positions:['ST'], stats:{speed:58,shooting:76,passing:52,defending:30,physical:84} },
  ],
},

RSA: {
  GK: [
    { id:'RSA-WilliamsR', name:'威廉姆斯', nameEn:'Ronwen Williams', nationality:'RSA', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:46,shooting:18,passing:44,defending:54,physical:60} },
  ],
  CB: [
    { id:'RSA-Mokoena', name:'莫科埃纳', nameEn:'Teboho Mokoena', nationality:'RSA', avatar:'/images/players/placeholder.png', rating:74, positions:['CB','CDM'], stats:{speed:58,shooting:42,passing:62,defending:80,physical:78} },
  ],
  CM: [
    { id:'RSA-Zungu', name:'宗古', nameEn:'Bongani Zungu', nationality:'RSA', avatar:'/images/players/placeholder.png', rating:74, positions:['CM','CDM'], stats:{speed:62,shooting:55,passing:66,defending:70,physical:72} },
  ],
  LW: [
    { id:'RSA-Tau', name:'陶', nameEn:'Percy Tau', nationality:'RSA', avatar:'/images/players/placeholder.png', rating:76, positions:['LW','RW'], stats:{speed:82,shooting:72,passing:66,defending:35,physical:60} },
  ],
  ST: [
    { id:'RSA-Lepasa', name:'莱帕萨', nameEn:'Zakhele Lepasa', nationality:'RSA', avatar:'/images/players/placeholder.png', rating:71, positions:['ST'], stats:{speed:68,shooting:70,passing:50,defending:25,physical:70} },
  ],
},

COD: {
  GK: [
    { id:'COD-Bertaud', name:'贝尔托', nameEn:'Dimitry Bertaud', nationality:'COD', avatar:'/images/players/placeholder.png', rating:74, positions:['GK'], stats:{speed:46,shooting:16,passing:42,defending:52,physical:58} },
  ],
  CB: [
    { id:'COD-Mbemba', name:'姆本巴', nameEn:'Chancel Mbemba', nationality:'COD', avatar:'/images/players/placeholder.png', rating:80, positions:['CB'], stats:{speed:66,shooting:42,passing:62,defending:84,physical:82} },
  ],
  CM: [
    { id:'COD-Kakuta', name:'卡库塔', nameEn:'Gael Kakuta', nationality:'COD', avatar:'/images/players/placeholder.png', rating:76, positions:['CAM','CM'], stats:{speed:72,shooting:68,passing:72,defending:42,physical:55} },
  ],
  ST: [
    { id:'COD-Wissa', name:'维萨', nameEn:'Yoane Wissa', nationality:'COD', avatar:'/images/players/placeholder.png', rating:79, positions:['ST','LW'], stats:{speed:82,shooting:78,passing:62,defending:32,physical:72} },
    { id:'COD-Bakambu', name:'巴坎布', nameEn:'Cedric Bakambu', nationality:'COD', avatar:'/images/players/placeholder.png', rating:78, positions:['ST'], stats:{speed:80,shooting:80,passing:58,defending:28,physical:76} },
  ],
},

CMR: {
  GK: [
    { id:'CMR-Ondoa', name:'翁多阿', nameEn:'Fabrice Ondoa', nationality:'CMR', avatar:'/images/players/placeholder.png', rating:74, positions:['GK'], stats:{speed:46,shooting:18,passing:44,defending:54,physical:60} },
  ],
  CB: [
    { id:'CMR-Wooh', name:'伍', nameEn:'Christopher Wooh', nationality:'CMR', avatar:'/images/players/placeholder.png', rating:75, positions:['CB'], stats:{speed:66,shooting:32,passing:58,defending:80,physical:80} },
  ],
  CM: [
    { id:'CMR-Zambo', name:'赞博', nameEn:'André-Frank Zambo Anguissa', nationality:'CMR', avatar:'/images/players/placeholder.png', rating:83, positions:['CM','CDM'], stats:{speed:70,shooting:62,passing:74,defending:76,physical:84} },
  ],
  LW: [
    { id:'CMR-Ekambi', name:'埃卡姆比', nameEn:'Karl Toko Ekambi', nationality:'CMR', avatar:'/images/players/placeholder.png', rating:78, positions:['LW','ST'], stats:{speed:80,shooting:76,passing:62,defending:35,physical:66} },
  ],
  ST: [
    { id:'CMR-Aboubakar', name:'阿布巴卡尔', nameEn:'Vincent Aboubakar', nationality:'CMR', avatar:'/images/players/placeholder.png', rating:79, positions:['ST'], stats:{speed:76,shooting:80,passing:58,defending:30,physical:78} },
    { id:'CMR-Choupo-Moting', name:'舒波-莫廷', nameEn:'Eric Choupo-Moting', nationality:'CMR', avatar:'/images/players/placeholder.png', rating:79, positions:['ST','CAM'], stats:{speed:66,shooting:78,passing:66,defending:35,physical:78} },
  ],
},

NGA: {
  GK: [
    { id:'NGA-Okoye', name:'奥科耶', nameEn:'Maduka Okoye', nationality:'NGA', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:46,shooting:18,passing:44,defending:54,physical:60} },
  ],
  CB: [
    { id:'NGA-Ekong', name:'埃孔', nameEn:'William Troost-Ekong', nationality:'NGA', avatar:'/images/players/placeholder.png', rating:78, positions:['CB'], stats:{speed:60,shooting:38,passing:62,defending:82,physical:80} },
    { id:'NGA-Bassey', name:'巴西', nameEn:'Calvin Bassey', nationality:'NGA', avatar:'/images/players/placeholder.png', rating:77, positions:['CB','LB'], stats:{speed:68,shooting:32,passing:58,defending:80,physical:80} },
  ],
  CM: [
    { id:'NGA-Ndidi', name:'恩迪迪', nameEn:'Wilfred Ndidi', nationality:'NGA', avatar:'/images/players/placeholder.png', rating:82, positions:['CDM','CM'], stats:{speed:62,shooting:52,passing:66,defending:86,physical:84} },
    { id:'NGA-Iwobi', name:'伊沃比', nameEn:'Alex Iwobi', nationality:'NGA', avatar:'/images/players/placeholder.png', rating:80, positions:['CAM','CM'], stats:{speed:72,shooting:68,passing:74,defending:52,physical:62} },
    { id:'NGA-Aribo', name:'阿里博', nameEn:'Joe Aribo', nationality:'NGA', avatar:'/images/players/placeholder.png', rating:77, positions:['CM','CAM'], stats:{speed:66,shooting:62,passing:68,defending:58,physical:70} },
  ],
  LW: [
    { id:'NGA-Chukwueze', name:'丘库埃泽', nameEn:'Samuel Chukwueze', nationality:'NGA', avatar:'/images/players/placeholder.png', rating:81, positions:['RW','LW'], stats:{speed:90,shooting:74,passing:66,defending:35,physical:58} },
    { id:'NGA-SimonM', name:'西蒙', nameEn:'Moses Simon', nationality:'NGA', avatar:'/images/players/placeholder.png', rating:77, positions:['LW','RW'], stats:{speed:86,shooting:68,passing:64,defending:38,physical:60} },
  ],
  ST: [
    { id:'NGA-Osimhen', name:'奥斯梅恩', nameEn:'Victor Osimhen', nationality:'NGA', avatar:'/images/players/placeholder.png', rating:88, positions:['ST'], stats:{speed:86,shooting:88,passing:62,defending:35,physical:82} },
    { id:'NGA-Lookman', name:'卢克曼', nameEn:'Ademola Lookman', nationality:'NGA', avatar:'/images/players/placeholder.png', rating:82, positions:['LW','ST'], stats:{speed:86,shooting:78,passing:66,defending:35,physical:62} },
    { id:'NGA-Boniface', name:'博尼法斯', nameEn:'Victor Boniface', nationality:'NGA', avatar:'/images/players/placeholder.png', rating:81, positions:['ST'], stats:{speed:82,shooting:80,passing:62,defending:28,physical:78} },
  ],
},

UKR: {
  GK: [
    { id:'UKR-Lunin', name:'卢宁', nameEn:'Andriy Lunin', nationality:'UKR', avatar:'/images/players/placeholder.png', rating:80, positions:['GK'], stats:{speed:48,shooting:18,passing:46,defending:56,physical:62} },
  ],
  CB: [
    { id:'UKR-Zabarnyi', name:'扎巴尔尼', nameEn:'Illya Zabarnyi', nationality:'UKR', avatar:'/images/players/placeholder.png', rating:79, positions:['CB'], stats:{speed:64,shooting:32,passing:62,defending:84,physical:80} },
    { id:'UKR-Matviienko', name:'马特维延科', nameEn:'Mykola Matviienko', nationality:'UKR', avatar:'/images/players/placeholder.png', rating:77, positions:['CB','LB'], stats:{speed:62,shooting:35,passing:62,defending:80,physical:78} },
  ],
  CM: [
    { id:'UKR-Zinchenko', name:'津琴科', nameEn:'Oleksandr Zinchenko', nationality:'UKR', avatar:'/images/players/placeholder.png', rating:84, positions:['LB','CM'], stats:{speed:74,shooting:52,passing:78,defending:72,physical:66} },
    { id:'UKR-Sudakov', name:'苏达科夫', nameEn:'Heorhiy Sudakov', nationality:'UKR', avatar:'/images/players/placeholder.png', rating:80, positions:['CAM','CM'], stats:{speed:70,shooting:68,passing:76,defending:48,physical:58} },
    { id:'UKR-Tsygankov', name:'齐甘科夫', nameEn:'Viktor Tsygankov', nationality:'UKR', avatar:'/images/players/placeholder.png', rating:81, positions:['RW','CAM'], stats:{speed:84,shooting:74,passing:72,defending:42,physical:58} },
  ],
  LW: [
    { id:'UKR-Mudryk', name:'穆德里克', nameEn:'Mykhailo Mudryk', nationality:'UKR', avatar:'/images/players/placeholder.png', rating:78, positions:['LW','RW'], stats:{speed:92,shooting:72,passing:66,defending:35,physical:60} },
  ],
  ST: [
    { id:'UKR-Dovbyk', name:'多夫比克', nameEn:'Artem Dovbyk', nationality:'UKR', avatar:'/images/players/placeholder.png', rating:83, positions:['ST'], stats:{speed:74,shooting:82,passing:62,defending:30,physical:80} },
    { id:'UKR-Yaremchuk', name:'亚列姆丘克', nameEn:'Roman Yaremchuk', nationality:'UKR', avatar:'/images/players/placeholder.png', rating:76, positions:['ST'], stats:{speed:72,shooting:76,passing:55,defending:28,physical:76} },
  ],
},

HUN: {
  GK: [
    { id:'HUN-Gulasci', name:'古拉西奇', nameEn:'Peter Gulacsi', nationality:'HUN', avatar:'/images/players/placeholder.png', rating:82, positions:['GK'], stats:{speed:48,shooting:18,passing:48,defending:58,physical:64} },
    { id:'HUN-Dibusz', name:'迪布斯', nameEn:'Denes Dibusz', nationality:'HUN', avatar:'/images/players/placeholder.png', rating:78, positions:['GK'], stats:{speed:46,shooting:18,passing:44,defending:56,physical:62} },
  ],
  CB: [
    { id:'HUN-SzalaiA', name:'A·绍洛伊', nameEn:'Attila Szalai', nationality:'HUN', avatar:'/images/players/placeholder.png', rating:77, positions:['CB'], stats:{speed:64,shooting:35,passing:60,defending:80,physical:80} },
    { id:'HUN-OrbanW', name:'奥尔班', nameEn:'Willi Orban', nationality:'HUN', avatar:'/images/players/placeholder.png', rating:79, positions:['CB'], stats:{speed:62,shooting:42,passing:62,defending:82,physical:82} },
    { id:'HUN-LangA', name:'朗', nameEn:'Adam Lang', nationality:'HUN', avatar:'/images/players/placeholder.png', rating:73, positions:['CB'], stats:{speed:60,shooting:30,passing:55,defending:78,physical:76} },
  ],
  LB: [
    { id:'HUN-Kerkez', name:'凯尔凯兹', nameEn:'Milos Kerkez', nationality:'HUN', avatar:'/images/players/placeholder.png', rating:76, positions:['LB','LM'], stats:{speed:82,shooting:42,passing:64,defending:76,physical:72} },
  ],
  RB: [
    { id:'HUN-Nego', name:'内戈', nameEn:'Loic Nego', nationality:'HUN', avatar:'/images/players/placeholder.png', rating:74, positions:['RB','RM'], stats:{speed:80,shooting:45,passing:62,defending:74,physical:72} },
  ],
  CM: [
    { id:'HUN-Szoboszlai', name:'索博斯洛伊', nameEn:'Dominik Szoboszlai', nationality:'HUN', avatar:'/images/players/placeholder.png', rating:85, positions:['CAM','CM'], stats:{speed:78,shooting:80,passing:82,defending:52,physical:66} },
    { id:'HUN-Schafer', name:'舍费尔', nameEn:'Andras Schafer', nationality:'HUN', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CDM'], stats:{speed:66,shooting:58,passing:68,defending:68,physical:68} },
    { id:'HUN-NagyA', name:'A·纳吉', nameEn:'Adam Nagy', nationality:'HUN', avatar:'/images/players/placeholder.png', rating:74, positions:['CDM','CM'], stats:{speed:58,shooting:52,passing:64,defending:72,physical:74} },
    { id:'HUN-StylesC', name:'斯泰尔斯', nameEn:'Callum Styles', nationality:'HUN', avatar:'/images/players/placeholder.png', rating:72, positions:['CM','LM'], stats:{speed:64,shooting:55,passing:64,defending:58,physical:62} },
  ],
  LW: [
    { id:'HUN-Sallai', name:'绍洛伊(锋)', nameEn:'Roland Sallai', nationality:'HUN', avatar:'/images/players/placeholder.png', rating:78, positions:['LW','RW'], stats:{speed:82,shooting:72,passing:66,defending:42,physical:64} },
    { id:'HUN-VargaK', name:'瓦尔加', nameEn:'Kevin Varga', nationality:'HUN', avatar:'/images/players/placeholder.png', rating:73, positions:['LW','RW'], stats:{speed:84,shooting:65,passing:60,defending:35,physical:58} },
  ],
  ST: [
    { id:'HUN-VargaB', name:'B·瓦尔加', nameEn:'Barnabas Varga', nationality:'HUN', avatar:'/images/players/placeholder.png', rating:75, positions:['ST'], stats:{speed:70,shooting:76,passing:55,defending:28,physical:74} },
    { id:'HUN-AdamM', name:'亚当', nameEn:'Martin Adam', nationality:'HUN', avatar:'/images/players/placeholder.png', rating:73, positions:['ST'], stats:{speed:60,shooting:74,passing:50,defending:28,physical:82} },
  ],
},

SRB: {
  GK: [
    { id:'SRB-Rajkovic', name:'拉伊科维奇', nameEn:'Predrag Rajkovic', nationality:'SRB', avatar:'/images/players/placeholder.png', rating:80, positions:['GK'], stats:{speed:48,shooting:18,passing:46,defending:58,physical:62} },
    { id:'SRB-MilinkovicS', name:'米林科维奇-萨维奇', nameEn:'Vanja Milinkovic-Savic', nationality:'SRB', avatar:'/images/players/placeholder.png', rating:78, positions:['GK'], stats:{speed:46,shooting:18,passing:44,defending:56,physical:62} },
  ],
  CB: [
    { id:'SRB-Milenkovic', name:'米伦科维奇', nameEn:'Nikola Milenkovic', nationality:'SRB', avatar:'/images/players/placeholder.png', rating:82, positions:['CB'], stats:{speed:64,shooting:38,passing:62,defending:86,physical:84} },
    { id:'SRB-PavlovicS', name:'帕夫洛维奇', nameEn:'Strahinja Pavlovic', nationality:'SRB', avatar:'/images/players/placeholder.png', rating:79, positions:['CB','LB'], stats:{speed:66,shooting:35,passing:60,defending:82,physical:82} },
    { id:'SRB-Veljkovic', name:'韦利科维奇', nameEn:'Milos Veljkovic', nationality:'SRB', avatar:'/images/players/placeholder.png', rating:77, positions:['CB','CDM'], stats:{speed:60,shooting:35,passing:62,defending:80,physical:80} },
    { id:'SRB-ErlicS', name:'埃尔利奇', nameEn:'Strahinja Erakovic', nationality:'SRB', avatar:'/images/players/placeholder.png', rating:75, positions:['CB','RB'], stats:{speed:66,shooting:32,passing:58,defending:80,physical:78} },
  ],
  LB: [
    { id:'SRB-KosticF', name:'科斯蒂奇', nameEn:'Filip Kostic', nationality:'SRB', avatar:'/images/players/placeholder.png', rating:82, positions:['LM','LW'], stats:{speed:86,shooting:68,passing:78,defending:55,physical:70} },
  ],
  RB: [
    { id:'SRB-ZivkovicA', name:'日夫科维奇', nameEn:'Andrija Zivkovic', nationality:'SRB', avatar:'/images/players/placeholder.png', rating:77, positions:['RW','RB'], stats:{speed:82,shooting:68,passing:66,defending:52,physical:60} },
  ],
  CM: [
    { id:'SRB-MilinkovicSMS', name:'S·米林科维奇', nameEn:'Sergej Milinkovic-Savic', nationality:'SRB', avatar:'/images/players/placeholder.png', rating:87, positions:['CM','CAM'], stats:{speed:72,shooting:78,passing:80,defending:72,physical:84} },
    { id:'SRB-LukicS', name:'卢基奇', nameEn:'Sasa Lukic', nationality:'SRB', avatar:'/images/players/placeholder.png', rating:78, positions:['CM','CDM'], stats:{speed:62,shooting:58,passing:68,defending:74,physical:74} },
    { id:'SRB-Gudelj', name:'古德利', nameEn:'Nemanja Gudelj', nationality:'SRB', avatar:'/images/players/placeholder.png', rating:77, positions:['CDM','CB'], stats:{speed:58,shooting:55,passing:70,defending:78,physical:78} },
    { id:'SRB-GrujicM', name:'格鲁伊奇', nameEn:'Marko Grujic', nationality:'SRB', avatar:'/images/players/placeholder.png', rating:75, positions:['CM','CDM'], stats:{speed:62,shooting:58,passing:66,defending:68,physical:72} },
    { id:'SRB-IlicI', name:'伊利奇', nameEn:'Ivan Ilic', nationality:'SRB', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CDM'], stats:{speed:66,shooting:58,passing:68,defending:62,physical:64} },
  ],
  LW: [
    { id:'SRB-Tadic', name:'塔迪奇', nameEn:'Dusan Tadic', nationality:'SRB', avatar:'/images/players/placeholder.png', rating:85, positions:['LW','CAM'], stats:{speed:72,shooting:80,passing:86,defending:42,physical:64} },
  ],
  ST: [
    { id:'SRB-MitrovicA', name:'米特罗维奇', nameEn:'Aleksandar Mitrovic', nationality:'SRB', avatar:'/images/players/placeholder.png', rating:84, positions:['ST'], stats:{speed:68,shooting:86,passing:62,defending:30,physical:84} },
    { id:'SRB-Vlahovic', name:'弗拉霍维奇', nameEn:'Dusan Vlahovic', nationality:'SRB', avatar:'/images/players/placeholder.png', rating:83, positions:['ST'], stats:{speed:76,shooting:84,passing:62,defending:32,physical:78} },
    { id:'SRB-JovicL', name:'约维奇', nameEn:'Luka Jovic', nationality:'SRB', avatar:'/images/players/placeholder.png', rating:79, positions:['ST'], stats:{speed:74,shooting:80,passing:60,defending:28,physical:68} },
  ],
},

RUS: {
  GK: [
    { id:'RUS-Safonov', name:'萨福诺夫', nameEn:'Matvey Safonov', nationality:'RUS', avatar:'/images/players/placeholder.png', rating:78, positions:['GK'], stats:{speed:46,shooting:18,passing:44,defending:56,physical:62} },
  ],
  CB: [
    { id:'RUS-Diveev', name:'迪韦耶夫', nameEn:'Igor Diveev', nationality:'RUS', avatar:'/images/players/placeholder.png', rating:77, positions:['CB'], stats:{speed:62,shooting:35,passing:60,defending:82,physical:80} },
    { id:'RUS-Osipenko', name:'奥西片科', nameEn:'Maksim Osipenko', nationality:'RUS', avatar:'/images/players/placeholder.png', rating:75, positions:['CB'], stats:{speed:60,shooting:32,passing:58,defending:80,physical:78} },
  ],
  CM: [
    { id:'RUS-MiranchukA', name:'A·米兰丘克', nameEn:'Aleksei Miranchuk', nationality:'RUS', avatar:'/images/players/placeholder.png', rating:80, positions:['CAM','CM'], stats:{speed:68,shooting:72,passing:76,defending:48,physical:60} },
    { id:'RUS-Barrios', name:'巴里奥斯', nameEn:'Wilmar Barrios', nationality:'RUS', avatar:'/images/players/placeholder.png', rating:78, positions:['CDM','CM'], stats:{speed:62,shooting:52,passing:66,defending:80,physical:78} },
    { id:'RUS-Golovin', name:'戈洛温', nameEn:'Aleksandr Golovin', nationality:'RUS', avatar:'/images/players/placeholder.png', rating:82, positions:['CM','CAM'], stats:{speed:74,shooting:68,passing:78,defending:55,physical:62} },
  ],
  LW: [
    { id:'RUS-Mostovoy', name:'莫斯托沃伊', nameEn:'Andrei Mostovoy', nationality:'RUS', avatar:'/images/players/placeholder.png', rating:74, positions:['LW','RW'], stats:{speed:82,shooting:65,passing:62,defending:35,physical:58} },
  ],
  ST: [
    { id:'RUS-Sobolev', name:'索博列夫', nameEn:'Aleksandr Sobolev', nationality:'RUS', avatar:'/images/players/placeholder.png', rating:78, positions:['ST'], stats:{speed:72,shooting:78,passing:55,defending:28,physical:80} },
    { id:'RUS-Tyukavin', name:'秋卡温', nameEn:'Konstantin Tyukavin', nationality:'RUS', avatar:'/images/players/placeholder.png', rating:76, positions:['ST'], stats:{speed:78,shooting:76,passing:58,defending:25,physical:70} },
  ],
},


SVK: {
  GK: [
    { id:'SVK-Dubravka', name:'杜布拉夫卡', nameEn:'Martin Dubravka', nationality:'SVK', avatar:'/images/players/placeholder.png', rating:81, positions:['GK'], stats:{speed:46,shooting:18,passing:46,defending:58,physical:64} },
  ],
  CB: [
    { id:'SVK-Skriniar', name:'什克里尼亚尔', nameEn:'Milan Skriniar', nationality:'SVK', avatar:'/images/players/placeholder.png', rating:84, positions:['CB'], stats:{speed:66,shooting:42,passing:64,defending:88,physical:84} },
    { id:'SVK-Vavro', name:'瓦夫罗', nameEn:'Denis Vavro', nationality:'SVK', avatar:'/images/players/placeholder.png', rating:75, positions:['CB'], stats:{speed:62,shooting:32,passing:58,defending:80,physical:78} },
  ],
  CM: [
    { id:'SVK-Lobotka', name:'洛博特卡', nameEn:'Stanislav Lobotka', nationality:'SVK', avatar:'/images/players/placeholder.png', rating:83, positions:['CDM','CM'], stats:{speed:66,shooting:48,passing:78,defending:78,physical:68} },
    { id:'SVK-Hamsik', name:'哈姆西克', nameEn:'Marek Hamsik', nationality:'SVK', avatar:'/images/players/placeholder.png', rating:82, positions:['CAM','CM'], stats:{speed:66,shooting:76,passing:80,defending:55,physical:66} },
    { id:'SVK-Kucka', name:'库茨卡', nameEn:'Juraj Kucka', nationality:'SVK', avatar:'/images/players/placeholder.png', rating:77, positions:['CM','CDM'], stats:{speed:62,shooting:62,passing:66,defending:72,physical:78} },
  ],
  LW: [
    { id:'SVK-MakR', name:'马克', nameEn:'Robert Mak', nationality:'SVK', avatar:'/images/players/placeholder.png', rating:74, positions:['LW','RW'], stats:{speed:84,shooting:68,passing:62,defending:32,physical:58} },
  ],
  ST: [
    { id:'SVK-Bozhenik', name:'博热尼克', nameEn:'Robert Bozenik', nationality:'SVK', avatar:'/images/players/placeholder.png', rating:74, positions:['ST'], stats:{speed:72,shooting:74,passing:52,defending:25,physical:74} },
  ],
},

SVN: {
  GK: [
    { id:'SVN-Obllak', name:'奥布拉克', nameEn:'Jan Oblak', nationality:'SVN', avatar:'/images/players/placeholder.png', rating:88, positions:['GK'], stats:{speed:50,shooting:20,passing:50,defending:62,physical:68} },
  ],
  CB: [
    { id:'SVN-Bijol', name:'比约尔', nameEn:'Jaka Bijol', nationality:'SVN', avatar:'/images/players/placeholder.png', rating:78, positions:['CB','CDM'], stats:{speed:62,shooting:35,passing:62,defending:82,physical:80} },
    { id:'SVN-StojanovicP', name:'斯托扬诺维奇', nameEn:'Petar Stojanovic', nationality:'SVN', avatar:'/images/players/placeholder.png', rating:76, positions:['RB','CB'], stats:{speed:80,shooting:42,passing:62,defending:76,physical:74} },
  ],
  CM: [
    { id:'SVN-Cerin', name:'切林', nameEn:'Adam Gnezda Cerin', nationality:'SVN', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CDM'], stats:{speed:64,shooting:55,passing:68,defending:66,physical:66} },
    { id:'SVN-Mlakar', name:'姆拉卡', nameEn:'Jan Mlakar', nationality:'SVN', avatar:'/images/players/placeholder.png', rating:73, positions:['LW','ST'], stats:{speed:78,shooting:68,passing:58,defending:30,physical:62} },
    { id:'SVN-Elsnik', name:'埃尔什尼克', nameEn:'Timi Elsnik', nationality:'SVN', avatar:'/images/players/placeholder.png', rating:75, positions:['CM','CAM'], stats:{speed:66,shooting:62,passing:66,defending:52,physical:60} },
  ],
  LW: [
    { id:'SVN-StojanovicL', name:'斯托扬诺维奇(锋)', nameEn:'Luka Stojanovic', nationality:'SVN', avatar:'/images/players/placeholder.png', rating:72, positions:['LW','RW'], stats:{speed:80,shooting:62,passing:60,defending:32,physical:55} },
  ],
  ST: [
    { id:'SVN-Sesko', name:'谢什科', nameEn:'Benjamin Sesko', nationality:'SVN', avatar:'/images/players/placeholder.png', rating:84, positions:['ST'], stats:{speed:84,shooting:84,passing:62,defending:38,physical:82} },
    { id:'SVN-Sporar', name:'什波拉尔', nameEn:'Andraz Sporar', nationality:'SVN', avatar:'/images/players/placeholder.png', rating:76, positions:['ST'], stats:{speed:74,shooting:76,passing:55,defending:28,physical:74} },
  ],
},

ISR: {
  GK: [
    { id:'ISR-GlazerO', name:'格拉泽', nameEn:'Omer Glazer', nationality:'ISR', avatar:'/images/players/placeholder.png', rating:73, positions:['GK'], stats:{speed:44,shooting:16,passing:42,defending:52,physical:58} },
  ],
  CB: [
    { id:'ISR-Goldberg', name:'戈德堡', nameEn:'Sean Goldberg', nationality:'ISR', avatar:'/images/players/placeholder.png', rating:72, positions:['CB'], stats:{speed:58,shooting:28,passing:55,defending:78,physical:76} },
  ],
  CM: [
    { id:'ISR-Pero', name:'佩罗', nameEn:'Dor Peretz', nationality:'ISR', avatar:'/images/players/placeholder.png', rating:74, positions:['CM','CDM'], stats:{speed:62,shooting:55,passing:64,defending:66,physical:66} },
    { id:'ISR-GlazerM', name:'格拉泽(中)', nameEn:'Mani Glazer', nationality:'ISR', avatar:'/images/players/placeholder.png', rating:72, positions:['CM','CDM'], stats:{speed:60,shooting:52,passing:62,defending:64,physical:64} },
    { id:'ISR-Kanichowsky', name:'卡尼乔夫斯基', nameEn:'Gavriel Kanichowsky', nationality:'ISR', avatar:'/images/players/placeholder.png', rating:73, positions:['CM','CAM'], stats:{speed:64,shooting:58,passing:64,defending:48,physical:58} },
  ],
  LW: [
    { id:'ISR-Solomon', name:'所罗门', nameEn:'Manor Solomon', nationality:'ISR', avatar:'/images/players/placeholder.png', rating:75, positions:['LW','RW'], stats:{speed:84,shooting:68,passing:64,defending:35,physical:55} },
  ],
  ST: [
    { id:'ISR-Weissman', name:'韦斯曼', nameEn:'Shon Weissman', nationality:'ISR', avatar:'/images/players/placeholder.png', rating:73, positions:['ST'], stats:{speed:72,shooting:72,passing:52,defending:25,physical:68} },
  ],
},

} // end REAL_PLAYERS

// ============================================================
// 主导出函数: 获取某国某位置的全部真实球员
// ============================================================
export function getPlayers(countryId: string, position: Position): Player[] {
  const countryData = REAL_PLAYERS[countryId] || {}
  // 获取该位置的真实球员
  const positionPlayers = countryData[position] || []
  // 获取所有该位置兼容的真实球员 (包括跨位置)
  const compatible: Player[] = [...positionPlayers]
  // 从其他位置补充能踢此位置的球员
  for (const [pos, players] of Object.entries(countryData)) {
    if (pos === position) continue
    for (const p of (players as Player[])) {
      if (p.positions.some(pp => pp === position) && !compatible.find(r => r.id === p.id)) {
        compatible.push(p)
      }
    }
  }

  // 确保至少有球员可用，不生成任何占位球员
  // 所有球员均为真实姓名，无随机生成
  return compatible.slice(0, 6)
}
