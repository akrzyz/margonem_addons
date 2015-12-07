function newNpc(e) {
    if (!isset(g.tips.npc)) {
        g.tips.npc = function (j) {
            var f = false;
            var i = '<b>' + htmlspecialchars(j.nick) + '</b>';
            if (j.type != 4) {
                if (j.wt > 99) {
                    i += '<i>' + _t('wt_titan', null, 'npc') + '</i>'
                } else {
                    if (j.wt > 79) {
                        i += '<i>' + _t('wt_hero', null, 'npc') + '</i>'
                    } else {
                        if (j.wt > 29) {
                            i += '<i>' + _t('wt_elite3', null, 'npc') + '</i>'
                        } else {
                            if (j.wt > 19) {
                                f = true
                            } else {
                                if (j.wt > 9) {
                                    i += '<i>' + _t('eliteI', null, 'npc') + '</i>'
                                }
                            }
                        }
                    }
                }
                var h = '';
                if (j.type == 2 || j.type == 3) {
                    var d = j.lvl - hero.lvl;
                    if (d < - 13) {
                        h = 'style="color:#888"'
                    } else {
                        if (d > 19) {
                            h = 'style="color:#f50"'
                        } else {
                            if (d > 9) {
                                h = 'style="color:#ff0"'
                            }
                        }
                    }
                }
                i += '<span ' + h + '>' + (j.lvl ? (j.lvl + ' lvl')  : '') + (j.grp ? ', grp' : '') + '</span>'
            }
            if ((RegExp('^/obrazki/npc/tmp/').test(j.icon) ? 'nodef' : '')) {
                f = true
            }
            return !f ? i : null
        }
    }
    for (k in e)
    {
        var c = null;
        if (isset(g.npc[k])) 
        {
            if ($('#npc' + k + ' #bubbledialog').length) {
                c = $('#bubbledialog').detach()
            }
            $('#npc' + k).remove();
            if (isset(g.npc[k].x)) {
                delete g.npccol[g.npc[k].x + 256 * g.npc[k].y]
            }
            delete g.npc[k]
        }
        if (isset(e[k].del)) {
            questTrack.checkTaskNpc(k);
            continue;
            if (c) {
                $(body).append(c.css('display', 'none'))
            }
        }
        if (e[k].type == 6 && !isset(g.agressiveNpc[k])) {
            g.agressiveNpc[k] = false
        }
        if (e[k].icon.charAt(0) != '/') {
            e[k].icon = '/' + e[k].icon
        }
        e[k].icon = g.opath + 'npc' + e[k].icon;
        e[k].id = k;
        g.npc[k] = e[k];
        g.npc[k].imgStatus = false;
        var a = '';
        var b = g.tips.npc(e[k]);
        if (e[k].type != 4 || e[k].lvl) {
            a = ' ctip=t_npc ' + (b ? 'tip=\'' + g.tips.npc(e[k]) + '\'' : '') + ''
        }
        $('#base').append('<div class="npc ' + (RegExp('^/obrazki/npc/tmp/').test(e[k].icon) ? 'nodef' : '') + '" id=npc' + k + a + '></div>');
        if (isset(e[k].qm) && e[k].qm) {
            if (_l() == 'pl') {
                $('#npc' + k).append('<img src="img/quest-mark.gif">')
            } else {
                $('#npc' + k).append('<div class="qm' + (e[k].qm % 2 == 0 ? ' daily' : '') + '">' + (e[k].qm < 3 ? '?' : '!') + '</div>')
            }
        }
        $('#npc' + k).css({
            left: e[k].x * 32,
            top: e[k].y * 32 - 16,
            zIndex: 10 + e[k].y + ((e[k].type == 4) ? parseInt(e[k].wt)  : 0) + (e[k].type == 7 ? - 10 : 0)
        }).bind('contextmenu', function (f) {
            var d = this.id.substr(3);
            if (g.npc[d].type == 2 || g.npc[d].type == 3) {
                f.preventDefault();
                return _g('fight&a=attack&id=-' + d + '&ff=1')
            }
        }).click(function (i) {
            if (isset(g.talk.block) && g.talk.block) {
                delete g.talk.block;
                return false
            }
            var f = this.id.substr(3);
            if (Math.abs(g.npc[f].x - hero.x) > 1 || Math.abs(g.npc[f].y - hero.y) > 1) {
                hero.mClick(i);
                return
            }
            var d = [
            ];
            var h = true;
            if (g.npc[f].type == 4) {
                return
            }
            if (g.npc[f].type == 0 || g.npc[f].type == 6 || g.npc[f].type == 7) {
                d[0] = [
                    _t('talk', null, 'menu'),
                    '_g("talk&id=' + f + '")'
                ];
                h = false
            }
            if (g.npc[f].type == 2 || g.npc[f].type == 3) {
                d[0] = [
                    _t('attack', null, 'menu'),
                    '_g("fight&a=attack&ff=1&id=-' + f + '")'
                ]
            }
            if (g.npc[f].type == 2 || g.npc[f].type == 3) {
                d[1] = [
                    _t('attack_turn', null, 'menu'),
                    '_g("fight&a=attack&id=-' + f + '")'
                ]
            }
            if (g.npc[f].type == 5) {
                d[0] = [
                    (g.npc[f].wt == 1) ? _t('run', null, 'menu')  : _t('lookat', null, 'menu'),
                    '_g("talk&id=' + f + '")'
                ];
                h = false
            }
            if (isset(g.npc[f].e2jmp) && g.npc[f].e2jmp == 1) {
                d.push([_t('e2jump_over', null, 'menu'),
                '_g("e2jmp&x=' + g.npc[f].x + '&y=' + g.npc[f].y + '")']);
                h = false
            }
            if (h) {
                if (hero.lvl < 25 && !g.party) {
                    return _g('fight&a=attack&id=-' + f + '&ff=1')
                }
                return _g('fight&a=attack&id=-' + f)
            }
            if (!g.talk.id) {
                showMenu(i, d)
            }
        }).mousedown(function (d) {
            return false
        });
        if (g.npc[k].type == 4 && (g.npc[k].tip == '' || !isset(g.npc[k].tip)) && (g.npc[k].nick == '' || !isset(g.npc[k].nick))) {
            $('#npc' + k).mouseenter(function () {
                _areaRegStorage.registerArea($(this).attr('id').substr(3))
            })
        }
        if (e[k].type != 4 && e[k].type != 7) {
            g.npccol[e[k].x + 256 * e[k].y] = true;
            hero.checkNPCRoadCollision(e[k].x, e[k].y)
        }
        g.npc[k].imgload = function () {
            this.imgStatus = true;
            var f = this.x * 32 + 16 - Math.round(this.img.width / 2) + ((this.type > 3 && !(this.img.width % 64)) ? - 16 : 0);
            var d = Math.round(this.x) + Math.round(this.y) * 256,
            h = 0;
            if (isset(map) && isset(map.water[d])) {
                h = map.water[d] / 4
            }
            $('#npc' + this.id).css({
                backgroundImage: 'url(' + this.img.src + ')',
                left: f,
                top: this.y * 32 + 32 - this.img.height + (h > 8 ? 0 : 0),
                width: (f + this.img.width > map.x * 32 ? map.x * 32 - f : this.img.width),
                height: this.img.height - (h > 8 ? ((h - 8) * 4)  : 0)
            }).removeClass('nodef');
            this.fw = this.img.width;
            this.fh = this.img.height;
            delete this.img;
            if (isset(g.checklist['npc' + this.id])) {
                g.checklist['npc' + this.id](this)
            }
            if (g.talk.insideDialogSynchroId == this.id) {
                initiateNpcInsideDialog(this.id)
            }
            if (g.talk.dialogCloud == this.id) {
                createDialogCloud(this.id)
            }
            if (c) {
                $('#npc' + this.id).append(c)
            }
            if (this.id.match(/23085|21933|22310|21952|22172|17176/) && !__tutorials.val && 1) {
                Highlighter.startH.synchroStart('npc');
                Highlighter.startH.npcId = this.id
            }
        };
        g.npc[k].img = new Image();
        $(g.npc[k].img).load($.proxy(g.npc[k], 'imgload')).error(function () {
            log($(this).attr('src'), 2)
        }).attr({
            src: g.npc[k].icon
        });
        questTrack.checkTaskNpc(k)
    }
}

