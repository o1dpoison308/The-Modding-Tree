addLayer("m", {
    name: "Malkuth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#808000",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "Physical Matter", // Name of prestige currency
    baseResource: "Aur", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for Physical Matter", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
        title: "双倍",
        description: "点数获取翻倍",
        cost: new Decimal(1),
        },
        12: {
        title: "快一些",
        description: "基于PM，Aur获取更快",
        cost: new Decimal(2),
            effect() {
        return player[this.layer].points.add(1).pow(0.5)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
        title: "加速",
        description: "基于Aur，Aur获取更快",
        cost: new Decimal(5),
            effect() {
        return player.points.add(1).pow(0.15)
        },
            gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('m', 13)) mult = mult.times(upgradeEffect('m', 13))
        return mult
        },
        },


    }
})
