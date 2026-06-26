import type { Player, Position } from '@/types'

// ============================================================
// 真实球员数据库 (全部真实姓名，覆盖 48 国)
// 键: 国家id (3字母), 值: 按位置分组的球员数组
// ============================================================
const REAL_PLAYERS: Record<string, Partial<Record<Position, Player[]>>> = {

ALG: {
  GK: [
    { id:'ALG-Mandrea', name:'曼德雷亚', nameEn:'Alex Mandrea', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:44,shooting:16,passing:42,defending:54,physical:60} },
    { id:'ALG-Oukidja', name:'乌基贾', nameEn:'Alexandre Oukidja', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:75, positions:['GK'], stats:{speed:42,shooting:14,passing:40,defending:52,physical:58} },
  ],
  CB: [
    { id:'ALG-MandreaR', name:'曼迪', nameEn:'Aissa Mandi', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:78, positions:['CB','RB'], stats:{speed:62,shooting:35,passing:62,defending:82,physical:78} },
    { id:'ALG-Bensebaini', name:'本塞拜尼', nameEn:'Ramy Bensebaini', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:80, positions:['LB','CB'], stats:{speed:76,shooting:55,passing:66,defending:80,physical:76} },
    { id:'ALG-Atal', name:'阿塔尔', nameEn:'Youcef Atal', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:79, positions:['RB','RM'], stats:{speed:86,shooting:55,passing:66,defending:76,physical:70} },
  ],
  CM: [
    { id:'ALG-Bentaleb', name:'本塔勒布', nameEn:'Nabil Bentaleb', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CDM'], stats:{speed:60,shooting:58,passing:72,defending:72,physical:72} },
    { id:'ALG-Feghouli', name:'费古利', nameEn:'Sofiane Feghouli', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:78, positions:['RW','CM'], stats:{speed:78,shooting:68,passing:72,defending:48,physical:64} },
    { id:'ALG-Zerrouki', name:'泽鲁基', nameEn:'Ramiz Zerrouki', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:75, positions:['CM','CDM'], stats:{speed:62,shooting:52,passing:68,defending:68,physical:66} },
  ],
  CAM: [
    { id:'ALG-Mahrez', name:'马赫雷斯', nameEn:'Riyad Mahrez', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:86, positions:['RW','CAM'], stats:{speed:80,shooting:80,passing:84,defending:38,physical:58} },
    { id:'ALG-Bounedjah', name:'布内贾', nameEn:'Baghdad Bounedjah', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:76, positions:['ST'], stats:{speed:76,shooting:78,passing:55,defending:28,physical:74} },
  ],
  LW: [
    { id:'ALG-Brahimi', name:'布拉希米', nameEn:'Yacine Brahimi', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:79, positions:['LW','CAM'], stats:{speed:78,shooting:72,passing:74,defending:35,physical:58} },
    { id:'ALG-Gouiri', name:'古伊里', nameEn:'Amine Gouiri', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:80, positions:['ST','LW'], stats:{speed:78,shooting:76,passing:70,defending:38,physical:64} },
  ],
  ST: [
    { id:'ALG-Slimani', name:'斯利马尼', nameEn:'Islam Slimani', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:78, positions:['ST'], stats:{speed:66,shooting:80,passing:52,defending:28,physical:82} },
    { id:'ALG-Omar', name:'奥马尔', nameEn:'Andre Sayoud', nationality:'ALG', avatar:'/images/players/placeholder.png', rating:73, positions:['ST'], stats:{speed:68,shooting:72,passing:50,defending:25,physical:70} },
  ],
},

ARG: {
  GK: [
    { id:'ARG-EMartinez', name:'E·马丁内斯', nameEn:'Emiliano Martinez', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:87, positions:['GK'], stats:{speed:48,shooting:20,passing:50,defending:60,physical:68} },
    { id:'ARG-Armani', name:'阿尔马尼', nameEn:'Franco Armani', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:78, positions:['GK'], stats:{speed:44,shooting:18,passing:44,defending:55,physical:62} },
  ],
  CB: [
    { id:'ARG-RomeroC', name:'C·罗梅罗', nameEn:'Cristian Romero', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:86, positions:['CB'], stats:{speed:72,shooting:38,passing:64,defending:90,physical:82} },
    { id:'ARG-Otamendi', name:'奥塔门迪', nameEn:'Nicolas Otamendi', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:82, positions:['CB'], stats:{speed:60,shooting:38,passing:62,defending:86,physical:82} },
    { id:'ARG-Mascherano', name:'马斯切拉诺', nameEn:'Javier Mascherano', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:80, positions:['CB','CDM'], stats:{speed:62,shooting:28,passing:68,defending:86,physical:80} },
    { id:'ARG-Foyth', name:'福伊特', nameEn:'Juan Foyth', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:77, positions:['CB','RB'], stats:{speed:72,shooting:32,passing:60,defending:80,physical:76} },
  ],
  LB: [
    { id:'ARG-Tagliafico', name:'塔利亚菲科', nameEn:'Nicolas Tagliafico', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:80, positions:['LB','LM'], stats:{speed:74,shooting:48,passing:66,defending:80,physical:76} },
    { id:'ARG-Acuna', name:'阿库尼亚', nameEn:'Marcos Acuna', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:78, positions:['LB','LM'], stats:{speed:78,shooting:55,passing:72,defending:72,physical:70} },
  ],
  RB: [
    { id:'ARG-Molina', name:'莫利纳', nameEn:'Nahuel Molina', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:81, positions:['RB','RWB'], stats:{speed:82,shooting:42,passing:68,defending:78,physical:72} },
    { id:'ARG-Montiel', name:'蒙铁尔', nameEn:'Gonzalo Montiel', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:78, positions:['RB'], stats:{speed:76,shooting:42,passing:64,defending:78,physical:74} },
  ],
  CDM: [
    { id:'ARG-Paredes', name:'帕雷德斯', nameEn:'Leandro Paredes', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:81, positions:['CDM','CM'], stats:{speed:58,shooting:62,passing:76,defending:78,physical:76} },
    { id:'ARG-Guido', name:'G·罗德里格斯', nameEn:'Guido Rodriguez', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:80, positions:['CDM','CM'], stats:{speed:55,shooting:52,passing:70,defending:82,physical:78} },
  ],
  CM: [
    { id:'ARG-DePaul', name:'德保罗', nameEn:'Rodrigo De Paul', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:85, positions:['CM','RM'], stats:{speed:74,shooting:72,passing:82,defending:68,physical:72} },
    { id:'ARG-MacAllister', name:'麦卡利斯特', nameEn:'Alexis Mac Allister', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:84, positions:['CM','CAM'], stats:{speed:70,shooting:72,passing:80,defending:62,physical:66} },
    { id:'ARG-FernandezE', name:'E·费尔南德斯', nameEn:'Enzo Fernandez', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:84, positions:['CM','CAM'], stats:{speed:68,shooting:68,passing:82,defending:65,physical:66} },
    { id:'ARG-LoCelso', name:'洛塞尔索', nameEn:'Giovani Lo Celso', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:80, positions:['CM','CAM'], stats:{speed:66,shooting:68,passing:78,defending:52,physical:60} },
  ],
  LW: [
    { id:'ARG-DiMaria', name:'迪马利亚', nameEn:'Angel Di Maria', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:86, positions:['RW','LW'], stats:{speed:82,shooting:82,passing:86,defending:35,physical:58} },
    { id:'ARG-Garnacho', name:'加纳乔', nameEn:'Alejandro Garnacho', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:77, positions:['LW','RW'], stats:{speed:90,shooting:72,passing:64,defending:30,physical:58} },
  ],
  RW: [
    { id:'ARG-Correa', name:'科雷亚', nameEn:'Angel Correa', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:80, positions:['RW','ST'], stats:{speed:82,shooting:76,passing:68,defending:38,physical:64} },
  ],
  ST: [
    { id:'ARG-Messi', name:'梅西', nameEn:'Lionel Messi', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:91, positions:['RW','CAM'], stats:{speed:78,shooting:92,passing:90,defending:32,physical:62} },
    { id:'ARG-LMartinez', name:'劳塔罗', nameEn:'Lautaro Martinez', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:87, positions:['ST'], stats:{speed:80,shooting:88,passing:68,defending:38,physical:80} },
    { id:'ARG-Dybala', name:'迪巴拉', nameEn:'Paulo Dybala', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:85, positions:['CAM','ST'], stats:{speed:78,shooting:84,passing:78,defending:35,physical:58} },
    { id:'ARG-AlvarezJ', name:'阿尔瓦雷斯', nameEn:'Julian Alvarez', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:84, positions:['ST','LW'], stats:{speed:78,shooting:82,passing:70,defending:42,physical:72} },
    { id:'ARG-Aguero', name:'阿圭罗', nameEn:'Sergio Aguero', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:85, positions:['ST'], stats:{speed:80,shooting:88,passing:74,defending:28,physical:72} },
    { id:'ARG-Banega', name:'巴内加', nameEn:'Ever Banega', nationality:'ARG', avatar:'/images/players/placeholder.png', rating:81, positions:['CM','CDM'], stats:{speed:58,shooting:62,passing:82,defending:62,physical:62} },
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
    { id:'AUS-BradleyA', name:'布拉德利', nameEn:'Aziz Behich', nationality:'AUS', avatar:'/images/players/placeholder.png', rating:75, positions:['LB','RB'], stats:{speed:80,shooting:42,passing:62,defending:76,physical:72} },
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
    { id:'AUT-Hinterseer', name:'欣特雷格', nameEn:'Martin Hinteregger', nationality:'AUT', avatar:'/images/players/placeholder.png', rating:79, positions:['CB'], stats:{speed:58,shooting:48,passing:62,defending:84,physical:82} },
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
    { id:'BEL-Courtois', name:'库尔图瓦', nameEn:'Thibaut Courtois', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:90, positions:['GK'], stats:{speed:52,shooting:20,passing:48,defending:62,physical:70} },
    { id:'BEL-Mignolet', name:'米尼奥莱', nameEn:'Simon Mignolet', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:80, positions:['GK'], stats:{speed:44,shooting:18,passing:44,defending:56,physical:62} },
  ],
  CB: [
    { id:'BEL-Vertonghen', name:'费尔通亨', nameEn:'Jan Vertonghen', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:82, positions:['CB','LB'], stats:{speed:62,shooting:42,passing:70,defending:84,physical:78} },
    { id:'BEL-Alderweireld', name:'阿尔德韦雷尔德', nameEn:'Toby Alderweireld', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:83, positions:['CB'], stats:{speed:62,shooting:42,passing:68,defending:86,physical:80} },
    { id:'BEL-Theate', name:'蒂特', nameEn:'Arthur Theate', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:78, positions:['CB','LB'], stats:{speed:68,shooting:35,passing:60,defending:80,physical:78} },
    { id:'BEL-Denayer', name:'德纳耶尔', nameEn:'Jason Denayer', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:78, positions:['CB','CDM'], stats:{speed:64,shooting:32,passing:62,defending:80,physical:76} },
    { id:'BEL-Boyata', name:'博亚塔', nameEn:'Dedryck Boyata', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:76, positions:['CB'], stats:{speed:58,shooting:32,passing:55,defending:80,physical:80} },
  ],
  RB: [
    { id:'BEL-Meunier', name:'默尼耶', nameEn:'Thomas Meunier', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:80, positions:['RB','RM'], stats:{speed:78,shooting:62,passing:68,defending:76,physical:74} },
  ],
  CDM: [
    { id:'BEL-Dendoncker', name:'登东克尔', nameEn:'Leander Dendoncker', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:78, positions:['CDM','CB'], stats:{speed:58,shooting:48,passing:66,defending:82,physical:80} },
  ],
  CM: [
    { id:'BEL-Tielemans', name:'蒂勒曼斯', nameEn:'Youri Tielemans', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:83, positions:['CM','CDM'], stats:{speed:64,shooting:72,passing:80,defending:65,physical:70} },
  ],
  CAM: [
    { id:'BEL-DeBruyne', name:'德布劳内', nameEn:'Kevin De Bruyne', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:91, positions:['CM','CAM'], stats:{speed:76,shooting:86,passing:92,defending:58,physical:72} },
    { id:'BEL-DeKetelaere', name:'德凯特拉雷', nameEn:'Charles De Ketelaere', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:77, positions:['CAM','ST'], stats:{speed:72,shooting:68,passing:74,defending:35,physical:68} },
  ],
  LW: [
    { id:'BEL-Hazard', name:'阿扎尔', nameEn:'Eden Hazard', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:86, positions:['LW','CAM'], stats:{speed:84,shooting:80,passing:84,defending:35,physical:62} },
    { id:'BEL-Carrasco', name:'卡拉斯科', nameEn:'Yannick Carrasco', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:82, positions:['LW','LM'], stats:{speed:86,shooting:72,passing:74,defending:48,physical:66} },
  ],
  RW: [
    { id:'BEL-Doku', name:'多库', nameEn:'Jeremy Doku', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:83, positions:['RW','LW'], stats:{speed:94,shooting:72,passing:68,defending:35,physical:58} },
  ],
  ST: [
    { id:'BEL-Lukaku', name:'卢卡库', nameEn:'Romelu Lukaku', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:85, positions:['ST'], stats:{speed:78,shooting:86,passing:66,defending:32,physical:90} },
    { id:'BEL-Openda', name:'奥蓬达', nameEn:'Lois Openda', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:80, positions:['ST'], stats:{speed:88,shooting:80,passing:55,defending:28,physical:74} },
    { id:'BEL-Batshuayi', name:'巴舒亚伊', nameEn:'Michy Batshuayi', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:77, positions:['ST'], stats:{speed:74,shooting:78,passing:55,defending:25,physical:70} },
    { id:'BEL-Benteke', name:'本特克', nameEn:'Christian Benteke', nationality:'BEL', avatar:'/images/players/placeholder.png', rating:78, positions:['ST'], stats:{speed:64,shooting:80,passing:58,defending:28,physical:86} },
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
  LW: [
    { id:'BIH-Dedic', name:'代迪奇', nameEn:'Amar Dedic', nationality:'BIH', avatar:'/images/players/placeholder.png', rating:74, positions:['LB','LW'], stats:{speed:80,shooting:42,passing:60,defending:72,physical:70} },
  ],
  ST: [
    { id:'BIH-Menalo', name:'梅纳洛', nameEn:'Mirsad Menalo', nationality:'BIH', avatar:'/images/players/placeholder.png', rating:72, positions:['ST','LW'], stats:{speed:74,shooting:70,passing:52,defending:25,physical:68} },
  ],
},

BRA: {
  GK: [
    { id:'BRA-Allison', name:'阿利松', nameEn:'Alisson', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:90, positions:['GK'], stats:{speed:50,shooting:22,passing:55,defending:62,physical:68} },
    { id:'BRA-Ederson', name:'埃德森', nameEn:'Ederson', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:88, positions:['GK'], stats:{speed:55,shooting:24,passing:60,defending:60,physical:66} },
    { id:'BRA-Weverton', name:'韦弗顿', nameEn:'Weverton', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:79, positions:['GK'], stats:{speed:48,shooting:20,passing:50,defending:58,physical:64} },
  ],
  CB: [
    { id:'BRA-Mquinho', name:'马尔基尼奥斯', nameEn:'Marquinhos', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:87, positions:['CB','CDM'], stats:{speed:72,shooting:42,passing:72,defending:90,physical:80} },
    { id:'BRA-Militao', name:'米利唐', nameEn:'Eder Militao', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:85, positions:['CB','RB'], stats:{speed:80,shooting:42,passing:66,defending:86,physical:80} },
    { id:'BRA-Bremer', name:'布雷默', nameEn:'Bremer', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:84, positions:['CB'], stats:{speed:66,shooting:35,passing:58,defending:88,physical:84} },
    { id:'BRA-SilvaT', name:'蒂亚戈·席尔瓦', nameEn:'Thiago Silva', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:86, positions:['CB'], stats:{speed:66,shooting:35,passing:72,defending:90,physical:80} },
    { id:'BRA-GabrielM', name:'加布里埃尔·马加良斯', nameEn:'Gabriel Magalhães', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:83, positions:['CB'], stats:{speed:66,shooting:42,passing:64,defending:86,physical:82} },
    { id:'BRA-Ibanez', name:'罗杰·伊巴涅斯', nameEn:'Roger Ibañez', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:80, positions:['CB'], stats:{speed:68,shooting:38,passing:60,defending:84,physical:80} },
  ],
  LB: [
    { id:'BRA-Lodi', name:'洛迪', nameEn:'Renan Lodi', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:79, positions:['LB','LM'], stats:{speed:82,shooting:45,passing:68,defending:76,physical:72} },
    { id:'BRA-Sandro', name:'桑德罗', nameEn:'Alex Sandro', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:81, positions:['LB','LWB'], stats:{speed:80,shooting:45,passing:68,defending:80,physical:76} },
    { id:'BRA-DouglasSantos', name:'道格拉斯·桑托斯', nameEn:'Douglas Santos', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:80, positions:['LB','LM'], stats:{speed:82,shooting:48,passing:72,defending:78,physical:74} },
  ],
  RB: [
    { id:'BRA-Danilo', name:'达尼洛', nameEn:'Danilo', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:82, positions:['RB','LB'], stats:{speed:78,shooting:48,passing:68,defending:82,physical:76} },
  ],
  CDM: [
    { id:'BRA-Casemiro', name:'卡塞米罗', nameEn:'Casemiro', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:86, positions:['CDM','CM'], stats:{speed:58,shooting:62,passing:74,defending:90,physical:86} },
    { id:'BRA-Fabinho', name:'法比尼奥', nameEn:'Fabinho', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:84, positions:['CDM','CB'], stats:{speed:62,shooting:55,passing:74,defending:86,physical:84} },
    { id:'BRA-DouglasLuiz', name:'道格拉斯·路易斯', nameEn:'Douglas Luiz', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:82, positions:['CM','CDM'], stats:{speed:64,shooting:65,passing:78,defending:74,physical:72} },
  ],
  CM: [
    { id:'BRA-Paqueta', name:'帕克塔', nameEn:'Lucas Paqueta', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:84, positions:['CAM','CM'], stats:{speed:68,shooting:72,passing:80,defending:58,physical:68} },
    { id:'BRA-Joelinton', name:'若埃林顿', nameEn:'Joelinton', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:81, positions:['CM','ST'], stats:{speed:70,shooting:68,passing:66,defending:65,physical:82} },
  ],
  CAM: [
    { id:'BRA-Neymar', name:'内马尔', nameEn:'Neymar Jr', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:89, positions:['LW','CAM'], stats:{speed:86,shooting:86,passing:84,defending:35,physical:62} },
  ],
  LW: [
    { id:'BRA-ViniJr', name:'维尼修斯', nameEn:'Vinicius Junior', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:89, positions:['LW','ST'], stats:{speed:94,shooting:82,passing:78,defending:32,physical:68} },
    { id:'BRA-MartinelliG', name:'马丁内利', nameEn:'Gabriel Martinelli', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:84, positions:['LW','ST'], stats:{speed:90,shooting:78,passing:70,defending:38,physical:64} },
  ],
  RW: [
    { id:'BRA-Raphinha', name:'拉菲尼亚', nameEn:'Raphinha', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:86, positions:['RW','LW'], stats:{speed:88,shooting:78,passing:80,defending:38,physical:66} },
    { id:'BRA-Rodrygo', name:'罗德里戈', nameEn:'Rodrygo', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:85, positions:['RW','LW'], stats:{speed:88,shooting:80,passing:74,defending:35,physical:62} },
    { id:'BRA-LuizHenrique', name:'路易斯·恩里克', nameEn:'Luiz Henrique', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:80, positions:['RW','LW'], stats:{speed:90,shooting:72,passing:66,defending:35,physical:58} },
  ],
  ST: [
    { id:'BRA-Vinicius', name:'维尼修斯', nameEn:'Vinicius Junior', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:89, positions:['LW','ST'], stats:{speed:94,shooting:82,passing:78,defending:32,physical:68} },
    { id:'BRA-Endrick', name:'恩德里克', nameEn:'Endrick', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:78, positions:['ST'], stats:{speed:82,shooting:76,passing:58,defending:22,physical:68} },
    { id:'BRA-Cunha', name:'马特乌斯·库尼亚', nameEn:'Matheus Cunha', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:82, positions:['ST','LW'], stats:{speed:82,shooting:80,passing:70,defending:38,physical:72} },
    { id:'BRA-IgorThiago', name:'伊戈尔·蒂亚戈', nameEn:'Igor Thiago', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:77, positions:['ST'], stats:{speed:74,shooting:76,passing:55,defending:28,physical:78} },
    { id:'BRA-Rayan', name:'拉扬', nameEn:'Rayan', nationality:'BRA', avatar:'/images/players/placeholder.png', rating:75, positions:['ST'], stats:{speed:78,shooting:74,passing:52,defending:25,physical:72} },
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
    { id:'CIV-Sylvestre', name:'西尔维斯特', nameEn:'Sylvain Sylvestre', nationality:'CIV', avatar:'/images/players/placeholder.png', rating:72, positions:['GK'], stats:{speed:44,shooting:16,passing:42,defending:52,physical:58} },
  ],
  CB: [
    { id:'CIV-Bailly', name:'拜利', nameEn:'Eric Bailly', nationality:'CIV', avatar:'/images/players/placeholder.png', rating:80, positions:['CB'], stats:{speed:72,shooting:38,passing:60,defending:84,physical:80} },
    { id:'CIV-Kossonou', name:'科苏努', nameEn:'Odilon Kossonou', nationality:'CIV', avatar:'/images/players/placeholder.png', rating:78, positions:['CB'], stats:{speed:68,shooting:35,passing:58,defending:82,physical:80} },
    { id:'CIV-DiarraK', name:'迪亚拉', nameEn:'Kossounou Diarra', nationality:'CIV', avatar:'/images/players/placeholder.png', rating:74, positions:['CB','CDM'], stats:{speed:60,shooting:32,passing:58,defending:80,physical:78} },
  ],
  LB: [
    { id:'CIV-KonateS', name:'科纳特', nameEn:'Souleymane Konate', nationality:'CIV', avatar:'/images/players/placeholder.png', rating:73, positions:['LB','CB'], stats:{speed:76,shooting:38,passing:60,defending:74,physical:72} },
  ],
  RB: [
    { id:'CIV-SingoW', name:'辛戈', nameEn:'Wilfried Singo', nationality:'CIV', avatar:'/images/players/placeholder.png', rating:78, positions:['RB','CB'], stats:{speed:84,shooting:52,passing:66,defending:78,physical:78} },
  ],
  CM: [
    { id:'CIV-Kessie', name:'凯西', nameEn:'Franck Kessie', nationality:'CIV', avatar:'/images/players/placeholder.png', rating:84, positions:['CM','CDM'], stats:{speed:70,shooting:72,passing:74,defending:80,physical:84} },
    { id:'CIV-SereyDie', name:'塞雷·迪耶', nameEn:'Serey Die', nationality:'CIV', avatar:'/images/players/placeholder.png', rating:74, positions:['CDM','CM'], stats:{speed:55,shooting:52,passing:64,defending:78,physical:80} },
    { id:'CIV-IbrahimiS', name:'易卜拉希米', nameEn:'Seko Fofana', nationality:'CIV', avatar:'/images/players/placeholder.png', rating:82, positions:['CM','CAM'], stats:{speed:74,shooting:72,passing:76,defending:68,physical:78} },
  ],
  LW: [
    { id:'CIV-Zaha', name:'扎哈', nameEn:'Wilfried Zaha', nationality:'CIV', avatar:'/images/players/placeholder.png', rating:84, positions:['LW','ST'], stats:{speed:88,shooting:80,passing:68,defending:38,physical:66} },
    { id:'CIV-CornetM', name:'科尔内', nameEn:'Maxwel Cornet', nationality:'CIV', avatar:'/images/players/placeholder.png', rating:78, positions:['LW','ST'], stats:{speed:86,shooting:76,passing:64,defending:42,physical:64} },
  ],
  ST: [
    { id:'CIV-Haller', name:'阿莱', nameEn:'Sebastien Haller', nationality:'CIV', avatar:'/images/players/placeholder.png', rating:82, positions:['ST'], stats:{speed:68,shooting:82,passing:62,defending:32,physical:80} },
    { id:'CIV-PepeN', name:'佩佩', nameEn:'Nicolas Pepe', nationality:'CIV', avatar:'/images/players/placeholder.png', rating:81, positions:['RW','ST'], stats:{speed:88,shooting:76,passing:66,defending:35,physical:58} },
    { id:'CIV-KamaraB', name:'卡马拉', nameEn:'Boubakary Kamara', nationality:'CIV', avatar:'/images/players/placeholder.png', rating:80, positions:['CDM','CM'], stats:{speed:62,shooting:48,passing:68,defending:84,physical:78} },
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
    { id:'COL-RomeroC', name:'罗梅罗', nameEn:'Carlos Cuesta', nationality:'COL', avatar:'/images/players/placeholder.png', rating:76, positions:['CB'], stats:{speed:62,shooting:32,passing:58,defending:80,physical:78} },
    { id:'COL-MojicaJ', name:'莫希卡', nameEn:'Johan Mojica', nationality:'COL', avatar:'/images/players/placeholder.png', rating:76, positions:['LB','LM'], stats:{speed:80,shooting:48,passing:66,defending:76,physical:72} },
  ],
  CM: [
    { id:'COL-Cuadrado', name:'夸德拉多', nameEn:'Juan Cuadrado', nationality:'COL', avatar:'/images/players/placeholder.png', rating:84, positions:['RW','RB'], stats:{speed:84,shooting:72,passing:80,defending:58,physical:64} },
    { id:'COL-BarriosW', name:'巴里奥斯', nameEn:'Wilmar Barrios', nationality:'COL', avatar:'/images/players/placeholder.png', rating:78, positions:['CDM','CM'], stats:{speed:62,shooting:52,passing:66,defending:80,physical:78} },
    { id:'COL-UribeM', name:'乌里韦', nameEn:'Mateus Uribe', nationality:'COL', avatar:'/images/players/placeholder.png', rating:80, positions:['CM','CDM'], stats:{speed:64,shooting:68,passing:72,defending:72,physical:74} },
    { id:'COL-LermaJ', name:'莱尔马', nameEn:'Jefferson Lerma', nationality:'COL', avatar:'/images/players/placeholder.png', rating:80, positions:['CDM','CM'], stats:{speed:62,shooting:62,passing:66,defending:82,physical:80} },
  ],
  CAM: [
    { id:'COL-James', name:'J·罗', nameEn:'James Rodriguez', nationality:'COL', avatar:'/images/players/placeholder.png', rating:86, positions:['CAM','RW'], stats:{speed:68,shooting:82,passing:86,defending:38,physical:62} },
    { id:'COL-LuisDiaz', name:'迪亚斯', nameEn:'Luis Diaz', nationality:'COL', avatar:'/images/players/placeholder.png', rating:86, positions:['LW','RW'], stats:{speed:90,shooting:80,passing:72,defending:42,physical:66} },
  ],
  ST: [
    { id:'COL-Sinisterra', name:'西尼斯特拉', nameEn:'Luis Sinisterra', nationality:'COL', avatar:'/images/players/placeholder.png', rating:78, positions:['LW','RW'], stats:{speed:84,shooting:72,passing:66,defending:38,physical:62} },
    { id:'COL-BaccaC', name:'巴卡', nameEn:'Carlos Bacca', nationality:'COL', avatar:'/images/players/placeholder.png', rating:78, positions:['ST'], stats:{speed:78,shooting:80,passing:58,defending:28,physical:74} },
    { id:'COL-BorjaM', name:'博尔哈', nameEn:'Miguel Borja', nationality:'COL', avatar:'/images/players/placeholder.png', rating:77, positions:['ST'], stats:{speed:72,shooting:80,passing:52,defending:25,physical:78} },
  ],
},

CPV: {
  GK: [
    { id:'CPV-Vozinha', name:'沃齐尼亚', nameEn:'Vozinha', nationality:'CPV', avatar:'/images/players/placeholder.png', rating:73, positions:['GK'], stats:{speed:44,shooting:16,passing:40,defending:50,physical:56} },
  ],
  CB: [
    { id:'CPV-Stopira', name:'斯托皮拉', nameEn:'Stopira', nationality:'CPV', avatar:'/images/players/placeholder.png', rating:72, positions:['CB','LB'], stats:{speed:60,shooting:30,passing:55,defending:76,physical:76} },
    { id:'CPV-LopesR', name:'洛佩斯', nameEn:'Roberto Lopes', nationality:'CPV', avatar:'/images/players/placeholder.png', rating:71, positions:['CB'], stats:{speed:58,shooting:28,passing:52,defending:76,physical:74} },
  ],
  CM: [
    { id:'CPV-Alex', name:'阿莱士', nameEn:'Alex', nationality:'CPV', avatar:'/images/players/placeholder.png', rating:71, positions:['CM','CDM'], stats:{speed:62,shooting:52,passing:62,defending:64,physical:66} },
    { id:'CPV-Semedo', name:'塞梅多', nameEn:'Semedo', nationality:'CPV', avatar:'/images/players/placeholder.png', rating:70, positions:['CM','CAM'], stats:{speed:64,shooting:55,passing:60,defending:48,physical:58} },
  ],
  ST: [
    { id:'CPV-MendesR', name:'门德斯', nameEn:'Ryan Mendes', nationality:'CPV', avatar:'/images/players/placeholder.png', rating:73, positions:['LW','ST'], stats:{speed:80,shooting:70,passing:58,defending:32,physical:58} },
    { id:'CPV-TavaresJ', name:'塔瓦雷斯', nameEn:'Jorge Tavares', nationality:'CPV', avatar:'/images/players/placeholder.png', rating:70, positions:['ST'], stats:{speed:72,shooting:70,passing:48,defending:25,physical:70} },
  ],
},

CRO: {
  GK: [
    { id:'CRO-Livakovic', name:'利瓦科维奇', nameEn:'Dominik Livakovic', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:83, positions:['GK'], stats:{speed:48,shooting:18,passing:48,defending:58,physical:64} },
    { id:'CRO-Grbic', name:'格尔比奇', nameEn:'Ivo Grbic', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:77, positions:['GK'], stats:{speed:44,shooting:16,passing:44,defending:54,physical:60} },
  ],
  CB: [
    { id:'CRO-Gvardiol', name:'格瓦迪奥尔', nameEn:'Josko Gvardiol', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:87, positions:['CB','LB'], stats:{speed:82,shooting:55,passing:72,defending:88,physical:82} },
    { id:'CRO-Sutalo', name:'舒塔洛', nameEn:'Josip Sutalo', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:79, positions:['CB'], stats:{speed:62,shooting:32,passing:62,defending:84,physical:80} },
    { id:'CRO-Vida', name:'维达', nameEn:'Domagoj Vida', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:79, positions:['CB'], stats:{speed:62,shooting:42,passing:62,defending:82,physical:80} },
    { id:'CRO-Lovren', name:'洛夫伦', nameEn:'Dejan Lovren', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:80, positions:['CB'], stats:{speed:62,shooting:42,passing:64,defending:84,physical:82} },
  ],
  LB: [
    { id:'CRO-Barisic', name:'巴里西奇', nameEn:'Borna Barisic', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:76, positions:['LB','LM'], stats:{speed:76,shooting:48,passing:68,defending:76,physical:72} },
  ],
  RB: [
    { id:'CRO-Juranovic', name:'尤拉诺维奇', nameEn:'Josip Juranovic', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:79, positions:['RB','LB'], stats:{speed:80,shooting:45,passing:66,defending:78,physical:74} },
    { id:'CRO-Stanisic', name:'斯塔尼西奇', nameEn:'Josip Stanisic', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:77, positions:['RB','CB'], stats:{speed:74,shooting:42,passing:62,defending:78,physical:76} },
  ],
  CM: [
    { id:'CRO-Modric', name:'莫德里奇', nameEn:'Luka Modric', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:89, positions:['CM','CAM'], stats:{speed:72,shooting:76,passing:90,defending:65,physical:62} },
    { id:'CRO-Brozovic', name:'布罗佐维奇', nameEn:'Marcelo Brozovic', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:85, positions:['CDM','CM'], stats:{speed:64,shooting:65,passing:80,defending:82,physical:78} },
    { id:'CRO-Kovacic', name:'科瓦契奇', nameEn:'Mateo Kovacic', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:84, positions:['CM','CDM'], stats:{speed:72,shooting:62,passing:82,defending:68,physical:66} },
    { id:'CRO-Majer', name:'马耶尔', nameEn:'Lovro Majer', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:79, positions:['CAM','CM'], stats:{speed:68,shooting:72,passing:76,defending:48,physical:60} },
  ],
  LW: [
    { id:'CRO-Pericic', name:'佩里西奇', nameEn:'Ivan Perisic', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:85, positions:['LW','LM'], stats:{speed:82,shooting:82,passing:78,defending:52,physical:76} },
    { id:'CRO-Orisic', name:'奥里西奇', nameEn:'Mislav Orsic', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:79, positions:['LW','RW'], stats:{speed:86,shooting:76,passing:66,defending:42,physical:64} },
  ],
  ST: [
    { id:'CRO-Kramaric', name:'克拉马里奇', nameEn:'Andrej Kramaric', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:82, positions:['ST','CAM'], stats:{speed:74,shooting:82,passing:70,defending:38,physical:72} },
    { id:'CRO-PetkovicB', name:'佩特科维奇', nameEn:'Bruno Petkovic', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:78, positions:['ST'], stats:{speed:62,shooting:78,passing:64,defending:28,physical:80} },
    { id:'CRO-Budimir', name:'布季米尔', nameEn:'Ante Budimir', nationality:'CRO', avatar:'/images/players/placeholder.png', rating:77, positions:['ST'], stats:{speed:66,shooting:78,passing:55,defending:30,physical:80} },
  ],
},

CUW: {
  GK: [
    { id:'CUW-Room', name:'鲁姆', nameEn:'Eloy Room', nationality:'CUW', avatar:'/images/players/placeholder.png', rating:73, positions:['GK'], stats:{speed:44,shooting:16,passing:40,defending:50,physical:56} },
    { id:'CUW-Bosch', name:'博斯', nameEn:'Tyrick Bosch', nationality:'CUW', avatar:'/images/players/placeholder.png', rating:68, positions:['GK'], stats:{speed:42,shooting:14,passing:38,defending:48,physical:54} },
  ],
  CB: [
    { id:'CUW-Lachman', name:'拉赫曼', nameEn:'Darryl Lachman', nationality:'CUW', avatar:'/images/players/placeholder.png', rating:71, positions:['CB'], stats:{speed:60,shooting:28,passing:50,defending:76,physical:76} },
  ],
  CM: [
    { id:'CUW-Bacuna', name:'巴库纳', nameEn:'Leandro Bacuna', nationality:'CUW', avatar:'/images/players/placeholder.png', rating:72, positions:['CM','RB'], stats:{speed:72,shooting:55,passing:62,defending:64,physical:68} },
    { id:'CUW-Nepomuceno', name:'内波穆塞诺', nameEn:'Ginio Nepomuceno', nationality:'CUW', avatar:'/images/players/placeholder.png', rating:68, positions:['CM','CDM'], stats:{speed:58,shooting:48,passing:58,defending:62,physical:64} },
  ],
  ST: [
    { id:'CUW-Janga', name:'扬加', nameEn:'Rangelo Janga', nationality:'CUW', avatar:'/images/players/placeholder.png', rating:70, positions:['ST'], stats:{speed:72,shooting:70,passing:44,defending:25,physical:72} },
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
    { id:'CZE-Krejci', name:'克雷伊奇', nameEn:'Ladislav Krejci', nationality:'CZE', avatar:'/images/players/placeholder.png', rating:73, positions:['CB','CDM'], stats:{speed:58,shooting:42,passing:64,defending:78,physical:76} },
  ],
  LB: [
    { id:'CZE-Boril', name:'博里尔', nameEn:'Jan Boril', nationality:'CZE', avatar:'/images/players/placeholder.png', rating:73, positions:['LB'], stats:{speed:76,shooting:38,passing:62,defending:76,physical:72} },
  ],
  CM: [
    { id:'CZE-Soucek', name:'绍切克', nameEn:'Tomas Soucek', nationality:'CZE', avatar:'/images/players/placeholder.png', rating:82, positions:['CDM','CM'], stats:{speed:66,shooting:68,passing:70,defending:82,physical:86} },
    { id:'CZE-Darida', name:'达里达', nameEn:'Vladimir Darida', nationality:'CZE', avatar:'/images/players/placeholder.png', rating:77, positions:['CM','CAM'], stats:{speed:62,shooting:65,passing:72,defending:62,physical:66} },
    { id:'CZE-Barak', name:'巴拉克', nameEn:'Antonin Barak', nationality:'CZE', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CAM'], stats:{speed:66,shooting:68,passing:72,defending:55,physical:62} },
  ],
  LW: [
    { id:'CZE-Jankto', name:'扬克托', nameEn:'Jakub Jankto', nationality:'CZE', avatar:'/images/players/placeholder.png', rating:74, positions:['LM','LW'], stats:{speed:80,shooting:62,passing:64,defending:48,physical:60} },
  ],
  ST: [
    { id:'CZE-Schick', name:'希克', nameEn:'Patrik Schick', nationality:'CZE', avatar:'/images/players/placeholder.png', rating:82, positions:['ST'], stats:{speed:76,shooting:82,passing:64,defending:32,physical:76} },
    { id:'CZE-Krmencik', name:'克门奇克', nameEn:'Michael Krmencik', nationality:'CZE', avatar:'/images/players/placeholder.png', rating:73, positions:['ST'], stats:{speed:72,shooting:76,passing:50,defending:28,physical:74} },
    { id:'CZE-Pekhart', name:'佩克哈特', nameEn:'Tomas Pekhart', nationality:'CZE', avatar:'/images/players/placeholder.png', rating:71, positions:['ST'], stats:{speed:55,shooting:74,passing:48,defending:25,physical:80} },
  ],
},

ECU: {
  GK: [
    { id:'ECU-Galindez', name:'加林德斯', nameEn:'Hernan Galindez', nationality:'ECU', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:44,shooting:16,passing:44,defending:54,physical:60} },
    { id:'ECU-RamirezM', name:'拉米雷斯', nameEn:'Moises Ramirez', nationality:'ECU', avatar:'/images/players/placeholder.png', rating:72, positions:['GK'], stats:{speed:42,shooting:14,passing:40,defending:52,physical:58} },
  ],
  CB: [
    { id:'ECU-TorresF', name:'F·托雷斯', nameEn:'Felix Torres', nationality:'ECU', avatar:'/images/players/placeholder.png', rating:77, positions:['CB'], stats:{speed:62,shooting:35,passing:58,defending:82,physical:80} },
    { id:'ECU-Hincapie', name:'因卡皮耶', nameEn:'Piero Hincapie', nationality:'ECU', avatar:'/images/players/placeholder.png', rating:79, positions:['CB','LB'], stats:{speed:68,shooting:35,passing:62,defending:82,physical:78} },
    { id:'ECU-Arboleda', name:'阿沃莱达', nameEn:'Robert Arboleda', nationality:'ECU', avatar:'/images/players/placeholder.png', rating:76, positions:['CB'], stats:{speed:60,shooting:38,passing:55,defending:80,physical:80} },
  ],
  LB: [
    { id:'ECU-EstradaD', name:'埃斯特拉达', nameEn:'Diego Estrada', nationality:'ECU', avatar:'/images/players/placeholder.png', rating:73, positions:['LB','LM'], stats:{speed:78,shooting:42,passing:60,defending:74,physical:70} },
  ],
  RB: [
    { id:'ECU-PreciadoA', name:'普雷西亚多', nameEn:'Angelo Preciado', nationality:'ECU', avatar:'/images/players/placeholder.png', rating:74, positions:['RB','RM'], stats:{speed:82,shooting:42,passing:62,defending:74,physical:72} },
  ],
  CM: [
    { id:'ECU-CaicedoM', name:'凯塞多', nameEn:'Moises Caicedo', nationality:'ECU', avatar:'/images/players/placeholder.png', rating:84, positions:['CM','CDM'], stats:{speed:70,shooting:62,passing:76,defending:82,physical:78} },
    { id:'ECU-Gruezzo', name:'格鲁埃索', nameEn:'Carlos Gruezo', nationality:'ECU', avatar:'/images/players/placeholder.png', rating:76, positions:['CDM','CM'], stats:{speed:58,shooting:48,passing:64,defending:80,physical:78} },
    { id:'ECU-MenaA', name:'梅纳', nameEn:'Angel Mena', nationality:'ECU', avatar:'/images/players/placeholder.png', rating:75, positions:['RM','CM'], stats:{speed:78,shooting:65,passing:66,defending:48,physical:60} },
  ],
  CAM: [
    { id:'ECU-ValenciaE', name:'瓦伦西亚', nameEn:'Enner Valencia', nationality:'ECU', avatar:'/images/players/placeholder.png', rating:82, positions:['ST','LW'], stats:{speed:80,shooting:84,passing:62,defending:38,physical:76} },
    { id:'ECU-Sarmiento', name:'萨米恩托', nameEn:'Jeremy Sarmiento', nationality:'ECU', avatar:'/images/players/placeholder.png', rating:73, positions:['LW','CAM'], stats:{speed:80,shooting:62,passing:62,defending:35,physical:55} },
  ],
  ST: [
    { id:'ECU-EstradaM', name:'埃斯特拉达', nameEn:'Michael Estrada', nationality:'ECU', avatar:'/images/players/placeholder.png', rating:75, positions:['ST'], stats:{speed:76,shooting:76,passing:55,defending:28,physical:72} },
    { id:'ECU-Cifuentes', name:'西富恩特斯', nameEn:'Jordy Cifuentes', nationality:'ECU', avatar:'/images/players/placeholder.png', rating:72, positions:['ST'], stats:{speed:74,shooting:72,passing:50,defending:25,physical:70} },
  ],
},

EGY: {
  GK: [
    { id:'EGY-ElShenawy', name:'埃尔-舍纳维', nameEn:'Mohamed El-Shenawy', nationality:'EGY', avatar:'/images/players/placeholder.png', rating:80, positions:['GK'], stats:{speed:46,shooting:18,passing:46,defending:56,physical:62} },
    { id:'EGY-GaberM', name:'加贝尔', nameEn:'Mahmoud Gad', nationality:'EGY', avatar:'/images/players/placeholder.png', rating:74, positions:['GK'], stats:{speed:44,shooting:16,passing:42,defending:52,physical:58} },
  ],
  CB: [
    { id:'EGY-Hegazi', name:'赫加齐', nameEn:'Ahmed Hegazi', nationality:'EGY', avatar:'/images/players/placeholder.png', rating:80, positions:['CB'], stats:{speed:60,shooting:38,passing:62,defending:84,physical:82} },
    { id:'EGY-Abdelmonem', name:'阿卜杜勒莫内姆', nameEn:'Mohamed Abdelmonem', nationality:'EGY', avatar:'/images/players/placeholder.png', rating:77, positions:['CB'], stats:{speed:62,shooting:32,passing:58,defending:82,physical:78} },
    { id:'EGY-SamirY', name:'萨米尔', nameEn:'Yasser Ibrahim', nationality:'EGY', avatar:'/images/players/placeholder.png', rating:75, positions:['CB'], stats:{speed:58,shooting:30,passing:55,defending:80,physical:78} },
  ],
  LB: [
    { id:'EGY-Fatouh', name:'法图赫', nameEn:'Ahmed Fatouh', nationality:'EGY', avatar:'/images/players/placeholder.png', rating:73, positions:['LB','LM'], stats:{speed:78,shooting:42,passing:62,defending:74,physical:70} },
  ],
  RB: [
    { id:'EGY-HanyM', name:'哈尼', nameEn:'Mohamed Hany', nationality:'EGY', avatar:'/images/players/placeholder.png', rating:74, positions:['RB','RM'], stats:{speed:78,shooting:38,passing:60,defending:76,physical:72} },
  ],
  CM: [
    { id:'EGY-Elneny', name:'埃尔内尼', nameEn:'Mohamed Elneny', nationality:'EGY', avatar:'/images/players/placeholder.png', rating:80, positions:['CM','CDM'], stats:{speed:60,shooting:55,passing:74,defending:72,physical:70} },
    { id:'EGY-MohamedA', name:'穆罕默德', nameEn:'Afsha', nationality:'EGY', avatar:'/images/players/placeholder.png', rating:76, positions:['CAM','CM'], stats:{speed:64,shooting:68,passing:70,defending:48,physical:58} },
    { id:'EGY-HamdyM', name:'哈姆迪', nameEn:'Marwan Hamdy', nationality:'EGY', avatar:'/images/players/placeholder.png', rating:73, positions:['CM','CDM'], stats:{speed:58,shooting:52,passing:64,defending:65,physical:66} },
  ],
  LW: [
    { id:'EGY-Marmoush', name:'马尔穆什', nameEn:'Omar Marmoush', nationality:'EGY', avatar:'/images/players/placeholder.png', rating:80, positions:['LW','ST'], stats:{speed:86,shooting:76,passing:70,defending:38,physical:64} },
    { id:'EGY-SalahM', name:'萨拉赫', nameEn:'Mohamed Salah', nationality:'EGY', avatar:'/images/players/placeholder.png', rating:89, positions:['RW','LW'], stats:{speed:90,shooting:88,passing:82,defending:42,physical:68} },
    { id:'EGY-Trezeguet', name:'特雷泽盖', nameEn:'Mahmoud Trezeguet', nationality:'EGY', avatar:'/images/players/placeholder.png', rating:77, positions:['LW','RM'], stats:{speed:80,shooting:68,passing:64,defending:42,physical:64} },
  ],
  ST: [
    { id:'EGY-MostafaM', name:'穆斯塔法', nameEn:'Mostafa Mohamed', nationality:'EGY', avatar:'/images/players/placeholder.png', rating:77, positions:['ST'], stats:{speed:72,shooting:78,passing:55,defending:28,physical:76} },
    { id:'EGY-Kahraba', name:'卡赫拉巴', nameEn:'Kahraba', nationality:'EGY', avatar:'/images/players/placeholder.png', rating:74, positions:['ST','RW'], stats:{speed:80,shooting:72,passing:55,defending:28,physical:66} },
  ],
},

ENG: {
  GK: [
    { id:'ENG-Pickford', name:'皮克福德', nameEn:'Jordan Pickford', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:84, positions:['GK'], stats:{speed:48,shooting:22,passing:48,defending:58,physical:64} },
    { id:'ENG-Ramsdale', name:'拉姆斯代尔', nameEn:'Aaron Ramsdale', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:82, positions:['GK'], stats:{speed:46,shooting:20,passing:50,defending:56,physical:62} },
  ],
  CB: [
    { id:'ENG-Stones', name:'斯通斯', nameEn:'John Stones', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:85, positions:['CB','CDM'], stats:{speed:68,shooting:42,passing:74,defending:86,physical:78} },
    { id:'ENG-Guehi', name:'格希', nameEn:'Marc Guehi', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:79, positions:['CB'], stats:{speed:66,shooting:30,passing:62,defending:82,physical:76} },
    { id:'ENG-Colwill', name:'科尔威尔', nameEn:'Levi Colwill', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:78, positions:['CB','LB'], stats:{speed:66,shooting:30,passing:64,defending:80,physical:76} },
  ],
  LB: [
    { id:'ENG-Shaw', name:'卢克·肖', nameEn:'Luke Shaw', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:83, positions:['LB','CB'], stats:{speed:76,shooting:52,passing:74,defending:80,physical:76} },
    { id:'ENG-Chilwell', name:'奇尔韦尔', nameEn:'Ben Chilwell', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:81, positions:['LB','LM'], stats:{speed:80,shooting:55,passing:72,defending:78,physical:70} },
  ],
  RB: [
    { id:'ENG-Walker', name:'沃克', nameEn:'Kyle Walker', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:84, positions:['RB','CB'], stats:{speed:90,shooting:48,passing:66,defending:82,physical:76} },
    { id:'ENG-AlexanderArnold', name:'阿诺德', nameEn:'Trent Alexander-Arnold', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:86, positions:['RB','CM'], stats:{speed:78,shooting:65,passing:90,defending:74,physical:68} },
    { id:'ENG-Trippier', name:'特里皮尔', nameEn:'Kieran Trippier', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:83, positions:['RB','LB'], stats:{speed:72,shooting:55,passing:78,defending:80,physical:72} },
  ],
  CM: [
    { id:'ENG-Rice', name:'赖斯', nameEn:'Declan Rice', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:86, positions:['CDM','CM'], stats:{speed:66,shooting:58,passing:78,defending:86,physical:82} },
    { id:'ENG-Bellingham', name:'贝林厄姆', nameEn:'Jude Bellingham', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:88, positions:['CM','CAM'], stats:{speed:78,shooting:82,passing:82,defending:72,physical:78} },
    { id:'ENG-Mount', name:'芒特', nameEn:'Mason Mount', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:83, positions:['CAM','CM'], stats:{speed:72,shooting:72,passing:76,defending:52,physical:62} },
    { id:'ENG-Maddison', name:'麦迪逊', nameEn:'James Maddison', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:82, positions:['CAM','CM'], stats:{speed:68,shooting:76,passing:80,defending:42,physical:58} },
    { id:'ENG-Gallagher', name:'加拉格尔', nameEn:'Conor Gallagher', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:80, positions:['CM','CAM'], stats:{speed:72,shooting:65,passing:72,defending:68,physical:74} },
    { id:'ENG-Mainoo', name:'梅努', nameEn:'Kobbie Mainoo', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:78, positions:['CM','CDM'], stats:{speed:66,shooting:55,passing:78,defending:68,physical:64} },
  ],
  RW: [
    { id:'ENG-Saka', name:'萨卡', nameEn:'Bukayo Saka', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:86, positions:['RW','LM'], stats:{speed:84,shooting:76,passing:78,defending:55,physical:64} },
  ],
  ST: [
    { id:'ENG-Kane', name:'凯恩', nameEn:'Harry Kane', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:90, positions:['ST'], stats:{speed:70,shooting:94,passing:82,defending:38,physical:82} },
    { id:'ENG-Rashford', name:'拉什福德', nameEn:'Marcus Rashford', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:83, positions:['LW','ST'], stats:{speed:88,shooting:78,passing:68,defending:35,physical:66} },
    { id:'ENG-Wilson', name:'威尔逊', nameEn:'Callum Wilson', nationality:'ENG', avatar:'/images/players/placeholder.png', rating:79, positions:['ST'], stats:{speed:78,shooting:80,passing:58,defending:32,physical:72} },
  ],
},

ESP: {
  GK: [
    { id:'ESP-UnaiSim', name:'乌奈·西蒙', nameEn:'Unai Simon', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:85, positions:['GK'], stats:{speed:48,shooting:20,passing:50,defending:58,physical:64} },
    { id:'ESP-Raya', name:'拉亚', nameEn:'David Raya', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:83, positions:['GK'], stats:{speed:50,shooting:18,passing:48,defending:56,physical:62} },
  ],
  CB: [
    { id:'ESP-Laporte', name:'拉波尔特', nameEn:'Aymeric Laporte', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:85, positions:['CB','LB'], stats:{speed:66,shooting:42,passing:72,defending:86,physical:78} },
    { id:'ESP-LeNormand', name:'勒诺尔芒', nameEn:'Robin Le Normand', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:83, positions:['CB'], stats:{speed:64,shooting:32,passing:64,defending:85,physical:80} },
    { id:'ESP-Vivian', name:'维维安', nameEn:'Daniel Vivian', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:80, positions:['CB'], stats:{speed:62,shooting:32,passing:62,defending:84,physical:80} },
  ],
  LB: [
    { id:'ESP-Gaya', name:'加亚', nameEn:'Jose Gaya', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:82, positions:['LB'], stats:{speed:80,shooting:42,passing:70,defending:80,physical:74} },
    { id:'ESP-Grimaldo', name:'格里马尔多', nameEn:'Alejandro Grimaldo', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:83, positions:['LB','LM'], stats:{speed:78,shooting:62,passing:80,defending:74,physical:66} },
    { id:'ESP-JordiAlba', name:'阿尔巴', nameEn:'Jordi Alba', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:84, positions:['LB','LM'], stats:{speed:86,shooting:52,passing:78,defending:78,physical:68} },
  ],
  RB: [
    { id:'ESP-PedroPorro', name:'波罗', nameEn:'Pedro Porro', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:81, positions:['RB','RM'], stats:{speed:82,shooting:55,passing:70,defending:76,physical:72} },
    { id:'ESP-NavarroJ', name:'纳瓦罗', nameEn:'Jesus Navas', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:80, positions:['RB','RW'], stats:{speed:84,shooting:58,passing:72,defending:74,physical:68} },
  ],
  CM: [
    { id:'ESP-Rodri', name:'罗德里', nameEn:'Rodri', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:89, positions:['CDM','CM'], stats:{speed:62,shooting:65,passing:84,defending:88,physical:84} },
    { id:'ESP-Pedri', name:'佩德里', nameEn:'Pedri', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:86, positions:['CM','CAM'], stats:{speed:72,shooting:58,passing:86,defending:62,physical:58} },
    { id:'ESP-Gavi', name:'加维', nameEn:'Gavi', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:84, positions:['CM','CAM'], stats:{speed:70,shooting:58,passing:82,defending:62,physical:58} },
    { id:'ESP-RuizF', name:'法比安·鲁伊斯', nameEn:'Fabian Ruiz', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:82, positions:['CM','CAM'], stats:{speed:64,shooting:68,passing:80,defending:62,physical:66} },
    { id:'ESP-Baena', name:'巴埃纳', nameEn:'Alex Baena', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:78, positions:['CM','CAM'], stats:{speed:66,shooting:65,passing:76,defending:48,physical:58} },
  ],
  CAM: [
    { id:'ESP-Asensio', name:'阿森西奥', nameEn:'Marco Asensio', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:82, positions:['RW','CAM'], stats:{speed:82,shooting:78,passing:76,defending:35,physical:58} },
    { id:'ESP-Olmo', name:'奥尔莫', nameEn:'Dani Olmo', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:84, positions:['CAM','LW'], stats:{speed:78,shooting:76,passing:78,defending:48,physical:60} },
  ],
  RW: [
    { id:'ESP-Yamal', name:'亚马尔', nameEn:'Lamine Yamal', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:86, positions:['RW','LW'], stats:{speed:90,shooting:78,passing:82,defending:32,physical:58} },
    { id:'ESP-TorresF', name:'费兰·托雷斯', nameEn:'Ferran Torres', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:82, positions:['RW','ST'], stats:{speed:84,shooting:76,passing:68,defending:38,physical:62} },
  ],
  ST: [
    { id:'ESP-Morata', name:'莫拉塔', nameEn:'Alvaro Morata', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:84, positions:['ST'], stats:{speed:78,shooting:84,passing:64,defending:32,physical:76} },
    { id:'ESP-Joselu', name:'何塞卢', nameEn:'Joselu', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:81, positions:['ST'], stats:{speed:64,shooting:82,passing:58,defending:30,physical:80} },
    { id:'ESP-MorenoG', name:'杰拉德·莫雷诺', nameEn:'Gerard Moreno', nationality:'ESP', avatar:'/images/players/placeholder.png', rating:83, positions:['ST'], stats:{speed:68,shooting:84,passing:70,defending:32,physical:76} },
  ],
},

FRA: {
  GK: [
    { id:'FRA-Lloris', name:'洛里斯', nameEn:'Hugo Lloris', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:86, positions:['GK'], stats:{speed:48,shooting:20,passing:48,defending:60,physical:66} },
    { id:'FRA-Maignan', name:'迈尼昂', nameEn:'Mike Maignan', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:86, positions:['GK'], stats:{speed:52,shooting:22,passing:52,defending:60,physical:66} },
  ],
  CB: [
    { id:'FRA-Varane', name:'瓦拉内', nameEn:'Raphael Varane', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:86, positions:['CB'], stats:{speed:80,shooting:32,passing:64,defending:88,physical:80} },
    { id:'FRA-Upamecano', name:'于帕梅卡诺', nameEn:'Dayot Upamecano', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:84, positions:['CB'], stats:{speed:74,shooting:38,passing:66,defending:86,physical:84} },
    { id:'FRA-Konate', name:'科纳特', nameEn:'Ibrahima Konate', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:83, positions:['CB'], stats:{speed:72,shooting:35,passing:62,defending:86,physical:82} },
    { id:'FRA-Lenglet', name:'朗格莱', nameEn:'Clement Lenglet', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:79, positions:['CB'], stats:{speed:60,shooting:32,passing:64,defending:80,physical:76} },
  ],
  LB: [
    { id:'FRA-HernandezT', name:'T·埃尔南德斯', nameEn:'Theo Hernandez', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:85, positions:['LB','LM'], stats:{speed:90,shooting:62,passing:74,defending:78,physical:76} },
    { id:'FRA-Digne', name:'迪涅', nameEn:'Lucas Digne', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:81, positions:['LB','LM'], stats:{speed:80,shooting:55,passing:72,defending:78,physical:74} },
  ],
  RB: [
    { id:'FRA-Dubois', name:'杜波依斯', nameEn:'Leo Dubois', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:77, positions:['RB'], stats:{speed:78,shooting:42,passing:66,defending:76,physical:72} },
  ],
  CDM: [
    { id:'FRA-Kante', name:'坎特', nameEn:'N\'Golo Kante', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:86, positions:['CDM','CM'], stats:{speed:76,shooting:48,passing:72,defending:90,physical:78} },
  ],
  CM: [
    { id:'FRA-Pogba', name:'博格巴', nameEn:'Paul Pogba', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:84, positions:['CM','CAM'], stats:{speed:72,shooting:78,passing:86,defending:55,physical:82} },
    { id:'FRA-ZaireEmery', name:'扎伊尔-埃梅里', nameEn:'Warren Zaire-Emery', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:78, positions:['CM','CDM'], stats:{speed:70,shooting:58,passing:74,defending:72,physical:68} },
  ],
  LW: [
    { id:'FRA-Coman', name:'科曼', nameEn:'Kingsley Coman', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:85, positions:['LW','RW'], stats:{speed:92,shooting:78,passing:72,defending:38,physical:66} },
    { id:'FRA-Mbappe', name:'姆巴佩', nameEn:'Kylian Mbappe', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:91, positions:['ST','LW'], stats:{speed:96,shooting:90,passing:78,defending:32,physical:76} },
  ],
  RW: [
    { id:'FRA-Dembele', name:'登贝莱', nameEn:'Ousmane Dembele', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:84, positions:['RW','LW'], stats:{speed:90,shooting:72,passing:76,defending:35,physical:58} },
    { id:'FRA-Olise', name:'奥利塞', nameEn:'Michael Olise', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:82, positions:['RW','CAM'], stats:{speed:80,shooting:72,passing:76,defending:35,physical:60} },
  ],
  ST: [
    { id:'FRA-Griezmann', name:'格列兹曼', nameEn:'Antoine Griezmann', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:87, positions:['CAM','ST'], stats:{speed:76,shooting:86,passing:84,defending:48,physical:68} },
    { id:'FRA-Benzema', name:'本泽马', nameEn:'Karim Benzema', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:88, positions:['ST'], stats:{speed:76,shooting:90,passing:82,defending:32,physical:78} },
    { id:'FRA-Giroud', name:'吉鲁', nameEn:'Olivier Giroud', nationality:'FRA', avatar:'/images/players/placeholder.png', rating:84, positions:['ST'], stats:{speed:55,shooting:86,passing:66,defending:32,physical:84} },
  ],
},

GER: {
  GK: [
    { id:'GER-Neuer', name:'诺伊尔', nameEn:'Manuel Neuer', nationality:'GER', avatar:'/images/players/placeholder.png', rating:88, positions:['GK'], stats:{speed:55,shooting:22,passing:55,defending:62,physical:68} },
    { id:'GER-TerStegen', name:'特尔斯特根', nameEn:'Marc-Andre ter Stegen', nationality:'GER', avatar:'/images/players/placeholder.png', rating:87, positions:['GK'], stats:{speed:50,shooting:20,passing:55,defending:60,physical:64} },
  ],
  CB: [
    { id:'GER-Rudiger', name:'吕迪格', nameEn:'Antonio Rudiger', nationality:'GER', avatar:'/images/players/placeholder.png', rating:85, positions:['CB','LB'], stats:{speed:78,shooting:42,passing:64,defending:88,physical:86} },
    { id:'GER-Sule', name:'聚勒', nameEn:'Niklas Sule', nationality:'GER', avatar:'/images/players/placeholder.png', rating:82, positions:['CB','RB'], stats:{speed:66,shooting:38,passing:64,defending:84,physical:86} },
    { id:'GER-Tah', name:'塔赫', nameEn:'Jonathan Tah', nationality:'GER', avatar:'/images/players/placeholder.png', rating:82, positions:['CB'], stats:{speed:64,shooting:32,passing:62,defending:85,physical:82} },
    { id:'GER-Koch', name:'克洛普曼', nameEn:'Robin Koch', nationality:'GER', avatar:'/images/players/placeholder.png', rating:77, positions:['CB','CDM'], stats:{speed:60,shooting:32,passing:60,defending:80,physical:80} },
  ],
  LB: [
    { id:'GER-Raum', name:'劳姆', nameEn:'David Raum', nationality:'GER', avatar:'/images/players/placeholder.png', rating:80, positions:['LB','LM'], stats:{speed:82,shooting:48,passing:72,defending:76,physical:72} },
    { id:'GER-Gosens', name:'戈森斯', nameEn:'Robin Gosens', nationality:'GER', avatar:'/images/players/placeholder.png', rating:81, positions:['LB','LM'], stats:{speed:84,shooting:55,passing:70,defending:78,physical:78} },
  ],
  RB: [
    { id:'GER-Kimmich', name:'基米希', nameEn:'Joshua Kimmich', nationality:'GER', avatar:'/images/players/placeholder.png', rating:87, positions:['RB','CM'], stats:{speed:72,shooting:62,passing:86,defending:82,physical:78} },
    { id:'GER-Henrichs', name:'亨里希斯', nameEn:'Benjamin Henrichs', nationality:'GER', avatar:'/images/players/placeholder.png', rating:79, positions:['RB','RM'], stats:{speed:82,shooting:48,passing:66,defending:76,physical:72} },
  ],
  CDM: [
    { id:'GER-Andrich', name:'安德里希', nameEn:'Robert Andrich', nationality:'GER', avatar:'/images/players/placeholder.png', rating:79, positions:['CDM','CM'], stats:{speed:60,shooting:55,passing:68,defending:80,physical:80} },
  ],
  CM: [
    { id:'GER-Kroos', name:'克罗斯', nameEn:'Toni Kroos', nationality:'GER', avatar:'/images/players/placeholder.png', rating:88, positions:['CM','CDM'], stats:{speed:55,shooting:72,passing:92,defending:65,physical:62} },
    { id:'GER-Goretzka', name:'戈雷茨卡', nameEn:'Leon Goretzka', nationality:'GER', avatar:'/images/players/placeholder.png', rating:85, positions:['CM','CDM'], stats:{speed:72,shooting:74,passing:78,defending:78,physical:84} },
    { id:'GER-Weigl', name:'魏格尔', nameEn:'Julian Weigl', nationality:'GER', avatar:'/images/players/placeholder.png', rating:79, positions:['CDM','CM'], stats:{speed:58,shooting:48,passing:74,defending:78,physical:72} },
  ],
  CAM: [
    { id:'GER-Musiala', name:'穆西亚拉', nameEn:'Jamal Musiala', nationality:'GER', avatar:'/images/players/placeholder.png', rating:85, positions:['CAM','LW'], stats:{speed:82,shooting:76,passing:78,defending:42,physical:62} },
    { id:'GER-Reus', name:'罗伊斯', nameEn:'Marco Reus', nationality:'GER', avatar:'/images/players/placeholder.png', rating:85, positions:['CAM','ST'], stats:{speed:84,shooting:82,passing:80,defending:42,physical:62} },
    { id:'GER-Brandt', name:'布兰特', nameEn:'Julian Brandt', nationality:'GER', avatar:'/images/players/placeholder.png', rating:81, positions:['CAM','LW'], stats:{speed:78,shooting:72,passing:78,defending:42,physical:60} },
  ],
  LW: [
    { id:'GER-Sane', name:'萨内', nameEn:'Leroy Sane', nationality:'GER', avatar:'/images/players/placeholder.png', rating:84, positions:['RW','LW'], stats:{speed:92,shooting:76,passing:74,defending:38,physical:62} },
  ],
  ST: [
    { id:'GER-Havertz', name:'哈弗茨', nameEn:'Kai Havertz', nationality:'GER', avatar:'/images/players/placeholder.png', rating:83, positions:['CAM','ST'], stats:{speed:78,shooting:78,passing:74,defending:48,physical:66} },
    { id:'GER-Gnabry', name:'格纳布里', nameEn:'Serge Gnabry', nationality:'GER', avatar:'/images/players/placeholder.png', rating:83, positions:['RW','LW'], stats:{speed:86,shooting:78,passing:70,defending:40,physical:64} },
    { id:'GER-Werner', name:'维尔纳', nameEn:'Timo Werner', nationality:'GER', avatar:'/images/players/placeholder.png', rating:81, positions:['ST','LW'], stats:{speed:90,shooting:78,passing:66,defending:32,physical:66} },
  ],
},

GHA: {
  GK: [
    { id:'GHA-AtiZigi', name:'阿蒂-齐吉', nameEn:'Lawrence Ati-Zigi', nationality:'GHA', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:44,shooting:16,passing:42,defending:54,physical:60} },
    { id:'GHA-OforiR', name:'奥福里', nameEn:'Richard Ofori', nationality:'GHA', avatar:'/images/players/placeholder.png', rating:73, positions:['GK'], stats:{speed:42,shooting:14,passing:40,defending:52,physical:58} },
  ],
  CB: [
    { id:'GHA-SalisuM', name:'萨利苏', nameEn:'Mohammed Salisu', nationality:'GHA', avatar:'/images/players/placeholder.png', rating:79, positions:['CB'], stats:{speed:66,shooting:35,passing:58,defending:84,physical:80} },
    { id:'GHA-Djiku', name:'吉库', nameEn:'Alexander Djiku', nationality:'GHA', avatar:'/images/players/placeholder.png', rating:78, positions:['CB'], stats:{speed:62,shooting:32,passing:60,defending:82,physical:80} },
    { id:'GHA-AmoahD', name:'阿莫阿', nameEn:'Daniel Amoah', nationality:'GHA', avatar:'/images/players/placeholder.png', rating:74, positions:['CB'], stats:{speed:58,shooting:30,passing:55,defending:80,physical:78} },
  ],
  LB: [
    { id:'GHA-BabaR', name:'巴巴', nameEn:'Rahman Baba', nationality:'GHA', avatar:'/images/players/placeholder.png', rating:74, positions:['LB','LM'], stats:{speed:80,shooting:42,passing:62,defending:74,physical:72} },
  ],
  RB: [
    { id:'GHA-OdoiD', name:'奥多伊', nameEn:'Denis Odoi', nationality:'GHA', avatar:'/images/players/placeholder.png', rating:73, positions:['RB','CB'], stats:{speed:74,shooting:35,passing:58,defending:76,physical:74} },
  ],
  CM: [
    { id:'GHA-Partey', name:'帕尔特伊', nameEn:'Thomas Partey', nationality:'GHA', avatar:'/images/players/placeholder.png', rating:84, positions:['CDM','CM'], stats:{speed:66,shooting:68,passing:78,defending:82,physical:82} },
    { id:'GHA-AyewJ', name:'乔丹·阿尤', nameEn:'Jordan Ayew', nationality:'GHA', avatar:'/images/players/placeholder.png', rating:78, positions:['ST','LW'], stats:{speed:76,shooting:74,passing:62,defending:35,physical:70} },
    { id:'GHA-Kudus', name:'库杜斯', nameEn:'Mohammed Kudus', nationality:'GHA', avatar:'/images/players/placeholder.png', rating:85, positions:['CAM','CM'], stats:{speed:78,shooting:76,passing:74,defending:55,physical:62} },
    { id:'GHA-Schlupp', name:'施卢普', nameEn:'Jeffrey Schlupp', nationality:'GHA', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','LM'], stats:{speed:74,shooting:65,passing:66,defending:62,physical:68} },
  ],
  LW: [
    { id:'GHA-AyewA', name:'安德烈·阿尤', nameEn:'Andre Ayew', nationality:'GHA', avatar:'/images/players/placeholder.png', rating:79, positions:['LW','ST'], stats:{speed:72,shooting:76,passing:68,defending:42,physical:66} },
    { id:'GHA-SulemanaK', name:'苏莱马纳', nameEn:'Kamaldeen Sulemana', nationality:'GHA', avatar:'/images/players/placeholder.png', rating:77, positions:['LW','RW'], stats:{speed:90,shooting:68,passing:62,defending:32,physical:55} },
  ],
  ST: [
    { id:'GHA-WilliamsI', name:'威廉姆斯', nameEn:'Inaki Williams', nationality:'GHA', avatar:'/images/players/placeholder.png', rating:83, positions:['ST','RW'], stats:{speed:88,shooting:80,passing:66,defending:38,physical:76} },
    { id:'GHA-Semenyo', name:'塞梅尼奥', nameEn:'Antoine Semenyo', nationality:'GHA', avatar:'/images/players/placeholder.png', rating:76, positions:['ST','LW'], stats:{speed:84,shooting:74,passing:58,defending:32,physical:72} },
  ],
},

IRN: {
  GK: [
    { id:'IRN-Beiranvand', name:'贝兰万德', nameEn:'Alireza Beiranvand', nationality:'IRN', avatar:'/images/players/placeholder.png', rating:78, positions:['GK'], stats:{speed:48,shooting:18,passing:44,defending:56,physical:62} },
    { id:'IRN-Abedi', name:'阿贝迪', nameEn:'Amir Abedi', nationality:'IRN', avatar:'/images/players/placeholder.png', rating:73, positions:['GK'], stats:{speed:44,shooting:16,passing:40,defending:50,physical:56} },
  ],
  CB: [
    { id:'IRN-Kanaani', name:'卡纳尼', nameEn:'Hossein Kanaani', nationality:'IRN', avatar:'/images/players/placeholder.png', rating:76, positions:['CB'], stats:{speed:58,shooting:35,passing:58,defending:80,physical:78} },
    { id:'IRN-Pouraliganji', name:'普拉利甘吉', nameEn:'Morteza Pouraliganji', nationality:'IRN', avatar:'/images/players/placeholder.png', rating:75, positions:['CB'], stats:{speed:58,shooting:32,passing:55,defending:80,physical:78} },
  ],
  LB: [
    { id:'IRN-Hajsafi', name:'哈伊萨菲', nameEn:'Ehsan Hajsafi', nationality:'IRN', avatar:'/images/players/placeholder.png', rating:74, positions:['LB','LM'], stats:{speed:72,shooting:48,passing:64,defending:74,physical:72} },
  ],
  RB: [
    { id:'IRN-MohammadiS', name:'穆罕默迪', nameEn:'Sadegh Moharrami', nationality:'IRN', avatar:'/images/players/placeholder.png', rating:73, positions:['RB'], stats:{speed:78,shooting:38,passing:58,defending:74,physical:72} },
  ],
  CM: [
    { id:'IRN-Ezatolahi', name:'埃扎托拉希', nameEn:'Saeid Ezatolahi', nationality:'IRN', avatar:'/images/players/placeholder.png', rating:76, positions:['CDM','CM'], stats:{speed:60,shooting:52,passing:66,defending:76,physical:76} },
    { id:'IRN-Gholizadeh', name:'古利扎德', nameEn:'Ali Gholizadeh', nationality:'IRN', avatar:'/images/players/placeholder.png', rating:75, positions:['CAM','RW'], stats:{speed:78,shooting:68,passing:66,defending:38,physical:55} },
  ],
  LW: [
    { id:'IRN-Jahanbakhsh', name:'贾汉巴赫什', nameEn:'Alireza Jahanbakhsh', nationality:'IRN', avatar:'/images/players/placeholder.png', rating:77, positions:['RW','LW'], stats:{speed:84,shooting:72,passing:64,defending:42,physical:62} },
    { id:'IRN-Taremi', name:'塔雷米', nameEn:'Mehdi Taremi', nationality:'IRN', avatar:'/images/players/placeholder.png', rating:83, positions:['ST','LW'], stats:{speed:78,shooting:84,passing:72,defending:38,physical:76} },
  ],
  ST: [
    { id:'IRN-Ansarifard', name:'安萨里法德', nameEn:'Karim Ansarifard', nationality:'IRN', avatar:'/images/players/placeholder.png', rating:74, positions:['ST'], stats:{speed:66,shooting:74,passing:55,defending:25,physical:72} },
  ],
},

HAI: {
  GK: [
    { id:'HAI-Placide', name:'普拉西德', nameEn:'Johny Placide', nationality:'HAI', avatar:'/images/players/placeholder.png', rating:73, positions:['GK'], stats:{speed:44,shooting:16,passing:40,defending:52,physical:58} },
  ],
  CB: [
    { id:'HAI-Ade', name:'阿德', nameEn:'Ricardo Ade', nationality:'HAI', avatar:'/images/players/placeholder.png', rating:69, positions:['CB'], stats:{speed:58,shooting:28,passing:48,defending:76,physical:74} },
    { id:'HAI-Arcus', name:'阿库斯', nameEn:'Carlens Arcus', nationality:'HAI', avatar:'/images/players/placeholder.png', rating:71, positions:['RB','CB'], stats:{speed:76,shooting:38,passing:55,defending:74,physical:72} },
  ],
  CM: [
    { id:'HAI-Alceus', name:'阿尔塞乌斯', nameEn:'Bryan Alceus', nationality:'HAI', avatar:'/images/players/placeholder.png', rating:68, positions:['CM','CDM'], stats:{speed:60,shooting:48,passing:58,defending:64,physical:66} },
    { id:'HAI-PierreL', name:'皮埃尔', nameEn:'Leverton Pierre', nationality:'HAI', avatar:'/images/players/placeholder.png', rating:67, positions:['CM','CDM'], stats:{speed:58,shooting:45,passing:55,defending:62,physical:64} },
  ],
  LW: [
    { id:'HAI-Etienne', name:'埃蒂安', nameEn:'Derrick Etienne Jr.', nationality:'HAI', avatar:'/images/players/placeholder.png', rating:72, positions:['LW','RW'], stats:{speed:84,shooting:65,passing:58,defending:32,physical:55} },
    { id:'HAI-Picault', name:'皮考特', nameEn:'Fabrice Picault', nationality:'HAI', avatar:'/images/players/placeholder.png', rating:70, positions:['LW','ST'], stats:{speed:82,shooting:62,passing:55,defending:28,physical:58} },
  ],
  ST: [
    { id:'HAI-Nazon', name:'纳宗', nameEn:'Duckens Nazon', nationality:'HAI', avatar:'/images/players/placeholder.png', rating:72, positions:['ST'], stats:{speed:76,shooting:72,passing:48,defending:25,physical:72} },
    { id:'HAI-PierrotF', name:'皮埃罗', nameEn:'Frantzdy Pierrot', nationality:'HAI', avatar:'/images/players/placeholder.png', rating:71, positions:['ST'], stats:{speed:70,shooting:70,passing:50,defending:28,physical:76} },
    { id:'HAI-Prunier', name:'普鲁尼耶', nameEn:'Mondy Prunier', nationality:'HAI', avatar:'/images/players/placeholder.png', rating:68, positions:['ST'], stats:{speed:72,shooting:66,passing:44,defending:22,physical:70} },
  ],
},

JOR: {
  GK: [
    { id:'JOR-AbuLaila', name:'阿布·莱拉', nameEn:'Muhammad Abu Laila', nationality:'JOR', avatar:'/images/players/placeholder.png', rating:72, positions:['GK'], stats:{speed:44,shooting:16,passing:40,defending:50,physical:56} },
  ],
  CB: [
    { id:'JOR-Merza', name:'米尔扎', nameEn:'Mohammad Merza', nationality:'JOR', avatar:'/images/players/placeholder.png', rating:71, positions:['CB'], stats:{speed:58,shooting:28,passing:50,defending:76,physical:74} },
    { id:'JOR-Nassib', name:'纳西布', nameEn:'Yazan Al-Nassib', nationality:'JOR', avatar:'/images/players/placeholder.png', rating:72, positions:['CB'], stats:{speed:56,shooting:30,passing:52,defending:76,physical:74} },
  ],
  CM: [
    { id:'JOR-AlMardi', name:'马尔迪', nameEn:'Mohammad Al-Mardi', nationality:'JOR', avatar:'/images/players/placeholder.png', rating:70, positions:['CM','CDM'], stats:{speed:60,shooting:48,passing:60,defending:64,physical:66} },
    { id:'JOR-AlRashdan', name:'拉什丹', nameEn:'Rashdan Al-Rashdan', nationality:'JOR', avatar:'/images/players/placeholder.png', rating:69, positions:['CM','CAM'], stats:{speed:62,shooting:52,passing:58,defending:48,physical:58} },
  ],
  LW: [
    { id:'JOR-Tamari', name:'塔马里', nameEn:'Musa Al-Taamari', nationality:'JOR', avatar:'/images/players/placeholder.png', rating:74, positions:['LW','RW'], stats:{speed:84,shooting:70,passing:60,defending:32,physical:58} },
  ],
  ST: [
    { id:'JOR-Olwan', name:'奥尔万', nameEn:'Ali Olwan', nationality:'JOR', avatar:'/images/players/placeholder.png', rating:71, positions:['ST'], stats:{speed:72,shooting:72,passing:48,defending:25,physical:70} },
    { id:'JOR-Rawabdeh', name:'拉瓦巴德', nameEn:'Ahmad Rawabdeh', nationality:'JOR', avatar:'/images/players/placeholder.png', rating:69, positions:['ST'], stats:{speed:68,shooting:68,passing:45,defending:22,physical:68} },
  ],
},

JPN: {
  GK: [
    { id:'JPN-Kawashima', name:'川岛永嗣', nameEn:'Eiji Kawashima', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:77, positions:['GK'], stats:{speed:44,shooting:18,passing:46,defending:56,physical:62} },
    { id:'JPN-Gonda', name:'权田修一', nameEn:'Shuichi Gonda', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:46,shooting:16,passing:44,defending:54,physical:60} },
  ],
  CB: [
    { id:'JPN-Tomiyasu', name:'富安健洋', nameEn:'Takehiro Tomiyasu', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:83, positions:['CB','RB'], stats:{speed:72,shooting:38,passing:66,defending:86,physical:80} },
    { id:'JPN-YoshidaM', name:'吉田麻也', nameEn:'Maya Yoshida', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:80, positions:['CB'], stats:{speed:55,shooting:42,passing:62,defending:84,physical:78} },
    { id:'JPN-Itakura', name:'板仓滉', nameEn:'Ko Itakura', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:79, positions:['CB','CDM'], stats:{speed:62,shooting:38,passing:64,defending:82,physical:78} },
  ],
  LB: [
    { id:'JPN-Nagatomo', name:'长友佑都', nameEn:'Yuto Nagatomo', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:77, positions:['LB','RB'], stats:{speed:80,shooting:48,passing:66,defending:76,physical:72} },
    { id:'JPN-Sugawara', name:'菅原由势', nameEn:'Yukinari Sugawara', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:75, positions:['RB','LB'], stats:{speed:82,shooting:42,passing:64,defending:76,physical:70} },
  ],
  CM: [
    { id:'JPN-EndoW', name:'远藤航', nameEn:'Wataru Endo', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:82, positions:['CDM','CM'], stats:{speed:58,shooting:55,passing:72,defending:84,physical:82} },
    { id:'JPN-Morita', name:'守田英正', nameEn:'Hidemasa Morita', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:78, positions:['CM','CDM'], stats:{speed:64,shooting:55,passing:72,defending:72,physical:70} },
    { id:'JPN-TanakaA', name:'田中碧', nameEn:'Ao Tanaka', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CAM'], stats:{speed:66,shooting:62,passing:70,defending:58,physical:62} },
  ],
  CAM: [
    { id:'JPN-Kamada', name:'镰田大地', nameEn:'Daichi Kamada', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:82, positions:['CAM','CM'], stats:{speed:72,shooting:76,passing:76,defending:52,physical:62} },
    { id:'JPN-KuboT', name:'久保建英', nameEn:'Takefusa Kubo', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:79, positions:['RW','CAM'], stats:{speed:82,shooting:72,passing:72,defending:38,physical:55} },
  ],
  LW: [
    { id:'JPN-ItoJ', name:'伊东纯也', nameEn:'Junya Ito', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:80, positions:['RW','LW'], stats:{speed:90,shooting:72,passing:68,defending:42,physical:58} },
  ],
  ST: [
    { id:'JPN-Furuhashi', name:'古桥亨梧', nameEn:'Kyogo Furuhashi', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:79, positions:['ST'], stats:{speed:84,shooting:78,passing:62,defending:30,physical:66} },
    { id:'JPN-Ueda', name:'上田绮世', nameEn:'Ayase Ueda', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:76, positions:['ST'], stats:{speed:80,shooting:78,passing:55,defending:28,physical:70} },
    { id:'JPN-Osako', name:'大迫勇也', nameEn:'Yuya Osako', nationality:'JPN', avatar:'/images/players/placeholder.png', rating:77, positions:['ST'], stats:{speed:66,shooting:78,passing:62,defending:32,physical:74} },
  ],
},

KOR: {
  GK: [
    { id:'KOR-KimSG', name:'金承奎', nameEn:'Kim Seung-gyu', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:78, positions:['GK'], stats:{speed:46,shooting:18,passing:44,defending:56,physical:62} },
    { id:'KOR-JoHW', name:'赵贤祐', nameEn:'Jo Hyeon-woo', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:74, positions:['GK'], stats:{speed:48,shooting:16,passing:42,defending:54,physical:58} },
  ],
  CB: [
    { id:'KOR-KimMJ', name:'金玟哉', nameEn:'Kim Min-jae', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:85, positions:['CB'], stats:{speed:74,shooting:42,passing:66,defending:88,physical:84} },
    { id:'KOR-KimYJ', name:'金英权', nameEn:'Kim Young-gwon', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:78, positions:['CB'], stats:{speed:60,shooting:35,passing:62,defending:82,physical:78} },
    { id:'KOR-KwonKU', name:'权敬原', nameEn:'Kwon Kyung-won', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:74, positions:['CB'], stats:{speed:58,shooting:30,passing:55,defending:80,physical:80} },
  ],
  LB: [
    { id:'KOR-HongC', name:'洪喆', nameEn:'Hong Chul', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:74, positions:['LB','LM'], stats:{speed:82,shooting:42,passing:64,defending:72,physical:70} },
  ],
  RB: [
    { id:'KOR-KimTH', name:'金泰焕', nameEn:'Kim Tae-hwan', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:73, positions:['RB','RM'], stats:{speed:80,shooting:42,passing:62,defending:74,physical:70} },
    { id:'KOR-LeeYJ', name:'李镕', nameEn:'Lee Yong', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:72, positions:['RB'], stats:{speed:78,shooting:35,passing:60,defending:72,physical:68} },
  ],
  CM: [
    { id:'KOR-HwangIB', name:'黄仁范', nameEn:'Hwang In-beom', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:79, positions:['CM','CDM'], stats:{speed:66,shooting:58,passing:74,defending:68,physical:66} },
    { id:'KOR-JungWY', name:'郑又荣', nameEn:'Jung Woo-young', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:76, positions:['CDM','CM'], stats:{speed:58,shooting:52,passing:66,defending:78,physical:76} },
    { id:'KOR-LeeJS', name:'李在城', nameEn:'Lee Jae-sung', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CAM'], stats:{speed:66,shooting:65,passing:70,defending:58,physical:62} },
  ],
  CAM: [
    { id:'KOR-SonHM', name:'孙兴慜', nameEn:'Son Heung-min', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:88, positions:['LW','ST'], stats:{speed:88,shooting:86,passing:78,defending:40,physical:66} },
    { id:'KOR-LeeKS', name:'李康仁', nameEn:'Lee Kang-in', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:79, positions:['RW','CAM'], stats:{speed:78,shooting:68,passing:76,defending:42,physical:58} },
  ],
  LW: [
    { id:'KOR-HwangHC', name:'黄喜灿', nameEn:'Hwang Hee-chan', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:82, positions:['LW','ST'], stats:{speed:86,shooting:80,passing:68,defending:45,physical:70} },
  ],
  ST: [
    { id:'KOR-ChoGS', name:'曹圭成', nameEn:'Cho Gue-sung', nationality:'KOR', avatar:'/images/players/placeholder.png', rating:75, positions:['ST'], stats:{speed:76,shooting:76,passing:52,defending:28,physical:78} },
  ],
},

KSA: {
  GK: [
    { id:'KSA-AlOwais', name:'奥韦斯', nameEn:'Mohammed Al-Owais', nationality:'KSA', avatar:'/images/players/placeholder.png', rating:75, positions:['GK'], stats:{speed:46,shooting:18,passing:42,defending:52,physical:58} },
    { id:'KSA-AlAqidi', name:'阿奇迪', nameEn:'Nawaf Al-Aqidi', nationality:'KSA', avatar:'/images/players/placeholder.png', rating:72, positions:['GK'], stats:{speed:44,shooting:16,passing:40,defending:50,physical:56} },
  ],
  CB: [
    { id:'KSA-AlBulayhi', name:'布莱希', nameEn:'Ali Al-Bulayhi', nationality:'KSA', avatar:'/images/players/placeholder.png', rating:77, positions:['CB'], stats:{speed:60,shooting:35,passing:58,defending:80,physical:80} },
    { id:'KSA-AlAmri', name:'阿姆里', nameEn:'Abdulelah Al-Amri', nationality:'KSA', avatar:'/images/players/placeholder.png', rating:74, positions:['CB'], stats:{speed:58,shooting:30,passing:55,defending:78,physical:78} },
    { id:'KSA-Madou', name:'马杜', nameEn:'Ayman Madou', nationality:'KSA', avatar:'/images/players/placeholder.png', rating:72, positions:['CB'], stats:{speed:56,shooting:28,passing:52,defending:76,physical:76} },
  ],
  LB: [
    { id:'KSA-Shahrani', name:'沙赫拉尼', nameEn:'Yasser Al-Shahrani', nationality:'KSA', avatar:'/images/players/placeholder.png', rating:75, positions:['LB','CB'], stats:{speed:78,shooting:42,passing:62,defending:76,physical:74} },
  ],
  RB: [
    { id:'KSA-AlGhanam', name:'加纳姆', nameEn:'Sultan Al-Ghanam', nationality:'KSA', avatar:'/images/players/placeholder.png', rating:73, positions:['RB','RM'], stats:{speed:80,shooting:42,passing:60,defending:74,physical:70} },
  ],
  CM: [
    { id:'KSA-Kanno', name:'坎诺', nameEn:'Mohamed Kanno', nationality:'KSA', avatar:'/images/players/placeholder.png', rating:77, positions:['CM','CDM'], stats:{speed:62,shooting:58,passing:68,defending:72,physical:72} },
    { id:'KSA-AlFaraj', name:'法拉杰', nameEn:'Salman Al-Faraj', nationality:'KSA', avatar:'/images/players/placeholder.png', rating:78, positions:['CM','CDM'], stats:{speed:58,shooting:62,passing:76,defending:65,physical:64} },
    { id:'KSA-AlDawsariN', name:'阿尔·道萨里', nameEn:'Nasser Al-Dawsari', nationality:'KSA', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CAM'], stats:{speed:66,shooting:65,passing:70,defending:55,physical:62} },
  ],
  LW: [
    { id:'KSA-AlDawsariS', name:'达瓦萨里', nameEn:'Salem Al-Dawsari', nationality:'KSA', avatar:'/images/players/placeholder.png', rating:80, positions:['LW','RW'], stats:{speed:84,shooting:76,passing:70,defending:38,physical:62} },
  ],
  ST: [
    { id:'KSA-AsiriF', name:'阿西里', nameEn:'Fahad Al-Muwallad', nationality:'KSA', avatar:'/images/players/placeholder.png', rating:74, positions:['ST','LW'], stats:{speed:82,shooting:72,passing:55,defending:28,physical:66} },
    { id:'KSA-AlShehri', name:'谢赫里', nameEn:'Saleh Al-Shehri', nationality:'KSA', avatar:'/images/players/placeholder.png', rating:73, positions:['ST'], stats:{speed:70,shooting:74,passing:50,defending:25,physical:72} },
  ],
},

MAR: {
  GK: [
    { id:'MAR-Bounou', name:'布努', nameEn:'Yassine Bounou', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:85, positions:['GK'], stats:{speed:50,shooting:18,passing:50,defending:58,physical:64} },
    { id:'MAR-Mohamedi', name:'穆罕默迪', nameEn:'Munir Mohamedi', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:44,shooting:16,passing:44,defending:54,physical:60} },
  ],
  CB: [
    { id:'MAR-Aguerd', name:'阿盖尔德', nameEn:'Nayef Aguerd', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:82, positions:['CB'], stats:{speed:66,shooting:38,passing:64,defending:86,physical:80} },
    { id:'MAR-Saiss', name:'赛斯', nameEn:'Romain Saiss', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:80, positions:['CB','CDM'], stats:{speed:58,shooting:42,passing:66,defending:84,physical:80} },
    { id:'MAR-Hakimi', name:'阿什拉夫', nameEn:'Achraf Hakimi', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:86, positions:['RB','RWB'], stats:{speed:90,shooting:68,passing:76,defending:80,physical:76} },
    { id:'MAR-Chafik', name:'沙菲克', nameEn:'Badr Chafik', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:74, positions:['CB','LB'], stats:{speed:62,shooting:32,passing:58,defending:78,physical:76} },
  ],
  LB: [
    { id:'MAR-Mazraoui', name:'马兹拉维', nameEn:'Noussair Mazraoui', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:80, positions:['RB','LB'], stats:{speed:80,shooting:45,passing:68,defending:78,physical:72} },
    { id:'MAR-AttiatAllah', name:'阿提亚特·阿拉', nameEn:'Yahya Attiat Allah', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:73, positions:['LB','LM'], stats:{speed:78,shooting:42,passing:62,defending:74,physical:70} },
  ],
  CM: [
    { id:'MAR-AmrabatS', name:'阿姆拉巴特', nameEn:'Sofyan Amrabat', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:82, positions:['CDM','CM'], stats:{speed:62,shooting:52,passing:72,defending:84,physical:82} },
    { id:'MAR-Ounahi', name:'乌纳希', nameEn:'Azzedine Ounahi', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:78, positions:['CM','CDM'], stats:{speed:70,shooting:55,passing:72,defending:65,physical:64} },
    { id:'MAR-ElNesyri', name:'恩-内斯里', nameEn:'Youssef En-Nesyri', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:79, positions:['ST'], stats:{speed:78,shooting:78,passing:52,defending:30,physical:76} },
  ],
  CAM: [
    { id:'MAR-Ziyech', name:'齐耶赫', nameEn:'Hakim Ziyech', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:84, positions:['RW','CAM'], stats:{speed:72,shooting:78,passing:84,defending:42,physical:58} },
    { id:'MAR-Harit', name:'哈里特', nameEn:'Amine Harit', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:79, positions:['CAM','LW'], stats:{speed:74,shooting:68,passing:74,defending:42,physical:58} },
  ],
  LW: [
    { id:'MAR-Boufal', name:'布法尔', nameEn:'Sofiane Boufal', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:78, positions:['LW','RW'], stats:{speed:84,shooting:68,passing:72,defending:35,physical:58} },
    { id:'MAR-Abde', name:'阿布德', nameEn:'Ez Abde', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:76, positions:['LW','RW'], stats:{speed:88,shooting:68,passing:62,defending:32,physical:58} },
  ],
  ST: [
    { id:'MAR-EnNesyri', name:'恩内斯里', nameEn:'Youssef En-Nesyri', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:79, positions:['ST'], stats:{speed:78,shooting:78,passing:52,defending:30,physical:76} },
    { id:'MAR-Cheddira', name:'切迪拉', nameEn:'Walid Cheddira', nationality:'MAR', avatar:'/images/players/placeholder.png', rating:73, positions:['ST'], stats:{speed:74,shooting:72,passing:48,defending:28,physical:74} },
  ],
},

MEX: {
  GK: [
    { id:'MEX-Ochoa', name:'奥乔亚', nameEn:'Guillermo Ochoa', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:82, positions:['GK'], stats:{speed:48,shooting:18,passing:46,defending:58,physical:62} },
    { id:'MEX-Talavera', name:'塔拉韦拉', nameEn:'Alfredo Talavera', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:78, positions:['GK'], stats:{speed:44,shooting:16,passing:44,defending:55,physical:60} },
  ],
  CB: [
    { id:'MEX-Moreno', name:'莫雷诺', nameEn:'Hector Moreno', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:78, positions:['CB'], stats:{speed:60,shooting:35,passing:62,defending:82,physical:78} },
    { id:'MEX-Araujo', name:'阿劳霍', nameEn:'Nestor Araujo', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:76, positions:['CB'], stats:{speed:62,shooting:32,passing:58,defending:80,physical:78} },
    { id:'MEX-Montes', name:'蒙特斯', nameEn:'Cesar Montes', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:77, positions:['CB'], stats:{speed:64,shooting:35,passing:60,defending:80,physical:76} },
  ],
  LB: [
    { id:'MEX-Gallardo', name:'加利亚多', nameEn:'Jesus Gallardo', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:76, positions:['LB','LM'], stats:{speed:80,shooting:48,passing:64,defending:76,physical:70} },
  ],
  RB: [
    { id:'MEX-SanchezJ', name:'桑切斯', nameEn:'Jorge Sanchez', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:74, positions:['RB'], stats:{speed:82,shooting:38,passing:60,defending:74,physical:70} },
    { id:'MEX-AraujoJ', name:'J·阿劳霍', nameEn:'Julian Araujo', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:73, positions:['RB','LB'], stats:{speed:78,shooting:35,passing:58,defending:74,physical:72} },
  ],
  CDM: [
    { id:'MEX-Herrera', name:'埃雷拉', nameEn:'Hector Herrera', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:80, positions:['CM','CDM'], stats:{speed:64,shooting:68,passing:76,defending:68,physical:74} },
    { id:'MEX-AlvarezE', name:'E·阿尔瓦雷斯', nameEn:'Edson Alvarez', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:79, positions:['CDM','CB'], stats:{speed:62,shooting:48,passing:64,defending:82,physical:82} },
  ],
  CM: [
    { id:'MEX-Guardado', name:'瓜尔达多', nameEn:'Andres Guardado', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:80, positions:['CM','LM'], stats:{speed:62,shooting:62,passing:76,defending:62,physical:64} },
    { id:'MEX-Chavez', name:'查韦斯', nameEn:'Luis Chavez', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CDM'], stats:{speed:66,shooting:62,passing:72,defending:62,physical:64} },
  ],
  CAM: [
    { id:'MEX-Lozano', name:'洛萨诺', nameEn:'Hirving Lozano', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:82, positions:['RW','CAM'], stats:{speed:88,shooting:78,passing:68,defending:38,physical:62} },
    { id:'MEX-Vega', name:'维加', nameEn:'Alexis Vega', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:78, positions:['LW','CAM'], stats:{speed:80,shooting:72,passing:68,defending:40,physical:60} },
  ],
  LW: [
    { id:'MEX-Antuna', name:'安图尼亚', nameEn:'Uriel Antuna', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:74, positions:['RW','LW'], stats:{speed:86,shooting:68,passing:62,defending:32,physical:55} },
  ],
  ST: [
    { id:'MEX-JimenezR', name:'希门尼斯', nameEn:'Raul Jimenez', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:82, positions:['ST'], stats:{speed:68,shooting:82,passing:66,defending:35,physical:76} },
    { id:'MEX-MartinH', name:'亨利·马丁', nameEn:'Henry Martin', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:76, positions:['ST'], stats:{speed:72,shooting:76,passing:55,defending:28,physical:74} },
    { id:'MEX-FunesMori', name:'富内斯·莫里', nameEn:'Rogelio Funes Mori', nationality:'MEX', avatar:'/images/players/placeholder.png', rating:75, positions:['ST'], stats:{speed:68,shooting:76,passing:55,defending:28,physical:70} },
  ],
},

NED: {
  GK: [
    { id:'NED-Cillessen', name:'西莱森', nameEn:'Jasper Cillessen', nationality:'NED', avatar:'/images/players/placeholder.png', rating:82, positions:['GK'], stats:{speed:46,shooting:18,passing:48,defending:56,physical:62} },
    { id:'NED-Bijlow', name:'拜洛', nameEn:'Justin Bijlow', nationality:'NED', avatar:'/images/players/placeholder.png', rating:79, positions:['GK'], stats:{speed:48,shooting:18,passing:44,defending:54,physical:60} },
  ],
  CB: [
    { id:'NED-VanDijk', name:'范迪克', nameEn:'Virgil van Dijk', nationality:'NED', avatar:'/images/players/placeholder.png', rating:88, positions:['CB'], stats:{speed:68,shooting:52,passing:72,defending:92,physical:90} },
    { id:'NED-DeLigt', name:'德利赫特', nameEn:'Matthijs de Ligt', nationality:'NED', avatar:'/images/players/placeholder.png', rating:86, positions:['CB'], stats:{speed:68,shooting:38,passing:64,defending:88,physical:84} },
    { id:'NED-Ake', name:'阿克', nameEn:'Nathan Ake', nationality:'NED', avatar:'/images/players/placeholder.png', rating:84, positions:['CB','LB'], stats:{speed:72,shooting:42,passing:68,defending:85,physical:76} },
    { id:'NED-Blind', name:'布林德', nameEn:'Daley Blind', nationality:'NED', avatar:'/images/players/placeholder.png', rating:81, positions:['CB','LB'], stats:{speed:62,shooting:48,passing:76,defending:80,physical:72} },
  ],
  LB: [
    { id:'NED-Wijndal', name:'温达尔', nameEn:'Owen Wijndal', nationality:'NED', avatar:'/images/players/placeholder.png', rating:76, positions:['LB'], stats:{speed:80,shooting:38,passing:66,defending:74,physical:70} },
    { id:'NED-VanAanholt', name:'范安霍尔特', nameEn:'Patrick van Aanholt', nationality:'NED', avatar:'/images/players/placeholder.png', rating:77, positions:['LB'], stats:{speed:84,shooting:48,passing:64,defending:74,physical:68} },
  ],
  RB: [
    { id:'NED-Dumfries', name:'邓弗里斯', nameEn:'Denzel Dumfries', nationality:'NED', avatar:'/images/players/placeholder.png', rating:81, positions:['RB','RWB'], stats:{speed:86,shooting:52,passing:68,defending:76,physical:82} },
    { id:'NED-Mazraoui', name:'马兹拉维', nameEn:'Noussair Mazraoui', nationality:'NED', avatar:'/images/players/placeholder.png', rating:80, positions:['RB','LB'], stats:{speed:80,shooting:45,passing:68,defending:78,physical:72} },
  ],
  CM: [
    { id:'NED-FrenkieDeJong', name:'F·德容', nameEn:'Frenkie de Jong', nationality:'NED', avatar:'/images/players/placeholder.png', rating:86, positions:['CM','CDM'], stats:{speed:72,shooting:62,passing:86,defending:72,physical:66} },
    { id:'NED-Gravenberch', name:'赫拉芬贝赫', nameEn:'Ryan Gravenberch', nationality:'NED', avatar:'/images/players/placeholder.png', rating:79, positions:['CM','CDM'], stats:{speed:70,shooting:58,passing:74,defending:64,physical:64} },
    { id:'NED-VanDeBeek', name:'范德贝克', nameEn:'Donny van de Beek', nationality:'NED', avatar:'/images/players/placeholder.png', rating:78, positions:['CM','CAM'], stats:{speed:68,shooting:65,passing:72,defending:58,physical:62} },
  ],
  CAM: [
    { id:'NED-Klaassen', name:'克拉森', nameEn:'Davy Klaassen', nationality:'NED', avatar:'/images/players/placeholder.png', rating:80, positions:['CAM','CM'], stats:{speed:64,shooting:72,passing:72,defending:58,physical:66} },
    { id:'NED-DejongRM', name:'德容(RM)', nameEn:'Nigel de Jong', nationality:'NED', avatar:'/images/players/placeholder.png', rating:78, positions:['RM','CM'], stats:{speed:70,shooting:60,passing:72,defending:62,physical:68} },
  ],
  LW: [
    { id:'NED-Depay', name:'德佩', nameEn:'Memphis Depay', nationality:'NED', avatar:'/images/players/placeholder.png', rating:85, positions:['ST','LW'], stats:{speed:80,shooting:84,passing:78,defending:35,physical:68} },
    { id:'NED-Gakpo', name:'加克波', nameEn:'Cody Gakpo', nationality:'NED', avatar:'/images/players/placeholder.png', rating:84, positions:['LW','ST'], stats:{speed:82,shooting:80,passing:72,defending:42,physical:68} },
  ],
  RW: [
    { id:'NED-Bergwijn', name:'贝赫韦因', nameEn:'Steven Bergwijn', nationality:'NED', avatar:'/images/players/placeholder.png', rating:80, positions:['RW','LW'], stats:{speed:88,shooting:74,passing:66,defending:35,physical:64} },
  ],
  ST: [
    { id:'NED-Malen', name:'马伦', nameEn:'Donyell Malen', nationality:'NED', avatar:'/images/players/placeholder.png', rating:80, positions:['RW','ST'], stats:{speed:86,shooting:78,passing:62,defending:35,physical:64} },
    { id:'NED-Weghorst', name:'韦格霍斯特', nameEn:'Wout Weghorst', nationality:'NED', avatar:'/images/players/placeholder.png', rating:79, positions:['ST'], stats:{speed:62,shooting:80,passing:60,defending:30,physical:86} },
    { id:'NED-Brobbey', name:'布罗比', nameEn:'Brian Brobbey', nationality:'NED', avatar:'/images/players/placeholder.png', rating:77, positions:['ST'], stats:{speed:82,shooting:76,passing:52,defending:28,physical:84} },
    { id:'NED-LuukDeJong', name:'吕克·德容', nameEn:'Luuk de Jong', nationality:'NED', avatar:'/images/players/placeholder.png', rating:79, positions:['ST'], stats:{speed:55,shooting:80,passing:55,defending:30,physical:82} },
  ],
},

COD: {
  GK: [
    { id:'COD-Bertaud', name:'贝尔托', nameEn:'Dimitry Bertaud', nationality:'COD', avatar:'/images/players/placeholder.png', rating:74, positions:['GK'], stats:{speed:46,shooting:16,passing:42,defending:52,physical:58} },
  ],
  CB: [
    { id:'COD-Mbemba', name:'姆本巴', nameEn:'Chancel Mbemba', nationality:'COD', avatar:'/images/players/placeholder.png', rating:80, positions:['CB'], stats:{speed:66,shooting:42,passing:62,defending:84,physical:82} },
    { id:'COD-Kalulu', name:'卡卢卢', nameEn:'Gedeon Kalulu', nationality:'COD', avatar:'/images/players/placeholder.png', rating:73, positions:['CB','RB'], stats:{speed:74,shooting:32,passing:55,defending:78,physical:76} },
  ],
  LB: [
    { id:'COD-Masuaku', name:'马苏亚库', nameEn:'Arthur Masuaku', nationality:'COD', avatar:'/images/players/placeholder.png', rating:76, positions:['LB','LM'], stats:{speed:82,shooting:52,passing:68,defending:74,physical:72} },
  ],
  RB: [
    { id:'COD-WanBissaka', name:'万-比萨卡', nameEn:'Aaron Wan-Bissaka', nationality:'COD', avatar:'/images/players/placeholder.png', rating:80, positions:['RB','RWB'], stats:{speed:84,shooting:35,passing:62,defending:84,physical:76} },
  ],
  CM: [
    { id:'COD-Moutoussamy', name:'穆图萨米', nameEn:'Samuel Moutoussamy', nationality:'COD', avatar:'/images/players/placeholder.png', rating:74, positions:['CM','CDM'], stats:{speed:64,shooting:55,passing:66,defending:66,physical:68} },
    { id:'COD-Kakuta', name:'卡库塔', nameEn:'Gael Kakuta', nationality:'COD', avatar:'/images/players/placeholder.png', rating:76, positions:['CAM','CM'], stats:{speed:72,shooting:68,passing:72,defending:42,physical:55} },
  ],
  LW: [
    { id:'COD-Bongonda', name:'邦贡达', nameEn:'Theo Bongonda', nationality:'COD', avatar:'/images/players/placeholder.png', rating:76, positions:['LW','RW'], stats:{speed:86,shooting:72,passing:66,defending:35,physical:58} },
  ],
  ST: [
    { id:'COD-Wissa', name:'维萨', nameEn:'Yoane Wissa', nationality:'COD', avatar:'/images/players/placeholder.png', rating:79, positions:['ST','LW'], stats:{speed:82,shooting:78,passing:62,defending:32,physical:72} },
    { id:'COD-Bakambu', name:'巴坎布', nameEn:'Cedric Bakambu', nationality:'COD', avatar:'/images/players/placeholder.png', rating:78, positions:['ST'], stats:{speed:80,shooting:80,passing:58,defending:28,physical:76} },
  ],
},

NOR: {
  GK: [
    { id:'NOR-Nyland', name:'尼兰德', nameEn:'Orjan Nyland', nationality:'NOR', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:46,shooting:18,passing:44,defending:54,physical:60} },
    { id:'NOR-HansenE', name:'汉森', nameEn:'Elias Hansen', nationality:'NOR', avatar:'/images/players/placeholder.png', rating:72, positions:['GK'], stats:{speed:44,shooting:16,passing:42,defending:52,physical:58} },
  ],
  CB: [
    { id:'NOR-Ajer', name:'阿耶尔', nameEn:'Kristoffer Ajer', nationality:'NOR', avatar:'/images/players/placeholder.png', rating:79, positions:['CB','RB'], stats:{speed:66,shooting:38,passing:64,defending:82,physical:80} },
    { id:'NOR-Ostigard', name:'厄斯蒂高', nameEn:'Leo Ostigard', nationality:'NOR', avatar:'/images/players/placeholder.png', rating:76, positions:['CB'], stats:{speed:62,shooting:32,passing:58,defending:80,physical:80} },
    { id:'NOR-Bjornbak', name:'比约恩巴克', nameEn:'Stian Bjornbak', nationality:'NOR', avatar:'/images/players/placeholder.png', rating:74, positions:['CB'], stats:{speed:58,shooting:30,passing:55,defending:80,physical:78} },
  ],
  LB: [
    { id:'NOR-Ryerson', name:'瑞尔森', nameEn:'Julian Ryerson', nationality:'NOR', avatar:'/images/players/placeholder.png', rating:77, positions:['RB','LB'], stats:{speed:82,shooting:45,passing:64,defending:78,physical:74} },
  ],
  CM: [
    { id:'NOR-Thorsby', name:'索尔茨维特', nameEn:'Morten Thorsby', nationality:'NOR', avatar:'/images/players/placeholder.png', rating:77, positions:['CM','CDM'], stats:{speed:62,shooting:55,passing:66,defending:72,physical:76} },
    { id:'NOR-Odegaard', name:'厄德高', nameEn:'Martin Odegaard', nationality:'NOR', avatar:'/images/players/placeholder.png', rating:87, positions:['CAM','CM'], stats:{speed:72,shooting:72,passing:88,defending:52,physical:58} },
    { id:'NOR-Berge', name:'贝尔格', nameEn:'Sander Berge', nationality:'NOR', avatar:'/images/players/placeholder.png', rating:80, positions:['CDM','CM'], stats:{speed:64,shooting:55,passing:72,defending:82,physical:82} },
  ],
  LW: [
    { id:'NOR-HaalandE', name:'哈兰德', nameEn:'Erling Haaland', nationality:'NOR', avatar:'/images/players/placeholder.png', rating:91, positions:['ST'], stats:{speed:90,shooting:94,passing:66,defending:42,physical:90} },
    { id:'NOR-Soroth', name:'索尔洛特', nameEn:'Alexander Sorloth', nationality:'NOR', avatar:'/images/players/placeholder.png', rating:80, positions:['ST'], stats:{speed:82,shooting:82,passing:58,defending:32,physical:82} },
    { id:'NOR-Elyounoussi', name:'埃尔尤努西', nameEn:'Mohamed Elyounoussi', nationality:'NOR', avatar:'/images/players/placeholder.png', rating:77, positions:['LW','RW'], stats:{speed:76,shooting:68,passing:66,defending:42,physical:60} },
  ],
  ST: [
    { id:'NOR-Haaland', name:'哈兰德', nameEn:'Erling Haaland', nationality:'NOR', avatar:'/images/players/placeholder.png', rating:91, positions:['ST'], stats:{speed:90,shooting:94,passing:66,defending:42,physical:90} },
    { id:'NOR-Sorloth', name:'索尔洛特', nameEn:'Alexander Sorloth', nationality:'NOR', avatar:'/images/players/placeholder.png', rating:80, positions:['ST'], stats:{speed:82,shooting:82,passing:58,defending:32,physical:82} },
  ],
},

NZL: {
  GK: [
    { id:'NZL-Marinovic', name:'马里诺维奇', nameEn:'Stefan Marinovic', nationality:'NZL', avatar:'/images/players/placeholder.png', rating:72, positions:['GK'], stats:{speed:44,shooting:16,passing:40,defending:50,physical:56} },
  ],
  CB: [
    { id:'NZL-ReidW', name:'雷德', nameEn:'Winston Reid', nationality:'NZL', avatar:'/images/players/placeholder.png', rating:75, positions:['CB'], stats:{speed:60,shooting:32,passing:58,defending:80,physical:78} },
    { id:'NZL-Boxall', name:'波克索尔', nameEn:'Michael Boxall', nationality:'NZL', avatar:'/images/players/placeholder.png', rating:73, positions:['CB'], stats:{speed:58,shooting:28,passing:52,defending:78,physical:76} },
  ],
  CM: [
    { id:'NZL-ThomasR', name:'托马斯', nameEn:'Ryan Thomas', nationality:'NZL', avatar:'/images/players/placeholder.png', rating:73, positions:['CM','CAM'], stats:{speed:62,shooting:55,passing:66,defending:55,physical:60} },
    { id:'NZL-JonesM', name:'琼斯', nameEn:'Marko Stamenic', nationality:'NZL', avatar:'/images/players/placeholder.png', rating:71, positions:['CM','CDM'], stats:{speed:60,shooting:48,passing:60,defending:64,physical:66} },
  ],
  LW: [
    { id:'NZL-Just', name:'贾斯特', nameEn:'Elijah Just', nationality:'NZL', avatar:'/images/players/placeholder.png', rating:70, positions:['LW','RW'], stats:{speed:80,shooting:62,passing:55,defending:30,physical:55} },
  ],
  ST: [
    { id:'NZL-WoodC', name:'伍德', nameEn:'Chris Wood', nationality:'NZL', avatar:'/images/players/placeholder.png', rating:80, positions:['ST'], stats:{speed:72,shooting:82,passing:58,defending:30,physical:80} },
    { id:'NZL-WaineB', name:'韦恩', nameEn:'Ben Waine', nationality:'NZL', avatar:'/images/players/placeholder.png', rating:70, positions:['ST'], stats:{speed:72,shooting:68,passing:48,defending:22,physical:68} },
  ],
},

PAN: {
  GK: [
    { id:'PAN-Meija', name:'梅希亚', nameEn:'Jose Mejia', nationality:'PAN', avatar:'/images/players/placeholder.png', rating:73, positions:['GK'], stats:{speed:44,shooting:16,passing:40,defending:52,physical:58} },
  ],
  CB: [
    { id:'PAN-EscobarF', name:'埃斯科瓦尔', nameEn:'Fidel Escobar', nationality:'PAN', avatar:'/images/players/placeholder.png', rating:73, positions:['CB'], stats:{speed:58,shooting:30,passing:55,defending:78,physical:76} },
    { id:'PAN-MurilloM', name:'穆里略', nameEn:'Michael Murillo', nationality:'PAN', avatar:'/images/players/placeholder.png', rating:74, positions:['RB','CB'], stats:{speed:78,shooting:42,passing:62,defending:76,physical:74} },
  ],
  CM: [
    { id:'PAN-Carrasquilla', name:'卡拉斯吉利亚', nameEn:'Adalberto Carrasquilla', nationality:'PAN', avatar:'/images/players/placeholder.png', rating:73, positions:['CM','CDM'], stats:{speed:62,shooting:52,passing:64,defending:64,physical:66} },
    { id:'PAN-GodoyA', name:'戈多伊', nameEn:'Anibal Godoy', nationality:'PAN', avatar:'/images/players/placeholder.png', rating:74, positions:['CM','CDM'], stats:{speed:58,shooting:52,passing:64,defending:72,physical:74} },
  ],
  LW: [
    { id:'PAN-BarcenasE', name:'巴尔塞纳斯', nameEn:'Edgar Barcenas', nationality:'PAN', avatar:'/images/players/placeholder.png', rating:73, positions:['LW','RW'], stats:{speed:80,shooting:65,passing:60,defending:32,physical:55} },
  ],
  ST: [
    { id:'PAN-FajardoJ', name:'法哈尔多', nameEn:'Jose Fajardo', nationality:'PAN', avatar:'/images/players/placeholder.png', rating:71, positions:['ST'], stats:{speed:72,shooting:70,passing:48,defending:25,physical:70} },
    { id:'PAN-IsmaelD', name:'伊斯梅尔', nameEn:'Ismael Diaz', nationality:'PAN', avatar:'/images/players/placeholder.png', rating:70, positions:['ST'], stats:{speed:74,shooting:68,passing:45,defending:22,physical:68} },
  ],
},

PAR: {
  GK: [
    { id:'PAR-FernandezR', name:'费尔南德斯', nameEn:'Roberto Fernandez', nationality:'PAR', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:44,shooting:16,passing:42,defending:54,physical:60} },
    { id:'PAR-SilvaA', name:'A·席尔瓦', nameEn:'Antony Silva', nationality:'PAR', avatar:'/images/players/placeholder.png', rating:73, positions:['GK'], stats:{speed:42,shooting:14,passing:40,defending:52,physical:58} },
  ],
  CB: [
    { id:'PAR-GomezG', name:'戈麦斯', nameEn:'Gustavo Gomez', nationality:'PAR', avatar:'/images/players/placeholder.png', rating:78, positions:['CB'], stats:{speed:58,shooting:38,passing:62,defending:82,physical:80} },
    { id:'PAR-Balbuena', name:'巴尔武埃纳', nameEn:'Fabian Balbuena', nationality:'PAR', avatar:'/images/players/placeholder.png', rating:76, positions:['CB'], stats:{speed:60,shooting:35,passing:58,defending:82,physical:80} },
    { id:'PAR-AlonsoJ', name:'阿隆索', nameEn:'Jorge Alonso', nationality:'PAR', avatar:'/images/players/placeholder.png', rating:72, positions:['CB'], stats:{speed:58,shooting:30,passing:55,defending:78,physical:76} },
  ],
  LB: [
    { id:'PAR-Arzamendia', name:'阿萨门迪亚', nameEn:'Santiago Arzamendia', nationality:'PAR', avatar:'/images/players/placeholder.png', rating:74, positions:['LB','LM'], stats:{speed:80,shooting:45,passing:64,defending:74,physical:70} },
  ],
  CM: [
    { id:'PAR-OGracias', name:'奥格拉西亚斯', nameEn:'Andres OGracias', nationality:'PAR', avatar:'/images/players/placeholder.png', rating:72, positions:['CM','CDM'], stats:{speed:62,shooting:48,passing:64,defending:70,physical:72} },
    { id:'PAR-Enciso', name:'恩西索', nameEn:'Julio Enciso', nationality:'PAR', avatar:'/images/players/placeholder.png', rating:76, positions:['CAM','ST'], stats:{speed:78,shooting:72,passing:64,defending:38,physical:62} },
  ],
  LW: [
    { id:'PAR-Almiron', name:'阿尔米隆', nameEn:'Miguel Almiron', nationality:'PAR', avatar:'/images/players/placeholder.png', rating:80, positions:['LW','CAM'], stats:{speed:86,shooting:72,passing:70,defending:48,physical:62} },
    { id:'PAR-SosaR', name:'索萨', nameEn:'Ramon Sosa', nationality:'PAR', avatar:'/images/players/placeholder.png', rating:73, positions:['LW','RW'], stats:{speed:82,shooting:65,passing:60,defending:32,physical:58} },
  ],
  ST: [
    { id:'PAR-Sanabria', name:'萨纳夫里亚', nameEn:'Antonio Sanabria', nationality:'PAR', avatar:'/images/players/placeholder.png', rating:76, positions:['ST'], stats:{speed:72,shooting:78,passing:55,defending:28,physical:72} },
    { id:'PAR-GonzalezD', name:'冈萨雷斯', nameEn:'Derlis Gonzalez', nationality:'PAR', avatar:'/images/players/placeholder.png', rating:74, positions:['ST','RW'], stats:{speed:80,shooting:74,passing:58,defending:30,physical:66} },
  ],
},

IRQ: {
  GK: [
    { id:'IRQ-HassanJ', name:'贾拉勒·哈桑', nameEn:'Jalal Hassan', nationality:'IRQ', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:46,shooting:18,passing:44,defending:54,physical:60} },
  ],
  CB: [
    { id:'IRQ-Sulaka', name:'苏拉卡', nameEn:'Rebin Sulaka', nationality:'IRQ', avatar:'/images/players/placeholder.png', rating:72, positions:['CB'], stats:{speed:58,shooting:28,passing:52,defending:78,physical:76} },
    { id:'IRQ-YahyaA', name:'叶海亚', nameEn:'Ahmed Yahya', nationality:'IRQ', avatar:'/images/players/placeholder.png', rating:71, positions:['CB'], stats:{speed:56,shooting:30,passing:50,defending:76,physical:74} },
  ],
  LB: [
    { id:'IRQ-AliHussein', name:'侯赛因·阿里', nameEn:'Hussein Ali', nationality:'IRQ', avatar:'/images/players/placeholder.png', rating:72, positions:['LB','LM'], stats:{speed:78,shooting:42,passing:58,defending:74,physical:70} },
  ],
  CM: [
    { id:'IRQ-IqbalZ', name:'齐达内·伊克巴尔', nameEn:'Zidane Iqbal', nationality:'IRQ', avatar:'/images/players/placeholder.png', rating:70, positions:['CM','CAM'], stats:{speed:64,shooting:55,passing:66,defending:52,physical:58} },
    { id:'IRQ-AlAmmari', name:'阿马里', nameEn:'Amir Al-Ammari', nationality:'IRQ', avatar:'/images/players/placeholder.png', rating:71, positions:['CM','CDM'], stats:{speed:62,shooting:50,passing:64,defending:65,physical:66} },
    { id:'IRQ-Turgunboev', name:'图尔贡博耶夫', nameEn:'Azizbek Turgunboev', nationality:'IRQ', avatar:'/images/players/placeholder.png', rating:70, positions:['CM','CDM'], stats:{speed:60,shooting:52,passing:62,defending:62,physical:64} },
  ],
  CAM: [
    { id:'IRQ-Bayesh', name:'巴耶什', nameEn:'Ibrahim Bayesh', nationality:'IRQ', avatar:'/images/players/placeholder.png', rating:74, positions:['CAM','RW'], stats:{speed:72,shooting:65,passing:68,defending:38,physical:58} },
  ],
  ST: [
    { id:'IRQ-HusseinA', name:'艾曼·侯赛因', nameEn:'Aymen Hussein', nationality:'IRQ', avatar:'/images/players/placeholder.png', rating:76, positions:['ST'], stats:{speed:72,shooting:78,passing:55,defending:28,physical:76} },
    { id:'IRQ-AlHamadi', name:'哈马迪', nameEn:'Ali Al-Hamadi', nationality:'IRQ', avatar:'/images/players/placeholder.png', rating:73, positions:['ST','LW'], stats:{speed:78,shooting:72,passing:55,defending:28,physical:70} },
    { id:'IRQ-AliMohanad', name:'穆哈纳德·阿里', nameEn:'Mohanad Ali', nationality:'IRQ', avatar:'/images/players/placeholder.png', rating:72, positions:['ST'], stats:{speed:74,shooting:72,passing:48,defending:25,physical:72} },
  ],
},

POR: {
  GK: [
    { id:'POR-Patricio', name:'帕特里西奥', nameEn:'Rui Patricio', nationality:'POR', avatar:'/images/players/placeholder.png', rating:83, positions:['GK'], stats:{speed:46,shooting:18,passing:46,defending:58,physical:64} },
    { id:'POR-DiogoCosta', name:'D·科斯塔', nameEn:'Diogo Costa', nationality:'POR', avatar:'/images/players/placeholder.png', rating:84, positions:['GK'], stats:{speed:50,shooting:20,passing:50,defending:58,physical:64} },
  ],
  CB: [
    { id:'POR-PereiraD', name:'达尼洛·佩雷拉', nameEn:'Danilo Pereira', nationality:'POR', avatar:'/images/players/placeholder.png', rating:81, positions:['CB','CDM'], stats:{speed:58,shooting:42,passing:64,defending:84,physical:84} },
    { id:'POR-Juste', name:'尤斯特', nameEn:'Jeremiah St. Juste', nationality:'POR', avatar:'/images/players/placeholder.png', rating:76, positions:['CB'], stats:{speed:74,shooting:30,passing:55,defending:78,physical:74} },
  ],
  LB: [
    { id:'POR-MendesN', name:'N·门德斯', nameEn:'Nuno Mendes', nationality:'POR', avatar:'/images/players/placeholder.png', rating:82, positions:['LB','LM'], stats:{speed:86,shooting:52,passing:66,defending:78,physical:70} },
    { id:'POR-Dalot', name:'达洛特', nameEn:'Diogo Dalot', nationality:'POR', avatar:'/images/players/placeholder.png', rating:80, positions:['RB','LB'], stats:{speed:80,shooting:52,passing:66,defending:78,physical:74} },
    { id:'POR-Guerreiro', name:'格雷罗', nameEn:'Raphael Guerreiro', nationality:'POR', avatar:'/images/players/placeholder.png', rating:83, positions:['LB','LM'], stats:{speed:78,shooting:58,passing:80,defending:74,physical:66} },
  ],
  RB: [
    { id:'POR-Semedo', name:'塞梅多', nameEn:'Nelson Semedo', nationality:'POR', avatar:'/images/players/placeholder.png', rating:79, positions:['RB'], stats:{speed:86,shooting:42,passing:66,defending:76,physical:72} },
  ],
  CDM: [
    { id:'POR-Carvalho', name:'威廉·卡瓦略', nameEn:'William Carvalho', nationality:'POR', avatar:'/images/players/placeholder.png', rating:80, positions:['CDM','CM'], stats:{speed:55,shooting:52,passing:72,defending:80,physical:82} },
    { id:'POR-Palhinha', name:'帕利尼亚', nameEn:'Joao Palhinha', nationality:'POR', avatar:'/images/players/placeholder.png', rating:84, positions:['CDM','CM'], stats:{speed:62,shooting:52,passing:68,defending:86,physical:84} },
  ],
  CM: [
    { id:'POR-Bernardo', name:'B·席尔瓦', nameEn:'Bernardo Silva', nationality:'POR', avatar:'/images/players/placeholder.png', rating:88, positions:['RW','CM'], stats:{speed:76,shooting:76,passing:86,defending:58,physical:62} },
    { id:'POR-Moutinho', name:'穆蒂尼奥', nameEn:'Joao Moutinho', nationality:'POR', avatar:'/images/players/placeholder.png', rating:83, positions:['CM','CDM'], stats:{speed:58,shooting:62,passing:84,defending:62,physical:58} },
    { id:'POR-Otavio', name:'奥塔维奥', nameEn:'Otavio', nationality:'POR', avatar:'/images/players/placeholder.png', rating:81, positions:['RW','CM'], stats:{speed:80,shooting:68,passing:74,defending:55,physical:66} },
    { id:'POR-SilvaA', name:'A·席尔瓦', nameEn:'Andre Silva', nationality:'POR', avatar:'/images/players/placeholder.png', rating:80, positions:['ST'], stats:{speed:74,shooting:80,passing:60,defending:30,physical:72} },
  ],
  CAM: [
    { id:'POR-Bruno', name:'B·费尔南德斯', nameEn:'Bruno Fernandes', nationality:'POR', avatar:'/images/players/placeholder.png', rating:87, positions:['CAM','CM'], stats:{speed:72,shooting:84,passing:88,defending:58,physical:68} },
    { id:'POR-Felix', name:'菲利克斯', nameEn:'Joao Felix', nationality:'POR', avatar:'/images/players/placeholder.png', rating:83, positions:['CAM','LW'], stats:{speed:80,shooting:76,passing:74,defending:42,physical:60} },
  ],
  LW: [
    { id:'POR-Leao', name:'莱奥', nameEn:'Rafael Leao', nationality:'POR', avatar:'/images/players/placeholder.png', rating:86, positions:['LW','ST'], stats:{speed:90,shooting:82,passing:74,defending:35,physical:68} },
    { id:'POR-JotaL', name:'若塔', nameEn:'Diogo Jota', nationality:'POR', avatar:'/images/players/placeholder.png', rating:84, positions:['ST','LW'], stats:{speed:78,shooting:82,passing:70,defending:42,physical:72} },
  ],
  ST: [
    { id:'POR-CRonaldo', name:'C罗', nameEn:'Cristiano Ronaldo', nationality:'POR', avatar:'/images/players/placeholder.png', rating:88, positions:['ST'], stats:{speed:78,shooting:92,passing:76,defending:35,physical:78} },
    { id:'POR-RamosG', name:'G·拉莫斯', nameEn:'Goncalo Ramos', nationality:'POR', avatar:'/images/players/placeholder.png', rating:82, positions:['ST'], stats:{speed:76,shooting:82,passing:64,defending:32,physical:74} },
  ],
},

QAT: {
  GK: [
    { id:'QAT-Al-Sheeb', name:'阿尔-希布', nameEn:'Saad Al Sheeb', nationality:'QAT', avatar:'/images/players/placeholder.png', rating:72, positions:['GK'], stats:{speed:44,shooting:16,passing:40,defending:50,physical:56} },
    { id:'QAT-Barsham', name:'巴尔沙姆', nameEn:'Meshaal Barsham', nationality:'QAT', avatar:'/images/players/placeholder.png', rating:74, positions:['GK'], stats:{speed:46,shooting:18,passing:42,defending:52,physical:58} },
  ],
  CB: [
    { id:'QAT-Khoukhi', name:'胡希', nameEn:'Boualem Khoukhi', nationality:'QAT', avatar:'/images/players/placeholder.png', rating:74, positions:['CB','CDM'], stats:{speed:62,shooting:38,passing:60,defending:78,physical:78} },
    { id:'QAT-HassanA', name:'哈桑', nameEn:'Abdelkarim Hassan', nationality:'QAT', avatar:'/images/players/placeholder.png', rating:74, positions:['LB','CB'], stats:{speed:78,shooting:45,passing:62,defending:76,physical:74} },
    { id:'QAT-Miguel', name:'米格尔', nameEn:'Pedro Miguel', nationality:'QAT', avatar:'/images/players/placeholder.png', rating:72, positions:['CB'], stats:{speed:60,shooting:30,passing:58,defending:76,physical:76} },
  ],
  CM: [
    { id:'QAT-Al-Haydos', name:'海多斯', nameEn:'Hassan Al-Haydos', nationality:'QAT', avatar:'/images/players/placeholder.png', rating:75, positions:['CAM','CM'], stats:{speed:66,shooting:62,passing:68,defending:42,physical:58} },
    { id:'QAT-Madibo', name:'马迪博', nameEn:'Assim Madibo', nationality:'QAT', avatar:'/images/players/placeholder.png', rating:72, positions:['CDM','CM'], stats:{speed:55,shooting:45,passing:62,defending:74,physical:74} },
  ],
  LW: [
    { id:'QAT-Afif', name:'阿费夫', nameEn:'Akram Afif', nationality:'QAT', avatar:'/images/players/placeholder.png', rating:77, positions:['LW','ST'], stats:{speed:86,shooting:74,passing:68,defending:32,physical:62} },
  ],
  ST: [
    { id:'QAT-AliA', name:'阿里', nameEn:'Almoez Ali', nationality:'QAT', avatar:'/images/players/placeholder.png', rating:76, positions:['ST'], stats:{speed:78,shooting:76,passing:55,defending:28,physical:72} },
    { id:'QAT-Muntari', name:'蒙塔里', nameEn:'Mohammed Muntari', nationality:'QAT', avatar:'/images/players/placeholder.png', rating:71, positions:['ST'], stats:{speed:72,shooting:70,passing:48,defending:25,physical:74} },
  ],
},

RSA: {
  GK: [
    { id:'RSA-WilliamsR', name:'威廉姆斯', nameEn:'Ronwen Williams', nationality:'RSA', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:46,shooting:18,passing:44,defending:54,physical:60} },
    { id:'RSA-Gosch', name:'戈施', nameEn:'Ricardo Goss', nationality:'RSA', avatar:'/images/players/placeholder.png', rating:71, positions:['GK'], stats:{speed:44,shooting:16,passing:40,defending:50,physical:56} },
  ],
  CB: [
    { id:'RSA-Mokoena', name:'莫科埃纳', nameEn:'Teboho Mokoena', nationality:'RSA', avatar:'/images/players/placeholder.png', rating:74, positions:['CB','CDM'], stats:{speed:58,shooting:42,passing:62,defending:80,physical:78} },
    { id:'RSA-DeReuck', name:'德勒克', nameEn:'Rushine De Reuck', nationality:'RSA', avatar:'/images/players/placeholder.png', rating:73, positions:['CB'], stats:{speed:60,shooting:30,passing:58,defending:78,physical:76} },
    { id:'RSA-Mbiala', name:'姆比亚拉', nameEn:'Njabulo Mbiala', nationality:'RSA', avatar:'/images/players/placeholder.png', rating:72, positions:['CB'], stats:{speed:58,shooting:28,passing:55,defending:78,physical:76} },
  ],
  LB: [
    { id:'RSA-Hlatshwayo', name:'赫拉特什瓦约', nameEn:'Thapelo Hlatshwayo', nationality:'RSA', avatar:'/images/players/placeholder.png', rating:72, positions:['LB','CB'], stats:{speed:68,shooting:32,passing:55,defending:76,physical:74} },
  ],
  RB: [
    { id:'RSA-Morena', name:'莫雷纳', nameEn:'Thapelo Morena', nationality:'RSA', avatar:'/images/players/placeholder.png', rating:73, positions:['RB','RM'], stats:{speed:80,shooting:48,passing:62,defending:72,physical:70} },
  ],
  CM: [
    { id:'RSA-Zungu', name:'宗古', nameEn:'Bongani Zungu', nationality:'RSA', avatar:'/images/players/placeholder.png', rating:74, positions:['CM','CDM'], stats:{speed:62,shooting:55,passing:66,defending:70,physical:72} },
    { id:'RSA-Mkhulise', name:'姆库利塞', nameEn:'Sipho Mkhulise', nationality:'RSA', avatar:'/images/players/placeholder.png', rating:70, positions:['CM','CAM'], stats:{speed:66,shooting:55,passing:64,defending:52,physical:60} },
  ],
  LW: [
    { id:'RSA-Tau', name:'陶', nameEn:'Percy Tau', nationality:'RSA', avatar:'/images/players/placeholder.png', rating:76, positions:['LW','RW'], stats:{speed:82,shooting:72,passing:66,defending:35,physical:60} },
    { id:'RSA-Zwane', name:'兹瓦内', nameEn:'Theo Zwane', nationality:'RSA', avatar:'/images/players/placeholder.png', rating:73, positions:['LW','RW'], stats:{speed:80,shooting:62,passing:60,defending:32,physical:58} },
  ],
  ST: [
    { id:'RSA-Lepasa', name:'莱帕萨', nameEn:'Zakhele Lepasa', nationality:'RSA', avatar:'/images/players/placeholder.png', rating:71, positions:['ST'], stats:{speed:68,shooting:70,passing:50,defending:25,physical:70} },
  ],
},

