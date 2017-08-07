/** @module loadImg */

//start:Stat类
	/**
	 * 加载状态
	 * @class
	 * @param {Object} opts - 参数
	 *		@param {String} opts.url - 图片地址
	 *		@param {Function} [opts.onLoad] - 加载成功的回调
	 *		@param {Function} [opts.onError] - 加载失败的回调
	 *		@param {Function} [opts.onTimeout] - 加载超时的回调
	 *		@param {Function} [opts.onComplete] - 加载完成的回调（该回调会在onLoad、onError或onTimeout后执行）
	 */
var Stat = function(opts){
		var that = this;
		that.url = opts.url;
		that.loading = false; //是否正在加载
		that.loaded = null; //图片是否加载成功（在加载过程中为null）
		that.errored = null; //图片是否加载失败（在加载过程中为null）
		that.timeouted = null; //图片是否加载超时（在加载过程中为null）
		that.completed = false; //图片是否加载完成

		that.img = new Image(); //image对象
		that.onLoads = []; //加载成功的回调组成的数组
		that.onErrors = []; //加载失败的回调组成的数组
		that.onTimeouts = []; //加载超时的回调组成的数组
		that.onCompletes = []; //加载完成的回调组成的数组
		that.loadHandler = null; //加载成功的处理函数
		that.failHandler = null; //加载失败的处理函数

		that.reload(opts);
	};
Stat.prototype = {

	/**
	 * 重新加载
	 * @param {Object} opts - 参数
	 *		@param {Function} [opts.onLoad] - 加载成功的回调
	 *		@param {Function} [opts.onError] - 加载失败的回调
	 *		@param {Function} [opts.onTimeout] - 加载超时的回调
	 *		@param {Function} [opts.onComplete] - 加载完成的回调（该回调会在onLoad、onError或onTimeout后执行）
	 */
	reload : function(opts){
		var that = this,
			img = that.img,
			beforeCompleteHandler = function(){
				that.loading = false;
				that.timeouted = false;
				that.completed = true;
			},
			loadHandler = function(){
				beforeCompleteHandler();
				that.loaded = true;
				that.errored = false;
				that.onLoads.forEach(function(onLoad){
					onLoad.call(that,that);
				});
				completeHandler();
			},
			failHandler = function(){
				beforeCompleteHandler();
				that.loaded = false;
				that.errored = true;
				that.onErrors.forEach(function(onError){
					onError.call(that,that);
				});
				completeHandler();
			},
			completeHandler = function(){
				that.onLoads = [];
				that.onErrors = [];
				that.onTimeouts = [];
				that.onCompletes.forEach(function(onComplete){
					onComplete.call(that,that);
				});
				that.onCompletes = [];
				img.removeEventListener('load',loadHandler,false);
				img.removeEventListener('error',failHandler,false);
				that.loadHandler = null;
				that.failHandler = null;
			};
		['onLoad','onError','onTimeout','onComplete'].forEach(function(cb){
			if(opts[cb]){
				that[cb + 's'].push(opts[cb]);
			}
		});
		that.loading = true;
		that.loaded = null;
		that.errored = null;
		that.timeouted = null;
		that.completed = false;
		that.loadHandler = loadHandler;
		that.failHandler = failHandler;
		img.addEventListener('load',loadHandler,false);
		img.addEventListener('error',failHandler,false);
		img.src = that.url;
		return that;
	},

	/**
	 * 添加回调
	 * @param {Object} opts - 参数
	 *		@param {Function} [opts.onLoad] - 加载成功的回调
	 *		@param {Function} [opts.onError] - 加载失败的回调
	 *		@param {Function} [opts.onTimeout] - 加载超时的回调
	 *		@param {Function} [opts.onComplete] - 加载完成的回调（该回调会在onLoad、onError或onTimeout后执行）
	 */
	addCb : function(opts){
		var that = this;
		if(that.loading){ //若正在加载，将回调添加到stat对象的回调中
			['onLoad','onError','onTimeout','onComplete'].forEach(function(cb){
				if(opts[cb]){
					that[cb + 's'].push(opts[cb]);
				}
			});
		}else if(that.loaded){ //若已加载成功，直接返回stat对象
			var onLoad = opts.onLoad,
				onComplete = opts.onComplete;
			setTimeout(function(){
				onLoad && onLoad.call(that,that);
				onComplete && onComplete.call(that,that);
			},0); //确保回调是异步执行的
		}else{ //若已加载失败，重新加载
			that.reload(opts);
		}
		return that;
	},

	/**
	 * 触发超时
	 */
	timeout : function(){
		var that = this;
		if(that.loading){
			that.loading = false;
			that.loaded = false;
			that.errored = false;
			that.timeouted = true;
			that.completed = true;
			that.onLoads = [];
			that.onErrors = [];
			that.onTimeouts.forEach(function(onTimeout){
				onTimeout.call(that,that);
			});
			that.onTimeouts = [];
			that.onCompletes.forEach(function(onComplete){
				onComplete.call(that,that);
			});
			that.onCompletes = [];
			that.img.removeEventListener('load',that.loadHandler,false);
			that.img.removeEventListener('error',that.failHandler,false);
			that.loadHandler = null;
			that.failHandler = null;
		}
		return that;
	}
};

