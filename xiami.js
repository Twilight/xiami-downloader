(function(d){

	// thanks to:
	// http://www.blackglory.me/xiami-online-audition-download-obtain-high-quality-principle/
	// http://www.blackglory.me/node-js-xiami-high-quality-mp3-download-batch-script-third-edition/
	function getLocation(param1) {
		try {
			var _loc_10 = undefined;
			var _loc_2 = Number(param1.charAt(0));
			var _loc_3 = param1.substring(1);
			var _loc_4 = Math.floor(_loc_3.length / _loc_2);
			var _loc_5 = _loc_3.length % _loc_2;
			var _loc_6 = new Array();
			var _loc_7 = 0;
			while (_loc_7 < _loc_5) {
				if (_loc_6[_loc_7] == undefined) {
					_loc_6[_loc_7] = "";
				}
				_loc_6[_loc_7] = _loc_3.substr((_loc_4 + 1) * _loc_7, (_loc_4 + 1));
				_loc_7 = _loc_7 + 1;
			}
			_loc_7 = _loc_5;
			while (_loc_7 < _loc_2) {
				_loc_6[_loc_7] = _loc_3.substr(_loc_4 * (_loc_7 - _loc_5) + (_loc_4 + 1) * _loc_5, _loc_4);
				_loc_7 = _loc_7 + 1;
			}
			var _loc_8 = "";
			_loc_7 = 0;
			while (_loc_7 < _loc_6[0].length) {
				_loc_10 = 0;
				while (_loc_10 < _loc_6.length) {
					_loc_8 = _loc_8 + _loc_6[_loc_10].charAt(_loc_7);
					_loc_10 = _loc_10 + 1;
				}
				_loc_7 = _loc_7 + 1;
			}
			_loc_8 = unescape(_loc_8);
			var _loc_9 = "";
			_loc_7 = 0;
			while (_loc_7 < _loc_8.length) {
				if (_loc_8.charAt(_loc_7) == "^") {
					_loc_9 = _loc_9 + "0";
				} else {
					_loc_9 = _loc_9 + _loc_8.charAt(_loc_7);
				}
				_loc_7 = _loc_7 + 1;
			}
			_loc_9 = _loc_9.replace("+", " ");
			return _loc_9;
		} catch (e) {
			return false;
		}
	}

	function get_song_url(song_id, callback){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/song/gethqsong/sid/" + song_id, true);
		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4){
				callback(getLocation(JSON.parse(xhr.responseText).location));
			}
		}
		xhr.send();
	}

	var links = d.getElementsByTagName("a");
	var dup = {};
	for (var i = 0; i < links.length; ++i){
		(function(link){
			var song_id = /^\/song\/(\d+)/.exec(link.getAttribute("href"));
			if(song_id === null){
				return;
			}
			song_id = song_id[1];
			if (dup[song_id]){
				return;
			}
			dup[song_id] = true;
			get_song_url(song_id, function(song_url){
				var new_link = d.createElement("a")
				// new_link.innerHTML = "[Download]";
				new_link.setAttribute("href", song_url);
				new_link.setAttribute("download", link.textContent.trim() + ".mp3");
				// link.parentNode.insertBefore(new_link, link.nextSibling);
				new_link.click();
			});
		})(links[i]);
	}

})(document);