SCO: {
  GK: [
    { id:'SCO-Gunn', name:'冈恩', nameEn:'Angus Gunn', nationality:'SCO', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:44,shooting:16,passing:44,defending:54,physical:60} },
    { id:'SCO-Clark', name:'克拉克', nameEn:'Zander Clark', nationality:'SCO', avatar:'/images/players/placeholder.png', rating:72, positions:['GK'], stats:{speed:42,shooting:14,passing:40,defending:52,physical:58} },
  ],
  CB: [
    { id:'SCO-RobertsonA', name:'A·罗伯逊', nameEn:'Andy Robertson', nationality:'SCO', avatar:'/images/players/placeholder.png', rating:86, positions:['LB','LM'], stats:{speed:82,shooting:52,passing:80,defending:80,physical:72} },
    { id:'SCO-Tierney', name:'蒂尔尼', nameEn:'Kieran Tierney', nationality:'SCO', avatar:'/images/players/placeholder.png', rating:82, positions:['LB','CB'], stats:{speed:76,shooting:48,passing:72,defending:82,physical:76} },
    { id:'SCO-Hanley', name:'汉利', nameEn:'Grant Hanley', nationality:'SCO', avatar:'/images/players/placeholder.png', rating:75, positions:['CB'], stats:{speed:58,shooting:35,passing:55,defending:80,physical:80} },
    { id:'SCO-Hendry', name:'亨德利', nameEn:'Jack Hendry', nationality:'SCO', avatar:'/images/players/placeholder.png', rating:74, positions:['CB'], stats:{speed:62,shooting:32,passing:58,defending:80,physical:78} },
  ],
  CM: [
    { id:'SCO-McGinn', name:'麦金', nameEn:'John McGinn', nationality:'SCO', avatar:'/images/players/placeholder.png', rating:80, positions:['CM','CAM'], stats:{speed:68,shooting:72,passing:74,defending:68,physical:78} },
    { id:'SCO-McTominay', name:'麦克托米奈', nameEn:'Scott McTominay', nationality:'SCO', avatar:'/images/players/placeholder.png', rating:82, positions:['CM','CDM'], stats:{speed:68,shooting:72,passing:72,defending:78,physical:84} },
    { id:'SCO-Gilmour', name:'吉尔摩', nameEn:'Billy Gilmour', nationality:'SCO', avatar:'/images/players/placeholder.png', rating:77, positions:['CM','CDM'], stats:{speed:62,shooting:52,passing:74,defending:68,physical:58} },
    { id:'SCO-McGregorC', name:'麦格雷戈', nameEn:'Callum McGregor', nationality:'SCO', avatar:'/images/players/placeholder.png', rating:78, positions:['CM','CDM'], stats:{speed:64,shooting:58,passing:76,defending:65,physical:66} },
  ],
  LW: [
    { id:'SCO-Christie', name:'克里斯蒂', nameEn:'Ryan Christie', nationality:'SCO', avatar:'/images/players/placeholder.png', rating:77, positions:['CAM','LW'], stats:{speed:72,shooting:68,passing:70,defending:52,physical:62} },
    { id:'SCO-Fraser', name:'弗雷泽', nameEn:'Ryan Fraser', nationality:'SCO', avatar:'/images/players/placeholder.png', rating:78, positions:['LW','RW'], stats:{speed:86,shooting:68,passing:70,defending:38,physical:55} },
  ],
  ST: [
    { id:'SCO-AdamsC', name:'亚当斯', nameEn:'Che Adams', nationality:'SCO', avatar:'/images/players/placeholder.png', rating:76, positions:['ST','LW'], stats:{speed:78,shooting:76,passing:62,defending:30,physical:72} },
    { id:'SCO-Dykes', name:'戴克斯', nameEn:'Lyndon Dykes', nationality:'SCO', avatar:'/images/players/placeholder.png', rating:73, positions:['ST'], stats:{speed:66,shooting:72,passing:52,defending:28,physical:76} },
    { id:'SCO-Shankland', name:'尚克兰', nameEn:'Lawrence Shankland', nationality:'SCO', avatar:'/images/players/placeholder.png', rating:75, positions:['ST'], stats:{speed:62,shooting:76,passing:55,defending:28,physical:74} },
  ],
},

