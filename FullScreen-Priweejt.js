(function () {
    const FULLSCREEN_CSS = 'I2NoYXR7bGVmdDowICFpbXBvcnRhbnR9I2NlbnRlcmJveDIsI2NlbnRlcmJveHtsZWZ0OjI3NnB4ICFpbXBvcnRhbnQ7aGVpZ2h0OjEwMCUgIWltcG9ydGFudDt0b3A6MCAhaW1wb3J0YW50O3dpZHRoOmNhbGMoMTAwJSAtIDI3NnB4KSAhaW1wb3J0YW50fSNwYW5lbHtsZWZ0OnVuc2V0ICFpbXBvcnRhbnQ7cmlnaHQ6MCAhaW1wb3J0YW50O3RvcDo1MCU7bWFyZ2luLXRvcDotMjY4cHh9I3N0YXRze2xlZnQ6MTQ4cHggIWltcG9ydGFudH0jbGlmZTEsI2V4cDEsI2xpZmUyLCNleHAye2xlZnQ6MjRweCAhaW1wb3J0YW50fSNsZW9ybjF7bGVmdDoxNXB4ICFpbXBvcnRhbnR9I2xlb3JuMntsZWZ0OjEyMHB4ICFpbXBvcnRhbnR9I2dvbGR7bGVmdDoxN3B4ICFpbXBvcnRhbnR9I2Jhc2Uze2xlZnQ6MTUwcHggIWltcG9ydGFudH0jcHJlbWl1bWJ1dHtsZWZ0OjIwcHggIWltcG9ydGFudH0jbG9nb3V0YnV0e2xlZnQ6MTk2cHggIWltcG9ydGFudH0jYm90dG9tYmFye3RvcDp1bnNldCAhaW1wb3J0YW50O2JvdHRvbTowICFpbXBvcnRhbnR9I2JjaGF0e2Rpc3BsYXk6bm9uZSAhaW1wb3J0YW50fSNib3Rsb2N7dG9wOnVuc2V0ICFpbXBvcnRhbnQ7Ym90dG9tOjNweCAhaW1wb3J0YW50fSNsYWdtZXRlcnt0b3A6dW5zZXQgIWltcG9ydGFudDtib3R0b206MCAhaW1wb3J0YW50fSNwdnBtb2Rle3RvcDp1bnNldCAhaW1wb3J0YW50O2JvdHRvbTozcHggIWltcG9ydGFudH0jbWFpbG5vdGlmaWVye2Rpc3BsYXk6bm9uZSAhaW1wb3J0YW50fSNtYWlsbm90aWZpZXJbdGlwKj0iICJde2Rpc3BsYXk6YmxvY2sgIWltcG9ydGFudDt0b3A6dW5zZXQgIWltcG9ydGFudDtsZWZ0OnVuc2V0ICFpbXBvcnRhbnQ7cmlnaHQ6MjkwcHggIWltcG9ydGFudDtib3R0b206NDBweCAhaW1wb3J0YW50fSNiYXNle2hlaWdodDpjYWxjKDEwMCUgLSAyNXB4KSAhaW1wb3J0YW50O3dpZHRoOmNhbGMoMTAwJSAtIDI3NHB4KSAhaW1wb3J0YW50O3otaW5kZXg6MX0jc2hvcHtsZWZ0OjUwJSAhaW1wb3J0YW50O21hcmdpbi1sZWZ0Oi0yMzZweCAhaW1wb3J0YW50O3RvcDo1MCUgIWltcG9ydGFudDttYXJnaW4tdG9wOi0yMTdweCAhaW1wb3J0YW50fSNiYXR0bGUuYmlne2hlaWdodDo1NzhweCAhaW1wb3J0YW50fSNiYXR0bGUuYmlnICNzdXJyZW5kZXJCYXR0bGVCdXR0b24sI2JhdHRsZS5iaWcgI2F1dG9iYXR0bGVCdXR0b257bWFyZ2luLWJvdHRvbTo2NnB4fSNjb3JuZXJze2Rpc3BsYXk6bm9uZSAhaW1wb3J0YW50fSN0dXRvcmlhbHtkaXNwbGF5Om5vbmUgIWltcG9ydGFudH0jc2xzaG9we3RvcDo1MCUgIWltcG9ydGFudDttYXJnaW4tdG9wOi0yNjhweCAhaW1wb3J0YW50O2xlZnQ6NTAlICFpbXBvcnRhbnQ7bWFyZ2luLWxlZnQ6LTUzMHB4ICFpbXBvcnRhbnQ7Ym9yZGVyOjNweCBkb3VibGUgZ29sZH0jcGFydHl7bGVmdDp1bnNldCAhaW1wb3J0YW50O3JpZ2h0OjI3NHB4ICFpbXBvcnRhbnR9LmZ1bGxzY3JlZW4tY2VudGVye2xlZnQ6NTAlICFpbXBvcnRhbnQ7bWFyZ2luLWxlZnQ6LTI1NnB4ICFpbXBvcnRhbnQ7dG9wOjUwJSAhaW1wb3J0YW50O21hcmdpbi10b3A6LTI1NnB4ICFpbXBvcnRhbnQ7Ym9yZGVyOjNweCBkb3VibGUgZ29sZDtwb3NpdGlvbjphYnNvbHV0ZX0uZnVsbHNjcmVlbi1jZW50ZXItZGlhbG9ne2xlZnQ6NTAlICFpbXBvcnRhbnQ7bWFyZ2luLWxlZnQ6LTI1NnB4O3RvcDp1bnNldCAhaW1wb3J0YW50O2JvdHRvbTo2MHB4ICFpbXBvcnRhbnQ7Ym9yZGVyOjNweCBkb3VibGUgZ29sZDtwb3NpdGlvbjphYnNvbHV0ZX0uZnVsbHNjcmVlbi1jZW50ZXItbG9uZ0JvaXtsZWZ0OjUwJSAhaW1wb3J0YW50O21hcmdpbi1sZWZ0Oi0zOTNweCAhaW1wb3J0YW50O3RvcDo1MCUgIWltcG9ydGFudDttYXJnaW4tdG9wOi0yNTZweDtib3JkZXI6M3B4IGRvdWJsZSBnb2xkO3Bvc2l0aW9uOmFic29sdXRlfS5kb3VibGVXcmFwcGVye2hlaWdodDo1MTJweDt3aWR0aDo3ODZweDt6LWluZGV4OjM2MjtkaXNwbGF5Om5vbmV9LmRvdWJsZVdyYXBwZXI+ZGl2e2Zsb2F0OmxlZnQ7cG9zaXRpb246c3RhdGljfS5iYWNrZ3JvdW5kLXRoaW5ne3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7cG9zaXRpb246Zml4ZWQ7ei1pbmRleDotMTtmaWx0ZXI6Ymx1cigxMHB4KSBicmlnaHRuZXNzKDYwJSl9LmJhc2UtYmd7aGVpZ2h0OmNhbGMoMTAwJSAtIDI1cHgpICFpbXBvcnRhbnQ7d2lkdGg6Y2FsYygxMDAlIC0gMjc0cHgpICFpbXBvcnRhbnQ7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxO21hcmdpbi1sZWZ0Oi01cHg7bWFyZ2luLXRvcDotNXB4O2JvcmRlcjo1cHggc29saWQgIzQzMzYwOGM5fQ=='

    $('<style>' + atob(FULLSCREEN_CSS) + '</style>').appendTo('head')

    var j = this;
    var k = document.querySelector('#panel');
    var l = document.querySelector('#base');
    var d = document.querySelector('#battle');
    var e,
    h;
    var b;
    var c;
    var f = document.createElement('canvas');
    f.width = '1';
    f.height = '1';
    var i = f.getContext('2d');
    this.addStyles = function () {
    };
    this.initChat = function () {
      if (g.chat.state != 3) {
        g.chat.state = 3;
        window.setupChat()
      }
    };
    this.moveStuff = function () {
      var n = [
        '#stats',
        '#life1',
        '#life2',
        '#exp1',
        '#exp2',
        '#leorn1',
        '#leorn2',
        '#gold',
        '#base3',
        '#premiumbut',
        '#logoutbut'
      ];
      n.forEach(this.appendToPanel);
      n = [
        '#friends',
        '#skills',
        '#auctions',
        '#depo',
        '#premiumshop',
        '#goldShop',
        '#recipes',
        '#mails',
        '#books',
        '#trade',
        '#battle',
        '#bm_edit_panel_container',
        '#dazed',
        '#youtube'
      ];
      n.forEach(function (s) {
        var r = document.querySelector(s);
        r.classList.add('fullscreen-center');
        r.parentElement.removeChild(r);
        document.body.appendChild(r)
      });
      n = [
        '#minimap'
      ];
      n.forEach(function (s) {
        var r = document.querySelector(s);
        r.classList.add('fullscreen-center-longBoi');
        r.parentElement.removeChild(r);
        document.body.appendChild(r)
      });
      e = document.createElement('div');
      e.classList.add('fullscreen-center-longBoi', 'doubleWrapper');
      var q = document.querySelector('#clanbox');
      var o = document.querySelector('#clanmenu');
      ([q,
      o]).forEach(function (r) {
        r.parentElement.removeChild(r);
        e.appendChild(r)
      });
      document.body.appendChild(e);
      h = document.createElement('div');
      h.classList.add('fullscreen-center-longBoi', 'doubleWrapper');
      q = document.querySelector('#addons');
      o = document.querySelector('#addonspanel');
      ([q,
      o]).forEach(function (r) {
        r.parentElement.removeChild(r);
        h.appendChild(r)
      });
      document.body.appendChild(h);
      var p = document.querySelector('#dialog');
      p.classList.add('fullscreen-center-dialog');
      p.parentElement.removeChild(p);
      document.body.appendChild(p);
      var m = document.querySelector('#shop');
      m.parentElement.removeChild(m);
      document.body.appendChild(m)
    };
    this.toggleClans = function (m) {
      e.style.display = m ? 'block' : 'none'
    };
    this.toggleAddons = function (m) {
      h.style.display = m ? 'block' : 'none'
    };
    this.appendToPanel = function (m) {
      var n = document.querySelector(m);
      n.parentElement.removeChild(n);
      k.appendChild(n)
    };
    this.redefineFuns = function () {
      var n = map.center;
      map.center = function () {
        n.apply(this, arguments);
        var A = j.getBaseSize();
        var x = A.width / 32;
        var v = A.height / 32;
        var w = {
          left: hero.rx * 32,
          top: hero.ry * 32
        };
        var t = w.left - A.width / 2 + hero.fw / 2;
        var y = w.top - A.height / 2 + hero.fh / 2;
        if (y > (map.y - v) * 32) {
          y = (map.y - v) * 32
        }
        if (t > (map.x - x) * 32) {
          t = (map.x - x) * 32
        }
        if (map.y < v) {
          var u = A.height / 2 - map.y * 16;
          l.style.marginTop = u + 'px'
        } else {
          l.style.marginTop = 0
        }
        if (map.x < x) {
          var z = A.width / 2 - map.x * 16;
          l.style.width = 'calc(100% - ' + (z + 274) + 'px)';
          l.style.marginLeft = z + 'px';
          var s = l.getAttribute('style');
          s = s.replace('calc(100% - ' + (z + 274) + 'px)', 'calc(100% - ' + (z + 274) + 'px) !important');
          l.setAttribute('style', s)
        } else {
          l.style.width = 0;
          l.style.marginLeft = 0
        }
        l.scrollLeft = t;
        l.scrollTop = y
      };
      var q = g.lock.add;
      var m = g.lock.remove;
      g.lock.add = function (t) {
        if (t == 'clans') {
          j.toggleClans(true)
        } else {
          if (t == 'addons') {
            j.toggleAddons(true)
          }
        }
        var s = q.apply(this, arguments);
        j.manageLock(g.lock.list.length);
        return s
      };
      g.lock.remove = function (t) {
        if (t == 'clans') {
          j.toggleClans(false)
        } else {
          if (t == 'addons') {
            j.toggleAddons(false)
          }
        }
        var s = m.apply(this, arguments);
        j.manageLock(g.lock.list.length);
        return s
      };
      var p = window.toggleBattleLog;
      window.toggleBattleLog = function () {
        var s = p.apply(this, arguments);
        j.setBattleSize();
        return s
      };
      var r = window.loadMails;
      window.loadMails = function () {
        document.querySelector('#mailnotifier').removeAttribute('tip');
        return r.apply(this, arguments)
      };
      var o = window.parseInput;
      window.parseInput = function (s) {
        if (isset(s.dead)) {
          g.lock.add('dead')
        }
        if (isset(s.myclan)) {
          g.lock.add('clans')
        } else {
          g.lock.remove('dead')
        }
        return o.apply(this, arguments)
      };
      window.toggleChat = function () {
      }
    };
    this.manageLock = function (p) {
      var m = [
        'npcdialog'
      ];
      for (var n = 0; n < m.length; n++) {
        if (g.lock.check(m[n])) {
          p--
        }
      }
      var o = p ? 'brightness(60%)' : '';
      l.style.filter = o;
      c.style.filter = o
    };
    this.setBattleSize = function () {
      var m = getCookie('battleLogSize');
      if (m == 'big') {
        d.classList.add('big')
      } else {
        d.classList.remove('big')
      }
    };
    this.getBaseSize = function () {
      return {
        width: window.innerWidth - 276 - 274,
        height: window.innerHeight - 25
      }
    };
    this.initBg = function () {
      b = document.createElement('div');
      b.classList.add('background-thing');
      document.body.appendChild(b);
      c = document.createElement('div');
      c.classList.add('base-bg');
      document.querySelector('#centerbox2').appendChild(c);
      this.setBG('/obrazki/miasta/' + map.file);
      var m = window.parseInput;
      window.parseInput = function (n) {
        if (n.town) {
          j.setBG('/obrazki/miasta/' + n.town.file)
        }
        return m.apply(this, arguments)
      }
    };
    this.setBG = function (n) {
      b.innerHTML = '<div style=\'background-image: url(' + n + '); background-size: 100% 100%; width: 100%; height: 100%;\'></div>';
      var m = new Image();
      m.src = n;
      m.onload = function () {
        j.setBaseBg(m)
      }
    };
    this.setBaseBg = function (m) {
      i.drawImage(m, 0, 0);
      var o = i.getImageData(0, 0, 1, 1);
      var n = 'rgba(' + o.data[0] + ',' + o.data[1] + ',' + o.data[2] + ',' + o.data[3] + ')';
      c.style.background = n
    };
    this.initResize = function () {
      window.addEventListener('resize', function () {
        map.center();
        this.setDrops()
      });
      map.center()
    };
    this.setDrops = function () {
      g.drops.bx = window.innerWidth - 248;
      g.drops.bx2 = g.drops.bx + 230;
      g.drops.ex = g.drops.bx - 7;
      g.drops.ex2 = g.drops.ex + 107;
      g.drops.gx = g.drops.bx;
      g.drops.gx2 = g.drops.bx2 + 1;
      g.drops.dpx = window.innerWidth / 2 - 225;
      g.drops.dpx2 = g.drops.dpx + 512;
      g.drops.dpy += 12
    };
    this.initDroppables = function () {
      $(l).droppable({
        accept: '.item',
        tolerance: 'fit',
        drop: function (o, n) {
          var m = n.draggable[0];
          var p = m.getAttribute('id');
          if (/item([0-9]+)/.test(p)) {
            p = p.split('item') [1];
            if (g.item[p] && g.item[p].loc == 'g') {
              if (!g.lock.check()) {
                if (g.item[p].cl == 25 && g.item[p].st == 10) {
                  mAlert(_t('drop_bless_question', null, 'item'), 1, [
                    function () {
                      moveItemSafe(p, 'st=-2')
                    }
                  ])
                } else {
                  if (_l() == 'en') {
                    $('#_t5, #_t8').css('display', 'none')
                  }
                  $('#dropmenu H3').html(g.item[p].name);
                  $('#dropmenu').attr('iid', p).absCenter().fadeIn()
                }
              } else {
                if (g.trade.id) {
                  _g('trade&a=add&sid=' + p)
                }
              }
            }
          }
        }
      })
    };
    this.init = function () {
      this.addStyles();
      this.moveStuff();
      this.redefineFuns();
      this.initBg();
      this.initResize();
      this.initDroppables();
      Object.defineProperty(g, 'left', {
        set: function () {
        },
        get: function () {
          return 0
        }
      });
      this.initChat();
      this.setBattleSize();
      this.setDrops()
    };
    this.init()
})()
