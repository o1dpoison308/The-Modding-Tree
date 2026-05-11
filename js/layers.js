/*
                     
   mmmmmmm    mmmmmmm   
 mm:::::::m  m:::::::mm 
m::::::::::mm::::::::::m
m::::::::::::::::::::::m
m:::::mmm::::::mmm:::::m
m::::m   m::::m   m::::m
m::::m   m::::m   m::::m
m::::m   m::::m   m::::m
m::::m   m::::m   m::::m
m::::m   m::::m   m::::m
m::::m   m::::m   m::::m
mmmmmm   mmmmmm   mmmmmm
                    
*/
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


addLayer("p", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},                     // Returns a bool for if this layer's node should be visible in the tree.
    color: "#4BDC13",                       // The color for this layer, which affects many elements.
    resource: "点数名字",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).
    requires() { return new Decimal(100) },          // A function that returns the requirement for resetting the layer.
    baseResource: "Aur",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
})