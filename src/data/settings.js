export const defaultPreferencesC = {
	upperClothing: {
		values: [-10, 0, 10, 20],
	},
	upperClothingLayer: {
		values: [-10, 0, 10, 20],
		jacketIfSnow: true,
		coverIfSunAndUvThreshold: { enabled: true, value: 3 },
	},
	lowerClothing: {
		values: [-10, 0, 10, 20],
		rainNoShorts: true,
		trousersIfSnow: true,
	},
	boots: {
		values: [0, 10, 20],
		rainNoSandals: true,
		bootsIfSnow: true,
	},
	accessories: {
		umbrella: {
			rain: true,
		},
		sunglasses: {
			ifUvThreshold: { enabled: true, value: 3 },
		},
		sunHat: {
			ifUvThreshold: { enabled: true, value: 3 },
		},
		gloves: {
			ifTempThreshold: { enabled: true, value: 0 },
			ifSnow: true,
		},
	},
	miscellaneous: {
		spf: {
			ifUvThreshold: { enabled: true, value: 3 },
		},
		mask: {
			ifAqiThreshold: { enabled: true, value: 20 },
		},
		water: {
			ifTempThreshold: { enabled: true, value: 20 },
			always: true,
		},
		electronicsOverheat: {
			ifTempThreshold: { enabled: true, value: 30 },
		},
		windows: {
			openIfTempThreshold: { enabled: true, minValue: 15, maxValue: 25 },
			openIfAqiThreshold: { enabled: true, value: 20 },
			closeIfRainOrSnow: true,
		},
	},
};

export const defaultPreferencesF = {
	upperClothing: {
		values: [14, 32, 50, 68],
	},
	upperClothingLayer: {
		values: [14, 32, 50, 68],
		jacketIfSnow: true,
		coverIfSunAndUvThreshold: { enabled: true, value: 3 },
	},
	lowerClothing: {
		values: [14, 32, 50, 68],
		rainNoShorts: true,
		trousersIfSnow: true,
	},
	boots: {
		values: [32, 50, 68],
		rainNoSandals: true,
		bootsIfSnow: true,
	},
	accessories: {
		umbrella: {
			rain: true,
		},
		sunglasses: {
			ifUvThreshold: { enabled: true, value: 3 },
		},
		sunHat: {
			ifUvThreshold: { enabled: true, value: 3 },
		},
		gloves: {
			ifTempThreshold: { enabled: true, value: 68 },
			ifSnow: true,
		},
	},
	miscellaneous: {
		spf: {
			ifUvThreshold: { enabled: true, value: 3 },
		},
		mask: {
			ifAqiThreshold: { enabled: true, value: 20 },
		},
		water: {
			ifTempThreshold: { enabled: true, value: 68 },
			always: true,
		},
		electronicsOverheat: {
			ifTempThreshold: { enabled: true, value: 86 },
		},
		windows: {
			openIfTempThreshold: { enabled: true, minValue: 59, maxValue: 77 },
			openIfAqiThreshold: { enabled: true, value: 20 },
			closeIfRainOrSnow: true,
		},
	},
};
