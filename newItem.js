function newItem(t) {
    var m = false;
    for (var o in t) {
        var q = null;
        if (t[o].loc == "v" && adventCallendar.checkItem(t[o], o)) {
            continue
        }
        if (isset(g.item[o]) && g.item[o].loc != "a") {
            var l = $("#item" + o).attr("tpos");
            if (!isNaN(l)) {
                var u = $("#item" + o).attr("mine") == "true";
                if (u) {
                    g.trade.myval -= g.item[o].pr;
                    $("#mytr_value").html(round(g.trade.myval));
                    g.trade.myitems &= ~(1 << l)
                } else {
                    g.trade.val -= g.item[o].pr;
                    $("#tr2_value").html(round(g.trade.val));
                    g.trade.items &= ~(1 << l)
                }
                trade_changeProtect()
            }
            if (isset(t[o].del) && (isset(g.item[o]) && g.item[o].loc == "x")) {
                waitItemManage.remove(o)
            }
            $("#item" + o).remove();
            if (g.item[o].st == 0 && g.item[o].loc == "g" && !isset(g.item[o].returned)) {
                g.bags[Math.floor(g.item[o].y / 6)][1]--
            }
            q = isset(g.item[o].initLvl) ? g.item[o].initLvl : null;
            if (isset(g.item[o].returned)) {
                delete g.item[o].returned
            }
            if (g.item[o].loc == "d" && isset(g.depo.tmpDropMatrix[g.item[o].x]) && isset(g.depo.tmpDropMatrix[g.item[o].x][g.item[o].y])) {
                delete(g.depo.tmpDropMatrix[g.item[o].x][g.item[o].y])
            }
            g.bagsPlaces.remove(g.item[o].y * 7 + g.item[o].x);
            delete g.item[o]
        }
        if (isset(t[o].del)) {
            continue
        }
        if (t[o].loc == "g" && t[o].own != hero.id) {
            continue
        }
        t[o].id = o;
        if (t[o].loc == "n") {
            t[o].pr = Math.round(t[o].pr * g.shop.sellp * 0.01)
        }
        t[o].tip = itemTip(t[o]);
        g.item[o] = t[o];
        if (q !== null) {
            g.item[o].initLvl = q
        }
        switch (t[o].loc) {
            case "r":
                g.itemRecovery.addItem(t[o]);
                break;
            case "q":
                $(".rew_item_" + o).append('<div class="item rewitem' + o + "\" ctip=t_item tip='" + t[o].tip + "'></div>");
                break;
            case "m":
                $("#base").append("<div class=item id=item" + o + " ctip=t_item tip='" + t[o].tip + "'></div>");
                $("#item" + o).css({
                    left: t[o].x * 32,
                    top: t[o].y * 32,
                    zIndex: t[o].y + 1
                }).click(function(c) {
                    hero.mClick(c)
                });
                break;
            case "g":
                if (isset(g.itemRecovery)) {
                    g.itemRecovery.removeItem(o)
                }
                newEquip(t[o]);
                break;
            case "n":
                $("#shop_store").append("<div class=item id=item" + o + " ctip=t_item tip='" + t[o].tip + "'></div>");
                if (t[o].tpl == 0) {
                    $("#item" + o).bind("groupbuy_on", function() {
                        var d = $(this).attr("id").substr(4);
                        if (g.item[d].tpl == 0) {
                            for (var c in g.item) {
                                if (g.item[c].y == g.item[d].y && g.item[c].loc == "n" && c != d) {
                                    $("#item" + c).addClass("highlight groupbuy_child")
                                }
                            }
                        }
                    }).bind("groupbuy_off", function() {
                        $(".item.groupbuy_child").removeClass("highlight groupbuy_child")
                    }).hover(function() {
                        $(this).trigger("groupbuy_on")
                    }, function() {
                        $(this).trigger("groupbuy_off")
                    })
                }
                if (questTrack.activeTrack) {
                    for (var v in questTrack.tasks) {
                        if (t[o].name == questTrack.tasks[v]) {
                            $("#item" + o).prepend('<div class="itemHighlighter track"></div>')
                        }
                    }
                }
                $("#item" + o).css({
                    left: t[o].x * 33,
                    top: t[o].y * 33
                }).click(function() {
                    shop_buy(this)
                });
                break;
            case "t":
                trade_changeProtect();
                var u = hero.id == t[o].own;
                $("#" + (u ? "mytr" : "tr2") + "_items").append("<div class=item id=item" + o + " ctip=t_item tip='" + t[o].tip + "' onclick=_g('trade&a=del&tid=" + o + "')></div>");
                for (var r = 0; r < 10; r++) {
                    if (!((u ? g.trade.myitems : g.trade.items) & (1 << r))) {
                        var y = r % 5,
                            x = (r > 4) ? 1 : 0;
                        if (u) {
                            g.trade.myitems |= 1 << r
                        } else {
                            g.trade.items |= 1 << r
                        }
                        $("#item" + o).css({
                            left: y * 33,
                            top: x * 33
                        }).attr("tpos", r).attr("mine", u);
                        break
                    }
                }
                if (u) {
                    g.trade.myval += t[o].pr;
                    $("#mytr_value").html(round(g.trade.myval))
                } else {
                    g.trade.val += t[o].pr;
                    $("#tr2_value").html(round(g.trade.val))
                }
                break;
            case "s":
                var u = hero.id == t[o].own;
                $("#" + (u ? "mytr" : "tr2") + "_sitems").append('<div class="trshow_item item" id=item' + o + " ctip=t_item tip='" + t[o].tip + "' onclick=_g('trade&a=del&sid=" + o + "')></div>");
                $("#item" + o).attr("mine", u);
                break;
            case "b":
                $("#mailatt" + o).html("<div class=item id='item" + o + "' ctip='t_item' tip='" + t[o].tip + "' style='background-image:url(" + g.opath + "itemy/" + t[o].icon + ")'></div>");
                break;
            case "$":
                codeManager.addItem(g.item[o]);
                m = true;
                break;
            case "d":
            case "c":
                $("#depo-items").append("<div class=item id=item" + o + " ctip=t_item tip='" + t[o].tip + "'></div>");
                if (!isset(g.depo.tmpDropMatrix[t[o].x])) {
                    g.depo.tmpDropMatrix[t[o].x] = {}
                }
                g.depo.tmpDropMatrix[t[o].x][t[o].y] = o;
                $("#item" + o).css({
                    left: t[o].x * 33,
                    top: t[o].y * 33
                }).click(function() {
                    depoGet(this)
                }).draggable({
                    helper: "clone",
                    appendTo: "body",
                    cursorAt: {
                        top: 16,
                        left: 16
                    },
                    zIndex: 450,
                    containment: [0, 0, g.maxx - 32, g.maxy - 32],
                    start: function(d, c) {
                        g.depo.drag = true;
                        g.mouseMove.enabled = false;
                        Tip.disable();
                        $(this).css("opacity", 0.7)
                    },
                    drag: depoDrag,
                    stop: function(z, i) {
                        g.mouseMove.enabled = true;
                        g.depo.drag = false;
                        clearTimeout(g.depo.sectionActivateTimeout);
                        Tip.enable();
                        $(this).css("opacity", 1);
                        var c = z.clientX - g.left,
                            B = z.clientY - g.top;
                        var A = this.id.substr(4);
                        if (c >= g.drops.dpx && c <= g.drops.dpx2 && B >= g.drops.dpy && B <= g.drops.dpy2) {
                            var h = Math.min(13, Math.floor((c - g.drops.dpx) / 33));
                            var d = Math.min(7, Math.floor((B - g.drops.dpy) / 33));
                            if (g.depo.clan) {
                                _g("clan&a=depo&a2=move&id=" + A + "&dx=" + g.item[A].x + "&dy=" + g.item[A].y + "&px=" + (h + ((g.depo.section - 1) * 14)) + "&py=" + d)
                            } else {
                                _g("depo&move=" + A + "&x=" + (h + ((g.depo.section - 1) * 14)) + "&y=" + d)
                            }
                        }
                        if (c >= g.drops.bx && c <= g.drops.bx2 && B >= g.drops.by && B <= g.drops.by2) {
                            var h = Math.min(6, Math.floor((c - g.drops.bx) / 33));
                            var d = Math.min(5, Math.floor((B - g.drops.by) / 33)) + g.bag * 6;
                            if (g.depo.clan) {
                                _g("clan&a=depo&a2=get&id=" + A + "&dx=" + g.item[A].x + "&dy=" + g.item[A].y + "&px=" + h + "&py=" + d)
                            } else {
                                _g("depo&get=" + A + "&x=" + h + "&y=" + d)
                            }
                        }
                    }
                });
                break;
            case "x":
                waitItemManage.add(o);
                break;
            case "v":
                adventCallendar.addItem(o, t[o].x + t[o].y * 6);
                break;
            case "l":
                lootItem(t[o]);
                break;
            case "e":
                ingameRegistration.addItem(o);
                break
        }
        var f = {
            upgraded: "t_upg",
            unique: "t_uni",
            heroic: "t_her",
            legendary: "t_leg",
            artefact: "t_art"
        };
        var j = [];
        var r = g.item[o];
        for (var s in f) {
            if (RegExp(s).test(r.stat)) {
                j.push(f[s]);
                break
            }
        }
        if (((g.highlightedItems.indexOf(r.id) < 0 && r.initLvl > 4 && r.loc == "g") || (isset(r.nn) && r.nn == 1)) && r.cl != 25) {
            j.push("new");
            g.highlightedItems.push(r.id);
            if (Math.floor(r.y / 6) != parseInt(g.bag)) {
                if (!$("[bag=" + Math.floor(r.y / 6) + "]").find(".itemHighlighter").length) {
                    $("[bag=" + Math.floor(r.y / 6) + "]").prepend('<div class="itemHighlighter new"></div>')
                }
            }
        }
        delete r.nn;
        if (isset(r.moved)) {
            delete r.moved
        }
        if (j.length && r.loc != "r" && !(r.cl == 24 && r.loc == "g" && r.st >= 20)) {
            var w = $('<div class="itemHighlighter ' + j.join(" ") + " " + (hero.opt & 4096 ? "nodisp" : "") + '"></div>');
            $("#item" + r.id).mouseenter(function() {
                $(this).find(".itemHighlighter.new").removeClass("new")
            });
            $("#item" + r.id).prepend(w)
        }

        function p(d, z, A) {
            var c = d.find("small");
            if (!c.length) {
                c = $("<small></small>").css("opacity", 0.5);
                if (isset(A)) {
                    for (var h in A) {
                        c.attr(h, A[h])
                    }
                }
                d.append(c)
            }
            c.html(z)
        }
        if (t[o].cl == 21) {
            var a = t[o].stat.match(/ammo=([0-9]+)/);
            if (a !== null) {
                var b = parseInt(a[1]) <= 50 ? "#780000" : null;
                p($("#item" + o), a[1]);
                if (b != null && t[o].loc == "g") {
                    $("#item" + o).css("background-color", b)
                }
            }
        }
        if (t[o].cl == 18 && t[o].stat.match(/expires=([0-9]+)/) && t[o].loc == "g") {
            var a = t[o].stat.match(/expires=([0-9]+)/);
            if (parseInt(a[1]) - unix_time() < 3 * 86400) {
                $("#item" + o).css("background-color", "#780000")
            }
        }
        if (t[o].stat.match(/timelimit=([0-9]+)/)) {
            $("#item" + o).mouseover(function() {
                var c = $(this).attr("id").substr(4);
                $("#item" + c).attr("tip", itemTip(g.item[c]))
            })
        }
        if (t[o].loc != "m" && t[o].tip.indexOf("noammo") > 0) {
            $("#item" + o).css("backgroundColor", "#a00")
        }
        var n = t[o].stat.match(/amount=([0-9]+)/);
        if (n && n[1] > 0 && t[o].st != 10 && t[o].loc != "a") {
            p($("#item" + o), n[1])
        }
        if ((/cursed/).test(t[o].stat)) {
            var n = t[o].stat.match(/amount=([0-9]+)/);
            console.log(n);
            if (!n || (n && parseInt(n[1]) <= 0)) {
                $("#item" + o).css("backgroundColor", "#a00")
            }
        }
        if (t[o].cl == 24 && t[o].loc == "g" && t[o].st >= 20) {
            var e = t[o].stat.match(/bag=([0-9]+)/);
            e = parseInt(e[1]);
            g.bags[t[o].st - 20][0] = e;
            p($("#item" + o), e - g.bags[t[o].st - 20][1], {
                id: "bs" + (t[o].st - 20)
            })
        } else {
            if (t[o].st == 0 && t[o].loc == "g") {
                g.bags[Math.floor(t[o].y / 6)][1]++
            }
        }
        $("#item" + o + ", .rewitem" + o).append('<img src="img/def-item.gif" class="imhdefolder" />');
        loadImg("itemy/" + t[o].icon, o, function() {
            var c = $(this).attr("dest");
            $("#item" + c + " .imhdefolder, .rewitem" + c + " .imhdefolder").remove();
            $("#item" + c + ", .rewitem" + c).append(this)
        });
        if (isset(g.ah.synchroItems[o])) {
            $("#ah_list table tbody").append(ah_item_row(g.ah.synchroItems[o].ah));
            delete g.ah.synchroItems[o]
        }
    }
    updateBags();
    if (m) {
        codeManager.updateItems()
    }
}