/**
 * 获取stat对象
 * @param {Object} opts - 参数
 *		@param {String} opts.url - 图片地址
 *		@param {Function} [opts.onLoad] - 加载成功的回调
 *		@param {Function} [opts.onError] - 加载失败的回调
 *		@param {Function} [opts.onTimeout] - 加载超时的回调
 *		@param {Function} [opts.onComplete] - 加载完成的回调（该回调会在onLoad、onError或onTimeout后执行）
 */
Stat.get = function(opts){
	var url = opts.url,
		cache = Stat.caches[url];
	if(cache){
		cache.addCb(opts);
	}else{
		cache = Stat.caches[url] = new Stat(opts);
	}
	return cache;
};

Stat.caches = {}; //已实例化的stat对象
//end:Stat类

	/**
	 * @typedef {Object} UrlKVP
	 * @property {String} url键名 - url值
	 */

	/**
	 * @typedef {Object} StatWithId
	 * @property {String} id - stat对象的url在urls中的索引（若传入的urls参数的类型为String[]）或key（若传入的urls参数的类型为UrlKVP）
	 */

	/**
	 * @typedef {Object} ImageWithId
	 * @property {String} id - image对象的url在urls中的索引（若传入的urls参数的类型为String[]）或key（若传入的urls参数的类型为UrlKVP）
	 */

	/**
	 * @typedef {Object} StatKVP
	 * @property {module:loadImg~StatWithId} url键名 - url值对应的stat对象
	 */

	/**
	 * @typedef {Object} ImageKVP
	 * @property {module:loadImg~ImageWithId} url键名 - url值对应的image对象
	 */

	/**
	 * @typedef {Object} Overview
	 * @property {Boolean} suc - 是否全部加载成功
	 * @property {Number} progress - 当前进度
	 * @property {Number} total - 需要加载的图片总数
	 * @property {Number} loadedCount - 加载成功的图片总数
	 * @property {Number} erroredCount - 加载失败的图片总数
	 * @property {Number} timeoutedCount - 加载超时的图片总数
	 * @property {Number} completedCount - 已完成的的图片总数
	 * @property {module:loadImg~StatWithId[] | module:loadImg~StatKVP} stats - 每张图片的statWithId对象组成的数组（若传入的urls参数的类型为String[]）或statWithId对象键值对（若传入的urls参数的类型为UrlKVP）
	 * @property {module:loadImg~ImageWithId[] | module:loadImg~ImageKVP} imgs - 每张图片的imageWithId对象组成的数组（若传入的urls参数的类型为String[]）或imageWithId对象键值对（若传入的urls参数的类型为UrlKVP）
	 */

	/**
	 * @callback loadImgProgressCb
	 * @param {module:loadImg~Overview} overview - 加载概览
	 * @param {module:loadImg~StatWithId} img - 当前加载完成的图片的imageWithId对象
	 * @param {module:loadImg~StatWithId} stat - 当前加载完成的图片的statWithId对象
	 */

	/**
	 * @callback loadImgCb
	 * @param {module:loadImg~Overview} overview - 加载概览
	 */

	/**
	 * 加载图片
	 * @function
	 * @param {Object} opts - 参数
	 *		@param {String[] | module:loadImg~UrlKVP} opts.urls - 要加载的图片地址组成的数组或者url键值对
	 *		@param {Number} [opts.time = Number.POSITIVE_INFINITY] - 超时时间（单位：毫秒）
	 *		@param {module:loadImg~loadImgProgressCb} [opts.onProgress] - 加载进度改变时的回调
	 *		@param {module:loadImg~loadImgCb} [opts.onSuc] - 全部加载成功时的回调
	 *		@param {module:loadImg~loadImgCb} [opts.onFail] - 部分加载失败或超时时的回调
	 *		@param {module:loadImg~loadImgCb} [opts.onComplete] - 加载完成时的回调（该回调会在onSuc或onFail后执行）
	 */
