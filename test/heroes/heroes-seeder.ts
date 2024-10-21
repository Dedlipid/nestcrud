import {NestFactory} from "@nestjs/core";
import {AppModule} from "../../src/app.module";
import {HeroesService} from "../../src/heroes/heroes.service";
import {Hero} from "../../src/heroes/entities/hero.entity";
import {faker, he, SexType} from '@faker-js/faker';
import {CreateHeroDto} from "../../src/heroes/dto/create-hero.dto";

const races = [
    "Elf",
    "Dwarf",
    "Orc",
    "Goblin",
    "Troll",
    "Gnome",
    "Halfling",
    "Vampire",
    "Werewolf",
    "Zombie",
    "Ghost",
    "Witch",
    "Warlock",
    "Fairy",
    "Pixie",
    "Dragon",
    "Demon",
    "Angel",
    "Mermaid",
    "Centaur",
    "Minotaur",
    "Satyr",
    "Gorgon",
    "Cyclops",
    "Ogre",
    "Kobold",
    "Djinn",
    "Naga",
    "Griffin",
    "Phoenix",
    "Lich",
    "Wight",
    "Banshee",
    "Dryad",
    "Nymph",
    "Siren",
    "Harpy",
    "Chimera",
    "Sphinx",
    "Pegasus",
    "Unicorn",
    "Giant",
    "Elemental",
    "Yeti",
    "Kraken",
    "Triton",
    "Imp",
    "Ghoul",
    "Skeleton",
    "Gargoyle",
    "Manticore",
    "Rakshasa",
    "Efreet",
    "Sylph",
    "Ifrit",
    "Wendigo",
    "Selkie",
    "Kitsune",
    "Tanuki",
    "Tengu",
    "Basilisk",
    "Behemoth",
    "Fenrir",
    "Fomorian",
    "Huldra",
    "Jotun",
    "Leviathan",
    "Myrmidon",
    "Nephilim",
    "Oni",
    "Rakshasa",
    "Yokai",
    "Wraith",
    "Anubite",
    "Lamia",
    "Valkyrie",
    "Shapeshifter",
    "Changeling",
    "Gremlin",
    "Sprite",
    "Brownie",
    "Kelpie",
    "Boggart",
    "Golem",
    "Homunculus",
    "Genasi",
    "Tiefling",
    "Aasimar",
    "Dragonborn",
    "Tabaxi",
    "Kenku",
    "Firbolg",
    "Bugbear",
    "Aarakocra",
    "Lizardfolk",
    "Triton",
    "Githyanki",
    "Githzerai",
    "Modron",
    "Warforged",
    "Vedalken",
    "Loxodon",
    "Simic Hybrid",
    "Merfolk",
    "Vedalken",
    "Thri-Kreen",
    "Illithid",
    "Beholder",
    "Kender",
    "Twi'lek",
    "Wookiee",
    "Chiss",
    "Rodian",
    "Zabrak",
    "Mon Calamari",
    "Jawa",
    "Ewok",
    "Kel Dor",
    "Nautolan",
    "Bothan",
    "Gamorrean",
    "Trandoshan",
    "Devaronian",
    "Cathar",
    "Hutt",
    "Mirialan",
    "Togruta",
    "Aqualish",
    "Duros",
    "Arkanian",
    "Sith Pureblood",
    "Vorta",
    "Jem'Hadar",
    "Cardassian",
    "Bajoran",
    "Andorian",
    "Klingon",
    "Ferengi",
    "Romulan",
    "Vulcan",
    "Borg",
    "El-Aurian",
    "Betazoid",
    "Ocampan",
    "Q",
    "Species 8472",
    "Talaxian",
    "Trill",
    "Zindi",
    "Pakled"
]

function createRace() {
    return races[Math.floor(Math.random() * races.length)]
}

async function seed() {
    const app = await NestFactory.create(AppModule);
    const heroService = app.get(HeroesService)
    for (let i = 0; i < 1000; i++) {
        const hero = new CreateHeroDto()
        hero.gender = faker.person.sex();
        hero.name = faker.person.fullName({
            sex: hero.gender as SexType
        })
        hero.race = createRace();
        hero.bio = faker.person.bio();
        hero.maxHealth = Math.random() < 0.01 ? faker.number.int({
            min: 1_000_000,
            max: 100_000_000,
        }) : faker.number.int(1_000_000);
        hero.currentHealth = hero.maxHealth
        hero.attack = Math.random() < 0.01 ? faker.number.int({
            min: 100_000,
            max: 1_000_000,
        }) : faker.number.int(100_000)
        hero.defense = Math.random() < 0.01 ? faker.number.int({
            min: 100_000,
            max: 1_000_000,
        }) : faker.number.int(100_000)
        hero.healthRestoreRate = Math.random() < 0.01 ? faker.number.int({
            min: 10_000,
            max: 100_000,
        }) : faker.number.int(10_000)
        await heroService.create(hero)
        console.log(i)
    }
}

seed()
