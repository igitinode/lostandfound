var BASE64 = {

	b64ch : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	base64Decode : function(b64) {
		var i, j, k;
		var c = [ 0, 0, 0, 0 ];
		var uba = []; // unicode byte array
		var ucs = ""; // unicode string
		var ch; // single character
		for (j = k = 0;;) {
			for (i = 0; i < 4 && k < b64.length; k++) {
				ch = b64.charAt(k);
				switch (ch) {
				case '=':
					c[i] = 0;
					break;
				case '\r':
				case '\n':
					continue;
				default:
					c[i++] = this.b64ch.indexOf(ch);
				}
			}
			uba.length += 3;
			if (i > 0)
				uba[j++] = (c[0] << 2 | c[1] >>> 4) & 0xff;
			if (i > 1)
				uba[j++] = (c[1] << 4 | c[2] >>> 2) & 0xff;
			if (i > 2)
				uba[j++] = (c[2] << 6 | c[3]) & 0xff;
			if (i < 4)
				break;
		}
		if (uba.length % 2 != 0)
			uba.length--;
		for (j = 0; j < uba.length; j += 2) {
			ch = (uba[j] | uba[j + 1] << 8).toString(16);
			ch = "0000".substring(ch.length) + ch;
			ucs += unescape("%u" + ch);
		}
		return ucs;
	},
	base64Encode : function(str, flag) {
		var i, j, k;
		var b = [ 0, 0, 0 ];
		var uba = []; // unicode byte array
		var b64 = ""; // the base64 string
		var len; // length of base64 string
		var ch; // single character
		for (j = 0, k = 0; j < str.length; j++) {
			ch = str.charCodeAt(j);
			uba.length += 2;
			uba[k++] = ch & 0xff;
			uba[k++] = ch >>> 8;
		}
		for (j = k = len = 0;;) {
			b[0] = b[1] = b[2] = 0;
			for (i = 0; i < 3 && j < uba.length; i++, j++)
				b[i] = uba[j];
			if (i == 0)
				break;
			b64 += this.b64ch.charAt([ b[0] >>> 2 ]);
			b64 += this.b64ch.charAt((b[0] & 0x03) << 4 | b[1] >>> 4);
			b64 += i > 1 ? this.b64ch.charAt((b[1] & 0x0f) << 2 | b[2] >>> 6)
					: "=";
			b64 += i > 2 ? this.b64ch.charAt(b[2] & 0x3f) : "=";
			len += 4;
			if (flag && len % 76 == 0)
				b64 += "\r\n";
		}
		return b64;
	}
};