SEN: {
  GK: [
    { id:'SEN-MendyE', name:'E·门迪', nameEn:'Edouard Mendy', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:82, positions:['GK'], stats:{speed:48,shooting:18,passing:46,defending:56,physical:62} },
    { id:'SEN-DialloA', name:'迪亚洛', nameEn:'Alfred Diallo', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:74, positions:['GK'], stats:{speed:44,shooting:16,passing:42,defending:52,physical:58} },
  ],
  CB: [
    { id:'SEN-Koulibaly', name:'库利巴利', nameEn:'Kalidou Koulibaly', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:85, positions:['CB'], stats:{speed:72,shooting:42,passing:66,defending:88,physical:86} },
    { id:'SEN-DialloAB', name:'A·迪亚洛', nameEn:'Abdou Diallo', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:78, positions:['CB','LB'], stats:{speed:68,shooting:35,passing:62,defending:82,physical:78} },
    { id:'SEN-Niakhate', name:'尼亚卡特', nameEn:'Moussa Niakhate', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:78, positions:['CB'], stats:{speed:64,shooting:32,passing:60,defending:82,physical:80} },
  ],
  LB: [
    { id:'SEN-SarrI', name:'萨尔', nameEn:'Ismaila Sarr', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:82, positions:['RW','LW'], stats:{speed:90,shooting:74,passing:66,defending:38,physical:62} },
    { id:'SEN-CissF', name:'西斯', nameEn:'Fode Ciss', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:73, positions:['LB','LM'], stats:{speed:78,shooting:38,passing:60,defending:74,physical:70} },
  ],
  CM: [
    { id:'SEN-GueyeI', name:'盖耶', nameEn:'Idrissa Gueye', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:81, positions:['CM','CDM'], stats:{speed:68,shooting:58,passing:74,defending:80,physical:78} },
    { id:'SEN-MendyN', name:'N·门迪', nameEn:'Nampalys Mendy', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:76, positions:['CDM','CM'], stats:{speed:58,shooting:45,passing:64,defending:78,physical:76} },
    { id:'SEN-Kouyate', name:'库亚特', nameEn:'Cheikhou Kouyate', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:77, positions:['CDM','CB'], stats:{speed:62,shooting:48,passing:66,defending:80,physical:82} },
  ],
  LW: [
    { id:'SEN-ManeS', name:'马内', nameEn:'Sadio Mane', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:87, positions:['LW','ST'], stats:{speed:92,shooting:84,passing:78,defending:42,physical:74} },
    { id:'SEN-DiaN', name:'迪亚', nameEn:'Nicolas Jackson', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:80, positions:['ST','LW'], stats:{speed:86,shooting:78,passing:62,defending:30,physical:68} },
  ],
  ST: [
    { id:'SEN-Diouf', name:'迪乌夫', nameEn:'Mame Diouf', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:76, positions:['ST'], stats:{speed:78,shooting:76,passing:55,defending:28,physical:74} },
    { id:'SEN-Ndiaye', name:'恩迪亚耶', nameEn:'Iliman Ndiaye', nationality:'SEN', avatar:'/images/players/placeholder.png', rating:77, positions:['ST','CAM'], stats:{speed:82,shooting:74,passing:64,defending:38,physical:64} },
  ],
},

