sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	var that;
	return Controller.extend("seSalaryEstimator.controller.ReportDashboard", {

		onInit: function() {
			that = this;
			this.conversationID = Math.random();
		},

		onChatPress: function() {
			var chatbot = this.getView().byId("botchat");
			chatbot._onOpenChat();
			var oScroll = sap.ui.getCore().byId(this.getId() + "-bkChatScroll");
			setTimeout(function() {
				oScroll.scrollTo(0, 1e3, 0);
			}, 0);
		},
		onSendPressed: function(oEvent) {
			var userText = oEvent.getParameter("text");
			that.onGetBotResponse(userText);
		},

		onGetBotResponse: function(userText) {
			var chatbot = that.getView().byId("botchat");

			var payload = '{"message": {"content":"' + userText + '","type":"text"}, "conversation_id": ' + this.conversationID + "}";
			$.ajax({
				url: "https" + "://d1062ca3c79d.ngrok.io/botQueries",
				type: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				data: payload,
				async: true,
				crossDomain: true,
				success: function(iData) {

					for (var o = 0; o < JSON.parse(iData).results.messages.length; o++) {
						chatbot.addChatItem(JSON.parse(iData).results.messages[o].content, false);
					}
					var oScroll = sap.ui.getCore().byId(this.getId() + "-bkChatScroll");
					setTimeout(function() {
						oScroll.scrollTo(0, 1e3, 0);
					}, 0);
					chatbot.botFinishTyping();
				},
				error: function(error) {
					chatbot.addChatItem("Something error!", false);
				}
			});
		}
	});
});