Vue.component('fileUploader', {
	template: `
		<div>
			<input type="file" id="input-file" @change="getFile">
		</div>
	`,
	data() {
		return {

		}
	},
	methods: {
		getFile(event) {
			const input = event.target
			if ('files' in input && input.files.length > 0) {
				const file = input.files[0];
				readFileContent(file).then(content => {
					this.generateSet(content)
				}).catch(error => console.log(error))
			}
		},
		generateSet(content) {
			const parsedContent = content.split('\n');
			if (parsedContent) {
				let map = null;
				const mountains = [];
				const treasureSpots = [];
				const adventurers = [];
				for (let i = 0; i < parsedContent.length; i++) {
					let line = parsedContent[i];
					if (line.charAt(0) !== '#') {
						line = line.replace(/\s+/g, '');
						const array = line.split('-');
						console.log(array);
						const modelDeterminer = array[0];
						switch (modelDeterminer) {
							case 'C':
								map = new Map(array[1], array[2]);
								break;
							case 'M':
								mountains.push(new Mountain(array[1], array[2]));
								break;
							case 'T':
								treasureSpots.push(new TreasureSpot(array[1], array[2], array[3]));
								break;
							case 'A':
								adventurers.push(new Adventurer(array[1], array[2], array[3], array[4], array[5]));
								break;
						}
					}
				}
				const gameSet = new GameSet(map, mountains, treasureSpots, adventurers);
				this.$emit('gameset', gameSet);
			}
		}
	}
})

// TODO
// function getFile(event) {
// 	const input = event.target
//   if ('files' in input && input.files.length > 0) {
// 	  // placeFileContent(document.getElementById('content-target'), input.files[0])
// 		const file = input.files[0];
// 		readFileContent(file).then(content => {
// 			console.log(content)
// 			console.log(typeof content)
// 		}).catch(error => console.log(error))
//   }
// }

function readFileContent(file) {
	const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result)
    reader.onerror = error => reject(error)
    reader.readAsText(file)
  })
}
