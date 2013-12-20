/**
 * 省市选择视图
 * @author ronizhang
 */
(function(namespace) {
//	var dom = haoqq.dom;
//	var $ = dom.$;

	var fillSelect = function(selectDom, options) {
		if (!selectDom || ! options) {
			return;
		}
		var i, n, innerHtml;
		innerHtml = [];
		selectDom.options.length = 0;
		for (i = 0, n = options.length; i < n; ++i) {
			var tmp = document.createElement('OPTION');
			tmp.value = tmp.text = options[i];
			selectDom.add(tmp);
		}
		//selectDom.innerHTML = innerHtml.join('');
	};

	var CityView = function(config) {

		function setCapital(province) {
			var index = model.getCityIndex(model.getCapitalCity(province), province);
			if (index !== - 1) {
				citySelect.selectedIndex = index;
			}
		}

		var config = config || {},
		provinceSelect = config.provinceSelect,//省结点
		citySelect = config.citySelect,//市结点
		model = config.model || new namespace.CityData();//数据模型
		var _this = this;

		this.getSelectedCity = function() {
			var city = citySelect.options[citySelect.selectedIndex].value;
			return city ? city.substr(2) : '';
		};

		this.getSelectedProvince = function() {
			var province = provinces.options[provinceSelect.selectedIndex].value;
			return province ? province.substr(2) : '';
		};

		this.setDefaultCity = function(city) {

			var indexes = model.getCityIndex(city);
			if (indexes.provinceIndex !== - 1) {
				provinceSelect.selectedIndex = indexes.provinceIndex;
				fillSelect(citySelect, model.getCitylistByProvince(provinceSelect.options[provinceSelect.options.selectedIndex].value));
				if (indexes.cityIndex !== - 1) {
					citySelect.selectedIndex = indexes.cityIndex;
				}
			}
		};

		(function() {
			//init
			fillSelect(provinceSelect, model.getProvinceList());//
			var province = provinceSelect.options[provinceSelect.options.selectedIndex].value;
			fillSelect(citySelect, model.getCitylistByProvince(province));
			setCapital(province);
			
			$(provinceSelect).change(function(){
				var province = provinceSelect.options[provinceSelect.options.selectedIndex].value;
				fillSelect(citySelect, model.getCitylistByProvince(province));
				setCapital(province);
			});
//			dom.addListener(provinceSelect, 'change', function() {
//				
//			});
		})();

	};
	
	namespace.CityView = CityView;

} (haoqq.namespace('city')));