SUI: {
  GK: [
    { id:'SUI-Sommer', name:'索默', nameEn:'Yann Sommer', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:85, positions:['GK'], stats:{speed:48,shooting:20,passing:50,defending:58,physical:64} },
    { id:'SUI-Kobel', name:'科贝尔', nameEn:'Gregor Kobel', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:84, positions:['GK'], stats:{speed:50,shooting:20,passing:48,defending:58,physical:62} },
  ],
  CB: [
    { id:'SUI-Akanji', name:'阿坎吉', nameEn:'Manuel Akanji', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:84, positions:['CB','RB'], stats:{speed:72,shooting:42,passing:66,defending:86,physical:80} },
    { id:'SUI-Elvedi', name:'埃尔维迪', nameEn:'Nico Elvedi', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:80, positions:['CB','RB'], stats:{speed:68,shooting:38,passing:64,defending:84,physical:78} },
    { id:'SUI-Schar', name:'舍尔', nameEn:'Fabian Schar', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:80, positions:['CB'], stats:{speed:64,shooting:58,passing:66,defending:84,physical:80} },
    { id:'SUI-RodriguezR', name:'R·罗德里格斯', nameEn:'Ricardo Rodriguez', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:79, positions:['LB','CB'], stats:{speed:66,shooting:52,passing:70,defending:78,physical:72} },
  ],
  LB: [
    { id:'SUI-GarciaU', name:'加西亚', nameEn:'Ulisses Garcia', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:74, positions:['LB','LM'], stats:{speed:78,shooting:38,passing:62,defending:74,physical:70} },
  ],
  RB: [
    { id:'SUI-Mbabu', name:'姆巴布', nameEn:'Kevin Mbabu', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:76, positions:['RB','RM'], stats:{speed:84,shooting:45,passing:62,defending:76,physical:72} },
  ],
  CM: [
    { id:'SUI-XhakaG', name:'扎卡', nameEn:'Granit Xhaka', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:84, positions:['CM','CDM'], stats:{speed:62,shooting:65,passing:80,defending:82,physical:84} },
    { id:'SUI-Freuler', name:'弗罗伊勒', nameEn:'Remo Freuler', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:80, positions:['CM','CDM'], stats:{speed:64,shooting:62,passing:74,defending:74,physical:74} },
    { id:'SUI-Zakaria', name:'扎卡里亚', nameEn:'Denis Zakaria', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:80, positions:['CDM','CM'], stats:{speed:66,shooting:55,passing:68,defending:82,physical:80} },
    { id:'SUI-Sow', name:'索乌', nameEn:'Djibril Sow', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:77, positions:['CM','CDM'], stats:{speed:68,shooting:55,passing:70,defending:68,physical:66} },
  ],
  CAM: [
    { id:'SUI-Shaqiri', name:'沙奇里', nameEn:'Xherdan Shaqiri', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:82, positions:['RW','CAM'], stats:{speed:80,shooting:76,passing:78,defending:35,physical:58} },
    { id:'SUI-Okafor', name:'奥卡福', nameEn:'Noah Okafor', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:77, positions:['LW','ST'], stats:{speed:86,shooting:76,passing:60,defending:35,physical:62} },
  ],
  LW: [
    { id:'SUI-VargasR', name:'巴尔加斯', nameEn:'Ruben Vargas', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:76, positions:['LW','RW'], stats:{speed:82,shooting:68,passing:64,defending:38,physical:58} },
  ],
  ST: [
    { id:'SUI-Embolo', name:'恩博洛', nameEn:'Breel Embolo', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:82, positions:['ST','LW'], stats:{speed:82,shooting:80,passing:66,defending:35,physical:76} },
    { id:'SUI-Seferovic', name:'塞费罗维奇', nameEn:'Haris Seferovic', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:77, positions:['ST'], stats:{speed:68,shooting:78,passing:58,defending:30,physical:72} },
    { id:'SUI-Zeqiri', name:'泽奇里', nameEn:'Andi Zeqiri', nationality:'SUI', avatar:'/images/players/placeholder.png', rating:72, positions:['ST'], stats:{speed:74,shooting:72,passing:50,defending:28,physical:70} },
  ],
},

