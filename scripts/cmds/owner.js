const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
	config: {
		name: "owner",
		author: "♡︎ 𝗦𝗵𝗔𝗻 ♡︎",
		role: 0,
		shortDescription: " ",
		longDescription: "",
		category: "admin",
		guide: "{pn}"
	},

	onStart: async function ({ api, event }) {
		try {
			const ownerInfo = {
				name: '𝑬𝒘𝑹 ħA＄AǸ',
				gender: '𝑴𝒂𝑳𝒆',
				Birthday: '13-𝟎𝟕-𝟐𝟎𝟎8',
				religion: '𝙄𝒔𝒍𝑨𝒎',
				hobby: 'ＧA๓ÏǸＧ',
				Wp: '01      bakida dimu na',
				Relationship: 'একজন এর মায়ায় বন্ধী😉',
				Height: '5"8'
			};

			const bold = 'https://drive.google.com/uc?export=download&id=1J4yQ13L2WTpdOuqcP0yEmzULACdwfvnQ';
			const tmpFolderPath = path.join(__dirname, 'tmp');

			if (!fs.existsSync(tmpFolderPath)) {
				fs.mkdirSync(tmpFolderPath);
			}

			const videoResponse = await axios.get(bold, { responseType: 'arraybuffer' });
			const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

			fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

			const response = `
◈ 𝖮𝖶𝖭𝖤𝖱 𝖨𝖭𝖥𝖮𝖱𝖬𝖠𝖳𝖨𝖮𝖭:\n
 ~Name: ${ownerInfo.name}
 ~Gender: ${ownerInfo.gender}
 ~Birthday: ${ownerInfo.Birthday}
 ~Religion: ${ownerInfo.religion}
 ~Relationship: ${ownerInfo.Relationship}
 ~Hobby: ${ownerInfo.hobby}
 ~Wp: ${ownerInfo.Wp}
 ~Height: ${ownerInfo.Height}
			`;

			await api.sendMessage({
				body: response,
				attachment: fs.createReadStream(videoPath)
			}, event.threadID, event.messageID);
			
			fs.unlinkSync(videoPath);

			api.setMessageReaction('😍', event.messageID, (err) => {}, true);
		} catch (error) {
			console.error('Error in ownerinfo command:', error);
			return api.sendMessage('An error occurred while processing the command.', event.threadID);
		}
	},

	onChat: async function ({ api, event }) {
		if (event.body && event.body.toLowerCase() === "owner") {
			this.onStart({ api, event });
		}
	}
};
