'use strict'

const gProjs = [
    {
        id: "touch-nums",
        name: "Touch the Numbers",
        title: "Touch as fast as you can!",
        desc: "Try touching the numbers by their right order, as fast as you can! There are three difficulty levels. Enjoy!",
        url: "projs/touch-nums",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"],
    }, {
        id: "in-picture",
        name: "What's in the Picture?",
        title: "Choose the correct description",
        desc: "This is a very simple game: click the right description of each picture shown. You can turn sound on :)",
        url: "projs/in-picture",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"],
    }, {
        id: "balls",
        name: "Catch the Balls",
        title: "Gotta catch 'em all!",
        desc: "Try catching all the balls, as they keep appearing. Avoid magnets! You can use keyboard arrows or click neighbouring cells.",
        url: "projs/ball-board-starter",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"],
    }, {
        id: "pacman",
        name: "Pacman",
        title: "Good old Pacman",
        desc: "What is there to say about pacman? Avoid the ghosts and get to 60 pts :) Brocoli makes you invincible, and cherries are the best. Enjoy!",
        url: "projs/pacman",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"],
    }, {
        id: "minesweeper",
        name: "Minesweeper",
        title: "with additional special features :)",
        desc: 'Left click for revealing a hidden cell, and right click for marking a suspected mine. Reveal all the clean cells to win! You can find different difficulty levels, and don\'t forget to click the "miners club features" for additional features.',
        url: "https://mauricioein.github.io/Minesweeper/",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"],
    }, {
        id: "books",
        name: "Book Store Manager",
        title: "a book managing system",
        desc: "A trilingual managing site for your book shop. You can add books, change them, rate them, filter, sort, and can be used in two differen view-modes.",
        url: "projs/book-shop",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"],
    }

]

function getProjs(idx) {
    if (idx === undefined) return gProjs
    return gProjs[idx]
}