SWE: {
  GK: [
    { id:'SWE-OlsenR', name:'奥尔森', nameEn:'Robin Olsen', nationality:'SWE', avatar:'/images/players/placeholder.png', rating:80, positions:['GK'], stats:{speed:46,shooting:18,passing:46,defending:56,physical:62} },
    { id:'SWE-JohnssonK', name:'约翰松', nameEn:'Karl-Johan Johnsson', nationality:'SWE', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:44,shooting:16,passing:44,defending:54,physical:60} },
  ],
  CB: [
    { id:'SWE-Lindelof', name:'林德洛夫', nameEn:'Victor Lindelof', nationality:'SWE', avatar:'/images/players/placeholder.png', rating:82, positions:['CB','RB'], stats:{speed:64,shooting:42,passing:68,defending:84,physical:78} },
    { id:'SWE-Bjare', name:'布亚尔塞', nameEn:'Ludwig Bjare', nationality:'SWE', avatar:'/images/players/placeholder.png', rating:75, positions:['CB'], stats:{speed:58,shooting:30,passing:55,defending:80,physical:78} },
  ],
  LB: [
    { id:'SWE-Augustinsson', name:'奥古斯丁松', nameEn:'Ludwig Augustinsson', nationality:'SWE', avatar:'/images/players/placeholder.png', rating:76, positions:['LB','LM'], stats:{speed:78,shooting:48,passing:68,defending:76,physical:72} },
  ],
  RB: [
    { id:'SWE-Lustig', name:'卢斯蒂格', nameEn:'Mikael Lustig', nationality:'SWE', avatar:'/images/players/placeholder.png', rating:75, positions:['RB','CB'], stats:{speed:72,shooting:42,passing:60,defending:78,physical:76} },
  ],
  CM: [
    { id:'SWE-Ekberg', name:'埃克伯格', nameEn:'Albin Ekdal', nationality:'SWE', avatar:'/images/players/placeholder.png', rating:78, positions:['CM','CDM'], stats:{speed:62,shooting:58,passing:70,defending:72,physical:72} },
    { id:'SWE-Forsberg', name:'福斯贝里', nameEn:'Emil Forsberg', nationality:'SWE', avatar:'/images/players/placeholder.png', rating:82, positions:['CAM','LW'], stats:{speed:72,shooting:76,passing:80,defending:48,physical:62} },
    { id:'SWE-OlssonK', name:'奥尔松', nameEn:'Kristoffer Olsson', nationality:'SWE', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CDM'], stats:{speed:64,shooting:52,passing:72,defending:68,physical:64} },
    { id:'SWE-Svaborg', name:'斯万贝里', nameEn:'Mattias Svanberg', nationality:'SWE', avatar:'/images/players/placeholder.png', rating:75, positions:['CM','CAM'], stats:{speed:66,shooting:62,passing:68,defending:58,physical:62} },
  ],
  LW: [
    { id:'SWE-Kulusevski', name:'库卢塞夫斯基', nameEn:'Dejan Kulusevski', nationality:'SWE', avatar:'/images/players/placeholder.png', rating:84, positions:['RW','CAM'], stats:{speed:78,shooting:74,passing:80,defending:42,physical:62} },
    { id:'SWE-Elanga', name:'埃兰加', nameEn:'Anthony Elanga', nationality:'SWE', avatar:'/images/players/placeholder.png', rating:77, positions:['LW','RW'], stats:{speed:88,shooting:72,passing:62,defending:35,physical:60} },
  ],
  ST: [
    { id:'SWE-Isak', name:'伊萨克', nameEn:'Alexander Isak', nationality:'SWE', avatar:'/images/players/placeholder.png', rating:85, positions:['ST','LW'], stats:{speed:84,shooting:84,passing:72,defending:35,physical:68} },
    { id:'SWE-Gyokeres', name:'约克雷斯', nameEn:'Viktor Gyokeres', nationality:'SWE', avatar:'/images/players/placeholder.png', rating:84, positions:['ST'], stats:{speed:82,shooting:82,passing:66,defending:38,physical:80} },
  ],
},

