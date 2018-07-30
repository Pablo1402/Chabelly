function dF(s) {
    var s1 = unescape(s.substr(0, s.length - 1));
    var t = '';
    for (i = 0; i < s1.length; i++) t += String.fromCharCode(s1.charCodeAt(i) - s.substr(s.length - 1, 1));
    return (unescape(t));
}

(function ($) {
    var ie6 = (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 7 && parseInt(jQuery.browser.version, 10) > 4);
    if ($.proxy === undefined) {
        $.extend({
            proxy: function (fn, thisObject) {
                if (fn) {
                    proxy = function () {
                        return fn.apply(thisObject || this, arguments)
                    }
                };
                return proxy
            }
        })
    };
    $.extend(jQuery.easing, {
        easeOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
        }
    });
    $.extend($.expr[':'], {
        value: function (a) {
            return $(a).val()
        }
    });
    $.extend({
        MsgBoxConfig: function (options) {
            var defaults = {
                name: 'jquery-msgbox',
                formaction: '#',
                zIndex: 10000,
                width: 420,
                height: 'auto',
                background: '#FFFFFF',
                modal: true,
                overlay: {
                    'background-color': '#000000',
                    'opacity': 0.5
                },
                showDuration: 200,
                closeDuration: 100,
                moveDuration: 500,
                emergefrom: 'top',
                shake: {
                    distance: 10,
                    duration: 100,
                    transition: 'easeOutBack',
                    loops: 2
                }
            };
            if ($.aerOptions === undefined) {
                return $.aerOptions = $.extend(true, defaults, options)
            } else {
                return $.aerOptions = $.extend(true, $.aerOptions, options)
            }
        },
        MsgBoxObject: {
            options: {},
            esqueleto: {
                msgbox: [],
                wrapper: [],
                form: [],
                buttons: [],
                inputs: []
            },
            visible: false,
            i: 0,
            animation: false,
            overlay: {
                create: function (options) {
                    this.options = options;
                    this.element = $('<div id="' + new Date().getTime() + '"></div>');
                    this.element.css($.extend({}, {
                        'position': 'fixed',
                        'top': 0,
                        'left': 0,
                        'opacity': 0,
                        'display': 'none',
                        'z-index': this.options.zIndex
                    }, this.options.style));
                    this.element.click($.proxy(function (event) {
                        if (this.options.hideOnClick) {
                            if (!this.options.callback === undefined) {
                                this.options.callback()
                            } else {
                                this.hide()
                            }
                        }
                        event.preventDefault()
                    }, this));
                    this.hidden = true;
                    this.inject();
                    return this
                },
                inject: function () {
                    this.target = $(document.body);
                    this.target.append(this.element);
                    if (ie6) {
                        this.element.css({
                            'position': 'absolute'
                        });
                        var zIndex = parseInt(this.element.css('zIndex'));
                        if (!zIndex) {
                            zIndex = 1;
                            var pos = this.element.css('position');
                            if (pos == 'static' || !pos) {
                                this.element.css({
                                    'position': 'relative'
                                })
                            }
                            this.element.css({
                                'zIndex': zIndex
                            })
                        }
                        zIndex = ( !! (this.options.zIndex || this.options.zIndex === 0) && zIndex > this.options.zIndex) ? this.options.zIndex : zIndex - 1;
                        if (zIndex < 0) {
                            zIndex = 1
                        }
                        this.shim = $('<iframe id="IF_' + new Date().getTime() + '" scrolling="no" frameborder=0 src=""></div>');
                        this.shim.css({
                            zIndex: zIndex,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            border: 'none',
                            width: 0,
                            height: 0,
                            opacity: 0
                        });
                        this.shim.insertAfter(this.element);
                        $('html, body').css({
                            'height': '100%',
                            'width': '100%',
                            'margin-left': 0,
                            'margin-right': 0
                        })
                    }
                },
                resize: function (x, y) {
                    this.element.css({
                        'height': 0,
                        'width': 0
                    });
                    if (this.shim) this.shim.css({
                        'height': 0,
                        'width': 0
                    });
                    var win = {
                        x: $(document).width(),
                        y: $(document).height()
                    };
                    this.element.css({
                        'width': '100%',
                        'height': y ? y : win.y
                    });
                    if (this.shim) {
                        this.shim.css({
                            'height': 0,
                            'width': 0
                        });
                        this.shim.css({
                            'position': 'absolute',
                            'left': 0,
                            'top': 0,
                            'width': this.element.width(),
                            'height': y ? y : win.y
                        })
                    }
                    return this
                },
                show: function () {
                    if (!this.hidden) return this;
                    if (this.transition) this.transition.stop();
                    this.target.bind('resize', $.proxy(this.resize, this));
                    this.resize();
                    if (this.shim) this.shim.css({
                        'display': 'block'
                    });
                    this.hidden = false;
                    this.transition = this.element.fadeIn(this.options.showDuration, $.proxy(function () {
                        this.element.trigger('show')
                    }, this));
                    return this
                },
                hide: function () {
                    if (this.hidden) return this;
                    if (this.transition) this.transition.stop();
                    this.target.unbind('resize');
                    if (this.shim) this.shim.css({
                        'display': 'none'
                    });
                    this.hidden = true;
                    this.transition = this.element.fadeOut(this.options.closeDuration, $.proxy(function () {
                        this.element.trigger('hide');
                        this.element.css({
                            'height': 0,
                            'width': 0
                        })
                    }, this));
                    return this
                }
            },
            create: function () {
                this.options = $.MsgBoxConfig();
                this.overlay.create({
                    style: this.options.overlay,
                    hideOnClick: !this.options.modal,
                    zIndex: this.options.zIndex - 1,
                    showDuration: this.options.showDuration,
                    closeDuration: this.options.closeDuration
                });
                this.esqueleto.msgbox = $('<div class="' + this.options.name + '"><div class="' + this.options.name + '-busy" style="display: none;"></div></div>');
                this.esqueleto.msgbox.css({
                    display: 'none',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: this.options.width,
                    height: this.options.height,
                    'z-index': this.options.zIndex,
                    'word-wrap': 'break-word',
                    '-moz-box-shadow': '0 0 15px rgba(0, 0, 0, 0.5)',
                    '-webkit-box-shadow': '0 0 15px rgba(0, 0, 0, 0.5)',
                    'box-shadow': '0 0 15px rgba(0, 0, 0, 0.5)',
                    '-moz-border-radius': '6px',
                    '-webkit-border-radius': '6px',
                    'border-radius': '6px',
                    'background-color': this.options.background
                });
                this.esqueleto.wrapper = $('<div class="' + this.options.name + '-wrapper"></div>');
                this.esqueleto.msgbox.append(this.esqueleto.wrapper);
                this.esqueleto.form = $('<form id="' + this.options.name + '-form" action="' + this.options.formaction + '" method="post"></form>');
                this.esqueleto.wrapper.append(this.esqueleto.form);
                this.esqueleto.wrapper.css({
                    height: (ie6 ? 80 : 'auto'),
                    'min-height': 80,
                    'zoom': 1
                });
                $('body').append(this.esqueleto.msgbox);
                this.addevents();
                return this.esqueleto.msgbox
            },
            addevents: function () {
                $(window).bind('resize', $.proxy(function () {
                    if (this.visible) {
                        this.overlay.resize();
                        this.moveBox()
                    }
                }, this));
                $(window).bind('scroll', $.proxy(function () {
                    this.moveBox()
                }, this));
                this.esqueleto.msgbox.bind('keydown', $.proxy(function (event) {
                    if (event.keyCode == 27) {
                        this.close(false)
                    }
                }, this));
                this.esqueleto.form.bind('submit', $.proxy(function (event) {
                    event.preventDefault()
                }, this));
                this.overlay.element.bind('show', $.proxy(function () {
                    $(this).triggerHandler('show')
                }, this));
                this.overlay.element.bind('hide', $.proxy(function () {
                    $(this).triggerHandler('close')
                }, this))
            },
            show: function (txt, options, callback) {
                var types = ['alert', 'info', 'error', 'prompt', 'confirm', 'PartialView'];
                this.esqueleto.msgbox.queue(this.options.name, $.proxy(function (next) {
                    options = $.extend(true, {
                        type: 'alert'
                    }, options || {});
                    if (options.buttons === undefined) {
                        if (options.type == 'confirm' || options.type == 'prompt') {
                            var buttons = [{
                                type: 'submit',
                                value: 'Accept'
                            }, {
                                type: 'cancel',
                                value: 'Cancel'
                            }]
                        } else {
                            var buttons = [{
                                type: 'submit',
                                value: 'Accept'
                            }]
                        }
                    } else {
                        var buttons = options.buttons
                    };
                    if (options.inputs === undefined && options.type == 'prompt') {
                        var inputs = [{
                            type: 'text',
                            name: 'prompt',
                            value: ''
                        }]
                    } else {
                        var inputs = options.inputs
                    };
                    this.callback = $.isFunction(callback) ? callback : function (e) {};
                    if (inputs !== undefined) {
                        this.esqueleto.inputs = $('<div id="inputs" class="' + this.options.name + '-inputs"></div>');
                        this.esqueleto.form.append(this.esqueleto.inputs);
                        $.each(inputs, $.proxy(function (i, input) {
                            if (input.type == 'text' || input.type == 'password' || input.type == 'email') {
                                iLabel = input.label ? '<label class="' + this.options.name + '-label">' + input.label : '';
                                fLabel = input.label ? '</label>' : '';
                                input.value = input.value === undefined ? '' : input.value;
                                iRequired = input.required === undefined || input.required == false ? '' : 'required="true"';
                                iAutoComplete = input.AutoComplete === undefined || input.AutoComplete == false ? '' : 'class="' + this.options.name + '-autocomplete"';
                                iId = input.id === undefined || input.id == '' ? '' : 'id="' + input.id + '"';
                                iClass = input.classe === undefined || input.classe == '' ? '' : 'class="' + input.classe + '"';
                                iOnClick = input.eventOnClick === undefined || input.eventOnClick == '' ? '' : 'onClick="' + input.eventOnClick + '"';
                                iAction = input.Action === undefined || input.Action == '' ? '' : 'action="' + input.Action + '"';
                                this.esqueleto.inputs.append($(iLabel + '<input type="' + input.type + '" ' + iId + ' ' + iClass + ' ' + iOnClick + ' name="' + this.options.name + '-label-' + i + '" value="' + input.value + '" ' + iAutoComplete + ' ' + iAction + ' ' + iRequired + '/>' + fLabel))
                            } else if (input.type == 'checkbox') {
                                iLabel = input.label ? '<label class="' + this.options.name + '-label">' : '';
                                fLabel = input.label ? input.label + '</label>' : '';
                                input.value = input.value === undefined ? '1' : input.value;
                                iId = input.id === undefined || input.id == '' ? '' : 'id="' + input.id + '"';
                                this.esqueleto.inputs.append($(iLabel + '<input type="' + input.type + '" ' + iId + ' style="display:inline; width:auto;" name="' + this.options.name + '-label-' + i + '" value="' + input.value + '" autocomplete="off"/> ' + fLabel))
                            } else if (input.type == 'select') {
                                iLabel = input.label ? '<label class="' + this.options.name + '-label">' + input.label : '';
                                fLabel = input.label ? '</label>' : '';
                                input.value = input.value === undefined ? '' : input.value;
                                iId = input.id === undefined || input.id == '' ? '' : 'id="' + input.id + '"';
                                iRequired = input.required === undefined || input.required == false ? '' : 'required="true"';
                                iName = input.name === undefined ? this.options.name + '-select-' + i : input.name;
                                iOnChange = input.eventOnChange === undefined || input.eventOnChange == '' ? '' : 'onChange="' + input.eventOnChange + '"';
                                this.esqueleto.inputs.append($(iLabel + '<select name="' + iName + '" ' + iId + ' ' + iRequired + ' ' + iOnChange + '></select>' + fLabel));
                                $.each(input.options, $.proxy(function (ip, ap) {
                                    ap.value = ap.value === undefined ? '' : ap.value;
                                    iName = ap.name === undefined ? this.options.name + '-option-' + ip : ap.name;

                                    var selected = "";
                                    if (input.value == ap.value) {
                                        selected = "selected='selected'";
                                    }

                                    $('select[name=' + input.name + ']').append($('<option value="' + ap.value + '" '+selected+'>' + ap.label + '</option>'))
                                }, this));
                            } else if (input.type == 'PartialView' && options.type == 'PartialView') {
                                $("." + this.options.name + "-busy").show();
                                $.ajax({
                                    async: true,
                                    type: 'GET',
                                    url: input.url,
                                    success: $.proxy(function (data) {
                                        $(".jquery-msgbox").width("auto")
                                        this.esqueleto.inputs.append(data);
                                        this.moveBox();
                                        $("." + this.options.name + "-busy").hide();
                                    }, this)
                                });
                            }
                        }, this))
                    }
                    this.esqueleto.buttons = $('<div class="' + this.options.name + '-buttons"></div>');
                    this.esqueleto.form.append(this.esqueleto.buttons);
                    if (options.type == 'alert' || options.type == 'info' || options.type == 'error' || options.type == 'confirm') {
                        $.each(buttons, $.proxy(function (i, button) {
                            if (button.type == 'submit') {
                                this.esqueleto.buttons.append($('<button type="submit">' + button.value + '</button>').bind('click', $.proxy(function (e) {
                                    this.close(button.value);
                                    e.preventDefault()
                                }, this)))
                            } else if (button.type == 'cancel') {
                                this.esqueleto.buttons.append($('<button type="button">' + button.value + '</button>').bind('click', $.proxy(function (e) {
                                    //this.close(false); // Alterado por Heliton para evitar que o submit dê post nos formulários desnecessáriamente.
                                    this.close(button.value);
                                    e.preventDefault()
                                }, this)))
                            }
                        }, this))
                    } else if (options.type == 'prompt' || options.type == 'PartialView') {
                        $.each(buttons, $.proxy(function (i, button) {
                            if (button.type == 'submit') {
                                this.esqueleto.buttons.append($('<button type="submit">' + button.value + '</button>').bind('click', $.proxy(function (e) {
                                    if ($("input[required='true']").filter(function () { return this.value == ""; }).length > 0) {
                                        $("input[required='true']").filter(function () { return this.value == ""; }).first().focus();
                                        this.shake();
                                    } else if (!$("#" + this.options.name + "-form").valid()) {
                                        this.shake();
                                    } else if (options.type == 'PartialView') {
                                        $("." + this.options.name + "-busy").show();
                                        $.ajax({
                                            url: button.action,
                                            type: button.actionmethod,
                                            dataType: button.dataType,
                                            contextType: button.contextType,
                                            data: this.esqueleto.form.serialize(),
                                            success: $.proxy(function (data) {
                                                this.close(data);
                                                if (button.contextType == "json" || button.contextType == "application/json") {
                                                    if (data.sucesso) {
                                                        $.msgbox(txt + "<br />" + data.mensagem, {
                                                            type: "info",
                                                            buttons: [
                                                                { type: "submit", value: "Ok" },
                                                            ]
                                                        });
                                                    }
                                                    else {
                                                        $.msgbox(txt + "<br />" + data.mensagem, {
                                                            type: "error",
                                                            buttons: [
                                                                { type: "submit", value: "Ok" },
                                                            ]
                                                        });
                                                    }
                                                }
                                                else {
                                                    $.msgbox(txt + "<br />Opera&ccedil;&atilde;o concluida com sucesso." , {
                                                        type: "info",
                                                        buttons: [
                                                            { type: "submit", value: "Ok" },
                                                        ]
                                                    });
                                                }

                                            }, this), error: function () { alert('erro realizar a requisição.'); },
                                            complete: $.proxy(function () {
                                                $("." + this.options.name + "-busy").hide();

                                            }, this)
                                        });

                                    } else {
                                        this.close(this.toArguments($('input, select', this.esqueleto.inputs)));
                                    }

                                    e.preventDefault()

                                }, this)))
                            } else if (button.type == 'cancel') {
                                this.esqueleto.buttons.append($('<button type="button">' + button.value + '</button>').bind('click', $.proxy(function (e) {
                                    this.close(false);
                                    e.preventDefault()
                                }, this)))
                            }
                        }, this))
                    };
                    this.esqueleto.form.prepend(txt);
                    $.each(types, $.proxy(function (i, e) {
                        this.esqueleto.wrapper.removeClass(this.options.name + '-' + e)
                    }, this));
                    this.esqueleto.wrapper.addClass(this.options.name + '-' + options.type);
                    this.moveBox();
                    this.visible = true;
                    this.overlay.show();
                    this.esqueleto.msgbox.css({
                        display: 'block',
                        left: (($(document).width() - this.options.width) / 2)
                    });
                    this.moveBox();
                    setTimeout($.proxy(function () {
                        var b = $('input, button', this.esqueleto.msgbox);
                        if (b.length) {
                            b.get(0).focus()
                        }
                    }, this), this.options.moveDuration)
                }, this));
                this.i++;
                if (this.i == 1) {
                    this.esqueleto.msgbox.dequeue(this.options.name)
                }
                //Codigo Verifica email
            },
            toArguments: function (array) {
                return $.map(array, function (a) {
                    return $(a).val()
                })
            },
            moveBox: function () {
                var size = {
                    x: $(window).width(),
                    y: $(window).height()
                };
                var scroll = {
                    x: $(window).scrollLeft(),
                    y: $(window).scrollTop()
                };
                var height = this.esqueleto.msgbox.outerHeight();
                var y = 0;
                var x = 0;
                //y = scroll.x + ((size.x - this.options.width) / 2);
                y = scroll.x + ((size.x - $(".jquery-msgbox").css("width").replace('px', '')) / 2)
                if (this.options.emergefrom == "bottom") {
                    x = (scroll.y + size.y + 80)
                } else {
                    x = (scroll.y - height) - 80
                }
                if (this.visible) {
                    if (this.animation) {
                        this.animation.stop
                    }
                    //alert(y);
                    //alert($(".jquery-msgbox").css("width"));
                    this.animation = this.esqueleto.msgbox.animate({
                        left: y,
                        top: scroll.y + ((size.y - height) / 2)
                    }, {
                        duration: this.options.moveDuration,
                        queue: false,
                        easing: 'easeOutBack'
                    })
                } else {
                    this.esqueleto.msgbox.css({
                        top: x,
                        left: y
                    })
                }
            },
            close: function (param) {
                this.esqueleto.msgbox.css({
                    display: 'none',
                    top: 0
                });
                this.visible = false;
                if ($.isFunction(this.callback)) {
                    this.callback.apply(this, $.makeArray(param))
                }
                setTimeout($.proxy(function () {
                    this.i--;
                    this.esqueleto.msgbox.dequeue(this.options.name)
                }, this), this.options.closeDuration);
                if (this.i == 1) {
                    this.overlay.hide()
                }
                this.moveBox();
                this.esqueleto.form.empty()
            },
            shake: function () {
                var x = this.options.shake.distance;
                var d = this.options.shake.duration;
                var t = this.options.shake.transition;
                var o = this.options.shake.loops;
                var l = this.esqueleto.msgbox.position().left;
                var e = this.esqueleto.msgbox;
                for (i = 0; i < o; i++) {
                    e.animate({
                        left: l + x
                    }, d, t);
                    e.animate({
                        left: l - x
                    }, d, t)
                };
                e.animate({
                    left: l + x
                }, d, t);
                e.animate({
                    left: l
                }, d, t)
            }
        },
        msgbox: function (txt, options, callback) {
            return $.MsgBoxObject.show(txt, options, callback)
        }
    });
    $(function () {
        $.MsgBoxObject.create();
    })
})(jQuery);