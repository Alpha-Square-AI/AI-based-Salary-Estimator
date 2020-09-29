sap.ui.define(["sap/ui/core/Control", "sap/m/Button", "sap/ui/core/IconPool", "sap/m/Dialog", "sap/m/List", "sap/m/FeedListItem",
	"sap/m/FeedInput", "sap/m/ResponsivePopover", "sap/m/VBox", "sap/m/ScrollContainer", "sap/m/Bar", "sap/m/Title",
	"sap/ui/core/ResizeHandler"
], function (t, e, o, s, i, n, a, r, p, g, u, l, h) {
	var d = t.extend("seSalaryEstimator.extras.ChatDialog", {
		metadata: {
			properties: {
				title: {
					type: "string",
					group: "Appearance",
					defaultValue: null
				},
				width: {
					type: "sap.ui.core.CSSSize",
					group: "Dimension",
					defaultValue: null
				},
				height: {
					type: "sap.ui.core.CSSSize",
					group: "Dimension",
					defaultValue: null
				},
				buttonIcon: {
					type: "sap.ui.core.URI",
					group: "Appearance",
					defaultValue: null
				},
				robotIcon: {
					type: "sap.ui.core.URI",
					group: "Appearance",
					defaultValue: null
				},
				userIcon: {
					type: "sap.ui.core.URI",
					group: "Appearance",
					defaultValue: null
				},
				initialMessage: {
					type: "string",
					group: "Appearance",
					defaultValue: "Hello, How can I help?"
				},
				placeHolder: {
					type: "string",
					group: "Appearance",
					defaultValue: "Post something here"
				}
			},
			aggregations: {
				_chatButton: {
					type: "sap.m.Button",
					multiple: false
				},
				_popover: {
					type: "sap.m.ResponsivePopover",
					multiple: false
				}
			},
			events: {
				send: {
					parameters: {
						text: {
							type: "string"
						}
					}
				}
			}
		},
		init: function () {
			var t = jQuery.sap.getModulePath("seSalaryEstimator");
			jQuery.sap.includeStyleSheet(t + "/css/bkChat.css");
			var o = new e(this.getId() + "-bkChatButton", {
				icon: "sap-icon://discussion",
				press: this._onOpenChat.bind(this)
			});
			o.addStyleClass("chatButton");
			this.setAggregation("_chatButton", o);
			var s = new u({
				contentLeft: new e({
					icon: "sap-icon://sys-cancel",
					press: this._toggleClose.bind(this),
					tooltip: "Clear chat"
				}),
				contentMiddle: new l(this.getId() + "-bkChatTitle", {}),
				contentRight: new e({
					icon: "sap-icon://pushpin-off",
					press: this._toggleAutoClose.bind(this),
					tooltip: "Toggle"
				})
			});
			var d = new r(this.getId() + "-bkChatPop", {
				customHeader: s,
				placement: "Top",
				showArrow: false,
				/*modal: true,*/
				showHeader: true,
				resizable: true,
				horizontalScrolling: false,
				verticalScrolling: false,
				beforeClose: function (t) {
					h.deregister(this.sResizeHandleId)
				}.bind(this),
				afterOpen: function (t) {
					this.sResizeHandleId = h.register(sap.ui.getCore().byId(this.getId() + "-bkChatPop"), this._saveDimensions.bind(this))
				}.bind(this)
			}).addStyleClass("sapUiTinyMargin");
			this.setAggregation("_popover", d);
			var c = new a(this.getId() + "-bkChatInput", {
				post: this._onPost.bind(this),
				showicon: true
			}).addStyleClass("proceed");

			c.addEventDelegate({
				onsapenter: function (t) {
					t.preventDefault();
					var e = c.getValue();
					if (e.length > 0) {
						c.fireEvent("post", {
							value: e
						}, true, false);
						c.setValue(null)
					}
				}
			});
			var I = new i(this.getId() + "-bkChatList", {
				showSeparators: "None",
				showNoData: false
			});
			var C = new n(this.getId() + "-bkChatInitial", {
				showicon: true,
				text: "Hello, how can I help you?"
			});
			C.addStyleClass("bkRobotInput");
			I.addItem(C);
			var b = new g(this.getId() + "-bkChatScroll", {
				horizontal: false,
				vertical: true,
				focusable: true
			});
			b.insertContent(I);
			var y = new sap.m.Label(this.getId() + "-bkChatStatusBar", {
				text: ""
			}).addStyleClass("sapUiTinyMargin");
			var f = new p({
				items: [b, y, c],
				fitContainer: true,
				justifyContent: "End",
				alignItems: "Stretch"
			});
			d.insertContent(f, 0)
		},
		renderer: function (t, e) {
			var o = e.getAggregation("_chatButton");
			var s = e.getAggregation("_popover");
			t.write("<div ");
			t.write(">");
			t.renderControl(o);
			t.renderControl(s);
			t.write("</div>")
		},
		onAfterRendering: function (t) {
			if (sap.ui.core.Control.prototype.onAfterRendering) {
				sap.ui.core.Control.prototype.onAfterRendering.apply(this, t)
			}
		},
		setTitle: function (t) {
			this.setProperty("title", t, true);
			sap.ui.getCore().byId(this.getId() + "-bkChatTitle").setText(t)
		},
		setHeight: function (t) {
			this.setProperty("height", t, true);
			sap.ui.getCore().byId(this.getId() + "-bkChatPop").setContentHeight(t);
			var e = t.substring(0, t.length - 2) - "96px".substring(0, "96px".length - 2);
			sap.ui.getCore().byId(this.getId() + "-bkChatScroll").setHeight(e + "px")
		},
		setWidth: function (t) {
			this.setProperty("width", t, true);
			sap.ui.getCore().byId(this.getId() + "-bkChatPop").setContentWidth(t)
		},
		setUserIcon: function (t) {
			this.setProperty("userIcon", t, true);
			sap.ui.getCore().byId(this.getId() + "-bkChatInput").setIcon(t)
		},
		setRobotIcon: function (t) {
			this.setProperty("robotIcon", t, true);
			sap.ui.getCore().byId(this.getId() + "-bkChatInitial").setIcon(t)
		},
		setButtonIcon: function (t) {},
		setInitialMessage: function (t) {
			this.setProperty("initialMessage", t, true);
			sap.ui.getCore().byId(this.getId() + "-bkChatInitial").setText(t)
		},
		setPlaceHolder: function (t) {
			this.setProperty("placeHolder", t, true);
			sap.ui.getCore().byId(this.getId() + "-bkChatInput").setPlaceholder(t)
		},
		_onPost: function (t) {
			var e = this;
			setTimeout(function () {
				e.botStartTyping()
			}, 1e3);
			var o = t.getSource().getValue();
			this.addChatItem(o, true);
			this.fireEvent("send", {
				text: o
			}, false, true)
		},
		_onOpenChat: function (t) {
			this.getAggregation("_popover").openBy(this.getAggregation("_chatButton"));
			this.getAggregation("_popover").setContentHeight(this.getProperty("height"));
			this.getAggregation("_popover").setContentWidth(this.getProperty("width"))
		},
		_saveDimensions: function (t) {
			this.setProperty("height", t.size.height + "px", true);
			this.setProperty("width", t.size.width + "px", true)
		},
		_toggleAutoClose: function (t) {
			var e = this.getAggregation("_popover").getAggregation("_popup").oPopup.getAutoClose();
			if (e) {
				t.getSource().setProperty("icon", "sap-icon://pushpin-on");
				this.getAggregation("_popover").getAggregation("_popup").oPopup.setAutoClose(false)
			} else {
				t.getSource().setProperty("icon", "sap-icon://pushpin-off");
				this.getAggregation("_popover").getAggregation("_popup").oPopup.setAutoClose(true)
			}
		},
		_toggleClose: function () {
			sap.ui.getCore().byId(this.getId() + "-bkChatList").removeAllItems();
			this.getAggregation("_popover").close()
		},
		botStartTyping: function () {
			sap.ui.getCore().byId(this.getId() + "-bkChatStatusBar").setText("Bot is typing...")
		},
		botFinishTyping: function () {
			sap.ui.getCore().byId(this.getId() + "-bkChatStatusBar").setText("")
		},
		addChatItem: function (t, e) {
			var o = new n({
				showicon: true,
				text: t
			});
			if (e) {
				o.setIcon(this.getUserIcon());
				o.addStyleClass("bkUserInput");
				sap.ui.getCore().byId(this.getId() + "-bkChatList").addItem(o, 0)
			} else {
				o.setIcon(this.getRobotIcon());
				o.addStyleClass("bkRobotInput");
				sap.ui.getCore().byId(this.getId() + "-bkChatList").addItem(o, 0)
			}
			var s = sap.ui.getCore().byId(this.getId() + "-bkChatScroll");
			setTimeout(function () {
				s.scrollTo(0, 1e3, 0)
			}, 0)
		}
	});
	return d
});