TUN: {
  GK: [
    { id:'TUN-Dahmen', name:'达赫门', nameEn:'Aymen Dahmen', nationality:'TUN', avatar:'/images/players/placeholder.png', rating:76, positions:['GK'], stats:{speed:44,shooting:16,passing:42,defending:54,physical:60} },
    { id:'TUN-Mathlouthi', name:'马特卢蒂', nameEn:'Aymen Mathlouthi', nationality:'TUN', avatar:'/images/players/placeholder.png', rating:73, positions:['GK'], stats:{speed:42,shooting:14,passing:40,defending:52,physical:58} },
  ],
  CB: [
    { id:'TUN-TalbiM', name:'塔尔比', nameEn:'Montassar Talbi', nationality:'TUN', avatar:'/images/players/placeholder.png', rating:76, positions:['CB'], stats:{speed:60,shooting:32,passing:58,defending:80,physical:78} },
    { id:'TUN-Bronn', name:'布朗', nameEn:'Dylan Bronn', nationality:'TUN', avatar:'/images/players/placeholder.png', rating:74, positions:['CB','RB'], stats:{speed:66,shooting:35,passing:58,defending:78,physical:76} },
  ],
  CM: [
    { id:'TUN-Skhiri', name:'斯希里', nameEn:'Ellyes Skhiri', nationality:'TUN', avatar:'/images/players/placeholder.png', rating:80, positions:['CDM','CM'], stats:{speed:62,shooting:55,passing:70,defending:82,physical:78} },
    { id:'TUN-Laidouni', name:'莱杜尼', nameEn:'Aissa Laidouni', nationality:'TUN', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CDM'], stats:{speed:64,shooting:55,passing:66,defending:72,physical:72} },
    { id:'TUN-RafiaK', name:'拉菲亚', nameEn:'Kamel Rafia', nationality:'TUN', avatar:'/images/players/placeholder.png', rating:73, positions:['CM','CAM'], stats:{speed:64,shooting:62,passing:68,defending:52,physical:60} },
  ],
  LW: [
    { id:'TUN-Msakni', name:'姆萨克尼', nameEn:'Youssef Msakni', nationality:'TUN', avatar:'/images/players/placeholder.png', rating:78, positions:['LW','CAM'], stats:{speed:82,shooting:76,passing:68,defending:35,physical:62} },
    { id:'TUN-Slimani', name:'斯利马尼', nameEn:'Wahbi Khazri', nationality:'TUN', avatar:'/images/players/placeholder.png', rating:77, positions:['RW','LW'], stats:{speed:74,shooting:74,passing:66,defending:35,physical:60} },
  ],
  ST: [
    { id:'TUN-Khazri', name:'哈兹里', nameEn:'Wahbi Khazri', nationality:'TUN', avatar:'/images/players/placeholder.png', rating:77, positions:['CAM','ST'], stats:{speed:72,shooting:76,passing:70,defending:35,physical:62} },
    { id:'TUN-Jebali', name:'杰巴利', nameEn:'Seifeddine Jebali', nationality:'TUN', avatar:'/images/players/placeholder.png', rating:74, positions:['ST'], stats:{speed:76,shooting:74,passing:50,defending:25,physical:72} },
    { id:'TUN-Haddadi', name:'哈达迪', nameEn:'Aymen Haddadi', nationality:'TUN', avatar:'/images/players/placeholder.png', rating:72, positions:['ST'], stats:{speed:72,shooting:68,passing:48,defending:25,physical:70} },
  ],
},

TUR: {
  GK: [
    { id:'TUR-Cakir', name:'恰基尔', nameEn:'Ugurcan Cakir', nationality:'TUR', avatar:'/images/players/placeholder.png', rating:81, positions:['GK'], stats:{speed:48,shooting:18,passing:48,defending:56,physical:62} },
    { id:'TUR-Gunok', name:'居诺克', nameEn:'Mert Gunok', nationality:'TUR', avatar:'/images/players/placeholder.png', rating:77, positions:['GK'], stats:{speed:44,shooting:16,passing:44,defending:54,physical:60} },
  ],
  CB: [
    { id:'TUR-Demiral', name:'德米拉尔', nameEn:'Merih Demiral', nationality:'TUR', avatar:'/images/players/placeholder.png', rating:80, positions:['CB'], stats:{speed:66,shooting:42,passing:58,defending:84,physical:82} },
    { id:'TUR-Soyuncu', name:'瑟云聚', nameEn:'Caglar Soyuncu', nationality:'TUR', avatar:'/images/players/placeholder.png', rating:79, positions:['CB'], stats:{speed:64,shooting:38,passing:62,defending:82,physical:80} },
    { id:'TUR-Bardakci', name:'巴尔达克奇', nameEn:'Abdulkerim Bardakci', nationality:'TUR', avatar:'/images/players/placeholder.png', rating:77, positions:['CB'], stats:{speed:60,shooting:32,passing:58,defending:82,physical:80} },
  ],
  LB: [
    { id:'TUR-Kadioglu', name:'卡迪奥卢', nameEn:'Ferdi Kadioglu', nationality:'TUR', avatar:'/images/players/placeholder.png', rating:77, positions:['LB','LM'], stats:{speed:82,shooting:55,passing:68,defending:76,physical:70} },
  ],
  RB: [
    { id:'TUR-CelikZ', name:'切利克', nameEn:'Zeki Celik', nationality:'TUR', avatar:'/images/players/placeholder.png', rating:77, positions:['RB','RM'], stats:{speed:82,shooting:45,passing:64,defending:78,physical:72} },
  ],
  CM: [
    { id:'TUR-Calhanoglu', name:'恰尔汉奥卢', nameEn:'Hakan Calhanoglu', nationality:'TUR', avatar:'/images/players/placeholder.png', rating:85, positions:['CAM','CM'], stats:{speed:68,shooting:78,passing:86,defending:58,physical:62} },
    { id:'TUR-Kokcu', name:'克科库', nameEn:'Orkun Kokcu', nationality:'TUR', avatar:'/images/players/placeholder.png', rating:79, positions:['CM','CDM'], stats:{speed:64,shooting:68,passing:76,defending:62,physical:64} },
    { id:'TUR-Ozil', name:'厄齐尔', nameEn:'Mesut Ozil', nationality:'TUR', avatar:'/images/players/placeholder.png', rating:82, positions:['CAM','CM'], stats:{speed:62,shooting:65,passing:86,defending:35,physical:55} },
  ],
  CAM: [
    { id:'TUR-Unde', name:'云代尔', nameEn:'Cengiz Under', nationality:'TUR', avatar:'/images/players/placeholder.png', rating:79, positions:['RW','CAM'], stats:{speed:86,shooting:74,passing:68,defending:35,physical:55} },
    { id:'TUR-Yazici', name:'亚泽哲', nameEn:'Yusuf Yazici', nationality:'TUR', avatar:'/images/players/placeholder.png', rating:77, positions:['CAM','ST'], stats:{speed:68,shooting:74,passing:66,defending:35,physical:62} },
  ],
  LW: [
    { id:'TUR-YildirimB', name:'伊尔迪里姆', nameEn:'Burak Yildirim', nationality:'TUR', avatar:'/images/players/placeholder.png', rating:74, positions:['LW','ST'], stats:{speed:82,shooting:72,passing:58,defending:30,physical:64} },
  ],
  ST: [
    { id:'TUR-Tosun', name:'托松', nameEn:'Cenk Tosun', nationality:'TUR', avatar:'/images/players/placeholder.png', rating:78, positions:['ST'], stats:{speed:68,shooting:80,passing:58,defending:28,physical:78} },
    { id:'TUR-YilmazB', name:'伊尔马兹', nameEn:'Burak Yilmaz', nationality:'TUR', avatar:'/images/players/placeholder.png', rating:78, positions:['ST'], stats:{speed:72,shooting:82,passing:60,defending:30,physical:80} },
  ],
},

UZB: {
  GK: [
    { id:'UZB-Yusupov', name:'尤苏波夫', nameEn:'Utkir Yusupov', nationality:'UZB', avatar:'/images/players/placeholder.png', rating:75, positions:['GK'], stats:{speed:46,shooting:18,passing:44,defending:54,physical:60} },
  ],
  CB: [
    { id:'UZB-Khusanov', name:'胡萨诺夫', nameEn:'Abdukodir Khusanov', nationality:'UZB', avatar:'/images/players/placeholder.png', rating:78, positions:['CB','RB'], stats:{speed:72,shooting:32,passing:58,defending:82,physical:80} },
    { id:'UZB-Ashurmatov', name:'阿舒尔马托夫', nameEn:'Rustam Ashurmatov', nationality:'UZB', avatar:'/images/players/placeholder.png', rating:73, positions:['CB'], stats:{speed:58,shooting:30,passing:55,defending:78,physical:76} },
  ],
  RB: [
    { id:'UZB-Alijonov', name:'阿利约诺夫', nameEn:'Khojiakbar Alijonov', nationality:'UZB', avatar:'/images/players/placeholder.png', rating:72, positions:['RB','RM'], stats:{speed:80,shooting:42,passing:60,defending:74,physical:72} },
  ],
  CM: [
    { id:'UZB-Shukurov', name:'舒库罗夫', nameEn:'Otabek Shukurov', nationality:'UZB', avatar:'/images/players/placeholder.png', rating:76, positions:['CM','CDM'], stats:{speed:64,shooting:62,passing:70,defending:70,physical:72} },
    { id:'UZB-TurgunboevU', name:'图尔贡博耶夫', nameEn:'Azizbek Turgunboev', nationality:'UZB', avatar:'/images/players/placeholder.png', rating:71, positions:['CM','CDM'], stats:{speed:60,shooting:52,passing:64,defending:64,physical:66} },
  ],
  CAM: [
    { id:'UZB-Fayzullaev', name:'法伊祖拉耶夫', nameEn:'Abbosbek Fayzullaev', nationality:'UZB', avatar:'/images/players/placeholder.png', rating:74, positions:['CAM','LW'], stats:{speed:78,shooting:65,passing:70,defending:35,physical:55} },
  ],
  LW: [
    { id:'UZB-Masharipov', name:'马沙里波夫', nameEn:'Jaloliddin Masharipov', nationality:'UZB', avatar:'/images/players/placeholder.png', rating:76, positions:['LW','RW'], stats:{speed:82,shooting:72,passing:70,defending:38,physical:62} },
  ],
  ST: [
    { id:'UZB-Shomurodov', name:'绍穆罗多夫', nameEn:'Eldor Shomurodov', nationality:'UZB', avatar:'/images/players/placeholder.png', rating:77, positions:['ST'], stats:{speed:76,shooting:78,passing:60,defending:28,physical:74} },
    { id:'UZB-Abdikholikov', name:'阿布迪霍利科夫', nameEn:'Bobur Abdikholikov', nationality:'UZB', avatar:'/images/players/placeholder.png', rating:72, positions:['ST'], stats:{speed:74,shooting:74,passing:48,defending:25,physical:72} },
  ],
},

URU: {
  GK: [
    { id:'URU-Muslera', name:'穆斯莱拉', nameEn:'Fernando Muslera', nationality:'URU', avatar:'/images/players/placeholder.png', rating:82, positions:['GK'], stats:{speed:48,shooting:20,passing:48,defending:58,physical:64} },
    { id:'URU-Rochet', name:'罗切特', nameEn:'Sergio Rochet', nationality:'URU', avatar:'/images/players/placeholder.png', rating:80, positions:['GK'], stats:{speed:46,shooting:18,passing:46,defending:56,physical:62} },
  ],
  CB: [
    { id:'URU-Godin', name:'戈丁', nameEn:'Diego Godin', nationality:'URU', avatar:'/images/players/placeholder.png', rating:85, positions:['CB'], stats:{speed:58,shooting:52,passing:68,defending:90,physical:84} },
    { id:'URU-Coates', name:'科茨', nameEn:'Sebastian Coates', nationality:'URU', avatar:'/images/players/placeholder.png', rating:80, positions:['CB'], stats:{speed:62,shooting:42,passing:62,defending:86,physical:82} },
    { id:'URU-GimenezJ', name:'希门尼斯', nameEn:'Jose Maria Gimenez', nationality:'URU', avatar:'/images/players/placeholder.png', rating:84, positions:['CB'], stats:{speed:64,shooting:42,passing:64,defending:88,physical:84} },
  ],
  LB: [
    { id:'URU-OliveraM', name:'奥利韦拉', nameEn:'Maximiliano Olivera', nationality:'URU', avatar:'/images/players/placeholder.png', rating:74, positions:['LB','LM'], stats:{speed:80,shooting:45,passing:64,defending:76,physical:72} },
  ],
  RB: [
    { id:'URU-Caceres', name:'卡塞雷斯', nameEn:'Martin Caceres', nationality:'URU', avatar:'/images/players/placeholder.png', rating:78, positions:['RB','CB'], stats:{speed:72,shooting:42,passing:64,defending:80,physical:78} },
    { id:'URU-VarelaG', name:'巴雷拉', nameEn:'Guillermo Varela', nationality:'URU', avatar:'/images/players/placeholder.png', rating:75, positions:['RB','RM'], stats:{speed:80,shooting:45,passing:64,defending:76,physical:72} },
  ],
  CM: [
    { id:'URU-Bentancur', name:'本坦库尔', nameEn:'Rodrigo Bentancur', nationality:'URU', avatar:'/images/players/placeholder.png', rating:83, positions:['CM','CDM'], stats:{speed:66,shooting:65,passing:76,defending:74,physical:72} },
    { id:'URU-Vecino', name:'贝西诺', nameEn:'Matias Vecino', nationality:'URU', avatar:'/images/players/placeholder.png', rating:80, positions:['CM','CDM'], stats:{speed:62,shooting:68,passing:72,defending:72,physical:76} },
    { id:'URU-Valverde', name:'巴尔韦德', nameEn:'Federico Valverde', nationality:'URU', avatar:'/images/players/placeholder.png', rating:87, positions:['CM','CAM'], stats:{speed:82,shooting:78,passing:82,defending:72,physical:74} },
    { id:'URU-UgarteM', name:'乌加特', nameEn:'Manuel Ugarte', nationality:'URU', avatar:'/images/players/placeholder.png', rating:82, positions:['CDM','CM'], stats:{speed:62,shooting:48,passing:66,defending:86,physical:82} },
  ],
  LW: [
    { id:'URU-Pellistri', name:'佩利斯特里', nameEn:'Facundo Pellistri', nationality:'URU', avatar:'/images/players/placeholder.png', rating:77, positions:['RW','LW'], stats:{speed:84,shooting:62,passing:66,defending:38,physical:58} },
    { id:'URU-RodriguezJ', name:'罗德里格斯', nameEn:'Jonathan Rodriguez', nationality:'URU', avatar:'/images/players/placeholder.png', rating:75, positions:['ST','LW'], stats:{speed:76,shooting:74,passing:58,defending:28,physical:70} },
  ],
  ST: [
    { id:'URU-Suarez', name:'苏亚雷斯', nameEn:'Luis Suarez', nationality:'URU', avatar:'/images/players/placeholder.png', rating:87, positions:['ST'], stats:{speed:76,shooting:90,passing:80,defending:38,physical:80} },
    { id:'URU-Cavani', name:'卡瓦尼', nameEn:'Edinson Cavani', nationality:'URU', avatar:'/images/players/placeholder.png', rating:85, positions:['ST'], stats:{speed:78,shooting:88,passing:68,defending:38,physical:82} },
    { id:'URU-Nunez', name:'努涅斯', nameEn:'Darwin Nunez', nationality:'URU', avatar:'/images/players/placeholder.png', rating:84, positions:['ST','LW'], stats:{speed:88,shooting:84,passing:64,defending:32,physical:80} },
  ],
},

USA: {
  GK: [
    { id:'USA-Turner', name:'特纳', nameEn:'Matt Turner', nationality:'USA', avatar:'/images/players/placeholder.png', rating:78, positions:['GK'], stats:{speed:46,shooting:18,passing:42,defending:54,physical:60} },
    { id:'USA-Horvath', name:'霍瓦特', nameEn:'Ethan Horvath', nationality:'USA', avatar:'/images/players/placeholder.png', rating:74, positions:['GK'], stats:{speed:44,shooting:16,passing:40,defending:52,physical:58} },
  ],
  CB: [
    { id:'USA-Ream', name:'里姆', nameEn:'Tim Ream', nationality:'USA', avatar:'/images/players/placeholder.png', rating:77, positions:['CB','LB'], stats:{speed:58,shooting:30,passing:64,defending:80,physical:74} },
    { id:'USA-RobinsonM', name:'罗宾逊', nameEn:'Miles Robinson', nationality:'USA', avatar:'/images/players/placeholder.png', rating:76, positions:['CB'], stats:{speed:66,shooting:28,passing:55,defending:80,physical:78} },
    { id:'USA-Brooks', name:'布鲁克斯', nameEn:'John Brooks', nationality:'USA', avatar:'/images/players/placeholder.png', rating:77, positions:['CB'], stats:{speed:58,shooting:35,passing:62,defending:80,physical:82} },
    { id:'USA-CarterVickers', name:'卡特-维克斯', nameEn:'Cameron Carter-Vickers', nationality:'USA', avatar:'/images/players/placeholder.png', rating:75, positions:['CB'], stats:{speed:62,shooting:28,passing:55,defending:80,physical:78} },
  ],
  LB: [
    { id:'USA-RobinsonA', name:'A·罗宾逊', nameEn:'Antonee Robinson', nationality:'USA', avatar:'/images/players/placeholder.png', rating:79, positions:['LB','LM'], stats:{speed:86,shooting:42,passing:64,defending:76,physical:72} },
  ],
  RB: [
    { id:'USA-Dest', name:'德斯特', nameEn:'Sergino Dest', nationality:'USA', avatar:'/images/players/placeholder.png', rating:77, positions:['RB','LB'], stats:{speed:82,shooting:42,passing:62,defending:74,physical:66} },
    { id:'USA-Moore', name:'摩尔', nameEn:'Shaq Moore', nationality:'USA', avatar:'/images/players/placeholder.png', rating:72, positions:['RB'], stats:{speed:78,shooting:35,passing:55,defending:72,physical:70} },
  ],
  CM: [
    { id:'USA-McKennie', name:'麦肯尼', nameEn:'Weston McKennie', nationality:'USA', avatar:'/images/players/placeholder.png', rating:81, positions:['CM','CDM'], stats:{speed:70,shooting:68,passing:72,defending:72,physical:76} },
    { id:'USA-AdamsT', name:'T·亚当斯', nameEn:'Tyler Adams', nationality:'USA', avatar:'/images/players/placeholder.png', rating:80, positions:['CDM','CM'], stats:{speed:66,shooting:48,passing:70,defending:82,physical:74} },
    { id:'USA-Musah', name:'穆萨', nameEn:'Yunus Musah', nationality:'USA', avatar:'/images/players/placeholder.png', rating:77, positions:['CM','RM'], stats:{speed:74,shooting:55,passing:66,defending:64,physical:66} },
    { id:'USA-MoralesA', name:'莫拉莱斯', nameEn:'Alfredo Morales', nationality:'USA', avatar:'/images/players/placeholder.png', rating:74, positions:['CM','CDM'], stats:{speed:62,shooting:50,passing:64,defending:74,physical:74} },
  ],
  CAM: [
    { id:'USA-Pulisic', name:'普利希奇', nameEn:'Christian Pulisic', nationality:'USA', avatar:'/images/players/placeholder.png', rating:84, positions:['LW','CAM'], stats:{speed:82,shooting:78,passing:74,defending:42,physical:58} },
    { id:'USA-AaronsonLM', name:'阿伦森', nameEn:'Brenden Aaronson', nationality:'USA', avatar:'/images/players/placeholder.png', rating:75, positions:['CAM','LM'], stats:{speed:78,shooting:62,passing:70,defending:48,physical:55} },
  ],
  LW: [
    { id:'USA-Weah', name:'维阿', nameEn:'Tim Weah', nationality:'USA', avatar:'/images/players/placeholder.png', rating:76, positions:['RW','LW'], stats:{speed:86,shooting:68,passing:62,defending:38,physical:58} },
  ],
  ST: [
    { id:'USA-BalogunF', name:'巴洛贡', nameEn:'Folarin Balogun', nationality:'USA', avatar:'/images/players/placeholder.png', rating:77, positions:['ST'], stats:{speed:80,shooting:76,passing:60,defending:28,physical:68} },
    { id:'USA-Sargent', name:'萨金特', nameEn:'Josh Sargent', nationality:'USA', avatar:'/images/players/placeholder.png', rating:75, positions:['ST'], stats:{speed:78,shooting:74,passing:55,defending:28,physical:72} },
    { id:'USA-Ferreira', name:'费雷拉', nameEn:'Jesus Ferreira', nationality:'USA', avatar:'/images/players/placeholder.png', rating:75, positions:['ST','CAM'], stats:{speed:72,shooting:74,passing:62,defending:30,physical:64} },
    { id:'USA-Wright', name:'赖特', nameEn:'Haji Wright', nationality:'USA', avatar:'/images/players/placeholder.png', rating:74, positions:['ST'], stats:{speed:76,shooting:72,passing:55,defending:28,physical:70} },
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