var loadImg = function(opts){
		var urls = opts.urls,
			time = opts.time || Number.POSITIVE_INFINITY,
			onProgress = opts.onProgress,
			onSuc = opts.onSuc,
			onFail = opts.onFail,
			onComplete = opts.onComplete,
			isArr = (Array.isArray || function(obj){
				return obj instanceof Array;
			})(urls), //urls是否是数组
			stats, //每张图片的statWithId对象组成的数组或statWithId对象键值对
			imgs, //每张图片的imageWithId对象组成的数组或imageWithId对象键值对
			total, //需要加载的图片总数
			overview, //加载概览
			t,

			/**
			 * 创建stat对象
			 * @param {String} url - 要创建stat对象的url
			 * @param {String | Number} id - 要创建stat对象的url在urls中的索引（若传入的urls参数的类型为String[]）或key（若传入的urls参数的类型为UrlKVP）
			 */
			createStat = function(url,id){
				return Stat.get({
					url : url,
					onLoad : function(){
						overview.loadedCount++;
					},
					onError : function(){
						overview.erroredCount++;
					},
					onTimeout : function(){
						overview.timeoutedCount++;
					},
					onComplete : function(){
						overview.progress = ++overview.completedCount / total;
						onProgress && onProgress(overview,imgs[id],stats[id]);
						if(overview.completedCount >= total){
							if(overview.suc = overview.loadedCount == total){
								onSuc && onSuc(overview);
							}else{
								onFail && onFail(overview);
							}
							onComplete && onComplete(overview);
							clearTimeout(t);
						}
					}
				});
			},

			/**
			 * @callback forEachCb
			 * @param {module:loadImg~Stat} stat - 遍历的stat对象
			 */

			/**
			 * 遍历stats
			 * @param {module:loadImg~forEachCb} cb - 遍历stats的回调
			 */
			statsForEach = function(cb){
				if(isArr){
					stats.forEach(cb);
				}else{
					for(var i in stats){
						cb(stats[i]);
					}
				}
			};

		//start:创建stats、imgs和total
		var stat;
		if(isArr){
			imgs = [];
			stats = urls.map(function(url,i){
				stat = createStat(url,i);
				imgs.push({
					id : i,
					img : stat.img
				});
				return {
					id : i,
					stat : stat
				};
			});
			total = urls.length;
		}else{
			stats = {};
			imgs = {};
			total = 0;
			for(var i in urls){
				stat = createStat(urls[i],i);
				imgs[i] = {
					id : i,
					img : stat.img
				};
				stats[i] = {
					id : i,
					stat : stat
				};
				total++;
			}
		}
		//end:创建stats、imgs和total

		overview = {
			suc : false,
			progress : 0,
			total : total,
			loadedCount : 0,
			erroredCount : 0,
			timeoutedCount : 0,
			completedCount : 0,
			stats : stats,
			imgs : imgs
		};
		if(total){
			if(isFinite(time)){
				t = setTimeout(function(){
					statsForEach(function(stat){
						stat.timeout();
					});
				},time);
			}
		}else{
			onSuc && onSuc(overview);
			onComplete && onComplete(overview);
		}
	};

module.exports = loadImg;