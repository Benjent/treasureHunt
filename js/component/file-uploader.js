/**
 * Component that handles the file upload and the gameSet generation from the file.
 */
Vue.component('fileUploader', {
	template: `
		<div>
			<input type="file" id="input-file" @change="getFile">
		</div>
	`,
	methods: {
		/**
		 * Retrieve the file from the input.
		 * Then read the file content and trigger the gameSet generation.
		 * @param {object} event - The event from the input change.
		 */
		getFile(event) {
			const input = event.target;

			if ('files' in input && input.files.length > 0) {
				const file = input.files[0];

				readFileContent(file).then(content => {
					this.generateSet(content)
				}).catch(error => console.log(error));
			}
		},
		/**
		 * Generate the gameSet according to the data of the entry file by extracting data line by line.
		 * @param {string} content - The data of the entry file.
		 */
		generateSet(content) {
			// Split game data line by line
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

						// The first character of the line determines the model
						const modelDeterminer = array[0];
						switch (modelDeterminer) {
							case MODEL.C:
								map = new MadreDeDiosMap(array[1], array[2]);
								break;
							case MODEL.M:
								mountains.push(new Mountain(array[1], array[2]));
								break;
							case MODEL.T:
								treasureSpots.push(new TreasureSpot(array[1], array[2], array[3]));
								break;
							case MODEL.A:
								adventurers.push(new Adventurer(array[1], array[2], array[3], array[4], array[5]));
								break;
							default:
								console.error(`Unable to create model off line ${++i} of the entry file.`);
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

// TODO make it vue.js
function readFileContent(file) {
	const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result)
    reader.onerror = error => reject(error)
    reader.readAsText(file)
  })
}
