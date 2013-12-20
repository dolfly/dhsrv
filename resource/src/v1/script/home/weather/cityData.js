/**
 * @name haoqq.weather
 * @namespace
 */
(function(namespace) {

	var CityData = {
		cityData: {
			"A 安徽": {
				capital: "H 合肥",
				cities: ["A 安庆", "B 亳州", "B 蚌埠", "C 巢湖", "C 池州", "C 滁州", "F 阜阳", "H 合肥", "H 淮北", "H 淮南", "H 黄山", "L 六安", "M 马鞍山", "S 宿州", "T 铜陵", "W 芜湖", "X 宣城"]
			},
			"A 澳门": {
				capital: "A 澳门",
				cities: ["A 澳门"]
			},
			"B 北京": {
				capital: "B 北京",
				cities: ["B 北京"]
			},
			"C 重庆": {
				capital: "C 重庆",
				cities: ["C 重庆", "F 奉节", "F 涪陵"]
			},
			"F 福建": {
				capital: "F 福州",
				cities: ["F 福州", "L 龙岩", "N 南平", "N 宁德", "P 浦城", "P 莆田", "Q 泉州", "S 三明", "X 厦门", "Z 漳州"]
			},
			"G 广东": {
				capital: "G 广州",
				cities: ["C 潮州", "D 东莞", "D 电白", "F 佛冈", "F 佛山", "G 广州", "G 高要", "H 惠州", "H 河源", "J 揭阳", "J 江门", "M 梅县", "M 梅州", "M 茂名", "N 南雄", "Q 清远", "S 汕头", "S 汕尾", "S 深圳", "S 韶关", "Y 云浮", "Y 阳江", "Z 中山", "Z 湛江", "Z 珠海", "Z 肇庆"]
			},
			"G 广西": {
				capital: "N 南宁",
				cities: ["B 北海", "B 百色", "C 崇左", "F 防城港", "G 桂林", "G 贵港", "H 河池", "H 贺州", "L 来宾", "L 柳州", "N 南宁", "Q 钦州", "W 梧州", "Y 玉林"]
			},
			"G 甘肃": {
				capital: "L 兰州",
				cities: ["B 白银", "D 定西", "G 甘南", "J 嘉峪关", "J 酒泉", "J 金昌", "L 临夏", "L 兰州", "P 平凉", "Q 庆阳", "T 天水", "W 武威", "Z 张掖"]
			},
			"G 贵州": {
				capital: "G 贵阳",
				cities: ["A 安顺", "B 毕节", "G 贵阳", "L 六盘水", "T 铜仁", "Z 遵义"]
			},
			"H 河北": {
				capital: "S 石家庄",
				cities: ["B 保定", "C 承德", "C 沧州", "H 衡水", "H 邯郸", "L 廊坊", "Q 秦皇岛", "S 石家庄", "T 唐山", "X 邢台", "Z 张家口"]
			},
			"H 河南": {
				capital: "Z 郑州",
				cities: ["A 安阳", "H 鹤壁", "J 济源", "J 焦作", "K 开封", "L 洛阳", "L 漯河", "N 南阳", "P 平顶山", "P 濮阳", "S 三门峡", "S 商丘", "X 信阳", "X 新乡", "X 许昌", "Z 周口", "Z 郑州", "Z 驻马店"]
			},
			"H 海南": {
				capital: "H 海口",
				cities: ["C 澄迈", "D 东方", "D 儋州", "D 定安", "H 海口", "L 临高", "Q 琼海", "S 三亚", "T 屯昌", "W 万宁", "W 文昌"]
			},
			"H 湖北": {
				capital: "W 武汉",
				cities: ["E 鄂州", "H 黄冈", "H 黄石", "J 荆门", "J 荆州", "M 麻城", "Q 潜江", "S 神农架", "S 十堰", "S 随州", "T 天门", "W 武汉", "X 仙桃", "X 咸宁", "X 襄阳", "X 孝感", "Y 宜昌", "Z 枣阳"]
			},
			"H 湖南": {
				capital: "C 长沙",
				cities: ["C 常德", "C 郴州", "C 长沙", "H 怀化", "H 衡阳", "L 娄底", "N 南岳", "S 桑植", "S 邵阳", "X 湘潭", "J 永州", "Y 岳阳", "Y 沅陵", "Y 益阳", "Z 张家界", "Z 株洲"]
			},
			"H 黑龙江": {
				capital: "H 哈尔滨",
				cities: ["D 大兴安岭", "D 大庆", "H 哈尔滨", "H 鹤岗", "H 黑河", "J 佳木斯", "J 鸡西", "M 漠河", "M 牡丹江", "Q 七台河", "Q 齐齐哈尔", "S 双鸭山", "S 绥化", "S 绥芬河", "Y 伊春"]
			},
			"J 吉林": {
				capital: "C 长春",
				cities: ["B 白城", "B 白山", "C 长春", "H 桦甸", "J 集安", "J 吉林", "L 辽源", "S 四平", "S 松原", "T 通化"]
			},
			"J 江苏": {
				capital: "N 南京",
				cities: ["C 常州", "D 东台", "G 赣榆", "G 高邮", "H 淮安", "L 连云港", "N 南京", "N 南通", "S 宿迁", "S 苏州", "T 泰州", "W 无锡", "X 徐州", "X 盱眙", "Y 扬州", "Y 盐城", "Z 镇江"]
			},
			"J 江西": {
				capital: "N 南昌",
				cities: ["F 抚州", "G 广昌", "G 贵溪", "G 赣州", "J 吉安", "J 九江", "J 景德镇", "L 庐山", "N 南昌", "P 萍乡", "S 上饶", "X 新余", "Y 宜春", "Y 玉山", "Y 鹰潭"]
			},
			"L 辽宁": {
				capital: "S 沈阳",
				cities: ["A 鞍山", "B 本溪", "C 朝阳", "D 丹东", "D 大连", "F 抚顺", "F 阜新", "H 葫芦岛", "J 锦州", "L 辽阳", "P 盘锦", "S 沈阳", "T 铁岭", "W 瓦房店", "Y 营口"]
			},
			"N 内蒙古": {
				capital: "H 呼和浩特",
				cities: ["B 包头", "C 赤峰", "E 鄂尔多斯", "H 呼伦贝尔", "H 呼和浩特", "T 通辽", "W 乌海"]
			},
			"N 宁夏": {
				capital: "Y 银川",
				cities: ["G 固原", "S 石嘴山", "W 吴忠", "Y 银川"]
			},
			"Q 青海": {
				capital: "X 西宁",
				cities: ["H 海东", "X 西宁"]
			},
			"S 上海": {
				capital: "S 上海",
				cities: ["S 上海"]
			},
			"S 四川": {
				capital: "C 成都",
				cities: ["B 巴中", "C 成都", "D 德阳", "D 达州", "E 峨眉山", "G 广元", "G 广安", "L 乐山", "L 泸州", "M 眉山", "M 绵阳", "N 内江", "N 南充", "P 攀枝花", "S 遂宁", "Y 宜宾", "Y 雅安", "Z 自贡", "Z 资阳"]
			},
			"S 山东": {
				capital: "J 济南",
				cities: ["B 滨州", "D 东营", "D 德州", "H 菏泽", "J 济南", "J 济宁", "L 临沂", "L 聊城", "L 莱芜", "Q 青岛", "R 日照", "T 泰安", "W 威海", "W 潍坊", "Y 烟台", "Z 枣庄", "Z 淄博"]
			},
			"S 山西": {
				capital: "T 太原",
				cities: ["C 长治", "D 大同", "J 晋中", "J 晋城", "L 临汾", "L 吕梁", "S 朔州", "T 太原", "X 忻州", "Y 运城", "Y 阳泉"]
			},
			"S 陕西": {
				capital: "X 西安",
				cities: ["A 安康", "B 宝鸡", "H 汉中", "S 商洛", "T 铜川", "W 渭南", "X 咸阳", "X 西安", "Y 延安", "Y 榆林"]
			},
			"T 台湾": {
				capital: "T 台北",
				cities: ["T 台北"]
			},
			"T 天津": {
				capital: "T 天津",
				cities: ["T 天津"]
			},
			"X 新疆": {
				capital: "W 乌鲁木齐",
				cities: ["A 阿克苏", "H 和田", "H 哈密", "K 克拉玛依", "K 喀什", "Q 奇台", "T 吐鲁番", "W 乌鲁木齐"]
			},
			"X 西藏": {
				capital: "L 拉萨",
				cities: ["A 阿里", "C 昌都", "L 拉萨", "L 林芝", "N 那曲", "R 日喀则", "S 山南"]
			},
			"X 香港": {
				capital: "X 香港",
				cities: ["X 香港"]
			},
			"Y 云南": {
				capital: "K 昆明",
				cities: ["B 保山", "K 昆明", "L 临沧", "L 丽江", "Q 曲靖", "R 瑞丽", "S 思茅", "Y 玉溪", "Z 昭通"]
			},
			"Z 浙江": {
				capital: "H 杭州",
				cities: ["D 洞头", "H 杭州", "H 湖州", "J 嘉兴", "J 金华", "L 丽水", "N 宁波", "N 宁海", "P 平湖", "Q 衢州", "S 嵊州", "S 绍兴", "T 台州", "W 温州", "Z 舟山"]
			}
		},

		/**
         * 获得省列表
         * @function 
         * @name CitySelectorModel#getProvinceList
         * @return {array} 省列表
         */
		getProvinceList: function() {
			var list = [];
			for (var k in this.cityData) {
				if (this.cityData.hasOwnProperty(k)) {
					list.push(k);
				}
			}
			return list;
		},

		/**
         * 根据省名获得城市列表
         * @function 
         * @name CitySelectorModel#getCitylistByProvince
         * @param {string} province 省名
         * @return {array} 城市列表
         */
		getCitylistByProvince: function(province) {
			var d = this.cityData[province];
			return d ? d.cities: [];
		},

		/**
        * 根据省名获得省会城市名
        * @function 
        * @name CitySelectorModel#getCapitalCity
        * @param {string} province 省名
        * @return {string} 省会城市名
        */
		getCapitalCity: function(province) {
			var data = this.cityData[province];
			return data ? data.capital.substr(2) : '';
		},

		/**
        * 根据城市获得省市index
        * @function 
        * @name CitySelectorModel#getCityIndex
        * @param {string} city 城市名 
        * @return {province:省名,cityindex:城市index}
        */
		getCityIndex: function(city, province) {

			if (!province) {

				var provinceIndex = - 1;
				var cityIndex;
				for (var province in this.cityData) {
					provinceIndex++;
					cityIndex = this.getCityIndex(city, province);
					if (cityIndex !== - 1) {
						return {
							provinceIndex: provinceIndex,
							cityIndex: cityIndex
						};
					}
				}

				return {
					provinceIndex: - 1,
					cityIndex: - 1
				};

			}
			var data = this.cityData[province];
			if (!data) {
				return - 1;
			}
			var cities = data.cities;
			var regex = new RegExp(' ' + city + '$');
			for (var i = 0; i < cities.length; ++i) {
				if (regex.test(cities[i])) {
					return i;
				}
			}

			return - 1;

		}

	};

	namespace.CityData = function(){
		return CityData;
	};

} (haoqq.namespace('city')));

