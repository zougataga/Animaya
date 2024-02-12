import Agenda from '../../src/components/Agenda';
import Error from '../../src/components/Error';
import { Fetch } from '../../src/lib/Fetch';
function tabAgenda() {
    const { data, loading } = Fetch({ url: '/api/~/-', method: 'POST', body: { type: 'Home', agenda: true } });
    if (!loading && (!data || data?.error)) return <Error />;
    // const data = {
    //     calendrier: {
    //         'lundi': [
    //             {
    //                 'name': 'Detective Conan',
    //                 'id': 'detective-conan',
    //                 'saison': 'saison28',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/detective-conan.jpg',
    //                 'heure': '19h00',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'High Card',
    //                 'id': 'high-card',
    //                 'saison': 'saison2',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/high-card.jpg',
    //                 'heure': '19h00',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'TSUKIMICHI -Moonlit Fantasy',
    //                 'id': 'tsukimichi-moonlit-fantasy',
    //                 'saison': 'saison2',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/tsukimichi-moonlit-fantasy.jpg',
    //                 'heure': '19h00',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Synduality Noir',
    //                 'id': 'synduality-noir',
    //                 'saison': 'saison1-2',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/synduality-noir.jpg',
    //                 'heure': '19h00',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': ''Tis Time for 'Torture' Princess',
    //                 'id': 'tis-time-for-torture-princess',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/tis-time-for-torture-princess.jpg',
    //                 'heure': '19h00',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Hokkaido Gals Are Super Adorable!',
    //                 'id': 'hokkaido-gals-are-super-adorable',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/hokkaido-gals-are-super-adorable.jpg',
    //                 'heure': '19h15',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Oroka na Tenshi wa Akuma to Odoru',
    //                 'id': 'oroka-na-tenshi-wa-akuma-to-odoru',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/oroka-na-tenshi-wa-akuma-to-odoru.jpg',
    //                 'heure': '19h30',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Noble New World Adventures',
    //                 'id': 'noble-new-world-adventures',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/noble-new-world-adventures.jpg',
    //                 'heure': '23h00',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Dandadan',
    //                 'id': 'dandadan',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/dandadan.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             }
    //         ],
    //         'mardi': [
    //             {
    //                 'name': 'Villainess Level 99',
    //                 'id': 'villainess-level-99',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/villainess-level-99.jpg',
    //                 'heure': '18h45',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Shaman King Flowers',
    //                 'id': 'shaman-king',
    //                 'saison': 'saison2',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/shaman-king.jpg',
    //                 'heure': '18h45',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Chainsaw Man',
    //                 'id': 'chainsaw-man',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/chainsaw-man.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             },
    //             {
    //                 'name': 'Hero Killer',
    //                 'id': 'hero-killer',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/hero-killer.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             },
    //             {
    //                 'name': 'Return to Player',
    //                 'id': 'return-to-player',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/return-to-player.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             },
    //             {
    //                 'name': 'Villain to Kill',
    //                 'id': 'villain-to-kill',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/villain-to-kill.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             },
    //             {
    //                 'name': 'Lookism',
    //                 'id': 'lookism',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/lookism.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             }
    //         ],
    //         'mercredi': [
    //             {
    //                 'name': 'Classroom of the Elite',
    //                 'id': 'classroom-of-the-elite',
    //                 'saison': 'saison3',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/classroom-of-the-elite.jpg',
    //                 'heure': '17h15',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Jaku-Chara Tomozaki-kun',
    //                 'id': 'jaku-chara-tomozaki-kun',
    //                 'saison': 'saison2',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/jaku-chara-tomozaki-kun.jpg',
    //                 'heure': '17h15',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Surgeon Elise',
    //                 'id': 'surgeon-elise',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/surgeon-elise.jpg',
    //                 'heure': '17h15',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Ishura',
    //                 'id': 'ishura',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/ishura.jpg',
    //                 'heure': '18h00',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Sengoku Youko',
    //                 'id': 'sengoku-youko',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/sengoku-youko.jpg',
    //                 'heure': '18h00',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Cherry Magic',
    //                 'id': 'cherry-magic',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/cherry-magic.jpg',
    //                 'heure': '19h00',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Metallic Rouge',
    //                 'id': 'mettalic-rouge',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/mettalic-rouge.jpg',
    //                 'heure': '20h00',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Metallic Rouge',
    //                 'id': 'mettalic-rouge',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/mettalic-rouge.jpg',
    //                 'heure': '20h15',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Classroom of the Elite',
    //                 'id': 'classroom-of-the-elite',
    //                 'saison': 'saison3',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/classroom-of-the-elite.jpg',
    //                 'heure': '22h00',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Hajime no Ippo',
    //                 'id': 'hajime-no-ippo',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/hajime-no-ippo.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             },
    //             {
    //                 'name': 'ZOMGAN',
    //                 'id': 'zomgan',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/zomgan.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             },
    //             {
    //                 'name': 'Viral Hit',
    //                 'id': 'viral-hit',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/viral-hit.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             }
    //         ],
    //         'jeudi': [
    //             {
    //                 'name': 'Demon Slave',
    //                 'id': 'demon-slave',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/demon-slave.jpg',
    //                 'heure': '17h30',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Dungeon Meshi',
    //                 'id': 'dungeon-meshi',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/dungeon-meshi.jpg',
    //                 'heure': '17h45',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Dungeon Meshi',
    //                 'id': 'dungeon-meshi',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/dungeon-meshi.jpg',
    //                 'heure': '17h45',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'My Instant Death Ability Is So Overpowered',
    //                 'id': 'my-instant-death-ability-is-so-overpowered',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/my-instant-death-ability-is-so-overpowered.jpg',
    //                 'heure': '18h00',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Gekkan Mousou Kagaku',
    //                 'id': 'gekkan-mousou-kagaku',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/gekkan-mousou-kagaku.jpg',
    //                 'heure': '18h00',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Urusei Yatsura',
    //                 'id': 'urusei-yatsura',
    //                 'saison': 'saison2',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/urusei-yatsura.jpg',
    //                 'heure': '19h00',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Majo to Yajuu',
    //                 'id': 'majo-to-yajuu',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/majo-to-yajuu.jpg',
    //                 'heure': '20h50',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Jujutsu Kaisen',
    //                 'id': 'jujutsu-kaisen',
    //                 'saison': 'saison2',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/jujutsu-kaisen.jpg',
    //                 'heure': '23h30',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'One Piece',
    //                 'id': 'one-piece',
    //                 'saison': 'scan_noir-et-blanc',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/one-piece.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             },
    //             {
    //                 'name': 'Kaiju No.8',
    //                 'id': 'kaiju-n8',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/kaiju-n8.jpg',
    //                 'heure': '?',
    //                 'probleme': 'Reporté',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             },
    //             {
    //                 'name': 'Eden's Zero',
    //                 'id': 'edens-zero',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/edens-zero.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             },
    //             {
    //                 'name': 'Hardcore Leveling Warrior',
    //                 'id': 'hardcore-leveling-warrior',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/hardcore-leveling-warrior.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             },
    //             {
    //                 'name': 'Jungle Juice',
    //                 'id': 'jungle-juice',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/jungle-juice.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             },
    //             {
    //                 'name': 'The Warrior Returns',
    //                 'id': 'the-warrior-returns',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/the-warrior-returns.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             }
    //         ],
    //         'vendredi': [
    //             {
    //                 'name': 'Sasaki to P-chan',
    //                 'id': 'sasaki-to-p-chan',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/sasaki-to-p-chan.jpg',
    //                 'heure': '17h00',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'The Undead Unwanted Adventurer',
    //                 'id': 'the-unwanted-undead-adventurer',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/the-unwanted-undead-adventurer.jpg',
    //                 'heure': '17h00',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'The Weakest Tamer Began a Journey to Pick Up Trash',
    //                 'id': 'the-weakest-tamer-began-a-journey-to-pick-up-trash',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/the-weakest-tamer-began-a-journey-to-pick-up-trash.jpg',
    //                 'heure': '17h00',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'The Weakest Tamer Began a Journey to Pick Up Trash',
    //                 'id': 'the-weakest-tamer-began-a-journey-to-pick-up-trash',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/the-weakest-tamer-began-a-journey-to-pick-up-trash.jpg',
    //                 'heure': '17h15',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Frieren',
    //                 'id': 'frieren',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/frieren0.jpg',
    //                 'heure': '17h30',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'The Wrong Way to Use Healing Magic',
    //                 'id': 'the-wrong-way-to-use-healing-magic',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/the-wrong-way-to-use-healing-magic.jpg',
    //                 'heure': '18h30',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'The Demon Prince and Momochi',
    //                 'id': 'the-demon-prince-and-momochi',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/the-demon-prince-and-momochi.jpg',
    //                 'heure': '19h00',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Pon no Michi',
    //                 'id': 'pon-no-michi',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/pon-no-michi.jpg',
    //                 'heure': '19h30',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Snack Basue',
    //                 'id': 'snack-basue',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/snack-basue.jpg',
    //                 'heure': '19h50',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Frieren',
    //                 'id': 'frieren',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/frieren0.jpg',
    //                 'heure': '23h30',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'My Hero Academia',
    //                 'id': 'my-hero-academia',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/my-hero-academia.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             },
    //             {
    //                 'name': 'Jujutsu Kaisen',
    //                 'id': 'jujutsu-kaisen',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/jujutsu-kaisen.jpg',
    //                 'heure': '?',
    //                 'probleme': 'Reporté',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             },
    //             {
    //                 'name': 'Lookism',
    //                 'id': 'lookism',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/lookism.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             }
    //         ],
    //         'samedi': [
    //             {
    //                 'name': 'Firefighter Daigo: Rescuer in Orange',
    //                 'id': 'firefighter-daigo-rescuer-in-orange',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/firefighter-daigo-rescuer-in-orange.jpg',
    //                 'heure': '12h00',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Tales of Wedding Rings',
    //                 'id': 'tales-of-wedding-rings',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/tales-of-wedding-rings.jpg',
    //                 'heure': '15h30',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'A Sign of Affection',
    //                 'id': 'a-sign-of-affection',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/a-sign-of-affection.jpg',
    //                 'heure': '16h30',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Ragna Crimson',
    //                 'id': 'ragna-crimson',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/ragna-crimson.jpg',
    //                 'heure': '17h30',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'BUCCHIGIRI?!',
    //                 'id': 'bucchigiri',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/bucchigiri.jpg',
    //                 'heure': '18h30',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Mashle',
    //                 'id': 'mashle',
    //                 'saison': 'saison2',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/mashle.jpg',
    //                 'heure': '18h30',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Solo Leveling',
    //                 'id': 'solo-leveling',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/solo-leveling0.jpg',
    //                 'heure': '19h00',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Boku no Kokoro no Yabai',
    //                 'id': 'boku-no-kokoro-no-yabai-yatsu',
    //                 'saison': 'saison2',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/boku-no-kokoro-no-yabai-yatsu.jpg',
    //                 'heure': '19h30',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Heat the Pig Liver',
    //                 'id': 'heat-the-pig-liver',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/heat-the-pig-liver.jpg',
    //                 'heure': '19h30',
    //                 'probleme': 'Reporté',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Blue Exorcist',
    //                 'id': 'blue-exorcist',
    //                 'saison': 'saison3',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/blue-exorcist.jpg',
    //                 'heure': '19h30',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Les Carnets de l'apothicaire',
    //                 'id': 'les-carnets-de-lapothicaire',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/les-carnets-de-lapothicaire.jpg',
    //                 'heure': '20h15',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Kingdom',
    //                 'id': 'kingdom',
    //                 'saison': 'saison5',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/kingdom.jpg',
    //                 'heure': '20h30',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Saikyou Tank no Meikyuu Kouryaku',
    //                 'id': 'saikyou-tank-no-meikyuu-kouryaku',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/saikyou-tank-no-meikyuu-kouryaku.jpg',
    //                 'heure': '20h30',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Solo Leveling',
    //                 'id': 'solo-leveling',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/solo-leveling0.jpg',
    //                 'heure': '23h00',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Les Carnets de l'apothicaire',
    //                 'id': 'les-carnets-de-lapothicaire',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/les-carnets-de-lapothicaire.jpg',
    //                 'heure': '23h30',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Academy’s Genius Swordmaster',
    //                 'id': 'academys-genius-swordmaster',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/academys-genius-swordmaster.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             },
    //             {
    //                 'name': 'Dungeons & Artifacts',
    //                 'id': 'dungeons-artifacts',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/dungeons-artifcats.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             },
    //             {
    //                 'name': 'L'expert de la Tour Tutoriel',
    //                 'id': 'l-expert-de-la-tour-tutoriel',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/l-expert-de-la-tour-tutoriel.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             },
    //             {
    //                 'name': 'Operation True Love',
    //                 'id': 'operation-true-love',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/operation-true-love.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             },
    //             {
    //                 'name': 'Apotheosis',
    //                 'id': 'apotheosis',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/apotheosis.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             }
    //         ],
    //         'dimanche': [
    //             {
    //                 'name': 'One Piece',
    //                 'id': 'one-piece',
    //                 'saison': 'saison11',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/one-piece.jpg',
    //                 'heure': '09h30',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'The Daily Life of the Immortal King',
    //                 'id': 'the-daily-life-of-the-immortal-king',
    //                 'saison': 'saison4',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/the-daily-life-of-the-immortal-king.jpg',
    //                 'heure': '09h30',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Captain Tsubasa',
    //                 'id': 'captain-tsubasa',
    //                 'saison': 'saison2',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/captain-tsubasa.jpg',
    //                 'heure': '10h30',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Shangri-La Frontier',
    //                 'id': 'shangri-la-frontier',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/shangri-la-frontier.jpg',
    //                 'heure': '12h00',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Fluffy Paradise',
    //                 'id': 'fluffy-paradise',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/fluffy-paradise.jpg',
    //                 'heure': '16h30',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': '7th Time Loop',
    //                 'id': '7th-time-loop-the-villainess-enjoys-a-carefree-life-married-to-her-worst-enemy',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/7th-time-loop-the-villainess-enjoys-a-carefree-life-married-to-her-worst-enemy.jpg',
    //                 'heure': '16h50',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Banished from the Hero's Party',
    //                 'id': 'banished-from-the-heros-party',
    //                 'saison': 'saison2',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/banished-from-the-heros-party.jpg',
    //                 'heure': '17h00',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Meiji Gekken: 1874',
    //                 'id': 'meiji-gekken-1874',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/meiji-gekken-1874.jpg',
    //                 'heure': '17h30',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'The Fire Hunter',
    //                 'id': 'the-fire-hunter',
    //                 'saison': 'saison2',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/the-fire-hunter.jpg',
    //                 'heure': '18h00',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Kyuujitsu no Warumono-san',
    //                 'id': 'kyuujitsu-no-warumono-san',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/kyuujitsu-no-warumono-san.jpg',
    //                 'heure': '20h20',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Shangri-La Frontier',
    //                 'id': 'shangri-la-frontier',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/shangri-la-frontier.jpg',
    //                 'heure': '22h00',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Undead Unluck',
    //                 'id': 'undead-unluck',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/undead-unluck.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Four Knights of the Apocalypse',
    //                 'id': 'four-knights-of-the-apocalypse',
    //                 'saison': 'saison1',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/four-knights-of-the-apocalypse.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vostfr',
    //                 'type': 'anime'
    //             },
    //             {
    //                 'name': 'Blue Lock',
    //                 'id': 'blue-lock',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/blue-lock.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             },
    //             {
    //                 'name': 'Return of The Iron-Blooded Hound',
    //                 'id': 'return-of-the-iron-blooded-hound',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/return-of-the-iron-blooded-hound.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             },
    //             {
    //                 'name': 'Sakamoto Days',
    //                 'id': 'sakamoto-days',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/sakamoto-days.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             },
    //             {
    //                 'name': 'Undead Unluck',
    //                 'id': 'undead-unluck',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/undead-unluck.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             },
    //             {
    //                 'name': 'Hero Ticket',
    //                 'id': 'hero-ticket',
    //                 'saison': 'scan',
    //                 'image': 'https://cdn.statically.io/gh/Anime-Sama/IMG/img/contenu/hero-ticket.jpg',
    //                 'heure': '?',
    //                 'probleme': '',
    //                 'langue': 'vf',
    //                 'type': 'scan'
    //             }
    //         ]
    //     }
    // }, loading = false
    return <Agenda agenda={true} calendrier={data?.calendrier} loading={loading} />
}
tabAgenda.getInitialProps = () => ({
    title: 'Agenda'
});

export default tabAgenda