	g.tips.npc = function (c) {
		var e = "<b>" + c.nick + "</b>";
		if (c.type != 4) {
			if (c.wt > 99) {
				e += "<i>tytan</i>"
			} else {
				if (c.wt > 79) {
					e += "<i>heros</i>"
				} else {
					if (c.wt > 29) {
						e += "<i>elita III</i>"
					} else {
						if (c.wt > 19) {
							e += "<i>elita II</i>"
						} else {
							if (c.wt > 9) {
								e += "<i>elita</i>"
							}
						}
					}
				}
			}
			var d = "",
				b = "";
			if (c.type == 2 || c.type == 3) {
				var a = c.lvl - hero.lvl;
				if (a < -13) {
					d = 'style="color:#888"';
				} else {
					if (a > 19) {
						d = 'style="color:#f50"';
					} else {
						if (a > 9) {
							d = 'style="color:#ff0"';
						} else {
						}
					}
				}
			}
			if (c.type > 0) {
              e += "<span " + d + ">" + (c.lvl  ? c.lvl + " lvl" : "") + (c.grp ? "<br>w grupie[" + c.grp + "]" : "") + "</span>"
			}
		}
		return e
	};